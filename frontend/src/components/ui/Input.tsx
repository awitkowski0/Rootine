import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && (
          <label className="text-sm font-bold text-text-black ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-white border-2 border-gray-soft rounded-xl px-4 py-3 text-lg text-text-black outline-none transition-colors placeholder:text-gray-med",
            "focus:border-primary-green focus:ring-0",
            error && "border-rose-red focus:border-rose-red",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-rose-red font-medium ml-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
