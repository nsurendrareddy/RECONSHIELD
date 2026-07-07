import Layout from "@/components/Layout";
import GoogleAnalyticsPageView from "@/components/GoogleAnalyticsPageView";
import DynamicThirdPartyScripts from "@/components/DynamicThirdPartyScripts";
import { AdManagerProvider } from "@/components/ads/AdManager";
import SocialBar from "@/components/ads/SocialBar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Inter, JetBrains_Mono, Rajdhani } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains" });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["500", "600", "700"], display: "swap", variable: "--font-rajdhani" });

export const metadata = {
  metadataBase: new URL("https://reconshield.in"),
  title: {
    default: "ReconShield - Infrastructure Visibility & Threat Intelligence Platform",
    template: "%s | ReconShield"
  },
  description: "ReconShield — Passive cybersecurity platform for threat intelligence, OSINT, exposure management, and IP analysis. Professional-grade security auditing tools, free.",
  authors: [{ name: "ReconShield Team" }],

  manifest: "/manifest.json",
  openGraph: {
    title: "ReconShield - Infrastructure Visibility Platform",
    description: "ReconShield — Passive cybersecurity platform for threat intelligence, OSINT, exposure management, and IP analysis. Professional-grade security auditing tools, free.",
    url: "https://reconshield.in",
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
    <html lang="en" className={`dark h-full antialiased ${inter.variable} ${jetbrains.variable} ${rajdhani.variable}`}>
      <head>
        {/* Trusted Types Default Passthrough Policy */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && window.trustedTypes && !window.trustedTypes.defaultPolicy) {
                try {
                  window.trustedTypes.createPolicy('default', {
                    createHTML: (s) => s,
                    createScript: (s) => s,
                    createScriptURL: (s) => s
                  });
                } catch (e) {
                  console.warn('Trusted Types default policy creation failed:', e);
                }
              }
            `
          }}
        />

        {/*
          GA4 Consent Defaults — must run synchronously BEFORE gtag.js loads.
          Default to denied; the CookieBanner updates consent when user chooses.
          Restoring prior consent from localStorage is done in the afterInteractive
          init script below so it only runs client-side.
        */}
        <script
          id="ga4-consent-defaults"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                wait_for_update: 500
              });
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface-950 text-white font-sans selection:bg-matrix-400/30 selection:text-matrix-400">
        <AdManagerProvider>
          {/* Fires GA4 page_view on every client-side route change */}
          <GoogleAnalyticsPageView />
          {/* Dynamic loading of Google AdSense and Analytics 4 */}
          <DynamicThirdPartyScripts />
          <SocialBar />
          <Layout>
            {children}
          </Layout>
        </AdManagerProvider>

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
                "@id": "https://reconshield.in/#website",
                "name": "ReconShield",
                "alternateName": ["analysis Shield"],
                "url": "https://reconshield.in",
                "publisher": { "@id": "https://reconshield.in/#organization" }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://reconshield.in/#organization",
                "name": "ReconShield",
                "url": "https://reconshield.in",
                "logo": "https://reconshield.in/og-image.png",
                "sameAs": [
                  "https://github.com/nsurendrareddy",
                  "https://linkedin.com/in/surendrareddy3"
                ],
                "knowsAbout": ["Cybersecurity", "Threat Intelligence", "OSINT", "Vulnerability Management"]
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
                  "exposure assessment",
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
