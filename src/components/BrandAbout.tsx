"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin } from "lucide-react";
import { motion } from "motion/react";

export default function BrandAbout() {
  const t = useTranslations();

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center select-none font-sans">
      
      {/* LEFT COLUMN: Biography & Social Connections */}
      <div className="lg:col-span-7 space-y-8 max-w-xl">
        <div className="space-y-6 text-white/80 text-sm sm:text-base md:text-lg leading-relaxed font-sans font-light">
          <p className="first-line:font-semibold first-line:text-white first-line:tracking-wide">
            {t("about.bio")}
          </p>
          <p>
            {t("about.philosophy_val")}
          </p>
        </div>

        {/* Social Icons matching Screenshot 3 */}
        <div className="flex items-center gap-6 pt-4">
          <a
            href="https://github.com/Muhammad04-prog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors cursor-pointer"
            aria-label="GitHub Profile"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* RIGHT COLUMN: Custom M # 04 Tech branding monogram SVG */}
      <div className="lg:col-span-5 flex justify-center lg:justify-end">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[400px] aspect-[4/3] flex items-center justify-center p-6 border border-white/5 bg-black/10 rounded-2xl"
        >
          {/* Custom M # 04 Vector Monogram */}
          <svg viewBox="0 0 400 300" className="w-full h-full text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="monogramGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.6" />
              </linearGradient>
              <filter id="vectorGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Letter 'M' (for Muhammad) */}
            <path
              d="M 40,240 L 40,80 L 90,160 L 140,80 L 140,240"
              stroke="url(#monogramGlow)"
              strokeWidth="24"
              strokeLinecap="square"
              strokeLinejoin="miter"
              filter="url(#vectorGlow)"
            />

            {/* Symbol '#' (Tech grid indicator) */}
            <g opacity="0.8">
              {/* Vertical lines */}
              <line x1="190" y1="90" x2="190" y2="210" stroke="white" strokeWidth="12" />
              <line x1="220" y1="90" x2="220" y2="210" stroke="white" strokeWidth="12" />
              {/* Horizontal lines */}
              <line x1="170" y1="125" x2="240" y2="125" stroke="white" strokeWidth="12" />
              <line x1="170" y1="175" x2="240" y2="175" stroke="white" strokeWidth="12" />
            </g>

            {/* Numbers '04' (from Muhammad04) */}
            <g transform="translate(260, 80)">
              {/* Digits 04 block styled */}
              {/* Digit 0 */}
              <rect
                x="10"
                y="0"
                width="40"
                height="160"
                rx="6"
                stroke="white"
                strokeWidth="16"
              />
              <line x1="20" y1="130" x2="40" y2="30" stroke="white" strokeWidth="8" opacity="0.3" />

              {/* Digit 4 */}
              <path
                d="M 65,0 L 65,100 L 105,100 M 100,0 L 100,160"
                stroke="white"
                strokeWidth="16"
                strokeLinecap="square"
              />
            </g>
            
          </svg>
        </motion.div>
      </div>

    </div>
  );
}
