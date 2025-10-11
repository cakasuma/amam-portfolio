"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "./MotionLink";
import { languages } from "../i18n/settings";
import { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

/**
 * LanguageSwitcher is a component that renders a button allowing users to switch
 * between different languages for the site. It displays the current language and
 * provides a dropdown menu to select other languages. Clicking the button toggles
 * the dropdown, which lists languages other than the currently selected one.
 *
 * @param lng - The current language code, which is used to determine the displayed
 * language and the available options in the dropdown.
 */

export function LanguageSwitcher({ lng }: { lng: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        className="p-3 rounded-lg bg-accent border border-border hover:bg-background transition-colors duration-200 flex items-center gap-2 cursor-pointer focus-ring"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Switch language"
      >
        <span className="text-sm text-foreground font-medium">
          {lng.toUpperCase()}
        </span>
        <FiChevronDown
          className={`w-4 h-4 text-foreground transition-transform duration-200 
                      ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 backdrop-blur-md border rounded-lg overflow-hidden min-w-[56px] z-[9999] shadow-2xl"
            style={{
              background: "var(--glass-bg)",
              borderColor: "var(--glass-border)",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {languages
              .filter((l) => lng !== l)
              .map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  className="block px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors duration-150 focus-ring"
                  onClick={() => setIsOpen(false)}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
