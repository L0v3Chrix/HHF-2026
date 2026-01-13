import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Our Impact | Heart Forward',
  description: 'See the real impact of Heart Forward\'s work: lives changed, scholarships awarded, and community built.',
};

export default function ImpactPage() {
  return (
    <WireframePage
      title="Our Impact"
      route="/impact"
      description="Real numbers, real stories, and the measurable difference Heart Forward makes in the recovery community."
      epic="Epic A — Foundation"
      sections={[
        'Impact Statistics Dashboard',
        'Scholarships Awarded',
        'Lives Supported',
        'Success Stories / Testimonials',
        'Community Growth',
        'Annual Reports',
      ]}
      ctas={[
        { label: 'Donate', href: '/get-involved/donate' },
        { label: 'Get Involved', href: '/get-involved' },
      ]}
    />
  );
}
