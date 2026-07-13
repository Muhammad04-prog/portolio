"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "../i18n/routing";
import { projects } from "../data/projects";
import { Locale } from "../types";
import { ArrowLeft, ExternalLink, ShieldAlert, Cpu, Sparkles, Trophy } from "lucide-react";
import { motion } from "motion/react";

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const currentProject = projects.find((p) => p.slug === slug);
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const router = useRouter();

  if (!currentProject) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-bold font-serif mb-4">Project Not Found</h2>
        <button
          onClick={() => router.push("/projects")}
          className="px-5 py-2.5 bg-accent text-white rounded-lg cursor-pointer"
        >
          {t("projects.back")}
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto max-w-5xl px-6 sm:px-8 py-16"
    >
      {/* Back Button */}
      <button
        onClick={() => router.push("/projects")}
        className="inline-flex items-center gap-2 text-xs font-mono font-medium text-text-light/60 dark:text-text-dark/60 hover:text-accent dark:hover:text-accent transition-colors mb-12 cursor-pointer group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span>{t("projects.back")}</span>
      </button>

      {/* Title Header */}
      <div className="border-b border-border-light dark:border-border-dark pb-10 mb-12">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-accent mb-4 uppercase tracking-widest">
          <span>[ {currentProject.category[locale] || currentProject.category["en"]} ]</span>
          <span>•</span>
          <span className="text-text-light/50 dark:text-text-dark/50">{currentProject.metrics}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl sm:text-6xl font-bold font-serif text-text-light dark:text-text-dark tracking-tight mb-4">
              {currentProject.title[locale] || currentProject.title["en"]}
            </h1>
            <p className="text-lg sm:text-xl text-text-light/80 dark:text-text-dark/80 max-w-2xl leading-relaxed">
              {currentProject.tagline[locale] || currentProject.tagline["en"]}
            </p>
          </div>

          {currentProject.link && (
            <a
              href={currentProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-white dark:bg-white dark:text-black font-medium text-sm hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-accent/20"
            >
              <span>{t("projects.visit_live")}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* Hero Visual Mockup */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="relative aspect-video w-full rounded-3xl overflow-hidden border border-border-light dark:border-border-dark mb-16 shadow-lg bg-black/10"
      >
        <img
          src={currentProject.image}
          alt={currentProject.title["en"]}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Detailed Case Study Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
        {/* Core Case Study Content (8 cols) */}
        <div className="lg:col-span-8 space-y-12">
          {/* PROBLEM PANEL */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border-light dark:border-border-dark bg-black/5 dark:bg-white/5">
            <div className="flex items-center gap-3 mb-4 text-rose-500">
              <ShieldAlert className="h-5 w-5" />
              <h2 className="text-xl font-bold font-sans tracking-tight uppercase">
                {t("projects.problem")}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-text-light/80 dark:text-text-dark/80 leading-relaxed font-sans">
              {currentProject.problem[locale] || currentProject.problem["en"]}
            </p>
          </div>

          {/* SOLUTION PANEL */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border-light dark:border-border-dark bg-black/5 dark:bg-white/5">
            <div className="flex items-center gap-3 mb-4 text-emerald-500">
              <Cpu className="h-5 w-5" />
              <h2 className="text-xl font-bold font-sans tracking-tight uppercase">
                {t("projects.solution")}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-text-light/80 dark:text-text-dark/80 leading-relaxed font-sans">
              {currentProject.solution[locale] || currentProject.solution["en"]}
            </p>
          </div>

          {/* RESULT PANEL */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border-light dark:border-border-dark bg-black/5 dark:bg-white/5">
            <div className="flex items-center gap-3 mb-4 text-amber-500">
              <Trophy className="h-5 w-5" />
              <h2 className="text-xl font-bold font-sans tracking-tight uppercase">
                {t("projects.result")}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-text-light/80 dark:text-text-dark/80 leading-relaxed font-sans">
              {currentProject.result[locale] || currentProject.result["en"]}
            </p>
          </div>
        </div>

        {/* Sidebar Info Panels (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="border border-border-light dark:border-border-dark p-6 rounded-2xl bg-black/5 dark:bg-white/5 font-mono text-xs text-text-light/80 dark:text-text-dark/80">
            <div className="flex items-center gap-2 text-accent mb-4 uppercase font-semibold">
              <Sparkles className="h-4 w-4" />
              <span>{t("projects.tech_stack")}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-border-light dark:border-border-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Core metrics details */}
          <div className="border border-border-light dark:border-border-dark p-6 rounded-2xl bg-black/5 dark:bg-white/5 font-mono text-xs text-text-light/60 dark:text-text-dark/60">
            <p className="text-accent uppercase font-semibold mb-3">SYSTEM_LOGS</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>DEPLOYMENT_STATUS:</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span>TARGET_HOST:</span>
                <span className="text-text-light dark:text-text-dark">VERCEL / CLOUD</span>
              </div>
              <div className="flex justify-between">
                <span>API_ROUTING:</span>
                <span className="text-text-light dark:text-text-dark">SECURE / SERVER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
