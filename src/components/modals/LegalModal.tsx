import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Scale } from "lucide-react";
import type { Theme } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import type { Variants } from "motion";

interface LegalModalProps {
  onClose: () => void;
  theme: Theme;
}

export const LegalModal = ({ onClose, theme }: LegalModalProps) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"IMPRINT" | "PRIVACY">("IMPRINT");

  // Performance: Staged loading state
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 350);
    return () => clearTimeout(timer);
  }, []);

  // --- ANIMATION VARIANTS ---
  const modalVariants: Variants = {
    initial: { opacity: 0, scale: 0.9, y: 50 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    collapsed: {
      height: 200,
      transition: { type: "spring", stiffness: 200, damping: 25 },
    },
    expanded: {
      height: "80vh",
      transition: { type: "spring", stiffness: 120, damping: 20, delay: 0.1 },
    },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, delay: 0.1 } },
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/90 sm:bg-black/60 sm:backdrop-blur-sm`}
    >
      <motion.div
        variants={modalVariants}
        initial="initial"
        animate={["animate", isReady ? "expanded" : "collapsed"]}
        exit="exit"
        className="w-full max-w-2xl rounded-[32px] overflow-hidden border-4 flex flex-col relative shadow-2xl will-change-transform"
        style={{
          backgroundColor: theme.colors.cardBg,
          borderColor: theme.colors.primary,
        }}
      >
        {/* --- HEADER (Always Visible) --- */}
        <div
          className="relative shrink-0 p-6 flex items-center justify-between border-b"
          style={{
            borderColor: theme.colors.secondary,
            backgroundColor: theme.colors.primary,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl text-white shadow-md"
              style={{ backgroundColor: theme.colors.accent }}
            >
              <Scale size={20} />
            </div>
            <h2
              className="text-xl font-black tracking-tight"
              style={{ color: theme.colors.text }}
            >
              {t("legal.title")}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:opacity-70 transition-opacity bg-black/5 dark:bg-white/10"
            style={{ color: theme.colors.text }}
          >
            <X size={20} />
          </button>
        </div>

        {/* --- CONTENT BODY (Deferred) --- */}
        {isReady && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* TABS */}
            <div
              className="flex p-2 gap-2 shrink-0"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <button
                onClick={() => setActiveTab("IMPRINT")}
                className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "IMPRINT" ? "shadow-md" : "opacity-60 hover:opacity-100"}`}
                style={{
                  backgroundColor:
                    activeTab === "IMPRINT"
                      ? theme.colors.accent
                      : "transparent",
                  color:
                    activeTab === "IMPRINT"
                      ? theme.colors.contrastAccent
                      : theme.colors.text,
                }}
              >
                {t("legal.imprint")}
              </button>
              <button
                onClick={() => setActiveTab("PRIVACY")}
                className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "PRIVACY" ? "shadow-md" : "opacity-60 hover:opacity-100"}`}
                style={{
                  backgroundColor:
                    activeTab === "PRIVACY"
                      ? theme.colors.accent
                      : "transparent",
                  color:
                    activeTab === "PRIVACY"
                      ? theme.colors.contrastAccent
                      : theme.colors.text,
                }}
              >
                {t("legal.privacy")}
              </button>
            </div>

            {/* TEXT AREA */}
            <div
              className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8"
              style={{ backgroundColor: theme.colors.cardBg }}
            >
              <div
                className="prose prose-sm sm:prose-base max-w-none"
                style={{ color: theme.colors.text }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      activeTab === "IMPRINT"
                        ? t("legal.imprint_text")
                        : t("legal.privacy_text"),
                  }}
                  className="legal-text-content"
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <style>{`
                .legal-text-content h3 { font-size: 1.5rem; font-weight: 900; margin-bottom: 1rem; color: ${theme.colors.text}; }
                .legal-text-content h4 { font-size: 1.1rem; font-weight: 800; margin-top: 1.5rem; margin-bottom: 0.5rem; color: ${theme.colors.text}; opacity: 0.9; }
                .legal-text-content p { line-height: 1.6; margin-bottom: 0.5rem; opacity: 0.8; color: ${theme.colors.text}; }
                .legal-text-content strong { font-weight: 700; }
            `}</style>
    </div>
  );
};
