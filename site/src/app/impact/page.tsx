import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Our Impact | Heart Forward",
  description:
    "See the real impact of Heart Forward's work: lives changed, scholarships awarded, and community built.",
};

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Our Impact
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              Real numbers, real stories, and the measurable difference Heart Forward makes in the recovery community.
            </p>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { stat: "50+", label: "Scholarships supported" },
                { stat: "12", label: "Verified homes in network" },
                { stat: "200+", label: "Resources shared" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass rounded-2xl p-8 text-center"
                >
                  <div className="font-heading text-4xl sm:text-5xl text-[var(--hf-accent)] mb-2">
                    {item.stat}
                  </div>
                  <div className="text-[var(--hf-text-secondary)]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Impact Looks Like */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl text-[var(--hf-text-primary)] mb-8 text-center">
              What impact looks like
            </h2>
            <div className="space-y-6">
              {[
                "People finding stable recovery living when they needed it most",
                "Harm reduction resources reaching those who felt unseen",
                "Community events creating connection without judgment",
                "Verified homes providing dignity-centered environments",
              ].map((item) => (
                <div
                  key={item}
                  className="glass rounded-xl p-6 flex items-center gap-4"
                >
                  <div className="w-3 h-3 rounded-full bg-[var(--hf-accent)] flex-shrink-0" />
                  <p className="text-[var(--hf-text-primary)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Band */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl text-[var(--hf-text-primary)] mb-4">
              Help us do more
            </h2>
            <p className="text-[var(--hf-text-secondary)] mb-8">
              Your support expands scholarships, resources, and community education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-involved/donate"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
              >
                Donate
              </Link>
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 transition-colors"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
