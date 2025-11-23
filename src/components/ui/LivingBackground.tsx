import { useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { Theme } from '../../types';
import { getComplementaryColor } from '../../utils/themeHelpers';

export const LivingBackground = ({ theme }: { theme: Theme }) => {

    const primaryColor = theme.colors.accent;
    const secondaryColor = useMemo(() => getComplementaryColor(primaryColor), [primaryColor]);

    // --- MOUSE INTERACTION ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Tighter spring for Light Mode to feel more "physical"
    const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-transparent">

            {/* --- MOBILE OPTIMIZATION: STATIC FALLBACK ---
                Replaces the heavy animation with static gradients on small screens.
                Zero performance cost.
            */}
            <div className="md:hidden absolute inset-0 w-full h-full opacity-30">
                <div
                    className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen"
                    style={{ backgroundColor: primaryColor, opacity: theme.isDark ? 0.2 : 0.1 }}
                ></div>
                <div
                    className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen"
                    style={{ backgroundColor: secondaryColor, opacity: theme.isDark ? 0.15 : 0.1 }}
                ></div>
            </div>

            {/* --- DESKTOP ONLY: HIGH FIDELITY ANIMATION ---
                Only renders on md (medium) screens and up.
            */}
            <div className="hidden md:block absolute inset-0 w-full h-full">

                {/* SVG FILTER FOR LIQUID FUSION */}
                <svg className="hidden">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="45" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>

                {/* GOOEY LAYER */}
                <div
                    className="absolute inset-0 w-full h-full will-change-transform"
                    style={{ filter: 'url(#goo)' }}
                >
                    {/* BLOB 1: PRIMARY (Top-Left Orbit) */}
                    <motion.div
                        animate={{
                            x: [0, 100, 0, -100, 0],
                            y: [0, -50, 50, -50, 0],
                            scale: [1, 1.2, 1, 1.1, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        // Size reduced to ~45vw to create distinct "bubbles"
                        className={`absolute -top-[10%] -left-[10%] w-[45vw] h-[45vw] rounded-full blur-[80px] 
                            ${theme.isDark ? 'opacity-30 mix-blend-screen' : 'opacity-40 mix-blend-normal'} will-change-transform`}
                        style={{ backgroundColor: primaryColor }}
                    />

                    {/* BLOB 2: COMPLEMENTARY (Bottom-Right Orbit) */}
                    <motion.div
                        animate={{
                            x: [0, -100, 0, 100, 0],
                            y: [0, 50, -50, 50, 0],
                            scale: [1.1, 1, 1.2, 1, 1.1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        // Size reduced to ~50vw
                        className={`absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[80px] 
                            ${theme.isDark ? 'opacity-20 mix-blend-screen' : 'opacity-30 mix-blend-normal'} will-change-transform`}
                        style={{ backgroundColor: secondaryColor }}
                    />

                    {/* --- INTERACTIVE MOUSE BLOB --- */}
                    {/* Tuned opacity for Light Mode to be visible ("ink" effect) */}
                    <motion.div
                        style={{
                            x,
                            y,
                            translateX: '-50%',
                            translateY: '-50%',
                            backgroundColor: primaryColor
                        }}
                        className={`absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-[60px] 
                            ${theme.isDark ? 'opacity-15 mix-blend-screen' : 'opacity-50 mix-blend-normal'} will-change-transform`}
                    />
                </div>
            </div>

            {/* --- TEXTURE OVERLAY (Common) --- */}
            <motion.div
                className="absolute inset-0 w-full h-full z-10 will-change-transform"
                style={{
                    backgroundImage: `radial-gradient(${theme.colors.text} 1.5px, transparent 1.5px)`,
                    backgroundSize: '48px 48px',
                    opacity: theme.isDark ? 0.04 : 0.06
                }}
                animate={{
                    backgroundPosition: ["0px 0px", "48px 48px"]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* --- VIGNETTE (Common) --- */}
            <div
                className="absolute inset-0 z-20"
                style={{
                    background: `radial-gradient(circle at center, transparent 40%, ${theme.isDark ? '#020617' : '#f1f5f9'} 100%)`,
                    opacity: 0.8
                }}
            />
        </div>
    );
};