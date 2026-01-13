import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Vendor Verification | Heart Forward',
  description: 'Verify your status as a Heart Forward approved vendor or recovery home.',
};

export default function VendorVerificationPage() {
  return (
    <WireframePage
      title="Vendor Verification"
      route="/vendor-verification"
      description="Verify your status as an approved Heart Forward vendor or recovery home partner."
      epic="Epic E — Verified Homes Trust Layer"
      sections={[
        'Verification Lookup Form',
        '  - Vendor/Home Name',
        '  - Verification Code',
        '  - Location',
        'Verification Status Display',
        '  - Verified Badge',
        '  - Verification Date',
        '  - Services Approved',
        'Report Concerns',
        'Become a Verified Vendor CTA',
        'Contact for Questions',
      ]}
      ctas={[
        { label: 'Become a Verified Home', href: '/get-involved/partner' },
        { label: 'View All Verified Homes', href: '/verified-homes' },
        { label: 'Contact Us', href: '/contact' },
      ]}
    />
  );
}
