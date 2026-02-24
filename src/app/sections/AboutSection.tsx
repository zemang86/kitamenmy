import Image from "next/image";
import ScrollReveal from "@/components/effects/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

const aboutStats = [
  { number: "50+", label: "Projects Completed" },
  { number: "10+", label: "Years Experience" },
  { number: "100+", label: "Happy Clients" },
];

export default function AboutSection() {
  return (
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
              loading="lazy"
            />
          </div>
          <div>
            <h3 className="text-3xl mb-6 font-bold tracking-tight">
              Building at the intersection of AI &amp; Culture
            </h3>
            <p className="text-text-secondary leading-[1.8] mb-5">
              Trained as an architect, I&apos;ve spent the last decade building
              at the intersection of AI, esports, and learning — designing
              systems that change how people work, learn, and play.
            </p>
            <p className="text-text-secondary leading-[1.8] mb-5">
              As co-founder of Special Ops Sdn Bhd, I operate ventures like
              KITAMEN, 1MiLabs, and Edventure+ — turning ideas into scalable
              solutions that deliver measurable outcomes.
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
              {aboutStats.map((stat) => (
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
  );
}
