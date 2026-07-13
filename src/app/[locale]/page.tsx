import Hero from "../../components/Hero";
import ProjectsGrid from "../../components/ProjectsGrid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="border-t border-border-light/20 dark:border-border-dark/20" />
      <ProjectsGrid />
    </>
  );
}
