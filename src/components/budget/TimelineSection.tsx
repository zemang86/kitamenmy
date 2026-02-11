"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { TIMELINE_FORMATS } from "@/lib/budget-data/kltower-timeline";
import type { TimelineFormat, TimelineDay } from "@/lib/budget-data/kltower-timeline";

export default function TimelineSection() {
  const [activeFormatId, setActiveFormatId] = useState<string>(
    TIMELINE_FORMATS[0].id
  );
  const activeFormat = TIMELINE_FORMATS.find(
    (f) => f.id === activeFormatId
  ) as TimelineFormat;

  const [activeDayId, setActiveDayId] = useState<string>(
    activeFormat.days[0].id
  );

  // When switching format, reset to first day of that format
  function handleFormatChange(formatId: string) {
    setActiveFormatId(formatId);
    const format = TIMELINE_FORMATS.find((f) => f.id === formatId);
    if (format) {
      setActiveDayId(format.days[0].id);
    }
  }

  const activeDay = activeFormat.days.find(
    (d) => d.id === activeDayId
  ) as TimelineDay;

  return (
    <section
      id="timeline"
      className="py-24 px-8 max-[600px]:py-12 max-[600px]:px-4 relative"
    >
      <ScrollReveal>
        <SectionHeader
          label="Event Schedule"
          labelIcon={<Calendar size={16} />}
          title="Event Programme"
          description="Choose between a compact 2-day-1-night format or the full 3-day festival experience."
        />
      </ScrollReveal>

      <div className="max-w-[800px] mx-auto">
        {/* Format switcher */}
        <ScrollReveal>
          <div className="flex justify-center gap-2 mb-8">
            {TIMELINE_FORMATS.map((format) => (
              <button
                key={format.id}
                onClick={() => handleFormatChange(format.id)}
                className={`format-btn px-5 py-2.5 rounded-full text-[0.85rem] font-semibold transition-all duration-300 ${
                  activeFormatId === format.id
                    ? "bg-gradient-to-br from-accent-primary to-accent-secondary text-bg-primary border border-transparent shadow-[0_4px_20px_rgba(0,255,136,0.3)]"
                    : "bg-glass-bg backdrop-blur-[10px] border border-glass-border text-text-secondary hover:text-text-primary hover:border-accent-primary"
                }`}
              >
                {format.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Day tabs */}
        <ScrollReveal>
          <div className="timeline-tabs-container flex justify-center gap-2 mb-10 flex-wrap">
            {activeFormat.days.map((day) => (
              <button
                key={day.id}
                onClick={() => setActiveDayId(day.id)}
                className={`timeline-tab px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeDayId === day.id
                    ? "bg-gradient-to-br from-accent-secondary to-accent-tertiary text-bg-primary shadow-[0_4px_20px_rgba(0,212,255,0.3)]"
                    : "bg-glass-bg backdrop-blur-[10px] border border-glass-border text-text-secondary hover:text-text-primary hover:border-accent-secondary"
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Timeline track — key forces ScrollReveal to re-observe on day change */}
        <ScrollReveal key={activeDayId}>
          <div className="timeline-day pl-8 max-[480px]:pl-5 border-l-2 border-glass-border">
            {activeDay.items.map((item, i) => (
              <div
                key={`${activeDay.id}-${i}`}
                className="scroll-reveal relative bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl p-[1.5rem] pl-8 max-[480px]:p-4 max-[480px]:pl-5 mb-6 transition-all duration-400 hover:bg-glass-bg-hover hover:border-glass-border-hover before:content-[''] before:absolute before:w-3 before:h-3 before:rounded-full before:bg-accent-secondary before:border-2 before:border-bg-primary before:left-[-2.6rem] max-[480px]:before:left-[-1.9rem] before:top-[2rem] before:shadow-[0_0_10px_var(--color-accent-secondary)]"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div className="text-accent-secondary text-[0.8rem] font-semibold mb-1">
                  {item.time}
                </div>
                <div className="text-[1.05rem] font-bold mb-1">{item.title}</div>
                <div className="text-text-secondary text-[0.85rem] leading-relaxed">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Print: show all formats/days */}
        <div className="hidden print:block">
          {TIMELINE_FORMATS.map((format) => (
            <div key={format.id} className="format-content mb-8">
              <h3 className="text-xl font-bold mb-4">{format.label}</h3>
              {format.days.map((day) => (
                <div key={day.id} className="timeline-day mb-6">
                  <h4 className="text-lg font-semibold mb-3">{day.label}</h4>
                  <div className="pl-8 border-l-2 border-glass-border">
                    {day.items.map((item, i) => (
                      <div
                        key={`print-${day.id}-${i}`}
                        className="bg-glass-bg border border-glass-border rounded-2xl p-5 mb-4"
                      >
                        <div className="text-accent-secondary text-[0.8rem] font-semibold mb-1">
                          {item.time}
                        </div>
                        <div className="text-[1.05rem] font-bold mb-1">
                          {item.title}
                        </div>
                        <div className="text-text-secondary text-[0.85rem] leading-relaxed">
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
