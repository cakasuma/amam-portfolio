"use client";
import { motion } from "motion/react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

export function Navigation({ lng }: { lng: string }) {
  return (
    <motion.div
      className="fixed top-4 right-4 flex items-center gap-4 z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <LanguageSwitcher lng={lng} />
      <ThemeSwitcher />
    </motion.div>
  );
}
