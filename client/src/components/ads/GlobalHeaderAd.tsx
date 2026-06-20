'use client'

import AdsterraBanner from './AdsterraBanner'

export default function GlobalHeaderAd() {
  return (
    <div className="bg-surface-950/95 border-b border-white/5 py-3">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="hidden md:block">
          <AdsterraBanner type="728x90" className="mx-auto" />
        </div>
        <div className="block md:hidden">
          <AdsterraBanner type="300x250" className="mx-auto" />
        </div>
      </div>
    </div>
  )
}
