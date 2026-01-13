import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Events | Heart Forward",
  description:
    "Workshops and gatherings designed for learning, compassion, and community—welcoming to people in many stages of change.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Events
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              Workshops and gatherings designed for learning, compassion, and community—welcoming to people in many stages of change.
            </p>
          </div>
        </section>

        {/* Empty State */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass rounded-2xl p-8">
              <p className="text-[var(--hf-text-secondary)] mb-6">
                No events are listed right now. Check back soon—or contact us to host one.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Band */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl text-[var(--hf-text-primary)] mb-4">
              Want to host an event?
            </h2>
            <p className="text-[var(--hf-text-secondary)] mb-8">
              We partner with community members and organizations to bring events to life.
            </p>
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
