import { useApp } from "../context/AppContext";
import { MapPin, Blocks, Compass, Code } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const { t } = useApp();

  const skillsList = [
    "Next.js 15 (App Router)",
    "React 19 & Vite",
    "TypeScript (Strict)",
    "Prisma 6 ORM",
    "Tailwind CSS v4",
    "Framer Motion / Motion",
    "PostgreSQL & Neon",
    "Zod & React Hook Form",
    "Redux Toolkit",
    "REST & GraphQL APIs",
    "Express & Node.js",
    "Git & GitHub Monorepos"
  ];

  return (
    <section className="px-6 sm:px-8 py-20 max-w-7xl mx-auto" id="about-section">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2">[ {t("nav.about")} ]</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-sans text-text-light dark:text-text-dark">
            {t("about.heading")}
          </h2>
        </div>
        <p className="text-text-light/70 dark:text-text-dark/70 max-w-md text-sm sm:text-base leading-relaxed">
          {t("about.sub_heading")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Biography Paragraphs */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-xl text-text-light/95 dark:text-text-dark/95 leading-relaxed font-sans"
          >
            {t("about.bio")}
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-4 p-5 rounded-2xl border border-border-light dark:border-border-dark bg-black/5 dark:bg-white/5"
            >
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-text-light/40 dark:text-text-dark/40 uppercase block mb-0.5">
                  {t("about.location_title")}
                </span>
                <span className="text-sm font-semibold text-text-light dark:text-text-dark">
                  {t("about.location_val")}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-start gap-4 p-5 rounded-2xl border border-border-light dark:border-border-dark bg-black/5 dark:bg-white/5"
            >
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-text-light/40 dark:text-text-dark/40 uppercase block mb-0.5">
                  {t("about.philosophy_title")}
                </span>
                <span className="text-xs text-text-light dark:text-text-dark leading-relaxed block">
                  {t("about.philosophy_val")}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right: Technical Skills List & Monospace elements */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-border-light dark:border-border-dark rounded-3xl p-6 sm:p-8 bg-black/5 dark:bg-white/5 relative overflow-hidden">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Blocks className="h-24 w-24 text-accent" />
            </div>

            <div className="flex items-center gap-2 mb-6">
              <Code className="h-5 w-5 text-accent" />
              <h3 className="font-mono text-xs font-bold tracking-wider text-text-light dark:text-text-dark uppercase">
                // {t("about.stack_title")}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skillsList.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-2 font-mono text-xs text-text-light/80 dark:text-text-dark/80"
                >
                  <span className="text-accent">›</span>
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
