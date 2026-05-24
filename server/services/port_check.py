"""Passive port exposure assessment service using Shodan InternetDB."""
import socket
import httpx
from utils.logger import logger

COMMON_PORTS_INFO = {
    21: {"service": "FTP", "risk": "High", "note": "File transfer (unencrypted)"},
    22: {"service": "SSH", "risk": "Medium", "note": "Secure shell"},
    23: {"service": "Telnet", "risk": "High", "note": "Unencrypted remote shell"},
    25: {"service": "SMTP", "risk": "Medium", "note": "Mail server"},
    53: {"service": "DNS", "risk": "Low", "note": "Name service"},
    80: {"service": "HTTP", "risk": "Low", "note": "Web server (unencrypted)"},
    110: {"service": "POP3", "risk": "Medium", "note": "Email retrieval"},
    143: {"service": "IMAP", "risk": "Medium", "note": "Email retrieval"},
    443: {"service": "HTTPS", "risk": "Low", "note": "Secure web"},
    3306: {"service": "MySQL", "risk": "High", "note": "Database exposed"},
    3389: {"service": "RDP", "risk": "High", "note": "Remote desktop"},
    5432: {"service": "PostgreSQL", "risk": "High", "note": "Database exposed"},
    6379: {"service": "Redis", "risk": "High", "note": "Cache exposed"},
    8080: {"service": "HTTP-Alt", "risk": "Medium", "note": "Alt web server"},
    8443: {"service": "HTTPS-Alt", "risk": "Low", "note": "Alt HTTPS"},
    9200: {"service": "Elasticsearch", "risk": "High", "note": "Database exposed"},
    27017: {"service": "MongoDB", "risk": "High", "note": "Database exposed"},
}

async def port_check(domain: str) -> dict:
    """Passive port check using Shodan InternetDB."""
    try:
        host = socket.gethostbyname(domain)
    except socket.gaierror:
        return {"ports": [], "open_count": 0, "issues": ["Could not resolve domain"], "risk_level": "Medium"}

    results = []
    issues = []
    high_risk_count = 0
    vulns = []
    cpes = []
    tags = []
    
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.get(f"https://internetdb.shodan.io/{host}")
            
            if resp.status_code == 200:
                data = resp.json()
                open_ports = data.get("ports", [])
                vulns = data.get("vulns", [])
                cpes = data.get("cpes", [])
                tags = data.get("tags", [])
                
                for port in open_ports:
                    info = COMMON_PORTS_INFO.get(port, {"service": "Unknown", "risk": "Low", "note": "Unknown service"})
                    results.append({
                        "port": port,
                        "service": info["service"],
                        "risk": info["risk"],
                        "note": info["note"],
                        "state": "open"
                    })
                    
                    if info["risk"] == "High":
                        high_risk_count += 1
                        issues.append(f"Port {port} ({info['service']}) open — {info['note']}")
                        
                if vulns:
                    issues.append(f"Host is vulnerable to {len(vulns)} known CVEs")
            elif resp.status_code == 404:
                # No data in InternetDB
                issues.append("No passive intelligence found for this IP")
            else:
                issues.append(f"Passive intelligence API returned {resp.status_code}")
                
    except Exception as e:
        logger.error(f"Passive port scan failed for {domain}: {e}")
        issues.append("Passive port scan failed due to network error")

    risk_level = "High" if high_risk_count > 0 or vulns else "Medium" if len(results) > 5 else "Low"

    return {
        "host": host,
        "ports": results,
        "open_ports": results,
        "open_count": len(results),
        "high_risk_count": high_risk_count,
        "cves": vulns,
        "cpes": cpes,
        "tags": tags,
        "issues": issues,
        "risk_level": risk_level,
        "method": "Passive (Shodan InternetDB)"
    }

