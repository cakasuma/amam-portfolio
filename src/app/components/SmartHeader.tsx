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
  const { t } = useTranslation(lng);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  const navItems = useMemo(
    () => [
      { href: `/${lng}`, label: t("nav.home"), icon: "🏠" },
      { href: `/${lng}/resume`, label: t("nav.resume"), icon: "📄" },
      { href: `/${lng}/portfolio`, label: t("nav.portfolio"), icon: "💼" },
      { href: `/${lng}/blog`, label: t("nav.blog"), icon: "📝" },
      { href: `/${lng}/contact`, label: t("nav.contact"), icon: "📧" },
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

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-blue-500/20 dark:border-blue-400/30 transition-all duration-300"
      initial={{ y: 0 }}
      animate={{ y: isHidden ? "-100%" : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 glass rounded-full p-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 dark:bg-blue-700 text-white shadow-lg"
                      : "text-blue-700 dark:text-blue-200 hover:text-white hover:bg-blue-500/20 dark:hover:bg-blue-400/20"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Logo/Brand */}
          <div className="md:hidden">
            <Link
              href={`/${lng}`}
              className="flex items-center justify-center w-10 h-10 bg-blue-600 dark:bg-blue-700 rounded-full text-white font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-lg"
            >
              MA
            </Link>
          </div>

          {/* Language and Theme Switchers */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher lng={lng} />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </motion.header>
  );
});
