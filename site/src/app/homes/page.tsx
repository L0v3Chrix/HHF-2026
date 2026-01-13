import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { ROUTES } from "@/lib/links";

export const metadata = {
  title: "Partner as a Verified Recovery Home | Heart Forward",
  description:
    "Join Heart Forward's network of verified recovery homes. Receive scholarship-funded residents and connect with a community committed to dignity-centered recovery support.",
};

export default function HomesHubPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Partner with Heart Forward as a Verified Home
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto mb-8">
              Verification connects your recovery home to scholarship-funded residents while ensuring alignment with our commitment to safety, dignity, and recovery-centered living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryButton href={ROUTES.homes.apply}>
                Apply for Verification
              </PrimaryButton>
              <SecondaryButton href={ROUTES.homes.verified}>
                Learn What Verification Means
              </SecondaryButton>
            </div>
          </div>
        </section>

        {/* What We Look For */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl sm:text-3xl text-[var(--hf-text-primary)] mb-4">
                What we look for
              </h2>
              <p className="text-[var(--hf-text-secondary)]">
                Verification is about clarity and care—not perfection. We look for homes committed to:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Safety & Stability",
                  description: "Physical and emotional environments that support recovery without exploitation.",
                },
                {
                  title: "Dignity & Respect",
                  description: "Clear expectations, honest communication, and treatment that honors each resident's humanity.",
                },
                {
                  title: "Transparency",
                  description: "Straightforward costs, policies, and house guidelines—no hidden fees or surprise rules.",
                },
                {
                  title: "Recovery-Centered Practices",
                  description: "Support for multiple pathways to recovery, including MAT and harm reduction approaches.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="glass rounded-2xl p-6"
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

        {/* How Verification Works */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl sm:text-3xl text-[var(--hf-text-primary)] mb-4">
                How verification works
              </h2>
              <p className="text-[var(--hf-text-secondary)]">
                A simple three-step process designed to understand your home, not to judge it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Apply online",
                  description: "Share basic information about your home, policies, and approach to recovery support.",
                },
                {
                  step: "2",
                  title: "Conversation & review",
                  description: "We'll connect with you to learn more and discuss any questions on both sides.",
                },
                {
                  step: "3",
                  title: "Ongoing partnership",
                  description: "Verified homes receive scholarship referrals and periodic check-ins to maintain alignment.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="glass rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--hf-accent)] text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
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

        {/* Benefits of Verification */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl sm:text-3xl text-[var(--hf-text-primary)] mb-4">
                Benefits of verification
              </h2>
            </div>

            <div className="space-y-4">
              {[
                "Receive referrals from Heart Forward scholarship recipients",
                "Listed on our verified homes directory (coming soon)",
                "Access to resources and support for home operators",
                "Connection to a community of recovery-centered housing providers",
                "Visibility to families and case managers seeking quality placements",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 p-4 rounded-lg bg-[var(--hf-bg-base)]"
                >
                  <div className="w-2 h-2 rounded-full bg-[var(--hf-accent)] flex-shrink-0" />
                  <span className="text-[var(--hf-text-primary)]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Band */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl text-[var(--hf-text-primary)] mb-4">
              Ready to apply?
            </h2>
            <p className="text-[var(--hf-text-secondary)] mb-8 max-w-2xl mx-auto">
              The application takes about 10-15 minutes. Your information stays confidential and is used only for verification purposes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryButton href={ROUTES.homes.apply}>
                Apply for Verification
              </PrimaryButton>
              <SecondaryButton href={ROUTES.contact}>
                Questions? Contact Us
              </SecondaryButton>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
