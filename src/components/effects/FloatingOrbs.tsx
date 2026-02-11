"use client";

import { useParallaxOrbs } from "@/hooks/useParallaxOrbs";

export default function FloatingOrbs() {
  const { setOrbRef } = useParallaxOrbs();

  return (
    <div aria-hidden="true">
      <div
        ref={setOrbRef(0)}
        className="fixed rounded-full blur-[80px] opacity-15 pointer-events-none -z-1 w-[600px] h-[600px] bg-accent-primary -top-[200px] -right-[200px] animate-orb-float-1"
        style={{ contain: "layout style paint" }}
      />
      <div
        ref={setOrbRef(1)}
        className="fixed rounded-full blur-[80px] opacity-15 pointer-events-none -z-1 w-[500px] h-[500px] bg-accent-secondary -bottom-[150px] -left-[150px] animate-orb-float-2"
        style={{ contain: "layout style paint" }}
      />
      <div
        ref={setOrbRef(2)}
        className="fixed rounded-full blur-[80px] opacity-15 pointer-events-none -z-1 w-[400px] h-[400px] bg-accent-tertiary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orb-float-3"
        style={{ contain: "layout style paint" }}
      />
    </div>
  );
}
