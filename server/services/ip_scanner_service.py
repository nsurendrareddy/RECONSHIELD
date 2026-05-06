import asyncio
from typing import Dict, Any, List

from fastapi import WebSocket

# Import actual services
from .ip_info import get_ip_info
from .dns_service import dns_lookup as get_dns_info
from .port_check import port_check as scan_ports
from .ssl_service import ssl_analysis as analyze_ssl
from .headers_service import headers_analysis as check_security_headers
from .threat_intel import get_threat_intel
from .os_fingerprint import fingerprint_os


async def run_ip_scan(target: str, websocket: WebSocket = None) -> Dict[str, Any]:
    """Run the full IP intelligence scan.

    Parameters
    ----------
    target: str
        The domain or IP address to scan.
    websocket: WebSocket, optional
        If provided, progress updates are sent as JSON messages.
    """
    result: Dict[str, Any] = {}

    async def send(phase: str, data: Any):
        if websocket is not None:
            await websocket.send_json({"phase": phase, "data": data})
        # For non-websocket calls, we just log or ignore intermediate steps
        # but the terminal log in frontend will likely use this if we use WebSockets.

    # Phase 1 – IP Intelligence
    await send("Initializing Scan", {"status": "starting", "target": target})
    ip_info = await get_ip_info(target)
    result["ip_info"] = ip_info
    await send("IP Intelligence", ip_info)

    # Phase 2 – DNS & Reverse DNS
    dns_info = await get_dns_info(target)
    result["dns_info"] = dns_info
    await send("DNS & Reverse DNS", dns_info)

    # Phase 3 – Port Exposure
    ports = await scan_ports(target)
    result["ports"] = ports
    await send("Port Exposure", ports)

    # Phase 4 – SSL/TLS Analysis
    ssl = await analyze_ssl(target)
    result["ssl"] = ssl
    await send("SSL/TLS Analysis", ssl)

    # Phase 5 – Security Headers
    headers = await check_security_headers(target)
    result["headers"] = headers
    await send("Security Headers", headers)

    # Phase 6 – Threat Reputation
    threat = await get_threat_intel(target)
    result["threat"] = threat
    await send("Threat Reputation", threat)

    # Phase 7 – OS Fingerprinting
    os_fp = await fingerprint_os(target)
    result["os_fingerprint"] = os_fp
    await send("OS Fingerprinting", os_fp)

    # Phase 8 – Aggregate Risk Score
    risk_score = _calculate_risk(result)
    result["risk_score"] = risk_score
    await send("Risk Score", risk_score)

    # Phase 9 – Recommendations
    recommendations = _generate_recommendations(result)
    result["recommendations"] = recommendations
    await send("Security Recommendations", recommendations)

    await send("Scan Complete", {"status": "finished"})
    return result


def _calculate_risk(data: Dict[str, Any]) -> Dict[str, Any]:
    """Calculate an aggregate risk score (0-100)."""
    score = 0
    
    # 1. Threat Reputation (Weight: 30%)
    threat_score = data.get("threat", {}).get("score", 0)
    score += (threat_score * 0.3)
    
    # 2. Port Exposure (Weight: 25%)
    open_ports = data.get("ports", {}).get("open_ports", [])
    high_risk_ports = [p for p in open_ports if p.get("risk") == "High"]
    if high_risk_ports:
        score += 25
    elif open_ports:
        score += min(15, len(open_ports) * 3)
        
    # 3. SSL/TLS (Weight: 20%)
    ssl_data = data.get("ssl", {})
    if not ssl_data.get("has_ssl"):
        score += 20
    elif ssl_data.get("certificate", {}).get("is_expired"):
        score += 20
    elif ssl_data.get("risk_level") == "Medium":
        score += 10
        
    # 4. Security Headers (Weight: 25%)
    header_score = data.get("headers", {}).get("score", 100)
    score += ((100 - header_score) * 0.25)
    
    score = min(100, int(score))
    
    level = "Safe"
    if score >= 75:
        level = "Critical"
    elif score >= 50:
        level = "High"
    elif score >= 25:
        level = "Medium"
    elif score > 10:
        level = "Low"
        
    return {"score": score, "level": level}


def _generate_recommendations(data: Dict[str, Any]) -> List[str]:
    recs = []
    
    # Port recs
    open_ports = data.get("ports", {}).get("open_ports", [])
    high_risk_ports = [p for p in open_ports if p.get("risk") == "High"]
    if high_risk_ports:
        recs.append(f"Critical: Close exposed high-risk ports: {', '.join([str(p['port']) for p in high_risk_ports])}")
    
    # SSL recs
    ssl_data = data.get("ssl", {})
    if not ssl_data.get("has_ssl"):
        recs.append("Enable HTTPS and install an SSL/TLS certificate.")
    elif ssl_data.get("certificate", {}).get("is_expired"):
        recs.append("Renew the expired SSL certificate immediately.")
    
    # Header recs
    header_issues = data.get("headers", {}).get("issues", [])
    if header_issues:
        recs.append("Implement missing security headers (HSTS, CSP, X-Frame-Options).")
        
    # Threat recs
    if data.get("threat", {}).get("score", 0) > 50:
        recs.append("IP is reported for malicious activity. Investigate possible compromise.")
        
    if not recs:
        recs.append("No immediate security actions required. Maintain regular monitoring.")
        
    return recs
