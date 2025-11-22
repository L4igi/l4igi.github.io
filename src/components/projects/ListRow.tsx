import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play } from 'lucide-react';
import type {Project, Theme} from "../../types";
import {useLanguage} from "../../context/LanguageContext.tsx";

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
    return <motion.button
        onClick={onClick}
        onMouseMove={onHover}
        initial={{opacity: 0, x: -20}}
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 0, x: -20}}
        layout
        className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all border-2 ${isSelected ? 'bg-[var(--panel)] border-[var(--accent)] shadow-md scale-[1.02]' : 'bg-white/40 border-transparent hover:bg-white/60'}`}
    >
        <div
            className={`w-12 h-12 rounded-xl ${project.color} flex items-center justify-center text-white shadow-sm relative`}>
            {React.cloneElement(project.icon as React.ReactElement<any>, {size: 20})}
            {isFavorite &&
                <div className="absolute -top-1 -right-1 text-yellow-400"><Star fill="currentColor" size={12}/></div>}
        </div>
        <div className="text-left flex-1">
            <div className="font-bold text-sm" style={{color: theme.colors.text}}>{project.title}</div>
            <div className="text-xs opacity-70" style={{color: theme.colors.text}}>{project.role[language]}</div>
        </div>
        {isSelected && <div className="text-[var(--accent)] animate-pulse"><Play size={16} fill="currentColor"/></div>}
    </motion.button>
}