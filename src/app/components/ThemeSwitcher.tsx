"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const subscribeToNothing = () => () => {};

export default function ThemeSwitcher() {
  // `false` while server-rendering and on the hydration pass, `true` afterwards.
  // Guards against reading resolvedTheme before next-themes knows it.
  const mounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  );
  const { setTheme, resolvedTheme } = useTheme();

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="w-12 h-12 bg-accent border border-border rounded-lg"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="border-runner relative flex items-center justify-center w-12 h-12 rounded-lg bg-accent border border-border hover:bg-background hover:border-secondary transition-all duration-150 group cursor-pointer active:scale-95"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {isDark ? (
        <FiSun className="w-5 h-5 text-warning" />
      ) : (
        <FiMoon className="w-5 h-5 text-secondary" />
      )}
    </button>
  );
}
