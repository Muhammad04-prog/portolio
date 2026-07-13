import { useApp } from "../context/AppContext";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  const { t, locale } = useApp();

  return (
    <section className="px-6 sm:px-8 py-20 max-w-7xl mx-auto" id="projects-section">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2">[ {t("nav.projects")} ]</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-sans text-text-light dark:text-text-dark">
            {t("projects.heading")}
          </h2>
        </div>
        <p className="text-text-light/70 dark:text-text-dark/70 max-w-md text-sm sm:text-base leading-relaxed">
          {t("projects.sub_heading")}
        </p>
      </div>

      {/* Asymmetric Alternating Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((project, index) => {
          // Asymmetric visual weight: make certain items span 2 columns or look wider
          const isWide = index === 0 || index === 3;

          return (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              isWide={isWide}
            />
          );
        })}
      </div>
    </section>
  );
}
