"""AI Security Explanation Engine — generates detailed, human-readable security analysis."""

EXPLANATIONS = {
    "no_ssl": {"title": "No SSL/TLS Certificate Detected", "impact": "All data between users and this website is transmitted in plain text.", "attack": "Man-in-the-Middle (MITM) — An attacker on the same network can intercept all traffic using tools like Wireshark.", "real_world": "In 2015, Lenovo shipped laptops with Superfish adware that performed MITM attacks on HTTPS connections.", "fix": "Install a free SSL certificate from Let's Encrypt and configure HTTPS.", "difficulty": "Easy", "time_estimate": "15-30 minutes"},
    "expired_ssl": {"title": "SSL Certificate Expired", "impact": "Browsers display security warnings. The certificate no longer guarantees the server's identity.", "attack": "An attacker could present a fake certificate while users are conditioned to ignore warnings.", "real_world": "In 2020, Microsoft Teams experienced a global outage due to an expired SSL certificate.", "fix": "Renew the SSL certificate immediately. Set up auto-renewal with Let's Encrypt certbot.", "difficulty": "Easy", "time_estimate": "10 minutes"},
    "no_https_redirect": {"title": "HTTP to HTTPS Redirect Missing", "impact": "Users on HTTP are not upgraded to HTTPS, leaving connections unencrypted.", "attack": "SSL Stripping — attacker keeps victim on HTTP indefinitely using sslstrip tool.", "real_world": "Demonstrated at Black Hat 2009 by Moxie Marlinspike — trivially intercepts banking sessions.", "fix": "Add 301 redirect from HTTP to HTTPS. Enable HSTS.", "difficulty": "Easy", "time_estimate": "5 minutes"},
    "no_hsts": {"title": "HSTS Not Enabled", "impact": "Browsers won't enforce HTTPS, leaving users vulnerable to downgrade attacks.", "attack": "Protocol Downgrade — first connection can be intercepted before browser knows to use HTTPS.", "real_world": "HSTS preloading is required by major browsers. PayPal uses max-age=1 year.", "fix": "Add header: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload", "difficulty": "Easy", "time_estimate": "5 minutes"},
    "no_csp": {"title": "Content Security Policy Not Configured", "impact": "No restrictions on script execution — XSS attacks are significantly easier.", "attack": "XSS — attackers inject JavaScript that steals sessions, redirects users, or skims payment cards.", "real_world": "British Airways was fined £20M after card-skimming JavaScript was injected — CSP would have blocked it.", "fix": "Implement CSP: Content-Security-Policy: default-src 'self'; script-src 'self'", "difficulty": "Medium", "time_estimate": "1-2 hours"},
    "no_xframe": {"title": "X-Frame-Options Missing", "impact": "Website can be embedded in iframes on malicious sites — clickjacking attacks.", "attack": "Clickjacking — overlay invisible iframes to trick users into clicking hidden buttons.", "real_world": "Facebook 'likejacking' tricked millions into liking pages by hiding Like button under fake content.", "fix": "Add header: X-Frame-Options: DENY", "difficulty": "Easy", "time_estimate": "2 minutes"},
    "no_spf": {"title": "SPF Record Not Found", "impact": "Any mail server can send emails claiming to be from your domain.", "attack": "Email Spoofing / Phishing — impersonate your domain in targeted attacks.", "real_world": "The 2016 DNC email hack began with phishing emails that appeared to come from Google. SPF/DMARC would have flagged them.", "fix": "Add TXT DNS record: v=spf1 include:_spf.google.com ~all", "difficulty": "Easy", "time_estimate": "10 minutes"},
    "no_dmarc": {"title": "DMARC Record Not Found", "impact": "No policy for failed email authentication — spoofed emails may still be delivered.", "attack": "Business Email Compromise (BEC) — impersonate executives for wire transfer fraud.", "real_world": "BEC caused $2.4B in losses in 2021 (FBI). DMARC p=reject is the primary defense.", "fix": "Add DNS TXT: _dmarc.yourdomain.com → v=DMARC1; p=reject; rua=mailto:dmarc@yourdomain.com", "difficulty": "Medium", "time_estimate": "15-30 minutes"},
    "exposed_database": {"title": "Database Port Exposed to Internet", "impact": "Direct database access from the internet allows brute-force, exploitation, or default credential attacks.", "attack": "Database Exploitation — attackers scan for open DB ports and attempt authentication.", "real_world": "In 2017, thousands of MongoDB instances were ransomed after being left exposed with no authentication.", "fix": "Firewall the database port. Only allow access from your application server IP.", "difficulty": "Medium", "time_estimate": "15 minutes"},
    "exposed_rdp": {"title": "RDP (Remote Desktop) Exposed", "impact": "RDP is one of the most targeted services. Constantly brute-forced and exploited.", "attack": "BlueKeep / RDP Brute Force — automated tools scan for open RDP and attempt credential stuffing.", "real_world": "BlueKeep (CVE-2019-0708) allowed RCE on exposed RDP servers affecting hospitals and critical infrastructure.", "fix": "Use VPN for remote access instead of exposing RDP. Enable Network Level Authentication.", "difficulty": "Medium", "time_estimate": "30 minutes"},
    "version_exposure": {"title": "Server Version Information Exposed", "impact": "Revealing exact software versions helps attackers identify known CVEs.", "attack": "Targeted Exploitation — attackers match versions against CVE databases for specific exploits.", "real_world": "The Equifax breach (2017) exploited a known Apache Struts vulnerability. Version exposure made targeting trivial.", "fix": "Remove version info from Server and X-Powered-By headers.", "difficulty": "Easy", "time_estimate": "5 minutes"},
    "risky_subdomains": {"title": "Risky Subdomains Detected", "impact": "dev/staging/admin subdomains often have weaker security, debug modes, or outdated software.", "attack": "Subdomain Takeover / Lateral Movement — compromise a weak subdomain, pivot to production.", "real_world": "Uber's 2016 breach originated from a developer staging server with hardcoded AWS credentials.", "fix": "Audit all subdomains. Remove unused ones. Apply equal security to all environments.", "difficulty": "Medium", "time_estimate": "1-2 hours"},
    "new_domain": {"title": "Recently Registered Domain", "impact": "New domains are higher-risk — associated with phishing and malicious infrastructure.", "attack": "Phishing Infrastructure — attackers register similar domains for phishing campaigns.", "real_world": "During COVID-19, thousands of newly registered domains mimicking WHO/CDC were used in phishing.", "fix": "Build reputation via proper email authentication (SPF/DKIM/DMARC) and consistent DNS.", "difficulty": "Easy", "time_estimate": "Ongoing"},
    "cors_misconfiguration": {"title": "CORS Misconfiguration", "impact": "Attackers can read cross-origin responses containing sensitive user data and session tokens.", "attack": "Cross-Origin Request Forgery — malicious site reads your API responses using victim's session.", "real_world": "Multiple major bug bounty payouts for CORS misconfigs allowing account takeover via session token theft.", "fix": "Whitelist specific trusted origins. Never reflect arbitrary Origin header values.", "difficulty": "Easy", "time_estimate": "10 minutes"},
    "github_leak": {"title": "Credentials Found on GitHub", "impact": "Exposed API keys, passwords, and credentials allow direct unauthorized access to systems.", "attack": "Credential Stuffing — attackers use leaked credentials for immediate unauthorized access.", "real_world": "Uber paid $100,000 ransom after attackers found AWS keys on GitHub used to access 57M user records.", "fix": "Rotate all leaked credentials immediately. Use git-secrets or truffleHog pre-commit hooks.", "difficulty": "Medium", "time_estimate": "1-4 hours"},
    "graphql_introspection": {"title": "GraphQL Introspection Enabled", "impact": "Full API schema exposed — attackers enumerate all queries, mutations, and data types.", "attack": "Schema enumeration → targeted queries for sensitive data without authentication.", "real_world": "Many GraphQL APIs exposed PII by leaving introspection enabled in production environments.", "fix": "Disable introspection: set introspection=False in production GraphQL config.", "difficulty": "Easy", "time_estimate": "5 minutes"},
    "infra_exposed": {"title": "Infrastructure Service Exposed", "impact": "DevOps services (Kubernetes, Docker, Jenkins) expose secrets, source code, and execution environments.", "attack": "Container escape / Kubernetes cluster takeover / CI secret extraction.", "real_world": "Tesla's AWS account was compromised via an exposed Kubernetes dashboard with no authentication.", "fix": "Restrict infrastructure services to internal network. Enable authentication on all management interfaces.", "difficulty": "Medium", "time_estimate": "1-2 hours"},
}

