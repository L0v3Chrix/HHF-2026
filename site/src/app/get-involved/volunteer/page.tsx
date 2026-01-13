import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Volunteer | Heart Forward',
  description: 'Volunteer with Heart Forward and support people in recovery.',
};

export default function VolunteerPage() {
  return (
    <WireframePage
      title="Volunteer"
      route="/get-involved/volunteer"
      description="Join our volunteer team and make a hands-on difference in the recovery community."
      epic="Epic D — Get Involved Funnel"
      sections={[
        'Why Volunteer',
        'Volunteer Opportunities',
        'Time Commitment Options',
        'Volunteer Inquiry Form',
        'Current Volunteer Stories',
        'FAQ',
      ]}
      ctas={[
        { label: 'Donate Instead', href: '/get-involved/donate' },
        { label: 'Partner With Us', href: '/get-involved/partner' },
      ]}
    />
  );
}
