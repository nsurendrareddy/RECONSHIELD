"""Technology fingerprinting with CVE mock mapping and WAF detection."""
import re
import httpx
from utils.logger import logger

# CVE Mock Database — educational reference only
# Maps technology → version_prefix → list of known CVE IDs with descriptions
CVE_DATABASE = {
    "WordPress": {
        "4.": [
            {"id": "CVE-2019-8942", "desc": "Remote Code Execution via meta attachment", "severity": "critical"},
            {"id": "CVE-2019-8943", "desc": "Path traversal in unserialize()", "severity": "critical"},
        ],
        "5.0": [
            {"id": "CVE-2019-9787", "desc": "CSRF bypass in comments", "severity": "high"},
        ],
        "5.1": [
            {"id": "CVE-2019-9787", "desc": "Cross-site request forgery", "severity": "high"},
        ],
        "5.9": [
            {"id": "CVE-2022-21661", "desc": "SQL injection via WP_Query", "severity": "high"},
        ],
        "6.0": [
            {"id": "CVE-2023-2745", "desc": "Directory traversal via plugin", "severity": "medium"},
        ],
    },
    "jQuery": {
        "1.": [
            {"id": "CVE-2020-11022", "desc": "XSS via regex in HTML manipulation", "severity": "medium"},
            {"id": "CVE-2020-11023", "desc": "XSS via regex in HTML manipulation", "severity": "medium"},
            {"id": "CVE-2019-11358", "desc": "Prototype pollution via $.extend", "severity": "medium"},
        ],
        "2.": [
            {"id": "CVE-2020-11022", "desc": "XSS via regex in HTML manipulation", "severity": "medium"},
            {"id": "CVE-2019-11358", "desc": "Prototype pollution via $.extend", "severity": "medium"},
        ],
        "3.0": [
            {"id": "CVE-2019-11358", "desc": "Prototype pollution via $.extend", "severity": "medium"},
        ],
        "3.4": [
            {"id": "CVE-2019-11358", "desc": "Prototype pollution via $.extend", "severity": "medium"},
        ],
    },
    "Nginx": {
        "1.1": [
            {"id": "CVE-2021-23017", "desc": "Off-by-one error in DNS resolver — RCE possible", "severity": "critical"},
        ],
        "1.14": [
            {"id": "CVE-2019-9511", "desc": "HTTP/2 DoS — DATA dribble attack", "severity": "high"},
        ],
        "1.15": [
            {"id": "CVE-2019-9511", "desc": "HTTP/2 DoS — DATA dribble attack", "severity": "high"},
        ],
    },
    "Apache": {
        "2.4.4": [
            {"id": "CVE-2021-41773", "desc": "Path traversal and RCE (critical — Apache 2.4.49)", "severity": "critical"},
        ],
        "2.4.49": [
            {"id": "CVE-2021-41773", "desc": "Path traversal and RCE", "severity": "critical"},
            {"id": "CVE-2021-42013", "desc": "Path traversal bypass", "severity": "critical"},
        ],
        "2.2": [
            {"id": "CVE-2017-7679", "desc": "Buffer overflow in mod_mime", "severity": "critical"},
        ],
    },
    "PHP": {
        "5.": [
            {"id": "CVE-2019-11043", "desc": "PHP-FPM underflow — RCE with Nginx", "severity": "critical"},
        ],
        "7.0": [
            {"id": "CVE-2019-11043", "desc": "PHP-FPM underflow — RCE", "severity": "critical"},
        ],
        "7.1": [
            {"id": "CVE-2019-11043", "desc": "PHP-FPM buffer underflow", "severity": "critical"},
        ],
        "7.4": [
            {"id": "CVE-2021-21706", "desc": "Path truncation on Windows", "severity": "medium"},
        ],
    },
    "Drupal": {
        "7.": [
            {"id": "CVE-2018-7600", "desc": "Drupalgeddon2 — Remote Code Execution", "severity": "critical"},
            {"id": "CVE-2018-7602", "desc": "Remote Code Execution (Drupalgeddon3)", "severity": "critical"},
        ],
        "8.": [
            {"id": "CVE-2019-6340", "desc": "RCE via REST API", "severity": "critical"},
        ],
    },
    "Joomla": {
        "3.": [
            {"id": "CVE-2015-8562", "desc": "PHP Object Injection — Remote Code Execution", "severity": "critical"},
        ],
    },
    "Bootstrap": {
        "3.": [
            {"id": "CVE-2018-14041", "desc": "XSS in data-target attribute", "severity": "medium"},
            {"id": "CVE-2019-8331", "desc": "XSS in tooltip/popover", "severity": "medium"},
        ],
        "4.0": [
            {"id": "CVE-2019-8331", "desc": "XSS in tooltip/popover", "severity": "medium"},
        ],
    },
}


