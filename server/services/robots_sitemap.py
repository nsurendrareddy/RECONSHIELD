"""Robots.txt and Sitemap.xml intelligence service."""
import httpx
import xml.etree.ElementTree as ET
import re
from utils.logger import logger

SENSITIVE_PATH_PATTERNS = [
    r"/admin", r"/login", r"/wp-admin", r"/phpmyadmin", r"/cpanel",
    r"/api/", r"/graphql", r"/swagger", r"/backup", r"/.git",
    r"/.env", r"/config", r"/database", r"/secret", r"/private",
    r"/internal", r"/debug", r"/test", r"/dev", r"/staging",
    r"/shell", r"/console", r"/dashboard", r"/manager",
]


def _classify_sensitive(path: str) -> str | None:
    path_lower = path.lower()
    for pattern in SENSITIVE_PATH_PATTERNS:
        if re.search(pattern, path_lower):
            return pattern.strip("/").replace("/", "")
    return None


async def _fetch_robots(domain: str, client: httpx.AsyncClient) -> dict:
    result = {
        "accessible": False,
        "disallowed": [],
        "allowed": [],
        "sitemaps": [],
        "sensitive_paths": [],
        "raw": None,
        "issues": [],
    }
    try:
        resp = await client.get(f"https://{domain}/robots.txt")
        if resp.status_code == 200 and "text" in resp.headers.get("content-type", ""):
            result["accessible"] = True
            result["raw"] = resp.text[:5000]
            for line in resp.text.splitlines():
                line = line.strip()
                if line.lower().startswith("disallow:"):
                    path = line.split(":", 1)[1].strip()
                    if path:
                        result["disallowed"].append(path)
                        cat = _classify_sensitive(path)
                        if cat:
                            result["sensitive_paths"].append({"path": path, "category": cat})
                elif line.lower().startswith("allow:"):
                    path = line.split(":", 1)[1].strip()
                    if path:
                        result["allowed"].append(path)
                elif line.lower().startswith("sitemap:"):
                    url = line.split(":", 1)[1].strip()
                    if url:
                        result["sitemaps"].append(url)

            if result["sensitive_paths"]:
                result["issues"].append(
                    f"{len(result['sensitive_paths'])} sensitive paths exposed in robots.txt "
                    f"(admin panels, APIs, config paths)"
                )
    except Exception as e:
        logger.debug(f"robots.txt fetch failed for {domain}: {e}")
    return result


async def _fetch_sitemap(domain: str, sitemap_urls: list, client: httpx.AsyncClient) -> dict:
    result = {
        "accessible": False,
        "url_count": 0,
        "urls": [],
        "unusual_entries": [],
        "issues": [],
    }
    # Try known sitemap URLs
    candidates = list(sitemap_urls) or [
        f"https://{domain}/sitemap.xml",
        f"https://{domain}/sitemap_index.xml",
        f"https://{domain}/sitemap-index.xml",
    ]

    UNUSUAL_PATTERNS = [
        r"backup", r"\.sql", r"\.bak", r"\.env", r"config",
        r"admin", r"internal", r"private", r"secret",
    ]

    for url in candidates[:3]:
        try:
            resp = await client.get(url)
            if resp.status_code == 200 and ("xml" in resp.headers.get("content-type", "") or resp.text.strip().startswith("<?xml")):
                result["accessible"] = True
                try:
                    root = ET.fromstring(resp.text[:500000])
                    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
                    locs = root.findall(".//sm:loc", ns) or root.findall(".//loc")
                    urls = [loc.text.strip() for loc in locs if loc.text]
                    result["url_count"] += len(urls)
                    result["urls"].extend(urls[:50])

                    for u in urls:
                        for pat in UNUSUAL_PATTERNS:
                            if re.search(pat, u.lower()):
                                result["unusual_entries"].append(u)
                                break
                except ET.ParseError:
                    pass
                break
        except Exception as e:
            logger.debug(f"Sitemap fetch failed for {url}: {e}")

    if result["unusual_entries"]:
        result["issues"].append(
            f"{len(result['unusual_entries'])} unusual URLs in sitemap "
            f"(potential backup/config files)"
        )
    return result


async def robots_sitemap_scan(domain: str) -> dict:
    """Fetch and analyze robots.txt and sitemap.xml."""
    issues = []
    try:
        async with httpx.AsyncClient(
            follow_redirects=True,
            timeout=12,
            verify=False,
            headers={"User-Agent": "ReconShield-Educational/1.0"},
        ) as client:
            robots = await _fetch_robots(domain, client)
            sitemap = await _fetch_sitemap(domain, robots.get("sitemaps", []), client)

        issues = robots["issues"] + sitemap["issues"]

        # Check for exposed admin paths in robots
        exposed_admin = [p for p in robots["sensitive_paths"] if "admin" in p["category"]]
        if exposed_admin:
            issues.append(f"Admin path(s) listed in robots.txt — attackers read robots.txt first")

        risk_level = "High" if len(issues) >= 2 else "Medium" if issues else "Low"

        return {
            "robots": robots,
            "sitemap": sitemap,
            "issues": issues,
            "risk_level": risk_level,
        }
    except Exception as e:
        logger.error(f"robots/sitemap scan failed for {domain}: {e}")
        return {"robots": {}, "sitemap": {}, "issues": [str(e)], "risk_level": "Low"}
