"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { LanguageSwitcher } from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { memo, useEffect, useMemo, useRef, useState } from "react";

interface SmartHeaderProps {
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

export const SmartHeader = memo(function SmartHeader({ lng }: SmartHeaderProps) {
  const pathname = usePathname();
  const { t } = useTranslation(lng);
  const isHidden = useHideOnScroll(150);

  const navItems = useMemo(
    () => [
      { href: `/${lng}`, label: t("nav.home") || "Home", icon: "🏠", ariaLabel: "Navigate to home page" },
      { href: `/${lng}/resume`, label: t("nav.resume") || "Resume", icon: "📄", ariaLabel: "View my resume and experience" },
      { href: `/${lng}/portfolio`, label: t("nav.portfolio") || "Portfolio", icon: "💼", ariaLabel: "Browse my portfolio projects" },
      { href: `/${lng}/blog`, label: t("nav.blog") || "Blog", icon: "📝", ariaLabel: "Read my blog posts" },
      { href: `/${lng}/contact`, label: t("nav.contact") || "Contact", icon: "📧", ariaLabel: "Get in touch with me" },
    ],
    [lng, t]
  );

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm header-shadow smart-bar-transition ${
        isHidden ? "header-hidden" : ""
      }`}
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto px-4 py-3"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          <div className="hidden md:flex items-center gap-1 bg-accent rounded-xl p-3 border border-border shadow-sm">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 relative overflow-hidden text-foreground ${
                    isActive ? "bg-[var(--nav-active-bg)] shadow-sm" : "hover:bg-[var(--nav-hover-bg)]"
                  }`}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-150">
                    {item.icon}
                  </span>
                  <span className={isActive ? "text-[var(--nav-active-text)]" : ""}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="md:hidden">
            <Link
              href={`/${lng}`}
              prefetch={true}
              className="group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-secondary to-warning rounded-xl text-secondary-foreground font-bold text-lg hover:shadow-lg transition-all duration-150 active:scale-95"
              aria-label="Mustofa Amami - Home"
            >
              <span className="group-hover:scale-110 transition-transform duration-150">MA</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher lng={lng} />
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
});
