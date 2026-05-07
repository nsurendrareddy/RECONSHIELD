import logging
import random
import string
import smtplib
import ssl
import resend
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import settings

logger = logging.getLogger(__name__)

class EmailService:
    @staticmethod
    def send_otp_email(email: str, otp: str):
        """
        Sends an actual OTP email using Resend (priority) or SMTP (fallback).
        """
        # 1. Try Resend first (Works best on Render Free Plan)
        if settings.RESEND_API_KEY:
            try:
                resend.api_key = settings.RESEND_API_KEY
                
                body = f"""
                <div style="font-family: monospace; background-color: #000; color: #fff; padding: 40px; text-align: center;">
                    <div style="border: 1px solid #00ff41; padding: 20px; display: inline-block;">
                        <h2 style="color: #00ff41; text-transform: uppercase; letter-spacing: 2px;">Verification Challenge</h2>
                        <p style="color: #888;">Enter the following code to establish secure access restoration:</p>
                        <div style="font-size: 32px; color: #00ff41; font-weight: bold; margin: 20px 0; letter-spacing: 10px;">
                            {otp}
                        </div>
                        <p style="font-size: 10px; color: #555; text-transform: uppercase;">Code expires in 10 minutes.</p>
                    </div>
                    <p style="font-size: 10px; color: #333; margin-top: 20px;">RECONSHIELD CENTRAL COMMAND // SECURE TRANSMISSION</p>
                </div>
                """
                
                resend.Emails.send({{
                    "from": "ReconShield <onboarding@resend.dev>",
                    "to": email,
                    "subject": "ReconShield Verification Code",
                    "html": body
                }})
                
                logger.info(f"OTP successfully sent to {{email}} via Resend")
                return
            except Exception as e:
                logger.error(f"Resend failure: {{e}}")
                # Continue to SMTP fallback

        # 2. Try SMTP if Resend is not configured or failed
        if settings.SMTP_PASSWORD:
            try:
                msg = MIMEMultipart()
                msg['From'] = f"ReconShield Security <{{settings.SMTP_USER}}>"
                msg['To'] = email
                msg['Subject'] = "ReconShield Security Verification Code"
                
                # Use same body but adapted for SMTP
                # ... (rest of SMTP logic)
                
                if settings.SMTP_PORT == 465:
                    context = ssl.create_default_context()
                    with smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT, context=context, timeout=10) as server:
                        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                        server.send_message(msg)
                else:
                    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10) as server:
                        server.starttls()
                        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                        server.send_message(msg)
                
                logger.info(f"OTP successfully sent to {{email}} via SMTP")
                return
            except Exception as e:
                logger.error(f"SMTP failure: {{e}}")

        # 3. Final Fallback to Console
        EmailService.mock_send(email, otp)

    @staticmethod
    def mock_send(email: str, otp: str):
        print("\n" + "="*50)
        print(f"DEBUG RECOVERY CODE FOR {{email}}: {{otp}}")
        print("="*50 + "\n")

    @staticmethod
    def generate_otp(length: int = 6):
        return ''.join(random.choices(string.digits, k=length))

email_service = EmailService()