CHATBOT_ANSWERS = {
    "riskiest": lambda r: _riskiest_asset(r),
    "critical": lambda r: _critical_issues(r),
    "score": lambda r: _score_summary(r),
    "ssl": lambda r: _ssl_status(r),
    "subdomains": lambda r: _subdomain_summary(r),
    "ports": lambda r: _port_summary(r),
    "headers": lambda r: _header_summary(r),
    "compliance": lambda r: _compliance_summary(r),
    "attack": lambda r: _attack_paths_summary(r),
    "fix": lambda r: _quick_wins(r),
}


def _riskiest_asset(results: dict) -> str:
    risk = results.get("risk", {})
    vulns = risk.get("vulnerabilities", [])
    critical = [v for v in vulns if v["severity"] == "critical"]
    if critical:
        return f"🔴 Your riskiest asset is: **{critical[0]['title']}** — {critical[0]['detail']}. Immediate action required."
    paths = risk.get("attack_paths", [])
    if paths:
        return f"⚠️ Highest risk attack path: **{paths[0]['name']}** (Severity: {paths[0]['severity']})"
    return "✅ No critical assets identified. Security posture is reasonable."


def _critical_issues(results: dict) -> str:
    risk = results.get("risk", {})
    critical = [v for v in risk.get("vulnerabilities", []) if v["severity"] == "critical"]
    if not critical:
        return "✅ No critical issues found!"
    lines = [f"🚨 Found {len(critical)} critical issue(s):"]
    for i, v in enumerate(critical[:5], 1):
        lines.append(f"  {i}. **{v['title']}**: {v['detail']}")
    return "\n".join(lines)


