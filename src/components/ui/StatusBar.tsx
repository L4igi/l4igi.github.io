import { useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { Theme } from "../../types";

interface StatusBarProps {
  time: string;
  theme: Theme;
  onOpenProfile: () => void;
  onGoHome: () => void;
  showProfile: boolean;
}

export const StatusBar = ({
  time,
  theme,
  onOpenProfile,
  onGoHome,
  showProfile,
}: StatusBarProps) => {
  const [imgError, setImgError] = useState(false);
  const [hours, minutes] = time.split(":");

  const handleClick = () => {
    if (showProfile) {
      onGoHome();
    } else {
      onOpenProfile();
    }
  };

  return (
    <div
      className="flex justify-between items-center px-6 py-4 z-50 relative select-none h-16 shrink-0 font-bold text-xs tracking-widest uppercase"
      style={{ color: theme.colors.text }}
    >
      {/* LEFT: User Profile Button */}
      <div className="min-w-[140px] h-full flex items-center">
        {showProfile && (
          <motion.button
            onClick={handleClick} // Use the smart handler
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="flex items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-full cursor-pointer border shadow-sm group overflow-hidden relative active:scale-95 transition-transform"
            style={{
              backgroundColor: theme.isDark
                ? "rgba(255,255,255,0.03)"
                : "rgba(255,255,255,0.4)",
              borderColor: theme.isDark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)",
            }}
            title={showProfile ? "Return to Home" : "Open Profile"}
          >
            {/* Avatar Circle */}
            <motion.div
              layout
              className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-inner relative overflow-hidden shrink-0"
              style={{ backgroundColor: theme.colors.accent }}
            >
              {!imgError ? (
                <motion.img
                  layout
                  src="/profile/me.jpg"
                  alt="Lukas"
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="font-black text-[10px] z-10">LH</span>
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
            </motion.div>

            {/* Text Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-start justify-center leading-none whitespace-nowrap"
            >
              <span className="opacity-100 font-black text-xs group-hover:text-[var(--accent)] transition-colors duration-300">
                Lukas
              </span>
            </motion.div>
          </motion.button>
        )}
      </div>

      {/* RIGHT: System Clock */}
      <div className="flex items-center justify-end min-w-[100px]">
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border shadow-sm"
          style={{
            backgroundColor: theme.isDark
              ? "rgba(255,255,255,0.03)"
              : "rgba(255,255,255,0.4)",
            borderColor: theme.isDark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.05)",
          }}
        >
          <Clock size={14} className="opacity-60" />
          <div className="font-mono text-sm font-bold flex items-center">
            <span>{hours}</span>
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="mx-[1px]"
            >
              :
            </motion.span>
            <span>{minutes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
