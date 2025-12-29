"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { memo, useMemo } from "react";

interface StickyNavigationProps {
  lng: string;
}

export const StickyNavigation = memo(function StickyNavigation({ lng }: StickyNavigationProps) {
  const pathname = usePathname();
  const { t } = useTranslation(lng);

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

  return (
    <nav
      className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-blue-500/20 px-6 py-4 hidden md:block"
    >
      <div className="max-w-6xl mx-auto flex justify-center">
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-blue-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
});
