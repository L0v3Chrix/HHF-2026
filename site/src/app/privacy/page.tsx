import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Privacy | Heart Forward",
  description:
    "We collect only what we need to respond, provide support, and improve the site. We don't sell personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Privacy
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-3xl mx-auto">
              We collect only what we need to respond, provide support, and improve the site. We don&apos;t sell personal information.
            </p>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading text-lg text-[var(--hf-text-primary)] mb-3">
                  What we collect
                </h2>
                <p className="text-[var(--hf-text-secondary)]">
                  Information you share through forms (name, email, phone) and basic site analytics to understand how people use the site.
                </p>
              </div>

              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading text-lg text-[var(--hf-text-primary)] mb-3">
                  How we use it
                </h2>
                <p className="text-[var(--hf-text-secondary)]">
                  To respond to your inquiries, provide scholarship support, and improve our services.
                </p>
              </div>

              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading text-lg text-[var(--hf-text-primary)] mb-3">
                  How we protect it
                </h2>
                <p className="text-[var(--hf-text-secondary)]">
                  We use secure connections and trusted service providers. We don&apos;t share your information with anyone except as needed to provide services.
                </p>
              </div>

              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading text-lg text-[var(--hf-text-primary)] mb-3">
                  Third parties
                </h2>
                <p className="text-[var(--hf-text-secondary)]">
                  We use Stripe for donations and Google Analytics to understand site usage. These services have their own privacy policies.
                </p>
              </div>

              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading text-lg text-[var(--hf-text-primary)] mb-3">
                  Questions?
                </h2>
                <p className="text-[var(--hf-text-secondary)]">
                  If you have questions about your information or want something removed, contact us.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/terms"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
