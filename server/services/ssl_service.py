"""SSL/TLS certificate analysis service."""
import ssl
import socket
from datetime import datetime, timezone
from cryptography import x509
from cryptography.hazmat.backends import default_backend
from utils.helpers import days_until
from utils.logger import logger
import httpx


async def ssl_analysis(domain: str) -> dict:
    """Analyze SSL/TLS certificate and configuration."""
    result = {
        "has_ssl": False,
        "certificate": None,
        "chain": [],
        "protocols": {},
        "https_redirect": False,
        "issues": [],
        "risk_level": "High",
    }

    try:
        # Connect and get certificate
        context = ssl.create_default_context()
        conn = context.wrap_socket(
            socket.socket(socket.AF_INET, socket.SOCK_STREAM),
            server_hostname=domain,
        )
        conn.settimeout(10)
        conn.connect((domain, 443))

        cert_bin = conn.getpeercert(binary_form=True)
        cert_dict = conn.getpeercert()
        cipher = conn.cipher()
        protocol = conn.version()
        conn.close()

        result["has_ssl"] = True

        # Parse certificate
        cert = x509.load_der_x509_certificate(cert_bin, default_backend())

        # Issuer
        issuer_parts = {}
        for attr in cert.issuer:
            issuer_parts[attr.oid._name] = attr.value
        issuer_str = issuer_parts.get("commonName", issuer_parts.get("organizationName", "Unknown"))

        # Subject
        subject_parts = {}
        for attr in cert.subject:
            subject_parts[attr.oid._name] = attr.value

        # SANs
        try:
            san_ext = cert.extensions.get_extension_for_class(x509.SubjectAlternativeName)
            sans = san_ext.value.get_values_for_type(x509.DNSName)
        except x509.ExtensionNotFound:
            sans = []

        # Validity
        not_before = cert.not_valid_before_utc if hasattr(cert, 'not_valid_before_utc') else cert.not_valid_before.replace(tzinfo=timezone.utc)
        not_after = cert.not_valid_after_utc if hasattr(cert, 'not_valid_after_utc') else cert.not_valid_after.replace(tzinfo=timezone.utc)
        now = datetime.now(timezone.utc)
        days_remaining = (not_after - now).days
        is_expired = days_remaining < 0

        result["certificate"] = {
            "subject": subject_parts.get("commonName", "N/A"),
            "issuer": issuer_str,
            "issuer_org": issuer_parts.get("organizationName", "N/A"),
            "serial_number": format(cert.serial_number, 'x').upper(),
            "not_before": not_before.isoformat(),
            "not_after": not_after.isoformat(),
            "days_remaining": days_remaining,
            "is_expired": is_expired,
            "sans": sans[:20],
            "signature_algorithm": cert.signature_algorithm_oid._name,
            "version": cert.version.name,
        }

        # Cipher info
        result["cipher"] = {
            "name": cipher[0] if cipher else "Unknown",
            "protocol": protocol,
            "bits": cipher[2] if cipher and len(cipher) > 2 else None,
        }

        # Protocol check
        issues = result["issues"]
        if is_expired:
            issues.append("SSL certificate is EXPIRED — critical security risk")
        elif days_remaining < 30:
            issues.append(f"SSL certificate expires in {days_remaining} days — renewal needed soon")

        if protocol in ("SSLv3", "TLSv1", "TLSv1.1"):
            issues.append(f"Using deprecated protocol {protocol} — upgrade to TLS 1.2+")

        # Check HTTPS redirect
        try:
            async with httpx.AsyncClient(follow_redirects=False, timeout=8) as client:
                resp = await client.get(f"http://{domain}", follow_redirects=False)
                if resp.status_code in (301, 302, 307, 308):
                    location = resp.headers.get("location", "")
                    if location.startswith("https://"):
                        result["https_redirect"] = True
                    else:
                        issues.append("HTTP does not redirect to HTTPS")
                else:
                    issues.append("No HTTP to HTTPS redirect — HTTPS not enforced")
        except Exception:
            issues.append("Could not check HTTP to HTTPS redirect")

        result["risk_level"] = "High" if is_expired else "Medium" if issues else "Low"

    except ssl.SSLCertVerificationError as e:
        result["issues"].append(f"SSL certificate verification failed: {e}")
        result["risk_level"] = "High"
    except (socket.timeout, socket.gaierror, ConnectionRefusedError, OSError) as e:
        result["issues"].append(f"Could not establish SSL connection: {e}")
        result["risk_level"] = "High"
    except Exception as e:
        logger.error(f"SSL analysis failed for {domain}: {e}")
        result["issues"].append(f"SSL analysis error: {str(e)}")

    return result
