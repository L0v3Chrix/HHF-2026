import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Harm Reduction Resources | Heart Forward',
  description: 'Access harm reduction information and resources to support safer practices and well-being.',
};

export default function HarmReductionPage() {
  return (
    <WireframePage
      title="Harm Reduction Resources"
      route="/programs/harm-reduction"
      description="Practical information and resources for safer practices, meeting people where they are."
      epic="Epic F — Events + Resources"
      sections={[
        'What is Harm Reduction',
        'Our Approach',
        'Resource Categories',
        'Local Resources',
        'Educational Materials',
        'Get Help Now',
      ]}
      ctas={[
        { label: 'View Resources', href: '/resources' },
        { label: 'Contact Us', href: '/contact' },
      ]}
    />
  );
}
