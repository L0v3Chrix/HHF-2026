import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Submitting Application | Heart Forward',
  description: 'Your scholarship application is being submitted.',
};

export default function ApplySubmitPage() {
  return (
    <WireframePage
      title="Application: Submitting"
      route="/scholarships/apply/submit"
      description="Processing your scholarship application submission."
      epic="Epic C — Scholarships Funnel"
      sections={[
        'Loading/Processing State',
        'Submission Confirmation',
        'Error Handling',
        'Redirect to Thank You',
      ]}
      ctas={[
        { label: 'View Thank You Page', href: '/scholarships/thanks' },
      ]}
    />
  );
}
