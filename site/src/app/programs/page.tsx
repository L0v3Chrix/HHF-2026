import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Our Programs | Heart Forward',
  description: 'Explore Heart Forward\'s programs: recovery living scholarships, harm reduction resources, and community events.',
};

export default function ProgramsPage() {
  return (
    <WireframePage
      title="Our Programs"
      route="/programs"
      description="Heart Forward offers three core programs to support people in recovery and build community."
      epic="Epic A — Foundation"
      sections={[
        'Program Overview Grid',
        'Recovery Living Scholarships',
        'Harm Reduction Resources',
        'Events & Education',
        'How Programs Work Together',
      ]}
      ctas={[
        { label: 'Scholarships', href: '/programs/scholarships' },
        { label: 'Harm Reduction', href: '/programs/harm-reduction' },
        { label: 'Events', href: '/programs/events' },
      ]}
    />
  );
}
