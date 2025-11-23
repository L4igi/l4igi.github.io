import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Globe } from 'lucide-react';
import type { Category, Theme } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface FilterBarProps {
    activeCategory: Category;
    setActiveCategory: (cat: Category) => void;
    theme: Theme;
}

export const FilterBar = ({ activeCategory, setActiveCategory, theme }: FilterBarProps) => {
    const { t } = useLanguage();

    const categories: Category[] = ['ALL', 'WORK', 'PERSONAL', 'UNI'];
    const socials = [Mail, Github, Linkedin, Globe];

    return (
        <div className="relative sm:sticky sm:top-0 z-30 w-full flex justify-center pt-4 pb-2 pointer-events-none">
            <div
                className="pointer-events-auto backdrop-blur-xl border shadow-lg overflow-hidden transition-all duration-300"
                style={{
                    backgroundColor: theme.isDark ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                    borderColor: theme.colors.secondary,
                    borderRadius: '24px'
                }}
            >
                {/* FORCE SINGLE ROW: Always flex-row, no wrapping */}
                <div className="flex flex-row items-center p-1.5">

                    {/* CATEGORIES (Scrollable) */}
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto justify-start">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-black tracking-wide transition-colors z-10 shrink-0`}
                                style={{ color: activeCategory === cat ? theme.colors.contrastAccent : theme.colors.text }}
                            >
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute inset-0 rounded-full z-[-1]"
                                        style={{ backgroundColor: theme.colors.accent }}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                {cat === 'ALL' ? t('cat.all') : cat === 'WORK' ? t('cat.work') : cat === 'PERSONAL' ? t('cat.personal') : t('cat.uni')}
                            </button>
                        ))}
                    </div>

                    {/* DESKTOP ONLY: Socials Section */}
                    <div className="hidden sm:flex items-center">
                        {/* Divider */}
                        <div className="w-px h-4 mx-2 opacity-20 shrink-0" style={{ backgroundColor: theme.colors.text }}></div>

                        {/* Social Icons */}
                        <div className="flex gap-1 shrink-0">
                            {socials.map((Icon, i) => (
                                <motion.button
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    key={i}
                                    className="p-1.5 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                                    style={{ color: theme.colors.text }}
                                >
                                    <Icon size={16} />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};