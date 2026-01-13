import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Recovery Living Scholarships | Heart Forward",
  description:
    "If you're in early recovery and seeking a stable recovery home, we may be able to help with scholarship support—grounded in dignity, clarity, and choice.",
};

export default function ScholarshipsPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Recovery Living Scholarships
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              If you&apos;re in early recovery and seeking a stable recovery home, we may be able to help with scholarship support—grounded in dignity, clarity, and choice.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl text-[var(--hf-text-primary)] mb-10 text-center">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Check eligibility",
                  description: "A quick, private check to see if we're a fit.",
                },
                {
                  step: "2",
                  title: "Apply",
                  description: "Share what you're comfortable sharing. Save and return if needed.",
                },
                {
                  step: "3",
                  title: "Next steps",
                  description: "We review, follow up, and support placement aligned with verified homes.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--hf-accent)] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-heading text-lg text-[var(--hf-text-primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--hf-text-secondary)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Can/Cannot Support */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass rounded-2xl p-8">
                <h3 className="font-heading text-xl text-[var(--hf-text-primary)] mb-4">
                  What we can support
                </h3>
                <p className="text-[var(--hf-text-secondary)]">
                  Scholarship support for recovery homes that meet our verification criteria and align with the kind of support we provide.
                </p>
              </div>
              <div className="glass rounded-2xl p-8">
                <h3 className="font-heading text-xl text-[var(--hf-text-primary)] mb-4">
                  What we may not cover
                </h3>
                <p className="text-[var(--hf-text-secondary)]">
                  If your needs are outside our scope, we&apos;ll do our best to connect you to compassionate options.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/scholarships/eligibility"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
              >
                Check Eligibility
              </Link>
              <Link
                href="/verified-homes"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 transition-colors"
              >
                How Homes Are Verified
              </Link>
            </div>

            {/* Safety Line */}
            <p className="text-sm text-[var(--hf-text-muted)]">
              If you need immediate support right now, you can connect with{" "}
              <a
                href={process.env.NEXT_PUBLIC_HELPNOWATX_URL || "https://helpnowatx.org"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--hf-accent)] hover:underline"
              >
                Help Now ATX
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
