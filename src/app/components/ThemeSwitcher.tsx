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
      className="p-2 rounded-lg bg-button-bg backdrop-blur-sm hover:bg-white/20 
                transition-all duration-300 border border-white/20 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <FiSun className="w-5 h-5 text-text-primary" />
      ) : (
        <FiMoon className="w-5 h-5 text-text-primary" />
      )}
    </motion.button>
  );
}
