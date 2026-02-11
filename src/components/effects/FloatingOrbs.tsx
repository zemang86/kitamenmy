"use client";

import { useEffect, useState } from "react";

export default function FloatingOrbs() {
  // Disable parallax scroll — pure CSS animation is enough and much cheaper
  const [visible, setVisible] = useState(true);

  // Pause animations when tab is hidden
  useEffect(() => {
    function onVisibilityChange() {
      setVisible(!document.hidden);
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ animationPlayState: visible ? "running" : "paused" }}
    >
      <div
        className="fixed rounded-full blur-[40px] opacity-15 pointer-events-none -z-1 w-[600px] h-[600px] bg-accent-primary -top-[200px] -right-[200px] animate-orb-float-1"
        style={{ contain: "layout style paint", willChange: "transform", animationPlayState: visible ? "running" : "paused" }}
      />
      <div
        className="fixed rounded-full blur-[40px] opacity-15 pointer-events-none -z-1 w-[500px] h-[500px] bg-accent-secondary -bottom-[150px] -left-[150px] animate-orb-float-2"
        style={{ contain: "layout style paint", willChange: "transform", animationPlayState: visible ? "running" : "paused" }}
      />
      <div
        className="fixed rounded-full blur-[40px] opacity-15 pointer-events-none -z-1 w-[400px] h-[400px] bg-accent-tertiary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orb-float-3"
        style={{ contain: "layout style paint", willChange: "transform", animationPlayState: visible ? "running" : "paused" }}
      />
    </div>
  );
}
