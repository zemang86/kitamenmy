import { type ReactNode } from "react";

interface ScrollingStripProps {
  items: ReactNode[];
}

export default function ScrollingStrip({ items }: ScrollingStripProps) {
  const doubled = [...items, ...items];

  return (
    <div className="bg-glass-bg backdrop-blur-[20px] border-y border-glass-border py-5 overflow-hidden relative">
      <div className="flex gap-12 px-8 animate-marquee-scroll">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 font-medium whitespace-nowrap text-[0.95rem]"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
