"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { projects } from "../data/projects";
import { Locale } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function WorkCarousel() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const [activeIndex, setActiveIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentProject = projects[activeIndex];
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // 2D Physics Floating Skill Bubbles Cluster
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const skills = [
      { name: "TypeScript", radius: 52 },
      { name: "Next.js", radius: 46 },
      { name: "React", radius: 44 },
      { name: "Node.js", radius: 46 },
      { name: "Python", radius: 42 },
      { name: "Prisma", radius: 42 },
      { name: "Postgres", radius: 44 },
      { name: "Docker", radius: 44 },
      { name: "Solidity", radius: 44 },
      { name: "Foundry", radius: 44 },
      { name: "n8n", radius: 36 },
      { name: "MongoDB", radius: 46 },
    ];

    // Physics bubble representation
    class Bubble {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      name: string;
      color: string;
      textColor: string;

      constructor(name: string, radius: number, cx: number, cy: number) {
        this.name = name;
        this.radius = radius;
        // Position randomly around center to avoid spawning stacked together
        this.x = cx + (Math.random() - 0.5) * 160;
        this.y = cy + (Math.random() - 0.5) * 160;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.color = "white";
        this.textColor = "black";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off bounds
        if (this.x - this.radius < 0) {
          this.x = this.radius;
          this.vx *= -1;
        } else if (this.x + this.radius > width) {
          this.x = width - this.radius;
          this.vx *= -1;
        }

        if (this.y - this.radius < 0) {
          this.y = this.radius;
          this.vy *= -1;
        } else if (this.y + this.radius > height) {
          this.y = height - this.radius;
          this.vy *= -1;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();

        // Outline border
        context.strokeStyle = "rgba(255,255,255,0.15)";
        context.lineWidth = 1;
        context.stroke();

        // Skill Name Text
        context.fillStyle = this.textColor;
        context.font = "bold 11px 'Oxanium', sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(this.name, this.x, this.y);
      }
    }

    const cx = width / 2;
    const cy = height / 2;
    const bubbles = skills.map((s) => new Bubble(s.name, s.radius, cx, cy));

    // Handle bubble-to-bubble elastic collisions
    const checkCollisions = () => {
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const b1 = bubbles[i];
          const b2 = bubbles[j];

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const distance = Math.hypot(dx, dy);
          const minDistance = b1.radius + b2.radius;

          if (distance < minDistance) {
            // Push them apart to prevent overlapping
            const overlap = minDistance - distance;
            const nx = dx / distance;
            const ny = dy / distance;

            b1.x -= nx * overlap * 0.5;
            b1.y -= ny * overlap * 0.5;
            b2.x += nx * overlap * 0.5;
            b2.y += ny * overlap * 0.5;

            // Elastic collision velocities recalculation
            const kx = b1.vx - b2.vx;
            const ky = b1.vy - b2.vy;
            const p = 2 * (nx * kx + ny * ky) / 2; // Equal masses

            b1.vx -= p * nx;
            b1.vy -= p * ny;
            b2.vx += p * nx;
            b2.vy += p * ny;
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      bubbles.forEach((b) => b.update());
      checkCollisions();
      bubbles.forEach((b) => b.draw(ctx));

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch select-none font-sans">
      
      {/* LEFT: Experience/Project Details Carousel */}
      <div className="lg:col-span-7 flex flex-col justify-between py-2 relative min-h-[50vh] lg:min-h-none">
        
        {/* Navigation Arrows on Side */}
        <button
          onClick={handlePrev}
          className="absolute left-[-24px] sm:left-[-40px] top-1/2 -translate-y-1/2 p-2.5 rounded-full border border-white/10 bg-black/40 hover:border-accent hover:text-accent transition-colors z-20 cursor-pointer"
          aria-label="Previous Project"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-[-24px] sm:right-[-40px] top-1/2 -translate-y-1/2 p-2.5 rounded-full border border-white/10 bg-black/40 hover:border-accent hover:text-accent transition-colors z-20 cursor-pointer"
          aria-label="Next Project"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>

        {/* Carousel Content details wrapper */}
        <div className="my-auto px-4 max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.slug}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                  {currentProject.title[locale] || currentProject.title["en"]}
                </h2>
                <span className="font-mono text-xs text-accent tracking-widest uppercase block mt-1">
                  {currentProject.category[locale] || currentProject.category["en"]}
                </span>
                <span className="font-mono text-[10px] text-white/40 block mt-0.5">
                  Deployment Status // {currentProject.metrics}
                </span>
              </div>

              {/* Experience list */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-white/50">Details & Experience</h3>
                <ul className="space-y-3 font-sans text-sm sm:text-base text-white/80 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-semibold">›</span>
                    <span>{currentProject.tagline[locale] || currentProject.tagline["en"]}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-semibold">›</span>
                    <span>{currentProject.problem[locale] || currentProject.problem["en"]}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-semibold">›</span>
                    <span>{currentProject.solution[locale] || currentProject.solution["en"]}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-semibold">›</span>
                    <span>{currentProject.result[locale] || currentProject.result["en"]}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i ? "w-6 bg-white" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>

      {/* RIGHT: Technical Skills interactive floating bubble Canvas */}
      <div className="lg:col-span-5 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-8 relative min-h-[45vh] lg:min-h-none">
        <h3 className="font-sans text-lg font-bold tracking-tight text-white mb-4 pl-4">
          Technical Skills
        </h3>
        <div className="relative w-full flex-grow overflow-hidden bg-black/10 rounded-2xl border border-white/5">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full min-h-[350px] lg:min-h-[450px]"
          />
        </div>
      </div>

    </div>
  );
}
