import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = {
  title: "Donate | Heart Forward",
  description:
    "Your gift helps fund recovery living scholarships, harm reduction education, and community events—grounded in dignity and choice.",
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Donate to support recovery-centered living
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              Your gift helps fund recovery living scholarships, harm reduction education, and community events—grounded in dignity and choice.
            </p>
          </div>
        </section>

        {/* Donation Form */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8">
              {/* Amount Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-4">
                  Select amount
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { amount: "$25", description: "Supports resource sharing and outreach." },
                    { amount: "$50", description: "Helps fund education and event materials." },
                    { amount: "$100", description: "Supports scholarship coordination and verification work." },
                    { amount: "$250", description: "Helps cover recovery home scholarship support." },
                  ].map((option) => (
                    <button
                      key={option.amount}
                      className="p-4 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 hover:border-[var(--hf-accent)] transition-colors text-center"
                    >
                      {option.amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Toggle */}
              <div className="mb-8 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="monthly"
                  className="w-5 h-5 rounded border-[var(--hf-glass-border)] text-[var(--hf-accent)] focus:ring-[var(--hf-accent)]"
                />
                <label htmlFor="monthly" className="text-sm text-[var(--hf-text-secondary)]">
                  Make this monthly
                </label>
              </div>

              {/* Continue Button */}
              <button
                className="w-full px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors mb-4"
              >
                Continue to Secure Checkout
              </button>

              {/* Microcopy */}
              <p className="text-xs text-[var(--hf-text-muted)] text-center">
                Secure payment powered by Stripe.
              </p>
            </div>

            {/* Trust Message */}
            <div className="mt-8 text-center">
              <p className="text-sm text-[var(--hf-text-secondary)] mb-4">
                If finances are tight, sharing resources is also powerful.
              </p>
              <button
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] text-sm font-medium hover:bg-white/5 hover:border-[var(--hf-accent)] transition-colors"
              >
                Share Resources
              </button>
            </div>
          </div>
        </section>

        {/* Fine Print */}
        <section className="py-8 bg-[var(--hf-bg-base)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs text-[var(--hf-text-muted)]">
              Heart Forward Foundation is a nonprofit. Donations may be tax-deductible as allowed by law. You&apos;ll receive a receipt by email.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
