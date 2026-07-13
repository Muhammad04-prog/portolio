"use client";

import { useEffect, useState, ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "SELECT" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300 relative select-none">
      {/* Background aesthetic grain noise */}
      <div className="grain-overlay" />

      {/* Trailing Custom Cursor on non-mobile devices */}
      {!isMobile && (
        <div
          className="custom-cursor hidden md:block"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            width: isHovered ? "40px" : "16px",
            height: isHovered ? "40px" : "16px",
            backgroundColor: isHovered ? "rgba(124, 92, 255, 0.2)" : "rgba(124, 92, 255, 0.1)",
            borderColor: isHovered ? "rgb(124, 92, 255)" : "rgba(124, 92, 255, 0.6)",
          }}
        />
      )}

      {children}
    </div>
  );
}
