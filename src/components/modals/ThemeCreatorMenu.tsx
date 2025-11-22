import { motion } from 'framer-motion';
import { XCircle, Monitor } from 'lucide-react';
import { createThemeColors } from '../../utils/themeHelpers';
import { PASTEL_PALETTE, CONSOLE_VARIANTS, PATTERNS } from '../../data/content';
import type {ConsoleColor, Theme} from "../../types";

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

    return (
        <motion.div
            // FIX: Position is now absolute relative to the footer button container
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="absolute bottom-full left-0 mb-4 z-[9999] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-5 w-72 text-gray-800 dark:text-white origin-bottom-left"
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black uppercase tracking-widest opacity-50">Theme OS</h3>
                <button onClick={onClose}><XCircle size={18} className="opacity-30 hover:opacity-100 hover:text-red-500 transition-colors" /></button>
            </div>
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    {PASTEL_PALETTE.map(c => (
                        <button key={c.value} onClick={() => handleColorChange(c.value)} className={`w-6 h-6 rounded-full border-2 transition-transform ${currentTheme.colors.accent === c.value ? 'border-gray-500 scale-110' : 'border-transparent hover:scale-105'}`} style={{ backgroundColor: c.value }} title={c.name} />
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {PATTERNS.map(p => (
                        <button key={p.id} onClick={() => onApply({ ...currentTheme, pattern: p.id })} className={`h-8 rounded-md border flex items-center justify-center transition-all ${currentTheme.pattern === p.id ? 'border-blue-400 bg-blue-50 text-blue-500' : 'border-gray-100 dark:border-gray-600 text-gray-400 dark:text-gray-300 hover:bg-gray-50'}`} title={p.name}>{p.icon}</button>
                    ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex gap-2">
                        {(Object.keys(CONSOLE_VARIANTS) as ConsoleColor[]).map(c => (
                            <button key={c} onClick={() => handleConsoleChange(c)} className={`w-5 h-5 rounded-full border shadow-sm ${currentTheme.colors.console === CONSOLE_VARIANTS[c].base ? 'ring-2 ring-offset-1 ring-gray-400' : ''}`} style={{ backgroundColor: CONSOLE_VARIANTS[c].base }} />
                        ))}
                    </div>
                    <button onClick={() => onApply({...currentTheme, scanlines: !currentTheme.scanlines})} className={`p-1 rounded-full transition-colors ${currentTheme.scanlines ? 'bg-green-100 text-green-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`} title="Toggle CRT"><Monitor size={14} /></button>
                </div>
            </div>
            {/* Triangle Pointer */}
            <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white dark:bg-gray-900 border-b-2 border-r-2 border-gray-200 dark:border-gray-700 rotate-45"></div>
        </motion.div>
    );
};