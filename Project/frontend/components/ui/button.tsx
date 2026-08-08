import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-[#635bff] text-white shadow-sm hover:bg-[#5148e8] hover:-translate-y-px",
  secondary: "bg-[#f2f4f7] text-[#344054] hover:bg-[#e4e7ec]",
  outline: "border border-[#d0d5dd] bg-white text-[#344054] hover:bg-[#f9fafb]",
  ghost: "text-[#667085] hover:bg-[#f2f4f7] hover:text-[#344054]",
  danger: "bg-[#f04438] text-white hover:bg-[#d92d20]",
  success: "bg-[#12b76a] text-white hover:bg-[#039855]"
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-12 px-5",
  icon: "h-10 w-10"
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#635bff]/30",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
