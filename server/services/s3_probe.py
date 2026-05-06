"""Cloud storage bucket exposure detection (AWS S3, Azure Blob, GCP, etc.)."""
import httpx
import re
from utils.logger import logger


def _generate_bucket_candidates(domain: str) -> list[dict]:
    """Generate candidate bucket names from domain."""
    # Extract company name from domain
    parts = domain.lower().replace("www.", "").split(".")
    company = parts[0] if parts else domain
    # Remove common TLDs
    names = [company]
    # Common variations
    for prefix in ["", "static", "assets", "media", "uploads", "cdn", "files", "storage", "backup", "dev", "staging"]:
        for sep in ["-", "."]:
            if prefix:
                names.append(f"{prefix}{sep}{company}")
                names.append(f"{company}{sep}{prefix}")

    candidates = []
    seen = set()
    for name in names[:20]:  # Limit to 20 candidates
        if name in seen:
            continue
        seen.add(name)
        candidates.extend([
            {"name": name, "url": f"https://{name}.s3.amazonaws.com", "provider": "AWS S3"},
            {"name": name, "url": f"https://s3.amazonaws.com/{name}", "provider": "AWS S3"},
            {"name": name, "url": f"https://{name}.blob.core.windows.net", "provider": "Azure Blob"},
            {"name": name, "url": f"https://storage.googleapis.com/{name}", "provider": "GCP Storage"},
        ])
    return candidates


CLOUD_CNAME_PATTERNS = {
    r"\.s3\.amazonaws\.com$": "AWS S3",
    r"\.s3-website[\.-]": "AWS S3 Static Website",
    r"\.cloudfront\.net$": "AWS CloudFront",
    r"\.blob\.core\.windows\.net$": "Azure Blob",
    r"\.azureedge\.net$": "Azure CDN",
    r"\.storage\.googleapis\.com$": "GCP Storage",
    r"\.appspot\.com$": "Google App Engine",
    r"\.herokuapp\.com$": "Heroku",
    r"\.github\.io$": "GitHub Pages",
    r"\.netlify\.app$": "Netlify",
    r"\.vercel\.app$": "Vercel",
    r"\.pages\.dev$": "Cloudflare Pages",
    r"\.amplifyapp\.com$": "AWS Amplify",
    r"\.onrender\.com$": "Render",
    r"\.fly\.dev$": "Fly.io",
}


def detect_cloud_from_subdomains(subdomains: list[str]) -> list[dict]:
    """Detect cloud providers from subdomain CNAME patterns."""
    detected = []
    for sub in subdomains:
        for pattern, provider in CLOUD_CNAME_PATTERNS.items():
            if re.search(pattern, sub.lower()):
                detected.append({
                    "subdomain": sub,
                    "provider": provider,
                    "risk": "medium",
                    "note": f"Hosted on {provider} — verify access controls",
                })
                break
    return detected


async def s3_probe(domain: str, subdomains: list[str] | None = None) -> dict:
    """Check for exposed cloud storage buckets."""
    result = {
        "buckets_checked": 0,
        "public_buckets": [],
        "cloud_providers_detected": [],
        "issues": [],
        "risk_level": "Low",
    }

    # Detect from subdomains first (passive, no requests needed)
    if subdomains:
        result["cloud_providers_detected"] = detect_cloud_from_subdomains(subdomains)

    # Active bucket checks
    candidates = _generate_bucket_candidates(domain)[:15]
    result["buckets_checked"] = len(candidates)

    try:
        async with httpx.AsyncClient(
            timeout=8, verify=False,
            follow_redirects=False,
            headers={"User-Agent": "ReconShield-Educational/1.0"}
        ) as client:
            for candidate in candidates:
                try:
                    resp = await client.head(candidate["url"])
                    # Public bucket returns 200 (listing) or 403 (exists but protected)
                    if resp.status_code == 200:
                        result["public_buckets"].append({
                            **candidate,
                            "status": "PUBLIC — listing enabled",
                            "risk": "critical",
                        })
                    elif resp.status_code == 403:
                        # Bucket exists but has access control — still noteworthy
                        result["public_buckets"].append({
                            **candidate,
                            "status": "EXISTS (access controlled)",
                            "risk": "info",
                        })
                except (httpx.ConnectTimeout, httpx.ConnectError):
                    pass  # Bucket doesn't exist
                except Exception:
                    pass

    except Exception as e:
        logger.error(f"S3 probe failed for {domain}: {e}")

    # Build issues
    exposed = [b for b in result["public_buckets"] if b["risk"] == "critical"]
    if exposed:
        result["issues"].append(
            f"{len(exposed)} publicly accessible cloud storage bucket(s) found — "
            f"potential data exposure"
        )
        result["risk_level"] = "Critical"
    elif result["cloud_providers_detected"]:
        result["issues"].append(
            f"Cloud infrastructure detected ({len(result['cloud_providers_detected'])} assets) — "
            f"verify access controls and bucket permissions"
        )
        result["risk_level"] = "Medium"

    return result
