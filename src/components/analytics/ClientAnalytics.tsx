"use client";

import dynamic from "next/dynamic";
import type { PropsWithChildren } from "react";

const AnalyticsProvider = dynamic(
  () => import("./AnalyticsProvider"),
  { ssr: false }
);

export function ClientAnalytics({ children }: PropsWithChildren) {
  return <AnalyticsProvider>{children}</AnalyticsProvider>;
}
