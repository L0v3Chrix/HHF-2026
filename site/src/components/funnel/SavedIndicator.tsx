"use client";

import { useState, useEffect } from "react";

interface SavedIndicatorProps {
  isDirty: boolean;
  className?: string;
}

/**
 * SavedIndicator - Shows "Saved" status with a brief animation
 *
 * Shows "Saved" with checkmark when isDirty transitions to true,
 * then fades out after a delay.
 */
export function SavedIndicator({ isDirty, className = "" }: SavedIndicatorProps) {
  const [showSaved, setShowSaved] = useState(false);
  const [prevDirty, setPrevDirty] = useState(isDirty);

  useEffect(() => {
    // When isDirty changes from false to true, show the indicator
    if (isDirty && !prevDirty) {
      setShowSaved(true);
      // Hide after 2 seconds
      const timer = setTimeout(() => {
        setShowSaved(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
    setPrevDirty(isDirty);
  }, [isDirty, prevDirty]);

  if (!showSaved) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 text-sm text-[var(--hf-accent)] animate-fade-in ${className}`}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span>Saved</span>
    </div>
  );
}

/**
 * DraftIndicator - Shows when there's saved progress that can be resumed
 */
export function DraftIndicator({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 text-xs text-[var(--hf-text-muted)] ${className}`}
    >
      <svg
        className="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <span>Draft saved</span>
    </div>
  );
}

export default SavedIndicator;
