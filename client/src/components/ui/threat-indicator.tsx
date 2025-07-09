import { cn } from "@/lib/utils";

interface ThreatIndicatorProps {
  level: 'low' | 'medium' | 'high' | 'critical';
  className?: string;
}

export function ThreatIndicator({ level, className }: ThreatIndicatorProps) {
  const colors = {
    low: 'text-green-400',
    medium: 'text-orange-400',
    high: 'text-pink-400',
    critical: 'text-red-400',
  };

  return (
    <span className={cn(
      "font-mono text-xs neon-text",
      colors[level],
      className
    )}>
      {level.toUpperCase()}
    </span>
  );
}
