'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#00ff8811] border border-[#00ff8844] p-6 rounded-lg text-center space-y-3 animate-fade-in">
        <CheckCircle2 className="w-8 h-8 text-[#00ff88] mx-auto" />
        <h3 className="text-[#00ff88] font-mono font-bold tracking-wider uppercase">Welcome to the Briefing</h3>
        <p className="text-gray-400 text-sm">You have successfully subscribed. Expect your first intel report soon.</p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-[11px] font-mono text-[#94a3b8] uppercase tracking-wider">
          Email Address
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            name="email"
            id="email" 
            required
            placeholder="hacker@example.com"
            className="flex-1 bg-[#0a0c0f] border border-[#1a2332] px-4 py-3 rounded-lg text-white focus:outline-none focus:border-[#00ff88] transition-colors"
          />
          <button 
            type="submit" 
            className="bg-[#00ff88] text-[#0a0c0f] px-6 py-3 rounded-lg font-mono font-bold tracking-wider hover:bg-[#00cc6a] transition-colors whitespace-nowrap flex items-center justify-center gap-2"
          >
            SUBSCRIBE <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-[10px] text-gray-500 font-mono">
        No spam. Unsubscribe at any time. Read our <Link href="/privacy" className="text-[#00ff88] hover:underline">Privacy Policy</Link>.
      </p>
    </form>
  );
}
