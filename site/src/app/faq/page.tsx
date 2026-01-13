import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'FAQ | Heart Forward',
  description: 'Frequently asked questions about Heart Forward programs and services.',
};

export default function FAQPage() {
  return (
    <WireframePage
      title="Frequently Asked Questions"
      route="/faq"
      description="Answers to common questions about scholarships, programs, and how we help."
      epic="Epic A — Foundation"
      sections={[
        'General Questions',
        'Scholarship Questions',
        'Eligibility Questions',
        'Donation Questions',
        'Volunteer Questions',
        'Contact for More Help',
      ]}
      ctas={[
        { label: 'Contact Us', href: '/contact' },
        { label: 'Check Eligibility', href: '/scholarships/eligibility' },
      ]}
    />
  );
}