def _get_cves_for_tech(name: str, version: str | None) -> list[dict]:
    """Look up potential CVEs for a technology + version."""
    tech_cves = CVE_DATABASE.get(name, {})
    if not tech_cves or not version:
        return []

    matched = []
    for version_prefix, cves in tech_cves.items():
        if version.startswith(version_prefix):
            matched.extend(cves)

    return matched[:5]  # Limit to 5 CVEs per tech


WAF_SIGNATURES = {
    "Cloudflare": ["cf-ray", "cf-cache-status"],
    "AWS WAF": ["x-amzn-requestid", "x-amz-cf-id"],
    "ModSecurity": ["x-mod-security"],
    "Sucuri": ["x-sucuri-id", "x-sucuri-cache"],
    "Imperva": ["x-iinfo", "x-cdn"],
    "Akamai": ["akamai-origin-hop"],
    "Fastly": ["fastly-restarts"],
}

TECH_SIGNATURES = {
    "headers": {
        "server": {
            "nginx": {"name": "Nginx", "category": "Web Server"},
            "apache": {"name": "Apache", "category": "Web Server"},
            "cloudflare": {"name": "Cloudflare", "category": "CDN"},
            "microsoft-iis": {"name": "Microsoft IIS", "category": "Web Server"},
            "litespeed": {"name": "LiteSpeed", "category": "Web Server"},
            "openresty": {"name": "OpenResty", "category": "Web Server"},
            "gunicorn": {"name": "Gunicorn", "category": "Web Server"},
            "caddy": {"name": "Caddy", "category": "Web Server"},
        },
        "x-powered-by": {
            "php": {"name": "PHP", "category": "Backend"},
            "asp.net": {"name": "ASP.NET", "category": "Backend"},
            "express": {"name": "Express.js", "category": "Backend"},
            "next.js": {"name": "Next.js", "category": "Framework"},
            "django": {"name": "Django", "category": "Framework"},
        },
    },
    "html_patterns": [
        {"pattern": r'wp-content|wp-includes|wordpress', "name": "WordPress", "category": "CMS"},
        {"pattern": r'Drupal|drupal\.js|drupal\.settings', "name": "Drupal", "category": "CMS"},
        {"pattern": r'joomla', "name": "Joomla", "category": "CMS"},
        {"pattern": r'shopify', "name": "Shopify", "category": "E-commerce"},
        {"pattern": r'react|__NEXT_DATA__|_next/', "name": "React", "category": "Frontend"},
        {"pattern": r'ng-version|angular\.js|angular\.min\.js', "name": "Angular", "category": "Frontend"},
        {"pattern": r'vue\.js|__vue__|v-app', "name": "Vue.js", "category": "Frontend"},
        {"pattern": r'jquery[.\-]\d+|jQuery', "name": "jQuery", "category": "JavaScript Library"},
        {"pattern": r'bootstrap', "name": "Bootstrap", "category": "CSS Framework"},
        {"pattern": r'tailwind', "name": "Tailwind CSS", "category": "CSS Framework"},
        {"pattern": r'google-analytics|gtag|ga\.js|analytics\.js', "name": "Google Analytics", "category": "Analytics"},
        {"pattern": r'googletagmanager|gtm\.js', "name": "Google Tag Manager", "category": "Analytics"},
        {"pattern": r'recaptcha', "name": "reCAPTCHA", "category": "Security"},
        {"pattern": r'stripe\.js|stripe\.com', "name": "Stripe", "category": "Payment"},
        {"pattern": r'hotjar', "name": "Hotjar", "category": "Analytics"},
        {"pattern": r'intercom', "name": "Intercom", "category": "Support"},
        {"pattern": r'svelte', "name": "Svelte", "category": "Frontend"},
        {"pattern": r'nuxt', "name": "Nuxt.js", "category": "Framework"},
        {"pattern": r'gatsby', "name": "Gatsby", "category": "Framework"},
        {"pattern": r'laravel', "name": "Laravel", "category": "Backend"},
        {"pattern": r'rails|ruby on rails', "name": "Ruby on Rails", "category": "Backend"},
        {"pattern": r'<meta\s+name=["\']generator["\']\s+content=["\']([^"\']+)', "name": None, "category": "Generator", "extract": True},
    ],
}


