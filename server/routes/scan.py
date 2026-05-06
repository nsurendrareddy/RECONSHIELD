"""Scan API routes with real-time progress tracking."""
import asyncio
from uuid import uuid4
from datetime import datetime
from fastapi import APIRouter, Request, BackgroundTasks, HTTPException
from middleware.rate_limiter import limiter
from middleware.validator import ScanRequest
from db.store import create_scan, update_scan, fail_scan, get_scan, get_history
from services.whois_service import whois_lookup
from services.dns_service import dns_lookup
from services.ssl_service import ssl_analysis
from services.headers_service import headers_analysis
from services.port_check import port_check
from services.tech_detect import tech_detect
from services.ip_intel import ip_intelligence
from services.subdomains import subdomain_enum
from services.website_intel import website_intelligence
from services.robots_sitemap import robots_sitemap_scan
from services.wayback_machine import wayback_analysis
from services.graphql_probe import graphql_probe
from services.s3_probe import s3_probe
from services.infra_probe import infra_probe
from services.github_recon import github_recon
from services.vuln_simulation import vuln_simulation
from services.linux_tools import run_all_linux_tools, get_available_tools
from engine.risk_engine import analyze_risk
from engine.ai_explainer import generate_ai_explanations, generate_executive_summary
from utils.logger import logger

router = APIRouter()

# In-memory progress tracking for active scans
_scan_progress: dict[str, list[dict]] = {}

TOTAL_MODULES = 20  # Updated count


async def _run_module(name: str, coro, scan_id: str):
    """Run a single module and track progress."""
    _scan_progress.setdefault(scan_id, []).append(
        {"module": name, "status": "running", "ts": datetime.utcnow().isoformat()}
    )
    try:
        result = await coro
        _scan_progress[scan_id].append(
            {"module": name, "status": "done", "ts": datetime.utcnow().isoformat()}
        )
        return result
    except Exception as e:
        _scan_progress[scan_id].append(
            {"module": name, "status": "error", "error": str(e), "ts": datetime.utcnow().isoformat()}
        )
        return {"error": str(e)}


