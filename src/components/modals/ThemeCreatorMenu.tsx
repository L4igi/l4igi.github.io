import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Monitor, Palette, Sparkles } from 'lucide-react';
import type { Theme, ConsoleColor } from '../../types';
import { createThemeColors } from '../../utils/themeHelpers';
import { PASTEL_PALETTE, CONSOLE_VARIANTS, PATTERNS } from '../../data/content';
import type {Variants} from "motion";

interface ThemeCreatorProps {
    currentTheme: Theme;
    onApply: (t: Theme) => void;
    onClose: () => void;
}

export const ThemeCreatorMenu = ({ currentTheme, onApply, onClose }: ThemeCreatorProps) => {
    const handleColorChange = (hex: string) => {
        const currentConsoleKey = (Object.keys(CONSOLE_VARIANTS) as ConsoleColor[]).find(k => CONSOLE_VARIANTS[k].base === currentTheme.colors.console) || 'white';
        const newColors = createThemeColors(hex, currentTheme.isDark, CONSOLE_VARIANTS[currentConsoleKey]);
        onApply({ ...currentTheme, colors: newColors });
    };

    const handleConsoleChange = (c: ConsoleColor) => {
        const newColors = createThemeColors(currentTheme.colors.accent, currentTheme.isDark, CONSOLE_VARIANTS[c]);
        onApply({ ...currentTheme, colors: newColors });
    };

    // --- OPTIMIZED ANIMATIONS ---
    const menuVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, y: 15, transformOrigin: "bottom" },
        visible: {
            opacity: 1, scale: 1, y: 0,
            transition: {
                type: "spring", damping: 22, stiffness: 300,
                staggerChildren: 0.03
            }
        },
        exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -5 },
        visible: { opacity: 1, x: 0 }
    };

    return createPortal(
        <>
            {/* BACKDROP LAYER */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                // NINTENDO POLISH: No blur on desktop, just a subtle dim to keep context
                // Mobile: Darker dim for focus
                className="fixed inset-0 z-[9998] bg-black/60 md:bg-black/10"
            />

            {/* THEME MENU */}
            <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                // POSITIONING:
                // Fixed to break out of containers.
                // Desktop: Offset left to align with the "Theme" button in the footer
                className="fixed bottom-24 left-1/2 -translate-x-1/2 md:bottom-28 md:left-1/2 md:-translate-x-[180px] z-[9999] w-80 max-w-[90vw] rounded-3xl shadow-2xl border-2 overflow-hidden will-change-transform"
                style={{
                    // STYLE: High opacity for a "Solid Card" feel (Nintendo Style), not "Frosted Glass" (iOS Style)
                    backgroundColor: currentTheme.isDark ? '#0f172a' : '#ffffff',
                    borderColor: currentTheme.colors.primary,
                    color: currentTheme.colors.text,
                    boxShadow: '0 20px 60px -10px rgba(0,0,0,0.5)' // Deep, floating shadow
                }}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b" style={{ borderColor: currentTheme.colors.secondary }}>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-80">
                        <Palette size={14} /> System Theme
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:opacity-70 transition-opacity"
                        style={{ backgroundColor: currentTheme.colors.secondary }}
                    >
                        <X size={14} />
                    </motion.button>
                </div>

                <div className="p-6 space-y-7">

                    {/* 1. Accent Color */}
                    <motion.div variants={itemVariants} className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-wider opacity-50 block ml-1 flex items-center gap-1">
                            <Sparkles size={10} /> Accent Color
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {PASTEL_PALETTE.map(c => (
                                <button
                                    key={c.value}
                                    onClick={() => handleColorChange(c.value)}
                                    className="w-8 h-8 rounded-full relative shadow-sm border-2 border-transparent transition-transform active:scale-90 hover:scale-110"
                                    style={{ backgroundColor: c.value }}
                                    title={c.name}
                                >
                                    {currentTheme.colors.accent === c.value && (
                                        <motion.div
                                            layoutId="activeColorRing"
                                            className="absolute inset-0 -m-1.5 rounded-full border-2"
                                            style={{ borderColor: currentTheme.colors.text }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* 2. Background Pattern */}
                    <motion.div variants={itemVariants} className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-wider opacity-50 block ml-1">Background Pattern</label>
                        <div className="grid grid-cols-3 gap-2">
                            {PATTERNS.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => onApply({ ...currentTheme, pattern: p.id })}
                                    className="h-10 rounded-xl flex items-center justify-center transition-all border shadow-sm active:scale-95 hover:brightness-95 dark:hover:brightness-110"
                                    style={{
                                        backgroundColor: currentTheme.pattern === p.id ? currentTheme.colors.accent : currentTheme.colors.secondary,
                                        borderColor: currentTheme.pattern === p.id ? currentTheme.colors.accent : 'transparent',
                                        color: currentTheme.pattern === p.id ? currentTheme.colors.contrastAccent : currentTheme.colors.text
                                    }}
                                    title={p.name}
                                >
                                    {p.icon}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* 3. Device Style & CRT */}
                    <motion.div variants={itemVariants} className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-wider opacity-50 block ml-1">Device Style</label>
                        <div className="flex justify-between items-stretch gap-3">

                            {/* Console Color Picker */}
                            <div className="flex-1 flex justify-between p-1.5 rounded-xl border" style={{ backgroundColor: currentTheme.colors.secondary, borderColor: 'transparent' }}>
                                {(Object.keys(CONSOLE_VARIANTS) as ConsoleColor[]).map(c => (
                                    <button
                                        key={c}
                                        onClick={() => handleConsoleChange(c)}
                                        className="w-8 h-8 rounded-lg border shadow-sm relative flex items-center justify-center transition-transform active:scale-90 hover:scale-105"
                                        style={{
                                            backgroundColor: CONSOLE_VARIANTS[c].base,
                                            borderColor: CONSOLE_VARIANTS[c].edge
                                        }}
                                    >
                                        {currentTheme.colors.console === CONSOLE_VARIANTS[c].base && (
                                            <motion.div
                                                layoutId="activeConsoleCheck"
                                                className="w-2 h-2 bg-white rounded-full shadow-md"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* CRT Toggle */}
                            <button
                                onClick={() => onApply({...currentTheme, scanlines: !currentTheme.scanlines})}
                                className="flex items-center gap-2 px-4 rounded-xl text-xs font-bold transition-all border shadow-sm active:scale-95 hover:brightness-95 dark:hover:brightness-110"
                                style={{
                                    backgroundColor: currentTheme.scanlines ? currentTheme.colors.accent : currentTheme.colors.secondary,
                                    color: currentTheme.scanlines ? currentTheme.colors.contrastAccent : currentTheme.colors.text,
                                    borderColor: currentTheme.scanlines ? currentTheme.colors.accent : 'transparent'
                                }}
                                title="Toggle CRT Effect"
                            >
                                <Monitor size={16} />
                                <span className="uppercase text-[10px] font-black">CRT</span>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Pointer (Desktop Only Visual) */}
                <div
                    className="hidden md:block absolute -bottom-2 left-1/2 -translate-x-1/2 md:left-auto md:right-1/4 w-4 h-4 border-b-2 border-r-2 rotate-45"
                    style={{
                        backgroundColor: currentTheme.isDark ? '#0f172a' : '#ffffff',
                        borderColor: currentTheme.colors.primary
                    }}
                ></div>
            </motion.div>
        </>,
        document.body
    );
};