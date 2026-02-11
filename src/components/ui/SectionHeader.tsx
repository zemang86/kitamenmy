import { type ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  labelIcon?: ReactNode;
  title: string;
  description?: string;
}

export default function SectionHeader({
  label,
  labelIcon,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="max-w-[1400px] mx-auto mb-20 text-center">
      <div className="inline-flex items-center gap-2 bg-glass-bg backdrop-blur-[10px] border border-glass-border px-4 py-2 rounded-md text-[0.85rem] mb-6 text-accent-primary font-medium">
        {labelIcon}
        {label}
      </div>
      <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] mb-4 font-bold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-text-secondary text-lg max-w-[600px] mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
