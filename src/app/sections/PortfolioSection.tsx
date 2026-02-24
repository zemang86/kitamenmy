import Image from "next/image";
import ScrollReveal from "@/components/effects/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { portfolioItems } from "@/data/portfolio";

export default function PortfolioSection() {
  return (
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
  );
}
