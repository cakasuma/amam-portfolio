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
    <motion.nav
      className="fixed bottom-0 left-0 right-0 md:hidden z-50"
      initial={{ y: 0 }}
      animate={{ y: isHidden ? "100%" : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
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
    </motion.nav>
  );
});
