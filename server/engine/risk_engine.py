"""Enhanced Risk Engine — attack surface score, compliance scoring, attack path generation."""
from utils.helpers import grade_from_score, classify_risk

GDPR_CONTROLS = [
    ("Art.32 — Encryption in Transit", lambda s: s.get("ssl", {}).get("has_ssl"), "critical"),
    ("Art.32 — HTTPS Enforcement", lambda s: s.get("ssl", {}).get("https_redirect"), "high"),
    ("Art.25 — HSTS Header", lambda s: any(h.get("key") == "strict-transport-security" and h.get("present") for h in s.get("headers", {}).get("headers", [])), "medium"),
    ("Art.32 — CSP Implementation", lambda s: any(h.get("key") == "content-security-policy" and h.get("present") for h in s.get("headers", {}).get("headers", [])), "medium"),
    ("Art.32 — Email Authentication (SPF)", lambda s: s.get("dns", {}).get("spf", {}).get("found"), "medium"),
    ("Art.32 — Email Authentication (DMARC)", lambda s: s.get("dns", {}).get("dmarc", {}).get("found"), "medium"),
    ("Art.25 — No Exposed Databases", lambda s: s.get("ports", {}).get("high_risk_count", 0) == 0, "critical"),
    ("Art.32 — Valid SSL Certificate", lambda s: not s.get("ssl", {}).get("certificate", {}).get("is_expired", True), "critical"),
]

PCI_DSS_CONTROLS = [
    ("Req.4 — TLS Encryption", lambda s: s.get("ssl", {}).get("has_ssl"), "critical"),
    ("Req.4 — HTTPS Redirect", lambda s: s.get("ssl", {}).get("https_redirect"), "high"),
    ("Req.6 — Security Headers", lambda s: (s.get("headers", {}).get("score", 0) or 0) >= 60, "high"),
    ("Req.1 — No Exposed DB Ports", lambda s: s.get("ports", {}).get("high_risk_count", 0) == 0, "critical"),
    ("Req.10 — Valid Certificate", lambda s: not s.get("ssl", {}).get("certificate", {}).get("is_expired", True), "critical"),
    ("Req.6 — CSP Policy", lambda s: any(h.get("key") == "content-security-policy" and h.get("present") for h in s.get("headers", {}).get("headers", [])), "medium"),
]

HIPAA_CONTROLS = [
    ("§164.312 — Data Encryption", lambda s: s.get("ssl", {}).get("has_ssl"), "critical"),
    ("§164.312 — Certificate Valid", lambda s: not s.get("ssl", {}).get("certificate", {}).get("is_expired", True), "critical"),
    ("§164.312 — Secure Transport", lambda s: s.get("ssl", {}).get("https_redirect"), "high"),
    ("§164.312 — Access Controls (Headers)", lambda s: (s.get("headers", {}).get("score", 0) or 0) >= 50, "high"),
    ("§164.312 — No Exposed PHI Storage", lambda s: s.get("ports", {}).get("high_risk_count", 0) == 0, "critical"),
]


def _score_compliance(scan_data: dict, controls: list) -> dict:
    passed, failed = [], []
    for name, check_fn, severity in controls:
        try:
            result = check_fn(scan_data)
        except Exception:
            result = False
        (passed if result else failed).append({"name": name, "severity": severity})
    pct = int(len(passed) / len(controls) * 100) if controls else 0
    return {"score": pct, "passed": passed, "failed": failed, "total": len(controls)}


