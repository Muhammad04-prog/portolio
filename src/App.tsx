import { useEffect, useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectsGrid from "./components/ProjectsGrid";
import ProjectDetail from "./components/ProjectDetail";
import ContactForm from "./components/ContactForm";
import { AnimatePresence, motion } from "motion/react";

function MainLayout() {
  const { currentPage } = useApp();
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Custom Cursor follow effect on desktop
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

      {/* Navigation Header */}
      <Navbar />

      {/* Primary Page Stage with seamless transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          >
            {currentPage === "home" && (
              <>
                <Hero />
                <div className="border-t border-border-light/20 dark:border-border-dark/20" />
                <ProjectsGrid />
              </>
            )}

            {currentPage === "about" && <About />}

            {currentPage === "projects" && <ProjectsGrid />}

            {currentPage === "project-detail" && <ProjectDetail />}

            {currentPage === "contact" && <ContactForm />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Unified Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
