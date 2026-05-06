"""Shared utility functions."""
import re
import ipaddress
from datetime import datetime, timezone


def is_valid_domain(domain: str) -> bool:
    """Validate domain format."""
    pattern = r'^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$'
    return bool(re.match(pattern, domain))


def is_valid_ip(ip: str) -> bool:
    """Validate IP address format."""
    try:
        ipaddress.ip_address(ip)
        return True
    except ValueError:
        return False


def is_private_ip(ip: str) -> bool:
    """Check if IP is private/reserved."""
    try:
        addr = ipaddress.ip_address(ip)
        return addr.is_private or addr.is_loopback or addr.is_reserved
    except ValueError:
        return False


def calculate_domain_age(creation_date) -> dict:
    """Calculate domain age from creation date."""
    if not creation_date:
        return {"years": None, "days": None, "label": "Unknown"}

    if isinstance(creation_date, list):
        creation_date = creation_date[0]

    if isinstance(creation_date, str):
        try:
            creation_date = datetime.fromisoformat(creation_date.replace('Z', '+00:00'))
        except (ValueError, AttributeError):
            return {"years": None, "days": None, "label": "Unknown"}

    now = datetime.now(timezone.utc)
    if creation_date.tzinfo is None:
        creation_date = creation_date.replace(tzinfo=timezone.utc)

    delta = now - creation_date
    years = delta.days // 365
    remaining_days = delta.days % 365
    return {
        "years": years,
        "days": remaining_days,
        "total_days": delta.days,
        "label": f"{years} years, {remaining_days} days",
    }


def days_until(date_val) -> int | None:
    """Calculate days until a future date."""
    if not date_val:
        return None
    if isinstance(date_val, list):
        date_val = date_val[0]
    if isinstance(date_val, str):
        try:
            date_val = datetime.fromisoformat(date_val.replace('Z', '+00:00'))
        except (ValueError, AttributeError):
            return None

    now = datetime.now(timezone.utc)
    if date_val.tzinfo is None:
        date_val = date_val.replace(tzinfo=timezone.utc)
    delta = date_val - now
    return delta.days


def classify_risk(score: int) -> str:
    """Classify risk level from score."""
    if score >= 80:
        return "Low"
    elif score >= 50:
        return "Medium"
    else:
        return "High"


def grade_from_score(score: int) -> str:
    """Convert score to letter grade."""
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"
