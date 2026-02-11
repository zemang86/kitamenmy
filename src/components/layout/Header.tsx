"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Ventures", href: "#ventures" },
  { label: "Projects", href: "#portfolio" },
  { label: "About Me", href: "#about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 968) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      setMobileOpen(false);
      const target = document.querySelector(href);
      if (target) {
        const top =
          target.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1200px] z-[1000] backdrop-blur-[30px] border border-glass-border rounded-full p-2 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(10,10,15,0.92)] border-glass-border-hover shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-[rgba(10,10,15,0.7)]"
        }`}
        role="banner"
      >
        <div className="flex items-center justify-between px-6 py-2">
          <a
            href="#hero"
            onClick={(e) => handleClick(e, "#hero")}
            className="text-xl font-bold text-text-primary no-underline flex items-center gap-2 tracking-tight"
            aria-label="Hazman Hassan — scroll to top"
          >
            <span
              className="w-2.5 h-2.5 bg-accent-primary rounded-full animate-pulse-glow shadow-[0_0_10px_var(--color-accent-primary)]"
              aria-hidden="true"
            />
            Hazman.
          </a>

          <nav className="hidden min-[968px]:flex gap-2" aria-label="Main navigation">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleClick(e, href)}
                className="text-text-secondary text-sm font-medium px-4 py-2 rounded-lg no-underline transition-all duration-300 hover:text-text-primary hover:bg-glass-bg"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="mailto:hazman@kitamen.my"
              className="bg-gradient-to-br from-accent-primary to-accent-secondary text-bg-primary px-6 py-2.5 rounded-lg no-underline font-semibold text-sm transition-all duration-300 inline-flex items-center gap-2 shadow-[0_4px_20px_rgba(0,255,136,0.15)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,255,136,0.25)] max-[968px]:px-4 max-[968px]:py-2 max-[968px]:text-xs"
            >
              Let&apos;s Talk
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="min-[968px]:hidden flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary transition-colors duration-300 hover:text-text-primary hover:bg-glass-bg"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[999] bg-[rgba(5,5,8,0.6)] backdrop-blur-sm min-[968px]:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Nav Panel */}
      <nav
        className={`fixed top-[80px] left-4 right-4 z-[1001] bg-[rgba(10,10,15,0.95)] backdrop-blur-[30px] border border-glass-border rounded-2xl p-6 min-[968px]:hidden transition-all duration-300 origin-top ${
          mobileOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col gap-2">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleClick(e, href)}
              className="text-text-secondary text-base font-medium px-4 py-3 rounded-lg no-underline transition-all duration-300 hover:text-text-primary hover:bg-glass-bg"
            >
              {label}
            </a>
          ))}
          <div className="border-t border-glass-border mt-2 pt-4">
            <a
              href="mailto:hazman@kitamen.my"
              className="block text-center bg-gradient-to-br from-accent-primary to-accent-secondary text-bg-primary px-6 py-3 rounded-lg no-underline font-semibold text-sm shadow-[0_4px_20px_rgba(0,255,136,0.15)]"
              onClick={() => setMobileOpen(false)}
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
