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

    // --- ANIMATIONS ---
    const menuVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom left" },
        visible: {
            opacity: 1, scale: 1, y: 0,
            transition: {
                type: "spring", damping: 25, stiffness: 350,
                staggerChildren: 0.05
            }
        },
        exit: { opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.2 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-full left-0 mb-6 z-[9999] w-80 rounded-3xl shadow-2xl border-2 origin-bottom-left overflow-hidden backdrop-blur-xl"
            style={{
                backgroundColor: currentTheme.isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: currentTheme.colors.primary,
                color: currentTheme.colors.text
            }}
        >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b" style={{ borderColor: currentTheme.colors.secondary }}>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-80">
                    <Palette size={14} /> System Theme
                </div>
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
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
                            <motion.button
                                key={c.value}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleColorChange(c.value)}
                                className="w-8 h-8 rounded-full relative shadow-sm border-2 border-transparent"
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
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* 2. Background Pattern */}
                <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider opacity-50 block ml-1">Background Pattern</label>
                    <div className="grid grid-cols-3 gap-2">
                        {PATTERNS.map(p => (
                            <motion.button
                                key={p.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onApply({ ...currentTheme, pattern: p.id })}
                                className="h-10 rounded-xl flex items-center justify-center transition-all border shadow-sm"
                                style={{
                                    backgroundColor: currentTheme.pattern === p.id ? currentTheme.colors.accent : currentTheme.colors.secondary,
                                    borderColor: currentTheme.pattern === p.id ? currentTheme.colors.accent : 'transparent',
                                    color: currentTheme.pattern === p.id ? currentTheme.colors.contrastAccent : currentTheme.colors.text
                                }}
                                title={p.name}
                            >
                                {p.icon}
                            </motion.button>
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
                                <motion.button
                                    key={c}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleConsoleChange(c)}
                                    className="w-8 h-8 rounded-lg border shadow-sm relative flex items-center justify-center"
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
                                </motion.button>
                            ))}
                        </div>

                        {/* CRT Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onApply({...currentTheme, scanlines: !currentTheme.scanlines})}
                            className="flex items-center gap-2 px-4 rounded-xl text-xs font-bold transition-all border shadow-sm"
                            style={{
                                backgroundColor: currentTheme.scanlines ? currentTheme.colors.accent : currentTheme.colors.secondary,
                                color: currentTheme.scanlines ? currentTheme.colors.contrastAccent : currentTheme.colors.text,
                                borderColor: currentTheme.scanlines ? currentTheme.colors.accent : 'transparent'
                            }}
                            title="Toggle CRT Effect"
                        >
                            <Monitor size={16} />
                            <span className="uppercase text-[10px] font-black">CRT</span>
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Triangle Pointer */}
            <div
                className="absolute -bottom-2 left-9 w-4 h-4 border-b-2 border-r-2 rotate-45"
                style={{
                    backgroundColor: currentTheme.colors.cardBg,
                    borderColor: currentTheme.colors.primary
                }}
            ></div>
        </motion.div>
    );
};