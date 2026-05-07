import logging
import random
import string
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import settings

logger = logging.getLogger(__name__)

class EmailService:
    @staticmethod
    def send_otp_email(email: str, otp: str):
        """
        Sends an actual OTP email using SMTP.
        """
        if not settings.SMTP_PASSWORD:
            logger.warning("SMTP_PASSWORD not set. Falling back to console log.")
            EmailService.mock_send(email, otp)
            return

        try:
            msg = MIMEMultipart()
            msg['From'] = f"ReconShield Security <{settings.SMTP_USER}>"
            msg['To'] = email
            msg['Subject'] = "ReconShield Security Verification Code"

            body = f"""
            <html>
            <body style="font-family: monospace; background-color: #000; color: #fff; padding: 40px; text-align: center;">
                <div style="border: 1px solid #00ff41; padding: 20px; display: inline-block;">
                    <h2 style="color: #00ff41; text-transform: uppercase; letter-spacing: 2px;">Verification Challenge</h2>
                    <p style="color: #888;">Enter the following code to establish secure access restoration:</p>
                    <div style="font-size: 32px; color: #00ff41; font-weight: bold; margin: 20px 0; letter-spacing: 10px;">
                        {otp}
                    </div>
                    <p style="font-size: 10px; color: #555; text-transform: uppercase;">Code expires in 10 minutes.</p>
                </div>
                <p style="font-size: 10px; color: #333; margin-top: 20px;">RECONSHIELD CENTRAL COMMAND // SECURE TRANSMISSION</p>
            </body>
            </html>
            """
            msg.attach(MIMEText(body, 'html'))

            server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10)
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(msg)
            server.quit()
            
            logger.info(f"OTP successfully sent to {email}")
        except Exception as e:
            logger.error(f"Failed to send email: {e}")
            # Fallback to console log so the user isn't locked out during development
            EmailService.mock_send(email, otp)

    @staticmethod
    def mock_send(email: str, otp: str):
        print("\n" + "="*50)
        print(f"FALLBACK TRANSMISSION TO: {email}")
        print(f"OTP: {otp}")
        print("="*50 + "\n")

    @staticmethod
    def generate_otp(length: int = 6):
        return ''.join(random.choices(string.digits, k=length))

email_service = EmailService()
