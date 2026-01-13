import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Resources | Heart Forward',
  description: 'Recovery resources, harm reduction information, and support materials from Heart Forward.',
};

export default function ResourcesPage() {
  return (
    <WireframePage
      title="Resources"
      route="/resources"
      description="Helpful resources for people in recovery, their families, and supporters."
      epic="Epic F — Events + Resources"
      sections={[
        'Resource Categories',
        'Harm Reduction Materials',
        'Recovery Housing Info',
        'Local Support Services',
        'Educational Downloads',
        'External Resources',
        'Help Now ATX Link',
      ]}
      ctas={[
        { label: 'Check Scholarship Eligibility', href: '/scholarships/eligibility' },
        { label: 'Contact Us', href: '/contact' },
      ]}
    />
  );
}
