import ContactClient from '@/components/ContactClient';
import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "Contact Secure Support & Enterprise Inquiries",
  description: "Reach out to the ReconShield team for technical support, platform feedback, media inquiries, or enterprise cybersecurity solutions. Fast and secure assistance.",
  path: '/contact'
});

export default function Page() {
  return <ContactClient />;
}
