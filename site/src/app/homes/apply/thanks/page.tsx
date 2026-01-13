import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Application Submitted | Heart Forward",
  description:
    "Thank you for applying for home verification. We'll review your application and be in touch soon.",
};

export default function HomesThanksPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--hf-accent)]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--hf-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Thank you for applying
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-2xl mx-auto">
              We&apos;ve received your verification application. Our team will review it and be in touch within 5-7 business days.
            </p>
          </div>
        </section>

        {/* What Happens Next */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl text-[var(--hf-text-primary)] mb-8 text-center">
              What happens next
            </h2>
            <div className="grid gap-6">
              {[
                {
                  step: "1",
                  title: "Application review",
                  description: "Our team reviews your application to ensure it meets our verification criteria.",
                },
                {
                  step: "2",
                  title: "Initial contact",
                  description: "We'll reach out to introduce ourselves, answer questions, and schedule next steps.",
                },
                {
                  step: "3",
                  title: "Verification conversation",
                  description: "A brief call or visit to learn more about your home and approach.",
                },
                {
                  step: "4",
                  title: "Decision & onboarding",
                  description: "If approved, we'll add you to our verified homes network and begin referring residents.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="glass rounded-2xl p-6 flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--hf-accent)]/10 flex items-center justify-center">
                    <span className="text-[var(--hf-accent)] font-medium">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-[var(--hf-text-primary)] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--hf-text-secondary)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Confirmation Details */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8 text-center">
              <h2 className="font-heading text-xl text-[var(--hf-text-primary)] mb-4">
                Need to make changes?
              </h2>
              <p className="text-[var(--hf-text-secondary)] mb-6">
                If you need to update any information or have questions about your application, please contact us.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
              >
                Contact Us
              </Link>
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
