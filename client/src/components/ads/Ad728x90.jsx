"use client";

import { useEffect, useRef, useState } from 'react';

export default function Ad728x90() {
  const iframeRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
              background: transparent;
            }
          </style>
        </head>
        <body>
          <script type="text/javascript">
            var atOptions = {
              'key' : 'ad055ae12ee78ddc0ebf1be2e3a5830f',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="https://www.highperformanceformat.com/ad055ae12ee78ddc0ebf1be2e3a5830f/invoke.js"></script>
        </body>
        </html>
      `);
      doc.close();
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="hidden md:flex justify-center my-6 min-h-[90px] w-full bg-surface-900/10 rounded-lg overflow-hidden">
      <iframe
        ref={iframeRef}
        title="Adsterra 728x90 Banner"
        width="728"
        height="90"
        style={{ border: 'none', overflow: 'hidden', background: 'transparent' }}
        scrolling="no"
      />
    </div>
  );
}
