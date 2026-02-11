import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  onClick,
}: ButtonProps) {
  const base = "inline-flex items-center gap-2 font-semibold transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-lg px-8 py-4 no-underline";

  const variants = {
    primary:
      "bg-gradient-to-br from-accent-primary to-accent-secondary text-bg-primary shadow-[0_4px_20px_rgba(0,255,136,0.15)] hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(0,255,136,0.25)]",
    secondary:
      "bg-glass-bg backdrop-blur-[10px] text-text-primary border border-glass-border hover:border-accent-primary hover:bg-glass-bg-hover hover:shadow-[0_0_20px_rgba(0,255,136,0.1)]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
