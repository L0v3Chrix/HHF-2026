import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Get Involved | Heart Forward',
  description: 'Support Heart Forward through donations, volunteering, or partnerships.',
};

export default function GetInvolvedPage() {
  return (
    <WireframePage
      title="Get Involved"
      route="/get-involved"
      description="There are many ways to support Heart Forward's mission and make a difference."
      epic="Epic D — Get Involved Funnel"
      sections={[
        'Ways to Help Overview',
        'Donate Section',
        'Volunteer Section',
        'Partner/Sponsor Section',
        'Host an Event',
        'Share Our Mission',
      ]}
      ctas={[
        { label: 'Donate', href: '/get-involved/donate' },
        { label: 'Volunteer', href: '/get-involved/volunteer' },
        { label: 'Partner', href: '/get-involved/partner' },
      ]}
    />
  );
}
