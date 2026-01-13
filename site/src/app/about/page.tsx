import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = {
  title: "About Us | Heart Forward",
  description:
    "Heart Forward Foundation provides recovery living scholarships, harm reduction resources, and community education—rooted in dignity, choice, and belonging.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Our mission is simple: support recovery-centered living, without shame.
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              Heart Forward Foundation provides recovery living scholarships, harm reduction resources, and community education—rooted in dignity, choice, and belonging.
            </p>
          </div>
        </section>

        {/* Why We Exist Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl text-[var(--hf-text-primary)] mb-6 text-center">
              Why we exist
            </h2>
            <p className="text-[var(--hf-text-secondary)] text-lg text-center max-w-3xl mx-auto">
              We see how often people are asked to &quot;prove&quot; they deserve help. We choose another way: clear options, respectful language, and support that meets real needs.
            </p>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl text-[var(--hf-text-primary)] mb-10 text-center">
              Our values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Dignity",
                  description: "Everyone deserves respect, always.",
                },
                {
                  title: "Choice",
                  description: "People know their needs; we offer options.",
                },
                {
                  title: "Safety",
                  description: "Physical, emotional, and community safety matter.",
                },
                {
                  title: "Harm reduction",
                  description: "Reducing risk is a form of care.",
                },
                {
                  title: "Recovery-centered living",
                  description: "Stable environments support healing.",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors"
                >
                  <h3 className="font-heading text-lg text-[var(--hf-text-primary)] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[var(--hf-text-secondary)]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl text-[var(--hf-text-primary)] mb-10 text-center">
              What we do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Scholarships",
                  description: "Support for verified recovery home placement.",
                },
                {
                  title: "Resources",
                  description: "Practical, non-judgmental harm reduction support.",
                },
                {
                  title: "Events",
                  description: "Education that builds connection and skills.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="text-center p-6 rounded-2xl bg-[var(--hf-glass)] border border-[var(--hf-glass-border)]"
                >
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

        {/* CTA Band */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl text-[var(--hf-text-primary)] mb-8">
              Ready to take a next step?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/scholarships/eligibility"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
              >
                Check Eligibility
              </a>
              <a
                href="/get-involved/donate"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 transition-colors"
              >
                Donate Now
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
