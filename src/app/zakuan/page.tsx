"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Building2,
  Paintbrush,
  MapPin,
  Box,
  Hammer,
  MessageSquare,
  Phone,
  Mail,
  MapPinned,
  ChevronRight,
} from "lucide-react";

/* ─── Data ─── */

const navLinks = ["Home", "Projects", "Services", "About", "Contact"];

const projects = [
  {
    number: "01",
    title: "SKYLINE RESIDENCE",
    location: "KL",
    size: "8,500 sqft",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    description:
      "A bold vertical living concept that redefines the Kuala Lumpur skyline. Floor-to-ceiling glazing maximises panoramic city views while passive solar design keeps energy costs minimal.",
  },
  {
    number: "02",
    title: "URBAN NEXUS",
    location: "PJ",
    size: "125,000 sqft",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    description:
      "A mixed-use development bridging commercial and community space in the heart of Petaling Jaya. Biophilic corridors and open-air atriums create a seamless indoor-outdoor experience.",
    reversed: true,
  },
  {
    number: "03",
    title: "HORIZON VILLA",
    location: "Damansara",
    size: "12,000 sqft",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    description:
      "A sprawling hillside retreat that merges tropical modernism with sustainable luxury. Cantilevered volumes frame lush garden courtyards and infinity-edge water features.",
  },
];

const services = [
  {
    icon: Building2,
    title: "Architecture",
    description:
      "End-to-end architectural design from concept sketches through construction documentation and site supervision.",
  },
  {
    icon: Paintbrush,
    title: "Interior Design",
    description:
      "Bespoke interior environments that balance aesthetics with functionality, material honesty, and spatial flow.",
  },
  {
    icon: MapPin,
    title: "Urban Planning",
    description:
      "Master planning and urban design strategies that foster walkability, mixed-use vitality, and community identity.",
  },
  {
    icon: Box,
    title: "3D Visualization",
    description:
      "Photorealistic renders, walkthroughs, and virtual-reality presentations to bring unbuilt projects to life.",
  },
  {
    icon: Hammer,
    title: "Renovation",
    description:
      "Adaptive reuse and renovation services that honour existing structures while introducing contemporary design language.",
  },
  {
    icon: MessageSquare,
    title: "Consulting",
    description:
      "Expert advisory on feasibility studies, regulatory compliance, green building certification, and project management.",
  },
];

const stats = [
  { value: 77, suffix: "+", label: "Projects Completed" },
  { value: 15, suffix: "+", label: "Design Awards" },
  { value: 5, suffix: "+", label: "Years Experience" },
];

const timeline = [
  {
    year: "2019",
    title: "Foundation",
    description:
      "Zakuan Architect established with a vision for innovative Malaysian architecture rooted in tropical modernism.",
  },
  {
    year: "2021",
    title: "Recognition",
    description:
      "First PAM award nomination. Studio expanded to a full-service team covering architecture, interiors, and visualization.",
  },
  {
    year: "2023",
    title: "Innovation",
    description:
      "Pioneered parametric facade systems and integrated BIM workflows across all projects. Urban Nexus completed.",
  },
  {
    year: "2025",
    title: "Future Forward",
    description:
      "Expanding into sustainable township planning and AI-assisted generative design for next-generation Malaysian living.",
  },
];

/* ─── Accent ─── */
const accent = "#ff3b00";

/* ─── Hooks ─── */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("z-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const children = el.querySelectorAll(".z-scroll-reveal");
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}

