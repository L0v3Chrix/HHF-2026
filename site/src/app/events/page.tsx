import { WireframePage } from '@/components/WireframePage';

export const metadata = {
  title: 'Events | Heart Forward',
  description: 'Upcoming Heart Forward events, workshops, and community gatherings.',
};

export default function EventsPage() {
  return (
    <WireframePage
      title="Events"
      route="/events"
      description="Join our community events, workshops, and gatherings supporting recovery."
      epic="Epic F — Events + Resources"
      sections={[
        'Upcoming Events List',
        'Event Calendar View',
        'Event Categories Filter',
        'RSVP Functionality',
        'Past Events Archive',
        'Host an Event CTA',
      ]}
      ctas={[
        { label: 'Host an Event', href: '/get-involved' },
        { label: 'View Programs', href: '/programs' },
      ]}
    />
  );
}
