import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Contact Us | Heart Forward',
  description: 'Get in touch with Heart Forward. We\'re here to help.',
};

export default function ContactPage() {
  return (
    <WireframePage
      title="Contact Us"
      route="/contact"
      description="Have questions? Need help? We're here for you."
      epic="Epic A — Foundation"
      sections={[
        'Contact Form',
        'Email Address',
        'Phone Number',
        'Office Hours',
        'Social Media Links',
        'FAQ Quick Links',
      ]}
      ctas={[
        { label: 'Check Scholarship Eligibility', href: '/scholarships/eligibility' },
        { label: 'View FAQ', href: '/faq' },
      ]}
    />
  );
}
