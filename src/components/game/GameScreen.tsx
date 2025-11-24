import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
}

const MODAL_VARIANTS: Variants = {
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
}: GameScreenProps) => {
  const { state, actions } = useGameScreen(project, onClose);

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/90 sm:bg-black/70 sm:backdrop-blur-md transition-opacity duration-300 ${state.isClosing ? "opacity-0" : "opacity-100"}`}
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

      <motion.div
        key={project.id}
        variants={MODAL_VARIANTS}
        initial="initial"
        animate={["animate", state.isReady ? "expanded" : "collapsed"]}
        exit="exit"
        onAnimationComplete={() => actions.setIsReady(true)}
        className="w-full max-w-5xl rounded-[36px] overflow-hidden border-[8px] flex flex-col relative will-change-transform"
        style={{
          backgroundColor: theme.colors.cardBg,
          borderColor: theme.colors.primary,
          boxShadow: state.isReady
            ? "0 25px 50px -12px rgba(0,0,0,0.5)"
            : "none",
        }}
      >
        <GameHero
          project={project}
          theme={theme}
          isFavorite={isFavorite}
          isReady={state.isReady}
          onClose={actions.close}
          onToggleFavorite={toggleFavorite}
        />

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
          className="flex-1 overflow-y-auto custom-scrollbar relative"
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
    </div>
  );
};
