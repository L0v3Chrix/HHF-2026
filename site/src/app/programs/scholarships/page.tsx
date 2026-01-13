import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Recovery Living Scholarships | Heart Forward',
  description: 'Heart Forward scholarships help people in early recovery access verified recovery housing.',
};

export default function ScholarshipsPage() {
  return (
    <WireframePage
      title="Recovery Living Scholarships"
      route="/programs/scholarships"
      description="Financial assistance for verified recovery housing to support your journey in early recovery."
      epic="Epic C — Scholarships Funnel"
      sections={[
        'What Scholarships Cover',
        'Who Qualifies (Overview)',
        'How It Works (3 Steps)',
        'Our Verified Homes Network',
        'Success Stories',
        'FAQ Preview',
      ]}
      ctas={[
        { label: 'Check Eligibility', href: '/scholarships/eligibility' },
        { label: 'Apply Now', href: '/scholarships/apply' },
      ]}
    />
  );
}
