import type { Theme } from "../../types";
import {useMemo} from "react";

interface ThemeBackgroundProps {
    theme: Theme;
    paused?: boolean;
}

export const ThemeBackground = ({ theme, paused = false }: ThemeBackgroundProps) => {
    const baseOpacity = theme.isDark
        ? (paused ? 'opacity-10' : 'opacity-20')
        : (paused ? 'opacity-30' : 'opacity-60');

    // 1. FREEZE ANIMATION:
    // We use 'animation-play-state' to pause the CSS animation instantly at its current frame.
    // This prevents the "jump" because the element doesn't reset to 0, it just stops moving.
    const animationStyle: React.CSSProperties = {
        animationPlayState: paused ? 'paused' : 'running',
    };

    const getTriforceBg = (color: string) => {
        const svgString = `
            <svg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'>
                <path d='M30 0 L45 26 L15 26 Z M15 26 L30 52 L0 52 Z M45 26 L60 52 L30 52 Z' fill='${encodeURIComponent(color)}'/>
            </svg>
        `.trim().replace(/\s+/g, ' ');
        return `url("data:image/svg+xml,${svgString}")`;
    };

    const triforceBg = useMemo(() => getTriforceBg(theme.colors.accent), [theme.colors.accent]);

    return (
        <div className={`absolute inset-0 z-0 pointer-events-none text-[var(--accent)] transition-all duration-1000 ${baseOpacity} overflow-hidden`}>

            {/* --- GLOBAL KEYFRAMES --- */}
            {/* We use a Transform translation for GPU acceleration instead of background-position */}
            <style>{`
                @keyframes slide-vertical {
                    from { transform: translateY(0); }
                    to { transform: translateY(-52px); } /* Matches pattern height */
                }
                .gpu-scroll {
                    animation: slide-vertical 4s linear infinite;
                    will-change: transform; /* Hint to browser to promote layer */
                }
            `}</style>

            {/* --- PATTERNS --- */}

            {/* Dots: Pulse (Scale/Opacity) is cheap, keeping as is */}
            {theme.pattern === 'dots' && (
                <div
                    className={`absolute inset-0 bg-[radial-gradient(currentColor_2px,transparent_2px)] [background-size:12px_12px] ${!paused ? 'animate-pulse-subtle' : ''}`}
                    style={animationStyle}
                ></div>
            )}

            {/* Triangles: CONVERTED TO GPU TRANSFORM SCROLL */}
            {theme.pattern === 'triangles' && (
                <div
                    className="absolute inset-0 w-full -bottom-16 gpu-scroll" // Taller height (-bottom-16) to allow scrolling
                    style={{
                        backgroundImage: triforceBg,
                        backgroundSize: '60px 52px',
                        backgroundRepeat: 'repeat',
                        height: 'calc(100% + 52px)', // Ensure we have extra pixels to scroll into view
                        ...animationStyle
                    }}
                ></div>
            )}

            {/* Lines: Static for now, or could be animated similarly if desired */}
            {theme.pattern === 'lines' && (
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,currentColor,currentColor_4px,transparent_2px,transparent_20px)]"></div>
            )}

            {/* Checkers */}
            {theme.pattern === 'checkers' && (
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,currentColor_25%,transparent_25%,transparent_75%,currentColor_75%,currentColor),repeating-linear-gradient(45deg,currentColor_25%,transparent_25%,transparent_75%,currentColor_75%,currentColor)] [background-size:60px_60px] [background-position:0_0,30px_30px] opacity-80"></div>
            )}

            {/* Cross */}
            {theme.pattern === 'cross' && (
                <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(90deg, transparent 48%, currentColor 48%, currentColor 52%, transparent 52%), linear-gradient(transparent 48%, currentColor 48%, currentColor 52%, transparent 52%)`, backgroundSize: '40px 40px' }}></div>
            )}

            {/* Zigzag */}
            {theme.pattern === 'zigzag' && (
                <div className="absolute inset-0 bg-[linear-gradient(135deg,currentColor_25%,transparent_25%),linear-gradient(225deg,currentColor_25%,transparent_25%),linear-gradient(45deg,currentColor_25%,transparent_25%),linear-gradient(315deg,currentColor_25%,transparent_25%)] [background-position:20px_0,20px_0,0_0,0_0] [background-size:40px_40px] [background-repeat:repeat] opacity-80"></div>
            )}
        </div>
    );
};