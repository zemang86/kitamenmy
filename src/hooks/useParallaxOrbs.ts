// Parallax orbs hook — REMOVED for performance.
// The JS scroll listener was updating 3 large blurred DOM elements every frame,
// causing layout thrashing. Pure CSS animations on FloatingOrbs are sufficient.

"use client";

export function useParallaxOrbs() {
  // No-op: parallax removed, CSS animations handle orb movement
  const setOrbRef = (_index: number) => (_el: HTMLDivElement | null) => {};
  return { setOrbRef };
}
