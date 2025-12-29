"use client";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { LanguageSwitcher } from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { memo, useMemo, useState } from "react";

interface SmartHeaderProps {
  lng: string;
}

export const SmartHeader = memo(function SmartHeader({
  lng,
}: SmartHeaderProps) {
  const pathname = usePathname();
  const { t, ready } = useTranslation(lng);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  const navItems = useMemo(
    () => [
      {
        href: `/${lng}`,
        label: t("nav.home") || "Home",
        icon: "🏠",
        ariaLabel: "Navigate to home page",
      },
      {
        href: `/${lng}/resume`,
        label: t("nav.resume") || "Resume",
        icon: "📄",
        ariaLabel: "View my resume and experience",
      },
      {
        href: `/${lng}/portfolio`,
        label: t("nav.portfolio") || "Portfolio",
        icon: "💼",
        ariaLabel: "Browse my portfolio projects",
      },
      {
        href: `/${lng}/blog`,
        label: t("nav.blog") || "Blog",
        icon: "📝",
        ariaLabel: "Read my blog posts",
      },
      {
        href: `/${lng}/contact`,
        label: t("nav.contact") || "Contact",
        icon: "📧",
        ariaLabel: "Get in touch with me",
      },
    ],
    [lng, t]
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else if (latest < previous) {
      setIsHidden(false);
    }
  });

  // Don't render until translations are ready
  if (!ready) {
    return (
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm transition-all duration-300 header-shadow"
        role="banner"
      >
        <nav className="max-w-6xl mx-auto px-4 py-3" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex items-center gap-1 bg-accent rounded-xl p-3 border border-border shadow-sm">
              {/* Loading placeholder */}
            </div>
            <div className="md:hidden">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-warning rounded-xl" />
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher lng={lng} />
              <ThemeSwitcher />
            </div>
          </div>
        </nav>
      </motion.header>
    );
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm transition-all duration-300 header-shadow"
      initial={{ y: 0 }}
      animate={{ y: isHidden ? "-100%" : 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto px-4 py-3"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-accent rounded-xl p-3 border border-border shadow-sm">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden ${
                    isActive ? "text-foreground" : "text-foreground"
                  }`}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Active indicator - chip style */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-[var(--nav-active-bg)] rounded-lg shadow-sm"
                      layoutId="navbar-active"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.4,
                      }}
                    />
                  )}

                  {/* Content */}
                  <span className="relative z-10 text-lg group-hover:scale-110 transition-transform duration-150">
                    {item.icon}
                  </span>
                  <span
                    className={`relative z-10 ${
                      isActive ? "text-[var(--nav-active-text)]" : ""
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Hover effect for non-active items */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-[var(--nav-hover-bg)] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Logo/Brand */}
          <div className="md:hidden">
            <Link
              href={`/${lng}`}
              prefetch={true}
              className="group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-secondary to-warning rounded-xl text-secondary-foreground font-bold text-lg hover:shadow-lg transition-all duration-150 relative overflow-hidden active:scale-95"
              aria-label="Mustofa Amami - Home"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-warning to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <span className="relative z-10 group-hover:scale-110 transition-transform duration-150">
                MA
              </span>
            </Link>
          </div>

          {/* Language and Theme Switchers */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher lng={lng} />
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </motion.header>
  );
});
