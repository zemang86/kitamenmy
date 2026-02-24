import { Zap, Gamepad2, BookOpen, Rocket } from "lucide-react";

const stripItems = [
  { icon: Zap, label: "AI Architecture" },
  { icon: Gamepad2, label: "Esports Infrastructure" },
  { icon: BookOpen, label: "Learning Systems" },
  { icon: Rocket, label: "Product Strategy" },
];

export default function SpecializationStrip() {
  return (
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
  );
}
