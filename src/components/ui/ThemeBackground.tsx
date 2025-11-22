import type {Theme} from "../../types";

export const ThemeBackground = ({ theme }: { theme: Theme }) => {
    // BOLDNESS UPDATE: Base opacity increased from 10/40 to 20/70 for more pop
    const baseOpacity = theme.isDark ? 'opacity-20' : 'opacity-70';

    return (
        <div className={`absolute inset-0 z-0 pointer-events-none text-[var(--accent)] transition-all duration-1000 ${baseOpacity}`}>

            {/* Dots: Made larger (3px) and bolder */}
            {theme.pattern === 'dots' && (
                <div className="absolute inset-0 bg-[radial-gradient(currentColor_2px,transparent_2px)] [background-size:12px_12px] animate-pulse-subtle"></div>
            )}

            {/* Triangles: ZELDA TRIFORCE (Inline SVG Implementation) */}
            {theme.pattern === 'triangles' && (
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern
                            id="triforce-pattern"
                            x="0"
                            y="0"
                            width="60"
                            height="52"
                            patternUnits="userSpaceOnUse"
                        >
                            {/* Native SVG Animation for the scroll effect */}
                            <animateTransform
                                attributeName="patternTransform"
                                type="translate"
                                from="0 0"
                                to="0 52"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                            {/* The Triforce Path */}
                            <path
                                d="M30 0 L45 26 L15 26 Z M15 26 L30 52 L0 52 Z M45 26 L60 52 L30 52 Z"
                                fill={theme.colors.accent}
                            />
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#triforce-pattern)" />
                </svg>
            )}

            {/* Lines: Increased thickness to 2px for boldness */}
            {theme.pattern === 'lines' && (
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,currentColor,currentColor_4px,transparent_2px,transparent_20px)] "></div>
            )}

            {/* Checkers: Standard but high contrast */}
            {theme.pattern === 'checkers' && (
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,currentColor_25%,transparent_25%,transparent_75%,currentColor_75%,currentColor),repeating-linear-gradient(45deg,currentColor_25%,transparent_25%,transparent_75%,currentColor_75%,currentColor)] [background-size:60px_60px] [background-position:0_0,30px_30px] opacity-80"></div>
            )}

            {/* Cross: Thicker lines (2px) */}
            {theme.pattern === 'cross' && (
                <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(90deg, transparent 48%, currentColor 48%, currentColor 52%, transparent 52%), linear-gradient(transparent 48%, currentColor 48%, currentColor 52%, transparent 52%)`, backgroundSize: '40px 40px' }}></div>
            )}

            {/* Zigzag: Thicker bands */}
            {theme.pattern === 'zigzag' && (
                <div className="absolute inset-0 bg-[linear-gradient(135deg,currentColor_25%,transparent_25%),linear-gradient(225deg,currentColor_25%,transparent_25%),linear-gradient(45deg,currentColor_25%,transparent_25%),linear-gradient(315deg,currentColor_25%,transparent_25%)] [background-position:20px_0,20px_0,0_0,0_0] [background-size:40px_40px] [background-repeat:repeat] opacity-80"></div>
            )}
        </div>
    );
};