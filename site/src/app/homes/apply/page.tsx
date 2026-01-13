import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Apply for Home Verification | Heart Forward",
  description:
    "Begin the verification process for your recovery home. We're here to help you meet our standards for safety, dignity, and accountability.",
};

export default function HomesApplyPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Apply for home verification
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto mb-4">
              Verification means your home meets our standards for safety, dignity, and accountability. It allows us to confidently refer residents and provide scholarship support.
            </p>
            <p className="text-[var(--hf-text-muted)] max-w-2xl mx-auto">
              This process takes about 10-15 minutes. You can save and return if needed.
            </p>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl text-[var(--hf-text-primary)] mb-8 text-center">
              What to expect
            </h2>
            <div className="grid gap-6">
              {[
                {
                  step: "1",
                  title: "Eligibility check",
                  description: "Quick questions to confirm your home is a fit for our verification process.",
                },
                {
                  step: "2",
                  title: "About your home",
                  description: "Basic information about your recovery home and contact details.",
                },
                {
                  step: "3",
                  title: "Location & capacity",
                  description: "Where your home is located and how many residents you can support.",
                },
                {
                  step: "4",
                  title: "Policies & practices",
                  description: "Your approach to recovery support, house rules, and resident safety.",
                },
                {
                  step: "5",
                  title: "Review & submit",
                  description: "Review your information and submit for verification.",
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

        {/* What We're Looking For */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl text-[var(--hf-text-primary)] mb-6 text-center">
              What we&apos;re looking for
            </h2>
            <div className="glass rounded-2xl p-8">
              <ul className="space-y-4 text-[var(--hf-text-secondary)]">
                <li className="flex gap-3">
                  <svg className="w-5 h-5 text-[var(--hf-accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Safe, stable housing environment for people in recovery</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-5 h-5 text-[var(--hf-accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Clear house rules and expectations for residents</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-5 h-5 text-[var(--hf-accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Commitment to resident dignity and autonomy</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-5 h-5 text-[var(--hf-accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Willingness to communicate openly with Heart Forward</span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-5 h-5 text-[var(--hf-accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Harm reduction-aligned approach (meeting people where they are)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/homes/apply/eligibility"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors text-lg"
            >
              Begin Verification Application
            </Link>
            <p className="mt-4 text-sm text-[var(--hf-text-muted)]">
              Questions? <Link href="/contact" className="text-[var(--hf-accent)] hover:underline">Contact us</Link> and we&apos;ll help.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
