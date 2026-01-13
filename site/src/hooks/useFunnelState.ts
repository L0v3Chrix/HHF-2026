"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * useFunnelState - Manages multi-step funnel state with localStorage persistence
 *
 * Features:
 * - Auto-saves to localStorage on every change
 * - Restores state on page load/refresh
 * - Tracks which steps have been completed
 * - Provides dirty state indicator
 * - Handles SSR gracefully
 */

export interface FunnelMeta {
  currentStep: number;
  completedSteps: number[];
  lastUpdated: string;
  started: string;
}

export interface FunnelStateReturn<T> {
  data: T;
  meta: FunnelMeta;
  setData: (update: Partial<T> | ((prev: T) => Partial<T>)) => void;
  setStepData: <K extends keyof T>(step: K, value: T[K]) => void;
  markStepComplete: (step: number) => void;
  goToStep: (step: number) => void;
  clearData: () => void;
  isDirty: boolean;
  isLoaded: boolean;
  hasStarted: boolean;
}

const STORAGE_PREFIX = "hff_funnel_";

function getStorageKey(funnelKey: string): string {
  return `${STORAGE_PREFIX}${funnelKey}`;
}

function safeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    // Test localStorage availability
    const testKey = "__test__";
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return window.localStorage;
  } catch {
    return null;
  }
}

export function useFunnelState<T extends object>(
  funnelKey: string,
  initialState: T,
  options: {
    totalSteps?: number;
    onComplete?: (data: T) => void;
  } = {}
): FunnelStateReturn<T> {
  const { totalSteps = 5 } = options;

  // Initial meta state
  const initialMeta: FunnelMeta = {
    currentStep: 1,
    completedSteps: [],
    lastUpdated: new Date().toISOString(),
    started: new Date().toISOString(),
  };

  const [data, setDataState] = useState<T>(initialState);
  const [meta, setMeta] = useState<FunnelMeta>(initialMeta);
  const [isDirty, setIsDirty] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const initialLoadRef = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (initialLoadRef.current) return;
    initialLoadRef.current = true;

    const storage = safeLocalStorage();
    if (!storage) {
      setIsLoaded(true);
      return;
    }

    try {
      const stored = storage.getItem(getStorageKey(funnelKey));
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.data) {
          setDataState({ ...initialState, ...parsed.data });
        }
        if (parsed.meta) {
          setMeta({ ...initialMeta, ...parsed.meta });
        }
      }
    } catch (error) {
      console.warn(`Failed to load funnel state for ${funnelKey}:`, error);
    }

    setIsLoaded(true);
  }, [funnelKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Save to localStorage whenever data or meta changes (after initial load)
  useEffect(() => {
    if (!isLoaded) return;

    const storage = safeLocalStorage();
    if (!storage) return;

    try {
      storage.setItem(
        getStorageKey(funnelKey),
        JSON.stringify({
          data,
          meta: {
            ...meta,
            lastUpdated: new Date().toISOString(),
          },
        })
      );
      setIsDirty(true);
    } catch (error) {
      console.warn(`Failed to save funnel state for ${funnelKey}:`, error);
    }
  }, [data, meta, funnelKey, isLoaded]);

  // Update data (merge with existing)
  const setData = useCallback(
    (update: Partial<T> | ((prev: T) => Partial<T>)) => {
      setDataState((prev) => {
        const newData = typeof update === "function" ? update(prev) : update;
        return { ...prev, ...newData };
      });
    },
    []
  );

  // Update a specific step's data
  const setStepData = useCallback(<K extends keyof T>(step: K, value: T[K]) => {
    setDataState((prev) => ({
      ...prev,
      [step]: value,
    }));
  }, []);

  // Mark a step as complete
  const markStepComplete = useCallback((step: number) => {
    setMeta((prev) => ({
      ...prev,
      completedSteps: prev.completedSteps.includes(step)
        ? prev.completedSteps
        : [...prev.completedSteps, step].sort((a, b) => a - b),
    }));
  }, []);

  // Navigate to a specific step
  const goToStep = useCallback((step: number) => {
    setMeta((prev) => ({
      ...prev,
      currentStep: Math.max(1, Math.min(step, totalSteps)),
    }));
  }, [totalSteps]);

  // Clear all data for this funnel
  const clearData = useCallback(() => {
    const storage = safeLocalStorage();
    if (storage) {
      try {
        storage.removeItem(getStorageKey(funnelKey));
      } catch (error) {
        console.warn(`Failed to clear funnel state for ${funnelKey}:`, error);
      }
    }
    setDataState(initialState);
    setMeta(initialMeta);
    setIsDirty(false);
  }, [funnelKey, initialState]); // eslint-disable-line react-hooks/exhaustive-deps

  // Check if funnel has been started (has any data beyond initial)
  const hasStarted =
    isLoaded && JSON.stringify(data) !== JSON.stringify(initialState);

  return {
    data,
    meta,
    setData,
    setStepData,
    markStepComplete,
    goToStep,
    clearData,
    isDirty,
    isLoaded,
    hasStarted,
  };
}

/**
 * Utility: Get all funnel data from localStorage (for review pages)
 */
export function getFunnelData<T>(funnelKey: string): { data: T; meta: FunnelMeta } | null {
  const storage = safeLocalStorage();
  if (!storage) return null;

  try {
    const stored = storage.getItem(getStorageKey(funnelKey));
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn(`Failed to get funnel data for ${funnelKey}:`, error);
  }

  return null;
}

/**
 * Utility: Check if a funnel has saved progress
 */
export function hasFunnelProgress(funnelKey: string): boolean {
  const storage = safeLocalStorage();
  if (!storage) return false;

  try {
    return storage.getItem(getStorageKey(funnelKey)) !== null;
  } catch {
    return false;
  }
}

export default useFunnelState;
