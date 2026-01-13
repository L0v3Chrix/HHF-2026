import { WireframePage } from '@/components/WireframePage';

// Partner configuration (no CMS needed)
const partners: Record<string, { name: string; headline: string; subhead: string }> = {
  'help-now-atx': {
    name: 'Help Now ATX',
    headline: 'Heart Forward × Help Now ATX',
    subhead: 'Together, we\'re building stronger recovery pathways.',
  },
  'example-partner': {
    name: 'Example Partner',
    headline: 'Heart Forward × Example Partner',
    subhead: 'Working together to support recovery.',
  },
};

interface PartnerPageProps {
  params: Promise<{ partnerSlug: string }>;
}

export async function generateMetadata({ params }: PartnerPageProps) {
  const { partnerSlug } = await params;
  const partner = partners[partnerSlug];
  return {
    title: partner ? `${partner.name} | Heart Forward` : 'Partner | Heart Forward',
    description: partner?.subhead || 'Partner landing page for Heart Forward.',
  };
}

export default async function PartnerLandingPage({ params }: PartnerPageProps) {
  const { partnerSlug } = await params;
  const partner = partners[partnerSlug];

  return (
    <WireframePage
      title={partner?.headline || `Partner: ${partnerSlug}`}
      route={`/p/${partnerSlug}`}
      description={partner?.subhead || 'Campaign landing page for partner referrals and attribution tracking.'}
      epic="Epic G — Partner Landing Pages"
      sections={[
        'Partner Badge + "In partnership with..."',
        'Co-branded Hero Section',
        'Two Door Flip Cards (Same as Homepage)',
        '  - I Need Support',
        '  - Get Involved',
        'Partner-Specific Value Proposition',
        'UTM Tracking (Persist to forms/donations)',
        'Trust Indicators',
      ]}
      ctas={[
        { label: 'I Need Support', href: '/scholarships/eligibility' },
        { label: 'Get Involved', href: '/get-involved' },
      ]}
    />
  );
}

// Generate static params for known partners
export function generateStaticParams() {
  return Object.keys(partners).map((slug) => ({ partnerSlug: slug }));
}
