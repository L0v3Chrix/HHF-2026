import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Housing Needs | Heart Forward Application',
  description: 'Tell us about your housing needs for your scholarship application.',
};

export default function ApplyHousingNeedsPage() {
  return (
    <WireframePage
      title="Application: Housing Needs"
      route="/scholarships/apply/housing-needs"
      description="Step 4 of 5 — Help us understand your housing situation and needs."
      epic="Epic C — Scholarships Funnel"
      sections={[
        'Progress: Step 4 of 5',
        'Current Housing Situation',
        'Housing Need Urgency',
        'Location Preferences',
        'Special Requirements',
        'Timeline',
      ]}
      ctas={[
        { label: 'Back', href: '/scholarships/apply/recovery' },
        { label: 'Continue to Review', href: '/scholarships/apply/review' },
      ]}
    />
  );
}
