import { useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { Theme } from '../../types';
import { getComplementaryColor } from '../../utils/themeHelpers';

interface LivingBackgroundProps {
    theme: Theme;
    paused?: boolean; // New prop to control animation state
}

export const LivingBackground = ({ theme, paused = false }: LivingBackgroundProps) => {

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
        if (paused) return; // Don't attach listeners if paused

        const handleMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, [mouseX, mouseY, paused]);

    // --- STATIC FALLBACK (Used for Mobile OR when Paused) ---
    const StaticLayer = () => (
        <div className="absolute inset-0 w-full h-full opacity-30 transition-opacity duration-500">
            <div
                className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen"
                style={{ backgroundColor: primaryColor, opacity: theme.isDark ? 0.2 : 0.1 }}
            ></div>
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen"
                style={{ backgroundColor: secondaryColor, opacity: theme.isDark ? 0.15 : 0.1 }}
            ></div>
        </div>
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-transparent">

            {/* 1. Always show Static Layer on Mobile OR if Paused */}
            <div className={`absolute inset-0 w-full h-full ${paused ? 'block' : 'md:hidden'}`}>
                <StaticLayer />
            </div>

            {/* 2. Only render Heavy Animation on Desktop AND if NOT Paused */}
            {!paused && (
                <div className="hidden md:block absolute inset-0 w-full h-full">
                    <svg className="hidden">
                        <defs>
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="45" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                <feBlend in="SourceGraphic" in2="goo" />
                            </filter>
                        </defs>
                    </svg>

                    <div
                        className="absolute inset-0 w-full h-full will-change-transform"
                        style={{ filter: 'url(#goo)' }}
                    >
                        {/* Blob 1 */}
                        <motion.div
                            animate={{
                                x: [0, 100, 0, -100, 0],
                                y: [0, -50, 50, -50, 0],
                                scale: [1, 1.2, 1, 1.1, 1],
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            className={`absolute -top-[10%] -left-[10%] w-[45vw] h-[45vw] rounded-full blur-[80px] 
                                ${theme.isDark ? 'opacity-30 mix-blend-screen' : 'opacity-40 mix-blend-normal'} will-change-transform`}
                            style={{ backgroundColor: primaryColor }}
                        />

                        {/* Blob 2 */}
                        <motion.div
                            animate={{
                                x: [0, -100, 0, 100, 0],
                                y: [0, 50, -50, 50, 0],
                                scale: [1.1, 1, 1.2, 1, 1.1],
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                            className={`absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[80px] 
                                ${theme.isDark ? 'opacity-20 mix-blend-screen' : 'opacity-30 mix-blend-normal'} will-change-transform`}
                            style={{ backgroundColor: secondaryColor }}
                        />

                        {/* Mouse Blob */}
                        <motion.div
                            style={{
                                x, y,
                                translateX: '-50%', translateY: '-50%',
                                backgroundColor: primaryColor
                            }}
                            className={`absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-[60px] 
                                ${theme.isDark ? 'opacity-15 mix-blend-screen' : 'opacity-50 mix-blend-normal'} will-change-transform`}
                        />
                    </div>
                </div>
            )}

            {/* Texture & Vignette (Always visible) */}
            <motion.div
                className="absolute inset-0 w-full h-full z-10 will-change-transform"
                style={{
                    backgroundImage: `radial-gradient(${theme.colors.text} 1.5px, transparent 1.5px)`,
                    backgroundSize: '48px 48px',
                    opacity: theme.isDark ? 0.04 : 0.06
                }}
                // Pause texture animation if paused to save resources
                animate={!paused ? { backgroundPosition: ["0px 0px", "48px 48px"] } : undefined}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

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