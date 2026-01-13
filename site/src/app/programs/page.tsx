import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Our Programs | Heart Forward",
  description:
    "Choose what fits your needs today—support, learning, or a way to give. Recovery living scholarships, harm reduction resources, and community events.",
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--hf-text-primary)] mb-6 leading-tight">
              Programs designed for real life.
            </h1>
            <p className="text-lg text-[var(--hf-text-secondary)] max-w-2xl mx-auto">
              Choose what fits your needs today—support, learning, or a way to give.
            </p>
          </div>
        </section>

        {/* Program Cards */}
        <section className="py-16 sm:py-20 bg-[var(--hf-bg-elevated)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Recovery Living Scholarships",
                  description: "Support for verified recovery homes.",
                  href: "/programs/scholarships",
                  cta: "Explore Scholarships",
                },
                {
                  title: "Harm Reduction Resources",
                  description: "Tools for safer choices and care.",
                  href: "/programs/harm-reduction",
                  cta: "Browse Resources",
                },
                {
                  title: "Events & Education",
                  description: "Workshops and community gatherings.",
                  href: "/programs/events",
                  cta: "View Events",
                },
              ].map((program) => (
                <div
                  key={program.title}
                  className="glass rounded-2xl p-8 flex flex-col hover:bg-white/10 transition-colors"
                >
                  <h3 className="font-heading text-xl text-[var(--hf-text-primary)] mb-3">
                    {program.title}
                  </h3>
                  <p className="text-sm text-[var(--hf-text-secondary)] mb-6 flex-grow">
                    {program.description}
                  </p>
                  <Link
                    href={program.href}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[var(--hf-accent)] text-white text-sm font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
                  >
                    {program.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
