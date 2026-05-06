import httpx
import socket
from utils.logger import logger

async def get_ip_info(target: str) -> dict:
    """Get IP geolocation, ASN, and ISP information using ip-api.com."""
    try:
        # Resolve hostname to IP if needed
        try:
            ip = socket.gethostbyname(target)
        except socket.gaierror:
            ip = target # Might already be an IP

        async with httpx.AsyncClient(timeout=10) as client:
            # ip-api.com free tier fields: status, message, country, countryCode, region, regionName, city, zip, lat, lon, timezone, isp, org, as, asname, reverse, mobile, proxy, hosting
            resp = await client.get(f"http://ip-api.com/json/{ip}?fields=66846719")
            data = resp.json()

        if data.get("status") != "success":
            return {"ip": ip, "error": data.get("message", "Lookup failed"), "status": "fail"}

        return {
            "ip": ip,
            "ipv4": ip if ":" not in ip else None,
            "ipv6": ip if ":" in ip else None,
            "country": data.get("country", "Unknown"),
            "city": data.get("city", "Unknown"),
            "lat": data.get("lat"),
            "lon": data.get("lon"),
            "isp": data.get("isp", "Unknown"),
            "org": data.get("org", "Unknown"),
            "asn": data.get("as", "Unknown"),
            "as_name": data.get("asname", "Unknown"),
            "is_vpn": data.get("proxy", False),
            "is_proxy": data.get("proxy", False),
            "is_tor": False, # ip-api doesn't distinguish Tor specifically in free tier easily without extra checks
            "is_hosting": data.get("hosting", False),
            "confidence": 95 if data.get("proxy") else 100
        }

    except Exception as e:
        logger.error(f"IP info lookup failed for {target}: {e}")
        return {"error": str(e), "status": "fail"}
