import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Apply for Scholarship | Heart Forward',
  description: 'Start your Heart Forward scholarship application.',
};

export default function ApplyPage() {
  return (
    <WireframePage
      title="Scholarship Application"
      route="/scholarships/apply"
      description="Multi-step application for Heart Forward recovery housing scholarship."
      epic="Epic C — Scholarships Funnel"
      sections={[
        'Progress Indicator (Steps 1-5)',
        'Step Navigation',
        'Form Validation',
        'Save Progress Option',
        'Privacy Notice',
        'What Happens Next',
      ]}
      ctas={[
        { label: 'Start Application', href: '/scholarships/apply/start' },
        { label: 'Check Eligibility First', href: '/scholarships/eligibility' },
      ]}
    />
  );
}
