"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "cta" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      disabled,
      loading,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-button-bg text-button-text hover:bg-button-bg-hover border-2 border-transparent focus:border-button-bg focus:shadow-[0_0_0_3px_rgba(139,69,19,0.3)]",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/90 border-2 border-transparent focus:border-secondary focus:shadow-[0_0_0_3px_rgba(139,115,85,0.3)]",
      cta: "bg-button-cta-bg text-foreground hover:bg-button-cta-hover border-2 border-transparent focus:border-button-cta-bg focus:shadow-[0_0_0_3px_rgba(37,99,235,0.3)]",
      outline:
        "border-2 border-border bg-transparent text-foreground hover:bg-accent hover:border-foreground focus:border-foreground focus:shadow-[0_0_0_3px_rgba(139,115,85,0.3)]",
      ghost:
        "bg-transparent text-foreground hover:bg-accent border-2 border-transparent focus:border-border focus:shadow-[0_0_0_3px_rgba(139,115,85,0.3)]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={
          cn(
            "cursor-pointer inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95",
            variants[variant],
            sizes[size],
            className
          ) + " border-runner"
        }
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2 animate-spin" />
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
