"use client";

import Link from "next/link";
import { languages } from "../i18n/settings";
import { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

export function LanguageSwitcher({ lng }: { lng: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`border-runner relative p-3 rounded-lg bg-accent border border-border hover:bg-background transition-colors duration-150 flex items-center gap-2 cursor-pointer active:scale-95 ${
          isOpen ? "active" : ""
        }`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Switch language"
        aria-expanded={isOpen}
      >
        <span className="relative z-10 text-sm text-foreground font-medium">
          {lng.toUpperCase()}
        </span>
        <FiChevronDown
          className={`relative z-10 w-4 h-4 text-foreground transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="anim-fade-up absolute top-full right-0 mt-2 bg-background/95 backdrop-blur-md border border-border rounded-lg overflow-hidden min-w-[56px] z-[9999] shadow-lg"
          style={{ animationDuration: "150ms" }}
        >
          {languages
            .filter((l) => lng !== l)
            .map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                prefetch={true}
                className="block px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors duration-150"
                onClick={() => setIsOpen(false)}
              >
                {l.toUpperCase()}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
