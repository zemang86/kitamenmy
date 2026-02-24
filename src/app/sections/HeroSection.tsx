import Image from "next/image";
import { Hand } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import WebGLCanvas from "@/components/effects/WebGLCanvas";

export default function HeroSection() {
  return (
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
            I&apos;m <span className="text-accent-primary">Hazman Hassan</span>,
            <br />
            AI Builder &amp; Venture Operator
          </h1>
          <p className="text-[clamp(1rem,2vw,1.3rem)] text-text-secondary mb-6 font-medium max-[480px]:text-[0.95rem]">
            Building at the intersection of AI, Esports &amp; Education
          </p>
          <p className="text-base text-text-secondary mb-10 leading-[1.8] max-w-[540px] max-[968px]:max-w-full max-[480px]:text-sm">
            Architect by training, operator by obsession. I build AI-powered
            products, esports infrastructure, and learning platforms — from
            zero to scale, across 16 ventures and counting.
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
              alt="Hazman Hassan — AI Builder and Venture Operator based in Malaysia"
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
  );
}
