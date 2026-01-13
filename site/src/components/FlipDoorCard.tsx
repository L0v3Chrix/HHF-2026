"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight, X } from "lucide-react";

export interface FlipDoorOption {
  title: string;
  description: string;
  href: string;
  isExternal?: boolean;
}

export interface FlipDoorCardProps {
  variant: "support" | "give";
  title: string;
  description: string;
  buttonText: string;
  options: FlipDoorOption[];
  className?: string;
}

export function FlipDoorCard({
  variant,
  title,
  description,
  buttonText,
  options,
  className,
}: FlipDoorCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleFlip();
      }
      if (e.key === "Escape" && isFlipped) {
        setIsFlipped(false);
      }
    },
    [handleFlip, isFlipped]
  );

  const Icon = variant === "support" ? HeartHandsIcon : SproutHandIcon;

  // Card colors matching V2 mock exactly:
  // Support (left) = plum/purple-magenta
  // Give (right) = ruby/red
  const cardGradient =
    variant === "support"
      ? "bg-gradient-to-b from-[#5C3158] via-[#6B3A68] to-[#4A2848]"  // plum/purple-magenta
      : "bg-gradient-to-b from-[#8B2D3A] via-[#A33545] to-[#722535]"; // ruby/red

  // Stacked layer colors - slightly lighter/muted versions
  const stackedLayer1 =
    variant === "support" ? "bg-[#4A2848]/70" : "bg-[#722535]/70";
  const stackedLayer2 =
    variant === "support" ? "bg-[#5C3158]/50" : "bg-[#8B2D3A]/50";

  // Card content component
  const CardContent = ({ isBack = false }: { isBack?: boolean }) => (
    <div className="relative flex flex-col h-full">
      {!isBack ? (
        <CardFront
          Icon={Icon}
          title={title}
          description={description}
          buttonText={buttonText}
          variant={variant}
          onFlip={handleFlip}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <CardBack options={options} onClose={handleFlip} variant={variant} />
      )}
    </div>
  );

  // For reduced motion: use expand/collapse
  if (prefersReducedMotion) {
    return (
      <div className={cn("relative", className)}>
        {/* Stacked layers - offset behind main card */}
        <div
          className={cn(
            "absolute inset-0 rounded-[28px] translate-x-4 translate-y-4",
            stackedLayer2
          )}
        />
        <div
          className={cn(
            "absolute inset-0 rounded-[26px] translate-x-2 translate-y-2",
            stackedLayer1
          )}
        />

        {/* Main card */}
        <div
          className={cn(
            "relative rounded-[24px] p-8 sm:p-10 min-h-[380px]",
            cardGradient,
            "shadow-2xl shadow-black/40"
          )}
        >
          {/* Glass edge highlight - top edge shine */}
          <div className="absolute inset-x-0 top-0 h-[1px] rounded-t-[24px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          {/* Subtle border */}
          <div className="absolute inset-0 rounded-[24px] border border-white/10 pointer-events-none" />

          <div className={cn("transition-opacity duration-200", isFlipped && "hidden")}>
            <CardContent />
          </div>
          <div className={cn("transition-opacity duration-200", !isFlipped && "hidden")}>
            <CardContent isBack />
          </div>
        </div>
      </div>
    );
  }

  // Standard flip animation with stacked layers
  return (
    <div className={cn("relative", className)}>
      {/* Stacked layers - visible offset cards creating depth like mock */}
      <div
        className={cn(
          "absolute inset-0 rounded-[28px] translate-x-4 translate-y-4",
          stackedLayer2,
          "border border-white/5"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 rounded-[26px] translate-x-2 translate-y-2",
          stackedLayer1,
          "border border-white/8"
        )}
      />

      {/* Main card with flip */}
      <div
        className="relative w-full min-h-[380px] cursor-pointer"
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative w-full h-full transition-transform duration-600 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className={cn(
              "absolute inset-0 rounded-[24px] p-8 sm:p-10",
              cardGradient,
              "shadow-2xl shadow-black/40"
            )}
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Glass edge highlight - top edge shine like mock */}
            <div className="absolute inset-x-0 top-0 h-[1px] rounded-t-[24px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            {/* Subtle inner border */}
            <div className="absolute inset-0 rounded-[24px] border border-white/10 pointer-events-none" />
            <CardFront
              Icon={Icon}
              title={title}
              description={description}
              buttonText={buttonText}
              variant={variant}
              onFlip={handleFlip}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Back */}
          <div
            className={cn(
              "absolute inset-0 rounded-[24px] p-8 sm:p-10",
              cardGradient,
              "shadow-2xl shadow-black/40"
            )}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-[1px] rounded-t-[24px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="absolute inset-0 rounded-[24px] border border-white/10 pointer-events-none" />
            <CardBack options={options} onClose={handleFlip} variant={variant} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Card Front Component
function CardFront({
  Icon,
  title,
  description,
  buttonText,
  variant,
  onFlip,
  onKeyDown,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  buttonText: string;
  variant: "support" | "give";
  onFlip: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  return (
    <div className="relative flex flex-col items-center text-center h-full z-10 pt-4">
      {/* Icon - matching mock's filled style */}
      <div className="mb-5">
        <Icon className="w-14 h-14 text-[var(--hf-cream)]" />
      </div>

      {/* Title */}
      <h3 className="font-heading text-[1.7rem] sm:text-3xl text-[var(--hf-cream)] mb-3 leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[var(--hf-cream)]/75 text-[0.95rem] mb-7 max-w-[280px] leading-relaxed">
        {description}
      </p>

      {/* CTA Button - BOTH cards use cream pill button like mock */}
      <button
        onClick={onFlip}
        onKeyDown={onKeyDown}
        className={cn(
          "px-7 py-3 rounded-full font-medium text-[0.95rem] transition-all",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "transform hover:scale-[1.03] active:scale-[0.98]",
          // Cream button for BOTH variants - matching mock
          "bg-[#F5F0E8] text-[#2a1a1a] hover:bg-[#FAF8F5]",
          "shadow-[0_4px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.5)]",
          "border border-white/20"
        )}
        aria-label={`${buttonText} - tap to see options`}
      >
        {buttonText}
      </button>

      {/* Tap hint */}
      <p className="mt-auto pt-5 text-xs text-[var(--hf-cream)]/45 flex items-center gap-1.5">
        Tap to open & see options
        <span className="w-4 h-4 rounded-full border border-[var(--hf-cream)]/30 flex items-center justify-center">
          <ChevronRight className="w-2.5 h-2.5" />
        </span>
      </p>
    </div>
  );
}

// Card Back Component
function CardBack({
  options,
  onClose,
  variant,
}: {
  options: FlipDoorOption[];
  onClose: () => void;
  variant: "support" | "give";
}) {
  return (
    <div className="relative flex flex-col h-full z-10">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-0 right-0 p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Close options"
      >
        <X className="w-5 h-5 text-[var(--hf-cream)]/70" />
      </button>

      {/* Options list */}
      <nav className="flex-1 space-y-1 pt-2">
        {options.map((option, index) => {
          const isLast = index === options.length - 1;
          const isHelpNow = option.title.toLowerCase().includes("help now");

          return (
            <Link
              key={option.title}
              href={option.href}
              target={option.isExternal ? "_blank" : undefined}
              rel={option.isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "block p-3 rounded-xl transition-all",
                "hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                "min-h-[44px] flex flex-col justify-center",
                isLast && "border-t border-white/10 mt-3 pt-3"
              )}
            >
              <span
                className={cn(
                  "font-medium text-sm",
                  isHelpNow ? "text-[var(--hf-cream)]/60" : "text-[var(--hf-cream)]"
                )}
              >
                {option.title}
              </span>
              <span className="text-xs text-[var(--hf-cream)]/60 mt-0.5">
                {option.description}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

// Custom Icons matching the mockup - filled style with hands
function HeartHandsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Heart - filled */}
      <path
        d="M32 22c-3-7-12-7-12 3 0 10 12 16 12 16s12-6 12-16c0-10-9-10-12-3"
        fill="currentColor"
        stroke="none"
      />
      {/* Hands cupping from below */}
      <path
        d="M14 52c4-3 8-7 12-8M50 52c-4-3-8-7-12-8M26 44c2 2 4 3 6 3s4-1 6-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function SproutHandIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Hand cupping from below */}
      <path
        d="M18 54c5-3 9-7 14-7s9 4 14 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* Stem */}
      <path d="M32 47V32" fill="none" stroke="currentColor" strokeWidth="2.5" />
      {/* Leaves - filled */}
      <path
        d="M32 32c-5-10-14-8-14 0 0 6 10 10 14 5"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M32 32c5-10 14-8 14 0 0 6-10 10-14 5"
        fill="currentColor"
        stroke="none"
      />
      {/* Small sprout at top */}
      <circle cx="32" cy="20" r="3" fill="currentColor" />
    </svg>
  );
}

export default FlipDoorCard;
