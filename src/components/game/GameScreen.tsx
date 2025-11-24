import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  ImageIcon,
  CheckCircle2,
  Star,
  Cpu,
  ListChecks,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project, Theme } from "../../types";
import { useLanguage } from "../../context/LanguageContext.tsx";
import { useDraggableScroll } from "../../hooks/useDraggableScroll.ts";
import type { Variants } from "motion";
import { VideoThumbnail } from "../ui/VideoThumbnail.tsx";
import { Lightbox } from "./Lightbox.tsx";

const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src);
const isImagePath = (str: string) => str.includes("/") || str.includes(".");

interface GameScreenProps {
  project: Project;
  onClose: () => void;
  isFavorite: boolean;
  toggleFavorite: () => void;
  theme: Theme;
}

export const GameScreen = ({
  project,
  onClose,
  isFavorite,
  toggleFavorite,
  theme,
}: GameScreenProps) => {
  const { language, t } = useLanguage();
  const [isClosing, setIsClosing] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { scrollRef, hasMoved, events: dragEvents } = useDraggableScroll();
  const [isReady, setIsReady] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "ArrowRight")
          setLightboxIndex((prev) => (prev! + 1) % project.screenshots.length);
        if (e.key === "ArrowLeft")
          setLightboxIndex(
            (prev) =>
              (prev! - 1 + project.screenshots.length) %
              project.screenshots.length,
          );
        if (e.key === "Escape") setLightboxIndex(null);
      } else if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, project.screenshots.length, handleClose]);

  const modalVariants: Variants = {
    initial: { opacity: 0, scale: 0.85, y: 50 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    expanded: {
      height: "85vh",
      transition: { type: "spring", stiffness: 120, damping: 18, delay: 0.1 },
    },
    collapsed: {
      height: 320,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
  };

  const contentStagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/90 sm:bg-black/70 sm:backdrop-blur-md transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}
    >
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            screenshots={project.screenshots}
            onClose={() => setLightboxIndex(null)}
            setIndex={setLightboxIndex}
          />
        )}
      </AnimatePresence>

      <motion.div
        key={project.id}
        variants={modalVariants}
        initial="initial"
        animate={["animate", isReady ? "expanded" : "collapsed"]}
        exit="exit"
        onAnimationComplete={() => setIsReady(true)}
        className="w-full max-w-5xl rounded-[36px] overflow-hidden border-[8px] flex flex-col relative will-change-transform"
        style={{
          backgroundColor: theme.colors.cardBg,
          borderColor: theme.colors.primary,
          boxShadow: isReady ? "0 25px 50px -12px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* --- HERO HEADER --- */}
        <div
          className={`relative h-48 sm:h-64 shrink-0 ${project.color} overflow-hidden transition-all duration-500`}
        >
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

          {/* Decorative background icon */}
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
            <div className="flex justify-between items-start">
              {/* Header Badges */}
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
                    onClick={toggleFavorite}
                    className={`p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${isFavorite ? "bg-yellow-400 border-yellow-300 text-white shadow-[0_0_15px_rgba(250,204,21,0.5)]" : "bg-black/20 border-white/20 text-white hover:bg-white hover:text-black"}`}
                    title={t("game.add_fav")}
                  >
                    <Star
                      size={24}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </motion.button>
                )}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="bg-black/20 hover:bg-white hover:text-black text-white p-2 rounded-full transition-all duration-200 backdrop-blur-md border border-white/20"
                >
                  <X size={24} />
                </motion.button>
              </div>
            </div>

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

        {/* --- FLOATING ICON --- */}
        {isReady && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="absolute top-48 sm:top-64 right-4 sm:right-8 -translate-y-1/2 z-30 pointer-events-none"
          >
            <div
              className={`w-16 h-16 sm:w-24 sm:h-24 rounded-3xl ${project.color} shadow-2xl flex items-center justify-center text-white border-4`}
              style={{ borderColor: theme.colors.cardBg }}
            >
              {React.cloneElement(project.icon as React.ReactElement<any>, {
                size: 28,
              })}
            </div>
          </motion.div>
        )}

        {/* --- CONTENT BODY --- */}
        <div
          className="flex-1 overflow-y-auto custom-scrollbar relative"
          style={{ backgroundColor: theme.colors.cardBg }}
        >
          {isReady && (
            <motion.div
              variants={contentStagger}
              initial="hidden"
              animate="visible"
              className="p-6 sm:p-8 sm:pt-16 space-y-8"
            >
              {/* Gallery Section */}
              {project.screenshots && project.screenshots.length > 0 && (
                <motion.div variants={itemVariants} className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <ImageIcon size={18} style={{ color: theme.colors.text }} />
                    <span
                      className="text-sm font-black uppercase tracking-widest"
                      style={{ color: theme.colors.text }}
                    >
                      {t("game.gallery")}
                    </span>
                  </div>
                  <div
                    ref={scrollRef}
                    {...dragEvents}
                    className="-mx-4 px-4 py-4 flex gap-4 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing transform-gpu"
                  >
                    {project.screenshots.map((item, i) => (
                      <motion.button
                        key={i}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (!hasMoved.current) setLightboxIndex(i);
                        }}
                        className={`w-56 h-32 sm:w-64 sm:h-40 shrink-0 rounded-xl shadow-md flex items-center justify-center relative group border-4 overflow-hidden bg-black/5`}
                        style={{ borderColor: theme.colors.primary }}
                      >
                        {isVideo(item) ? (
                          <VideoThumbnail src={item} />
                        ) : isImagePath(item) ? (
                          <div className="w-full h-full relative pointer-events-none">
                            <div className="absolute inset-0">
                              <img
                                src={item}
                                className="w-full h-full object-cover blur-md opacity-60 scale-125"
                                alt=""
                                decoding="async"
                              />
                            </div>
                            <img
                              src={item}
                              alt={`Thumb ${i}`}
                              className="relative z-10 w-full h-full object-contain p-1"
                              decoding="async"
                            />
                          </div>
                        ) : (
                          <div className={`w-full h-full ${item}`}></div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-20 pointer-events-none"></div>
                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none flex items-center gap-1">
                          {isVideo(item) ? "VIDEO" : `IMG_0${i + 1}`}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Description */}
                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-2 flex flex-col"
                >
                  <div
                    className="rounded-3xl p-6 sm:p-8 shadow-sm border h-full"
                    style={{
                      backgroundColor: theme.colors.primary,
                      borderColor: theme.colors.secondary,
                    }}
                  >
                    <h3
                      className="text-xl font-black mb-6 flex items-center gap-2"
                      style={{ color: theme.colors.text }}
                    >
                      <span
                        className={`w-2 h-8 rounded-full ${project.color}`}
                      ></span>
                      {t("game.desc")}
                    </h3>
                    <p
                      className="leading-relaxed whitespace-pre-wrap text-sm sm:text-lg font-medium opacity-80"
                      style={{ color: theme.colors.text }}
                    >
                      {project.details[language]}
                    </p>
                  </div>
                </motion.div>

                {/* Tech & Features */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Tech Stack */}
                  <motion.div
                    variants={itemVariants}
                    className="rounded-3xl p-6 shadow-sm border"
                    style={{
                      backgroundColor: theme.colors.primary,
                      borderColor: theme.colors.secondary,
                    }}
                  >
                    <h4
                      className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 opacity-60"
                      style={{ color: theme.colors.text }}
                    >
                      <Cpu size={14} /> {t("game.tech")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-full shadow-sm cursor-default border"
                          style={{
                            backgroundColor: theme.colors.cardBg,
                            color: theme.colors.text,
                            borderColor: theme.colors.cardBg,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Features List */}
                  <motion.div
                    variants={itemVariants}
                    className="rounded-3xl p-6 shadow-sm border"
                    style={{
                      backgroundColor: theme.colors.primary,
                      borderColor: theme.colors.secondary,
                    }}
                  >
                    <h4
                      className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 opacity-60"
                      style={{ color: theme.colors.text }}
                    >
                      <ListChecks size={14} /> {t("game.features")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((f) => (
                        <div
                          key={f}
                          className="flex items-center gap-2 px-3 py-2 text-[10px] sm:text-xs font-bold rounded-xl border"
                          style={{
                            backgroundColor: theme.colors.cardBg,
                            color: theme.colors.text,
                            borderColor: theme.colors.cardBg,
                          }}
                        >
                          <CheckCircle2
                            size={14}
                            className="shrink-0"
                            style={{ color: theme.colors.accent }}
                          />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
