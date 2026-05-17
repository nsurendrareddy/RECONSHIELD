export const metadata = {
  title: "Privacy Policy | ReconShield Data Protection Protocols",
  description: "Review ReconShield's Privacy Policy. Understand how we collect, protect, and handle your data, including cookie usage and Google AdSense integrations.",
  alternates: {
    canonical: 'https://reconshield.in/privacy',
  },
  openGraph: {
    title: "Privacy Policy | ReconShield Intelligence",
    description: "Review ReconShield's Privacy Policy. Understand how we collect, protect, and handle your data, including cookie usage and Google AdSense integrations.",
    url: 'https://reconshield.in/privacy',
    type: 'website',
  }
};

export default function Privacy() {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto py-12">
      <div className="glass-card p-10 md:p-16">
        <h1 className="text-3xl font-display font-bold text-white tracking-widest uppercase mb-10 border-b border-white/5 pb-6">
          Privacy <span className="text-matrix-400">&</span> Data Protocol
        </h1>
        
        <div className="space-y-12 font-mono text-sm leading-relaxed text-gray-400">
          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">01.</span> INTRODUCTION
            </h3>
            <p>
              Welcome to ReconShield (reconshield.in). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains in plain English what information we collect, how we use it, and what rights you have concerning your data when you visit our cybersecurity blog and use our OSINT research platform.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">02.</span> DATA WE COLLECT
            </h3>
            <p className="mb-4">
              We collect minimal personal data to provide and improve our services. When you interact with our platform, such as filling out contact or subscription forms, we may collect:
            </p>
            <ul className="list-disc pl-8 space-y-2 text-gray-500">
              <li><strong>Personal Information:</strong> Your name and email address.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, such as IP addresses, browser types, and pages visited, collected automatically for analytics purposes.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">03.</span> HOW WE USE YOUR DATA
            </h3>
            <p className="mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-8 space-y-2 text-gray-500">
              <li>To provide, operate, and maintain our platform and tools.</li>
              <li>To respond to your inquiries, support requests, or media engagements.</li>
              <li>To send you updates, newsletters, or security alerts if you have subscribed to them.</li>
              <li>To monitor and analyze trends, usage, and activities to improve our user experience.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">04.</span> COOKIES AND GOOGLE ADSENSE
            </h3>
            <p className="mb-4">
              ReconShield uses cookies to enhance your browsing experience and serve relevant advertisements. A cookie is a small text file stored on your device.
            </p>
            <ul className="list-disc pl-8 space-y-2 text-gray-500">
              <li><strong>Analytics Cookies:</strong> We use cookies to understand how visitors interact with our site, helping us improve performance and content.</li>
              <li><strong>Google AdSense & DoubleClick Cookies:</strong> We use Google AdSense to serve ads. Google and its partners use DoubleClick cookies to serve ads based on your prior visits to our site or other websites on the internet.</li>
              <li>You can opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer" className="text-matrix-400 hover:underline">Google Ads Settings</a>.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">05.</span> THIRD-PARTY SERVICES
            </h3>
            <p>
              We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or serving our users (such as hosting providers and analytics services). These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">06.</span> DATA RETENTION
            </h3>
            <p>
              We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Policy. Subscription and contact information will be retained until you request its deletion or unsubscribe from our services. Analytics data is anonymized and retained according to the policies of our analytics providers.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">07.</span> YOUR DATA RIGHTS
            </h3>
            <p className="mb-4">
              You have the right to access, update, or delete the personal information we have collected about you. Specifically, you can:
            </p>
            <ul className="list-disc pl-8 space-y-2 text-gray-500">
              <li>Request a copy of the personal data we hold about you.</li>
              <li>Request that we correct any inaccurate or incomplete data.</li>
              <li>Request the complete deletion of your personal data from our systems.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-bold mb-4 flex items-center gap-3">
              <span className="text-matrix-400">08.</span> CONTACT US
            </h3>
            <p>
              If you have any questions or requests regarding your privacy or this policy, please contact us. You can reach our privacy team directly via email at <a href="mailto:nsurendrareddy3@gmail.com" className="text-matrix-400 hover:underline">nsurendrareddy3@gmail.com</a>.
            </p>
          </section>
        </div>

        <div className="mt-16 text-center">
          <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
            Last Updated: MAY 2026 // Revision 3.0
          </p>
        </div>
      </div>
    </div>
  )
}
