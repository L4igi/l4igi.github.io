import React, { useState, useEffect, useCallback } from 'react';
import { X, ImageIcon, CheckCircle2, Star, ChevronLeft, ChevronRight, Cpu, ListChecks } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project, Theme } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import type {Variants} from "motion";

interface GameScreenProps {
    project: Project;
    onClose: () => void;
    isFavorite: boolean;
    toggleFavorite: () => void;
    theme: Theme;
}

export const GameScreen = ({ project, onClose, isFavorite, toggleFavorite, theme }: GameScreenProps) => {
    const { language, t } = useLanguage();
    const [isClosing, setIsClosing] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const handleClose = () => { setIsClosing(true); setTimeout(onClose, 300); };

    // --- LIGHTBOX LOGIC ---
    const showNextImg = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex === null || project.screenshots.length === 0) return;
        setLightboxIndex((prev) => (prev! + 1) % project.screenshots.length);
    }, [lightboxIndex, project.screenshots.length]);

    const showPrevImg = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex === null || project.screenshots.length === 0) return;
        setLightboxIndex((prev) => (prev! - 1 + project.screenshots.length) % project.screenshots.length);
    }, [lightboxIndex, project.screenshots.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex !== null) {
                if (e.key === 'ArrowRight') showNextImg();
                if (e.key === 'ArrowLeft') showPrevImg();
            }
            if (e.key === 'Escape') {
                if (lightboxIndex !== null) setLightboxIndex(null);
                else handleClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, showNextImg, showPrevImg]);

    // --- ANIMATION VARIANTS ---
    const containerVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
        exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
    };

    const contentVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1, y: 0,
            transition: { delay: 0.15 + (i * 0.05), duration: 0.4, type: "spring", stiffness: 100 }
        })
    };

    return (
        <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>

            {/* LIGHTBOX OVERLAY */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center"
                        onClick={() => setLightboxIndex(null)}
                    >
                        <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50">
                            <X size={32} />
                        </button>
                        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12" onClick={(e) => e.stopPropagation()}>
                            {project.screenshots.length > 1 && (
                                <button onClick={showPrevImg} className="absolute left-2 sm:left-8 text-white/50 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all">
                                    <ChevronLeft size={48} />
                                </button>
                            )}
                            <motion.div
                                key={lightboxIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`w-full h-full max-w-6xl max-h-[85vh] rounded-xl shadow-2xl ${project.screenshots[lightboxIndex]} flex items-center justify-center ring-4 ring-white/10`}
                            >
                                <div className="text-center">
                                    <span className="font-mono text-white/20 text-4xl font-bold block mb-2">PREVIEW</span>
                                    <span className="font-mono text-white/40 text-sm">{lightboxIndex + 1} / {project.screenshots.length}</span>
                                </div>
                            </motion.div>
                            {project.screenshots.length > 1 && (
                                <button onClick={showNextImg} className="absolute right-2 sm:right-8 text-white/50 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all">
                                    <ChevronRight size={48} />
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                key={project.id}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-5xl max-h-[90vh] rounded-[36px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-[8px] flex flex-col relative"
                style={{ backgroundColor: theme.colors.cardBg, borderColor: theme.colors.primary }}
            >
                {/* --- FLOATING ICON (FIXED Z-INDEX) --- */}
                <div className="absolute top-48 sm:top-64 right-8 -translate-y-1/2 z-30 pointer-events-none">
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl ${project.color} shadow-2xl flex items-center justify-center text-white border-4`}
                        style={{ borderColor: theme.colors.cardBg }}
                    >
                        {React.cloneElement(project.icon as React.ReactElement<any>, { size: 40 })}
                    </motion.div>
                </div>

                {/* --- HERO HEADER --- */}
                <div className={`relative h-48 sm:h-64 shrink-0 ${project.color} overflow-hidden`}>
                    {/* Background Pattern Overlay */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                    {/* Giant Background Icon */}
                    <div className="absolute -right-12 -bottom-16 text-white opacity-10 transform rotate-12 scale-[3]">
                        {project.icon}
                    </div>

                    {/* Header Content */}
                    <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                        {/* Top Bar */}
                        <div className="flex justify-between items-start">
                            <div className="flex gap-2">
                                <span className="bg-black/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                                    {project.year}
                                </span>
                                <span className="bg-white/90 text-[var(--accent)] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm" style={{ color: theme.colors.accent }}>
                                    {project.category}
                                </span>
                            </div>

                            {/* Header Actions */}
                            <div className="flex items-center gap-2">
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={toggleFavorite}
                                    className={`p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${isFavorite ? 'bg-yellow-400 border-yellow-300 text-white shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'bg-black/20 border-white/20 text-white hover:bg-white hover:text-black'}`}
                                    title={t('game.add_fav')}
                                >
                                    <Star size={24} fill={isFavorite ? "currentColor" : "none"} />
                                </motion.button>

                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleClose}
                                    className="bg-black/20 hover:bg-white hover:text-black text-white p-2 rounded-full transition-all duration-200 backdrop-blur-md border border-white/20"
                                >
                                    <X size={24} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Title Area */}
                        <div className="mt-auto pr-24">
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl sm:text-6xl font-black tracking-tighter text-white drop-shadow-md leading-none"
                            >
                                {project.title}
                            </motion.h1>
                            <p className="text-white/80 font-bold text-sm sm:text-base mt-1 ml-1">{project.role[language]}</p>
                        </div>
                    </div>
                </div>

                {/* --- CONTENT BODY --- */}
                <div className="flex-1 overflow-y-auto custom-scrollbar relative" style={{ backgroundColor: theme.colors.cardBg }}>

                    <div className="p-8 pt-16 space-y-8">

                        {/* 1. GALLERY STRIP */}
                        {project.screenshots && project.screenshots.length > 0 && (
                            <motion.div custom={0} variants={contentVariants} initial="hidden" animate="visible">
                                <div className="flex items-center gap-2 mb-4">
                                    <ImageIcon size={18} style={{ color: theme.colors.text }} />
                                    <span className="text-sm font-black uppercase tracking-widest" style={{ color: theme.colors.text }}>{t('game.gallery')}</span>
                                </div>
                                <div className="-mx-4 px-4 py-4 flex gap-4 overflow-x-auto no-scrollbar">
                                    {project.screenshots.map((bg, i) => (
                                        <motion.button
                                            key={i}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setLightboxIndex(i)}
                                            className={`w-64 h-40 shrink-0 rounded-xl shadow-md ${bg} flex items-center justify-center relative group border-4 overflow-hidden`}
                                            style={{ borderColor: theme.colors.primary }}
                                        >
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                            <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                IMG_0{i+1}
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* 2. DESCRIPTION CARD */}
                            <motion.div custom={1} variants={contentVariants} initial="hidden" animate="visible" className="lg:col-span-2 flex flex-col">
                                <div className="rounded-3xl p-6 sm:p-8 shadow-sm border h-full" style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}>
                                    <h3 className="text-xl font-black mb-6 flex items-center gap-2" style={{ color: theme.colors.text }}>
                                        <span className={`w-2 h-8 rounded-full ${project.color}`}></span>
                                        {t('game.desc')}
                                    </h3>
                                    <p className="leading-relaxed whitespace-pre-wrap text-base sm:text-lg font-medium opacity-80" style={{ color: theme.colors.text }}>
                                        {project.details[language]}
                                    </p>
                                </div>
                            </motion.div>

                            {/* 3. SIDEBAR STATS */}
                            <div className="lg:col-span-1 space-y-6">

                                {/* Technologies */}
                                <motion.div custom={3} variants={contentVariants} initial="hidden" animate="visible" className="rounded-3xl p-6 shadow-sm border" style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}>
                                    <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 opacity-60" style={{ color: theme.colors.text }}>
                                        <Cpu size={14} /> {t('game.tech')}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map(t => (
                                            <span key={t} className="px-3 py-1.5 text-xs font-bold rounded-full shadow-sm cursor-default border" style={{ backgroundColor: theme.colors.cardBg, color: theme.colors.text, borderColor: theme.colors.cardBg }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Features */}
                                <motion.div custom={4} variants={contentVariants} initial="hidden" animate="visible" className="rounded-3xl p-6 shadow-sm border" style={{ backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }}>
                                    <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 opacity-60" style={{ color: theme.colors.text }}>
                                        <ListChecks size={14} /> {t('game.features')}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.features.map(f => (
                                            <div key={f} className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl border" style={{ backgroundColor: theme.colors.cardBg, color: theme.colors.text, borderColor: theme.colors.cardBg }}>
                                                <CheckCircle2 size={14} className="shrink-0" style={{ color: theme.colors.accent }} />
                                                <span>{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};