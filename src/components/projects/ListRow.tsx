import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import type { Project, Theme } from "../../types";
import { useLanguage } from "../../context/LanguageContext";

interface ListRowProps {
  project: Project;
  onClick: () => void;
  onHover: () => void;
  isSelected: boolean;
  isFavorite: boolean;
  theme: Theme;
}

export const ListRow = ({
  project,
  onClick,
  onHover,
  isSelected,
  isFavorite,
  theme,
}: ListRowProps) => {
  const { language } = useLanguage();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 100;
    const yPct = (mouseY / height - 0.5) * 100;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleInteraction = () => {
    if (isSelected) {
      onClick();
    } else {
      onHover();
    }
  };

  return (
    <motion.div
      className="relative z-10 w-full perspective-container px-4 sm:px-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      layout
    >
      <motion.button
        onClick={handleInteraction}
        onMouseEnter={onHover}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98, y: 2 }}
        style={{ rotateX, rotateY }}
        className="w-full relative group outline-none transform-style-3d"
      >
        {/* TACTILE CONTAINER */}
        <div
          className={`
                        w-full flex items-center gap-5 p-3 rounded-[20px] overflow-hidden relative
                        border-2 border-b-[6px] transition-all duration-100 ease-out
                        active:border-b-[2px] active:translate-y-1
                    `}
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.isDark
              ? "rgba(255,255,255,0.15)"
              : "rgba(0,0,0,0.05)",
            borderBottomColor: theme.colors.secondary,
            color: theme.colors.text,
          }}
        >
          {/* 1. Hover Background Bloom */}
          <div
            className={`absolute inset-0 ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
          ></div>

          {/* 2. Active Indicator Strip */}
          {isSelected && (
            <motion.div
              layoutId="activeRowBar"
              className="absolute left-0 top-0 bottom-0 w-1.5 z-20"
              style={{ backgroundColor: theme.colors.accent }}
            />
          )}

          {/* 3. Icon Box */}
          <div
            className={`w-14 h-14 rounded-xl ${project.color} flex items-center justify-center text-white shadow-md shrink-0 relative overflow-hidden group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300 z-10`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/10"></div>
            <div className="relative z-10 drop-shadow-md">
              {React.cloneElement(project.icon as React.ReactElement<any>, {
                size: 24,
              })}
            </div>
          </div>

          {/* 4. Text Content */}
          <div className="text-left flex-1 min-w-0 py-1 relative z-10">
            <div className="flex items-center justify-between mb-1">
              <span className="font-black text-sm sm:text-base truncate leading-none tracking-tight">
                {project.title}
              </span>

              {/* Favorite Star */}
              {isFavorite && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-yellow-400 drop-shadow-sm mr-2"
                >
                  <Star size={16} fill="currentColor" />
                </motion.div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Year Badge */}
              <span
                className="px-2 py-0.5 rounded-md text-[10px] font-bold border opacity-60"
                style={{
                  borderColor: theme.colors.text,
                  color: theme.colors.text,
                }}
              >
                {project.year}
              </span>

              {/* Role */}
              <span
                className="text-[10px] sm:text-xs font-bold uppercase tracking-wide truncate opacity-50"
                style={{ color: theme.colors.text }}
              >
                {project.role[language]}
              </span>
            </div>
          </div>
        </div>

        {/* Floor Shadow */}
        <motion.div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[95%] h-2 rounded-[100%] blur-md -z-10"
          style={{
            backgroundColor: theme.isDark
              ? "rgba(0,0,0,0.5)"
              : "rgba(0,0,0,0.15)",
          }}
          animate={{
            scale: isSelected ? 0.9 : 1,
            opacity: isSelected ? 0.4 : 1,
          }}
        />
      </motion.button>
    </motion.div>
  );
};
