import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Application Received | Heart Forward",
  description:
    "We received your application. Thank you for trusting us. You deserve support that feels steady and respectful.",
};

export default function ScholarshipsThanksPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              We received your application. Thank you for trusting us.
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)]">
              You deserve support that feels steady and respectful. Here&apos;s what happens next.
            </p>
          </div>
        </section>

        {/* Next Steps Timeline */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Review",
                  description: "We review submissions in the order received.",
                },
                {
                  step: "2",
                  title: "Follow up",
                  description: "We'll contact you using your preferred method.",
                },
                {
                  step: "3",
                  title: "Plan",
                  description: "If we're a fit, we'll discuss options aligned with verified homes.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 items-start glass rounded-2xl p-6"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--hf-accent)] text-white flex items-center justify-center text-lg font-bold flex-shrink-0">
                    {item.step}
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

        {/* Share Panel */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl text-[var(--hf-text-primary)] mb-4">
              Want to share resources with someone else?
            </h2>
            <p className="text-[var(--hf-text-secondary)] mb-8">
              Support can start with a link. If someone you care about needs harm reduction resources or scholarship info, you can share this page.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
              >
                Share
              </button>
              <button
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>
        </section>

        {/* Help Now ATX Module */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-xl text-[var(--hf-text-primary)] mb-4">
              Need support sooner?
            </h2>
            <p className="text-[var(--hf-text-secondary)] mb-6">
              Help Now ATX may be able to help with quick connection and navigation.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_HELPNOWATX_URL || "https://helpnowatx.org"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 transition-colors"
            >
              Get Help Now
            </a>
          </div>
        </section>

        {/* Return Home */}
        <section className="py-12 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/"
              className="text-[var(--hf-accent)] hover:underline"
            >
              ← Return Home
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
