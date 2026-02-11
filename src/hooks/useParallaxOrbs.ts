"use client";

import { useEffect, useRef } from "react";

export function useParallaxOrbs() {
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          orbRefs.current.forEach((orb, i) => {
            if (!orb) return;
            const speed = [0.02, 0.015, 0.01][i] ?? 0.01;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setOrbRef = (index: number) => (el: HTMLDivElement | null) => {
    orbRefs.current[index] = el;
  };

  return { setOrbRef };
}
