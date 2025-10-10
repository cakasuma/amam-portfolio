"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.button
      className="p-3 rounded-lg bg-accent border border-border hover:bg-background transition-colors duration-200 cursor-pointer focus-ring"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${
        resolvedTheme === "dark" ? "light" : "dark"
      } theme`}
    >
      {resolvedTheme === "dark" ? (
        <FiSun className="w-5 h-5 text-warning" />
      ) : (
        <FiMoon className="w-5 h-5 text-primary" />
      )}
    </motion.button>
  );
}
