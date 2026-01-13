import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Accessibility | Heart Forward",
  description:
    "We're committed to making this site usable for as many people as possible.",
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Accessibility
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              We&apos;re committed to making this site usable for as many people as possible. If something isn&apos;t working for you, tell us and we&apos;ll fix it.
            </p>
          </div>
        </section>

        {/* Accessibility Content */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading text-lg text-[var(--hf-text-primary)] mb-3">
                  Our commitment
                </h2>
                <p className="text-[var(--hf-text-secondary)]">
                  We aim to meet WCAG 2.1 Level AA standards. This means working toward a site that&apos;s perceivable, operable, understandable, and robust for everyone.
                </p>
              </div>

              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading text-lg text-[var(--hf-text-primary)] mb-3">
                  What we&apos;re doing
                </h2>
                <ul className="text-[var(--hf-text-secondary)] space-y-2">
                  <li>• Using clear, readable text with adequate contrast</li>
                  <li>• Making forms navigable by keyboard</li>
                  <li>• Providing labels and descriptions for interactive elements</li>
                  <li>• Testing with screen readers and accessibility tools</li>
                </ul>
              </div>

              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading text-lg text-[var(--hf-text-primary)] mb-3">
                  Known limitations
                </h2>
                <p className="text-[var(--hf-text-secondary)]">
                  Some older content or third-party tools may not fully meet our standards yet. We&apos;re working on it.
                </p>
              </div>

              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading text-lg text-[var(--hf-text-primary)] mb-3">
                  Report an issue
                </h2>
                <p className="text-[var(--hf-text-secondary)]">
                  If you encounter a barrier, please contact us. We want to know so we can improve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
            >
              Report an Accessibility Issue
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
