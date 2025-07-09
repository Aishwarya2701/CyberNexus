import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
}

export function CyberCard({ children, className }: CyberCardProps) {
  return (
    <Card className={cn("cyber-card", className)}>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
}
