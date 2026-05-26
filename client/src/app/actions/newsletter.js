'use server';

export async function subscribeNewsletter(formData) {
  const email = formData.get('email')?.toString().trim();

  // Basic server-side validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  // Honeypot spam protection — if bot_field is filled, silently succeed
  const honeypot = formData.get('bot_field');
  if (honeypot) {
    return { success: true };
  }

  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

    if (!RESEND_API_KEY || !AUDIENCE_ID) {
      // Fallback: log for now, return success so UX isn't broken
      console.warn('[Newsletter] RESEND_API_KEY or RESEND_AUDIENCE_ID not set. Skipping API call.');
      return { success: true };
    }

    const res = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      // 409 = already subscribed — treat as success
      if (res.status === 409) return { success: true };
      console.error('[Newsletter] Resend API error:', body);
      return { success: false, error: 'Subscription failed. Please try again.' };
    }

    return { success: true };
  } catch (err) {
    console.error('[Newsletter] Unexpected error:', err);
    return { success: false, error: 'An unexpected error occurred. Please try again later.' };
  }
}
