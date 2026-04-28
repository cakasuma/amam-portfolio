import { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

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

  const widthClass = {
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
  }[maxWidth];

  return (
    <div className={`min-h-screen ${gradientClass} ${className}`}>
      <div className={`${widthClass} mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16`}>
        {children}
      </div>
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  level?: 1 | 2 | 3;
  animate?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  children,
  level = 1,
  animate = true,
}: PageHeaderProps) {
  const headingClass = {
    1: "text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 lg:mb-6",
    2: "text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 lg:mb-5",
    3: "text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 lg:mb-4",
  }[level];

  const Heading = level === 1 ? "h1" : level === 2 ? "h2" : "h3";

  return (
    <header
      className={`text-center mb-12 lg:mb-16 ${animate ? "anim-fade-up" : ""}`}
    >
      <Heading className={headingClass}>{title}</Heading>
      {subtitle && (
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-6">
          {subtitle}
        </p>
      )}
      {children}
    </header>
  );
}

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  hover?: boolean;
  glass?: boolean;
  animate?: boolean;
}

export function AnimatedCard({
  children,
  className = "",
  direction = "up",
  hover = true,
  glass = false,
  animate = true,
}: AnimatedCardProps) {
  const animClass = animate
    ? direction === "left"
      ? "anim-fade-left"
      : direction === "right"
      ? "anim-fade-right"
      : "anim-fade-up"
    : "";

  return (
    <Card className={`${animClass} ${className}`} hover={hover} glass={glass}>
      {children}
    </Card>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
  animate?: boolean;
}

export function Section({
  children,
  className = "",
  id,
  ariaLabel,
  animate = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`mb-8 lg:mb-12 ${animate ? "anim-fade-up" : ""} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
}

interface HeroSectionProps {
  children: ReactNode;
  className?: string;
  background?: "gradient" | "solid";
  animate?: boolean;
}

export function HeroSection({
  children,
  className = "",
  background = "gradient",
  animate = true,
}: HeroSectionProps) {
  return (
    <Section
      className={`text-center py-4 md:py-8 ${
        background === "gradient"
          ? "bg-gradient-to-br from-background to-background-secondary"
          : "bg-background"
      } ${className}`}
      ariaLabel="Hero section"
      animate={animate}
    >
      {children}
    </Section>
  );
}

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
  }[columns];

  const gridGap = { sm: "gap-4", md: "gap-6", lg: "gap-8" }[gap];

  return <div className={`grid ${gridCols} ${gridGap} ${className}`}>{children}</div>;
}

interface CTASectionProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  animate?: boolean;
}

export function CTASection({
  title,
  description,
  children,
  className = "",
  variant = "primary",
  animate = true,
}: CTASectionProps) {
  const bgClass =
    variant === "primary"
      ? "bg-gradient-to-r from-secondary to-warning text-secondary-foreground"
      : "bg-accent text-foreground border border-border";

  return (
    <Section className={`text-center ${className}`} animate={animate}>
      <Card className={`${bgClass} p-8 md:p-12`} hover={false}>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
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
