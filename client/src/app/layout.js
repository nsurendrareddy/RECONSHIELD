import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import "./globals.css";

export const metadata = {
  title: "ReconShield - AI Cybersecurity & Threat Intelligence Platform",
  description: "Scan websites, analyze IP threats, detect vulnerabilities, and monitor cyber risks in real time using advanced AI security analytics.",
  keywords: ["cybersecurity", "vulnerability scanner", "IP intelligence", "threat detection", "SSL checker", "DNS lookup"],
  authors: [{ name: "ReconShield Team" }],
  openGraph: {
    title: "ReconShield - AI Cybersecurity Platform",
    description: "Advanced reconnaissance and threat intelligence at your fingertips.",
    url: "https://reconshield.vercel.app",
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface-950 text-white font-sans selection:bg-matrix-400/30 selection:text-matrix-400">
        <AuthProvider>
          <Layout>
            {children}
          </Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