async def tech_detect(domain: str) -> dict:
    """Detect technologies used by the target domain with CVE mapping."""
    technologies = []
    seen = set()
    issues = []
    waf_detected = None

    try:
        async with httpx.AsyncClient(follow_redirects=True, timeout=15, verify=False) as client:
            response = await client.get(f"https://{domain}")
            headers = {k.lower(): v for k, v in response.headers.items()}
            headers_lower = {k: v.lower() for k, v in headers.items()}
            html = response.text[:100000]

            # WAF detection
            for waf_name, waf_headers in WAF_SIGNATURES.items():
                if any(h in headers_lower for h in waf_headers):
                    waf_detected = waf_name
                    break

            # Check headers
            for header_name, signatures in TECH_SIGNATURES["headers"].items():
                header_val = headers_lower.get(header_name, "")
                for keyword, tech in signatures.items():
                    if keyword in header_val:
                        key = tech["name"]
                        if key not in seen:
                            seen.add(key)
                            version = None
                            v_match = re.search(r'[\d]+\.[\d]+(?:\.[\d]+)?', header_val)
                            if v_match:
                                version = v_match.group()
                                issues.append(f"{tech['name']} version ({version}) exposed in headers")
                            cves = _get_cves_for_tech(tech["name"], version)
                            technologies.append({
                                **tech,
                                "version": version,
                                "source": "HTTP Header",
                                "potential_cves": cves,
                            })

            # Check HTML patterns
            for sig in TECH_SIGNATURES["html_patterns"]:
                if sig.get("extract"):
                    match = re.search(sig["pattern"], html, re.IGNORECASE)
                    if match:
                        name = match.group(1) if match.lastindex else "Unknown Generator"
                        if name not in seen:
                            seen.add(name)
                            # Try to extract version from generator string
                            version = None
                            v_match = re.search(r'[\d]+\.[\d]+(?:\.[\d]+)?', name)
                            if v_match:
                                version = v_match.group()
                            tech_name = re.split(r'[\s/]', name)[0]
                            cves = _get_cves_for_tech(tech_name, version)
                            technologies.append({
                                "name": name,
                                "category": sig["category"],
                                "version": version,
                                "source": "HTML Meta",
                                "potential_cves": cves,
                            })
                else:
                    match = re.search(sig["pattern"], html, re.IGNORECASE)
                    if match and sig["name"] and sig["name"] not in seen:
                        seen.add(sig["name"])
                        # Try to extract version from context
                        version = None
                        context = html[max(0, match.start()-20):match.end()+50]
                        v_match = re.search(r'[\d]+\.[\d]+(?:\.[\d]+)?', context)
                        if v_match:
                            version = v_match.group()
                        cves = _get_cves_for_tech(sig["name"], version)
                        technologies.append({
                            "name": sig["name"],
                            "category": sig["category"],
                            "version": version,
                            "source": "HTML Content",
                            "potential_cves": cves,
                        })

            if "x-powered-by" in headers_lower:
                issues.append(f"X-Powered-By header exposes: {headers['x-powered-by']}")

        total_cves = sum(len(t.get("potential_cves", [])) for t in technologies)

        return {
            "technologies": technologies,
            "count": len(technologies),
            "categories": list(set(t["category"] for t in technologies)),
            "waf_detected": waf_detected,
            "total_potential_cves": total_cves,
            "issues": issues,
            "risk_level": "High" if total_cves > 3 else "Medium" if issues else "Low",
        }

    except Exception as e:
        logger.error(f"Tech detection failed for {domain}: {e}")
        return {
            "technologies": [],
            "count": 0,
            "waf_detected": None,
            "total_potential_cves": 0,
            "issues": [str(e)],
            "risk_level": "Medium",
        }
