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

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 md:hidden z-50"
      initial={{ y: 0 }}
      animate={{ y: isHidden ? "100%" : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex justify-around p-4 bg-background/95 backdrop-blur-sm border-t border-border">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center text-sm transition-colors focus-ring rounded-md p-2 ${
                isActive ? "text-primary" : "text-muted hover:text-foreground"
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
