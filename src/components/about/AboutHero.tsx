import { motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import type { Theme } from "../../types";

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
  return (
    <>
      <div
        className="relative h-40 shrink-0 overflow-hidden"
        style={{ backgroundColor: theme.colors.accent }}
      >
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />

        <div className="relative z-10 h-full px-8 flex items-center justify-between">
          <div className="ml-32 sm:ml-40 mt-4 text-white drop-shadow-md">
            <motion.h2
              layoutId="modal-title"
              className="text-2xl sm:text-4xl font-black tracking-tight"
            >
              Lukas Höwarth
            </motion.h2>
            <motion.p
              layoutId="modal-role"
              className="opacity-90 font-bold text-xs sm:text-base flex items-center gap-2 uppercase tracking-wider"
            >
              <Sparkles size={14} /> Fullstack Engineer
            </motion.p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full transition-all duration-200 backdrop-blur-md border shadow-sm hover:scale-110 bg-white/20 border-white/30 text-white"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="absolute top-16 left-8 z-20">
        <div
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-[6px] shadow-2xl overflow-hidden flex items-center justify-center bg-white dark:bg-gray-800 relative"
          style={{ borderColor: theme.colors.cardBg }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-4xl font-black opacity-20"
              style={{ color: theme.colors.accent }}
            >
              LH
            </span>
          </div>
          <motion.img
            src="/profile/me.jpg"
            alt="LH"
            className="w-full h-full object-cover relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            onLoad={() => setIsImageLoaded(true)}
            onError={(e) => (e.currentTarget.style.display = "none")}
            decoding="async"
          />
        </div>
      </div>
    </>
  );
};
