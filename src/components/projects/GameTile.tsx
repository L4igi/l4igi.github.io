import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Project, Theme } from "../../types";
import type { Variants } from "motion";

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: {
        y: 0, opacity: 1, scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    }
};

interface GameTileProps {
    project: Project;
    onClick: () => void;
    onHover: (e: React.MouseEvent) => void;
    isSelected: boolean;
    isPressed: boolean;
    isFavorite: boolean;
    theme: Theme;
}

export const GameTile = ({ project, onClick, onHover, isSelected, isFavorite, theme }: GameTileProps) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-50, 50], [10, -10]);
    const rotateY = useTransform(x, [-50, 50], [-10, 10]);

    const handleMouseMove = (event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        x.set((mouseX / width - 0.5) * 100);
        y.set((mouseY / height - 0.5) * 100);
        onHover(event);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div className="w-32 h-32 sm:w-48 sm:h-48 perspective-container relative z-10" variants={itemVariants} layout>
            <motion.button
                onClick={onClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={isSelected ? { scale: 1.15, y: -10 } : { scale: 1, y: 0 }}
                whileTap={{ scale: 0.9 }}
                style={{ rotateX, rotateY }}
                className="w-full h-full relative group transform-style-3d"
            >
                {/* Flex Column Layout: Ensures Icon and Text never overlap */}
                <div
                    className="w-full h-full rounded-2xl shadow-xl flex flex-col relative overflow-hidden border-8"
                    style={{
                        backgroundColor: theme.colors.cardBg,
                        borderColor: theme.colors.cardBg
                    }}
                >

                    {/* Background Color Layer */}
                    <div className={`absolute inset-2 rounded-xl ${project.color} opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none`}></div>

                    {/* ICON SECTION: Takes all available top space */}
                    <div className="flex-1 w-full flex items-center justify-center relative z-10">
                        <div className={`p-4 sm:p-6 rounded-2xl ${project.color} text-white shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                            {React.cloneElement(project.icon as React.ReactElement<any>, { size: 28 })}
                        </div>
                    </div>

                    {/* LABEL SECTION: Sits naturally at the bottom */}
                    <div
                        className="shrink-0 w-full backdrop-blur-sm py-2 px-1 border-t z-20 relative"
                        style={{
                            backgroundColor: theme.isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                            borderColor: theme.colors.secondary
                        }}
                    >
                        <span
                            className="block text-[10px] sm:text-xs font-bold text-center truncate uppercase tracking-tight leading-none"
                            style={{ color: theme.colors.text }}
                        >
                            {project.title}
                        </span>
                    </div>

                    {/* Favorite Star */}
                    {isFavorite && <div className="absolute top-2 right-2 z-30 text-yellow-400 drop-shadow-md"><Star fill="currentColor" size={16} /></div>}
                </div>

                {/* Shadow beneath tile */}
                <motion.div
                    className="absolute -bottom-8 left-1/2 w-20 h-4 rounded-[100%] blur-md -z-10"
                    style={{ backgroundColor: theme.isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)' }}
                    animate={{ scale: isSelected ? 0.6 : 1, opacity: isSelected ? 0.2 : 0.4 }}
                />
            </motion.button>
        </motion.div>
    );
};