import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "FAQ | Heart Forward",
  description:
    "Clear answers, no judgment. If your question isn't here, contact us.",
};

const faqs = [
  {
    question: "Who are the scholarships for?",
    answer:
      "We support people in early recovery seeking stable recovery living. Eligibility depends on fit with our criteria and verified home options.",
  },
  {
    question: 'What does "verified home" mean?',
    answer:
      "It means the recovery home meets our verification criteria for safety, accountability, and alignment with our support model.",
  },
  {
    question: "Do I have to share personal details?",
    answer:
      "Only what's needed. Share what you feel comfortable sharing.",
  },
  {
    question: "What if Heart Forward isn't a fit for my needs?",
    answer:
      "We'll offer resources and connection options. Help Now ATX is available for broader support navigation.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Frequently asked questions
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              Clear answers, no judgment. If your question isn&apos;t here, contact us.
            </p>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl p-6"
                >
                  <h3 className="font-heading text-lg text-[var(--hf-text-primary)] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-[var(--hf-text-secondary)]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Band */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/scholarships/eligibility"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
              >
                Check Eligibility
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 transition-colors"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
