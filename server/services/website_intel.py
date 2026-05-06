"""Website Intelligence Module — extracts metadata, detects phishing indicators."""
import httpx
import re
from utils.logger import logger


async def website_intelligence(domain: str) -> dict:
    """Extract website metadata and analyze for phishing indicators."""
    result = {
        "accessible": False,
        "title": None,
        "description": None,
        "favicon": None,
        "generator": None,
        "language": None,
        "phishing_indicators": [],
        "phishing_score": 0,
        "issues": [],
    }

    try:
        async with httpx.AsyncClient(
            follow_redirects=True, timeout=15, verify=False
        ) as client:
            resp = await client.get(f"https://{domain}")
            html = resp.text[:200000]
            result["accessible"] = True
            result["status_code"] = resp.status_code
            result["final_url"] = str(resp.url)

            # Extract title
            title_match = re.search(r'<title[^>]*>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
            if title_match:
                result["title"] = title_match.group(1).strip()[:200]

            # Meta description
            desc_match = re.search(
                r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)',
                html, re.IGNORECASE
            )
            if desc_match:
                result["description"] = desc_match.group(1).strip()[:500]

            # Favicon
            fav_match = re.search(
                r'<link[^>]+rel=["\'](?:shortcut )?icon["\'][^>]+href=["\']([^"\']*)',
                html, re.IGNORECASE
            )
            if fav_match:
                fav_url = fav_match.group(1)
                if fav_url.startswith("//"):
                    fav_url = "https:" + fav_url
                elif fav_url.startswith("/"):
                    fav_url = f"https://{domain}{fav_url}"
                result["favicon"] = fav_url
            else:
                result["favicon"] = f"https://{domain}/favicon.ico"

            # Generator meta
            gen_match = re.search(
                r'<meta[^>]+name=["\']generator["\'][^>]+content=["\']([^"\']*)',
                html, re.IGNORECASE
            )
            if gen_match:
                result["generator"] = gen_match.group(1).strip()

            # Language
            lang_match = re.search(r'<html[^>]+lang=["\']([^"\']*)', html, re.IGNORECASE)
            if lang_match:
                result["language"] = lang_match.group(1)

            # Phishing indicator checks
            indicators = []
            phish_score = 0

            # Check for login forms
            if re.search(r'<input[^>]+type=["\']password["\']', html, re.IGNORECASE):
                has_form = True
            else:
                has_form = False

            # Suspicious patterns
            suspicious_words = ['login', 'signin', 'verify', 'update', 'confirm', 'secure', 'account', 'suspend']
            title_lower = (result["title"] or "").lower()
            for word in suspicious_words:
                if word in title_lower and has_form:
                    indicators.append(f"Page title contains '{word}' with password form present")
                    phish_score += 10
                    break

            # Check for brand impersonation patterns
            brand_keywords = ['paypal', 'apple', 'microsoft', 'google', 'amazon', 'netflix', 'bank']
            for brand in brand_keywords:
                if brand in html.lower() and brand not in domain.lower():
                    indicators.append(f"References to '{brand}' found but domain doesn't match")
                    phish_score += 15
                    break

            # External form action
            form_match = re.search(r'<form[^>]+action=["\']([^"\']*)', html, re.IGNORECASE)
            if form_match:
                action = form_match.group(1)
                if action.startswith("http") and domain not in action:
                    indicators.append("Form submits data to external domain")
                    phish_score += 20

            # Data URI or obfuscated scripts
            if re.search(r'eval\s*\(|document\.write\s*\(|unescape\s*\(', html):
                indicators.append("Obfuscated JavaScript detected")
                phish_score += 10

            result["phishing_indicators"] = indicators
            result["phishing_score"] = min(phish_score, 100)
            result["risk_level"] = "High" if phish_score >= 30 else "Medium" if phish_score > 0 else "Low"

    except Exception as e:
        logger.error(f"Website intelligence failed for {domain}: {e}")
        result["issues"].append(f"Could not access website: {str(e)}")
        result["risk_level"] = "Medium"

    return result
