import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { services } from "@/data/services";

export default function ServicesSection() {
  return (
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
                Get in touch <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
