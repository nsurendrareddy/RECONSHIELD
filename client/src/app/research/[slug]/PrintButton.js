"use client";

import React from 'react';
import { Download } from 'lucide-react';

export default function PrintButton() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff88]/10 hover:bg-[#00ff88]/20 border border-[#00ff88]/20 text-[#00ff88] text-xs font-mono rounded-xl transition-all select-none cursor-pointer"
    >
      <Download className="w-3.5 h-3.5" />
      <span>Download PDF Report</span>
    </button>
  );
}
