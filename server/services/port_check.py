"""Safe port exposure assessment service."""
import asyncio
import socket
from utils.logger import logger

COMMON_PORTS = [
    {"port": 21, "service": "FTP", "risk": "High", "note": "File transfer"},
    {"port": 22, "service": "SSH", "risk": "Medium", "note": "Secure shell"},
    {"port": 25, "service": "SMTP", "risk": "Medium", "note": "Mail server"},
    {"port": 53, "service": "DNS", "risk": "Low", "note": "Name service"},
    {"port": 80, "service": "HTTP", "risk": "Low", "note": "Web server"},
    {"port": 443, "service": "HTTPS", "risk": "Low", "note": "Secure web"},
    {"port": 3306, "service": "MySQL", "risk": "High", "note": "Database exposed"},
    {"port": 3389, "service": "RDP", "risk": "High", "note": "Remote desktop"},
    {"port": 5432, "service": "PostgreSQL", "risk": "High", "note": "Database exposed"},
    {"port": 6379, "service": "Redis", "risk": "High", "note": "Cache exposed"},
    {"port": 8080, "service": "HTTP-Alt", "risk": "Medium", "note": "Alt web server"},
    {"port": 8443, "service": "HTTPS-Alt", "risk": "Low", "note": "Alt HTTPS"},
    {"port": 27017, "service": "MongoDB", "risk": "High", "note": "Database exposed"},
]


async def _check_port(host: str, port_info: dict, timeout: float = 3.0) -> dict:
    port = port_info["port"]
    try:
        _, writer = await asyncio.wait_for(
            asyncio.open_connection(host, port), timeout=timeout
        )
        writer.close()
        await writer.wait_closed()
        return {**port_info, "state": "open"}
    except (asyncio.TimeoutError, ConnectionRefusedError, OSError):
        return {**port_info, "state": "closed"}


async def port_check(domain: str) -> dict:
    try:
        host = socket.gethostbyname(domain)
    except socket.gaierror:
        return {"ports": [], "open_count": 0, "issues": ["Could not resolve domain"], "risk_level": "Medium"}

    tasks = [_check_port(host, p) for p in COMMON_PORTS]
    results = await asyncio.gather(*tasks)
    open_ports = [p for p in results if p["state"] == "open"]
    high_risk = [p for p in open_ports if p["risk"] == "High"]
    issues = [f"Port {p['port']} ({p['service']}) open — {p['note']}" for p in high_risk]
    risk_level = "High" if high_risk else "Medium" if len(open_ports) > 5 else "Low"

    return {
        "host": host, "ports": results, "open_ports": open_ports,
        "open_count": len(open_ports), "high_risk_count": len(high_risk),
        "issues": issues, "risk_level": risk_level,
    }
