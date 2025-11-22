import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Terminal, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type {Theme} from "../../types";

export const HeroCard = ({ onOpenTrainer, theme }: { onOpenTrainer: () => void, theme: Theme }) => {
    const { t } = useLanguage();
    const cardRef = useRef<HTMLDivElement>(null);
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
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.div
                ref={cardRef}
                className="relative w-full max-w-[550px] rounded-[32px] shadow-2xl overflow-hidden transform-style-3d group cursor-pointer ring-1 ring-black/5"
                style={{
                    backgroundColor: theme.colors.cardBg, // DYNAMIC THEME COLOR
                    rotateX,
                    rotateY
                }}
                onClick={onOpenTrainer}
                whileHover={{ scale: 1.02 }}
            >
                <div className="flex flex-col sm:flex-row h-full min-h-[220px]">

                    {/* LEFT: Accent Bar & Avatar */}
                    <div className="w-full sm:w-32 relative shrink-0 flex items-center justify-center sm:justify-end p-6 sm:p-0" style={{ backgroundColor: theme.colors.accent }}>
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                        <div className="relative sm:absolute sm:right-[-40px] z-10">
                            <div
                                className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black shadow-lg border-[4px]"
                                style={{
                                    backgroundColor: theme.colors.cardBg,
                                    borderColor: theme.colors.cardBg,
                                    color: theme.colors.text
                                }}
                            >
                                LH
                            </div>
                            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 rounded-full" style={{ borderColor: theme.colors.cardBg }}></div>
                        </div>
                    </div>

                    {/* RIGHT: Content */}
                    <div className="flex-1 p-8 sm:pl-16 flex flex-col justify-center text-center sm:text-left">

                        <div className="mb-1 flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-widest opacity-50" style={{ color: theme.colors.text }}>
                            <Sparkles size={12} /> Player Profile
                        </div>

                        <h1 className="text-4xl font-black leading-none tracking-tight mb-3" style={{ color: theme.colors.text }}>
                            Lukas Höwarth
                        </h1>

                        <div className="inline-flex items-center justify-center sm:justify-start gap-2 mb-6">
                            <span
                                className="px-2 py-1 rounded text-xs font-bold uppercase tracking-wide flex items-center gap-2 opacity-80"
                                style={{ backgroundColor: theme.colors.primary, color: theme.colors.text }}
                            >
                                <Terminal size={12} /> {t('hero.role')}
                            </span>
                        </div>

                        <motion.button
                            className="w-full sm:w-auto px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-3 group/btn hover:shadow-lg transition-all"
                            style={{ backgroundColor: theme.colors.text, color: theme.colors.cardBg }}
                        >
                            {t('hero.open')}
                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};