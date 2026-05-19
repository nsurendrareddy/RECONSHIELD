import Layout from "@/components/Layout";
import CookieBanner from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://reconshield.in"),
  alternates: {
    canonical: "https://reconshield.in",
  },
  title: {
    default: "ReconShield - AI Cybersecurity & Threat Intelligence Platform",
    template: "%s | ReconShield"
  },
  description: "ReconShield — AI-powered cybersecurity platform for threat intelligence, OSINT, vulnerability scanning, and IP analysis. Professional-grade security tools, free.",
  keywords: ["cybersecurity", "vulnerability scanner", "IP intelligence", "threat detection", "SSL checker", "DNS lookup"],
  authors: [{ name: "ReconShield Team" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
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
    <html lang="en" className="dark h-full antialiased">
      <head>
        {/* Preconnect and Preload Critical Fonts & Assets */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Orbitron:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Orbitron:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface-950 text-white font-sans selection:bg-matrix-400/30 selection:text-matrix-400">
        {/* Lazy load Google AdSense script after First Contentful Paint */}
        <Script
          async
          defer
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3496685713682736"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        <Layout>
          {children}
        </Layout>
        <CookieBanner />

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
