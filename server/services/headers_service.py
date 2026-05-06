"""Security headers analysis and grading service."""
import httpx
from utils.logger import logger

# Headers to check with descriptions
SECURITY_HEADERS = {
    "strict-transport-security": {
        "name": "Strict-Transport-Security (HSTS)",
        "description": "Forces browsers to use HTTPS",
        "severity": "high",
        "recommendation": "Add header: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
    },
    "content-security-policy": {
        "name": "Content-Security-Policy (CSP)",
        "description": "Prevents XSS and injection attacks",
        "severity": "high",
        "recommendation": "Implement a strict CSP policy tailored to your application's needs",
    },
    "x-frame-options": {
        "name": "X-Frame-Options",
        "description": "Prevents clickjacking attacks",
        "severity": "medium",
        "recommendation": "Add header: X-Frame-Options: DENY or SAMEORIGIN",
    },
    "x-content-type-options": {
        "name": "X-Content-Type-Options",
        "description": "Prevents MIME type sniffing",
        "severity": "medium",
        "recommendation": "Add header: X-Content-Type-Options: nosniff",
    },
    "referrer-policy": {
        "name": "Referrer-Policy",
        "description": "Controls referrer information sent with requests",
        "severity": "low",
        "recommendation": "Add header: Referrer-Policy: strict-origin-when-cross-origin",
    },
    "permissions-policy": {
        "name": "Permissions-Policy",
        "description": "Controls browser feature access",
        "severity": "low",
        "recommendation": "Add header to restrict camera, microphone, geolocation access",
    },
    "x-xss-protection": {
        "name": "X-XSS-Protection",
        "description": "Legacy XSS filter (use CSP instead)",
        "severity": "low",
        "recommendation": "Consider using CSP as the primary XSS protection",
    },
}

# Scoring weights
SEVERITY_SCORES = {"high": 20, "medium": 12, "low": 5}


async def headers_analysis(domain: str) -> dict:
    """Analyze security headers and generate a grade."""
    headers_result = []
    total_score = 100
    issues = []

    try:
        async with httpx.AsyncClient(
            follow_redirects=True, timeout=15, verify=False
        ) as client:
            response = await client.get(f"https://{domain}")
            resp_headers = {k.lower(): v for k, v in response.headers.items()}

            # Check info headers
            server_header = resp_headers.get("server", "Not disclosed")
            powered_by = resp_headers.get("x-powered-by", "Not disclosed")

            for header_key, info in SECURITY_HEADERS.items():
                value = resp_headers.get(header_key)
                present = value is not None

                entry = {
                    "header": info["name"],
                    "key": header_key,
                    "present": present,
                    "value": value if present else None,
                    "severity": info["severity"],
                    "description": info["description"],
                    "recommendation": info["recommendation"] if not present else None,
                    "status": "pass" if present else "fail",
                }

                if not present:
                    penalty = SEVERITY_SCORES.get(info["severity"], 5)
                    total_score -= penalty
                    issues.append(f"Missing {info['name']} header")

                headers_result.append(entry)

            # Additional checks
            if powered_by != "Not disclosed":
                issues.append(f"X-Powered-By header exposes technology: {powered_by}")
                total_score -= 5

            # Ensure score is within bounds
            total_score = max(0, min(100, total_score))

            # Grade calculation
            if total_score >= 90:
                grade = "A"
            elif total_score >= 75:
                grade = "B"
            elif total_score >= 60:
                grade = "C"
            elif total_score >= 40:
                grade = "D"
            else:
                grade = "F"

            return {
                "headers": headers_result,
                "score": total_score,
                "grade": grade,
                "server": server_header,
                "powered_by": powered_by,
                "issues": issues,
                "risk_level": "High" if grade in ("D", "F") else "Medium" if grade == "C" else "Low",
            }

    except Exception as e:
        logger.error(f"Headers analysis failed for {domain}: {e}")
        return {
            "headers": [],
            "score": 0,
            "grade": "F",
            "issues": [f"Could not analyze headers: {str(e)}"],
            "risk_level": "High",
            "error": str(e),
        }
