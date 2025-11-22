import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Terminal, Sparkles } from 'lucide-react';
import type { Theme } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

export const HeroCard = ({ onOpenTrainer, theme }: { onOpenTrainer: () => void, theme: Theme }) => {
    const { t } = useLanguage();
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const [imgError, setImgError] = useState(false);

    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        x.set((mouseX / width - 0.5) * 200);
        y.set((mouseY / height - 0.5) * 200);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            className="w-full h-full flex items-center justify-center perspective-container p-6"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.div
                layoutId="hero-morph"
                ref={cardRef}
                className="relative w-full max-w-[600px] rounded-[40px] shadow-2xl overflow-hidden transform-style-3d group cursor-pointer ring-1 ring-black/5"
                style={{
                    backgroundColor: theme.colors.cardBg,
                    rotateX,
                    rotateY
                }}
                onClick={onOpenTrainer}
                whileHover={{ scale: 1.02 }}
            >
                <motion.div
                    className="flex flex-col sm:flex-row h-full min-h-[240px]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                >

                    {/* LEFT: Accent Bar & Avatar */}
                    <div className="w-full sm:w-48 relative shrink-0 flex items-center justify-center sm:justify-end p-8 sm:p-0" style={{ backgroundColor: theme.colors.accent }}>
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                        {/* Avatar overlapping the edge */}
                        <div className="relative sm:absolute sm:right-[-50px] z-10">
                            <div
                                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center shadow-xl border-[6px] overflow-hidden relative bg-white dark:bg-gray-800 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2"
                                style={{
                                    borderColor: theme.colors.cardBg,
                                    color: theme.colors.text
                                }}
                            >
                                {!imgError ? (
                                    <img
                                        src="/public/profile/me.jpg"
                                        alt="Lukas"
                                        className="w-full h-full object-cover"
                                        onError={() => setImgError(true)}
                                    />
                                ) : (
                                    <span className="text-5xl font-black">LH</span>
                                )}
                            </div>
                            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-[3px] rounded-full shadow-sm" style={{ borderColor: theme.colors.cardBg }}></div>
                        </div>
                    </div>

                    {/* RIGHT: Content */}
                    <div className="flex-1 p-8 sm:pl-20 flex flex-col justify-center text-center sm:text-left">

                        <div className="mb-1.5 flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-widest opacity-50" style={{ color: theme.colors.text }}>
                            <Sparkles size={12} /> Player Profile
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-black leading-none tracking-tighter mb-3" style={{ color: theme.colors.text }}>
                            Lukas Höwarth
                        </h1>

                        <div className="inline-flex items-center justify-center sm:justify-start gap-2 mb-8">
                            <span
                                className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center gap-2 opacity-80"
                                style={{ backgroundColor: theme.colors.primary, color: theme.colors.text }}
                            >
                                <Terminal size={14} /> {t('hero.role')}
                            </span>
                        </div>

                        {/* Nintendo Style Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-3 group/btn shadow-lg transition-all"
                            style={{ backgroundColor: theme.colors.accent, color: theme.colors.contrastAccent }}
                        >
                            {t('hero.open')}
                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};