def _score_summary(results: dict) -> str:
    risk = results.get("risk", {})
    score = risk.get("score", 0)
    grade = risk.get("grade", "?")
    sentiment = risk.get("sentiment", "UNKNOWN")
    return f"📊 Security Score: **{score}/100** (Grade {grade}) — Status: **{sentiment}**\n{risk.get('summary', '')}"


def _ssl_status(results: dict) -> str:
    ssl = results.get("ssl", {})
    if not ssl.get("has_ssl"):
        return "🔴 **No SSL/TLS detected** — all traffic is unencrypted. Install a certificate immediately."
    cert = ssl.get("certificate", {})
    days = cert.get("days_remaining", 0)
    issuer = cert.get("issuer", "Unknown")
    if cert.get("is_expired"):
        return f"🔴 SSL certificate **EXPIRED** — visitors see security warnings. Renew immediately."
    if days < 30:
        return f"⚠️ SSL certificate expires in **{days} days** (Issuer: {issuer}). Renew soon."
    return f"✅ SSL valid for **{days} days** (Issuer: {issuer}). HTTPS redirect: {'✅' if ssl.get('https_redirect') else '❌'}"


def _subdomain_summary(results: dict) -> str:
    subs = results.get("subdomains", {})
    total = subs.get("count", 0)
    risky = subs.get("risky_count", 0)
    cloud = len(subs.get("cloud_assets", []))
    return (
        f"🌐 **{total} subdomains** found via Certificate Transparency.\n"
        f"  ⚠️ {risky} risky (admin/dev/staging patterns)\n"
        f"  ☁️ {cloud} cloud assets detected"
    )


def _port_summary(results: dict) -> str:
    ports = results.get("ports", {})
    open_count = ports.get("open_count", 0)
    high_risk = ports.get("high_risk_count", 0)
    if high_risk > 0:
        services = [p["service"] for p in ports.get("open_ports", []) if p.get("risk") == "High"]
        return f"🔴 **{high_risk} high-risk port(s) open**: {', '.join(services)}. These should be firewalled immediately."
    return f"✅ {open_count} port(s) open, none classified as high-risk."


def _header_summary(results: dict) -> str:
    headers = results.get("headers", {})
    grade = headers.get("grade", "?")
    score = headers.get("score", 0)
    missing = [h["header"] for h in headers.get("headers", []) if not h.get("present")]
    if missing:
        return f"🛡️ Security headers grade: **{grade}** ({score}/100)\n  ❌ Missing: {', '.join(missing[:5])}"
    return f"✅ Security headers grade: **{grade}** ({score}/100) — All critical headers present."


def _compliance_summary(results: dict) -> str:
    comp = results.get("risk", {}).get("compliance", {})
    lines = ["📋 **Compliance Scores:**"]
    for framework, data in comp.items():
        lines.append(f"  • {framework.upper()}: **{data.get('score', 0)}%** ({len(data.get('passed', []))}/{data.get('total', 0)} controls)")
    return "\n".join(lines)


