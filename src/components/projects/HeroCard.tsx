import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Terminal, ChevronRight } from "lucide-react";
import type { Theme } from "../../types";
import { useLanguage } from "../../context/LanguageContext";

export const HeroCard = ({
  onOpenTrainer,
  theme,
}: {
  onOpenTrainer: () => void;
  theme: Theme;
}) => {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const [imgError, setImgError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set((mouseX / width - 0.5) * 200);
    y.set((mouseY / height - 0.5) * 200);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center perspective-container p-2 sm:p-6 will-change-transform"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9, y: 50, rotateX: 10 }}
      animate={
        isReady
          ? { opacity: 1, scale: 1, y: 0, rotateX: 0 }
          : { opacity: 0, scale: 0.9, y: 50 }
      }
      exit={{
        opacity: 0,
        scale: 0.85,
        y: 150,
        rotateX: -20,
        transition: { duration: 0.35, ease: "backIn" },
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      <motion.div
        ref={cardRef}
        className="relative w-full max-w-[95vw] sm:max-w-[600px] rounded-[24px] sm:rounded-[40px] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden transform-style-3d group cursor-default ring-1 ring-white/10"
        style={{
          backgroundColor: theme.colors.cardBg,
          rotateX,
          rotateY,
        }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex flex-row h-full min-h-[160px] sm:min-h-[240px]">
          {/* LEFT: Accent Bar & Avatar */}
          <div
            className="w-28 sm:w-48 relative shrink-0 flex items-center justify-center z-20"
            style={{ backgroundColor: theme.colors.accent }}
          >
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            {/* Avatar Container */}
            <div className="relative sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:right-[-50px] z-50">
              <motion.div
                layoutId="shared-avatar"
                className="w-20 h-20 sm:w-40 sm:h-40 rounded-full flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(0,0,0,0.4)] border-[3px] sm:border-[6px] overflow-hidden relative bg-white dark:bg-gray-800"
                style={{
                  borderColor: theme.colors.cardBg,
                  color: theme.colors.text,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                {!imgError ? (
                  <img
                    src="/profile/me.jpg"
                    alt="Lukas"
                    className="w-full h-full object-cover"
                    onLoad={() => setIsReady(true)}
                    onError={() => {
                      setImgError(true);
                      setIsReady(true);
                    }}
                    decoding="async"
                  />
                ) : (
                  <span className="text-2xl sm:text-5xl font-black">LH</span>
                )}
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Content */}
          <motion.div
            className="flex-1 p-4 sm:p-8 sm:pl-20 flex flex-col justify-center text-left relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            <h1
              className="text-xl sm:text-5xl font-black leading-none tracking-tighter mb-2 sm:mb-3"
              style={{ color: theme.colors.text }}
            >
              Lukas Höwarth
            </h1>

            <div className="inline-flex items-center justify-start gap-2 mb-4 sm:mb-8">
              <motion.span
                layoutId="shared-badge"
                className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wide flex items-center gap-2 opacity-80"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.text,
                }}
              >
                <Terminal size={12} className="sm:w-3.5 sm:h-3.5" />{" "}
                {t("hero.role")}
              </motion.span>
            </div>

            <motion.button
              onClick={onOpenTrainer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, y: 4 }}
              className="group relative pl-4 pr-2 py-2 sm:pl-6 sm:pr-2 sm:py-3 rounded-full font-black text-[10px] sm:text-sm uppercase tracking-wider flex items-center gap-2 sm:gap-4 shadow-xl border-b-[3px] sm:border-b-4 transition-all active:border-b-0 active:translate-y-[3px] active:shadow-none mr-auto cursor-pointer"
              style={{
                backgroundColor: theme.colors.accent,
                color: theme.colors.contrastAccent,
                borderColor: "rgba(0,0,0,0.2)",
              }}
            >
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none"></div>

              <span className="relative z-10 drop-shadow-sm">
                {t("hero.open")}
              </span>

              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center relative z-10 group-hover:bg-white group-hover:text-black transition-colors">
                <ChevronRight
                  size={14}
                  strokeWidth={3}
                  className="sm:w-[18px] sm:h-[18px]"
                />
              </div>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
