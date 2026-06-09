import Layout from "@/components/Layout";
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
    other: {
      monetag: "7aabe76ed141f0ed14b40475e99bf0c0",
    },
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark h-full antialiased ${inter.variable} ${jetbrains.variable} ${rajdhani.variable}`}>
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
        {/* Monetag Ads Script */}
        <Script
          src="https://quge5.com/88/tag.min.js"
          data-zone="247950"
          data-cfasync="false"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface-950 text-white font-sans selection:bg-matrix-400/30 selection:text-matrix-400">
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3496685713682736"
          crossOrigin="anonymous"
          strategy="afterInteractive"
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
