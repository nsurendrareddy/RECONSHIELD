"""Optional Linux tools integration (Nmap, Amass, theHarvester, WhatWeb, Nikto)."""
import asyncio
import shutil
import json
import re
from utils.logger import logger


def _tool_available(name: str) -> bool:
    """Check if a Linux tool is installed."""
    return shutil.which(name) is not None


def get_available_tools() -> dict:
    """Return dict of available Linux tools."""
    tools = {
        "nmap": _tool_available("nmap"),
        "amass": _tool_available("amass"),
        "theHarvester": _tool_available("theHarvester"),
        "whatweb": _tool_available("whatweb"),
        "nikto": _tool_available("nikto"),
    }
    return tools


async def _run_cmd(cmd: list[str], timeout: int = 60) -> str:
    """Run a command safely with timeout."""
    try:
        proc = await asyncio.create_subprocess_exec(
            *cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=timeout)
        return stdout.decode("utf-8", errors="replace")
    except asyncio.TimeoutError:
        proc.kill()
        return f"Command timed out after {timeout}s"
    except Exception as e:
        return f"Error: {str(e)}"


async def run_nmap(domain: str) -> dict:
    """Safe Nmap scan — limited ports, service version only."""
    if not _tool_available("nmap"):
        return {"available": False, "error": "nmap not installed"}

    output = await _run_cmd(["nmap", "-F", "-sV", "--open", domain])
    ports = []
    for line in output.split("\n"):
        match = re.match(r'^(\d+)/(tcp|udp)\s+(\w+)\s+(.*)', line.strip())
        if match:
            ports.append({
                "port": int(match.group(1)),
                "protocol": match.group(2),
                "state": match.group(3),
                "service": match.group(4).strip(),
            })

    return {"available": True, "ports": ports, "raw": output[:2000]}


async def run_amass(domain: str) -> dict:
    """Passive subdomain enumeration with Amass."""
    if not _tool_available("amass"):
        return {"available": False, "error": "amass not installed"}

    output = await _run_cmd(["amass", "enum", "-passive", "-d", domain], timeout=90)
    subs = [l.strip() for l in output.split("\n") if l.strip() and domain in l]
    return {"available": True, "subdomains": subs, "count": len(subs)}


async def run_theharvester(domain: str) -> dict:
    """OSINT collection with theHarvester."""
    if not _tool_available("theHarvester"):
        return {"available": False, "error": "theHarvester not installed"}

    output = await _run_cmd(["theHarvester", "-d", domain, "-b", "google"], timeout=60)
    emails = re.findall(r'[\w.-]+@[\w.-]+\.\w+', output)
    return {"available": True, "emails": list(set(emails)), "raw": output[:2000]}


async def run_whatweb(domain: str) -> dict:
    """Technology detection with WhatWeb."""
    if not _tool_available("whatweb"):
        return {"available": False, "error": "whatweb not installed"}

    output = await _run_cmd(["whatweb", domain])
    return {"available": True, "raw": output[:2000]}


async def run_nikto(domain: str) -> dict:
    """Basic vulnerability check with Nikto (light mode only)."""
    if not _tool_available("nikto"):
        return {"available": False, "error": "nikto not installed"}

    output = await _run_cmd(["nikto", "-h", domain, "-Tuning", "1"], timeout=90)
    findings = [l.strip() for l in output.split("\n") if l.strip().startswith("+")]
    return {"available": True, "findings": findings, "raw": output[:3000]}


async def run_all_linux_tools(domain: str) -> dict:
    """Run all available Linux tools."""
    available = get_available_tools()
    if not any(available.values()):
        return {"available": False, "tools": available, "message": "No Linux recon tools detected"}

    results = {}
    if available["nmap"]:
        results["nmap"] = await run_nmap(domain)
    if available["amass"]:
        results["amass"] = await run_amass(domain)
    if available["theHarvester"]:
        results["theHarvester"] = await run_theharvester(domain)
    if available["whatweb"]:
        results["whatweb"] = await run_whatweb(domain)
    if available["nikto"]:
        results["nikto"] = await run_nikto(domain)

    return {"available": True, "tools": available, "results": results}
