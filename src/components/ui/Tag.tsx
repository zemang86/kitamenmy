interface TagProps {
  children: string;
  className?: string;
}

export default function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-block bg-glass-bg border border-glass-border px-3 py-1 rounded-md text-xs text-text-secondary ${className}`}
    >
      {children}
    </span>
  );
}
