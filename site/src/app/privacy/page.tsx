import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Privacy Policy | Heart Forward',
  description: 'Heart Forward\'s privacy policy and data handling practices.',
};

export default function PrivacyPage() {
  return (
    <WireframePage
      title="Privacy Policy"
      route="/privacy"
      description="How we collect, use, and protect your information."
      epic="Epic A — Foundation (Legal)"
      sections={[
        'Last Updated Date',
        'Information We Collect',
        'How We Use Your Information',
        'Information Sharing',
        'Data Security',
        'Your Rights',
        'Cookies & Tracking',
        'Contact for Privacy Questions',
      ]}
      ctas={[
        { label: 'Contact Us', href: '/contact' },
        { label: 'Terms of Service', href: '/terms' },
      ]}
    />
  );
}
