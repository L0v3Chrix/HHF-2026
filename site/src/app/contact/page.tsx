import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = {
  title: "Contact Us | Heart Forward",
  description:
    "If you're unsure where to start, that's okay. Tell us what you need, and we'll respond with options.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Contact Heart Forward
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              If you&apos;re unsure where to start, that&apos;s okay. Tell us what you need, and we&apos;ll respond with options.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-2xl p-8">
              <form className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Name
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

                {/* Topic */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    I&apos;m reaching out about
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)]">
                    <option value="">Select a topic</option>
                    <option value="scholarships">Scholarships</option>
                    <option value="resources">Resources</option>
                    <option value="events">Events</option>
                    <option value="volunteering">Volunteering</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[var(--hf-text-primary)] mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="What's going on? What would support look like?"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--hf-bg-base)] border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] placeholder:text-[var(--hf-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--hf-accent)] resize-none"
                  />
                </div>

                {/* Newsletter Opt-in */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="w-4 h-4 mt-0.5 rounded border-[var(--hf-glass-border)] text-[var(--hf-accent)]"
                  />
                  <label htmlFor="newsletter" className="text-sm text-[var(--hf-text-secondary)]">
                    It&apos;s okay to email me about resources and updates.
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Safety Note */}
        <section className="py-8 bg-[var(--hf-bg-base)]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-sm text-[var(--hf-text-secondary)] mb-3">
                Heart Forward doesn&apos;t provide crisis services or medical advice.
              </p>
              <p className="text-sm text-[var(--hf-text-muted)]">
                For broader support navigation, <a href="https://helpnowaustintexas.org" target="_blank" rel="noopener noreferrer" className="text-[var(--hf-accent)] hover:underline">Help Now ATX</a> can help.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
