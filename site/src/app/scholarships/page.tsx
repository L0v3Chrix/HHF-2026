import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Scholarships | Heart Forward',
  description: 'Apply for a Heart Forward recovery housing scholarship.',
};

export default function ScholarshipsOverviewPage() {
  return (
    <WireframePage
      title="Recovery Housing Scholarships"
      route="/scholarships"
      description="Financial assistance for verified recovery housing to support your journey."
      epic="Epic C — Scholarships Funnel"
      sections={[
        'Hero: What Scholarships Cover',
        'Who Qualifies (Quick Overview)',
        'How It Works (3 Steps)',
        'Verified Homes Network Preview',
        'Success Stories',
        'FAQ Preview',
      ]}
      ctas={[
        { label: 'Check Eligibility', href: '/scholarships/eligibility' },
        { label: 'Start Application', href: '/scholarships/apply' },
      ]}
    />
  );
}
