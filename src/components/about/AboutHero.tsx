import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Maximize2 } from "lucide-react";
import type { Theme } from "../../types";
import { createPortal } from "react-dom";

interface AboutHeroProps {
  theme: Theme;
  onClose: () => void;
  isImageLoaded: boolean;
  setIsImageLoaded: (loaded: boolean) => void;
}

export const AboutHero = ({
  theme,
  onClose,
  isImageLoaded,
  setIsImageLoaded,
}: AboutHeroProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) {
          e.stopPropagation(); // Stop modal from closing if we just want to unzoom
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, isZoomed]);

  return (
    <>
      <div className="relative shrink-0 w-full z-10 pb-2">
        {" "}
        {/* Added pb-2 for spacing */}
        {/* 1. BACKGROUND TEXTURE */}
        <div
          className="absolute inset-0 z-0 border-b-4"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.colors.secondary,
          }}
        >
          {/* Dot Pattern */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `radial-gradient(${theme.colors.text} 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"
            style={{ opacity: theme.isDark ? 0.4 : 0.1 }}
          />
        </div>
        {/* 2. CONTENT CONTAINER */}
        <div className="relative z-10 px-6 py-6 sm:px-10 sm:py-8 flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8">
          {/* CLOSE BUTTON */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2.5 rounded-full backdrop-blur-md border shadow-sm cursor-pointer transition-colors group"
              style={{
                backgroundColor: theme.isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)",
                borderColor: theme.colors.secondary,
              }}
            >
              <X
                size={20}
                strokeWidth={3}
                style={{ color: theme.colors.text }}
                className="group-hover:text-[var(--accent)] transition-colors"
              />
            </motion.button>
          </div>

          {/* AVATAR BOX (Clickable for Zoom) */}
          <div className="shrink-0 relative group">
            <motion.div
              layoutId="avatar-container"
              onClick={() => setIsZoomed(true)}
              whileHover={{ scale: 1.05, rotate: -2, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-[24px] border-[5px] shadow-xl overflow-hidden relative bg-white cursor-zoom-in z-20"
              style={{ borderColor: theme.colors.cardBg }}
            >
              {/* Hover Overlay Hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-30 flex items-center justify-center">
                <Maximize2
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md"
                  size={24}
                />
              </div>

              {!isImageLoaded && (
                <div
                  className="absolute inset-0 flex items-center justify-center font-black text-2xl animate-pulse"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.accent,
                  }}
                >
                  LH
                </div>
              )}

              <motion.img
                layoutId="avatar-image"
                src="/profile/me.jpg"
                alt="LH"
                className="w-full h-full object-cover"
                animate={{ opacity: isImageLoaded ? 1 : 0 }}
                onLoad={() => setIsImageLoaded(true)}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </motion.div>
          </div>

          {/* TEXT INFO */}
          <div className="flex-1 text-center sm:text-left pb-1">
            {/* NAME */}
            <motion.h2
              layoutId="hero-name"
              className="text-4xl sm:text-5xl font-black tracking-tighter leading-[0.9] mb-3 drop-shadow-sm"
              style={{
                color: theme.colors.text,
              }}
            >
              Lukas Höwarth
            </motion.h2>

            {/* BADGES ROW */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {/* High Contrast Role Badge */}
              <motion.div
                layoutId="hero-role"
                className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm border"
                style={{
                  // Using secondary color for background ensures it's visible on light mode
                  backgroundColor: theme.colors.secondary,
                  borderColor: theme.isDark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
                  color: theme.colors.text,
                }}
              >
                <Sparkles size={14} className="text-[var(--accent)]" />
                <span className="tracking-wide uppercase text-xs sm:text-sm opacity-90">
                  Fullstack Engineer
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ZOOM OVERLAY (Portal) */}
      {createPortal(
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 cursor-zoom-out"
            >
              {/* Zoomed Card */}
              <motion.div
                layoutId="avatar-container"
                className="relative w-full max-w-sm aspect-square rounded-[32px] border-[8px] shadow-2xl overflow-hidden bg-white"
                style={{ borderColor: theme.colors.cardBg }}
                onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing
              >
                <motion.img
                  layoutId="avatar-image"
                  src="/profile/me.jpg"
                  alt="LH"
                  className="w-full h-full object-cover"
                />

                {/* Floating Info on Zoomed Image */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent pt-12 text-white">
                  <h3 className="text-2xl font-black">Lukas Höwarth</h3>
                  <p className="opacity-80 font-mono text-sm">
                    Fullstack Engineer
                  </p>
                </div>

                {/* Close X inside Zoom */}
                <button
                  onClick={() => setIsZoomed(false)}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
                >
                  <X size={24} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};
