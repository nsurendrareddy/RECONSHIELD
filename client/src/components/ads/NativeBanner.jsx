"use client";

import { useEffect, useRef, useState } from 'react';
import useUserInteraction from '@/hooks/useUserInteraction';

export default function NativeBanner() {
  const iframeRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [iframeHeight, setIframeHeight] = useState('150px');
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
              background: transparent;
              overflow: hidden;
            }
            #container-6546c038dbbf040d39d1b8179e7743ca {
              width: 100%;
            }
          </style>
        </head>
        <body>
          <div id="container-6546c038dbbf040d39d1b8179e7743ca"></div>
          <script type="text/javascript" data-cfasync="false" async src="https://pl29692252.effectivecpmnetwork.com/6546c038dbbf040d39d1b8179e7743ca/invoke.js"></script>
          
          <script type="text/javascript">
            function sendHeight() {
              var height = document.documentElement.scrollHeight || document.body.scrollHeight;
              window.parent.postMessage({ type: 'resize-ad-iframe', height: height }, '*');
            }
            window.addEventListener('load', sendHeight);
            if (window.ResizeObserver) {
              var ro = new ResizeObserver(function() {
                sendHeight();
              });
              ro.observe(document.body);
            } else {
              setInterval(sendHeight, 1000);
            }
          </script>
        </body>
        </html>
      `);
      doc.close();
    }

    const handleMessage = (event) => {
      if (event.data && event.data.type === 'resize-ad-iframe' && iframeRef.current) {
        if (event.source === iframeRef.current.contentWindow) {
          setIframeHeight(`${event.data.height}px`);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [mounted, hasInteracted]);

  if (!mounted) return null;

  return (
    <div className="w-full my-8 flex justify-center bg-surface-900/10 rounded-lg overflow-hidden" style={{ minHeight: '150px' }}>
      {hasInteracted && (
        <iframe
          ref={iframeRef}
          title="Adsterra Native Banner"
          width="100%"
          height={iframeHeight}
          style={{ border: 'none', overflow: 'hidden', background: 'transparent', width: '100%', maxWidth: '1000px' }}
          scrolling="no"
        />
      )}
    </div>
  );
}
