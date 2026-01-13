import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Verified Recovery Homes | Heart Forward',
  description: 'Learn about Heart Forward\'s verified recovery home network and our verification process.',
};

export default function VerifiedHomesPage() {
  return (
    <WireframePage
      title="Verified Recovery Homes"
      route="/verified-homes"
      description="Our network of verified recovery homes meets strict quality and safety standards."
      epic="Epic E — Verified Homes Trust Layer"
      sections={[
        'What "Verified" Means',
        'Our Verification Criteria',
        'Verification Process (Steps)',
        'What Heart Forward Does / Does Not Do',
        'For Recovery Homes: How to Get Verified',
        'Trust Indicators & Badges',
      ]}
      ctas={[
        { label: 'Check Scholarship Eligibility', href: '/scholarships/eligibility' },
        { label: 'Partner as a Home', href: '/get-involved/partner' },
        { label: 'Donate', href: '/get-involved/donate' },
      ]}
    />
  );
}
