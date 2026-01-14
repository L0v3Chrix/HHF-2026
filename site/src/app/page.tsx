"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FlipDoorCard, type FlipDoorOption } from "@/components/FlipDoorCard";
import { HelpNowATXWidget } from "@/components/HelpNowATXWidget";

// Door A: "I Need Support" options - from spec copy
const supportOptions: FlipDoorOption[] = [
  {
    title: "Recovery Living Scholarships",
    description: "Explore support for verified recovery homes.",
    href: "/scholarships",
  },
  {
    title: "Check Eligibility",
    description: "A quick, private check—no pressure.",
    href: "/scholarships/eligibility",
  },
  {
    title: "Harm Reduction Resources",
    description: "Practical tools for safer choices and support.",
    href: "/resources",
  },
  {
    title: "Events & Education",
    description: "Community learning, connection, and hope.",
    href: "/events",
  },
  {
    title: "Share / Host an Event",
    description: "Bring education and connection to your community.",
    href: "/events",
  },
  {
    title: "Help Now ATX",
    description: "Need something outside our scope? Help Now ATX can connect you.",
    href: process.env.NEXT_PUBLIC_HELPNOWATX_URL || "https://helpnowatx.org",
    isExternal: true,
  },
];

// Door B: "Get Involved" options - from spec copy
const giveOptions: FlipDoorOption[] = [
  {
    title: "Donate",
    description: "Help fund recovery living scholarships and education.",
    href: "/get-involved/donate",
  },
  {
    title: "Volunteer",
    description: "Offer time, skills, or presence—at your pace.",
    href: "/get-involved/volunteer",
  },
  {
    title: "Partner / Sponsor",
    description: "Build sustained support with community partners.",
    href: "/get-involved/partner",
  },
  {
    title: "Share / Host an Event",
    description: "Bring education and connection to your community.",
    href: "/events",
  },
  {
    title: "Become a Verified Recovery Home",
    description: "Apply for verification so scholarship-funded residents can find your home.",
    href: "/homes/apply",
  },
  {
    title: "Help Now ATX",
    description: "Know someone who needs immediate, compassionate support?",
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
        {/* Cinematic Bokeh Background - purple/ruby theme */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Dark base - cool purple-black */}
          <div className="absolute inset-0 bg-[#15131a]" />

          {/* Strong vignette overlay - darker at edges */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,rgba(15,13,20,0.4)_50%,rgba(10,8,15,0.85)_100%)]" />

          {/* Primary plum/magenta bokeh - bottom left (large) */}
          <div className="absolute bottom-[-20%] left-[-5%] w-[700px] h-[700px] rounded-full bg-[#6B3A68]/45 blur-[150px]" />
          <div className="absolute bottom-[-10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#8B4A88]/35 blur-[120px]" />

          {/* Secondary ruby/red bokeh - bottom center-right */}
          <div className="absolute bottom-[5%] right-[15%] w-[400px] h-[400px] rounded-full bg-[#8B2D3A]/40 blur-[100px]" />
          <div className="absolute bottom-[10%] right-[25%] w-[300px] h-[300px] rounded-full bg-[#A33545]/30 blur-[80px]" />

          {/* Subtle plum glow bottom center */}
          <div className="absolute bottom-[-5%] left-[30%] w-[450px] h-[450px] rounded-full bg-[#5C3158]/25 blur-[120px]" />

          {/* Center haze behind cards - subtle purple lift */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#201a25]/60 blur-[80px]" />

          {/* Subtle noise texture overlay for film grain feel */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
          {/* Hero Text - matching spec copy */}
          <div className="text-center mb-8 sm:mb-10 animate-fade-in">
            <h1 className="font-heading text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] text-[var(--hf-cream)] italic leading-[1.15] mb-4 max-w-4xl mx-auto tracking-[-0.01em]">
              You&apos;re not alone. And you deserve support that feels safe.
            </h1>
            <p className="text-base sm:text-lg text-[var(--hf-text-secondary)] max-w-2xl mx-auto leading-relaxed mb-2">
              We offer recovery living scholarships for people in early recovery, harm reduction resources, and community education—grounded in dignity, choice, and care.
            </p>
            <p className="text-sm text-[var(--hf-text-muted)] max-w-xl mx-auto">
              Take your time. Choose the door that fits your moment.
            </p>
          </div>

          {/* Flip Door Cards - from spec copy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto animate-slide-up">
            <FlipDoorCard
              variant="support"
              title="I Need Support"
              description="Find scholarship support, harm reduction resources, and caring next steps—without judgment."
              buttonText="See Options"
              options={supportOptions}
            />
            <FlipDoorCard
              variant="give"
              title="Get Involved"
              description="Support recovery-centered living and harm reduction—through giving, volunteering, or partnering."
              buttonText="Choose How"
              options={giveOptions}
            />
          </div>
        </div>
      </main>

      {/* What We Do Section - from spec copy */}
      <section
        id="what-we-do"
        className="py-20 sm:py-28 bg-[var(--hf-bg-elevated)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-[var(--hf-text-primary)] mb-4">
              What We Do
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Recovery Living Scholarships",
                description:
                  "Scholarships that support placement in verified recovery homes—so people can focus on healing and stability.",
              },
              {
                title: "Harm Reduction Resources",
                description:
                  "Tools, education, and referrals that honor autonomy and reduce risk—without shame.",
              },
              {
                title: "Community Events",
                description:
                  "Workshops and gatherings that grow skills, compassion, and connection.",
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

      {/* Impact Snapshot Section - from spec copy */}
      <section className="py-20 sm:py-28 bg-[var(--hf-bg-base)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-[var(--hf-text-primary)] mb-4">
              Small moments of support can change a whole week.
            </h2>
            <p className="text-[var(--hf-text-secondary)] max-w-2xl mx-auto">
              We measure impact through placements, follow-through, and community connection—always centering human dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {[
              { stat: "—", label: "Scholarships supported" },
              { stat: "—", label: "Education/events hosted" },
              { stat: "—", label: "Resource connections made" },
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

          <div className="text-center">
            <a
              href="/impact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 hover:border-[var(--hf-accent)] transition-colors"
            >
              See Our Impact
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Verified Homes Trust Module - from spec copy */}
      <section className="py-20 sm:py-28 bg-[var(--hf-bg-elevated)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-[var(--hf-text-primary)] mb-4">
            Verified homes. Clear expectations. Real support.
          </h2>
          <p className="text-[var(--hf-text-secondary)] max-w-2xl mx-auto mb-8">
            We work with recovery homes that meet our verification criteria, so support is aligned with safety, dignity, and accountability.
          </p>
          <a
            href="/verified-homes"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--hf-accent)] text-white font-medium hover:bg-[var(--hf-accent-hover)] transition-colors"
          >
            How Verification Works
          </a>
        </div>
      </section>

      {/* Bottom Reassurance - from spec copy */}
      <section className="py-16 sm:py-20 bg-[var(--hf-bg-base)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[var(--hf-text-secondary)] mb-6">
            If you&apos;re not sure where to start, that&apos;s okay. Start with eligibility or send us a note—we&apos;ll respond with care.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)] font-medium hover:bg-white/5 transition-colors"
          >
            Contact Our Team
          </a>
        </div>
      </section>

      <SiteFooter />

      {/* Help Now ATX Floating Widget */}
      <HelpNowATXWidget />
    </div>
  );
}
