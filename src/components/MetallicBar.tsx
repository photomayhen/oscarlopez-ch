import React from "react";
import { cn } from "@/lib/utils";

interface MetallicBarProps {
  flipped?: boolean;
  className?: string;
}

const MetallicBar: React.FC<MetallicBarProps> = ({ flipped = true, className }) => {
  return (
    <div className={cn("w-full py-8", className)} aria-hidden>
      <div
        className={cn(
          "relative h-3 md:h-4 rounded-full mx-auto max-w-6xl",
          flipped ? "scale-y-[-1]" : undefined
        )}
        style={{
          background:
            "linear-gradient(90deg, hsl(210 15% 92%) 0%, hsl(210 20% 85%) 10%, hsl(210 8% 65%) 40%, hsl(210 5% 45%) 60%, hsl(210 12% 88%) 90%, hsl(210 18% 95%) 100%)",
          boxShadow:
            "0 0 30px hsl(210 100% 88% / 0.3), inset 0 2px 2px hsl(210 50% 98% / 0.4), inset 0 -2px 2px hsl(210 15% 35% / 0.4), 0 0 60px hsl(210 80% 85% / 0.15)",
        }}
      >
        {/* Atmosphere glow */}
        <div
          className="pointer-events-none absolute -inset-3 rounded-[2rem]"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(210 100% 92% / 0.2) 0%, hsl(210 80% 88% / 0.1) 30%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
        {/* Inner sheen */}
        <div
          className="pointer-events-none absolute inset-0.5 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, hsl(210 60% 90% / 0.1) 30%, hsl(210 40% 85% / 0.05) 70%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
};

export default MetallicBar;