def _attack_paths_summary(results: dict) -> str:
    paths = results.get("risk", {}).get("attack_paths", [])
    if not paths:
        return "✅ No significant attack paths identified with current findings."
    lines = [f"⚔️ **{len(paths)} potential attack path(s) identified:**"]
    for p in paths[:3]:
        lines.append(f"  🔴 **{p['name']}** (Severity: {p['severity']})")
    return "\n".join(lines)


def _quick_wins(results: dict) -> str:
    recs = results.get("risk", {}).get("recommendations", [])
    quick = [r for r in recs if r["priority"] in ("critical", "high")][:5]
    if not quick:
        return "✅ No urgent remediation items. Keep maintaining current security posture."
    lines = ["🔧 **Top priority fixes:**"]
    for i, r in enumerate(quick, 1):
        lines.append(f"  {i}. [{r['priority'].upper()}] {r['action']}")
    return "\n".join(lines)


def answer_question(results: dict, question: str) -> str:
    """Rule-based chatbot: answer questions about scan results."""
    q = question.lower()
    for keyword, fn in CHATBOT_ANSWERS.items():
        if keyword in q:
            return fn(results)
    # Generic: try to match common phrases
    if any(w in q for w in ["worst", "dangerous", "critical", "risky"]):
        return CHATBOT_ANSWERS["riskiest"](results)
    if any(w in q for w in ["score", "grade", "rating"]):
        return CHATBOT_ANSWERS["score"](results)
    if any(w in q for w in ["cert", "https", "tls", "encrypt"]):
        return CHATBOT_ANSWERS["ssl"](results)
    if any(w in q for w in ["domain", "subdomain", "sub"]):
        return CHATBOT_ANSWERS["subdomains"](results)
    if any(w in q for w in ["port", "service", "open"]):
        return CHATBOT_ANSWERS["ports"](results)
    if any(w in q for w in ["header", "csp", "hsts", "xframe"]):
        return CHATBOT_ANSWERS["headers"](results)
    if any(w in q for w in ["gdpr", "pci", "hipaa", "compliance", "comply"]):
        return CHATBOT_ANSWERS["compliance"](results)
    if any(w in q for w in ["path", "exploit", "attack", "hack"]):
        return CHATBOT_ANSWERS["attack"](results)
    if any(w in q for w in ["fix", "remediat", "recommend", "action", "how"]):
        return CHATBOT_ANSWERS["fix"](results)

    return (
        "💬 I can answer questions about: **score**, **ssl**, **subdomains**, **ports**, "
        "**headers**, **compliance**, **attack paths**, **critical issues**, or **quick fixes**. "
        "Try: 'What's my riskiest asset?' or 'Show critical issues'."
    )


