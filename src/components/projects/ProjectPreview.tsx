import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import type { Project, Theme } from "../../types";
import { useLanguage } from "../../context/LanguageContext";

export const ProjectPreview = ({ project, onStart, isFavorite, theme }: { project: Project; onStart: () => void; isFavorite: boolean; theme: Theme }) => {
    const { language, t } = useLanguage();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        x.set(((mouseX / width) - 0.5) * 200);
        y.set(((mouseY / height) - 0.5) * 200);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    if (!project) return null;

    return (
        <motion.div
            className="w-full h-full flex items-center justify-center perspective-container p-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
        >
            <motion.div
                className="relative w-full max-w-lg max-h-[90%] min-h-[300px] aspect-[16/9] rounded-[32px] shadow-2xl border-[6px] flex overflow-hidden transform-style-3d"
                style={{
                    backgroundColor: theme.colors.cardBg, // Explicit theme color fixes light mode
                    borderColor: theme.colors.cardBg,     // Match border to card for clean look
                    rotateX,
                    rotateY
                }}
            >
                {/* Left: 3D Art */}
                <div className={`w-1/3 ${project.color} relative flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-black/10"></div>
                    <motion.div
                        className="drop-shadow-2xl scale-110 text-white translate-z-20"
                        style={{ transform: "scale(1.1)" }}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                        {project.icon}
                    </motion.div>
                    {isFavorite && (
                        <div className="absolute top-4 left-4 text-yellow-300 drop-shadow-md translate-z-30">
                            <Star fill="currentColor" size={28} />
                        </div>
                    )}
                </div>

                {/* Right: Info */}
                <div className="w-2/3 p-6 flex flex-col justify-between relative overflow-hidden">
                    {/* Ambient Glow */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 opacity-10 rounded-full blur-3xl" style={{backgroundColor: theme.colors.accent}}></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <span
                                className="text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border"
                                style={{
                                    backgroundColor: theme.colors.primary,
                                    color: theme.colors.textLight,
                                    borderColor: theme.colors.secondary
                                }}
                            >
                                {project.category}
                            </span>
                            <span className="text-[10px] font-bold opacity-50" style={{color: theme.colors.text}}>{project.year}</span>
                        </div>
                        <h1 className="text-2xl font-black leading-none mb-2 tracking-tight" style={{color: theme.colors.text}}>{project.title}</h1>
                        <p className="text-xs sm:text-sm line-clamp-3 leading-relaxed font-medium opacity-70" style={{color: theme.colors.text}}>
                            {project.description[language]}
                        </p>
                    </div>

                    <div className="flex justify-between items-end relative z-10 mt-2">
                        <div className="flex gap-1">
                            {project.tech.slice(0, 3).map(t => (
                                <div key={t} className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.secondary }} title={t} />
                            ))}
                        </div>

                        {/* Nintendo Style Button: Solid Color, Clicky, No Glow */}
                        <motion.button
                            onClick={onStart}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-2 text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl shadow-md transition-all"
                            style={{
                                backgroundColor: theme.colors.accent,
                                color: theme.colors.contrastAccent
                            }}
                        >
                            <span>{t('btn.details')}</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};