import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = {
  title: "Quick Eligibility Check | Heart Forward Scholarships",
  description:
    "This is a short, private check to see whether Heart Forward's scholarship support may be a fit. You can stop anytime.",
};

export default function EligibilityPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Quick eligibility check
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-2xl mx-auto">
              This is a short, private check to see whether Heart Forward&apos;s scholarship support may be a fit. You can stop anytime.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8">
              <p className="text-[var(--hf-text-secondary)] mb-8 text-center">
                We&apos;re glad you&apos;re here. When people seek support, it often means they&apos;re carrying a lot. We&apos;ll keep this simple.
              </p>

              {/* Form placeholder - to be implemented */}
              <form className="space-y-6">
                {/* Question 1 */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Where are you located? <span className="text-[var(--hf-text-muted)]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="City/region"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                </div>

                {/* Question 2 */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Are you seeking recovery living support in the next...
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]">
                    <option value="">Select timing</option>
                    <option value="now">Now</option>
                    <option value="1-2-weeks">1–2 weeks</option>
                    <option value="1-month">1 month</option>
                    <option value="not-sure">Not sure</option>
                  </select>
                </div>

                {/* Question 3 */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Which statement fits best today?
                  </label>
                  <div className="space-y-3">
                    {[
                      "I'm in early recovery and seeking stable recovery living.",
                      "I'm exploring recovery support and want options.",
                      "I'm supporting someone else.",
                    ].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 p-4 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] cursor-pointer hover:bg-white/5 transition-colors"
                      >
                        <input
                          type="radio"
                          name="situation"
                          value={option}
                          className="w-4 h-4 text-[var(--hf-accent)]"
                        />
                        <span className="text-sm text-[var(--hf-text-secondary)]">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 4 */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Anything you want us to know? <span className="text-[var(--hf-text-muted)]">(Optional)</span>
                  </label>
                  <textarea
                    placeholder="Preferences, boundaries, accessibility needs, timing…"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)] resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
                >
                  See My Next Step
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
