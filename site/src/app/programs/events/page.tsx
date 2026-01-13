import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Events & Education | Heart Forward',
  description: 'Join Heart Forward events, workshops, and educational programs supporting the recovery community.',
};

export default function ProgramEventsPage() {
  return (
    <WireframePage
      title="Events & Education"
      route="/programs/events"
      description="Community events, workshops, and educational programs to support recovery and build connection."
      epic="Epic F — Events + Resources"
      sections={[
        'Upcoming Events Calendar',
        'Event Types (Workshops, Support Groups, Community)',
        'Past Event Highlights',
        'Host an Event',
        'Educational Resources',
      ]}
      ctas={[
        { label: 'View All Events', href: '/events' },
        { label: 'Host an Event', href: '/get-involved' },
      ]}
    />
  );
}
