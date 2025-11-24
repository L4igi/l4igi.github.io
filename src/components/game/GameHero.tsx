import { motion } from "framer-motion";
import { X, Star } from "lucide-react";
import type { Project, Theme } from "../../types";
import { useLanguage } from "../../context/LanguageContext";

interface GameHeroProps {
  project: Project;
  theme: Theme;
  isFavorite: boolean;
  isReady: boolean;
  onClose: () => void;
  onToggleFavorite: () => void;
}

export const GameHero = ({
  project,
  theme,
  isFavorite,
  isReady,
  onClose,
  onToggleFavorite,
}: GameHeroProps) => {
  const { language, t } = useLanguage();

  return (
    <div
      className={`relative h-48 sm:h-64 shrink-0 ${project.color} overflow-hidden transition-all duration-500`}
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      {/* Decorative Icon */}
      {isReady && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 3 }}
          transition={{ type: "spring", duration: 1 }}
          className="absolute -right-12 -bottom-16 text-white transform rotate-12"
        >
          {project.icon}
        </motion.div>
      )}

      <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-between">
        {/* Header Actions */}
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            <span className="bg-black/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full border border-white/20">
              {project.year}
            </span>
            <span
              className="bg-white/90 text-[var(--accent)] text-[10px] sm:text-xs font-black px-2 sm:px-3 py-1 rounded-full uppercase tracking-wider shadow-sm"
              style={{ color: theme.colors.accent }}
            >
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isReady && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggleFavorite}
                className={`p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${isFavorite ? "bg-yellow-400 border-yellow-300 text-white shadow-[0_0_15px_rgba(250,204,21,0.5)]" : "bg-black/20 border-white/20 text-white hover:bg-white hover:text-black"}`}
                title={t("game.add_fav")}
              >
                <Star size={24} fill={isFavorite ? "currentColor" : "none"} />
              </motion.button>
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="bg-black/20 hover:bg-white hover:text-black text-white p-2 rounded-full transition-all duration-200 backdrop-blur-md border border-white/20"
            >
              <X size={24} />
            </motion.button>
          </div>
        </div>

        {/* Title */}
        <div className="mt-auto pr-4 sm:pr-24">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-3xl sm:text-6xl font-black tracking-tighter text-white drop-shadow-md leading-none break-words"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="font-bold text-xs sm:text-sm mt-1 ml-1 text-white"
          >
            {project.role[language]}
          </motion.p>
        </div>
      </div>
    </div>
  );
};
