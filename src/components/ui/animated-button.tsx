import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const AnimatedButton = ({ 
  text, 
  onClick, 
  className, 
  disabled = false 
}: AnimatedButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative overflow-hidden rounded-full border-2 border-[rgba(184,219,255,0.06)] bg-[hsl(var(--button-interactive))] px-8 py-3 font-body text-base md:text-lg text-foreground transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex items-center",
        className
      )}
    >
      {/* Inner border hover effect */}
      <div className="absolute inset-0 rounded-full transition-all duration-300 group-hover:shadow-[inset_0_1px_0_rgba(184,219,255,0.3)]" 
           style={{ boxShadow: "inset 0 0 0 1px rgba(184, 219, 255, 0.06)" }} />
      
      {/* Circle element */}
      <div className="w-2 h-2 bg-foreground/60 rounded-full transition-all duration-300 group-hover:-translate-x-full group-hover:opacity-0 mr-4 flex-shrink-0" />
      
      {/* Text that moves left on hover */}
      <span className="flex-1 text-center transition-all duration-300 group-hover:-translate-x-6">
        {text}
      </span>
      
      {/* Arrow that slides in from right */}
      <ArrowRight className="absolute right-4 top-1/2 w-4 h-4 -translate-y-1/2 translate-x-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
    </button>
  );
};

export default AnimatedButton;