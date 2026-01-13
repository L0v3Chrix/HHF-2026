import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'About You | Heart Forward Application',
  description: 'Tell us about yourself for your scholarship application.',
};

export default function ApplyAboutYouPage() {
  return (
    <WireframePage
      title="Application: About You"
      route="/scholarships/apply/about-you"
      description="Step 2 of 5 — Tell us a bit about yourself."
      epic="Epic C — Scholarships Funnel"
      sections={[
        'Progress: Step 2 of 5',
        'Name Fields',
        'Contact Information',
        'Current Location',
        'Date of Birth',
        'Form Validation',
      ]}
      ctas={[
        { label: 'Back', href: '/scholarships/apply/start' },
        { label: 'Continue to Recovery', href: '/scholarships/apply/recovery' },
      ]}
    />
  );
}