def _generate_attack_paths(scan_data: dict, vulns: list) -> list:
    paths = []
    ports = scan_data.get("ports", {})
    vuln_sim = scan_data.get("vuln_sim", {})
    tech = scan_data.get("tech", {})
    subs = scan_data.get("subdomains", {})
    graphql = scan_data.get("graphql", {})
    github = scan_data.get("github", {})

    open_high_ports = [p for p in ports.get("open_ports", []) if p.get("risk") == "High"]
    risky_subs = subs.get("risky_subdomains", [])
    total_cves = tech.get("total_potential_cves", 0)

    # Path 1: SQLi → DB Access
    sqli_risk = vuln_sim.get("sqli", {}).get("risk", "Low")
    if sqli_risk in ("High", "Medium") and any(p["service"] in ("MySQL", "PostgreSQL", "MongoDB") for p in open_high_ports):
        paths.append({
            "id": "sqli_db",
            "name": "SQL Injection → Database Takeover",
            "severity": "Critical",
            "steps": [
                {"step": 1, "action": "Discover query parameters in web application", "tool": "Manual / Burp Suite"},
                {"step": 2, "action": "Inject SQL payloads to bypass authentication", "tool": "sqlmap (educational)"},
                {"step": 3, "action": "Extract database credentials and sensitive data", "tool": "Union-based / Blind SQLi"},
                {"step": 4, "action": "Access exposed database port directly", "tool": "mysql / psql client"},
            ],
            "remediation": "Parameterized queries + firewall database ports",
        })

    # Path 2: Admin subdomain → Credential Attack
    admin_subs = [s for s in risky_subs if s.get("tag") == "admin" or s.get("category") == "admin"]
    if admin_subs:
        paths.append({
            "id": "admin_brute",
            "name": "Admin Panel Discovery → Credential Attack",
            "severity": "High",
            "steps": [
                {"step": 1, "action": f"Admin subdomain found: {admin_subs[0]['subdomain']}", "tool": "Subdomain enumeration"},
                {"step": 2, "action": "Access admin login portal", "tool": "Browser"},
                {"step": 3, "action": "Attempt default/weak credentials", "tool": "Hydra / Burp Intruder (educational)"},
                {"step": 4, "action": "Gain administrative access", "tool": "Browser"},
            ],
            "remediation": "Multi-factor authentication + strong password policy + rate limiting",
        })

    # Path 3: GitHub Leak → Direct Access
    if github.get("leaks_found", 0) > 0:
        paths.append({
            "id": "github_leak",
            "name": "GitHub Credential Leak → Direct System Access",
            "severity": "Critical",
            "steps": [
                {"step": 1, "action": "Find credentials/API keys in public GitHub repos", "tool": "GitHub search / truffleHog"},
                {"step": 2, "action": "Use leaked credentials to authenticate to services", "tool": "curl / API clients"},
                {"step": 3, "action": "Access internal systems using valid credentials", "tool": "Varies by service"},
                {"step": 4, "action": "Lateral movement within organization", "tool": "Depends on access level"},
            ],
            "remediation": "Rotate all leaked credentials immediately + implement git-secrets pre-commit hooks",
        })

    # Path 4: GraphQL Introspection → Data Exfiltration
    if graphql.get("introspection_enabled"):
        paths.append({
            "id": "graphql_exfil",
            "name": "GraphQL Introspection → Data Exfiltration",
            "severity": "High",
            "steps": [
                {"step": 1, "action": "Discover GraphQL endpoint via introspection", "tool": "GraphQL playground"},
                {"step": 2, "action": "Extract full schema including sensitive types", "tool": "Introspection query"},
                {"step": 3, "action": "Query sensitive data without authorization", "tool": "GraphQL queries"},
                {"step": 4, "action": "Exfiltrate user data, tokens, or PII", "tool": "Automated queries"},
            ],
            "remediation": "Disable introspection in production + implement query depth limiting",
        })

    # Path 5: CVE Exploitation
    if total_cves >= 2:
        vulnerable_tech = [t for t in tech.get("technologies", []) if t.get("potential_cves")]
        if vulnerable_tech:
            t = vulnerable_tech[0]
            cve = t["potential_cves"][0]
            paths.append({
                "id": "cve_exploit",
                "name": f"Known CVE Exploitation ({t['name']})",
                "severity": "Critical",
                "steps": [
                    {"step": 1, "action": f"Identify {t['name']} version via HTTP headers/HTML", "tool": "Passive fingerprinting"},
                    {"step": 2, "action": f"Match version to {cve['id']}: {cve['desc']}", "tool": "CVE database lookup"},
                    {"step": 3, "action": "Obtain/develop proof-of-concept exploit", "tool": "Metasploit / ExploitDB"},
                    {"step": 4, "action": "Execute exploit for code execution or data access", "tool": "Depends on CVE type"},
                ],
                "remediation": f"Update {t['name']} to latest stable version immediately",
            })

    # Path 6: CORS Misconfiguration → Session Hijack
    cors = vuln_sim.get("cors", {})
    if cors.get("reflects_origin") or cors.get("allows_null"):
        paths.append({
            "id": "cors_hijack",
            "name": "CORS Misconfiguration → Cross-Origin Session Hijack",
            "severity": "Critical",
            "steps": [
                {"step": 1, "action": "Identify CORS origin reflection vulnerability", "tool": "Burp Suite"},
                {"step": 2, "action": "Create malicious page on attacker.com", "tool": "HTML/JavaScript"},
                {"step": 3, "action": "Lure victim to attacker.com while logged into target", "tool": "Phishing"},
                {"step": 4, "action": "Steal session data via cross-origin API requests", "tool": "Fetch API"},
            ],
            "remediation": "Strict CORS origin whitelist — never reflect arbitrary Origin headers",
        })

    return paths


