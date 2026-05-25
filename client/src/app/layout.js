import Layout from "@/components/Layout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Inter, JetBrains_Mono, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains" });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["700", "900"], display: "swap", variable: "--font-orbitron" });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["500", "600", "700"], display: "swap", variable: "--font-rajdhani" });

export const metadata = {
  metadataBase: new URL("https://reconshield.in"),
  title: {
    default: "ReconShield - AI Cybersecurity & Threat Intelligence Platform",
    template: "%s | ReconShield"
  },
  description: "ReconShield — AI-powered cybersecurity platform for threat intelligence, OSINT, vulnerability scanning, and IP analysis. Professional-grade security tools, free.",
  keywords: ["cybersecurity", "vulnerability scanner", "IP intelligence", "threat detection", "SSL checker", "DNS lookup"],
  authors: [{ name: "ReconShield Team" }],

  manifest: "/manifest.json",
  openGraph: {
    title: "ReconShield - AI Cybersecurity Platform",
    description: "ReconShield — AI-powered cybersecurity platform for threat intelligence, OSINT, vulnerability scanning, and IP analysis. Professional-grade security tools, free.",
    url: "https://reconshield.in/",
    siteName: "ReconShield",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  verification: {
    google: "Z0orCISb23IH0gqw02ckAwBvgyyqJdl5-QyrPcWeeKM",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark h-full antialiased ${inter.variable} ${jetbrains.variable} ${orbitron.variable} ${rajdhani.variable}`}>
      <head>
        {/* Fonts are managed by next/font/google */}

        {/* Subscribe with Google (Offloaded to Web Worker) */}
        <Script strategy="worker" src="https://news.google.com/swg/js/v1/swg-basic.js" />
        <Script
          id="google-news-init"
          strategy="worker"
          dangerouslySetInnerHTML={{
            __html: `
              (self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
                basicSubscriptions.init({
                  type: "NewsArticle",
                  isPartOfType: ["Product"],
                  isPartOfProductId: "CAow7aHgCw:openaccess",
                  clientOptions: { theme: "light", lang: "en" },
                });
              });
            `
          }}
        />

        {/* Google Analytics (Offloaded to Web Worker) */}
        <Script
          strategy="worker"
          src="https://www.googletagmanager.com/gtag/js?id=G-C1L15RFXXR"
        />
        <Script
          id="google-analytics"
          strategy="worker"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-C1L15RFXXR');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface-950 text-white font-sans selection:bg-matrix-400/30 selection:text-matrix-400">
        {/* Google AdSense Script - Deferred via requestIdleCallback & only executes if user grants cookie consent */}
        <Script
          id="adsense-lazy"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var adsLoaded = false;
                function loadAdSense() {
                  if (adsLoaded) return;
                  adsLoaded = true;
                  var script = document.createElement('script');
                  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3496685713682736';
                  script.async = true;
                  script.defer = true;
                  script.crossOrigin = 'anonymous';
                  document.head.appendChild(script);
                }
                
                // Expose globally so CookieBanner can trigger AdSense instantly on Accept
                window.__triggerAdSense = loadAdSense;

                // Load automatically if consent was already given in a previous session
                if (typeof localStorage !== 'undefined' && localStorage.getItem('cookieConsent') === 'true') {
                  if (window.requestIdleCallback) {
                    window.requestIdleCallback(function() {
                      setTimeout(loadAdSense, 800);
                    });
                  } else {
                    window.addEventListener('load', function() {
                      setTimeout(loadAdSense, 2000);
                    });
                  }
                }
              })();
            `
          }}
        />

        <Layout>
          {children}
        </Layout>

        <Analytics />
        <SpeedInsights />
        {/* Site-wide JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "ReconShield",
                "alternateName": ["Recon Shield"],
                "url": "https://reconshield.in",
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "ReconShield",
                "url": "https://reconshield.in",
                "logo": "https://reconshield.in/og-image.png"
              },

              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "ReconShield",
                "operatingSystem": "All",
                "applicationCategory": "SecurityApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "featureList": [
                  "IP Reputation",
                  "DNS Analysis",
                  "SSL Auditing",
                  "Vulnerability Scanning",
                  "AI Risk Assessment"
                ]
              }
            ]),
          }}
        />
      </body>
    </html>
  );
}
