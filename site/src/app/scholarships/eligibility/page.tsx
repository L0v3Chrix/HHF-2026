import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Check Eligibility | Heart Forward Scholarships',
  description: 'See if you qualify for a Heart Forward recovery housing scholarship.',
};

export default function EligibilityPage() {
  return (
    <WireframePage
      title="Check Your Eligibility"
      route="/scholarships/eligibility"
      description="Answer a few quick questions to see if you may qualify for a scholarship. This is not an application."
      epic="Epic C — Scholarships Funnel"
      sections={[
        'Privacy-First Introduction',
        'Eligibility Questions (2-6 max)',
        '  - Recovery timeline (broad)',
        '  - Location / relocation ability',
        '  - Housing need timing',
        '  - Preferred contact method',
        'Results: Eligible → Start Application CTA',
        'Results: Possibly Eligible → Contact CTA',
        'Results: Not Eligible → Resources + Events + Help Now ATX',
      ]}
      ctas={[
        { label: 'Learn About Scholarships', href: '/scholarships' },
        { label: 'Contact Us', href: '/contact' },
      ]}
    />
  );
}
