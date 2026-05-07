"""Centralized configuration loaded from environment variables."""
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))


class Settings:
    PORT: int = int(os.getenv("PORT", "3001"))
    ENV: str = os.getenv("NODE_ENV", "development")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:5173")

    # Optional API keys — app works fully without these
    SECURITYTRAILS_API_KEY: str = os.getenv("SECURITYTRAILS_API_KEY", "")
    SHODAN_API_KEY: str = os.getenv("SHODAN_API_KEY", "")
    IPINFO_TOKEN: str = os.getenv("IPINFO_TOKEN", "")
    WHOISXML_API_KEY: str = os.getenv("WHOISXML_API_KEY", "")

    # Rate limiting
    RATE_LIMIT_GENERAL: str = "100/15minutes"
    RATE_LIMIT_SCAN: str = "5/15minutes"

    # Scan settings
    SCAN_TIMEOUT: int = int(os.getenv("SCAN_TIMEOUT", "120"))
    PORT_CHECK_TIMEOUT: float = float(os.getenv("PORT_CHECK_TIMEOUT", "3.0"))

    MONGO_URI: str = os.getenv("MONGO_URI", "")
    MONGO_DB_NAME: str = os.getenv("MONGO_DB_NAME", "reconshield")

    # SMTP Settings
    SMTP_HOST: str = os.getenv("SMTP_HOST", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER: str = os.getenv("SMTP_USER", "nsurendrareddy3@gmail.com")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "") # To be set in environment
    
    # Resend API
    RESEND_API_KEY: str = os.getenv("RESEND_API_KEY", "")


settings = Settings()
