import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Project, Theme } from "../../types";
import { useLanguage } from "../../context/LanguageContext";

interface ListRowProps {
    project: Project;
    onClick: () => void;
    onHover: (e: React.MouseEvent) => void;
    isSelected: boolean;
    isFavorite: boolean;
    theme: Theme;
}

export const ListRow = ({ project, onClick, onHover, isSelected, isFavorite, theme }: ListRowProps) => {
    const { language } = useLanguage();

    return (
        <motion.button
            onClick={onClick}
            onMouseMove={onHover}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            layout
            className="w-full flex items-center gap-5 p-3 rounded-[20px] transition-all group relative overflow-hidden shadow-sm hover:shadow-md border-2"
            style={{
                backgroundColor: theme.colors.cardBg,
                borderColor: isSelected ? theme.colors.accent : 'transparent', // Active border
                color: theme.colors.text
            }}
        >
            {/* 1. Hover Background Bloom (Like GameTile) */}
            <div className={`absolute inset-0 ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>

            {/* 2. Active Indicator Strip */}
            {isSelected && (
                <motion.div
                    layoutId="activeRowBar"
                    className="absolute left-0 top-0 bottom-0 w-1.5 z-20"
                    style={{ backgroundColor: theme.colors.accent }}
                />
            )}

            {/* 3. Icon Box (Tilts on Hover) */}
            <div className={`w-16 h-16 rounded-2xl ${project.color} flex items-center justify-center text-white shadow-md shrink-0 relative overflow-hidden group-hover:rotate-6 group-hover:scale-105 transition-transform duration-300 z-10`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/10"></div>
                <div className="relative z-10 drop-shadow-md">
                    {React.cloneElement(project.icon as React.ReactElement<any>, { size: 28 })}
                </div>
            </div>

            {/* 4. Text Content */}
            <div className="text-left flex-1 min-w-0 py-1 relative z-10">
                <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-base sm:text-lg truncate leading-none tracking-tight">
                        {project.title}
                    </span>

                    {/* Favorite Star (Top Right of content) */}
                    {isFavorite && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-yellow-400 drop-shadow-sm"
                        >
                            <Star size={16} fill="currentColor" />
                        </motion.div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {/* Year Badge: Clean Outline Style */}
                    <span
                        className="px-2 py-0.5 rounded-md text-[10px] font-black border opacity-60"
                        style={{ borderColor: theme.colors.text, color: theme.colors.text }}
                    >
                        {project.year}
                    </span>

                    {/* Role */}
                    <span
                        className="text-xs font-bold uppercase tracking-wide truncate opacity-50"
                        style={{ color: theme.colors.text }}
                    >
                        {project.role[language]}
                    </span>
                </div>
            </div>
        </motion.button>
    );
};