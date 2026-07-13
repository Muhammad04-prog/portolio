import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, Project } from "../types";
import { messages } from "../data/messages";
import { projects } from "../data/projects";

type PageType = "home" | "about" | "projects" | "project-detail" | "contact";

interface AppContextType {
  theme: "dark" | "light";
  toggleTheme: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  currentPage: PageType;
  currentProjectSlug: string | null;
  currentProject: Project | null;
  navigateTo: (hash: string) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Theme Management
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return saved === "light" ? "light" : "dark";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Locale Management
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem("portfolio-locale");
    if (saved === "tj" || saved === "ru" || saved === "en") return saved as Locale;
    return "ru"; // default locale
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("portfolio-locale", newLocale);
  };

  // Hash-based Routing Management
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [currentProjectSlug, setCurrentProjectSlug] = useState<string | null>(null);

  const parseHash = () => {
    const hash = window.location.hash;
    if (!hash || hash === "#" || hash === "#/") {
      setCurrentPage("home");
      setCurrentProjectSlug(null);
    } else if (hash === "#/about") {
      setCurrentPage("about");
      setCurrentProjectSlug(null);
    } else if (hash === "#/projects") {
      setCurrentPage("projects");
      setCurrentProjectSlug(null);
    } else if (hash === "#/contact") {
      setCurrentPage("contact");
      setCurrentProjectSlug(null);
    } else if (hash.startsWith("#/projects/")) {
      const slug = hash.replace("#/projects/", "");
      setCurrentPage("project-detail");
      setCurrentProjectSlug(slug);
    } else {
      setCurrentPage("home");
      setCurrentProjectSlug(null);
    }
  };

  useEffect(() => {
    parseHash();
    window.addEventListener("hashchange", parseHash);
    return () => window.removeEventListener("hashchange", parseHash);
  }, []);

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
  };

  const currentProject = currentProjectSlug
    ? projects.find((p) => p.slug === currentProjectSlug) || null
    : null;

  // Translation Helper
  const t = (key: string): string => {
    const translation = messages[key];
    if (!translation) return key;
    return translation[locale] || translation["en"] || key;
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        locale,
        setLocale,
        currentPage,
        currentProjectSlug,
        currentProject,
        navigateTo,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
