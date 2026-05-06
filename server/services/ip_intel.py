"""IP intelligence and geolocation service."""
import socket
import httpx
from utils.logger import logger


async def ip_intelligence(domain: str) -> dict:
    """Get IP geolocation, ASN, and ISP information."""
    try:
        ip = socket.gethostbyname(domain)
    except socket.gaierror:
        return {"error": "Could not resolve domain", "issues": ["DNS resolution failed"], "risk_level": "High"}

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            # ip-api.com is free, no key needed (limit 45/min)
            resp = await client.get(f"http://ip-api.com/json/{ip}?fields=66846719")
            data = resp.json()

        if data.get("status") != "success":
            return {"ip": ip, "error": "Lookup failed", "issues": [], "risk_level": "Medium"}

        issues = []
        hosting = data.get("hosting", False)
        if hosting:
            issues.append("IP is identified as a hosting/datacenter IP")

        proxy = data.get("proxy", False)
        if proxy:
            issues.append("IP detected as proxy/VPN — may indicate evasion")

        return {
            "ip": ip,
            "country": data.get("country", "Unknown"),
            "country_code": data.get("countryCode", ""),
            "region": data.get("regionName", ""),
            "city": data.get("city", ""),
            "zip": data.get("zip", ""),
            "lat": data.get("lat"),
            "lon": data.get("lon"),
            "timezone": data.get("timezone", ""),
            "isp": data.get("isp", "Unknown"),
            "org": data.get("org", "Unknown"),
            "as_number": data.get("as", ""),
            "as_name": data.get("asname", ""),
            "is_hosting": hosting,
            "is_proxy": proxy,
            "is_mobile": data.get("mobile", False),
            "issues": issues,
            "risk_level": "Medium" if issues else "Low",
        }

    except Exception as e:
        logger.error(f"IP intelligence failed for {domain}: {e}")
        return {"ip": ip, "error": str(e), "issues": [str(e)], "risk_level": "Medium"}
