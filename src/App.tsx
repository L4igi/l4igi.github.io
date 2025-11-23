import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Palette, Sun, Moon, Home, LayoutGrid, List as ListIcon, Languages } from 'lucide-react';

// Imports
import './styles/global.css';
import type { Category, ViewMode, Project } from './types';
import { PROJECTS } from './data/content';
import { useThemeSystem } from './hooks/useThemeSystem';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

// Components
import { Scanlines } from './components/ui/Scanlines';
import { BootSplash } from './components/ui/BootSplash';
import { StatusBar } from './components/ui/StatusBar';
import { ThemeBackground } from './components/ui/ThemeBackground';
import { LivingBackground } from './components/ui/LivingBackground';
import { FilterBar } from './components/ui/FilterBar'; // NEW IMPORT
import { HeroCard } from './components/projects/HeroCard';
import { ProjectPreview } from './components/projects/ProjectPreview';
import { GameTile } from './components/projects/GameTile';
import { ListRow } from './components/projects/ListRow';
import { ThemeCreatorMenu } from './components/modals/ThemeCreatorMenu';
import { AboutModal } from './components/modals/AboutModal';
import { GameScreen } from './components/modals/GameScreen';

const AppContent = () => {
    const { theme, updateTheme, toggleDarkMode } = useThemeSystem();
    const { language, setLanguage, t } = useLanguage();

    const [currentTime, setCurrentTime] = useState('00:00');
    const [activeCategory, setActiveCategory] = useState<Category>('ALL');
    const [viewMode, setViewMode] = useState<ViewMode>('GRID');
    const [isBooting, setIsBooting] = useState(true);

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);

    const [showThemeCreator, setShowThemeCreator] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [slideDir, setSlideDir] = useState<string>('from-right');

    const isModalOpen = isAboutOpen || !!activeProject;

    const filteredProjects = useMemo(() => {
        return activeCategory === 'ALL' ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    const displayedProject = useMemo(() => {
        return hoveredId ? PROJECTS.find(p => p.id === hoveredId) : (selectedId ? PROJECTS.find(p => p.id === selectedId) : null);
    }, [hoveredId, selectedId]);

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            setCurrentTime(`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // --- 2. DYNAMIC SYSTEM THEME (Chrome/Android Bars) ---
    useEffect(() => {
        // Define exact background colors
        const darkBg = '#0f172a'; // Slate-950
        const lightBg = '#f1f5f9'; // Slate-100
        const activeColor = theme.isDark ? darkBg : lightBg;

        // A. Update Browser Address Bar & Nav Bar (Android)
        const metaThemeColor = document.querySelector("meta[name=theme-color]");
        if (metaThemeColor) {
            metaThemeColor.setAttribute("content", activeColor);
        } else {
            const meta = document.createElement('meta');
            meta.name = "theme-color";
            meta.content = activeColor;
            document.head.appendChild(meta);
        }

        // B. Update Body Background (For Overscroll/Rubber-banding)
        document.body.style.backgroundColor = activeColor;

    }, [theme.isDark]);

    const launchProject = (p: Project) => {
        if (p.placeholder) return;
        setActiveProject(p);
    };

    const handleHover = (p: Project, e: React.MouseEvent) => {
        if (p.id === hoveredId) return;
        const { movementX, movementY } = e;
        if (Math.abs(movementX) > Math.abs(movementY)) {
            setSlideDir(movementX > 0 ? 'from-right' : 'from-left');
        } else {
            setSlideDir(movementY > 0 ? 'from-bottom' : 'from-top');
        }
        setHoveredId(p.id);
    };

    const goHome = () => {
        if (activeProject) setActiveProject(null);
        else {
            setSlideDir('from-top');
            setSelectedId(null);
            setHoveredId(null);
            setIsAboutOpen(false);
        }
    };

    const toggleFavorite = (id: string) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    if (isBooting) return <BootSplash onComplete={() => setIsBooting(false)} />;

    return (
        <div
            className={`h-[100dvh] w-full flex justify-center items-center overflow-hidden relative transition-colors duration-700 ${theme.isDark ? 'dark' : ''}`}
            style={{ backgroundColor: theme.isDark ? '#0f172a' : '#f1f5f9' }}
        >
            <div className="hidden md:block absolute inset-0 w-full h-full z-0">
                <LivingBackground theme={theme} />
            </div>

            <div
                className="w-full max-w-[1200px] h-full sm:h-[95vh] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] sm:rounded-[32px] overflow-hidden relative flex flex-col transition-colors duration-700 z-10 border-x-0 sm:border-x-8 border-y-0 sm:border-y-8 border-transparent"
                style={{
                    backgroundColor: theme.colors.primary,
                    '--accent': theme.colors.accent,
                    '--panel': theme.colors.secondary,
                    '--text': theme.colors.text,
                    borderColor: theme.isDark ? '#1e293b' : '#ffffff'
                } as React.CSSProperties}
            >
                <Scanlines active={theme.scanlines} />

                <AnimatePresence>
                    {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} theme={theme} />}

                    {activeProject && (
                        <GameScreen
                            project={activeProject}
                            onClose={() => setActiveProject(null)}
                            isFavorite={favorites.includes(activeProject.id)}
                            toggleFavorite={() => toggleFavorite(activeProject.id)}
                            theme={theme}
                        />
                    )}
                    {showThemeCreator && <ThemeCreatorMenu currentTheme={theme} onApply={updateTheme} onClose={() => setShowThemeCreator(false)} />}
                </AnimatePresence>

                <div className={`flex-1 flex-col w-full h-full relative ${isModalOpen ? 'hidden md:flex' : 'flex'}`}>
                    {/* TOP SCREEN */}
                    <div className="h-[45vh] shrink-0 relative w-full overflow-hidden flex flex-col shadow-sm z-10 transition-colors duration-700 border-b-4 border-black/5" style={{backgroundColor: theme.colors.primary}}>
                        <ThemeBackground theme={theme} />
                        <StatusBar time={currentTime} theme={theme} onOpenProfile={() => setIsAboutOpen(true)} showProfile={!!displayedProject} />
                        <div className="relative z-10 w-full h-[calc(100%-2rem)] flex items-center justify-center overflow-hidden">
                            {displayedProject ? (
                                <div key={displayedProject.id} className={`w-full h-full absolute inset-0 animate-slide-${slideDir}`}>
                                    <ProjectPreview project={displayedProject} onStart={() => launchProject(displayedProject)} isFavorite={favorites.includes(displayedProject.id)} theme={theme} />
                                </div>
                            ) : (
                                <div className="w-full h-full absolute inset-0 animate-slide-from-top">
                                    <HeroCard onOpenTrainer={() => setIsAboutOpen(true)} theme={theme} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* HINGE */}
                    <div className="h-8 shrink-0 flex items-center justify-center shadow-inner z-20 relative transition-colors duration-700" style={{ background: `linear-gradient(to bottom, ${theme.colors.console}, ${theme.colors.consoleEdge})` }}>
                        <div className="w-1/3 h-2 bg-black/20 rounded-full shadow-inner border-b border-white/10"></div>
                    </div>

                    {/* BOTTOM SCREEN (Scrollable) */}
                    <div className="flex-1 bg-[var(--panel)] relative flex flex-col shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-10 transition-colors duration-700 overflow-hidden">

                        {/* --- NEW COMPONENT: Filter Bar --- */}
                        <FilterBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} theme={theme} />

                        {/* GRID/LIST CONTENT */}
                        <div className="flex-1 overflow-y-auto p-6 pb-24 custom-scrollbar bg-opacity-50 relative flex flex-col">
                            <AnimatePresence mode="wait">
                                {viewMode === 'GRID' ? (
                                    <motion.div key="grid" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full justify-items-center relative z-10 pt-2">
                                        {filteredProjects.map((project) => (
                                            <GameTile key={project.id} project={project} onClick={() => { setIsPressed(true); setTimeout(() => setIsPressed(false), 150); launchProject(project); }} onHover={(e) => handleHover(project, e)} isSelected={selectedId === project.id} isPressed={selectedId === project.id && isPressed} isFavorite={favorites.includes(project.id)} theme={theme} />
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col gap-3 max-w-3xl mx-auto relative z-10 w-full">
                                        {filteredProjects.map((project) => (
                                            <ListRow key={project.id} project={project} onClick={() => launchProject(project)} onHover={(e) => handleHover(project, e)} isSelected={selectedId === project.id || hoveredId === project.id} isFavorite={favorites.includes(project.id)} theme={theme} />
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ANCHORED GLASS FOOTER */}
                        <div
                            className="absolute bottom-0 left-0 w-full z-50 backdrop-blur-xl shadow-[0_-5px_30px_rgba(0,0,0,0.1)] border-t transition-all duration-500"
                            style={{
                                // Semi-transparent background for the "Glass" effect
                                backgroundColor: theme.isDark ? 'rgba(15, 23, 42, 0.70)' : 'rgba(255, 255, 255, 0.70)',
                                borderColor: theme.colors.secondary
                            }}
                        >
                            <div className="max-w-4xl w-full mx-auto flex justify-between items-center px-6 py-4">
                                <div className="flex items-center gap-3 sm:gap-4 relative">

                                    {/* Theme Button */}
                                    <button
                                        onClick={() => setShowThemeCreator(!showThemeCreator)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors text-xs font-bold uppercase shadow-sm hover:opacity-80"
                                        style={{ backgroundColor: theme.colors.secondary, color: theme.colors.text }}
                                    >
                                        <Palette size={14} />
                                        <span className="hidden sm:inline">{t('footer.theme')}</span>
                                    </button>

                                    <div className="w-px h-6 opacity-20" style={{ backgroundColor: theme.colors.text }}></div>

                                    {/* Dark Mode */}
                                    <button
                                        onClick={toggleDarkMode}
                                        className="p-2 rounded-full transition-all hover:opacity-80"
                                        style={{ backgroundColor: theme.colors.secondary, color: theme.colors.text }}
                                    >
                                        {theme.isDark ? <Sun size={18} /> : <Moon size={18} />}
                                    </button>

                                    <div className="w-px h-6 opacity-20" style={{ backgroundColor: theme.colors.text }}></div>

                                    {/* Language */}
                                    <button
                                        onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
                                        className="flex items-center gap-2 px-3 py-2 rounded-full transition-colors text-xs font-bold uppercase shadow-sm hover:opacity-80"
                                        style={{ backgroundColor: theme.colors.secondary, color: theme.colors.text }}
                                    >
                                        <Languages size={14} /> {language.toUpperCase()}
                                    </button>
                                </div>

                                {/* View Controls */}
                                <div className="flex items-center gap-2">
                                    <button onClick={goHome} className="p-2 rounded-full transition-colors shadow-sm hover:opacity-80" style={{ backgroundColor: theme.colors.secondary, color: theme.colors.text }}><Home size={18} /></button>
                                    <button onClick={() => setViewMode(v => v === 'GRID' ? 'LIST' : 'GRID')} className="p-2 rounded-full transition-colors shadow-sm hover:opacity-80" style={{ backgroundColor: theme.colors.secondary, color: theme.colors.text }}>{viewMode === 'GRID' ? <LayoutGrid size={18} /> : <ListIcon size={18} />}</button>
                                </div>
                            </div>
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