import { useRef, useState, useEffect } from "react";
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
  const [isShortScreen, setIsShortScreen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkHeight = () => {
      setIsShortScreen(window.innerHeight < 800);
    };

    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, []);

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center perspective-container p-2 sm:p-6 will-change-transform"
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
        className={`relative w-full max-w-[95vw] sm:max-w-[600px] ${isShortScreen ? "rounded-[18px] sm:rounded-[28px]" : "rounded-[24px] sm:rounded-[40px]"} shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden transform-style-3d group cursor-default ring-1 ring-white/10`}
        style={{
          backgroundColor: theme.colors.cardBg,
          rotateX,
          rotateY,
        }}
      >
        <div
          className={`flex flex-row h-full ${isShortScreen ? "min-h-[130px] sm:min-h-[180px]" : "min-h-[160px] sm:min-h-[240px]"}`}
        >
          {/* LEFT: Accent Bar & Avatar */}
          <div
            className={`${isShortScreen ? "w-20 sm:w-36" : "w-28 sm:w-48"} relative shrink-0 flex items-center justify-center z-20`}
            style={{ backgroundColor: theme.colors.accent }}
          >
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            {/* Avatar Container */}
            <div className="relative sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:right-[-50px] z-50">
              <motion.div
                layoutId="shared-avatar"
                className={`${isShortScreen ? "w-16 h-16 sm:w-28 sm:h-28" : "w-20 h-20 sm:w-40 sm:h-40"} rounded-full flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(0,0,0,0.4)] ${isShortScreen ? "border-[2px] sm:border-[4px]" : "border-[3px] sm:border-[6px]"} overflow-hidden relative bg-white dark:bg-gray-800`}
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
                  <span
                    className={`${isShortScreen ? "text-xl sm:text-3xl" : "text-2xl sm:text-5xl"} font-black`}
                  >
                    LH
                  </span>
                )}
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Content */}
          <motion.div
            className={`flex-1 ${isShortScreen ? "p-3 sm:p-5 sm:pl-16" : "p-4 sm:p-8 sm:pl-20"} flex flex-col justify-center text-left relative z-10`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            <h1
              className={`${isShortScreen ? "text-base sm:text-3xl" : "text-xl sm:text-5xl"} font-black leading-none tracking-tighter ${isShortScreen ? "mb-1.5 sm:mb-2" : "mb-2 sm:mb-3"} transition-colors group-hover:text-[var(--accent)]`}
              style={{ color: theme.colors.text }}
            >
              Lukas Höwarth
            </h1>

            <div
              className={`inline-flex items-center justify-start gap-2 ${isShortScreen ? "mb-2 sm:mb-4" : "mb-4 sm:mb-8"}`}
            >
              <motion.span
                layoutId="shared-badge"
                className={`${isShortScreen ? "px-1.5 py-0.5 sm:px-2.5 sm:py-1" : "px-2 py-1 sm:px-3 sm:py-1.5"} rounded-lg ${isShortScreen ? "text-[9px] sm:text-[11px]" : "text-[10px] sm:text-xs"} font-bold uppercase tracking-wide flex items-center gap-2 opacity-80`}
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.text,
                }}
              >
                <Terminal
                  size={isShortScreen ? 10 : 12}
                  className={
                    isShortScreen ? "sm:w-3 sm:h-3" : "sm:w-3.5 sm:h-3.5"
                  }
                />{" "}
                {t("hero.role")}
              </motion.span>
            </div>

            <motion.button
              onClick={onOpenTrainer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group/btn relative ${isShortScreen ? "pl-3 pr-1.5 py-1.5 sm:pl-5 sm:pr-2 sm:py-2.5" : "pl-4 pr-2 py-2 sm:pl-6 sm:pr-2 sm:py-3"} rounded-full font-black ${isShortScreen ? "text-[9px] sm:text-xs" : "text-[10px] sm:text-sm"} uppercase tracking-wider flex items-center ${isShortScreen ? "gap-1.5 sm:gap-3" : "gap-2 sm:gap-4"} shadow-xl ${isShortScreen ? "border-b-[2px] sm:border-b-[3px]" : "border-b-[3px] sm:border-b-4"} transition-all active:border-b-0 ${isShortScreen ? "active:translate-y-[2px]" : "active:translate-y-[3px]"} active:shadow-none mr-auto cursor-pointer`}
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

              <div
                className={`${isShortScreen ? "w-5 h-5 sm:w-7 sm:h-7" : "w-6 h-6 sm:w-8 sm:h-8"} rounded-full bg-white/20 flex items-center justify-center relative z-10 group-hover/btn:bg-white group-hover/btn:text-black transition-colors`}
              >
                <ChevronRight
                  size={isShortScreen ? 12 : 14}
                  strokeWidth={3}
                  className={
                    isShortScreen ? "sm:w-4 sm:h-4" : "sm:w-[18px] sm:h-[18px]"
                  }
                />
              </div>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
