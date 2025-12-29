"use client";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { memo, useMemo, useState } from "react";

interface SmartFooterProps {
  lng: string;
}

export const SmartFooter = memo(function SmartFooter({
  lng,
}: SmartFooterProps) {
  const pathname = usePathname();
  const { t, ready } = useTranslation(lng);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  const navItems = useMemo(
    () => [
      { href: `/${lng}`, label: t("nav.home") || "Home", icon: "🏠" },
      {
        href: `/${lng}/resume`,
        label: t("nav.resume") || "Resume",
        icon: "📄",
      },
      {
        href: `/${lng}/portfolio`,
        label: t("nav.portfolio") || "Portfolio",
        icon: "💼",
      },
      { href: `/${lng}/blog`, label: t("nav.blog") || "Blog", icon: "📝" },
      {
        href: `/${lng}/contact`,
        label: t("nav.contact") || "Contact",
        icon: "📧",
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

  // Always render the navigation, even if translations aren't ready yet
  // This ensures mobile navigation is always visible
  return (
    <motion.nav
      className="sticky bottom-0 left-0 right-0 md:hidden z-50"
      initial={{ y: 0 }}
      animate={{ y: isHidden ? "100%" : 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex justify-around p-3 bg-background/95 backdrop-blur-sm border-t border-border shadow-sm">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className={`group flex flex-col items-center text-sm font-medium transition-all duration-200 relative overflow-hidden rounded-lg p-2 min-w-[64px] active:scale-95 ${
                isActive ? "text-foreground" : "text-foreground hover:shadow-sm"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Active indicator - chip style */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-[var(--nav-active-bg)] rounded-lg shadow-sm"
                  layoutId="mobile-navbar-active"
                  transition={{
                    type: "spring",
                    bounce: 0.15,
                    duration: 0.4,
                  }}
                />
              )}

              {/* Content */}
              <span className="relative z-10 text-lg mb-1 group-hover:scale-110 transition-transform duration-150">
                {item.icon}
              </span>
              <span
                className={`relative z-10 text-xs ${
                  isActive ? "text-[var(--nav-active-text)]" : ""
                }`}
              >
                {item.label}
              </span>

              {/* Hover effect for non-active items */}
              {!isActive && (
                <div className="absolute inset-0 bg-accent/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
});
