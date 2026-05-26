'use client';

import { useRef, useState, useTransition } from 'react';
import { subscribeNewsletter } from '@/app/actions/newsletter';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

/**
 * Reusable newsletter subscription form.
 * Props:
 *   accentColor   — Tailwind color class for the button bg (default 'bg-[#00ff88]')
 *   buttonClass   — extra classes on the button
 *   inputClass    — extra classes on the input
 */
export default function NewsletterForm({
  accentColor = 'bg-[#00ff88] hover:bg-[#00cc6a]',
  buttonTextColor = 'text-black',
  inputClass = '',
  buttonClass = '',
  layout = 'row',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
}) {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'loading' || isPending) return;

    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(formRef.current);
    startTransition(async () => {
      const result = await subscribeNewsletter(formData);
      if (result.success) {
        setStatus('success');
        formRef.current?.reset();
      } else {
        setStatus('error');
        setErrorMsg(result.error || 'Something went wrong. Please try again.');
      }
    });
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-4 animate-fade-in-up text-center">
        <CheckCircle2 className="w-8 h-8 text-[#00ff88]" />
        <p className="text-white font-bold text-sm">Subscribed!</p>
      </div>
    );
  }

  const isStacked = layout === 'stacked';

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={isStacked ? "flex flex-col gap-2 w-full" : "flex flex-col sm:flex-row gap-3 max-w-lg mx-auto w-full"}
    >
      {/* Honeypot — hidden from real users, traps bots */}
      <input
        type="text"
        name="bot_field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <input
        type="email"
        name="email"
        placeholder={placeholder}
        required
        aria-label="Email address"
        className={`flex-1 bg-surface-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff88]/50 transition-colors placeholder:text-gray-500 ${inputClass}`}
      />

      <button
        type="submit"
        disabled={status === 'loading' || isPending}
        className={`px-8 py-3 ${accentColor} ${buttonTextColor} font-bold rounded-xl transition-colors shrink-0 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${buttonClass}`}
      >
        {(status === 'loading' || isPending) ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Subscribing…
          </>
        ) : buttonText}
      </button>

      {status === 'error' && (
        <p className="text-red-400 text-xs flex items-center gap-1 mt-1 w-full sm:col-span-2">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {errorMsg}
        </p>
      )}
    </form>
  );
}
