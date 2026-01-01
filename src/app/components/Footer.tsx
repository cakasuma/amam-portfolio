"use client";
import { motion } from "motion/react";
import { useTranslation } from "@/app/i18n/client";
import { useState, useEffect } from "react";

interface FooterProps {
  lng: string;
}

export function Footer({ lng }: FooterProps) {
  const { t } = useTranslation(lng, "footer");
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <motion.footer
      className="bg-background/10 backdrop-blur-sm border-t border-border/50 py-8 px-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted">
              © <span suppressHydrationWarning>{currentYear}</span> Mustofa Amami. {t("rights-reserved")}
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
