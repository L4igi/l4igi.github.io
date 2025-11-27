import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project, Theme } from "../../types";

import { Lightbox } from "./Lightbox.tsx";
import { GameHero } from "./GameHero.tsx";
import { GameGallery } from "./GameGallery.tsx";
import { GameDetails } from "./GameDetails.tsx";

import { useGameScreen } from "./useGameScreen.tsx";
import type { Variants } from "motion";

interface GameScreenProps {
  project: Project;
  onClose: () => void;
  isFavorite: boolean;
  toggleFavorite: () => void;
  theme: Theme;
  onNext: () => void;
  onPrev: () => void;
}

const MODAL_VARIANTS: Variants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  expanded: {
    height: "auto",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  collapsed: {
    height: 320,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const CONTENT_STAGGER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const GameScreen = ({
  project,
  onClose,
  isFavorite,
  toggleFavorite,
  theme,
  onNext,
  onPrev,
}: GameScreenProps) => {
  const { state, actions } = useGameScreen(project, onClose, onNext, onPrev);

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;

    const xDistance = touchStart.current.x - touchEnd.current.x;
    const yDistance = touchStart.current.y - touchEnd.current.y;
    const isLeftSwipe = xDistance > minSwipeDistance;
    const isRightSwipe = xDistance < -minSwipeDistance;

    if (Math.abs(xDistance) > Math.abs(yDistance)) {
      if (isLeftSwipe) {
        onNext();
      }
      if (isRightSwipe) {
        onPrev();
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/90 sm:bg-black/70 sm:backdrop-blur-md transition-opacity duration-300 ${state.isClosing ? "opacity-0" : "opacity-100"}`}
      onClick={actions.close}
    >
      <AnimatePresence>
        {state.lightboxIndex !== null && (
          <Lightbox
            index={state.lightboxIndex}
            screenshots={project.screenshots}
            onClose={() => actions.setLightboxIndex(null)}
            setIndex={actions.setLightboxIndex}
          />
        )}
      </AnimatePresence>

      <div className="hidden md:flex absolute inset-y-0 left-2 lg:left-8 items-center z-[210] pointer-events-none">
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{
            scale: 1.2,
            x: -5,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
          whileTap={{ scale: 0.9 }}
          className="pointer-events-auto p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg transition-colors cursor-pointer"
        >
          <ChevronLeft size={40} strokeWidth={2.5} />
        </motion.button>
      </div>

      <div className="hidden md:flex absolute inset-y-0 right-2 lg:right-8 items-center z-[210] pointer-events-none">
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{
            scale: 1.2,
            x: 5,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
          whileTap={{ scale: 0.9 }}
          className="pointer-events-auto p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg transition-colors cursor-pointer"
        >
          <ChevronRight size={40} strokeWidth={2.5} />
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          variants={MODAL_VARIANTS}
          initial="initial"
          animate={["animate", state.isReady ? "expanded" : "collapsed"]}
          exit="exit"
          onAnimationComplete={() => actions.setIsReady(true)}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="w-full max-w-5xl rounded-[36px] overflow-hidden border-[8px] flex flex-col relative will-change-transform cursor-auto max-h-[85vh] sm:max-h-[90vh]"
          style={{
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.colors.primary,
            boxShadow: state.isReady
              ? "0 25px 50px -12px rgba(0,0,0,0.5)"
              : "none",
          }}
        >
          <div className="shrink-0">
            <GameHero
              project={project}
              theme={theme}
              isFavorite={isFavorite}
              isReady={state.isReady}
              onClose={actions.close}
              onToggleFavorite={toggleFavorite}
            />
          </div>

          {state.isReady && (
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

          <div
            className="overflow-y-auto custom-scrollbar relative"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            {state.isReady && (
              <motion.div
                variants={CONTENT_STAGGER}
                initial="hidden"
                animate="visible"
                className="p-6 sm:p-8 sm:pt-16 space-y-8"
              >
                <GameGallery
                  screenshots={project.screenshots}
                  theme={theme}
                  onImageClick={actions.setLightboxIndex}
                />

                <GameDetails project={project} theme={theme} />
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
