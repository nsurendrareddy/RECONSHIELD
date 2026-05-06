"""Input validation and sanitization."""
from pydantic import BaseModel, field_validator
from utils.helpers import is_valid_domain, is_valid_ip, is_private_ip
import re
import socket


class ScanRequest(BaseModel):
    """Validated scan request body."""
    domain: str
    consent: bool

    @field_validator("domain")
    @classmethod
    def validate_domain(cls, v: str) -> str:
        # Strip whitespace and protocol
        v = v.strip().lower()
        v = re.sub(r'^https?://', '', v)
        v = v.rstrip('/')
        v = v.split('/')[0]  # Remove path

        if not v:
            raise ValueError("Domain is required")

        # Check if it's an IP
        if is_valid_ip(v):
            if is_private_ip(v):
                raise ValueError("Private/reserved IP addresses are not allowed")
            return v

        # Validate domain format
        if not is_valid_domain(v):
            raise ValueError(
                "Invalid domain format. Use format like: example.com"
            )

        # Block localhost variants
        blocked = ["localhost", "127.0.0.1", "0.0.0.0", "::1"]
        if v in blocked:
            raise ValueError("Localhost targets are not allowed")

        return v

    @field_validator("consent")
    @classmethod
    def validate_consent(cls, v: bool) -> bool:
        if not v:
            raise ValueError(
                "You must confirm authorization to scan this target"
            )
        return v
