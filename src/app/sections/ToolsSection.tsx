import ScrollReveal from "@/components/effects/ScrollReveal";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { toolCategories, skillLevelConfig } from "@/data/tools";

export default function ToolsSection() {
  return (
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
  );
}
