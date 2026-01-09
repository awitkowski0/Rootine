import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "solid";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "glass", children, ...props }, ref) => {
    const variants = {
      default: "bg-white rounded-3xl border-2 border-gray-soft",
      glass: "bg-white/50 backdrop-blur-sm border-2 border-white/40 rounded-3xl",
      solid: "bg-white rounded-3xl shadow-sm",
    };

    return (
      <div
        ref={ref}
        className={cn(variants[variant], "p-6", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
