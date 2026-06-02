import Link from 'next/link';
import { Shield, ChevronRight } from 'lucide-react';
import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: 'Cookie Policy | ReconShield Intelligence Journal',
  description: 'Understand how ReconShield uses cookies to analyze traffic, manage user preferences, and serve advertisements via Google AdSense.',
  path: '/cookie-policy'
});

export default function CookiePolicyPage() {
  const lastUpdated = "June 02, 2026";

  return (
    <div className="bg-[#05080f] min-h-screen pb-24">
      {/* Header */}
      <section className="relative pt-24 pb-16 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-matrix-400/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-matrix-400/10 border border-matrix-400/20 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-matrix-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">Cookie Policy</h1>
              <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">Last Updated: {lastUpdated}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1000px] mx-auto px-6 pt-16">
        <div className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:font-display prose-h2:text-white prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-400 prose-p:leading-relaxed prose-a:text-[#00ff88] prose-li:text-gray-400">
          
          <h2>Introduction</h2>
          <p>
            This Cookie Policy explains how ReconShield ("we," "us," or "our") uses cookies and similar technologies to recognize you when you visit our website at <code>https://reconshield.in</code>. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>

          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, ReconShield) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
          </p>

          <h2>Why We Use Cookies?</h2>
          <p>
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes.
          </p>

          <h2>Types of Cookies We Use</h2>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as accessing secure areas.
            </li>
            <li>
              <strong>Analytics & Performance Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.
            </li>
            <li>
              <strong>Advertising/Targeting Cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests (such as Google AdSense).
            </li>
          </ul>

          <h2>Google AdSense and DoubleClick Cookie</h2>
          <p>
            Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DoubleClick cookie enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
          </p>
          <p>
            Users may opt out of the use of the DoubleClick cookie for interest-based advertising by visiting Google's ad settings page or by choosing "Decline" in our on-site Cookie Consent banner.
          </p>

          <h2>How Can You Control Cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in our Cookie Consent Banner. The Cookie Consent Banner allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
          </p>
          <p>
            You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
          </p>

          <h2>Updates to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or other technologies, please email us at:<br/>
            nsurendrareddy3@gmail.com
          </p>

        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex gap-4">
          <Link href="/privacy" className="text-sm font-mono text-gray-500 hover:text-white transition-colors flex items-center gap-2">
             Privacy Policy <ChevronRight className="w-4 h-4" />
          </Link>
          <Link href="/disclaimer" className="text-sm font-mono text-gray-500 hover:text-white transition-colors flex items-center gap-2">
             Legal Disclaimer <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
