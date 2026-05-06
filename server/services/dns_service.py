"""DNS resolution and infrastructure mapping service."""
import dns.resolver
import dns.reversename
import socket
from utils.logger import logger


# Cloud provider detection patterns
CLOUD_PATTERNS = {
    "Cloudflare": ["cloudflare", "cf-", ".cdn.cloudflare"],
    "AWS": ["amazonaws.com", "awsdns", "aws.", "cloudfront"],
    "Google Cloud": ["google.com", "googledomains", "googleapis"],
    "Azure": ["azure", "microsoft.com", "msft", "outlook"],
    "DigitalOcean": ["digitalocean"],
    "Akamai": ["akamai", "akam"],
    "Fastly": ["fastly"],
    "Vercel": ["vercel", "zeit"],
    "Netlify": ["netlify"],
    "Heroku": ["heroku"],
}


def _detect_cloud(records: dict) -> list[str]:
    """Detect cloud providers from DNS records."""
    providers = set()
    all_values = []

    for rtype in ["ns", "cname", "mx", "a"]:
        for rec in records.get(rtype, []):
            val = str(rec).lower() if isinstance(rec, str) else str(rec.get("value", "")).lower()
            all_values.append(val)

    for provider, patterns in CLOUD_PATTERNS.items():
        for val in all_values:
            if any(p in val for p in patterns):
                providers.add(provider)
                break

    return list(providers) or ["Unknown / Self-hosted"]


def _check_spf(txt_records: list[str]) -> dict:
    """Check SPF configuration from TXT records."""
    for record in txt_records:
        if "v=spf1" in record.lower():
            issues = []
            if "+all" in record:
                issues.append("SPF uses +all (allows any sender) — critical misconfiguration")
            if "~all" in record:
                issues.append("SPF uses ~all (soft fail) — should use -all for strict enforcement")
            return {
                "found": True,
                "record": record,
                "issues": issues,
                "status": "warning" if issues else "pass",
            }
    return {
        "found": False,
        "record": None,
        "issues": ["No SPF record found — email spoofing risk"],
        "status": "fail",
    }


def _check_dmarc(domain: str) -> dict:
    """Check DMARC configuration."""
    try:
        answers = dns.resolver.resolve(f"_dmarc.{domain}", "TXT")
        for rdata in answers:
            record = str(rdata).strip('"')
            if "v=dmarc1" in record.lower():
                issues = []
                if "p=none" in record.lower():
                    issues.append("DMARC policy is 'none' — no enforcement active")
                return {
                    "found": True,
                    "record": record,
                    "issues": issues,
                    "status": "warning" if issues else "pass",
                }
    except Exception:
        pass
    return {
        "found": False,
        "record": None,
        "issues": ["No DMARC record found — email security risk"],
        "status": "fail",
    }


async def dns_lookup(domain: str) -> dict:
    """Resolve all DNS record types and analyze configuration."""
    records = {}
    record_types = ["A", "AAAA", "MX", "TXT", "NS", "CNAME", "SOA"]

    for rtype in record_types:
        try:
            answers = dns.resolver.resolve(domain, rtype)
            if rtype == "MX":
                records[rtype.lower()] = [
                    {"priority": r.preference, "value": str(r.exchange).rstrip(".")}
                    for r in answers
                ]
            elif rtype == "SOA":
                soa = answers[0]
                records[rtype.lower()] = [{
                    "mname": str(soa.mname).rstrip("."),
                    "rname": str(soa.rname).rstrip("."),
                    "serial": soa.serial,
                    "refresh": soa.refresh,
                    "retry": soa.retry,
                    "expire": soa.expire,
                    "minimum": soa.minimum,
                }]
            else:
                records[rtype.lower()] = [str(r).strip('"') for r in answers]
        except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN, dns.resolver.NoNameservers):
            records[rtype.lower()] = []
        except Exception as e:
            logger.warning(f"DNS {rtype} lookup failed for {domain}: {e}")
            records[rtype.lower()] = []

    # Reverse DNS for A records
    reverse_dns = []
    for ip in records.get("a", []):
        try:
            rev = dns.reversename.from_address(ip)
            answers = dns.resolver.resolve(rev, "PTR")
            reverse_dns.append({
                "ip": ip,
                "ptr": str(answers[0]).rstrip(".")
            })
        except Exception:
            reverse_dns.append({"ip": ip, "ptr": "No PTR record"})

    # SPF & DMARC analysis
    txt_records = records.get("txt", [])
    spf = _check_spf(txt_records)
    dmarc = _check_dmarc(domain)

    # Cloud detection
    cloud_providers = _detect_cloud(records)

    # Aggregate issues
    issues = spf.get("issues", []) + dmarc.get("issues", [])

    return {
        "records": records,
        "reverse_dns": reverse_dns,
        "spf": spf,
        "dmarc": dmarc,
        "cloud_providers": cloud_providers,
        "issues": issues,
        "risk_level": "High" if len(issues) >= 3 else "Medium" if issues else "Low",
    }
