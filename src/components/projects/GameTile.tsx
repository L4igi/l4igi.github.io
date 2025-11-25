import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import type { Project, Theme } from "../../types";
import type { Variants } from "motion";

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

interface GameTileProps {
  project: Project;
  theme: Theme;
  isSelected: boolean;
  isPressed: boolean;
  isFavorite: boolean;
  isHighlighted: boolean;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
}

export const GameTile = ({
  project,
  onClick,
  onHover,
  onLeave,
  isSelected,
  isPressed,
  isFavorite,
  isHighlighted,
  theme,
}: GameTileProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const isActive = isSelected || isHighlighted;

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isTouch) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left / rect.width - 0.5) * 50);
    y.set((event.clientY - rect.top / rect.height - 0.5) * 50);

    onHover();
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onLeave();
  };

  const handleInteraction = () => {
    if (isTouch) {
      if (isHighlighted || isSelected) {
        onClick();
      } else {
        onHover();
      }
    } else {
      onClick();
    }
  };

  return (
    <motion.div
      className="w-32 h-32 sm:w-48 sm:h-48 perspective-container relative z-10"
      variants={itemVariants}
      layout
    >
      <motion.button
        onClick={handleInteraction}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={
          isActive
            ? { scale: 1.05, y: -5, zIndex: 20 }
            : { scale: 1, y: 0, zIndex: 0 }
        }
        whileTap={{ scale: 0.95 }}
        style={{
          rotateX: isTouch ? 0 : rotateX,
          rotateY: isTouch ? 0 : rotateY,
        }}
        className="w-full h-full relative group transform-style-3d"
      >
        {/* TACTILE CONTAINER */}
        <div
          className={`
            w-full h-full rounded-[24px] shadow-lg flex flex-col relative overflow-hidden
            transition-all duration-200 ease-out
            border-2 
            ${isTouch ? "border-b-[4px]" : "border-b-[6px]"} 
            ${isPressed ? "border-b-[2px] translate-y-1 shadow-sm" : ""}
          `}
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.isDark
              ? "rgba(255,255,255,0.15)"
              : "rgba(0,0,0,0.05)",
            borderBottomColor: theme.colors.secondary,
          }}
        >
          <div
            className={`absolute inset-2 rounded-[18px] ${project.color} opacity-5 group-hover:opacity-15 transition-opacity pointer-events-none`}
          ></div>

          {/* ICON SECTION */}
          <div className="flex-1 w-full flex items-center justify-center relative z-10">
            <motion.div
              animate={
                isActive ? { rotate: 6, scale: 1.1 } : { rotate: 0, scale: 1 }
              }
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`p-3 sm:p-5 rounded-2xl ${project.color} text-white shadow-md`}
            >
              {React.cloneElement(project.icon as React.ReactElement<any>, {
                className: "w-6 h-6 sm:w-8 sm:h-8",
              })}
            </motion.div>
          </div>

          {/* LABEL SECTION */}
          <div
            className="shrink-0 w-full backdrop-blur-md py-2 px-2 border-t z-20 relative"
            style={{
              backgroundColor: theme.isDark
                ? "rgba(0,0,0,0.2)"
                : "rgba(255,255,255,0.6)",
              borderColor: theme.colors.secondary,
            }}
          >
            <span
              className={`
                  block text-[10px] sm:text-xs font-black text-center truncate uppercase tracking-tight leading-none 
                  transition-colors duration-300
                  ${isActive ? "opacity-100" : "opacity-70"}
                  group-hover:text-[var(--accent)] 
              `}
              style={{
                color: isActive ? theme.colors.accent : theme.colors.text,
              }} // Highlight if active
            >
              {project.title}
            </span>
          </div>

          {isFavorite && (
            <div className="absolute top-2 right-2 z-30 text-yellow-400 drop-shadow-sm">
              <Star fill="currentColor" size={14} className="sm:w-4 sm:h-4" />
            </div>
          )}
        </div>

        <motion.div
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-20 h-3 rounded-[100%] blur-md -z-10"
          style={{
            backgroundColor: theme.isDark
              ? "rgba(0,0,0,0.5)"
              : "rgba(0,0,0,0.15)",
          }}
          animate={{
            scale: isActive ? 0.6 : 1,
            opacity: isActive ? 0.2 : 1,
          }}
        />
      </motion.button>
    </motion.div>
  );
};
