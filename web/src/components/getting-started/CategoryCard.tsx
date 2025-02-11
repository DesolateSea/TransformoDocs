import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

export function CategoryCard({ title, description, icon: Icon, gradient }: CategoryCardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-xl p-6 transition-all hover:shadow-lg",
      gradient
    )}>
      <div className="relative z-10">
        <div className="mb-4 inline-flex rounded-lg bg-white/20 p-3">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/80">{description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/30" />
    </div>
  );
}