"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "4xl" | "5xl" | "6xl" | "7xl";
  gradient?: boolean;
}

export default function PageLayout({
  children,
  className = "",
  maxWidth = "6xl",
  gradient = true,
}: PageLayoutProps) {
  const gradientClass = gradient
    ? "bg-gradient-to-br from-background via-background-secondary to-background"
    : "bg-background";

  return (
    <div
      className={`min-h-screen ${gradientClass} transition-all duration-300 ${className}`}
    >
      <div className={`max-w-${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
        {children}
      </div>
    </div>
  );
}

// Animated page header component
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  delay?: number;
}

export function PageHeader({
  title,
  subtitle,
  children,
  delay = 0,
}: PageHeaderProps) {
  return (
    <motion.div
      className="text-center mb-12 lg:mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 lg:mb-6">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-6">
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  );
}

// Animated card component
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  hover?: boolean;
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  direction = "up",
  hover = true,
}: AnimatedCardProps) {
  const directionVariants = {
    up: { y: 10 },
    left: { x: -10 },
    right: { x: 10 },
  };

  return (
    <motion.div
      className={`card p-6 lg:p-8 ${hover ? "hover-lift" : ""} ${className}`}
      initial={{ opacity: 0, ...directionVariants[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
}

// Section wrapper component
interface SectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Section({ children, className = "", delay = 0 }: SectionProps) {
  return (
    <motion.section
      className={`mb-8 lg:mb-12 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.section>
  );
}
