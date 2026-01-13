import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Donate | Heart Forward',
  description: 'Support recovery housing scholarships with a donation to Heart Forward.',
};

export default function DonatePage() {
  return (
    <WireframePage
      title="Donate"
      route="/get-involved/donate"
      description="Your donation directly funds recovery housing scholarships for people in early recovery."
      epic="Epic D — Get Involved Funnel"
      sections={[
        'Impact Statement',
        'Donation Amount Selector',
        'One-Time vs Monthly Toggle',
        'Suggested Amounts with Outcomes',
        'Stripe Checkout Integration',
        'Employer Matching Info',
        'Other Ways to Give',
      ]}
      ctas={[
        { label: 'Volunteer Instead', href: '/get-involved/volunteer' },
        { label: 'Partner With Us', href: '/get-involved/partner' },
      ]}
    />
  );
}
