import { iconRegistry } from "@/lib/icon-registry";

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function DynamicIcon({
  name,
  size = 24,
  className = "",
}: DynamicIconProps) {
  const Icon = iconRegistry[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}
