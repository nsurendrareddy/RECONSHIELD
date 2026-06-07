import logging
import resend
from config import settings

logger = logging.getLogger(__name__)

class EmailService:
    """Service for sending emails via Resend."""
    
    @staticmethod
    def send_notification(data: dict):
        """Send a notification email (e.g., for contact form submissions)."""
        if not settings.RESEND_API_KEY:
            logger.warning("RESEND_API_KEY not set. Cannot send notification email.")
            return False

        try:
            resend.api_key = settings.RESEND_API_KEY
            
            # Simple notification template
            html_content = f"""
            <html>
            <body style="font-family: sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="background-color: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
                    <h2 style="color: #333;">New Contact Form Submission</h2>
                    <p><strong>From:</strong> {data.get('name')} ({data.get('email')})</p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #00ff41;">
                        {data.get('message')}
                    </div>
                </div>
            </body>
            </html>
            """

            resend.Emails.send({
                "from": "ReconShield <notifications@resend.dev>",
                "to": "nsurendrareddy3@gmail.com",
                "subject": f"New Contact: {data.get('name')}",
                "html": html_content
            })

            logger.info(f"Notification email sent for {data.get('email')}")
            return True

        except Exception as e:
            logger.error(f"Failed to send notification email: {str(e)}")
            return False

email_service = EmailService()
