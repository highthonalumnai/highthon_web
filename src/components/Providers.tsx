"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * reducedMotion="user" lets Motion disable transform/layout animations for
 * users who prefer reduced motion — handled internally, so server and client
 * render identical markup (no hydration mismatch).
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
