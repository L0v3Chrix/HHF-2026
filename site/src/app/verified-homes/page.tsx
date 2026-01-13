import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Verified Recovery Homes | Heart Forward",
  description:
    "Verification is about clarity and care—so scholarship support aligns with safer, recovery-centered living environments.",
};

export default function VerifiedHomesPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Verified recovery homes
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              Verification is about clarity and care—so scholarship support aligns with safer, recovery-centered living environments.
            </p>
          </div>
        </section>

        {/* What Verification Means */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8">
              <h2 className="font-heading text-2xl text-[var(--hf-text-primary)] mb-6 text-center">
                What verification means
              </h2>
              <p className="text-[var(--hf-text-secondary)] text-center mb-8">
                We verify homes using criteria designed to support dignity, safety, accountability, and a recovery-supportive environment.
              </p>

              <div className="space-y-4">
                {[
                  "Clear expectations and house guidelines",
                  "Respectful communication and resident dignity",
                  "A safer environment (physical and emotional)",
                  "Alignment with recovery-centered living practices",
                  "Transparent cost structure and policies",
                ].map((criterion) => (
                  <div
                    key={criterion}
                    className="flex items-center gap-3 p-4 rounded-lg bg-[var(--hf-bg-base)]"
                  >
                    <div className="w-2 h-2 rounded-full bg-[var(--hf-accent)] flex-shrink-0" />
                    <span className="text-[var(--hf-text-primary)]">{criterion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How Verification Works */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl text-[var(--hf-text-primary)] mb-8 text-center">
              How verification works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Initial review" },
                { step: "2", title: "Conversation + documentation" },
                { step: "3", title: "Ongoing alignment check-ins" },
              ].map((item) => (
                <div
                  key={item.step}
                  className="glass rounded-2xl p-6 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--hf-accent)] text-white font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-heading text-lg text-[var(--hf-text-primary)]">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Don't Do */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl text-[var(--hf-text-primary)] mb-4">
              What we don&apos;t do
            </h2>
            <p className="text-[var(--hf-text-secondary)] max-w-2xl mx-auto">
              We don&apos;t promise immediate placement, and we don&apos;t replace medical, clinical, or emergency services.
            </p>
          </div>
        </section>

        {/* CTA Band */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/scholarships/eligibility"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
              >
                Check Eligibility
              </Link>
              <Link
                href="/get-involved/partner"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 transition-colors"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
