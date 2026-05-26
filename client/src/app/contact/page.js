import ContactClient from '@/components/ContactClient';
export const metadata = {
  title: "Contact Secure Support & Enterprise Inquiries",
  description: "Reach out to the ReconShield team for technical support, platform feedback, media inquiries, or enterprise cybersecurity solutions. Fast and secure assistance.",
  alternates: {
    canonical: 'https://reconshield.in/contact',
  },
  openGraph: {
    title: "Contact Secure Support & Enterprise Inquiries",
    description: "Get in touch with the ReconShield team for secure technical support, enterprise inquiries, and API access requests.",
    url: 'https://reconshield.in/contact',
    type: 'website',
  }
};

export default function Page() {
  return <ContactClient />;
}
