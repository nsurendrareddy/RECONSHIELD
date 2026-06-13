"use client";

import { useEffect, useRef, useState } from 'react';
import useUserInteraction from '@/hooks/useUserInteraction';

export default function Ad300x250() {
  const iframeRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const hasInteracted = useUserInteraction();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !hasInteracted || !iframeRef.current) return;

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
              'key' : 'bff74f8eee55b4a3775d46c9295efe9a',
              'format' : 'iframe',
              'height' : 250,
              'width' : 300,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="https://www.highperformanceformat.com/bff74f8eee55b4a3775d46c9295efe9a/invoke.js"></script>
        </body>
        </html>
      `);
      doc.close();
    }
  }, [mounted, hasInteracted]);

  if (!mounted) return null;

  return (
    <div className="flex justify-center my-6 min-h-[250px] w-full bg-surface-900/10 rounded-lg overflow-hidden">
      {hasInteracted && (
        <iframe
          ref={iframeRef}
          title="Adsterra 300x250 Banner"
          width="300"
          height="250"
          style={{ border: 'none', overflow: 'hidden', background: 'transparent' }}
          scrolling="no"
        />
      )}
    </div>
  );
}