function useCounterAnimation(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              setCount(Math.floor(progress * target));
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ─── Sub-components ─── */

function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCounterAnimation(value);
  return (
    <div ref={ref} className="text-center">
      <span
        className="text-5xl md:text-6xl font-[family-name:var(--font-bebas-neue)] tracking-tight"
        style={{ color: accent }}
      >
        {count}
        {suffix}
      </span>
      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[#888]">
        {label}
      </p>
    </div>
  );
}

/* ─── Page ─── */

export default function ZakuanPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const revealRef = useScrollReveal();

  /* scroll shadow on nav */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* lock body when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = useCallback(
    (id: string) => {
      setMenuOpen(false);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  return (
    <div
      ref={revealRef}
      className="min-h-screen bg-[#050505] text-white font-[family-name:var(--font-inter)] leading-relaxed overflow-x-hidden"
    >
      {/* ── Global scroll-reveal styles ── */}
      <style>{`
        .z-scroll-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .z-scroll-reveal.z-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .z-scroll-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      {/* ────────────────────── NAVIGATION ────────────────────── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050505]/90 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 md:px-10 h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-baseline gap-0 cursor-pointer bg-transparent border-none"
          >
            <span
              className="text-2xl font-[family-name:var(--font-bebas-neue)] tracking-[0.15em]"
              style={{ color: accent }}
            >
              ZAKUAN
            </span>
            <sup className="text-[10px] text-[#888] ml-0.5 -translate-y-2">
              (R)
            </sup>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="text-xs uppercase tracking-[0.2em] text-[#888] hover:text-white transition-colors bg-transparent border-none cursor-pointer font-[family-name:var(--font-space-grotesk)]"
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden text-white bg-transparent border-none cursor-pointer p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile overlay */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 top-20 bg-[#050505]/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="text-2xl font-[family-name:var(--font-bebas-neue)] tracking-[0.2em] text-white hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer"
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ────────────────────── HERO ────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Perspective grid background */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              perspective: "600px",
              perspectiveOrigin: "50% 40%",
            }}
          >
            <div
              className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
              style={{
                transform: "rotateX(55deg)",
                backgroundImage: `
                  linear-gradient(${accent}18 1px, transparent 1px),
                  linear-gradient(90deg, ${accent}18 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
          </div>
          {/* Radial fade */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_75%)]" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="z-scroll-reveal inline-flex items-center gap-2 border border-[#333] rounded-full px-5 py-2 mb-10">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: accent }}
            />
            <span className="text-xs uppercase tracking-[0.25em] text-[#888] font-[family-name:var(--font-space-grotesk)]">
              Malaysian Registered Architect &middot; A/M 305
            </span>
          </div>

          {/* Title */}
          <h1 className="z-scroll-reveal font-[family-name:var(--font-bebas-neue)] text-[clamp(3rem,10vw,8rem)] leading-[0.95] tracking-tight mb-8">
            CREATING /{" "}
            <span style={{ color: accent }}>
              TOMORROW&apos;S
            </span>{" "}
            / ARCHITECTURE
          </h1>

          {/* Subtitle */}
          <p
            className="z-scroll-reveal text-lg md:text-xl text-[#888] max-w-xl mx-auto mb-12 font-[family-name:var(--font-space-grotesk)]"
            style={{ transitionDelay: "0.15s" }}
          >
            Innovative Design Solutions for Modern Living
          </p>

          {/* CTAs */}
          <div
            className="z-scroll-reveal flex flex-wrap items-center justify-center gap-4"
            style={{ transitionDelay: "0.3s" }}
          >
            <button
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] font-semibold px-8 py-4 rounded-sm transition-opacity hover:opacity-90 cursor-pointer border-none font-[family-name:var(--font-space-grotesk)]"
              style={{ backgroundColor: accent, color: "#fff" }}
            >
              View Projects
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] font-semibold px-8 py-4 rounded-sm transition-colors hover:bg-white/5 cursor-pointer bg-transparent font-[family-name:var(--font-space-grotesk)]"
              style={{ border: `1px solid ${accent}`, color: accent }}
            >
              Start a Project
            </button>
          </div>
        </div>
      </section>

      {/* ────────────────────── PROJECTS ────────────────────── */}
      <section id="projects" className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          {/* Section header */}
          <div className="mb-20">
            <span
              className="z-scroll-reveal text-xs uppercase tracking-[0.3em] font-[family-name:var(--font-space-grotesk)]"
              style={{ color: accent }}
            >
              Featured Work
            </span>
            <h2 className="z-scroll-reveal mt-4 font-[family-name:var(--font-bebas-neue)] text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-tight">
              SIGNATURE PROJECTS
            </h2>
          </div>

          {/* Project list */}
          <div className="space-y-28 md:space-y-36">
            {projects.map((project) => (
              <article
                key={project.number}
                className={`z-scroll-reveal grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  project.reversed ? "lg:direction-rtl" : ""
                }`}
                style={
                  project.reversed ? { direction: "rtl" } : undefined
                }
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden rounded-sm group"
                  style={{ direction: "ltr" }}
                >
                  <div className="aspect-[4/3] bg-[#1a1a1a]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  {/* Number overlay */}
                  <span
                    className="absolute top-4 left-4 text-7xl font-[family-name:var(--font-bebas-neue)] leading-none opacity-30"
                    style={{ color: accent }}
                  >
                    {project.number}
                  </span>
                </div>

                {/* Info */}
                <div style={{ direction: "ltr" }}>
                  <h3 className="font-[family-name:var(--font-bebas-neue)] text-3xl md:text-4xl tracking-tight mb-4">
                    {project.title}
                  </h3>
                  <p className="text-[#888] leading-relaxed mb-6 font-[family-name:var(--font-inter)]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-[#555] font-[family-name:var(--font-space-grotesk)]">
                    <span>{project.location}</span>
                    <span>{project.size}</span>
                    <span>{project.year}</span>
                  </div>
                  <button
                    className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors bg-transparent border-none cursor-pointer font-[family-name:var(--font-space-grotesk)] hover:brightness-125"
                    style={{ color: accent }}
                  >
                    View Project <ChevronRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────── SERVICES ────────────────────── */}
      <section
        id="services"
        className="py-24 md:py-32 px-6 md:px-10 bg-[#0a0a0a]"
      >
        <div className="max-w-[1280px] mx-auto">
          {/* Section header */}
          <div className="mb-16 text-center">
            <span
              className="z-scroll-reveal text-xs uppercase tracking-[0.3em] font-[family-name:var(--font-space-grotesk)]"
              style={{ color: accent }}
            >
              What We Do
            </span>
            <h2 className="z-scroll-reveal mt-4 font-[family-name:var(--font-bebas-neue)] text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-tight">
              OUR SERVICES
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="z-scroll-reveal group border border-[#1a1a1a] rounded-sm p-8 transition-all duration-300 hover:border-[#333] hover:bg-[#0f0f0f]"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${accent}15` }}
                  >
                    <Icon size={22} style={{ color: accent }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 font-[family-name:var(--font-space-grotesk)]">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#888] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────── ABOUT ────────────────────── */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          {/* Section header */}
          <div className="mb-16 text-center">
            <span
              className="z-scroll-reveal text-xs uppercase tracking-[0.3em] font-[family-name:var(--font-space-grotesk)]"
              style={{ color: accent }}
            >
              About Us
            </span>
            <h2 className="z-scroll-reveal mt-4 font-[family-name:var(--font-bebas-neue)] text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-tight">
              OUR STORY
            </h2>
          </div>

          {/* Stats */}
          <div className="z-scroll-reveal grid grid-cols-3 gap-8 mb-20 max-sm:grid-cols-1 max-sm:gap-12">
            {stats.map((s) => (
              <StatCounter
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
              />
            ))}
          </div>

          {/* Timeline */}
          <div className="relative max-w-2xl mx-auto">
            {/* Vertical line */}
            <div
              className="absolute left-4 md:left-5 top-0 bottom-0 w-px"
              style={{ backgroundColor: `${accent}30` }}
            />

            <div className="space-y-14">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className="z-scroll-reveal relative pl-14 md:pl-16"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-2 md:left-3 top-1 w-5 h-5 rounded-full border-2"
                    style={{
                      borderColor: accent,
                      backgroundColor: "#050505",
                    }}
                  />
                  <span
                    className="text-xs font-[family-name:var(--font-space-grotesk)] uppercase tracking-[0.2em]"
                    style={{ color: accent }}
                  >
                    {item.year}
                  </span>
                  <h3 className="text-xl font-semibold mt-1 mb-2 font-[family-name:var(--font-space-grotesk)]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#888] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────── CONTACT ────────────────────── */}
      <section
        id="contact"
        className="py-24 md:py-32 px-6 md:px-10 bg-[#0a0a0a]"
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16">
            <span
              className="z-scroll-reveal text-xs uppercase tracking-[0.3em] font-[family-name:var(--font-space-grotesk)]"
              style={{ color: accent }}
            >
              Get In Touch
            </span>
            <h2 className="z-scroll-reveal mt-4 font-[family-name:var(--font-bebas-neue)] text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-tight">
              START YOUR PROJECT
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left — Info */}
            <div className="z-scroll-reveal space-y-8">
              <p className="text-[#888] leading-relaxed max-w-md">
                Ready to bring your vision to life? Whether you have a fully
                formed brief or just an idea, we would love to hear from you.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPinned
                    size={18}
                    className="mt-0.5 shrink-0"
                    style={{ color: accent }}
                  />
                  <div>
                    <h4 className="text-sm font-semibold mb-1 font-[family-name:var(--font-space-grotesk)]">
                      Studio
                    </h4>
                    <p className="text-sm text-[#888]">
                      12A, Jalan Teknologi 3/5
                      <br />
                      Kota Damansara, 47810
                      <br />
                      Selangor, Malaysia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail
                    size={18}
                    className="mt-0.5 shrink-0"
                    style={{ color: accent }}
                  />
                  <div>
                    <h4 className="text-sm font-semibold mb-1 font-[family-name:var(--font-space-grotesk)]">
                      Email
                    </h4>
                    <a
                      href="mailto:hello@zakuanarchitect.com"
                      className="text-sm text-[#888] hover:text-white transition-colors"
                    >
                      hello@zakuanarchitect.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone
                    size={18}
                    className="mt-0.5 shrink-0"
                    style={{ color: accent }}
                  />
                  <div>
                    <h4 className="text-sm font-semibold mb-1 font-[family-name:var(--font-space-grotesk)]">
                      Phone
                    </h4>
                    <a
                      href="tel:+60123456789"
                      className="text-sm text-[#888] hover:text-white transition-colors"
                    >
                      +60 12-345 6789
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <form
              className="z-scroll-reveal space-y-6"
              onSubmit={(e) => e.preventDefault()}
              style={{ transitionDelay: "0.15s" }}
            >
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-[#888] mb-2 font-[family-name:var(--font-space-grotesk)]">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full bg-transparent border border-[#1a1a1a] rounded-sm px-4 py-3 text-sm text-white placeholder:text-[#555] outline-none transition-colors focus:border-[#ff3b00] font-[family-name:var(--font-inter)]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-[#888] mb-2 font-[family-name:var(--font-space-grotesk)]">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full bg-transparent border border-[#1a1a1a] rounded-sm px-4 py-3 text-sm text-white placeholder:text-[#555] outline-none transition-colors focus:border-[#ff3b00] font-[family-name:var(--font-inter)]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-[#888] mb-2 font-[family-name:var(--font-space-grotesk)]">
                  Project Type
                </label>
                <select
                  required
                  className="w-full bg-transparent border border-[#1a1a1a] rounded-sm px-4 py-3 text-sm text-[#888] outline-none transition-colors focus:border-[#ff3b00] font-[family-name:var(--font-inter)] appearance-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-[#0a0a0a]">
                    Select project type
                  </option>
                  <option value="residential" className="bg-[#0a0a0a]">
                    Residential
                  </option>
                  <option value="commercial" className="bg-[#0a0a0a]">
                    Commercial
                  </option>
                  <option value="interior" className="bg-[#0a0a0a]">
                    Interior Design
                  </option>
                  <option value="renovation" className="bg-[#0a0a0a]">
                    Renovation
                  </option>
                  <option value="consulting" className="bg-[#0a0a0a]">
                    Consulting
                  </option>
                  <option value="other" className="bg-[#0a0a0a]">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-[#888] mb-2 font-[family-name:var(--font-space-grotesk)]">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell us about your project..."
                  className="w-full bg-transparent border border-[#1a1a1a] rounded-sm px-4 py-3 text-sm text-white placeholder:text-[#555] outline-none transition-colors focus:border-[#ff3b00] resize-none font-[family-name:var(--font-inter)]"
                />
              </div>

              <button
                type="submit"
                className="w-full text-sm uppercase tracking-[0.15em] font-semibold px-8 py-4 rounded-sm transition-opacity hover:opacity-90 cursor-pointer border-none text-white font-[family-name:var(--font-space-grotesk)]"
                style={{ backgroundColor: accent }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ────────────────────── FOOTER ────────────────────── */}
      <footer className="border-t border-[#1a1a1a] py-10 px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#555]">
          <p className="font-[family-name:var(--font-space-grotesk)]">
            &copy; 2025 Zakuan Architect. Registration: A/M 305 LAM
          </p>
          <div className="flex items-center gap-6 font-[family-name:var(--font-space-grotesk)]">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="uppercase tracking-[0.15em] hover:text-white transition-colors bg-transparent border-none cursor-pointer text-[#555] text-xs font-[family-name:var(--font-space-grotesk)]"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
