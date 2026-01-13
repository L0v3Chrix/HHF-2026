import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Accessibility | Heart Forward',
  description: 'Heart Forward\'s commitment to digital accessibility.',
};

export default function AccessibilityPage() {
  return (
    <WireframePage
      title="Accessibility Statement"
      route="/accessibility"
      description="Our commitment to making Heart Forward accessible to everyone."
      epic="Epic A — Foundation (Legal)"
      sections={[
        'Our Commitment',
        'Accessibility Standards (WCAG 2.1 AA)',
        'Accessibility Features',
        'Known Limitations',
        'Feedback & Contact',
        'Third-Party Content',
        'Continuous Improvement',
      ]}
      ctas={[
        { label: 'Contact Us', href: '/contact' },
        { label: 'Report an Issue', href: '/contact' },
      ]}
    />
  );
}
