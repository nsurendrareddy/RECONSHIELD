"""Export API routes — JSON and PDF downloads."""
import io
import json
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse, Response
from db.store import get_scan
from fpdf import FPDF
import textwrap
from utils.auth import get_current_user

router = APIRouter()

def sanitize_text(text: str) -> str:
    """Ensure text is latin-1 compatible for FPDF."""
    if not text: return ""
    return str(text).encode("latin-1", "replace").decode("latin-1")

@router.get("/{scan_id}/json")
async def export_json(scan_id: str, current_user: dict = Depends(get_current_user)):
    """Export scan results as JSON download."""
    scan = await get_scan(scan_id)
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    if scan["status"] != "completed":
        raise HTTPException(status_code=400, detail="Scan not completed yet")

    return Response(
        content=json.dumps(scan, indent=2),
        media_type="application/json",
        headers={"Content-Disposition": f'attachment; filename="reconshield_{scan["domain"]}_{scan_id[:8]}.json"'},
    )


def _build_pdf(scan: dict) -> bytes:
    """Generate a high-fidelity PDF report from advanced scan data."""
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    # Title & Header
    pdf.set_font("Helvetica", "B", 24)
    pdf.set_text_color(0, 200, 83) # Matrix Green
    pdf.cell(0, 20, "ReconShield Intelligence Report", ln=True, align="C")
    pdf.set_text_color(0, 0, 0)
    pdf.ln(5)

    # Domain Intelligence Block
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 8, sanitize_text(f"Target Domain: {scan.get('domain', 'Unknown')}"), ln=True)
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 6, sanitize_text(f"Scan ID: {scan.get('id')}"), ln=True)
    pdf.cell(0, 6, sanitize_text(f"Scan Timestamp: {scan.get('created_at', 'N/A')}"), ln=True)
    
    results = scan.get("results", {})
    risk = results.get("risk", {})
    
    # Risk Score Highlight
    pdf.ln(5)
    pdf.set_fill_color(240, 240, 240)
    pdf.set_font("Helvetica", "B", 16)
    score = risk.get('score', 0)
    grade = risk.get('grade', 'F')
    pdf.cell(0, 15, sanitize_text(f"Security Score: {score}/100  (Grade {grade})"), ln=True, align="C", fill=True)
    pdf.ln(10)

    # Executive Summary
    pdf.set_font("Helvetica", "B", 14)
    pdf.cell(0, 10, "1. Executive Summary", ln=True)
    pdf.set_font("Helvetica", "", 11)
    
    summary_text = sanitize_text(results.get("executive_summary", risk.get("summary", "No summary available")))
    for line in textwrap.wrap(summary_text, width=90, break_long_words=True):
        pdf.cell(0, 7, line, ln=True)
        
    pdf.ln(10)

    # Vulnerabilities
    vulns = risk.get("vulnerabilities", [])
    if vulns:
        pdf.set_font("Helvetica", "B", 14)
        pdf.cell(0, 10, "2. Critical Findings & Vulnerabilities", ln=True)
        pdf.set_font("Helvetica", "", 10)
        for v in vulns:
            sev = v.get("severity", "info").upper()
            if sev == "CRITICAL": pdf.set_text_color(200, 0, 0)
            elif sev == "HIGH": pdf.set_text_color(255, 100, 0)
            
            vuln_text = sanitize_text(f"[{sev}] {v.get('title', '')}: {v.get('detail', '')}")
            for line in textwrap.wrap(vuln_text, width=100, break_long_words=True):
                pdf.cell(0, 6, line, ln=True)
                
            pdf.set_text_color(0, 0, 0)
        pdf.ln(10)

    # Attack Surface Score & Compliance
    pdf.set_font("Helvetica", "B", 14)
    pdf.cell(0, 10, "3. Compliance Readiness", ln=True)
    comp = risk.get("compliance", {})
    pdf.set_font("Helvetica", "", 10)
    for framework, data in comp.items():
        pdf.cell(0, 6, sanitize_text(f"{framework.upper()} Readiness: {data.get('score', 0)}%"), ln=True)
    pdf.ln(10)

    # Attack Paths
    paths = risk.get("attack_paths", [])
    if paths:
        pdf.set_font("Helvetica", "B", 14)
        pdf.cell(0, 10, "4. Predictive Attack Paths", ln=True)
        pdf.set_font("Helvetica", "", 10)
        for p in paths:
            pdf.set_font("Helvetica", "B", 11)
            pdf.cell(0, 8, sanitize_text(f"Path: {p['name']} ({p['severity']})"), ln=True)
            pdf.set_font("Helvetica", "", 10)
            for step in p.get('steps', []):
                step_text = sanitize_text(f"  Step {step['step']}: {step['action']} (Tool: {step['tool']})")
                for line in textwrap.wrap(step_text, width=100, break_long_words=True):
                    pdf.cell(0, 6, line, ln=True)
            
            remed_text = sanitize_text(f"  Remediation: {p.get('remediation', '')}")
            for line in textwrap.wrap(remed_text, width=100, break_long_words=True):
                pdf.cell(0, 6, line, ln=True)
                
            pdf.ln(4)
        pdf.ln(10)

    # Infrastructure & Advanced Recon
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 14)
    pdf.cell(0, 10, "5. Infrastructure Intelligence", ln=True)
    pdf.set_font("Helvetica", "", 10)
    
    # Subdomains
    subs = results.get("subdomains", {})
    pdf.cell(0, 6, sanitize_text(f"Subdomains Found: {subs.get('count', 0)} ({subs.get('risky_count', 0)} risky)"), ln=True)
    
    # GitHub
    github = results.get("github", {})
    if github.get("leaks_found", 0) > 0:
        pdf.set_text_color(200, 0, 0)
        pdf.cell(0, 6, sanitize_text(f"ALERT: {github['leaks_found']} potential credential leak(s) found on GitHub"), ln=True)
        pdf.set_text_color(0, 0, 0)

    # Cloud
    s3 = results.get("s3_probe", {})
    if s3.get("public_buckets"):
        pdf.cell(0, 6, sanitize_text(f"Cloud Storage: {len(s3['public_buckets'])} public bucket(s) identified"), ln=True)

    # Infra
    infra = results.get("infra", {})
    if infra.get("services_detected"):
        pdf.ln(5)
        pdf.set_font("Helvetica", "B", 11)
        pdf.cell(0, 8, "Exposed Infrastructure Services:", ln=True)
        pdf.set_font("Helvetica", "", 10)
        for s in infra["services_detected"]:
            pdf.cell(0, 6, sanitize_text(f"  - {s['name']} (Risk: {s['risk']}): {s.get('note', '')}"), ln=True)

    # Technical Details: SSL/TLS
    pdf.ln(10)
    pdf.set_font("Helvetica", "B", 14)
    pdf.cell(0, 10, "6. Technical Configuration", ln=True)
    ssl_data = results.get("ssl", {})
    cert = ssl_data.get("certificate", {})
    if cert:
        pdf.set_font("Helvetica", "B", 11)
        pdf.cell(0, 8, "SSL/TLS Certificate:", ln=True)
        pdf.set_font("Helvetica", "", 10)
        pdf.cell(0, 6, sanitize_text(f"  Issuer: {cert.get('issuer', 'N/A')}"), ln=True)
        pdf.cell(0, 6, sanitize_text(f"  Valid Until: {cert.get('not_after', 'N/A')}"), ln=True)

    # Disclaimer
    pdf.ln(20)
    pdf.set_font("Helvetica", "I", 9)
    pdf.set_text_color(100, 100, 100)
    disclaimer_text = sanitize_text("CONFIDENTIAL REPORT: This document contains sensitive security intelligence. "
                        "All findings were collected via passive or simulated means. "
                        "ReconShield assumes no liability for unauthorized actions based on this report.")
    for line in textwrap.wrap(disclaimer_text, width=110, break_long_words=True):
        pdf.cell(0, 5, line, ln=True)

    # fpdf2 output() returns a bytearray by default
    return bytes(pdf.output())


@router.get("/{scan_id}/pdf")
async def export_pdf(scan_id: str, current_user: dict = Depends(get_current_user)):
    """Export scan results as high-fidelity PDF download."""
    scan = await get_scan(scan_id)
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    if scan["status"] != "completed":
        raise HTTPException(status_code=400, detail="Scan not completed yet")

    try:
        pdf_bytes = _build_pdf(scan)
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="reconshield_intelligence_{scan["domain"]}_{scan_id[:8]}.pdf"'},
    )
