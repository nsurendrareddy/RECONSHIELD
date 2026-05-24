"""IP intelligence and geolocation service."""
import socket
import httpx
import asyncio
import dns.resolver
from utils.logger import logger

DNSBL_FEEDS = {
    "zen.spamhaus.org": "Spamhaus ZEN",
    "b.barracudacentral.org": "Barracuda",
    "cbl.abuseat.org": "CBL Abuseat",
    "dnsbl.sorbs.net": "SORBS",
    "bl.spamcop.net": "SpamCop"
}

async def _check_dnsbl(ip: str, domain: str) -> dict:
    rev_ip = ".".join(reversed(ip.split(".")))
    try:
        # Run synchronous dns resolution in thread or just use async wrapper
        # Since dns.resolver is synchronous, we'll wrap it in asyncio.to_thread
        answers = await asyncio.to_thread(dns.resolver.resolve, f"{rev_ip}.{domain}", "A")
        return {"feed": DNSBL_FEEDS[domain], "listed": True, "result": str(answers[0])}
    except Exception:
        return {"feed": DNSBL_FEEDS[domain], "listed": False}


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
            issues.append("IP detected as proxy/VPN/TOR — may indicate evasion")

        # Reverse DNS
        try:
            rev_dns = await asyncio.to_thread(socket.gethostbyaddr, ip)
            reverse = rev_dns[0]
        except Exception:
            reverse = data.get("reverse", "Unknown")

        # Blacklist checks
        bl_tasks = [_check_dnsbl(ip, feed) for feed in DNSBL_FEEDS.keys()]
        bl_results = await asyncio.gather(*bl_tasks, return_exceptions=True)
        
        blacklists = []
        abuse_score = 0
        for res in bl_results:
            if isinstance(res, dict) and res.get("listed"):
                blacklists.append(res["feed"])
                abuse_score += 20
                issues.append(f"IP is listed on threat feed: {res['feed']}")
        
        if abuse_score > 100:
            abuse_score = 100

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
            "reverse_dns": reverse,
            "is_hosting": hosting,
            "is_proxy": proxy,
            "is_mobile": data.get("mobile", False),
            "blacklists": blacklists,
            "abuse_score": abuse_score,
            "issues": issues,
            "risk_level": "High" if abuse_score > 0 else "Medium" if issues else "Low",
        }

    except Exception as e:
        logger.error(f"IP intelligence failed for {domain}: {e}")
        return {"ip": ip, "error": str(e), "issues": [str(e)], "risk_level": "Medium"}
