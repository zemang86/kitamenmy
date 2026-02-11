import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "a";
  href?: string;
  target?: string;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  as: Tag = "div",
  href,
  target,
}: GlassCardProps) {
  const baseClasses =
    "bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]";
  const hoverClasses = hover
    ? "hover:bg-glass-bg-hover hover:border-glass-border-hover hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(0,255,136,0.05)]"
    : "";

  return (
    <Tag
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...(Tag === "a" ? { href, target, rel: target === "_blank" ? "noopener noreferrer" : undefined } : {})}
    >
      {children}
    </Tag>
  );
}
