import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Star, ChevronRight, Calendar, Tag } from "lucide-react";
import type { Project, Theme } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import type { Variants } from "motion";

const desktopSwapVariants: Variants = {
  initial: {
    x: 120,
    opacity: 0,
    scale: 0.85,
    rotate: 5,
  },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 350, damping: 25, mass: 1 },
  },
  exit: {
    x: -120, // Slide to left
    opacity: 0,
    scale: 0.85,
    rotate: -5,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const mobileSwapVariants: Variants = {
  initial: {
    x: 0,
    opacity: 0,
    scale: 0.9,
    rotate: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 400, damping: 28 },
  },
  exit: {
    x: 0,
    opacity: 0,
    scale: 1.05,
    rotate: 0,
    transition: { duration: 0.15, ease: "easeOut" },
  },
};

export const ProjectPreview = ({
  project,
  onStart,
  isFavorite,
  theme,
}: {
  project: Project;
  onStart: () => void;
  isFavorite: boolean;
  theme: Theme;
}) => {
  const { language, t } = useLanguage();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set((mouseX / width - 0.5) * 200);
    y.set((mouseY / height - 0.5) * 200);
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    x.set(0);
    y.set(0);
  };

  if (!project) return null;

  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex items-center justify-center perspective-container p-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={isTouch ? mobileSwapVariants : desktopSwapVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="relative w-full max-w-lg max-h-[90%] min-h-[300px] aspect-[16/9] rounded-[32px] sm:shadow-2xl shadow-lg border-[6px] flex overflow-hidden transform-style-3d will-change-transform"
        style={{
          backgroundColor: theme.colors.cardBg,
          borderColor: theme.colors.cardBg,
          rotateX: isTouch ? 0 : rotateX,
          rotateY: isTouch ? 0 : rotateY,
        }}
      >
        {/* Left: 3D Art */}
        <div
          className={`w-1/3 ${project.color} relative flex items-center justify-center overflow-hidden`}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-black/10"></div>

          <motion.div
            className="drop-shadow-2xl scale-110 text-white translate-z-20"
            style={{ transform: "scale(1.1)" }}
            whileHover={isTouch ? undefined : { scale: 1.2, rotate: 5 }}
          >
            {project.icon}
          </motion.div>

          {isFavorite && (
            <div className="absolute top-4 left-4 text-yellow-300 drop-shadow-md translate-z-30">
              <Star fill="currentColor" size={28} />
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="w-2/3 p-6 flex flex-col justify-between relative overflow-hidden">
          <div
            className="hidden sm:block absolute -right-20 -top-20 w-64 h-64 opacity-10 rounded-full blur-3xl"
            style={{ backgroundColor: theme.colors.accent }}
          ></div>

          <div className="relative z-10">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border shadow-sm"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.textLight,
                  borderColor: theme.colors.secondary,
                }}
              >
                <Tag size={10} className="opacity-60" />
                {project.category}
              </span>

              <span
                className="flex items-center gap-1 text-[10px] font-bold opacity-50"
                style={{ color: theme.colors.text }}
              >
                <Calendar size={10} />
                {project.year}
              </span>
            </div>

            <h1
              className="text-2xl font-black leading-none mb-2 tracking-tight"
              style={{ color: theme.colors.text }}
            >
              {project.title}
            </h1>
            <p
              className="text-xs sm:text-sm line-clamp-3 leading-relaxed font-medium opacity-70"
              style={{ color: theme.colors.text }}
            >
              {project.description[language]}
            </p>
          </div>

          <div className="flex justify-between items-end relative z-10 mt-2">
            <div className="flex gap-1">
              {project.tech.slice(0, 3).map((t) => (
                <div
                  key={t}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: theme.colors.secondary }}
                  title={t}
                />
              ))}
            </div>

            {/* NINTENDO STYLE BUTTON */}
            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, y: 4 }}
              className="group relative pl-5 pr-2 py-2 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-3 shadow-lg border-b-4 transition-all active:border-b-0 active:shadow-none"
              style={{
                backgroundColor: theme.colors.accent,
                color: theme.colors.contrastAccent,
                borderColor: "rgba(0,0,0,0.2)",
              }}
            >
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none"></div>
              <span className="relative z-10 drop-shadow-sm">
                {t("btn.details")}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative z-10 group-hover:bg-white group-hover:text-black transition-colors">
                <ChevronRight size={18} strokeWidth={3} />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
