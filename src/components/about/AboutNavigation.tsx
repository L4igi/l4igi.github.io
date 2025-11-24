import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  Award,
  Heart,
  Download,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SOCIAL_LINKS, CV_LINKS } from "../../data/content";
import type { Theme } from "../../types";
import type { Variants } from "motion";
import type { AboutTab } from "./useAboutModal.tsx";

interface NavProps {
  activeTab: AboutTab;
  setActiveTab: (tab: AboutTab) => void;
  theme: Theme;
  variant: "mobile" | "desktop";
  isExpanded: boolean;
}

const contentStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
};

export const AboutNavigation = ({
  activeTab,
  setActiveTab,
  theme,
  variant,
  isExpanded,
}: NavProps) => {
  const { t, language } = useLanguage();

  const TABS = [
    { id: "ID", label: t("modal.id"), icon: <User size={18} /> },
    { id: "EXP", label: t("modal.exp"), icon: <Briefcase size={18} /> },
    { id: "SKILLS", label: t("modal.skills"), icon: <Award size={18} /> },
    { id: "LIKES", label: t("cat.likes"), icon: <Heart size={18} /> },
  ];

  const getTabStyle = (isActive: boolean) => ({
    color: isActive ? theme.colors.contrastAccent : theme.colors.textLight,
    backgroundColor: isActive
      ? "transparent"
      : variant === "mobile"
        ? theme.colors.secondary
        : "transparent",
  });

  const TabButton = ({ tab }: { tab: (typeof TABS)[0] }) => {
    const Component = variant === "desktop" ? motion.button : "button";
    const props = variant === "desktop" ? { variants: itemVariants } : {};

    return (
      <Component
        onClick={() => setActiveTab(tab.id as AboutTab)}
        className={`relative rounded-xl font-bold text-xs flex items-center gap-2 transition-colors
          ${variant === "mobile" ? "px-2 py-2 justify-center border" : "w-full p-3 gap-4 text-sm overflow-hidden"}
          ${activeTab === tab.id ? "text-white border-transparent" : "border-transparent hover:bg-black/5"}`}
        style={getTabStyle(activeTab === tab.id)}
        {...props}
      >
        {activeTab === tab.id && (
          <motion.div
            layoutId={`activeTab-${variant}`}
            className="absolute inset-0 rounded-xl"
            style={{ backgroundColor: theme.colors.accent }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {tab.icon}{" "}
          {variant === "desktop" && (
            <span className="tracking-wide">{tab.label}</span>
          )}
        </span>
      </Component>
    );
  };

  // --- MOBILE RENDER ---
  if (variant === "mobile") {
    return (
      <div
        className="sm:hidden w-full px-4 pt-16 pb-2 border-b z-10 grid grid-cols-2 gap-2 shrink-0"
        style={{ borderColor: theme.colors.primary }}
      >
        {TABS.map((tab) => (
          <TabButton key={tab.id} tab={tab} />
        ))}
      </div>
    );
  }

  // --- DESKTOP RENDER ---
  const cvUrl = language === "de" ? CV_LINKS.de : CV_LINKS.en;
  const cvLabel = language === "de" ? "Lebenslauf" : "Download CV";

  return (
    <div
      className="hidden sm:flex w-64 p-4 pt-24 flex-col gap-2 border-r z-10"
      style={{
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.secondary,
      }}
    >
      {isExpanded && (
        <motion.div
          variants={contentStagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col h-full"
        >
          <div className="space-y-2">
            {TABS.map((tab) => (
              <TabButton key={tab.id} tab={tab} />
            ))}
          </div>

          <div className="mt-auto pt-6">
            <h4
              className="text-xs font-black uppercase tracking-widest opacity-50 mb-3 px-2"
              style={{ color: theme.colors.text }}
            >
              Connect
            </h4>

            <motion.a
              href={cvUrl}
              download
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mb-3 w-full p-3 rounded-xl border flex items-center justify-center gap-2 transition-colors font-bold text-sm shadow-sm"
              style={{
                backgroundColor: theme.colors.accent,
                color: theme.colors.contrastAccent,
                borderColor: theme.colors.secondary,
              }}
            >
              <Download size={16} /> <span>{cvLabel}</span>
            </motion.a>

            <div className="flex gap-2">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                className="p-2.5 rounded-xl border flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: theme.colors.cardBg,
                  borderColor: theme.colors.secondary,
                  color: theme.colors.text,
                }}
              >
                <Github size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                className="p-2.5 rounded-xl border flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: theme.colors.cardBg,
                  borderColor: theme.colors.secondary,
                  color: theme.colors.text,
                }}
              >
                <Linkedin size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.email}
                target="_blank"
                className="p-2.5 rounded-xl border flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: theme.colors.cardBg,
                  borderColor: theme.colors.secondary,
                  color: theme.colors.text,
                }}
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
