import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Start Application | Heart Forward',
  description: 'Begin your Heart Forward scholarship application.',
};

export default function ApplyStartPage() {
  return (
    <WireframePage
      title="Application: Get Started"
      route="/scholarships/apply/start"
      description="Step 1 of 5 — Let's begin with some basic information."
      epic="Epic C — Scholarships Funnel"
      sections={[
        'Progress: Step 1 of 5',
        'Welcome Message',
        'What to Expect',
        'Time Estimate',
        'Privacy Assurance',
        'Begin Button',
      ]}
      ctas={[
        { label: 'Continue to About You', href: '/scholarships/apply/about-you' },
      ]}
    />
  );
}
