import { motion } from 'framer-motion';
import type { Theme } from "../../types";
import {useState} from "react";

interface StatusBarProps {
    time: string;
    theme: Theme;
    onOpenProfile: () => void;
    showProfile: boolean; // Controls visibility of the button
}

export const StatusBar = ({ time, theme, onOpenProfile, showProfile }: StatusBarProps) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div
            className="flex justify-between items-center px-6 py-4 z-50 relative select-none h-16 shrink-0 font-bold text-xs tracking-widest uppercase"
            style={{ color: theme.colors.text }}
        >
            {/* LEFT: User Profile Button (Target of Hero Card Animation) */}
            <div className="min-w-[140px] h-full flex items-center">
                {showProfile && (
                    <motion.button
                        layoutId="hero-morph" // SHARED ID FOR MORPHING
                        onClick={onOpenProfile}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="flex items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-full cursor-pointer border shadow-sm backdrop-blur-md group overflow-hidden relative"
                        style={{
                            backgroundColor: theme.isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.4)',
                            borderColor: theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                        }}
                        title="Open Profile"
                    >
                        {/* Avatar Circle */}
                        <motion.div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-inner relative overflow-hidden shrink-0"
                            style={{ backgroundColor: theme.colors.accent }}
                        >
                            {!imgError ? (
                                <img
                                    src="/public/profile/me.jpg"
                                    alt="Lukas"
                                    className="w-full h-full object-cover"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <span className="font-black text-[10px] z-10">LH</span>
                            )}

                            {/* Shine/Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
                        </motion.div>

                        {/* Text Label - Fade in/out to avoid squishing during morph */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-start justify-center leading-none whitespace-nowrap"
                        >
                            <span className="opacity-100 font-black text-xs group-hover:text-[var(--accent)] transition-colors duration-300">Lukas</span>
                            <span className="opacity-50 text-[9px] font-bold mt-0.5 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.6)]"></span>
                                Online
                            </span>
                        </motion.div>
                    </motion.button>
                )}
            </div>

            {/* RIGHT: System Tray */}
            <div className="flex items-center gap-6 opacity-60">
                <span className="tabular-nums font-mono font-bold text-sm">
                    {time}
                </span>
            </div>
        </div>
    );
};