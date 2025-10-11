"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { Card } from "@/components/ui";

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
      <div
        className={`max-w-${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16`}
      >
        {children}
      </div>
    </div>
  );
}

// Enhanced page header component with better SEO structure
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  delay?: number;
  level?: 1 | 2 | 3;
}

export function PageHeader({
  title,
  subtitle,
  children,
  delay = 0,
  level = 1,
}: PageHeaderProps) {
  const headingStyles = {
    1: "text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 lg:mb-6",
    2: "text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 lg:mb-5",
    3: "text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 lg:mb-4",
  };

  const renderHeading = () => {
    const className = headingStyles[level];
    switch (level) {
      case 1:
        return <h1 className={className}>{title}</h1>;
      case 2:
        return <h2 className={className}>{title}</h2>;
      case 3:
        return <h3 className={className}>{title}</h3>;
      default:
        return <h1 className={className}>{title}</h1>;
    }
  };

  return (
    <motion.header
      className="text-center mb-12 lg:mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      role="banner"
    >
      {renderHeading()}
      {subtitle && (
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-6">
          {subtitle}
        </p>
      )}
      {children}
    </motion.header>
  );
}

// Enhanced animated card component using the new Card UI component
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  hover?: boolean;
  glass?: boolean;
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  direction = "up",
  hover = true,
  glass = false,
}: AnimatedCardProps) {
  return (
    <Card
      className={className}
      delay={delay}
      direction={direction}
      hover={hover}
      glass={glass}
    >
      {children}
    </Card>
  );
}

// Enhanced section wrapper component with better semantic structure
interface SectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  ariaLabel?: string;
}

export function Section({
  children,
  className = "",
  delay = 0,
  id,
  ariaLabel,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`mb-8 lg:mb-12 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      aria-label={ariaLabel}
    >
      {children}
    </motion.section>
  );
}

// New components for better structure

// Hero section component for landing pages
interface HeroSectionProps {
  children: ReactNode;
  className?: string;
  background?: "gradient" | "solid";
}

export function HeroSection({
  children,
  className = "",
  background = "gradient",
}: HeroSectionProps) {
  return (
    <Section
      className={`text-center py-4 md:py-8 ${
        background === "gradient"
          ? "bg-gradient-to-br from-background to-background-secondary"
          : "bg-background"
      } ${className}`}
      ariaLabel="Hero section"
    >
      {children}
    </Section>
  );
}

// Content grid for organizing sections
interface ContentGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export function ContentGrid({
  children,
  columns = 2,
  gap = "lg",
  className = "",
}: ContentGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 lg:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  const gridGap = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <div className={`grid ${gridCols[columns]} ${gridGap[gap]} ${className}`}>
      {children}
    </div>
  );
}

// Call-to-action section
interface CTASectionProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export function CTASection({
  title,
  description,
  children,
  className = "",
  variant = "primary",
}: CTASectionProps) {
  const bgClass =
    variant === "primary"
      ? "bg-gradient-to-r from-secondary to-warning text-secondary-foreground"
      : "bg-accent text-foreground border border-border";

  return (
    <Section className={`text-center ${className}`}>
      <Card className={`${bgClass} p-8 md:p-12`} hover={false}>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-lg md:text-xl mb-6 opacity-90 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {children}
      </Card>
    </Section>
  );
}
