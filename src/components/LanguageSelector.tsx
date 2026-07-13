"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "../i18n/routing";
import { useLocale } from "next-intl";
import { Locale } from "../types";
import { Globe, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const languages: { code: Locale; name: string; nativeName: string }[] = [
    { code: "tj", name: "Tajik", nativeName: "Тоҷикӣ" },
    { code: "ru", name: "Russian", nativeName: "Русский" },
    { code: "en", name: "English", nativeName: "English" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef} id="language-selector-container">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium text-text-light/80 dark:text-text-dark/80 hover:text-accent dark:hover:text-accent hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
        id="language-selector-button"
      >
        <Globe className="h-3.5 w-3.5 text-text-light/60 dark:text-text-dark/60" />
        <span className="uppercase">{locale}</span>
        <ChevronDown className={`h-3 w-3 opacity-60 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Options List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-40 origin-top-right rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-bg-dark shadow-xl backdrop-blur-md z-50 overflow-hidden py-1.5"
            role="menu"
            id="language-selector-dropdown"
          >
            {languages.map((lang) => {
              const isSelected = lang.code === locale;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    router.replace(pathname, { locale: lang.code });
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs transition-colors duration-150 cursor-pointer ${
                    isSelected
                      ? "text-accent font-medium bg-accent/5"
                      : "text-text-light/70 dark:text-text-dark/70 hover:text-text-light dark:hover:text-text-dark hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                  role="menuitem"
                  id={`lang-option-${lang.code}`}
                >
                  <div className="flex flex-col">
                    <span className="font-sans font-semibold text-[11px]">{lang.nativeName}</span>
                    <span className="font-mono text-[9px] opacity-50 tracking-wider uppercase">{lang.name}</span>
                  </div>
                  {isSelected && (
                    <motion.div
                      layoutId="activeLangCheck"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <Check className="h-3.5 w-3.5 text-accent stroke-[2.5]" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