async def _run_scan(scan_id: str, domain: str):
    """Run all scan modules with progress tracking."""
    try:
        logger.info(f"Starting scan {scan_id} for {domain}")
        _scan_progress[scan_id] = [
            {"module": "init", "status": "done", "ts": datetime.utcnow().isoformat()}
        ]

        # Phase 1: Core services — run concurrently
        core_results = await asyncio.gather(
            _run_module("WHOIS Lookup", whois_lookup(domain), scan_id),
            _run_module("DNS Resolution", dns_lookup(domain), scan_id),
            _run_module("SSL/TLS Analysis", ssl_analysis(domain), scan_id),
            _run_module("Security Headers", headers_analysis(domain), scan_id),
            _run_module("Port Scanning", port_check(domain), scan_id),
            _run_module("Technology Detection", tech_detect(domain), scan_id),
            _run_module("IP Intelligence", ip_intelligence(domain), scan_id),
            _run_module("Subdomain Enumeration", subdomain_enum(domain), scan_id),
            _run_module("Website Intelligence", website_intelligence(domain), scan_id),
            _run_module("Robots/Sitemap Analysis", robots_sitemap_scan(domain), scan_id),
            _run_module("Wayback Machine Analysis", wayback_analysis(domain), scan_id),
            return_exceptions=True,
        )

        scan_data = {
            "_domain": domain,
            "whois":      core_results[0] if not isinstance(core_results[0], Exception) else {"error": str(core_results[0])},
            "dns":        core_results[1] if not isinstance(core_results[1], Exception) else {"error": str(core_results[1])},
            "ssl":        core_results[2] if not isinstance(core_results[2], Exception) else {"error": str(core_results[2])},
            "headers":    core_results[3] if not isinstance(core_results[3], Exception) else {"error": str(core_results[3])},
            "ports":      core_results[4] if not isinstance(core_results[4], Exception) else {"error": str(core_results[4])},
            "tech":       core_results[5] if not isinstance(core_results[5], Exception) else {"error": str(core_results[5])},
            "ip":         core_results[6] if not isinstance(core_results[6], Exception) else {"error": str(core_results[6])},
            "subdomains": core_results[7] if not isinstance(core_results[7], Exception) else {"error": str(core_results[7])},
            "website":    core_results[8] if not isinstance(core_results[8], Exception) else {"error": str(core_results[8])},
            "robots_sitemap": core_results[9] if not isinstance(core_results[9], Exception) else {"error": str(core_results[9])},
            "wayback":    core_results[10] if not isinstance(core_results[10], Exception) else {"error": str(core_results[10])},
        }

        # Phase 2: Advanced recon services — use data from phase 1
        subdomains_list = scan_data["subdomains"].get("subdomains", []) if isinstance(scan_data["subdomains"], dict) else []
        headers_data = scan_data["headers"] if isinstance(scan_data["headers"], dict) else {}

        adv_results = await asyncio.gather(
            _run_module("GraphQL Probe", graphql_probe(domain), scan_id),
            _run_module("Cloud Storage Probe", s3_probe(domain, subdomains_list), scan_id),
            _run_module("Infrastructure Probe", infra_probe(domain), scan_id),
            _run_module("GitHub Recon", github_recon(domain), scan_id),
            _run_module("Vulnerability Simulation", vuln_simulation(domain, headers_data), scan_id),
            return_exceptions=True,
        )

        scan_data["graphql"]   = adv_results[0] if not isinstance(adv_results[0], Exception) else {"error": str(adv_results[0])}
        scan_data["s3_probe"]  = adv_results[1] if not isinstance(adv_results[1], Exception) else {"error": str(adv_results[1])}
        scan_data["infra"]     = adv_results[2] if not isinstance(adv_results[2], Exception) else {"error": str(adv_results[2])}
        scan_data["github"]    = adv_results[3] if not isinstance(adv_results[3], Exception) else {"error": str(adv_results[3])}
        scan_data["vuln_sim"]  = adv_results[4] if not isinstance(adv_results[4], Exception) else {"error": str(adv_results[4])}

        # Linux tools (optional)
        linux = get_available_tools()
        if any(linux.values()):
            scan_data["linux_tools"] = await _run_module(
                "Linux Tools", run_all_linux_tools(domain), scan_id
            )

        # Risk analysis
        _scan_progress[scan_id].append(
            {"module": "Risk Analysis", "status": "running", "ts": datetime.utcnow().isoformat()}
        )
        risk = analyze_risk(scan_data)
        scan_data["risk"] = risk

        # AI Explanations
        _scan_progress[scan_id].append(
            {"module": "AI Analysis", "status": "running", "ts": datetime.utcnow().isoformat()}
        )
        ai_explanations = generate_ai_explanations(scan_data)
        executive_summary = generate_executive_summary(scan_data, risk["score"], risk["grade"])
        scan_data["ai_explanations"] = ai_explanations
        scan_data["executive_summary"] = executive_summary

        _scan_progress[scan_id].append(
            {"module": "Complete", "status": "done", "ts": datetime.utcnow().isoformat()}
        )

        await update_scan(scan_id, scan_data, risk["score"], risk["grade"])
        logger.info(f"Scan {scan_id} completed — Score: {risk['score']}, Grade: {risk['grade']}")

        # Cleanup progress after 5 min
        await asyncio.sleep(300)
        _scan_progress.pop(scan_id, None)

    except Exception as e:
        logger.error(f"Scan {scan_id} failed: {e}", exc_info=True)
        await fail_scan(scan_id, str(e))
        _scan_progress.pop(scan_id, None)


