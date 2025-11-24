import { motion, AnimatePresence } from "framer-motion";
import type { Theme } from "../../types";
import { AboutHero } from "./AboutHero.tsx";
import {
  TabIdentity,
  TabExperience,
  TabSkills,
  TabLikes,
} from "./AboutTabs.tsx";
import { AboutNavigation } from "./AboutNavigation.tsx";
import { useAboutModal } from "./useAboutModal.ts";
import type { Variants } from "motion";

const MODAL_VARIANTS: Variants = {
  initial: { opacity: 0, scale: 0.9, y: 50 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
  collapsed: {
    height: 280,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
  expanded: {
    height: "85vh",
    transition: { type: "spring", stiffness: 120, damping: 20, delay: 0.1 },
  },
};

const CONTENT_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

export const AboutModal = ({
  onClose,
  theme,
}: {
  onClose: () => void;
  theme: Theme;
}) => {
  const { state, actions } = useAboutModal(onClose);

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/90 sm:bg-black/70 sm:backdrop-blur-md transition-opacity duration-300 ${state.isClosing ? "opacity-0" : "opacity-100"}`}
    >
      <motion.div
        initial="initial"
        animate={["animate", state.isExpanded ? "expanded" : "collapsed"]}
        exit="exit"
        variants={MODAL_VARIANTS}
        className="w-full max-w-5xl rounded-[36px] overflow-hidden border-4 flex flex-col relative will-change-transform"
        style={{
          backgroundColor: theme.colors.cardBg,
          borderColor: theme.colors.primary,
          boxShadow: state.isExpanded
            ? "0 25px 50px -12px rgba(0,0,0,0.5)"
            : "none",
        }}
      >
        <AboutHero
          theme={theme}
          onClose={actions.close}
          isImageLoaded={state.isImageLoaded}
          setIsImageLoaded={actions.setIsImageLoaded}
        />

        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
          {/* Mobile Navigation */}
          {state.isExpanded && (
            <AboutNavigation
              variant="mobile"
              activeTab={state.activeTab}
              setActiveTab={actions.setActiveTab}
              theme={theme}
              isExpanded={state.isExpanded}
            />
          )}

          {/* Desktop Navigation */}
          <AboutNavigation
            variant="desktop"
            activeTab={state.activeTab}
            setActiveTab={actions.setActiveTab}
            theme={theme}
            isExpanded={state.isExpanded}
          />

          {/* Main Content Area */}
          <div
            ref={state.contentRef}
            className="flex-1 p-6 sm:p-10 overflow-y-auto custom-scrollbar relative"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            {state.isExpanded && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={state.activeTab}
                  variants={CONTENT_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 10 }}
                >
                  {state.activeTab === "ID" && <TabIdentity theme={theme} />}
                  {state.activeTab === "EXP" && <TabExperience theme={theme} />}
                  {state.activeTab === "SKILLS" && <TabSkills theme={theme} />}
                  {state.activeTab === "LIKES" && <TabLikes theme={theme} />}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
