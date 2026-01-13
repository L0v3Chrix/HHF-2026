import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Terms | Heart Forward",
  description:
    "This site provides information and support navigation. It is not medical advice or emergency services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Terms
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              This site provides information and support navigation. It is not medical advice or emergency services. Use the resources in ways that fit your situation and safety.
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading text-lg text-[var(--hf-text-primary)] mb-3">
                  What we provide
                </h2>
                <p className="text-[var(--hf-text-secondary)]">
                  Heart Forward offers scholarship support, harm reduction resources, and connection to verified recovery homes. We are not a treatment provider.
                </p>
              </div>

              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading text-lg text-[var(--hf-text-primary)] mb-3">
                  What we don&apos;t provide
                </h2>
                <p className="text-[var(--hf-text-secondary)]">
                  We don&apos;t provide medical advice, crisis intervention, or emergency services. If you&apos;re in crisis, please contact appropriate emergency services or Help Now ATX.
                </p>
              </div>

              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading text-lg text-[var(--hf-text-primary)] mb-3">
                  Your responsibility
                </h2>
                <p className="text-[var(--hf-text-secondary)]">
                  Information you share should be accurate. We trust what you tell us and ask that you respect the dignity of everyone in our community.
                </p>
              </div>

              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading text-lg text-[var(--hf-text-primary)] mb-3">
                  Changes
                </h2>
                <p className="text-[var(--hf-text-secondary)]">
                  We may update these terms as our work evolves. Continued use of the site means you accept current terms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/privacy"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
