import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function SimulatedDataNotice() {
  return (
    <div className="bg-[#1a0f14] border-l-4 border-[#ff3366] rounded-r-xl p-5 mb-8 shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 text-[#ff3366]" />
        </div>
        <div className="flex-1">
          <h3 className="text-[#ff3366] font-bold text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
            Demonstration Data
          </h3>
          <p className="text-[#e2e8f0] text-sm leading-relaxed">
            <strong>Educational Example:</strong> The results below are illustrative sample data, not a live scan of this target. ReconShield does not perform real-time scanning or offensive reconnaissance against third-party systems. This report demonstrates formatting and expected utility only.
          </p>
        </div>
      </div>
    </div>
  );
}
