"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "./MotionLink";
import { languages } from "../i18n/settings";
import { useState } from "react";
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

  return (
    <div className="relative">
      <motion.button
        className="p-2 rounded-lg bg-button-bg backdrop-blur-sm hover:bg-background/20 
                   transition-all duration-300 border border-border flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-sm text-text-primary">{lng.toUpperCase()}</span>
        <FiChevronDown
          className={`w-4 h-4 text-text-primary transition-transform duration-200 
                      ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 bg-button-bg backdrop-blur-sm 
               border border-border rounded-lg overflow-hidden min-w-[56px]"
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
                  className="block px-4 py-2 text-sm text-text-primary transition-colors duration-15"
                  whileHover={{ backgroundColor: "rgba(0,0,0, 0.1)" }}
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
