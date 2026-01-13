import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Get Involved | Heart Forward",
  description:
    "Support recovery-centered living and harm reduction—through giving, volunteering, partnering, or sharing resources.",
};

export default function GetInvolvedPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Get involved
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-2xl mx-auto">
              Support recovery-centered living and harm reduction—through giving, volunteering, partnering, or sharing resources.
            </p>
          </div>
        </section>

        {/* Cards */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Donate",
                  description: "Fuel scholarships and education.",
                  href: "/get-involved/donate",
                  cta: "Donate Now",
                },
                {
                  title: "Volunteer",
                  description: "Offer time and skills.",
                  href: "/get-involved/volunteer",
                  cta: "Volunteer With Us",
                },
                {
                  title: "Partner",
                  description: "Build sustained community support.",
                  href: "/get-involved/partner",
                  cta: "Partner With Us",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="glass rounded-2xl p-8 flex flex-col hover:bg-white/10 transition-colors"
                >
                  <h3 className="font-heading text-xl text-[var(--hf-text-primary)] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[var(--hf-text-secondary)] mb-6 flex-grow">
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[var(--hf-accent)] text-white text-sm font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
                  >
                    {card.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Band */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl text-[var(--hf-text-primary)] mb-4">
              Not sure what fits?
            </h2>
            <p className="text-[var(--hf-text-secondary)] mb-8">
              Tell us what you&apos;re hoping to do, and we&apos;ll respond with options.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
