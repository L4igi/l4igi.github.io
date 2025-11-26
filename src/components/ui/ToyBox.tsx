import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Theme } from "../../types";
import { useLanguage } from "../../context/LanguageContext.tsx";

const starKeyframes = `
  @keyframes tumble {
    0% { transform: rotateX(0deg) rotateY(0deg); }
    100% { transform: rotateX(360deg) rotateY(360deg); }
  }
`;

const StarCube = ({
  x,
  y,
  z,
  size,
  color,
  speed,
  delay,
  isDark,
}: {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  speed: number;
  delay: number;
  isDark: boolean;
}) => {
  return (
    <div
      className="absolute"
      style={{
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        transform: `translate3d(${x}px, ${y}px, ${z}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* ROTATING CONTAINER (Pure CSS Animation) */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          animation: `tumble ${speed}s linear infinite`,
          animationDelay: `-${delay}s`,
          willChange: "transform",
        }}
      >
        {/* 6 FACES (Optimized DOM) */}
        {["front", "back", "right", "left", "top", "bottom"].map((face) => {
          let transform = "";
          const half = size / 2;

          switch (face) {
            case "front":
              transform = `translateZ(${half}px)`;
              break;
            case "back":
              transform = `rotateY(180deg) translateZ(${half}px)`;
              break;
            case "right":
              transform = `rotateY(90deg) translateZ(${half}px)`;
              break;
            case "left":
              transform = `rotateY(-90deg) translateZ(${half}px)`;
              break;
            case "top":
              transform = `rotateX(90deg) translateZ(${half}px)`;
              break;
            case "bottom":
              transform = `rotateX(-90deg) translateZ(${half}px)`;
              break;
          }

          return (
            <div
              key={face}
              className="absolute inset-0"
              style={{
                transform,
                backgroundColor: color,
                border: isDark
                  ? "1px solid rgba(255,255,255,0.15)"
                  : "1px solid rgba(0,0,0,0.1)",
                opacity: isDark ? 0.9 : 0.85,
                backfaceVisibility: "hidden",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// --- MAIN STAGE ---
export const ToyBox = ({ theme }: { theme: Theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // --- GENERATE STARS ---
  const stars = useMemo(() => {
    const count = isMobile ? 16 : 40;
    const spreadX = isMobile ? 280 : 900;
    const spreadY = isMobile ? 400 : 600;
    const spreadZ = 500;

    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * spreadX,
      y: (Math.random() - 0.5) * spreadY,
      z: (Math.random() - 0.5) * spreadZ - 100,
      size: Math.random() * (isMobile ? 12 : 10) + 6,
      color:
        Math.random() > 0.6
          ? theme.colors.accent
          : Math.random() > 0.5
            ? theme.colors.secondary
            : theme.colors.text,
      speed: Math.random() * 15 + 10,
      delay: Math.random() * 20,
    }));
  }, [isMobile, theme.colors]);

  // --- PHYSICS & INTERACTION ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = isMobile
    ? { stiffness: 100, damping: 20 }
    : { stiffness: 50, damping: 20 };

  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax Mapping
  const rotateX = useTransform(smoothY, [-400, 400], [12, -12]);
  const rotateY = useTransform(smoothX, [-400, 400], [-12, 12]);

  // Desktop Mouse Handler
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  // Mobile Touch Handler (Direct 1:1 Mapping)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const touch = e.touches[0];
      const x = (touch.clientX - rect.left - rect.width / 2) * 1.5;
      const y = (touch.clientY - rect.top - rect.height / 2) * 1.5;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      <style>{starKeyframes}</style>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full h-full flex items-center justify-center relative perspective-[1000px] overflow-hidden"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleLeave}
        onMouseLeave={handleLeave}
        style={{
          perspective: 1000,
          background: theme.isDark
            ? "transparent"
            : `radial-gradient(circle at 50% 50%, ${theme.colors.cardBg}, rgba(0,0,0,0.02))`,
        }}
      >
        {/* 3D UNIVERSE CONTAINER */}
        <motion.div
          className="w-full h-full absolute inset-0 transform-style-3d"
          style={{ willChange: "transform" }}
        >
          {/* 1. THE STAR FIELD */}
          <motion.div
            className="absolute inset-0 pointer-events-none transform-style-3d"
            style={{
              rotateX: rotateX,
              rotateY: rotateY,
            }}
          >
            {stars.map((star) => (
              <StarCube key={star.id} {...star} isDark={theme.isDark} />
            ))}
          </motion.div>

          {/* 2. THE HERO TEXT */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none transform-style-3d"
            animate={{
              y: [-12, 12, -12],
              z: [0, 30, 0],
            }}
            transition={{
              duration: 7,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            style={{
              rotateX: useTransform(rotateX, (v) => v * 1.2),
              rotateY: useTransform(rotateY, (v) => v * 1.2),
            }}
          >
            <h1
              className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.85] text-center"
              style={{
                color: theme.colors.text,
                WebkitTextStroke: "0px",
                filter: theme.isDark
                  ? "drop-shadow(0 0 20px rgba(0,0,0,0.5))"
                  : "none",
              }}
            >
              {t("topScreen.title1")}
              <br />
              {t("topScreen.title2")}
            </h1>
          </motion.div>
        </motion.div>

        {/* INSTRUCTION HINT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: theme.isDark ? 0.6 : 0.9 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 text-[9px] font-bold tracking-[0.2em] uppercase pointer-events-none select-none"
          style={{ color: theme.colors.accent }}
        >
          {isMobile ? t("topScreen.hintMobile") : t("topScreen.hint")}
        </motion.div>
      </motion.div>
    </>
  );
};
