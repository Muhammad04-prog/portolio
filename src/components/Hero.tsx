import { useApp } from "../context/AppContext";
import { ArrowDown, Code, Sparkles, Layers } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  const { t, navigateTo } = useApp();

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between px-6 sm:px-8 py-12 md:py-16 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative top grid coordinates */}
      <div className="absolute top-4 right-8 font-mono text-[10px] text-text-light/30 dark:text-text-dark/30 select-none pointer-events-none hidden lg:block">
        SYS_LOC // 38.5598° N, 68.7870° E // DUSHANBE
      </div>

      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Huge Headlines */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          {/* Subtle Monospace Category Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent font-mono text-xs w-fit mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>[ FRONTEND ENGINEER ]</span>
          </motion.div>

          {/* Epic Oversized Bold Typography Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7vw] font-bold tracking-tighter leading-none text-text-light dark:text-text-dark"
            id="hero-heading"
          >
            <span className="font-serif italic font-medium block text-accent">Rahmatsho Muhammad</span>
            <span className="block uppercase font-sans tracking-tight">Portfolio</span>
          </motion.h1>

          {/* Subtitle / Pitch Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-text-light/80 dark:text-text-dark/80 max-w-xl leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Actions & Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              onClick={() => navigateTo("#/projects")}
              className="px-6 py-3.5 bg-accent text-white dark:text-black dark:bg-white rounded-xl text-sm font-medium hover:bg-accent/90 dark:hover:bg-white/90 transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-accent/40 dark:shadow-none cursor-pointer flex items-center gap-2 group"
              id="hero-cta-projects"
            >
              <span>{t("hero.projects_cta")}</span>
              <Layers className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigateTo("#/contact")}
              className="px-6 py-3.5 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark rounded-xl text-sm font-medium hover:border-accent hover:text-accent dark:hover:border-accent dark:hover:text-accent transition-all duration-300 cursor-pointer flex items-center gap-2 group"
              id="hero-cta-contact"
            >
              <span>{t("hero.contact_cta")}</span>
              <Code className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Decorative Monospace Technical Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-4 border border-border-light dark:border-border-dark bg-black/5 dark:bg-white/5 rounded-2xl p-6 font-mono text-xs text-text-light/70 dark:text-text-dark/70 relative backdrop-blur-sm self-center max-w-md lg:max-w-none"
        >
          <div className="absolute top-3 left-4 flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></span>
          </div>
          <div className="absolute top-2.5 right-4 text-[9px] opacity-40">RAHMATSHO_MUHAMMAD.TS</div>

          <div className="mt-6 space-y-4 font-mono leading-relaxed">
            <p className="text-accent">// Core Core Tech Stack Capabilities</p>
            <div>
              <span className="text-emerald-500">const</span> <span className="text-blue-400">developer</span> = &#123;
              <div className="pl-4">
                name: <span className="text-amber-300">"Rahmatsho Muhammad"</span>,
                city: <span className="text-amber-300">"Dushanbe"</span>,
                stack: [<span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Next.js"</span>, <span className="text-amber-300">"TypeScript"</span>, <span className="text-amber-300">"Prisma"</span>],
                philosophy: <span className="text-amber-300">"Sequential_Epics"</span>
              </div>
              &#125;;
            </div>

            <div className="border-t border-border-light/40 dark:border-border-dark/40 pt-4 space-y-1">
              <p className="text-[10px] text-text-light/50 dark:text-text-dark/50">SYSTEM PERFORMANCE</p>
              <div className="flex justify-between">
                <span>Vite Bundler Speed:</span>
                <span className="text-emerald-400">0.08s (Sub-1s limit)</span>
              </div>
              <div className="flex justify-between">
                <span>Core Stack Quality:</span>
                <span className="text-purple-400">Prisma 6 / Postgres</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
        onClick={() => navigateTo("#/projects")}
        className="mx-auto flex flex-col items-center gap-2 cursor-pointer text-text-light/50 dark:text-text-dark/50 hover:text-accent dark:hover:text-accent transition-colors font-mono text-[10px]"
      >
        <span>{t("hero.scroll_indicator")}</span>
        <ArrowDown className="h-3.5 w-3.5" />
      </motion.div>
    </section>
  );
}
