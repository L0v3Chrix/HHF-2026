import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Thank You for Donating | Heart Forward",
  description:
    "Thank you. Your support helps people feel safer and more supported.",
};

export default function DonateThanksPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Thank you. Your support helps people feel safer and more supported.
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              We&apos;re grateful. Your gift supports recovery living scholarships and harm reduction education.
            </p>
          </div>
        </section>

        {/* Deepen Impact */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass rounded-2xl p-8">
              <h2 className="font-heading text-xl text-[var(--hf-text-primary)] mb-4">
                Want to deepen the impact?
              </h2>
              <Link
                href="/get-involved/donate"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
              >
                Become a Monthly Supporter
              </Link>
            </div>
          </div>
        </section>

        {/* Share Panel */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8 text-center">
              <h2 className="font-heading text-xl text-[var(--hf-text-primary)] mb-4">
                Share hope (without pressure)
              </h2>
              <p className="text-sm text-[var(--hf-text-secondary)] mb-6">
                &ldquo;I just supported recovery living scholarships with Heart Forward Foundation. If you&apos;d like to help too, here&apos;s where to start.&rdquo;
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[var(--hf-accent)] text-white text-sm font-medium hover:bg-[var(--hf-accent-hover)] transition-colors">
                  Share
                </button>
                <button className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] text-sm font-medium hover:bg-white/5 transition-colors">
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Return Home */}
        <section className="py-8 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
