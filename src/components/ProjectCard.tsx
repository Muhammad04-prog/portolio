import React, { useRef, useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Project } from "../types";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { motion, useSpring, useTransform, useMotionValue } from "motion/react";

interface ProjectCardProps {
  key?: string;
  project: Project;
  index: number;
  isWide: boolean;
}

export default function ProjectCard({ project, index, isWide }: ProjectCardProps) {
  const { t, locale, navigateTo } = useApp();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Motion values for tracking cursor position for 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Motion values for smooth radial glow position
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // Apply spring physics to rotational values for butter-smooth animation
  const springConfig = { damping: 20, stiffness: 150, mass: 0.6 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  // Parallax layers translation maps
  const imageTranslateX = useTransform(smoothRotateY, [-12, 12], [-10, 10]);
  const imageTranslateY = useTransform(smoothRotateX, [-12, 12], [10, -10]);
  const textTranslateX = useTransform(smoothRotateY, [-12, 12], [4, -4]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Coordinate of cursor relative to card center (ranging from -1 to 1)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);

    // Dynamic tilt rotation mapping (Max 12 degrees)
    rotateX.set(-mouseY * 12);
    rotateY.set(mouseX * 12);

    // Glow effect position tracking
    const percentageX = ((e.clientX - rect.left) / width) * 100;
    const percentageY = ((e.clientY - rect.top) / height) * 100;
    glowX.set(percentageX);
    glowY.set(percentageY);
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        rotateX: isMobile ? 0 : smoothRotateX,
        rotateY: isMobile ? 0 : smoothRotateY,
      }}
      className={`group flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-border-light dark:border-border-dark bg-black/5 dark:bg-white/5 backdrop-blur-sm hover:border-accent dark:hover:border-accent transition-all duration-300 relative overflow-hidden cursor-pointer ${
        isWide ? "md:col-span-2" : ""
      }`}
      onClick={() => navigateTo(`#/projects/${project.slug}`)}
    >
      {/* Dynamic Glow Spotlight follow effect inside the card */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(circle 350px at ${glowX.get()}% ${glowY.get()}%, rgba(124, 92, 255, 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* Grid Content wrapper using 3D translation for depth */}
      <div className="z-10" style={{ transform: "translateZ(30px)" }}>
        {/* Header Metadata */}
        <div className="flex items-center justify-between font-mono text-[10px] text-text-light/50 dark:text-text-dark/50 mb-6">
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-3.5 w-3.5 text-accent" />
            <span>{project.category[locale] || project.category["en"]}</span>
          </div>
          <span>{project.metrics}</span>
        </div>

        {/* Dynamic Title with tiny parallax offset */}
        <motion.h3
          style={{ x: isMobile ? 0 : textTranslateX }}
          className="text-2xl sm:text-3xl font-serif font-bold text-text-light dark:text-text-dark mb-3"
        >
          {project.title[locale] || project.title["en"]}
        </motion.h3>
        
        <p className="text-sm sm:text-base text-text-light/70 dark:text-text-dark/70 mb-6 max-w-xl">
          {project.tagline[locale] || project.tagline["en"]}
        </p>

        {/* Project tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-border-light dark:border-border-dark text-[10px] font-mono text-text-light/80 dark:text-text-dark/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card CTA & 3D Layer Parallax Mockup Frame */}
      <div 
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mt-auto z-10"
        style={{ transform: "translateZ(45px)" }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent duplicate navigation triggers
            navigateTo(`#/projects/${project.slug}`);
          }}
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-accent hover:text-accent/85 border-b border-accent/25 hover:border-accent pb-0.5 transition-all duration-200 cursor-pointer w-fit"
        >
          <span>{t("projects.view_case_study")}</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>

        {/* Elegant 3D Parallax image showcase preview */}
        <div className="relative w-full sm:w-64 h-36 rounded-2xl overflow-hidden border border-border-light/60 dark:border-border-dark/60 transform group-hover:scale-105 group-hover:shadow-lg transition-all duration-500 bg-black/10">
          <motion.img
            src={project.image}
            alt={project.title["en"]}
            style={{
              x: isMobile ? 0 : imageTranslateX,
              y: isMobile ? 0 : imageTranslateY,
              scale: isMobile ? 1 : 1.15,
            }}
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
          {/* Gritty Dark layout overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
}
