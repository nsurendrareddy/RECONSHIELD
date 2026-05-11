import Layout from "@/components/Layout";
import Script from "next/script";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://reconshield.com"),
  title: {
    default: "ReconShield - AI Cybersecurity & Threat Intelligence Platform",
    template: "%s | ReconShield"
  },
  description: "ReconShield — AI-powered cybersecurity platform for threat intelligence, OSINT, vulnerability scanning, and IP analysis. Professional-grade security tools, free.",
  keywords: ["cybersecurity", "vulnerability scanner", "IP intelligence", "threat detection", "SSL checker", "DNS lookup"],
  authors: [{ name: "ReconShield Team" }],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "ReconShield - AI Cybersecurity Platform",
    description: "ReconShield — AI-powered cybersecurity platform for threat intelligence, OSINT, vulnerability scanning, and IP analysis. Professional-grade security tools, free.",
    url: "https://reconshield.vercel.app/",
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
      <body className="min-h-full flex flex-col bg-surface-950 text-white font-sans selection:bg-matrix-400/30 selection:text-matrix-400">
        <Layout>
          {children}
        </Layout>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CCQ5L37N81"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-CCQ5L37N81');
          `}
        </Script>
        {/* Site-wide JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "ReconShield",
                "url": "https://reconshield.com",
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "ReconShield",
                "url": "https://reconshield.com",
                "logo": "https://reconshield.com/og-image.png"
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
