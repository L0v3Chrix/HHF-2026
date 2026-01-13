"use client";

import { createContext, useContext, ReactNode } from "react";
import { useFunnelState, FunnelStateReturn } from "@/hooks/useFunnelState";
import {
  HomesFunnelData,
  initialHomesFunnelData,
  HOMES_FUNNEL_KEY,
} from "@/types/homes-funnel";

// Create context with proper typing
const HomesFunnelContext = createContext<FunnelStateReturn<HomesFunnelData> | null>(null);

// Provider component
export function HomesFunnelProvider({ children }: { children: ReactNode }) {
  const funnelState = useFunnelState<HomesFunnelData>(
    HOMES_FUNNEL_KEY,
    initialHomesFunnelData,
    { totalSteps: 5 }
  );

  return (
    <HomesFunnelContext.Provider value={funnelState}>
      {children}
    </HomesFunnelContext.Provider>
  );
}

// Hook to access funnel state
export function useHomesFunnel() {
  const context = useContext(HomesFunnelContext);
  if (!context) {
    throw new Error("useHomesFunnel must be used within HomesFunnelProvider");
  }
  return context;
}

export default HomesFunnelProvider;
