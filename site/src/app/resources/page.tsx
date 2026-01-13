import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Resources | Heart Forward",
  description:
    "Practical harm reduction resources—no judgment, just care.",
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Resources
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              Practical harm reduction resources—no judgment, just care.
            </p>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Harm Reduction",
                  description: "Information and tools for safer choices.",
                },
                {
                  title: "Recovery Housing",
                  description: "What to look for in recovery living environments.",
                },
                {
                  title: "Local Support",
                  description: "Community resources and connections.",
                },
                {
                  title: "Education",
                  description: "Learn about recovery-centered practices.",
                },
                {
                  title: "Family Support",
                  description: "Resources for loved ones and allies.",
                },
                {
                  title: "Crisis Support",
                  description: "When you need help right now.",
                },
              ].map((category) => (
                <div
                  key={category.title}
                  className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors"
                >
                  <h3 className="font-heading text-lg text-[var(--hf-text-primary)] mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-[var(--hf-text-secondary)]">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Empty State Note */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass rounded-2xl p-8">
              <p className="text-[var(--hf-text-secondary)] mb-6">
                We&apos;re building out our resource library. Check back soon—or contact us if you need something specific.
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

        {/* Help Now ATX */}
        <section className="py-8 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-sm text-[var(--hf-text-secondary)] mb-3">
                For support needs outside Heart Forward&apos;s scope
              </p>
              <a
                href="https://helpnowaustintexas.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Help Now ATX
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
