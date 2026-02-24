import ScrollReveal from "@/components/effects/ScrollReveal";

export default function ContactSection() {
  return (
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
  );
}