@router.post("")
@limiter.limit("5/15minutes")
async def start_scan(request: Request, body: ScanRequest, background_tasks: BackgroundTasks):
    """Start a new security scan."""
    scan_id = str(uuid4())
    await create_scan(scan_id, body.domain)
    background_tasks.add_task(_run_scan, scan_id, body.domain)

    return {
        "id": scan_id,
        "domain": body.domain,
        "status": "running",
        "message": "Scan started. Poll /api/scan/{id} for results.",
    }


@router.get("/{scan_id}")
async def get_scan_results(scan_id: str):
    """Get scan results by ID."""
    scan = await get_scan(scan_id)
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    return scan


@router.get("/{scan_id}/status")
async def get_scan_status(scan_id: str):
    """Get scan status with real-time module progress."""
    scan = await get_scan(scan_id)
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")

    progress = _scan_progress.get(scan_id, [])
    completed_modules = [p["module"] for p in progress if p["status"] == "done"]
    running_modules = [p["module"] for p in progress if p["status"] == "running"]
    current_module = (
        running_modules[-1] if running_modules else
        completed_modules[-1] if completed_modules else
        "Initializing"
    )

    return {
        "id": scan["id"],
        "status": scan["status"],
        "score": scan.get("score"),
        "grade": scan.get("grade"),
        "progress": progress,
        "current_module": current_module,
        "completed_count": len(completed_modules),
        "total_modules": TOTAL_MODULES,
    }


@router.get("/{scan_id}/diff/{other_id}")
async def diff_scans(scan_id: str, other_id: str):
    """Compare two scan results and return what changed."""
    scan1 = await get_scan(scan_id)
    scan2 = await get_scan(other_id)
    if not scan1 or not scan2:
        raise HTTPException(status_code=404, detail="One or both scans not found")

    r1 = scan1.get("results", {})
    r2 = scan2.get("results", {})

    def _safe_set(data, keys):
        try:
            obj = data
            for k in keys:
                obj = obj.get(k, {}) if isinstance(obj, dict) else {}
            return set(obj) if isinstance(obj, list) else set()
        except Exception:
            return set()

    subs1 = set(r1.get("subdomains", {}).get("subdomains", []))
    subs2 = set(r2.get("subdomains", {}).get("subdomains", []))
    ports1 = set(p["port"] for p in r1.get("ports", {}).get("open_ports", []))
    ports2 = set(p["port"] for p in r2.get("ports", {}).get("open_ports", []))
    techs1 = set(t["name"] for t in r1.get("tech", {}).get("technologies", []))
    techs2 = set(t["name"] for t in r2.get("tech", {}).get("technologies", []))

    score1 = scan1.get("score", 0)
    score2 = scan2.get("score", 0)

    return {
        "scan_a": {"id": scan1["id"], "domain": scan1["domain"], "score": score1, "date": scan1.get("created_at")},
        "scan_b": {"id": scan2["id"], "domain": scan2["domain"], "score": score2, "date": scan2.get("created_at")},
        "score_delta": score2 - score1,
        "score_trend": "improved" if score2 > score1 else "degraded" if score2 < score1 else "unchanged",
        "new_subdomains": list(subs2 - subs1),
        "removed_subdomains": list(subs1 - subs2),
        "new_ports": list(ports2 - ports1),
        "closed_ports": list(ports1 - ports2),
        "new_tech": list(techs2 - techs1),
        "removed_tech": list(techs1 - techs2),
        "headers_grade_a": r1.get("headers", {}).get("grade"),
        "headers_grade_b": r2.get("headers", {}).get("grade"),
        "ssl_risk_a": r1.get("ssl", {}).get("risk_level"),
        "ssl_risk_b": r2.get("ssl", {}).get("risk_level"),
    }


@router.get("/{scan_id}/ask")
async def ask_about_scan(scan_id: str, q: str = ""):
    """Chatbot endpoint — answer questions about a specific scan."""
    scan = await get_scan(scan_id)
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")

    from engine.ai_explainer import answer_question
    answer = answer_question(scan.get("results", {}), q)
    return {"question": q, "answer": answer}
