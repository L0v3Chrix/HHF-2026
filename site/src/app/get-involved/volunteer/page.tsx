import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = {
  title: "Volunteer | Heart Forward",
  description:
    "We welcome volunteers who value dignity, choice, and non-judgment. Tell us what you're available for—we'll follow up with next steps.",
};

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Volunteer with Heart Forward
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              We welcome volunteers who value dignity, choice, and non-judgment. Tell us what you&apos;re available for—we&apos;ll follow up with next steps.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8">
              <h2 className="font-heading text-xl text-[var(--hf-text-primary)] mb-6 text-center">
                Volunteer Interest
              </h2>

              <form className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Phone <span className="text-[var(--hf-text-muted)]">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="(###) ###-####"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Preferred contact method
                  </label>
                  <div className="flex gap-4">
                    {["Email", "Text", "Phone"].map((method) => (
                      <label
                        key={method}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="contactMethod"
                          value={method.toLowerCase()}
                          className="w-4 h-4 text-[var(--hf-accent)]"
                        />
                        <span className="text-sm text-[var(--hf-text-secondary)]">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Interests
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["Events", "Outreach", "Admin support", "Community education", "Other"].map((interest) => (
                      <label
                        key={interest}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={interest.toLowerCase()}
                          className="w-4 h-4 rounded border-[var(--hf-glass-border)] text-[var(--hf-accent)]"
                        />
                        <span className="text-sm text-[var(--hf-text-secondary)]">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Availability
                  </label>
                  <input
                    type="text"
                    placeholder="Weekdays, evenings, weekends…"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Notes <span className="text-[var(--hf-text-muted)]">(Optional)</span>
                  </label>
                  <textarea
                    placeholder="Anything you'd like us to know—needs, boundaries, preferences."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)] resize-none"
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    className="w-4 h-4 mt-0.5 rounded border-[var(--hf-glass-border)] text-[var(--hf-accent)]"
                  />
                  <label htmlFor="consent" className="text-sm text-[var(--hf-text-secondary)]">
                    I understand Heart Forward may contact me about volunteering.
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
                >
                  Submit Volunteer Interest
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
