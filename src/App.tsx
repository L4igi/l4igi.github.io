import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, List as ListIcon, Settings } from "lucide-react";

import "./styles/global.css";
import type { Category, ViewMode, Project } from "./types";
import { PROJECTS } from "./data/content";
import { useThemeSystem } from "./hooks/useThemeSystem";
import { LanguageProvider } from "./context/LanguageContext";

import { Scanlines } from "./components/ui/Scanlines";
import { BootSplash } from "./components/ui/BootSplash";
import { StatusBar } from "./components/ui/StatusBar";
import { ThemeBackground } from "./components/ui/ThemeBackground";
import { LivingBackground } from "./components/ui/LivingBackground";
import { FilterBar } from "./components/ui/FilterBar";
import { HeroCard } from "./components/projects/HeroCard";
import { ProjectPreview } from "./components/projects/ProjectPreview";
import { GameTile } from "./components/projects/GameTile";
import { ListRow } from "./components/projects/ListRow";
import { SystemSettings } from "./components/modals/SystemSettings.tsx";
import { AboutModal } from "./components/about/AboutModal.tsx";
import { GameScreen } from "./components/game/GameScreen.tsx";
import { LegalModal } from "./components/modals/LegalModal.tsx";
import type { Variants } from "motion";
import { GBCFilter } from "./components/ui/GBCFilter.tsx";
import { ToyBox } from "./components/ui/ToyBox.tsx";

