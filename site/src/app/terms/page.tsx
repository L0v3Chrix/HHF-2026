import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Terms of Service | Heart Forward',
  description: 'Heart Forward\'s terms of service and use agreement.',
};

export default function TermsPage() {
  return (
    <WireframePage
      title="Terms of Service"
      route="/terms"
      description="Terms and conditions for using Heart Forward's website and services."
      epic="Epic A — Foundation (Legal)"
      sections={[
        'Last Updated Date',
        'Acceptance of Terms',
        'Use of Services',
        'User Responsibilities',
        'Intellectual Property',
        'Limitations of Liability',
        'Governing Law',
        'Changes to Terms',
        'Contact Information',
      ]}
      ctas={[
        { label: 'Contact Us', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
      ]}
    />
  );
}
