"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FlipDoorCard, type FlipDoorOption } from "@/components/FlipDoorCard";
import { HelpNowATXWidget } from "@/components/HelpNowATXWidget";

// Door A: "I Need Support" options
const supportOptions: FlipDoorOption[] = [
  {
    title: "Recovery Living Scholarships",
    description: "Apply for housing support on your recovery journey",
    href: "/scholarships",
  },
  {
    title: "Check Your Eligibility",
    description: "See if you qualify for our scholarship program",
    href: "/scholarships/eligibility",
  },
  {
    title: "Harm Reduction Resources",
    description: "Tools and information for safer choices",
    href: "/resources",
  },
  {
    title: "Events & Education",
    description: "Workshops, support groups, and community gatherings",
    href: "/events",
  },
  {
    title: "Help Now ATX",
    description: "Immediate support outside Heart Forward's scope",
    href: process.env.NEXT_PUBLIC_HELPNOWATX_URL || "https://helpnowatx.org",
    isExternal: true,
  },
];

// Door B: "I Want to Give" options (matching mock exactly)
const giveOptions: FlipDoorOption[] = [
  {
    title: "Make a Donation",
    description: "Fund scholarships and support services",
    href: "/get-involved/donate",
  },
  {
    title: "Volunteer With Us",
    description: "Share your time and talents",
    href: "/get-involved/volunteer",
  },
  {
    title: "Partner or Sponsor",
    description: "Collaborate as an organization",
    href: "/get-involved/partner",
  },
  {
    title: "Host or Share an Event",
    description: "Spread awareness in your community",
    href: "/events",
  },
  {
    title: "Help Now ATX",
    description: "Support our crisis response partner",
    href: process.env.NEXT_PUBLIC_HELPNOWATX_URL || "https://helpnowatx.org",
    isExternal: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--hf-bg-base)]">
      <SiteHeader />

      {/* Hero Section with Cinematic Bokeh Background */}
      <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Cinematic Bokeh Background - matching mock exactly */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Dark base */}
          <div className="absolute inset-0 bg-[#1a1a1a]" />

          {/* Strong vignette overlay - darker at edges */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,rgba(10,10,10,0.4)_50%,rgba(5,5,5,0.85)_100%)]" />

          {/* Primary warm bokeh - bottom left (large, orange/amber) */}
          <div className="absolute bottom-[-20%] left-[-5%] w-[700px] h-[700px] rounded-full bg-[#D4763A]/50 blur-[150px]" />
          <div className="absolute bottom-[-10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#E8924A]/40 blur-[120px]" />

          {/* Secondary warm bokeh - bottom center-left */}
          <div className="absolute bottom-[5%] left-[20%] w-[350px] h-[350px] rounded-full bg-[#C4623A]/35 blur-[100px]" />
          <div className="absolute bottom-[15%] left-[30%] w-[250px] h-[250px] rounded-full bg-[#B8860B]/25 blur-[80px]" />

          {/* Subtle warm glow bottom right */}
          <div className="absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#8B4513]/20 blur-[120px]" />

          {/* Center haze behind cards - subtle lift */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#2a2020]/60 blur-[80px]" />

          {/* Subtle noise texture overlay for film grain feel */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20">
          {/* Hero Text - matching mock: elegant serif italic */}
          <div className="text-center mb-10 sm:mb-14 animate-fade-in">
            <h1 className="font-heading text-[2.25rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] text-[var(--hf-cream)] italic leading-[1.15] mb-5 max-w-4xl mx-auto tracking-[-0.01em]">
              You&apos;re not alone. And you can help someone feel safe again.
            </h1>
            <p className="text-base sm:text-lg text-[var(--hf-text-secondary)] max-w-xl mx-auto leading-relaxed">
              This is a space of comfort and hope. Take your time.
            </p>
          </div>

          {/* Flip Door Cards - wider gap, better proportion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto animate-slide-up">
            <FlipDoorCard
              variant="support"
              title="I Need Support"
              description="Find compassionate resources, safety, and someone to talk to."
              buttonText="Find Help Now"
              options={supportOptions}
            />
            <FlipDoorCard
              variant="give"
              title="I Want to Give"
              description="Empower our community by donating, volunteering, or partnering."
              buttonText="Give Hope"
              options={giveOptions}
            />
          </div>
        </div>
      </main>

      {/* What We Do Section */}
      <section
        id="what-we-do"
        className="py-20 sm:py-28 bg-[var(--hf-bg-elevated)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-[var(--hf-text-primary)] mb-4">
              What We Do
            </h2>
            <p className="text-[var(--hf-text-secondary)] max-w-2xl mx-auto">
              Heart Forward Foundation supports recovery through housing
              scholarships, harm reduction resources, and community education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Recovery Living Scholarships",
                description:
                  "Financial assistance for safe, supportive housing during recovery.",
              },
              {
                title: "Harm Reduction Resources",
                description:
                  "Tools and information to help people make safer choices.",
              },
              {
                title: "Community Education",
                description:
                  "Workshops and events that reduce stigma and build understanding.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-colors"
              >
                <h3 className="font-heading text-xl text-[var(--hf-text-primary)] mb-3">
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

      {/* Trust/Impact Section */}
      <section className="py-20 sm:py-28 bg-[var(--hf-bg-base)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-[var(--hf-text-primary)] mb-4">
              Our Impact
            </h2>
            <p className="text-[var(--hf-text-secondary)] max-w-2xl mx-auto">
              Together, we&apos;re building a community where everyone has
              access to recovery support.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { stat: "500+", label: "Scholarships Funded" },
              { stat: "85%", label: "Housing Retention Rate" },
              { stat: "2,000+", label: "Resources Shared" },
              { stat: "50+", label: "Community Events" },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center p-6 rounded-2xl bg-[var(--hf-glass)] border border-[var(--hf-glass-border)]"
              >
                <div className="font-heading text-3xl sm:text-4xl text-[var(--hf-text-primary)] mb-2">
                  {item.stat}
                </div>
                <div className="text-sm text-[var(--hf-text-secondary)]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* Help Now ATX Floating Widget */}
      <HelpNowATXWidget />
    </div>
  );
}
