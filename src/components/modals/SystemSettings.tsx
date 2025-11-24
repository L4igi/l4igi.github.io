import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Monitor, Sparkles, Moon, Sun, Languages, Info, Settings } from 'lucide-react';
import type { Theme, ConsoleColor } from '../../types';
import { createThemeColors } from '../../utils/themeHelpers';
import { PASTEL_PALETTE, CONSOLE_VARIANTS, PATTERNS } from '../../data/content';
import { useLanguage } from '../../context/LanguageContext';
import type {Variants} from "motion";
import React, {useLayoutEffect, useState} from "react";

interface SystemSettingsProps {
    currentTheme: Theme;
    onApply: (t: Theme) => void;
    onClose: () => void;
    onToggleDarkMode: () => void;
    onOpenLegal: () => void;
    anchorRef: React.RefObject<HTMLButtonElement | null>;
}

export const SystemSettings = ({ currentTheme, onApply, onClose, onToggleDarkMode, onOpenLegal, anchorRef }: SystemSettingsProps) => {
    const { language, setLanguage, t } = useLanguage();
    const [position, setPosition] = useState({ bottom: 24, left: 24 });

    // Calculate position relative to the button before painting
    useLayoutEffect(() => {
        if (anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            // Position menu above the button, aligned to its left edge
            setPosition({
                bottom: window.innerHeight - rect.top + 16, // 16px gap above button
                left: rect.left
            });
        }
    }, [anchorRef]);

    const handleColorChange = (hex: string) => {
        const currentConsoleKey = (Object.keys(CONSOLE_VARIANTS) as ConsoleColor[]).find(k => CONSOLE_VARIANTS[k].base === currentTheme.colors.console) || 'white';
        const newColors = createThemeColors(hex, currentTheme.isDark, CONSOLE_VARIANTS[currentConsoleKey]);
        onApply({ ...currentTheme, colors: newColors });
    };

    const handleConsoleChange = (c: ConsoleColor) => {
        const newColors = createThemeColors(currentTheme.colors.accent, currentTheme.isDark, CONSOLE_VARIANTS[c]);
        onApply({ ...currentTheme, colors: newColors });
    };

    // --- ANIMATIONS ---
    const menuVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, y: 20, x: -10, transformOrigin: "bottom left" },
        visible: {
            opacity: 1, scale: 1, y: 0, x: 0,
            transition: { type: "spring", damping: 22, stiffness: 300, staggerChildren: 0.03 }
        },
        exit: { opacity: 0, scale: 0.9, y: 20, x: -10, transition: { duration: 0.15 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -5 },
        visible: { opacity: 1, x: 0 }
    };

    return createPortal(
        <>
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
                className="fixed inset-0 z-[9998] bg-black/60 md:bg-black/10"
            />

            <motion.div
                variants={menuVariants}
                initial="hidden" animate="visible" exit="exit"
                className="fixed z-[9999] w-80 max-w-[85vw] rounded-[32px] shadow-2xl border-2 overflow-hidden will-change-transform"
                style={{
                    // DYNAMIC POSITIONING based on button
                    bottom: position.bottom,
                    left: position.left,

                    backgroundColor: currentTheme.isDark ? '#0f172a' : '#ffffff',
                    borderColor: currentTheme.colors.primary,
                    color: currentTheme.colors.text,
                    boxShadow: '0 20px 60px -10px rgba(0,0,0,0.5)'
                }}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b" style={{ borderColor: currentTheme.colors.secondary }}>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-80">
                        <Settings size={14} /> System Settings
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.9 }} onClick={onClose}
                        className="p-1.5 rounded-full hover:opacity-70 transition-opacity"
                        style={{ backgroundColor: currentTheme.colors.secondary }}
                    >
                        <X size={14} />
                    </motion.button>
                </div>

                <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {/* 1. GENERAL */}
                    <motion.div variants={itemVariants} className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-wider opacity-50 block ml-1">General</label>
                        <div className="flex gap-2">
                            <button onClick={onToggleDarkMode} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all border shadow-sm active:scale-95" style={{ backgroundColor: currentTheme.colors.secondary, color: currentTheme.colors.text, borderColor: 'transparent' }}>
                                {currentTheme.isDark ? <Sun size={16} /> : <Moon size={16} />}
                                <span>{currentTheme.isDark ? 'Light' : 'Dark'}</span>
                            </button>
                            <button onClick={() => setLanguage(language === 'en' ? 'de' : 'en')} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all border shadow-sm active:scale-95" style={{ backgroundColor: currentTheme.colors.secondary, color: currentTheme.colors.text, borderColor: 'transparent' }}>
                                <Languages size={16} />
                                <span>{language === 'en' ? 'Deutsch' : 'English'}</span>
                            </button>
                        </div>
                    </motion.div>

                    <div className="w-full h-px opacity-10" style={{ backgroundColor: currentTheme.colors.text }}></div>

                    {/* 2. ACCENT */}
                    <motion.div variants={itemVariants} className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-wider opacity-50 block ml-1 flex items-center gap-1">
                            <Sparkles size={10} /> Theme Color
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {PASTEL_PALETTE.map(c => (
                                <button key={c.value} onClick={() => handleColorChange(c.value)} className="w-8 h-8 rounded-full relative shadow-sm border-2 border-transparent transition-transform active:scale-90 hover:scale-110" style={{ backgroundColor: c.value }}>
                                    {currentTheme.colors.accent === c.value && <motion.div layoutId="activeColorRing" className="absolute inset-0 -m-1.5 rounded-full border-2" style={{ borderColor: currentTheme.colors.text }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* 3. PATTERN */}
                    <motion.div variants={itemVariants} className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-wider opacity-50 block ml-1">Pattern</label>
                        <div className="grid grid-cols-3 gap-2">
                            {PATTERNS.map(p => (
                                <button key={p.id} onClick={() => onApply({ ...currentTheme, pattern: p.id })} className="h-10 rounded-xl flex items-center justify-center transition-all border shadow-sm active:scale-95" style={{ backgroundColor: currentTheme.pattern === p.id ? currentTheme.colors.accent : currentTheme.colors.secondary, borderColor: currentTheme.pattern === p.id ? currentTheme.colors.accent : 'transparent', color: currentTheme.pattern === p.id ? currentTheme.colors.contrastAccent : currentTheme.colors.text }}>
                                    {p.icon}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* 4. DEVICE */}
                    <motion.div variants={itemVariants} className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-wider opacity-50 block ml-1">Device Style</label>
                        <div className="flex justify-between items-stretch gap-3">
                            <div className="flex-1 flex justify-between p-1.5 rounded-xl border" style={{ backgroundColor: currentTheme.colors.secondary, borderColor: 'transparent' }}>
                                {(Object.keys(CONSOLE_VARIANTS) as ConsoleColor[]).map(c => (
                                    <button key={c} onClick={() => handleConsoleChange(c)} className="w-8 h-8 rounded-lg border shadow-sm relative flex items-center justify-center transition-transform active:scale-90 hover:scale-105" style={{ backgroundColor: CONSOLE_VARIANTS[c].base, borderColor: CONSOLE_VARIANTS[c].edge }}>
                                        {currentTheme.colors.console === CONSOLE_VARIANTS[c].base && <motion.div layoutId="activeConsoleCheck" className="w-2 h-2 bg-white rounded-full shadow-md" />}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => onApply({...currentTheme, scanlines: !currentTheme.scanlines})} className="flex items-center gap-2 px-4 rounded-xl text-xs font-bold transition-all border shadow-sm active:scale-95" style={{ backgroundColor: currentTheme.scanlines ? currentTheme.colors.accent : currentTheme.colors.secondary, color: currentTheme.scanlines ? currentTheme.colors.contrastAccent : currentTheme.colors.text, borderColor: currentTheme.scanlines ? currentTheme.colors.accent : 'transparent' }}>
                                <Monitor size={16} />
                                <span className="uppercase text-[10px] font-black">CRT</span>
                            </button>
                        </div>
                    </motion.div>

                    <div className="w-full h-px opacity-10" style={{ backgroundColor: currentTheme.colors.text }}></div>

                    {/* 5. LEGAL */}
                    <motion.button variants={itemVariants} onClick={onOpenLegal} className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-colors hover:opacity-80 active:scale-95" style={{ backgroundColor: currentTheme.colors.secondary, color: currentTheme.colors.text }}>
                        <Info size={16} />
                        <span>{t('legal.title')}</span>
                    </motion.button>
                </div>

                {/* Pointer - Aligned to center of button (approx 28px in) */}
                <div
                    className="absolute -bottom-2 left-7 w-4 h-4 border-b-2 border-r-2 rotate-45"
                    style={{ backgroundColor: currentTheme.isDark ? '#0f172a' : '#ffffff', borderColor: currentTheme.colors.primary }}
                ></div>
            </motion.div>
        </>,
        document.body
    );
};