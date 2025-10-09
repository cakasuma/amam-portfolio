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
      className="p-3 rounded-xl glass hover:bg-blue-500/20 dark:hover:bg-blue-400/20 
                transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl
                border border-blue-400/30 dark:border-blue-400/40"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
    >
      {resolvedTheme === "dark" ? (
        <FiSun className="w-5 h-5 text-yellow-400 transition-colors duration-300" />
      ) : (
        <FiMoon className="w-5 h-5 text-blue-600 transition-colors duration-300" />
      )}
    </motion.button>
  );
}