const AppContent = () => {
  const { theme, updateTheme, toggleDarkMode } = useThemeSystem();

  const [currentTime, setCurrentTime] = useState("00:00");
  const [activeCategory, setActiveCategory] = useState<Category>("WORK");
  const [viewMode, setViewMode] = useState<ViewMode>("GRID");
  const [isBooting, setIsBooting] = useState(true);
  const [isLegalOpen, setIsLegalOpen] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hasEverHovered, setHasEverHovered] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isToyboxVisible, setIsToyboxVisible] = useState(false);

  const [showSystemSettings, setShowSystemSettings] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const isModalOpen = isAboutOpen || !!activeProject || isLegalOpen;

  const settingsButtonRef = useRef<HTMLButtonElement>(null);

  const [showControls, setShowControls] = useState(true);
  const scrollTimeout = useRef<number | null>(null);
  const isOpeningModal = useRef(false);

  const handleScroll = () => {
    if (showControls) setShowControls(false);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = window.setTimeout(() => setShowControls(true), 400);
  };

  const [backgroundPaused, setBackgroundPaused] = useState(false);

  useEffect(() => {
    const anyModalOpen =
      isAboutOpen || !!activeProject || showSystemSettings || isLegalOpen;

    if (anyModalOpen) {
      setBackgroundPaused(true);
    } else {
      const timer = setTimeout(() => setBackgroundPaused(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAboutOpen, activeProject, showSystemSettings, isLegalOpen]);

  // Updated filtering logic to handle LIKED category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "LIKED") {
      return PROJECTS.filter((p) => favorites.includes(p.id));
    }
    return activeCategory === "ALL"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory, favorites]);

  // Navigation Logic
  const handleNextProject = useCallback(() => {
    if (!activeProject || filteredProjects.length === 0) return;
    const currentIndex = filteredProjects.findIndex(
      (p) => p.id === activeProject.id,
    );
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    const nextProject = filteredProjects[nextIndex];

    // Update the active modal project
    setActiveProject(nextProject);
    // Update the background preview to match
    setHoveredId(nextProject.id);
    // Update the grid selection state so it tracks behind the modal
    setSelectedId(nextProject.id);
  }, [activeProject, filteredProjects]);

  const handlePrevProject = useCallback(() => {
    if (!activeProject || filteredProjects.length === 0) return;
    const currentIndex = filteredProjects.findIndex(
      (p) => p.id === activeProject.id,
    );
    if (currentIndex === -1) return;

    const prevIndex =
      (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    const prevProject = filteredProjects[prevIndex];

    // Update the active modal project
    setActiveProject(prevProject);
    // Update the background preview to match
    setHoveredId(prevProject.id);
    // Update the grid selection state so it tracks behind the modal
    setSelectedId(prevProject.id);
  }, [activeProject, filteredProjects]);

  const displayedProject = useMemo(() => {
    return hoveredId
      ? PROJECTS.find((p) => p.id === hoveredId)
      : selectedId
        ? PROJECTS.find((p) => p.id === selectedId)
        : null;
  }, [hoveredId, selectedId]);

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setCurrentTime(
        `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`,
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const darkBg = "#0f172a";
    const lightBg = "#f1f5f9";
    const activeColor = theme.isDark ? darkBg : lightBg;

    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", activeColor);
    } else {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = activeColor;
      document.head.appendChild(meta);
    }

    document.body.style.backgroundColor = activeColor;

    if (theme.isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme.isDark]);

  const launchProject = (p: Project) => {
    if (p.placeholder) return;
    isOpeningModal.current = true;
    setActiveProject(p);
    setSelectedId(p.id);
    setTimeout(() => {
      isOpeningModal.current = false;
    }, 500);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const handleHover = (p: Project) => {
    if (p.id === hoveredId) return;
    setHasEverHovered(true);
    setHoveredId(p.id);
  };

  const goHome = () => {
    if (activeProject) setActiveProject(null);
    else {
      setSelectedId(null);
      setHoveredId(null);
    }
  };

  if (isBooting)
    return <BootSplash onComplete={() => setIsBooting(false)} theme={theme} />;

  const controlVariants: Variants = {
    visible: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    hidden: {
      y: 60,
      scale: 0.5,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <div
      className="h-[100dvh] w-full flex justify-center items-center overflow-hidden relative transition-colors duration-700"
      style={{ backgroundColor: theme.isDark ? "#0f172a" : "#f1f5f9" }}
    >
      <div className="hidden md:block absolute inset-0 w-full h-full z-0">
        <LivingBackground theme={theme} paused={isModalOpen} />
      </div>

      <div
        className="w-full max-w-[1200px] h-full sm:h-[95vh] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] sm:rounded-[32px] overflow-hidden relative flex flex-col transition-colors duration-700 z-10 border-x-0 sm:border-x-8 border-y-0 sm:border-y-8 border-transparent"
        style={
          {
            backgroundColor: theme.colors.primary,
            "--accent": theme.colors.accent,
            "--panel": theme.colors.secondary,
            "--text": theme.colors.text,
            borderColor: theme.isDark ? "#1e293b" : "#ffffff",
          } as React.CSSProperties
        }
      >
        <Scanlines active={theme.scanlines} />
        <GBCFilter active={theme.gbcFilter} />

        <AnimatePresence>
          {isAboutOpen && (
            <AboutModal onClose={() => setIsAboutOpen(false)} theme={theme} />
          )}

          {activeProject && (
            <GameScreen
              project={activeProject}
              onClose={() => {
                setActiveProject(null);
                // Delay clearing the preview to allow smooth transition
                setTimeout(() => {
                  setHoveredId(null);
                  setSelectedId(null);
                }, 300);
              }}
              isFavorite={favorites.includes(activeProject.id)}
              toggleFavorite={() => toggleFavorite(activeProject.id)}
              theme={theme}
              onNext={handleNextProject}
              onPrev={handlePrevProject}
            />
          )}
          {showSystemSettings && (
            <SystemSettings
              anchorRef={settingsButtonRef}
              currentTheme={theme}
              onApply={updateTheme}
              onClose={() => setShowSystemSettings(false)}
              onToggleDarkMode={toggleDarkMode}
              onOpenLegal={() => {
                setShowSystemSettings(false);
                setTimeout(() => setIsLegalOpen(true), 200);
              }}
            />
          )}
          {isLegalOpen && (
            <LegalModal onClose={() => setIsLegalOpen(false)} theme={theme} />
          )}
        </AnimatePresence>

        <div
          className={`flex-1 flex-col w-full h-full relative ${isModalOpen ? "hidden md:flex" : "flex"}`}
        >
          {/* TOP SCREEN */}
          <div
            className="h-[45vh] shrink-0 relative w-full overflow-hidden flex flex-col shadow-sm z-10 transition-colors duration-700 border-b-4 border-black/5"
            style={{
              backgroundColor: theme.isDark
                ? "rgba(15, 23, 42, 0.6)"
                : "rgba(241, 245, 249, 0.6)",
              backdropFilter: "blur(20px)",
            }}
          >
            <ThemeBackground theme={theme} paused={backgroundPaused} />

            {/* StatusBar Wrapper */}
            <div
              className={`z-50 w-full transition-all duration-300 ${
                isToyboxVisible
                  ? "absolute top-0 left-0 right-0 pointer-events-none"
                  : "relative pointer-events-auto"
              }`}
            >
              <div className="pointer-events-auto">
                <StatusBar
                  time={currentTime}
                  theme={theme}
                  onOpenProfile={() => setIsAboutOpen(true)}
                  onGoHome={goHome}
                  showProfile={hasEverHovered}
                />
              </div>
            </div>
            <div className="relative z-10 w-full flex-1 flex items-center justify-center overflow-hidden">
              <AnimatePresence
                mode="wait"
                onExitComplete={() => {
                  if (!displayedProject && hasEverHovered) {
                    setIsToyboxVisible(true);
                  } else {
                    setIsToyboxVisible(false);
                  }
                }}
              >
                {displayedProject ? (
                  <ProjectPreview
                    key={displayedProject.id}
                    project={displayedProject}
                    onStart={() => launchProject(displayedProject)}
                    isFavorite={favorites.includes(displayedProject.id)}
                    theme={theme}
                  />
                ) : !hasEverHovered ? (
                  <HeroCard
                    key="hero"
                    onOpenTrainer={() => setIsAboutOpen(true)}
                    theme={theme}
                  />
                ) : (
                  <ToyBox key="toybox" theme={theme} />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* HINGE */}
          <div
            className="h-8 shrink-0 flex items-center justify-center shadow-inner z-20 relative transition-colors duration-700"
            style={{
              background: `linear-gradient(to bottom, ${theme.colors.console}, ${theme.colors.consoleEdge})`,
            }}
          >
            <div className="w-1/3 h-2 bg-black/20 rounded-full shadow-inner border-b border-white/10"></div>
          </div>

          {/* BOTTOM SCREEN */}
          <div className="flex-1 bg-[var(--panel)] relative flex flex-col shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-10 transition-colors duration-700 overflow-hidden">
            <div
              className="flex-1 overflow-y-auto custom-scrollbar bg-opacity-50 relative flex flex-col"
              onScroll={handleScroll}
            >
              <FilterBar
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                theme={theme}
              />
              <AnimatePresence mode="wait">
                {viewMode === "GRID" ? (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full justify-items-center relative z-10 pt-2"
                  >
                    {filteredProjects.map((project) => (
                      <GameTile
                        key={project.id}
                        project={project}
                        onClick={() => {
                          setIsPressed(true);
                          setTimeout(() => setIsPressed(false), 150);
                          launchProject(project);
                        }}
                        onHover={() => handleHover(project)}
                        onLeave={() => {
                          if (!isOpeningModal.current) {
                            setHoveredId(null);
                          }
                        }}
                        isSelected={selectedId === project.id}
                        isPressed={selectedId === project.id && isPressed}
                        isFavorite={favorites.includes(project.id)}
                        isHighlighted={hoveredId === project.id}
                        theme={theme}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-3 max-w-3xl mx-auto relative z-10 w-full"
                  >
                    {filteredProjects.map((project) => (
                      <ListRow
                        key={project.id}
                        project={project}
                        onClick={() => launchProject(project)}
                        onHover={() => setHoveredId(project.id)}
                        onLeave={() => {
                          if (!isOpeningModal.current) {
                            setHoveredId(null);
                          }
                        }}
                        isSelected={
                          selectedId === project.id || hoveredId === project.id
                        }
                        isFavorite={favorites.includes(project.id)}
                        theme={theme}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CORNER CONTROLS */}

            {/* Bottom Left: SETTINGS */}
            <div className="absolute bottom-6 left-6 z-50">
              <motion.div
                variants={controlVariants}
                initial="visible"
                animate={showControls ? "visible" : "hidden"}
              >
                <motion.button
                  ref={settingsButtonRef}
                  layout
                  whileHover={{
                    scale: 1.15,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowSystemSettings(!showSystemSettings)}
                  className="p-4 rounded-full backdrop-blur-xl border-2 transition-colors flex items-center justify-center group cursor-pointer shadow-lg origin-center"
                  style={{
                    backgroundColor: theme.colors.cardBg,
                    borderColor: theme.colors.secondary,
                    color: theme.colors.text,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  }}
                  title="System Settings"
                >
                  <Settings
                    size={24}
                    className="group-hover:rotate-90 group-hover:text-[var(--accent)] transition-all duration-500 ease-out"
                  />
                </motion.button>
              </motion.div>
            </div>

            {/* Bottom Right: VIEW MODE */}
            <div className="absolute bottom-6 right-6 z-50">
              <motion.div
                variants={controlVariants}
                initial="visible"
                animate={showControls ? "visible" : "hidden"}
              >
                <motion.button
                  layout
                  whileHover={{
                    scale: 1.15,
                    rotate: -15,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  whileTap={{ scale: 0.9, rotate: 0 }}
                  onClick={() =>
                    setViewMode((v) => (v === "GRID" ? "LIST" : "GRID"))
                  }
                  className="p-4 rounded-full backdrop-blur-xl border-2 transition-colors flex items-center justify-center group cursor-pointer shadow-lg origin-center"
                  style={{
                    backgroundColor: theme.colors.cardBg,
                    borderColor: theme.colors.secondary,
                    color: theme.colors.text,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  }}
                  title="Toggle View"
                >
                  {/* Icon color transition */}
                  <div className="group-hover:text-[var(--accent)] transition-colors duration-200">
                    {viewMode === "GRID" ? (
                      <LayoutGrid size={24} />
                    ) : (
                      <ListIcon size={24} />
                    )}
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
