"""Wayback Machine (Internet Archive) CDX API integration."""
import httpx
import re
from utils.logger import logger

SENSITIVE_FILE_PATTERNS = {
    r"\.env($|\?)": {"label": ".env file", "risk": "critical"},
    r"\.sql($|\?)": {"label": "SQL dump", "risk": "critical"},
    r"\.bak($|\?)": {"label": "Backup file", "risk": "high"},
    r"backup\.(zip|tar|gz|7z)": {"label": "Backup archive", "risk": "critical"},
    r"config\.(php|yml|yaml|json|xml)": {"label": "Config file", "risk": "high"},
    r"wp-config\.php": {"label": "WordPress config", "risk": "critical"},
    r"\.git/config": {"label": ".git config exposed", "risk": "critical"},
    r"phpinfo\.php": {"label": "phpinfo() exposed", "risk": "high"},
    r"adminer\.php": {"label": "Adminer DB tool", "risk": "critical"},
    r"phpmyadmin": {"label": "phpMyAdmin", "risk": "high"},
    r"database\.yml": {"label": "Database config", "risk": "critical"},
    r"credentials": {"label": "Credentials file", "risk": "critical"},
    r"secrets?\.(json|yml|yaml)": {"label": "Secrets file", "risk": "critical"},
    r"private_key|id_rsa": {"label": "Private key", "risk": "critical"},
    r"passwd|shadow": {"label": "System password file", "risk": "critical"},
    r"\.htpasswd": {"label": ".htpasswd file", "risk": "high"},
}

TECH_FINGERPRINTS = {
    "wordpress": "WordPress",
    "wp-content": "WordPress",
    "drupal": "Drupal",
    "joomla": "Joomla",
    "shopify": "Shopify",
    "django": "Django",
    "laravel": "Laravel",
    "rails": "Ruby on Rails",
    "strapi": "Strapi",
    "gatsby": "Gatsby",
    "next.js": "Next.js",
    "_next/": "Next.js",
}


def _extract_year(timestamp: str) -> str:
    return timestamp[:4] if timestamp and len(timestamp) >= 4 else "unknown"


async def wayback_analysis(domain: str) -> dict:
    """Query Wayback Machine CDX API for historical endpoint analysis."""
    result = {
        "accessible": True,
        "total_snapshots": 0,
        "first_seen": None,
        "last_seen": None,
        "sensitive_files": [],
        "historical_paths": [],
        "tech_timeline": {},
        "removed_endpoints": [],
        "issues": [],
        "risk_level": "Low",
    }

    try:
        async with httpx.AsyncClient(timeout=20) as client:
            # Fetch CDX data — limit to 500 most interesting results
            resp = await client.get(
                "https://web.archive.org/cdx/search/cdx",
                params={
                    "url": f"{domain}/*",
                    "output": "json",
                    "fl": "timestamp,original,statuscode,mimetype",
                    "collapse": "urlkey",
                    "limit": 500,
                    "from": "20000101",
                },
            )

            if resp.status_code != 200:
                result["accessible"] = False
                return result

            rows = resp.json()
            if not rows or len(rows) <= 1:
                result["total_snapshots"] = 0
                return result

            # Skip header row
            data_rows = rows[1:]
            result["total_snapshots"] = len(data_rows)

            timestamps = [r[0] for r in data_rows if r[0]]
            if timestamps:
                result["first_seen"] = _extract_year(min(timestamps)) + "-" + min(timestamps)[4:6]
                result["last_seen"] = _extract_year(max(timestamps)) + "-" + max(timestamps)[4:6]

            seen_paths = set()
            tech_years: dict[str, set] = {}

            for row in data_rows:
                if len(row) < 2:
                    continue
                timestamp, url, status, mime = (row + ["", ""])[:4]
                year = _extract_year(timestamp)

                # Extract path
                try:
                    path = "/" + url.split("/", 3)[-1] if "/" in url else url
                except Exception:
                    path = url

                if path not in seen_paths:
                    seen_paths.add(path)

                    # Check for sensitive files
                    for pattern, meta in SENSITIVE_FILE_PATTERNS.items():
                        if re.search(pattern, url.lower()):
                            result["sensitive_files"].append({
                                "url": url,
                                "path": path,
                                "label": meta["label"],
                                "risk": meta["risk"],
                                "year": year,
                                "status": status,
                            })
                            break

                    # Track historical paths (interesting ones)
                    if any(kw in path.lower() for kw in [
                        "admin", "api", "login", "backup", "config",
                        "upload", "export", "debug", "test", "staging"
                    ]) and path not in [p["path"] for p in result["historical_paths"][:100]]:
                        result["historical_paths"].append({
                            "path": path,
                            "year": year,
                            "status": status,
                        })

                    # Tech fingerprinting
                    for keyword, tech in TECH_FINGERPRINTS.items():
                        if keyword in url.lower():
                            tech_years.setdefault(tech, set()).add(year)
                            break

            # Build tech timeline
            for tech, years in tech_years.items():
                result["tech_timeline"][tech] = sorted(years)

            # Build issues
            critical_files = [f for f in result["sensitive_files"] if f["risk"] == "critical"]
            high_files = [f for f in result["sensitive_files"] if f["risk"] == "high"]

            if critical_files:
                result["issues"].append(
                    f"{len(critical_files)} critical file(s) found in archive "
                    f"({', '.join(set(f['label'] for f in critical_files[:3]))})"
                )
            if high_files:
                result["issues"].append(
                    f"{len(high_files)} high-risk file(s) found in archive"
                )

            result["risk_level"] = (
                "Critical" if critical_files else
                "High" if high_files else
                "Medium" if result["historical_paths"] else
                "Low"
            )

    except Exception as e:
        logger.error(f"Wayback Machine analysis failed for {domain}: {e}")
        result["accessible"] = False
        result["issues"].append(f"Wayback lookup failed: {str(e)}")

    return result
