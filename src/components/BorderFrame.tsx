"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "../i18n/routing";
import { useTranslations } from "next-intl";

export default function BorderFrame({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "work", label: "Work", path: "/projects" },
    { id: "about", label: "About", path: "/about" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#060606] text-[#f2f2f0] p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden">
      
      {/* 1. Tech Border Line Overlay */}
      <div 
        className="absolute inset-4 sm:inset-6 md:inset-8 border border-white/10 pointer-events-none z-30"
        style={{
          clipPath: "polygon(0 0, calc(100% - 220px) 0, calc(100% - 190px) 30px, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))"
        }}
      />

      {/* 2. Floating Navigation Pill inside the cutout */}
      <nav className="absolute top-6 sm:top-8 md:top-10 right-6 sm:right-8 md:right-10 z-40">
        <div className="flex items-center bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-1 sm:p-1.5 shadow-2xl">
          {navItems.map((item) => {
            const isActive = item.id === "home" 
              ? pathname === "/" 
              : pathname.startsWith(item.path);
            
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`relative px-4 sm:px-5 py-1.5 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-black bg-white shadow-md scale-105"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 3. Main content area (inside the border container) */}
      <div className="relative flex-grow w-full h-full z-10 px-2 sm:px-6 md:px-10 py-16 sm:py-20 md:py-24">
        {children}
      </div>

    </div>
  );
}
