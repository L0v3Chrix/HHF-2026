import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Review Application | Heart Forward',
  description: 'Review your scholarship application before submitting.',
};

export default function ApplyReviewPage() {
  return (
    <WireframePage
      title="Application: Review"
      route="/scholarships/apply/review"
      description="Step 5 of 5 — Review your information before submitting."
      epic="Epic C — Scholarships Funnel"
      sections={[
        'Progress: Step 5 of 5',
        'Summary of All Answers',
        'Edit Links for Each Section',
        'Terms & Agreement',
        'What Happens Next',
        'Submit Button',
      ]}
      ctas={[
        { label: 'Back', href: '/scholarships/apply/housing-needs' },
        { label: 'Submit Application', href: '/scholarships/apply/submit' },
      ]}
    />
  );
}
