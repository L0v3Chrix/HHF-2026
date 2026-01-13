import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Application Submitted | Heart Forward',
  description: 'Thank you for applying for a Heart Forward scholarship.',
};

export default function ScholarshipsThanksPage() {
  return (
    <WireframePage
      title="Application Submitted!"
      route="/scholarships/thanks"
      description="Thank you for applying. Here's what happens next."
      epic="Epic C — Scholarships Funnel"
      sections={[
        'Confirmation Message',
        'Application Reference Number',
        'Next Steps Timeline',
        'What to Expect',
        'Share Panel (Ethical Virality)',
        '  - "Know someone who needs support?"',
        '  - Native share on mobile',
        '  - Social share buttons',
        'Stay Connected (Newsletter)',
      ]}
      ctas={[
        { label: 'Return Home', href: '/' },
        { label: 'View Resources', href: '/resources' },
      ]}
    />
  );
}
