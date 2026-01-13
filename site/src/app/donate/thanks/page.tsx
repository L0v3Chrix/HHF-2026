import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Thank You for Donating | Heart Forward',
  description: 'Thank you for your generous donation to Heart Forward.',
};

export default function DonateThanksPage() {
  return (
    <WireframePage
      title="Thank You!"
      route="/donate/thanks"
      description="Your donation is making a real difference for people in recovery."
      epic="Epic D — Get Involved Funnel"
      sections={[
        'Confirmation Message',
        'Donation Amount & Type',
        'Receipt Info',
        'Impact Statement',
        'Share Panel (Ethical Virality)',
        '  - "I just helped fund..."',
        '  - Native share on mobile',
        '  - Social share buttons',
        'Stay Connected (Newsletter)',
        'Other Ways to Help',
      ]}
      ctas={[
        { label: 'Return Home', href: '/' },
        { label: 'Volunteer', href: '/get-involved/volunteer' },
      ]}
    />
  );
}
