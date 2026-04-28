"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { memo, useEffect, useMemo, useRef, useState } from "react";

interface SmartFooterProps {
  lng: string;
}

function useHideOnScroll(threshold: number = 150) {
  const [isHidden, setIsHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const prev = lastY.current;
        if (y > prev && y > threshold) {
          setIsHidden((h) => (h ? h : true));
        } else if (y < prev) {
          setIsHidden((h) => (h ? false : h));
        }
        lastY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return isHidden;
}

export const SmartFooter = memo(function SmartFooter({ lng }: SmartFooterProps) {
  const pathname = usePathname();
  const { t } = useTranslation(lng);
  const isHidden = useHideOnScroll(150);

  const navItems = useMemo(
    () => [
      { href: `/${lng}`, label: t("nav.home") || "Home", icon: "🏠" },
      { href: `/${lng}/resume`, label: t("nav.resume") || "Resume", icon: "📄" },
      { href: `/${lng}/portfolio`, label: t("nav.portfolio") || "Portfolio", icon: "💼" },
      { href: `/${lng}/blog`, label: t("nav.blog") || "Blog", icon: "📝" },
      { href: `/${lng}/contact`, label: t("nav.contact") || "Contact", icon: "📧" },
    ],
    [lng, t]
  );

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 md:hidden z-50 smart-bar-transition ${
        isHidden ? "footer-nav-hidden" : ""
      }`}
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
              className={`group flex flex-col items-center text-sm font-medium transition-colors duration-150 relative overflow-hidden rounded-lg p-2 min-w-[64px] active:scale-95 text-foreground ${
                isActive ? "bg-[var(--nav-active-bg)] shadow-sm" : ""
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="text-lg mb-1 group-hover:scale-110 transition-transform duration-150">
                {item.icon}
              </span>
              <span className={`text-xs ${isActive ? "text-[var(--nav-active-text)]" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
});
