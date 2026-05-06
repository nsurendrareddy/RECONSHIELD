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

    MONGO_URI: str = os.getenv("MONGO_URI", "mongodb+srv://nsurendrareddy3_db_user:lp22QQOYlm84p3iy@cluster0.ib2u7um.mongodb.net/?appName=Cluster0")
    MONGO_DB_NAME: str = os.getenv("MONGO_DB_NAME", "reconshield")


settings = Settings()
