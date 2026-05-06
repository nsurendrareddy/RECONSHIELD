"""WHOIS lookup service — domain intelligence."""
import whois
from datetime import datetime, timezone
from utils.helpers import calculate_domain_age, days_until
from utils.logger import logger


async def whois_lookup(domain: str) -> dict:
    """Perform WHOIS lookup and extract domain intelligence."""
    try:
        w = whois.whois(domain)

        # Extract registrar info
        registrar = w.registrar or "Unknown"
        creation_date = w.creation_date
        expiration_date = w.expiration_date
        updated_date = w.updated_date
        status = w.status if isinstance(w.status, list) else [w.status] if w.status else []
        name_servers = w.name_servers if isinstance(w.name_servers, list) else [w.name_servers] if w.name_servers else []

        # Normalize dates
        def fmt_date(d):
            if isinstance(d, list):
                d = d[0]
            if isinstance(d, datetime):
                return d.isoformat()
            return str(d) if d else None

        # Calculate domain age
        age = calculate_domain_age(creation_date)
        expiry_days = days_until(expiration_date)

        # Risk flags
        issues = []
        if age["total_days"] is not None and age["total_days"] < 365:
            issues.append("Domain is less than 1 year old — potentially suspicious")
        if expiry_days is not None and expiry_days < 30:
            issues.append(f"Domain expires in {expiry_days} days — renewal critical")
        if not name_servers:
            issues.append("No name servers found")

        return {
            "registrar": registrar,
            "organization": getattr(w, 'org', None) or "N/A",
            "creation_date": fmt_date(creation_date),
            "expiration_date": fmt_date(expiration_date),
            "updated_date": fmt_date(updated_date),
            "domain_age": age,
            "expiry_days": expiry_days,
            "status": [str(s) for s in status[:5]],
            "name_servers": [str(ns).lower() for ns in name_servers] if name_servers else [],
            "registrant_country": getattr(w, 'country', None) or "N/A",
            "dnssec": getattr(w, 'dnssec', "Unknown"),
            "issues": issues,
            "risk_level": "High" if len(issues) >= 2 else "Medium" if issues else "Low",
        }
    except Exception as e:
        logger.error(f"WHOIS lookup failed for {domain}: {e}")
        return {
            "error": str(e),
            "registrar": "Lookup failed",
            "issues": ["WHOIS lookup failed — domain may have privacy protection"],
            "risk_level": "Medium",
        }
