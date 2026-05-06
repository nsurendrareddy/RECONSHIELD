"""Passive subdomain enumeration — Certificate Transparency + categorization + cloud detection."""
import httpx
import re
from utils.logger import logger

# Risk patterns for categorization
CATEGORY_PATTERNS = {
    "admin": ["admin", "administrat", "cpanel", "whm", "plesk", "manage"],
    "api": ["api", "rest", "graphql", "gateway", "service", "services"],
    "dev": ["dev", "develop", "development", "local", "localhost"],
    "staging": ["staging", "stage", "stg", "uat", "preprod", "pre-prod"],
    "test": ["test", "testing", "qa", "sandbox", "demo", "trial"],
    "portal": ["portal", "app", "dashboard", "panel", "console"],
    "cdn": ["cdn", "static", "assets", "media", "img", "images", "files"],
    "mail": ["mail", "smtp", "imap", "pop3", "mx", "email", "webmail"],
    "ftp": ["ftp", "sftp", "ftps", "files", "upload"],
    "legacy": ["old", "legacy", "deprecated", "archive", "backup", "v1", "v2"],
    "cloud": ["s3", "bucket", "blob", "gcs", "storage"],
    "ns": ["ns", "ns1", "ns2", "dns", "nameserver"],
    "vpn": ["vpn", "remote", "access", "tunnel"],
    "db": ["db", "database", "mysql", "postgres", "mongo", "redis", "sql"],
}

CLOUD_CNAME_PATTERNS = {
    r"\.s3\.amazonaws\.com$": "AWS S3",
    r"\.s3-website": "AWS S3 Website",
    r"\.cloudfront\.net$": "AWS CloudFront",
    r"\.blob\.core\.windows\.net$": "Azure Blob",
    r"\.azureedge\.net$": "Azure CDN",
    r"\.storage\.googleapis\.com$": "GCP Storage",
    r"\.appspot\.com$": "Google App Engine",
    r"\.run\.app$": "Google Cloud Run",
    r"\.herokuapp\.com$": "Heroku",
    r"\.github\.io$": "GitHub Pages",
    r"\.netlify\.app$": "Netlify",
    r"\.vercel\.app$": "Vercel",
    r"\.pages\.dev$": "Cloudflare Pages",
    r"\.amplifyapp\.com$": "AWS Amplify",
    r"\.onrender\.com$": "Render",
    r"\.fly\.dev$": "Fly.io",
    r"\.azurewebsites\.net$": "Azure App Service",
}

# Risk levels per category
CATEGORY_RISK = {
    "admin": "Critical",
    "db": "Critical",
    "staging": "High",
    "dev": "High",
    "test": "High",
    "api": "Medium",
    "portal": "Medium",
    "vpn": "Medium",
    "legacy": "Medium",
    "ftp": "Medium",
    "mail": "Low",
    "cdn": "Low",
    "ns": "Low",
    "cloud": "Medium",
    "unknown": "Low",
}


def _classify_subdomain(subdomain: str, domain: str) -> dict:
    """Classify subdomain by category and risk."""
    prefix = subdomain.replace(f".{domain}", "").replace(domain, "").lower()

    # Check cloud patterns first
    for pattern, provider in CLOUD_CNAME_PATTERNS.items():
        if re.search(pattern, subdomain.lower()):
            return {
                "category": "cloud",
                "cloud_provider": provider,
                "risk_level": "Medium",
                "risk_reason": f"Hosted on {provider}",
            }

    # Check category patterns
    for category, patterns in CATEGORY_PATTERNS.items():
        for pat in patterns:
            if pat in prefix:
                return {
                    "category": category,
                    "cloud_provider": None,
                    "risk_level": CATEGORY_RISK.get(category, "Low"),
                    "risk_reason": f"{category.title()} subdomain — may have weaker security controls",
                }

    return {
        "category": "unknown",
        "cloud_provider": None,
        "risk_level": "Low",
        "risk_reason": "Standard subdomain",
    }


