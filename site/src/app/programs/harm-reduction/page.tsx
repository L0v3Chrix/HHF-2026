import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Harm Reduction Resources | Heart Forward",
  description:
    "Harm reduction is care. We share practical tools and information that support safer choices and reduce risk—without judgment.",
};

export default function HarmReductionPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Harm Reduction Resources
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              Harm reduction is care. We share practical tools and information that support safer choices and reduce risk—without judgment.
            </p>
          </div>
        </section>

        {/* Sections */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Safer use basics",
                  description: "Small steps can reduce harm.",
                },
                {
                  title: "Overdose prevention",
                  description: "Know the signs. Know the response.",
                },
                {
                  title: "Support & connection",
                  description: "You deserve people who listen.",
                },
              ].map((section) => (
                <div
                  key={section.title}
                  className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-colors"
                >
                  <h3 className="font-heading text-xl text-[var(--hf-text-primary)] mb-3">
                    {section.title}
                  </h3>
                  <p className="text-sm text-[var(--hf-text-secondary)]">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Band */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/resources"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
              >
                Browse Resources
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 transition-colors"
              >
                View Events
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
