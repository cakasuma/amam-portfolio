"use client";
import { LanguageSwitcher } from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { memo, useMemo } from "react";

export const Navigation = memo(function Navigation({ lng }: { lng: string }) {
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
    <>
      {/* Desktop Language/Theme Switcher */}
      <div className="fixed top-4 right-4 flex items-center gap-3 z-50">
        <LanguageSwitcher lng={lng} />
        <ThemeSwitcher />
      </div>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden z-50">
        <div className="flex justify-around p-4 bg-slate-900/95 backdrop-blur-lg border-t border-blue-500/20">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center text-sm transition-colors ${
                  isActive ? "text-white" : "text-blue-200 hover:text-white"
                }`}
              >
                <span className="text-lg mb-1">{item.icon}</span>
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
});
