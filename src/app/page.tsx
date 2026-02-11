import Image from "next/image";
import { Hand, Zap, Gamepad2, BookOpen, Rocket, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import MeshGradient from "@/components/effects/MeshGradient";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import NoiseOverlay from "@/components/effects/NoiseOverlay";
import WebGLCanvas from "@/components/effects/WebGLCanvas";
import ScrollReveal from "@/components/effects/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { services } from "@/data/services";
import { toolCategories, skillLevelConfig } from "@/data/tools";
import { ventures } from "@/data/ventures";
import { portfolioItems } from "@/data/portfolio";
import StatsSection from "./StatsSection";

const stripItems = [
  { icon: Zap, label: "AI Architecture" },
  { icon: Gamepad2, label: "Esports Infrastructure" },
  { icon: BookOpen, label: "Learning Systems" },
  { icon: Rocket, label: "Product Strategy" },
];

export default function HomePage() {
  return (
    <div className="font-[family-name:var(--font-ibm-plex-mono)] leading-[1.7] overflow-x-hidden relative">
      <ErrorBoundary>
        <MeshGradient />
        <FloatingOrbs />
        <NoiseOverlay />
      </ErrorBoundary>
      <Header />
      <main id="main-content">

      {/* Hero */}
      <section
        id="hero"
        className="min-h-screen flex items-center pt-40 pb-16 px-8 relative overflow-hidden max-md:pt-32 max-md:px-6 max-[480px]:pt-28 max-[480px]:px-4"
      >
        <ErrorBoundary><WebGLCanvas /></ErrorBoundary>
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 gap-16 items-center relative z-1 max-[968px]:grid-cols-1 max-[968px]:text-center">
          <div className="z-2">
            <div className="inline-flex items-center gap-3 bg-glass-bg backdrop-blur-[10px] border border-glass-border px-4 py-2 rounded-lg text-sm mb-6">
              <Hand size={20} className="text-accent-primary" />
              <span>Hello There!</span>
            </div>
            <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] mb-2 tracking-tight max-md:break-words max-[480px]:text-[1.6rem]">
              I&apos;m <span className="text-accent-primary">Hazman Hassan</span>
              ,
              <br />
              Architect turned AI Builder &amp; Operator
              <br />
              based in Malaysia.
            </h1>
            <p className="text-[clamp(1rem,2vw,1.3rem)] text-text-secondary mb-6 font-medium max-[480px]:text-[0.95rem]">
              Shaping the future of AI, Esports &amp; Education
            </p>
            <p className="text-base text-text-secondary mb-10 leading-[1.8] max-w-[540px] max-[968px]:max-w-full max-[480px]:text-sm">
              With a decade of experience, I&apos;ve applied architectural rigor
              to building AI-first, esports, and education ventures — from the
              ground up and at scale.
            </p>
            <div className="flex gap-4 flex-wrap max-[968px]:justify-center">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 font-semibold rounded-lg px-8 py-4 no-underline bg-gradient-to-br from-accent-primary to-accent-secondary text-bg-primary shadow-[0_4px_20px_rgba(0,255,136,0.15)] hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(0,255,136,0.25)] transition-all duration-300 max-[480px]:w-full max-[480px]:justify-center max-[480px]:px-6 max-[480px]:py-3.5 max-[480px]:text-[0.85rem]"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-semibold rounded-lg px-8 py-4 no-underline bg-glass-bg backdrop-blur-[10px] text-text-primary border border-glass-border hover:border-accent-primary hover:bg-glass-bg-hover hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] transition-all duration-300 max-[480px]:w-full max-[480px]:justify-center max-[480px]:px-6 max-[480px]:py-3.5 max-[480px]:text-[0.85rem]"
              >
                Get In Touch
              </a>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="relative w-[420px] h-[420px] max-w-[90vw]">
              <div className="absolute -inset-[30px] bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full opacity-30 blur-[60px] animate-[float_6s_ease-in-out_infinite]" />
              <Image
                src="https://framerusercontent.com/images/HtJJ5OHCEucfc6kNrJBGr7vK08.png?scale-down-to=1024"
                alt="Hazman Hassan — AI Builder and Operator based in Malaysia"
                width={420}
                height={420}
                className="w-full h-full object-cover rounded-full relative z-2 border-[3px] border-glass-border shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_60px_rgba(0,0,0,0.5),inset_0_0_60px_rgba(0,255,136,0.1)]"
                priority
              />
              <div className="absolute bottom-[30px] right-[10px] bg-[rgba(10,10,15,0.8)] backdrop-blur-[20px] px-5 py-2.5 rounded-full border border-glass-border flex items-center gap-2 z-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)]" role="status" aria-label="Available for projects">
                <span className="w-2 h-2 bg-accent-primary rounded-full animate-pulse-glow shadow-[0_0_10px_var(--color-accent-primary)]" aria-hidden="true" />
                <span className="text-xs font-semibold text-text-primary">
                  Available for Projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialization Strip */}
      <div className="bg-glass-bg backdrop-blur-[20px] border-y border-glass-border py-5 overflow-hidden relative">
        <div className="flex gap-12 px-8 animate-marquee-scroll">
          {[...stripItems, ...stripItems].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 font-medium whitespace-nowrap text-[0.95rem]"
            >
              <item.icon size={18} className="text-accent-primary" />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <ScrollReveal>
        <section id="services" className="py-32 px-8 relative max-md:py-20 max-md:px-6 max-[480px]:py-16 max-[480px]:px-4">
          <SectionHeader
            label="My Specialization"
            title="Services I Provide"
            description="Outcome-focused solutions that drive real business value"
          />
          <div className="max-w-[1400px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8 max-md:grid-cols-1">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="scroll-reveal group bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl p-10 transition-all duration-400 relative overflow-hidden hover:-translate-y-0.5 hover:border-glass-border-hover hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(0,255,136,0.05)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-accent-primary before:to-accent-secondary before:scale-x-0 before:origin-left before:transition-transform before:duration-400 hover:before:scale-x-100"
              >
                <div className="w-[60px] h-[60px] bg-glass-bg border border-glass-border rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-accent-primary group-hover:to-accent-secondary group-hover:border-transparent">
                  <DynamicIcon
                    name={svc.icon}
                    size={28}
                    className="text-accent-primary transition-colors duration-300 group-hover:text-bg-primary"
                  />
                </div>
                <h3 className="text-[1.4rem] mb-4 font-semibold tracking-tight">
                  {svc.title}
                </h3>
                <p className="text-text-secondary mb-6 leading-[1.7] text-sm">
                  {svc.description}
                </p>
                <a
                  href={svc.link}
                  className="text-accent-primary no-underline font-semibold inline-flex items-center gap-2 text-sm transition-all duration-300 hover:gap-4"
                >
                  Learn more <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Tools */}
      <ScrollReveal>
        <section id="skills" className="py-32 px-8 relative max-md:py-20 max-md:px-6 max-[480px]:py-16 max-[480px]:px-4">
          <div className="max-w-[1400px] mx-auto mb-20 text-center">
            <div className="inline-flex items-center gap-2 bg-glass-bg backdrop-blur-[10px] border border-glass-border px-4 py-2 rounded-md text-[0.85rem] mb-6 text-accent-primary font-medium">
              Skills &amp; Tools
            </div>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] mb-4 font-bold tracking-tight">
              Technical Expertise
            </h2>
            <div className="flex gap-4 justify-center mt-6 flex-wrap">
              {(["B", "I", "A", "S"] as const).map((level) => (
                <div
                  key={level}
                  className="flex items-center gap-2 text-[0.85rem] text-text-secondary bg-glass-bg px-3 py-1.5 rounded-full border border-glass-border"
                >
                  <div
                    className={`w-[22px] h-[22px] rounded-lg font-bold flex items-center justify-center text-[0.7rem] text-bg-primary bg-gradient-to-br ${skillLevelConfig[level].gradient}`}
                  >
                    {level}
                  </div>
                  <span>{skillLevelConfig[level].label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
            {toolCategories.map((cat) => (
              <div key={cat.label}>
                <div className="text-xs font-semibold uppercase tracking-[0.1em] text-text-tertiary mb-4 pl-1">
                  {cat.label}
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 max-md:grid-cols-2 max-md:gap-3">
                  {cat.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="scroll-reveal group bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl px-4 py-5 text-center transition-all duration-400 relative min-h-[120px] flex flex-col justify-between items-center overflow-hidden hover:-translate-y-0.5 hover:border-glass-border-hover hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                    >
                      <div className="flex flex-col items-center">
                        <div className="mb-2 relative z-1 flex items-center justify-center">
                          <DynamicIcon
                            name={tool.icon}
                            size={28}
                            className="text-text-secondary transition-all duration-300 group-hover:text-accent-primary group-hover:drop-shadow-[0_0_10px_var(--color-accent-primary)]"
                          />
                        </div>
                        <div className="font-medium mb-2 text-[0.8rem] leading-tight text-center text-text-primary relative z-1">
                          {tool.name}
                        </div>
                      </div>
                      <span
                        className={`inline-block text-bg-primary text-[0.65rem] px-2.5 py-0.5 rounded-lg font-bold min-w-[24px] text-center relative z-1 bg-gradient-to-br ${skillLevelConfig[tool.level].gradient}`}
                      >
                        {tool.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Ventures */}
      <ScrollReveal>
        <section id="ventures" className="py-32 px-8 relative max-md:py-20 max-md:px-6 max-[480px]:py-16 max-[480px]:px-4">
          <SectionHeader
            label="My Ventures"
            title="Companies & Projects"
            description="Building multiple ventures at the intersection of technology and culture"
          />
          <div className="max-w-[1400px] mx-auto mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
            {ventures.map((v) =>
              v.comingSoon ? (
                <div
                  key={v.name}
                  className="scroll-reveal bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl p-6 transition-all duration-400 relative overflow-hidden max-[480px]:p-5"
                >
                  <div className="text-lg font-semibold mb-2 text-text-primary relative z-1">
                    {v.name}
                  </div>
                  <div className="text-text-secondary text-[0.85rem] flex items-center gap-2 relative z-1">
                    {v.urlText}
                  </div>
                </div>
              ) : (
                <a
                  key={v.name}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scroll-reveal group block bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl p-6 transition-all duration-400 no-underline text-inherit relative overflow-hidden hover:-translate-y-0.5 hover:border-glass-border-hover hover:shadow-[0_15px_30px_rgba(0,0,0,0.3),0_0_20px_rgba(0,255,136,0.05)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(0,255,136,0.1)] before:to-transparent before:opacity-0 before:transition-opacity before:duration-400 hover:before:opacity-100 max-[480px]:p-5"
                >
                  <div className="text-lg font-semibold mb-2 text-text-primary relative z-1">
                    {v.name}
                  </div>
                  <div className="text-accent-primary text-[0.85rem] flex items-center gap-2 relative z-1 transition-all duration-300 group-hover:gap-3">
                    {v.urlText}
                  </div>
                </a>
              )
            )}
          </div>
        </section>
      </ScrollReveal>

      {/* Stats */}
      <StatsSection />

      {/* Portfolio */}
      <ScrollReveal>
        <section id="portfolio" className="py-32 px-8 relative max-md:py-20 max-md:px-6 max-[480px]:py-16 max-[480px]:px-4">
          <SectionHeader
            label="Portfolio"
            title="Recent Projects"
            description="A selection of my recent work and ventures"
          />
          <div className="max-w-[1400px] mx-auto mt-12 grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 max-md:grid-cols-1">
            {portfolioItems.map((item) => (
              <div
                key={item.title}
                className="scroll-reveal bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl overflow-hidden transition-all duration-400 relative h-full flex flex-col group hover:-translate-y-0.5 hover:border-glass-border-hover hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(0,255,136,0.05)]"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={400}
                    height={220}
                    className="w-full h-[220px] object-cover transition-transform duration-600 group-hover:scale-[1.08]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />
                </div>
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[rgba(0,255,136,0.15)] text-accent-primary border border-[rgba(0,255,136,0.3)] text-[0.7rem] px-3 py-1 rounded font-semibold uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-[1.4rem] mb-3 font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary leading-[1.7] text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* About */}
      <ScrollReveal>
        <section id="about" className="py-32 px-8 relative max-md:py-20 max-md:px-6 max-[480px]:py-16 max-[480px]:px-4">
          <SectionHeader label="About Me" title="Who is Hazman Hassan?" />
          <div className="max-w-[1400px] mx-auto mt-12 grid grid-cols-[1fr_2fr] gap-16 items-start max-md:grid-cols-1 max-md:gap-8">
            <div>
              <Image
                src="https://framerusercontent.com/images/HtJJ5OHCEucfc6kNrJBGr7vK08.png?scale-down-to=1024"
                alt="Hazman Hassan portrait"
                width={320}
                height={320}
                className="w-full max-w-[320px] h-[320px] object-cover rounded-2xl border border-glass-border grayscale-[50%] transition-all duration-400 shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_0_60px_rgba(0,255,136,0.05)] hover:grayscale-0 hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(0,0,0,0.4),0_0_60px_rgba(0,255,136,0.15)] max-md:max-w-full max-md:h-60"
              />
            </div>
            <div>
              <h3 className="text-3xl mb-6 font-bold tracking-tight">
                Building at the intersection of AI &amp; Culture
              </h3>
              <p className="text-text-secondary leading-[1.8] mb-5">
                Trained as an architect, I&apos;ve spent the last decade building
                at the intersection of AI, esports, and learning—designing
                systems that change how people work, learn, and play
              </p>
              <p className="text-text-secondary leading-[1.8] mb-5">
                As co-founder of Special Ops Sdn Bhd and operator of ventures
                like KITAMEN, 1MiLabs, and Edventure+, I focus on turning ideas
                into scalable solutions that deliver measurable outcomes.
              </p>
              <p className="text-text-secondary leading-[1.8] mb-5">
                My approach blends design thinking from architecture with
                hands-on technical execution, helping organizations adopt AI and
                esports strategies that create lasting impact.
              </p>
              <p className="text-text-secondary leading-[1.8] mb-5">
                Beyond work, I explore how culture, gaming, and technology can
                create new forms of community.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-10 max-md:grid-cols-1 max-md:gap-4">
                {[
                  { number: "50+", label: "Projects Completed" },
                  { number: "10+", label: "Years Experience" },
                  { number: "100+", label: "Happy Clients" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-glass-border-hover"
                  >
                    <div className="text-[2.2rem] font-bold text-accent-primary">
                      {stat.number}
                    </div>
                    <div className="text-text-secondary text-[0.85rem] mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Contact */}
      <ScrollReveal>
        <section id="contact" className="py-32 px-8 relative max-md:py-20 max-md:px-6 max-[480px]:py-16 max-[480px]:px-4">
          <div className="max-w-[800px] mx-auto text-center bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl p-16 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-accent-primary before:to-accent-secondary max-md:p-10 max-[480px]:p-8 max-[480px]:px-5">
            <div className="inline-flex items-center gap-2 bg-glass-bg backdrop-blur-[10px] border border-glass-border px-4 py-2 rounded-md text-[0.85rem] mb-6 text-accent-primary font-medium justify-center">
              Get In Touch
            </div>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] mb-4 font-bold tracking-tight">
              Let&apos;s Build Something Amazing
            </h2>
            <p className="text-text-secondary text-lg mb-10 max-w-[500px] mx-auto max-[480px]:text-sm">
              Ready to transform your ideas into reality? I&apos;m always
              excited to work on innovative projects that push boundaries and
              create real impact.
            </p>
            <div className="flex gap-4 justify-center flex-wrap max-[480px]:flex-col max-[480px]:items-center">
              <a
                href="mailto:hazman@kitamen.my"
                className="inline-flex items-center gap-2 font-semibold rounded-lg px-8 py-4 no-underline bg-gradient-to-br from-accent-primary to-accent-secondary text-bg-primary shadow-[0_4px_20px_rgba(0,255,136,0.15)] hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(0,255,136,0.25)] transition-all duration-300"
              >
                Send Me an Email
              </a>
              <a
                href="https://www.linkedin.com/in/hazmanhassan"
                className="inline-flex items-center gap-2 font-semibold rounded-lg px-8 py-4 no-underline bg-glass-bg backdrop-blur-[10px] text-text-primary border border-glass-border hover:border-accent-primary hover:bg-glass-bg-hover hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] transition-all duration-300"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      </main>
      <Footer />
    </div>
  );
}
