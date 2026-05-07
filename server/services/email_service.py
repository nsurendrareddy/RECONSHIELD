import logging
import random
import string
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class EmailService:
    @staticmethod
    def send_otp_email(email: str, otp: str):
        """
        Mocks sending an OTP email. 
        In production, integrate with SendGrid, Mailgun, or SMTP here.
        """
        print("\n" + "="*50)
        print(f"TRANSMISSION TO: {email}")
        print(f"SUBJECT: ReconShield Security Verification")
        print(f"MESSAGE: Your one-time password is: {otp}")
        print(f"EXPIRY: 10 minutes")
        print("="*50 + "\n")
        
        logger.info(f"OTP sent to {email}")

    @staticmethod
    def generate_otp(length: int = 6):
        return ''.join(random.choices(string.digits, k=length))

email_service = EmailService()
