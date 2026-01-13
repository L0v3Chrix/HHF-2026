"use client";

import Link from "next/link";

/**
 * Help Now ATX Floating Chat Widget
 * Positioned bottom-right, matching the mock design
 * Responsive: smaller on mobile, doesn't overlap key CTAs
 */
export function HelpNowATXWidget() {
  return (
    <Link
      href={process.env.NEXT_PUBLIC_HELPNOWATX_URL || "https://helpnowatx.org"}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-[#2d3748]/95 backdrop-blur-sm border border-white/10 shadow-xl hover:bg-[#3d4758] transition-all group"
      aria-label="Get help from Help Now ATX"
    >
      {/* Icon - wave/chat style matching Help Now ATX branding */}
      <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#4A90A4] flex items-center justify-center">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Stylized waves */}
          <path d="M2 10c2-2.5 5-4 10-4s8 1.5 10 4" />
          <path d="M2 14c2-2.5 5-4 10-4s8 1.5 10 4" />
          <path d="M2 18c2-2.5 5-4 10-4s8 1.5 10 4" />
        </svg>
      </div>

      {/* Text - hidden on very small screens */}
      <div className="hidden xs:block sm:block">
        <div className="text-xs sm:text-sm font-semibold text-white leading-tight">Help Now ATX</div>
        <div className="text-[10px] sm:text-xs text-white/70 leading-tight">
          Need quick, safe support?
          <br className="hidden sm:block" />
          <span className="sm:block"> Chat with us.</span>
        </div>
      </div>
    </Link>
  );
}

export default HelpNowATXWidget;
