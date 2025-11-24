import React from "react";
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
  onClick: () => void;
  onHover: (e: React.MouseEvent) => void;
  isSelected: boolean;
  isPressed: boolean;
  isFavorite: boolean;
  theme: Theme;
}

export const GameTile = ({
  project,
  onClick,
  onHover,
  isSelected,
  isPressed,
  isFavorite,
  theme,
}: GameTileProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left / rect.width - 0.5) * 50);
    y.set((event.clientY - rect.top / rect.height - 0.5) * 50);
    onHover(event);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="w-32 h-32 sm:w-48 sm:h-48 perspective-container relative z-10"
      variants={itemVariants}
      layout
    >
      <motion.button
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={isSelected ? { scale: 1.05, y: -5 } : { scale: 1, y: 0 }}
        whileTap={{ scale: 0.95 }}
        style={{ rotateX, rotateY }}
        className="w-full h-full relative group transform-style-3d"
      >
        {/* TACTILE CARTRIDGE CONTAINER */}
        {/* The border-b-[X]px creates the 3D 'button' depth */}
        <div
          className={`
                        w-full h-full rounded-[24px] shadow-lg flex flex-col relative overflow-hidden
                        transition-all duration-100 ease-out
                        border-2 border-b-[6px]
                        ${isPressed ? "border-b-[2px] translate-y-1 shadow-sm" : ""}
                    `}
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.isDark
              ? "rgba(255,255,255,0.15)"
              : "rgba(0,0,0,0.05)",
            borderBottomColor: theme.colors.secondary, // The "side" of the button
          }}
        >
          {/* Subtle Background Tint */}
          <div
            className={`absolute inset-2 rounded-[18px] ${project.color} opacity-5 group-hover:opacity-15 transition-opacity pointer-events-none`}
          ></div>

          {/* ICON SECTION */}
          <div className="flex-1 w-full flex items-center justify-center relative z-10">
            <div
              className={`
                            p-3 sm:p-5 rounded-2xl ${project.color} text-white shadow-md 
                            group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300
                        `}
            >
              {/* Adjusted Icon Size for Mobile/Desktop */}
              {React.cloneElement(project.icon as React.ReactElement<any>, {
                className: "w-6 h-6 sm:w-8 sm:h-8",
              })}
            </div>
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
              className="block text-[10px] sm:text-xs font-black text-center truncate uppercase tracking-tight leading-none opacity-70 group-hover:opacity-100 transition-opacity"
              style={{ color: theme.colors.text }}
            >
              {project.title}
            </span>
          </div>

          {/* Favorite Star */}
          {isFavorite && (
            <div className="absolute top-2 right-2 z-30 text-yellow-400 drop-shadow-sm">
              <Star fill="currentColor" size={14} className="sm:w-4 sm:h-4" />
            </div>
          )}
        </div>

        {/* Floor Shadow */}
        <motion.div
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-20 h-3 rounded-[100%] blur-md -z-10"
          style={{
            backgroundColor: theme.isDark
              ? "rgba(0,0,0,0.5)"
              : "rgba(0,0,0,0.15)",
          }}
          animate={{
            scale: isSelected ? 0.6 : 1,
            opacity: isSelected ? 0.2 : 1,
          }}
        />
      </motion.button>
    </motion.div>
  );
};
