import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Github, Linkedin, Globe, Palette, Sun, Moon, Home, LayoutGrid, List as ListIcon, Languages } from 'lucide-react';

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
import { ThemeBackground } from './components/ui/ThemeBackground'; // Still used for inside the device screen if needed, but LivingBackground is for the outer wall
import { LivingBackground } from './components/ui/LivingBackground'; // NEW
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
            className={`h-screen w-full flex justify-center items-center overflow-hidden relative transition-colors duration-700 ${theme.isDark ? 'dark' : ''}`}
            style={{
                backgroundColor: theme.isDark ? '#0f172a' : '#f1f5f9'
            }}
        >
            {/* --- NEW LIVING BACKGROUND COMPONENT --- */}
            <LivingBackground theme={theme} />

            {/* --- MAIN DEVICE CONTAINER --- */}
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
                </AnimatePresence>

                {/* --- TOP SCREEN --- */}
                <div
                    className="h-[45vh] shrink-0 relative w-full overflow-hidden flex flex-col shadow-sm z-10 transition-colors duration-700 border-b-4 border-black/5"
                    style={{backgroundColor: theme.colors.primary}}
                >
                    <ThemeBackground theme={theme} />

                    <StatusBar
                        time={currentTime}
                        theme={theme}
                        onOpenProfile={() => setIsAboutOpen(true)}
                        showProfile={!!displayedProject}
                    />

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

                {/* --- HINGE --- */}
                <div className="h-8 shrink-0 flex items-center justify-center shadow-inner z-20 relative transition-colors duration-700" style={{ background: `linear-gradient(to bottom, ${theme.colors.console}, ${theme.colors.consoleEdge})` }}>
                    <div className="w-1/3 h-2 bg-black/20 rounded-full shadow-inner border-b border-white/10"></div>
                </div>

                {/* --- BOTTOM SCREEN --- */}
                <div className="flex-1 bg-[var(--panel)] relative flex flex-col shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-10 transition-colors duration-700 overflow-hidden">

                    {/* Category Toolbar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center p-3 px-6 bg-[var(--panel)] gap-4 z-20 shadow-sm border-b border-gray-100/10">
                        <div className="flex gap-2 p-1 overflow-x-auto no-scrollbar w-full sm:w-auto items-center justify-center sm:justify-start">
                            {(['ALL', 'WORK', 'PERSONAL', 'UNI'] as Category[]).map(cat => (
                                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-[var(--accent)] text-white shadow-md transform scale-105' : 'hover:bg-black/5 dark:hover:bg-white/5'}`} style={{ backgroundColor: activeCategory === cat ? theme.colors.accent : theme.colors.secondary, color: activeCategory === cat ? theme.colors.contrastAccent : theme.colors.text }}>
                                    {cat === 'ALL' ? t('cat.all') : cat === 'WORK' ? t('cat.work') : cat === 'PERSONAL' ? t('cat.personal') : t('cat.uni')}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2 justify-center sm:justify-end w-full sm:w-auto">
                            {[Mail, Github, Linkedin, Globe].map((Icon, i) => (
                                <button key={i} className="p-2 rounded-full transition-colors shadow-sm hover:opacity-80" style={{ backgroundColor: theme.colors.secondary, color: theme.colors.text }}><Icon size={18} /></button>
                            ))}
                        </div>
                    </div>

                    {/* Scrollable Area */}
                    <div className="flex-1 overflow-y-auto p-6 pb-24 custom-scrollbar bg-opacity-50 relative flex flex-col">
                        <AnimatePresence mode="wait">
                            {viewMode === 'GRID' ? (
                                <motion.div key="grid" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full justify-items-center relative z-10 pt-4">
                                    {filteredProjects.map((project) => (
                                        <GameTile
                                            key={project.id} project={project}
                                            onClick={() => { setIsPressed(true); setTimeout(() => setIsPressed(false), 150); launchProject(project); }}
                                            onHover={(e) => handleHover(project, e)}
                                            isSelected={selectedId === project.id} isPressed={selectedId === project.id && isPressed} isFavorite={favorites.includes(project.id)} theme={theme}
                                        />
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div key="list" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="flex flex-col gap-3 max-w-3xl mx-auto relative z-10 w-full">
                                    {filteredProjects.map((project) => (
                                        <ListRow
                                            key={project.id} project={project}
                                            onClick={() => launchProject(project)}
                                            onHover={(e) => handleHover(project, e)}
                                            isSelected={selectedId === project.id || hoveredId === project.id} isFavorite={favorites.includes(project.id)} theme={theme}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* FOOTER */}
                    <div className="absolute bottom-0 left-0 w-full z-50">
                        <div
                            className="w-full p-4 backdrop-blur-md shadow-[0_-5px_20px_rgba(0,0,0,0.1)] border-t flex justify-center transition-colors duration-700"
                            style={{
                                backgroundColor: theme.colors.cardBg,
                                borderColor: theme.colors.secondary
                            }}
                        >
                            <div className="max-w-2xl w-full flex justify-between items-center px-2 sm:px-6">
                                <div className="flex items-center gap-4 relative">
                                    <AnimatePresence>
                                        {showThemeCreator && <ThemeCreatorMenu currentTheme={theme} onApply={updateTheme} onClose={() => setShowThemeCreator(false)} />}
                                    </AnimatePresence>

                                    {/* THEME BUTTON */}
                                    <button
                                        onClick={() => setShowThemeCreator(!showThemeCreator)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors text-xs font-bold uppercase shadow-sm hover:opacity-80"
                                        style={{ backgroundColor: theme.colors.secondary, color: theme.colors.text }}
                                    >
                                        <Palette size={14} /> {t('footer.theme')}
                                    </button>

                                    <div className="w-px h-6 opacity-20" style={{ backgroundColor: theme.colors.text }}></div>

                                    {/* DARK MODE TOGGLE */}
                                    <button
                                        onClick={toggleDarkMode}
                                        className="p-2 rounded-full transition-all hover:opacity-80"
                                        style={{ backgroundColor: theme.colors.secondary, color: theme.colors.text }}
                                    >
                                        {theme.isDark ? <Sun size={18} /> : <Moon size={18} />}
                                    </button>

                                    <div className="w-px h-6 opacity-20" style={{ backgroundColor: theme.colors.text }}></div>

                                    {/* LANGUAGE TOGGLE */}
                                    <button
                                        onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
                                        className="flex items-center gap-2 px-3 py-2 rounded-full transition-colors text-xs font-bold uppercase shadow-sm hover:opacity-80"
                                        style={{ backgroundColor: theme.colors.secondary, color: theme.colors.text }}
                                    >
                                        <Languages size={14} /> {language.toUpperCase()}
                                    </button>
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* HOME BUTTON */}
                                    <button
                                        onClick={goHome}
                                        className="p-2 rounded-full transition-colors shadow-sm hover:opacity-80"
                                        style={{ backgroundColor: theme.colors.secondary, color: theme.colors.text }}
                                    >
                                        <Home size={18} />
                                    </button>

                                    {/* VIEW MODE TOGGLE */}
                                    <button
                                        onClick={() => setViewMode(v => v === 'GRID' ? 'LIST' : 'GRID')}
                                        className="p-2 rounded-full transition-colors shadow-sm hover:opacity-80"
                                        style={{ backgroundColor: theme.colors.secondary, color: theme.colors.text }}
                                    >
                                        {viewMode === 'GRID' ? <LayoutGrid size={18} /> : <ListIcon size={18} />}
                                    </button>
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