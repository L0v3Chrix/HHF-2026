import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Your Recovery | Heart Forward Application',
  description: 'Share about your recovery journey for your scholarship application.',
};

export default function ApplyRecoveryPage() {
  return (
    <WireframePage
      title="Application: Your Recovery"
      route="/scholarships/apply/recovery"
      description="Step 3 of 5 — Share a bit about your recovery journey."
      epic="Epic C — Scholarships Funnel"
      sections={[
        'Progress: Step 3 of 5',
        'Recovery Timeline',
        'Current Recovery Status',
        'Support System',
        'Compassionate Copy',
        'Privacy Assurance',
      ]}
      ctas={[
        { label: 'Back', href: '/scholarships/apply/about-you' },
        { label: 'Continue to Housing Needs', href: '/scholarships/apply/housing-needs' },
      ]}
    />
  );
}
