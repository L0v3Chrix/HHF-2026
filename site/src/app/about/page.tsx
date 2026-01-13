import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'About Us | Heart Forward',
  description: 'Learn about Heart Forward\'s mission to support people in early recovery through scholarships, harm reduction, and community.',
};

export default function AboutPage() {
  return (
    <WireframePage
      title="About Heart Forward"
      route="/about"
      description="Our mission, story, and the people behind Heart Forward's work supporting recovery."
      epic="Epic A — Foundation"
      sections={[
        'Mission Statement',
        'Our Story / Origin',
        'Core Values',
        'Team / Leadership',
        'Partners & Collaborators',
        'Impact Timeline',
      ]}
      ctas={[
        { label: 'Get Involved', href: '/get-involved' },
        { label: 'Our Programs', href: '/programs' },
      ]}
    />
  );
}
