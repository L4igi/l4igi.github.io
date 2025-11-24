import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
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
      className="w-full h-full flex items-center justify-center perspective-container p-4 sm:p-6 will-change-transform"
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
        className="relative w-full max-w-[600px] rounded-[32px] sm:rounded-[40px] shadow-2xl overflow-hidden transform-style-3d group cursor-pointer ring-1 ring-black/5"
        style={{
          backgroundColor: theme.colors.cardBg,
          rotateX,
          rotateY,
        }}
        onClick={onOpenTrainer}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex flex-col sm:flex-row h-full min-h-[180px] sm:min-h-[240px]">
          {/* LEFT: Accent Bar & Avatar */}
          <div
            className="w-full sm:w-48 relative shrink-0 flex items-center justify-center sm:justify-end p-6 sm:p-0"
            style={{ backgroundColor: theme.colors.accent }}
          >
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            {/* Avatar Container */}
            <div className="relative sm:absolute sm:right-[-50px] z-50">
              <motion.div
                layoutId="shared-avatar"
                className="w-24 h-24 sm:w-40 sm:h-40 rounded-full flex items-center justify-center shadow-xl border-[4px] sm:border-[6px] overflow-hidden relative bg-white dark:bg-gray-800"
                style={{
                  borderColor: theme.colors.cardBg,
                  color: theme.colors.text,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                  <span className="text-3xl sm:text-5xl font-black">LH</span>
                )}
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Content */}
          <motion.div
            className="flex-1 p-6 sm:p-8 sm:pl-20 flex flex-col justify-center text-center sm:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            <h1
              className="text-3xl sm:text-5xl font-black leading-none tracking-tighter mb-3"
              style={{ color: theme.colors.text }}
            >
              Lukas Höwarth
            </h1>

            <div className="inline-flex items-center justify-center sm:justify-start gap-2 mb-6 sm:mb-8">
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-3 group/btn shadow-lg transition-all"
              style={{
                backgroundColor: theme.colors.accent,
                color: theme.colors.contrastAccent,
              }}
            >
              {t("hero.open")}
              <ArrowRight
                size={14}
                className="sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform"
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
