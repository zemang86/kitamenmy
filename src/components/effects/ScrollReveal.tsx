"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useScrollReveal(threshold);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
