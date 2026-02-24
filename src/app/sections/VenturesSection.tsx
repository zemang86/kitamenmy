import ScrollReveal from "@/components/effects/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { ventures } from "@/data/ventures";

export default function VenturesSection() {
  return (
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
                <div className="text-lg font-semibold mb-1 text-text-primary relative z-1">
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
                <div className="text-lg font-semibold mb-1 text-text-primary relative z-1">
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
  );
}