def analyze_risk(scan_data: dict) -> dict:
    score = 100
    vulnerabilities = []
    recommendations = []

    # --- SSL/TLS (25 pts) ---
    ssl = scan_data.get("ssl", {})
    if not ssl.get("has_ssl"):
        score -= 25
        vulnerabilities.append({"severity": "critical", "title": "No SSL/TLS", "detail": "Website does not support HTTPS"})
        recommendations.append({"priority": "critical", "action": "Install an SSL certificate and enable HTTPS immediately"})
    else:
        cert = ssl.get("certificate", {})
        if cert.get("is_expired"):
            score -= 25
            vulnerabilities.append({"severity": "critical", "title": "Expired SSL Certificate", "detail": "Certificate has expired"})
            recommendations.append({"priority": "critical", "action": "Renew the SSL certificate immediately"})
        elif cert.get("days_remaining") and cert["days_remaining"] < 30:
            score -= 8
            vulnerabilities.append({"severity": "warning", "title": "SSL Expiring Soon", "detail": f"Expires in {cert['days_remaining']} days"})
            recommendations.append({"priority": "high", "action": "Renew SSL certificate before expiration"})
        if not ssl.get("https_redirect"):
            score -= 8
            vulnerabilities.append({"severity": "warning", "title": "No HTTPS Redirect", "detail": "HTTP does not redirect to HTTPS"})
            recommendations.append({"priority": "high", "action": "Configure HTTP to HTTPS redirect (301)"})

    # --- Security Headers (20 pts) ---
    headers = scan_data.get("headers", {})
    h_score = headers.get("score", 100)
    score -= int((100 - h_score) * 0.20)
    for h in headers.get("headers", []):
        if not h.get("present") and h.get("severity") in ("high", "medium"):
            vulnerabilities.append({"severity": "warning", "title": f"Missing {h['header']}", "detail": h.get("description", "")})
            if h.get("recommendation"):
                recommendations.append({"priority": "medium", "action": h["recommendation"]})

    # --- DNS (15 pts) ---
    dns_data = scan_data.get("dns", {})
    if not dns_data.get("spf", {}).get("found"):
        score -= 10
        vulnerabilities.append({"severity": "warning", "title": "No SPF Record", "detail": "Email spoofing risk"})
        recommendations.append({"priority": "high", "action": "Add SPF TXT record to prevent email spoofing"})
    if not dns_data.get("dmarc", {}).get("found"):
        score -= 8
        vulnerabilities.append({"severity": "warning", "title": "No DMARC Record", "detail": "Email authentication not enforced"})
        recommendations.append({"priority": "high", "action": "Add DMARC record: v=DMARC1; p=reject"})

    # --- Port Exposure (15 pts) ---
    ports = scan_data.get("ports", {})
    high_risk_ports = ports.get("high_risk_count", 0)
    if high_risk_ports > 0:
        score -= min(15, high_risk_ports * 5)
        for p in ports.get("open_ports", []):
            if p.get("risk") == "High":
                vulnerabilities.append({"severity": "critical", "title": f"Port {p['port']} ({p['service']}) Exposed", "detail": p.get("note", "")})
                recommendations.append({"priority": "critical", "action": f"Firewall port {p['port']} ({p['service']})"})

    # --- Technology CVEs (10 pts) ---
    tech = scan_data.get("tech", {})
    cve_count = tech.get("total_potential_cves", 0)
    if cve_count > 0:
        score -= min(10, cve_count * 2)
        vulnerabilities.append({"severity": "warning", "title": f"{cve_count} Potential CVE(s) Detected", "detail": "Known vulnerabilities in detected technology versions"})
        recommendations.append({"priority": "high", "action": "Update all software to latest stable versions"})
    for issue in tech.get("issues", []):
        score -= 2
        vulnerabilities.append({"severity": "info", "title": "Version Exposure", "detail": issue})

    # --- CORS Misconfiguration (5 pts) ---
    vuln_sim = scan_data.get("vuln_sim", {})
    cors = vuln_sim.get("cors", {})
    if cors.get("reflects_origin") or cors.get("allows_null"):
        score -= 5
        vulnerabilities.append({"severity": "critical", "title": "CORS Misconfiguration", "detail": "Server reflects arbitrary origins or allows null origin"})
        recommendations.append({"priority": "critical", "action": "Implement strict CORS origin whitelist"})

    # --- GitHub Leaks (10 pts) ---
    github = scan_data.get("github", {})
    if github.get("leaks_found", 0) > 0:
        score -= 10
        vulnerabilities.append({"severity": "critical", "title": f"{github['leaks_found']} Credential Leak(s) on GitHub", "detail": "Passwords, API keys, or config files found in public repositories"})
        recommendations.append({"priority": "critical", "action": "Rotate all exposed credentials immediately and remove from GitHub history"})

    # --- Infrastructure Exposure (5 pts) ---
    infra = scan_data.get("infra", {})
    if infra.get("critical_exposures"):
        score -= 5
        for svc in infra["critical_exposures"][:3]:
            vulnerabilities.append({"severity": "critical", "title": f"{svc['name']} Exposed", "detail": svc.get("note", "")})
            recommendations.append({"priority": "critical", "action": svc.get("remediation", "Restrict access")})

    # --- GraphQL (3 pts) ---
    graphql = scan_data.get("graphql", {})
    if graphql.get("introspection_enabled"):
        score -= 3
        vulnerabilities.append({"severity": "warning", "title": "GraphQL Introspection Enabled", "detail": "Full API schema exposed to attackers"})
        recommendations.append({"priority": "medium", "action": "Disable GraphQL introspection in production"})

    # --- Domain Health (5 pts) ---
    whois = scan_data.get("whois", {})
    age = whois.get("domain_age", {})
    if age.get("total_days") and age["total_days"] < 365:
        score -= 3
        vulnerabilities.append({"severity": "info", "title": "New Domain", "detail": f"Domain is only {age.get('label', 'unknown')} old"})
    expiry = whois.get("expiry_days")
    if expiry is not None and expiry < 30:
        score -= 4
        vulnerabilities.append({"severity": "warning", "title": "Domain Expiring Soon", "detail": f"Expires in {expiry} days"})
        recommendations.append({"priority": "high", "action": "Renew domain registration"})

    # --- Subdomains (3 pts) ---
    subs = scan_data.get("subdomains", {})
    risky_count = subs.get("risky_count", 0)
    if risky_count > 0:
        score -= min(3, risky_count)
        vulnerabilities.append({"severity": "info", "title": f"{risky_count} Risky Subdomains", "detail": "dev/staging/admin subdomain patterns found"})
        recommendations.append({"priority": "medium", "action": "Audit and restrict access to risky subdomains"})

    score = max(0, min(100, score))
    grade = grade_from_score(score)
    risk_level = classify_risk(score)

    # Attack Surface Score
    risky_assets = risky_count + high_risk_ports + (1 if graphql.get("introspection_enabled") else 0)
    headers_present = sum(1 for h in headers.get("headers", []) if h.get("present"))
    attack_surface_score = min(100, max(0, (risky_assets * 10) + (high_risk_ports * 5) - (headers_present * 8)))

    # Compliance
    compliance = {
        "gdpr": _score_compliance(scan_data, GDPR_CONTROLS),
        "pci_dss": _score_compliance(scan_data, PCI_DSS_CONTROLS),
        "hipaa": _score_compliance(scan_data, HIPAA_CONTROLS),
    }

    # Attack paths
    attack_paths = _generate_attack_paths(scan_data, vulnerabilities)

    # Sort
    priority_order = {"critical": 0, "high": 1, "medium": 2, "low": 3}
    recommendations.sort(key=lambda x: priority_order.get(x["priority"], 4))
    vulnerabilities.sort(key=lambda x: {"critical": 0, "warning": 1, "info": 2}.get(x["severity"], 3))

    critical_count = sum(1 for v in vulnerabilities if v["severity"] == "critical")
    warning_count = sum(1 for v in vulnerabilities if v["severity"] == "warning")

    summary = f"Security score: {score}/100 (Grade {grade}). "
    if critical_count:
        summary += f"{critical_count} critical issue(s) found. "
    if warning_count:
        summary += f"{warning_count} warning(s). "
    summary += ("Overall security posture is good." if score >= 80 else
                "Several improvements recommended." if score >= 50 else
                "Significant security concerns — immediate action needed.")

    # Sentiment
    sentiment = (
        "CRITICAL" if score < 30 else
        "AT RISK" if score < 55 else
        "STABLE" if score < 80 else
        "SECURE"
    )

    return {
        "score": score,
        "grade": grade,
        "risk_level": risk_level,
        "sentiment": sentiment,
        "summary": summary,
        "vulnerabilities": vulnerabilities,
        "recommendations": recommendations,
        "attack_surface_score": attack_surface_score,
        "attack_paths": attack_paths,
        "compliance": compliance,
        "stats": {
            "critical": critical_count,
            "warnings": warning_count,
            "info": sum(1 for v in vulnerabilities if v["severity"] == "info"),
            "total_recommendations": len(recommendations),
        },
    }
