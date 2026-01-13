import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Partner With Us | Heart Forward',
  description: 'Become a Heart Forward partner or sponsor and amplify your impact.',
};

export default function PartnerPage() {
  return (
    <WireframePage
      title="Partner With Us"
      route="/get-involved/partner"
      description="Partner with Heart Forward to expand recovery support and build community together."
      epic="Epic D — Get Involved Funnel"
      sections={[
        'Partnership Overview',
        'Sponsorship Tiers',
        'Benefits for Partners',
        'Current Partners',
        'Partnership Inquiry Form',
        'Schedule a Call CTA',
      ]}
      ctas={[
        { label: 'Donate', href: '/get-involved/donate' },
        { label: 'Contact Us', href: '/contact' },
      ]}
    />
  );
}
