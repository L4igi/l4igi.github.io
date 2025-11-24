import { motion } from "framer-motion";
import { Cpu, ListChecks, CheckCircle2 } from "lucide-react";
import type { Project, Theme } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import type { Variants } from "motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

interface GameDetailsProps {
  project: Project;
  theme: Theme;
}

export const GameDetails = ({ project, theme }: GameDetailsProps) => {
  const { t, language } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
            <span className={`w-2 h-8 rounded-full ${project.color}`}></span>
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

      <div className="lg:col-span-1 space-y-6">
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
  );
};