def generate_ai_explanations(scan_data: dict) -> list[dict]:
    explanations = []
    ssl = scan_data.get("ssl", {})
    if not ssl.get("has_ssl"):
        explanations.append({**EXPLANATIONS["no_ssl"], "category": "SSL/TLS", "severity": "critical"})
    else:
        cert = ssl.get("certificate", {})
        if cert.get("is_expired"):
            explanations.append({**EXPLANATIONS["expired_ssl"], "category": "SSL/TLS", "severity": "critical"})
        if not ssl.get("https_redirect"):
            explanations.append({**EXPLANATIONS["no_https_redirect"], "category": "SSL/TLS", "severity": "high"})

    headers = scan_data.get("headers", {})
    for h in headers.get("headers", []):
        if not h.get("present"):
            key = h.get("key", "")
            mapping = {"strict-transport-security": "no_hsts", "content-security-policy": "no_csp", "x-frame-options": "no_xframe"}
            if key in mapping:
                explanations.append({**EXPLANATIONS[mapping[key]], "category": "Headers", "severity": "high" if key != "x-frame-options" else "medium"})

    dns_data = scan_data.get("dns", {})
    if not dns_data.get("spf", {}).get("found"):
        explanations.append({**EXPLANATIONS["no_spf"], "category": "Email Security", "severity": "high"})
    if not dns_data.get("dmarc", {}).get("found"):
        explanations.append({**EXPLANATIONS["no_dmarc"], "category": "Email Security", "severity": "high"})

    ports = scan_data.get("ports", {})
    for p in ports.get("open_ports", []):
        if p.get("risk") == "High":
            svc = p.get("service", "").lower()
            if svc in ("mysql", "postgresql", "mongodb", "mssql", "redis"):
                explanations.append({**EXPLANATIONS["exposed_database"], "category": "Network", "severity": "critical", "title": f"{p['service']} (Port {p['port']}) Exposed"})
            elif svc == "rdp":
                explanations.append({**EXPLANATIONS["exposed_rdp"], "category": "Network", "severity": "critical"})

    tech = scan_data.get("tech", {})
    if tech.get("issues"):
        explanations.append({**EXPLANATIONS["version_exposure"], "category": "Technology", "severity": "medium"})

    subs = scan_data.get("subdomains", {})
    if subs.get("risky_count", 0) > 0:
        explanations.append({**EXPLANATIONS["risky_subdomains"], "category": "Attack Surface", "severity": "medium"})

    whois = scan_data.get("whois", {})
    if whois.get("domain_age", {}).get("total_days", 999) < 365:
        explanations.append({**EXPLANATIONS["new_domain"], "category": "Domain", "severity": "info"})

    github = scan_data.get("github", {})
    if github.get("leaks_found", 0) > 0:
        explanations.append({**EXPLANATIONS["github_leak"], "category": "Credentials", "severity": "critical"})

    vuln_sim = scan_data.get("vuln_sim", {})
    if vuln_sim.get("cors", {}).get("reflects_origin") or vuln_sim.get("cors", {}).get("allows_null"):
        explanations.append({**EXPLANATIONS["cors_misconfiguration"], "category": "Web Security", "severity": "critical"})

    graphql = scan_data.get("graphql", {})
    if graphql.get("introspection_enabled"):
        explanations.append({**EXPLANATIONS["graphql_introspection"], "category": "API Security", "severity": "high"})

    infra = scan_data.get("infra", {})
    if infra.get("critical_exposures"):
        explanations.append({**EXPLANATIONS["infra_exposed"], "category": "Infrastructure", "severity": "critical"})

    severity_order = {"critical": 0, "high": 1, "medium": 2, "low": 3, "info": 4}
    explanations.sort(key=lambda x: severity_order.get(x.get("severity", "info"), 5))
    return explanations


def generate_executive_summary(scan_data: dict, score: int, grade: str) -> str:
    domain = scan_data.get("_domain", "the target")
    risk = scan_data.get("risk", {})
    ssl = scan_data.get("ssl", {})
    headers = scan_data.get("headers", {})
    ports = scan_data.get("ports", {})
    subs = scan_data.get("subdomains", {})
    github = scan_data.get("github", {})
    infra = scan_data.get("infra", {})
    sentiment = risk.get("sentiment", "UNKNOWN")

    parts = [f"Security assessment of {domain} completed — Score: {score}/100 (Grade {grade}) — Status: {sentiment}."]

    if score >= 80:
        parts.append("Overall security posture is GOOD with minor areas for improvement.")
    elif score >= 50:
        parts.append("Security posture requires ATTENTION — several vulnerabilities need remediation.")
    else:
        parts.append("Security posture is POOR — critical vulnerabilities require IMMEDIATE action.")

    if not ssl.get("has_ssl"):
        parts.append("CRITICAL: No SSL/TLS encryption — all traffic transmitted in plain text.")
    elif ssl.get("certificate", {}).get("is_expired"):
        parts.append("CRITICAL: SSL certificate has expired.")

    h_grade = headers.get("grade", "?")
    parts.append(f"Security headers scored grade {h_grade}.")

    if ports.get("high_risk_count", 0) > 0:
        parts.append(f"WARNING: {ports['high_risk_count']} high-risk port(s) exposed to internet.")

    if subs.get("risky_count", 0) > 0:
        parts.append(f"Found {subs['risky_count']} risky subdomain(s) requiring review.")

    if github.get("leaks_found", 0) > 0:
        parts.append(f"CRITICAL: {github['leaks_found']} potential credential leak(s) found on GitHub.")

    if infra.get("critical_exposures"):
        names = [s["name"] for s in infra["critical_exposures"][:2]]
        parts.append(f"CRITICAL: Infrastructure exposed: {', '.join(names)}.")

    comp = risk.get("compliance", {})
    if comp:
        gdpr_score = comp.get("gdpr", {}).get("score", 0)
        parts.append(f"Compliance readiness: GDPR {gdpr_score}%, PCI-DSS {comp.get('pci_dss', {}).get('score', 0)}%, HIPAA {comp.get('hipaa', {}).get('score', 0)}%.")

    return " ".join(parts)
