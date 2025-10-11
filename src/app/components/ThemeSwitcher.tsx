"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-12 h-12 bg-accent border border-border rounded-lg animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      className="border-runner relative flex items-center justify-center w-12 h-12 rounded-lg bg-accent border border-border hover:bg-background hover:border-secondary transition-all duration-200 group cursor-pointer"
      whileHover="hover"
      whileTap="tap"
      variants={{
        hover: {},
        tap: {},
      }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-warning/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[3]"
        initial={false}
      />

      {/* Sun icon for dark mode (show sun when in dark mode) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 0.5,
        }}
        animate={{
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 0.5,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <FiSun className="w-5 h-5 text-warning" />
      </motion.div>

      {/* Moon icon for light mode (show moon when in light mode) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{
          opacity: !isDark ? 1 : 0,
          rotate: !isDark ? 0 : -180,
          scale: !isDark ? 1 : 0.5,
        }}
        animate={{
          opacity: !isDark ? 1 : 0,
          rotate: !isDark ? 0 : -180,
          scale: !isDark ? 1 : 0.5,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <FiMoon className="w-5 h-5 text-secondary" />
      </motion.div>

      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-br from-secondary/20 to-warning/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 z-[3]"
        initial={false}
      />
    </motion.button>
  );
}
