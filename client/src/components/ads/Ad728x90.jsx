"use client";

import { useEffect, useRef, useState } from 'react';
import useUserInteraction from '@/hooks/useUserInteraction';

export default function Ad728x90() {
  const iframeRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(90);
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
              'key' : 'ad055ae12ee78ddc0ebf1be2e3a5830f',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="https://www.highperformanceformat.com/ad055ae12ee78ddc0ebf1be2e3a5830f/invoke.js"><\/script>
          <script type="text/javascript">
            function sendHeight() {
              var h = document.documentElement.scrollHeight || document.body.scrollHeight || 90;
              window.parent.postMessage({ type: 'resize-728-iframe', height: h }, '*');
            }
            window.addEventListener('load', sendHeight);
            setTimeout(sendHeight, 1500);
          </script>
        </body>
        </html>
      `);
      doc.close();
    }

    const handleMsg = (e) => {
      if (e.data?.type === 'resize-728-iframe' && e.source === iframeRef.current?.contentWindow) {
        setIframeHeight((prev) => Math.max(e.data.height, prev));
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, [mounted, hasInteracted]);

  if (!mounted) return null;

  return (
    <div
      className="hidden md:flex justify-center my-6 w-full bg-surface-900/10 rounded-lg"
      style={{ minHeight: `${iframeHeight}px` }}
    >
      {hasInteracted && (
        <iframe
          ref={iframeRef}
          title="Adsterra 728x90 Banner"
          width="728"
          height={iframeHeight}
          style={{ border: 'none', overflow: 'hidden', background: 'transparent' }}
          scrolling="no"
        />
      )}
    </div>
  );
}
