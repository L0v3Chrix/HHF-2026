import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = {
  title: "Partner With Us | Heart Forward",
  description:
    "Partnerships help sustain recovery living scholarships and community education. If you're looking for an aligned, dignity-centered mission, we'd love to connect.",
};

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Partner with Heart Forward
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              Partnerships help sustain recovery living scholarships and community education. If you&apos;re looking for an aligned, dignity-centered mission, we&apos;d love to connect.
            </p>
          </div>
        </section>

        {/* Partner Options */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "Community Partner",
                  description: "Support events, resources, and outreach.",
                },
                {
                  title: "Scholarship Supporter",
                  description: "Help fund recovery living scholarship support.",
                },
                {
                  title: "In-kind Partner",
                  description: "Offer services, space, supplies, or expertise.",
                },
              ].map((option) => (
                <div
                  key={option.title}
                  className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-colors"
                >
                  <h3 className="font-heading text-lg text-[var(--hf-text-primary)] mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm text-[var(--hf-text-secondary)]">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Inquiry Form */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8">
              <h2 className="font-heading text-xl text-[var(--hf-text-primary)] mb-6 text-center">
                Partnership Inquiry
              </h2>

              <form className="space-y-6">
                {/* Organization Name */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Organization name
                  </label>
                  <input
                    type="text"
                    placeholder="Organization or group name"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]"
                  />
                </div>

                {/* Contact Name */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Contact name
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

                {/* Partnership Interest */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Partnership interest
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]">
                    <option value="">Select interest</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="in-kind">In-kind</option>
                    <option value="referral">Referral partner</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Notes <span className="text-[var(--hf-text-muted)]">(Optional)</span>
                  </label>
                  <textarea
                    placeholder="What are you hoping to support? Any goals or timelines?"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)] resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
                >
                  Send Partnership Inquiry
                </button>

                {/* Microcopy */}
                <p className="text-xs text-[var(--hf-text-muted)] text-center">
                  We&apos;ll respond with clarity and care—no hard sell.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
