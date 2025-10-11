"use client";

import { motion } from "motion/react";
import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    | "onDrag"
    | "onDragEnd"
    | "onDragStart"
    | "onAnimationStart"
    | "onAnimationEnd"
  > {
  hover?: boolean;
  glass?: boolean;
  delay?: number;
  direction?: "up" | "left" | "right";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      hover = true,
      glass = false,
      delay = 0,
      direction = "up",
      children,
      ...props
    },
    ref
  ) => {
    const directionVariants = {
      up: { y: 10 },
      left: { x: -10 },
      right: { x: 10 },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-xl border border-border transition-all duration-300",
          glass
            ? "bg-glass-bg backdrop-blur-sm border-glass-border"
            : "bg-card text-card-foreground",
          hover && "hover:shadow-lg hover:border-foreground",
          "p-6",
          className
        )}
        initial={{ opacity: 0, ...directionVariants[direction] }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.4, delay }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 pb-4", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-foreground",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-text-secondary", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
