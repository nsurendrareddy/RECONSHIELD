"""GitHub code leak discovery service (requires server-side GITHUB_TOKEN)."""
import os
import httpx
from utils.logger import logger

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

# Search queries to find domain-related leaks
SEARCH_QUERIES = [
    ('filename:.env "{domain}"', "Exposed .env file", "critical"),
    ('"{domain}" password', "Password exposure", "critical"),
    ('"{domain}" api_key OR api_secret', "API key exposure", "critical"),
    ('"{domain}" secret_key', "Secret key exposure", "critical"),
    ('filename:config.yml "{domain}"', "Config file exposure", "high"),
    ('filename:database.yml "{domain}"', "Database config exposure", "critical"),
    ('"{domain}" credentials', "Credentials exposure", "high"),
    ('"{domain}" connection_string', "DB connection string", "critical"),
]


async def github_recon(domain: str) -> dict:
    """Search GitHub for domain-specific code leaks and credential exposures."""
    result = {
        "enabled": bool(GITHUB_TOKEN),
        "leaks_found": 0,
        "results": [],
        "queries_run": 0,
        "issues": [],
        "risk_level": "Low",
        "message": None,
    }

    if not GITHUB_TOKEN:
        result["message"] = (
            "GitHub recon disabled — add GITHUB_TOKEN to server .env to enable "
            "real-time credential leak detection"
        )
        return result

    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "ReconShield-Educational/1.0",
    }

    try:
        async with httpx.AsyncClient(headers=headers, timeout=15) as client:
            for query_template, label, risk in SEARCH_QUERIES[:5]:  # Limit to 5 queries/scan
                query = query_template.format(domain=domain)
                try:
                    resp = await client.get(
                        "https://api.github.com/search/code",
                        params={"q": query, "per_page": 5},
                    )
                    result["queries_run"] += 1

                    if resp.status_code == 200:
                        data = resp.json()
                        items = data.get("items", [])
                        for item in items:
                            result["results"].append({
                                "file": item.get("name", ""),
                                "repo": item.get("repository", {}).get("full_name", ""),
                                "url": item.get("html_url", ""),
                                "label": label,
                                "risk": risk,
                                "query": query,
                            })
                    elif resp.status_code == 403:
                        result["message"] = "GitHub API rate limit reached — try again later"
                        break
                    elif resp.status_code == 422:
                        continue  # Query not valid, skip

                except Exception as e:
                    logger.debug(f"GitHub search query failed: {e}")
                    continue

        result["leaks_found"] = len(result["results"])
        critical = [r for r in result["results"] if r["risk"] == "critical"]

        if critical:
            result["issues"].append(
                f"{len(critical)} potential critical leak(s) found on GitHub "
                f"(credentials, API keys, config files)"
            )
            result["risk_level"] = "Critical"
        elif result["results"]:
            result["issues"].append(
                f"{result['leaks_found']} potential leak(s) found on GitHub — review immediately"
            )
            result["risk_level"] = "High"

    except Exception as e:
        logger.error(f"GitHub recon failed for {domain}: {e}")
        result["message"] = f"GitHub recon error: {str(e)}"

    return result
