"use client";

import { HomesFunnelProvider } from "@/components/funnel/HomesFunnelProvider";

export default function HomesApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HomesFunnelProvider>{children}</HomesFunnelProvider>;
}
