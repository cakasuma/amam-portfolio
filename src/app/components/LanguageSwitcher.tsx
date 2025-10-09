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
        className="p-3 rounded-xl glass hover:bg-blue-500/20 dark:hover:bg-blue-400/20 
                   transition-all duration-300 border border-blue-400/30 dark:border-blue-400/40 
                   flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Switch language"
      >
        <span className="text-sm text-blue-700 dark:text-blue-200 font-medium transition-colors duration-300">
          {lng.toUpperCase()}
        </span>
        <FiChevronDown
          className={`w-4 h-4 text-blue-700 dark:text-blue-200 transition-all duration-200 
                      ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 glass 
               border border-blue-400/30 dark:border-blue-400/40 rounded-xl overflow-hidden min-w-[56px] z-50 shadow-lg"
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
                  className="block px-4 py-3 text-sm text-blue-700 dark:text-blue-200 hover:bg-blue-500/20 dark:hover:bg-blue-400/20 transition-all duration-150"
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