def _predict_subdomains(domain: str) -> list[dict]:
    """Generate likely subdomains based on domain name patterns."""
    company = domain.split(".")[0].lower()
    predicted = []

    # Common patterns that attackers try
    patterns = [
        ("admin", "Critical", "Admin panels are primary targets"),
        ("api", "Medium", "API endpoints may expose business logic"),
        ("dev", "High", "Developer environments often have weaker security"),
        ("staging", "High", "Staging servers frequently misconfigured"),
        ("test", "High", "Test environments often expose sensitive data"),
        ("vpn", "Medium", "VPN portal may be targeted for credential attacks"),
        ("mail", "Low", "Mail server — check for email security misconfig"),
        ("cdn", "Low", "CDN subdomain"),
        ("portal", "Medium", "Web portal — authentication bypass targets"),
        ("dashboard", "High", "Dashboard may expose sensitive metrics"),
        ("db", "Critical", "Database subdomains are critical if exposed"),
        ("backup", "Critical", "Backup servers may expose data"),
        ("ci", "High", "CI/CD servers expose build secrets"),
        ("jenkins", "High", "Jenkins CI/CD server"),
        ("git", "High", "Git server may expose source code"),
    ]

    for name, risk, reason in patterns:
        predicted.append({
            "subdomain": f"{name}.{domain}",
            "predicted": True,
            "risk_level": risk,
            "risk_reason": reason,
            "category": name if name in CATEGORY_PATTERNS else "unknown",
        })

    return predicted


async def subdomain_enum(domain: str) -> dict:
    """Enumerate subdomains via Certificate Transparency with enhanced categorization."""
    subdomains = set()
    risky = []
    issues = []
    categorized = []

    try:
        async with httpx.AsyncClient(timeout=20) as client:
            resp = await client.get(
                f"https://crt.sh/?q=%.{domain}&output=json",
                headers={"User-Agent": "ReconShield/1.0"}
            )
            if resp.status_code == 200:
                entries = resp.json()
                for entry in entries:
                    name = entry.get("name_value", "")
                    for sub in name.split("\n"):
                        sub = sub.strip().lower()
                        if sub and sub.endswith(domain) and "*" not in sub and sub != domain:
                            subdomains.add(sub)
    except Exception as e:
        logger.error(f"Subdomain enumeration failed for {domain}: {e}")
        issues.append(f"crt.sh lookup failed: {str(e)}")

    sorted_subs = sorted(subdomains)

    # Classify each subdomain
    category_counts: dict[str, int] = {}
    for sub in sorted_subs:
        classification = _classify_subdomain(sub, domain)
        entry = {
            "subdomain": sub,
            **classification,
        }
        categorized.append(entry)
        category_counts[classification["category"]] = category_counts.get(classification["category"], 0) + 1

        if classification["risk_level"] in ("Critical", "High", "Medium"):
            risky.append({
                "subdomain": sub,
                "tag": classification["category"],
                "risk_level": classification["risk_level"],
                "risk_reason": classification["risk_reason"],
                "cloud_provider": classification.get("cloud_provider"),
            })

    # Predicted subdomains (not yet confirmed by CT)
    predicted = _predict_subdomains(domain)
    # Filter out predicted ones that we already found
    found_set = set(sorted_subs)
    predicted = [p for p in predicted if p["subdomain"] not in found_set]

    if risky:
        critical_count = sum(1 for r in risky if r["risk_level"] == "Critical")
        high_count = sum(1 for r in risky if r["risk_level"] == "High")
        if critical_count > 0:
            issues.append(f"{critical_count} critical-risk subdomain(s) found (admin/DB patterns)")
        if high_count > 0:
            issues.append(f"{high_count} high-risk subdomain(s) found (dev/staging/test patterns)")

    # Cloud assets
    cloud_assets = [r for r in risky if r.get("cloud_provider")]
    if cloud_assets:
        providers = list(set(r["cloud_provider"] for r in cloud_assets))
        issues.append(f"Cloud infrastructure detected: {', '.join(providers)}")

    risk_level = (
        "Critical" if any(r["risk_level"] == "Critical" for r in risky) else
        "High" if any(r["risk_level"] == "High" for r in risky) else
        "Medium" if risky else
        "Low"
    )

    return {
        "subdomains": sorted_subs,
        "count": len(sorted_subs),
        "categorized": categorized,
        "risky_subdomains": risky,
        "risky_count": len(risky),
        "category_counts": category_counts,
        "cloud_assets": cloud_assets,
        "predicted_subdomains": predicted[:10],
        "issues": issues,
        "risk_level": risk_level,
    }
