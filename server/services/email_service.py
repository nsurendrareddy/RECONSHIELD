import logging
import random
import string
import resend
from config import settings

logger = logging.getLogger(__name__)

class EmailService:
    @staticmethod
    def send_otp_email(email: str, otp: str):
        if not settings.RESEND_API_KEY:
            logger.warning("RESEND_API_KEY not set. Falling back to console.")
            EmailService.mock_send(email, otp)
            return

        try:
            resend.api_key = settings.RESEND_API_KEY

            body = f"""
            <html>
            <body style="font-family: monospace; background-color: #000; color: #fff; padding: 40px; text-align: center;">
                <div style="border: 1px solid #00ff41; padding: 20px; display: inline-block;">
                    <h2 style="color: #00ff41; text-transform: uppercase; letter-spacing: 2px;">Verification Challenge</h2>
                    <p style="color: #888;">Enter the following code to establish secure access:</p>
                    <div style="font-size: 32px; color: #00ff41; font-weight: bold; margin: 20px 0; letter-spacing: 10px;">
                        {otp}
                    </div>
                    <p style="font-size: 10px; color: #555; text-transform: uppercase;">Code expires in 10 minutes.</p>
                </div>
                <p style="font-size: 10px; color: #333; margin-top: 20px;">RECONSHIELD CENTRAL COMMAND // SECURE TRANSMISSION</p>
            </body>
            </html>
            """

            resend.Emails.send({
                "from": "ReconShield <onboarding@resend.dev>",
                "to": email,
                "subject": "ReconShield Security Verification Code",
                "html": body
            })

            logger.info(f"OTP successfully sent to {email} via Resend")

        except Exception as e:
            logger.error(f"CRITICAL EMAIL FAILURE: {str(e)}")
            EmailService.mock_send(email, otp)

    @staticmethod
    def mock_send(email: str, otp: str):
        print("\n" + "="*50)
        print(f"DEBUG RECOVERY CODE FOR {email}: {otp}")
        print("="*50 + "\n")

    @staticmethod
    def generate_otp(length: int = 6):
        return ''.join(random.choices(string.digits, k=length))

email_service = EmailService()
