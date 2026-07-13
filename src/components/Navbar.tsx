import { useApp } from "../context/AppContext";
import { Sun, Moon, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import LanguageSelector from "./LanguageSelector";

export default function Navbar() {
  const { theme, toggleTheme, currentPage, navigateTo, t } = useApp();

  const navItems: { id: "home" | "about" | "projects" | "contact"; hash: string }[] = [
    { id: "home", hash: "#/" },
    { id: "about", hash: "#/about" },
    { id: "projects", hash: "#/projects" },
    { id: "contact", hash: "#/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-light/40 bg-bg-light/80 backdrop-blur-md dark:border-border-dark/40 dark:bg-bg-dark/80 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Logo / Monogram */}
        <button
          onClick={() => navigateTo("#/")}
          className="font-serif text-xl font-bold tracking-tight text-text-light dark:text-text-dark cursor-pointer group flex items-center gap-1.5"
          id="nav-logo"
        >
          <span>M.</span>
          <span className="font-mono text-xs text-accent opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            [Dushanbe]
          </span>
        </button>

        {/* Central Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.id || (item.id === "projects" && currentPage === "project-detail");
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.hash)}
                className="relative py-2 text-sm font-medium transition-colors duration-200 cursor-pointer text-text-light/70 hover:text-text-light dark:text-text-dark/70 dark:hover:text-text-dark"
                id={`nav-link-${item.id}`}
              >
                {t(`nav.${item.id}`)}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* System Controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Multilingual Selector */}
          <LanguageSelector />

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer relative overflow-hidden"
            id="theme-toggle"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ y: 20, rotate: 45, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  exit={{ y: -20, rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-4 w-4 text-accent" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ y: 20, rotate: -45, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  exit={{ y: -20, rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-4 w-4 text-accent" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Quick Contact CTA */}
          <button
            onClick={() => navigateTo("#/contact")}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border-light dark:border-border-dark text-xs font-mono font-medium hover:border-accent hover:text-accent dark:hover:border-accent dark:hover:text-accent transition-all duration-300 cursor-pointer"
            id="quick-contact-button"
          >
            <span>{t("nav.contact")}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Nav Rail */}
      <div className="flex md:hidden items-center justify-around border-t border-border-light/20 dark:border-border-dark/20 py-2.5 bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-md">
        {navItems.map((item) => {
          const isActive = currentPage === item.id || (item.id === "projects" && currentPage === "project-detail");
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.hash)}
              className={`text-xs font-medium cursor-pointer transition-colors duration-200 ${
                isActive ? "text-accent" : "text-text-light/60 dark:text-text-dark/60"
              }`}
              id={`mobile-nav-${item.id}`}
            >
              {t(`nav.${item.id}`)}
            </button>
          );
        })}
      </div>
    </header>
  );
}
