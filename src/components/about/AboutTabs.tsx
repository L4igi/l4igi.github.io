import { useState, useMemo } from "react";
import {
  User,
  Briefcase,
  MapPin,
  Languages,
  Medal,
  Quote,
  Download,
  Github,
  Linkedin,
  Mail,
  Coffee,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Theme, SkillLevel } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import {
  EXPERIENCE_DATA,
  SKILLS_DATA,
  LIKES_DATA,
  CV_LINKS,
  SOCIAL_LINKS,
} from "../../data/content";
import type { Variants } from "motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
};

export const TabIdentity = ({ theme }: { theme: Theme }) => {
  const { t, language } = useLanguage();

  const cvUrl = language === "de" ? CV_LINKS.de : CV_LINKS.en;
  const cvLabel = language === "de" ? "Lebenslauf" : "Download CV";

  const SOCIALS = [
    { icon: <Github size={20} />, label: "GitHub", url: SOCIAL_LINKS.github },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      url: SOCIAL_LINKS.linkedin,
    },
    { icon: <Mail size={20} />, label: "Email", url: SOCIAL_LINKS.email },
  ];

  return (
    <div className="space-y-8 sm:pt-4">
      {/* Top Quote */}
      <motion.div
        variants={itemVariants}
        className="relative p-6 rounded-2xl rounded-tl-none border shadow-sm"
        style={{
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.secondary,
        }}
      >
        <h4
          className="text-xs font-black uppercase tracking-widest mb-2 opacity-60 flex items-center gap-2"
          style={{ color: theme.colors.text }}
        >
          <User size={14} /> {t("modal.quote")}
        </h4>
        <p
          className="text-sm sm:text-lg font-medium leading-relaxed"
          style={{ color: theme.colors.text }}
        >
          {t("modal.quote_text")}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            label: t("modal.class"),
            val: t("hero.role"),
            icon: <Briefcase size={20} />,
          },
          {
            label: t("modal.region"),
            val: t("modal.loc_name"),
            icon: <MapPin size={20} />,
          },
          {
            label: t("modal.langs"),
            val: t("modal.lang_native"),
            sub: t("modal.lang_fluent"),
            icon: <Languages size={20} />,
          },
          {
            label: t("modal.hobbies"),
            val: t("modal.hobbies_list"),
            sub: t("modal.hobbies_learning"),
            icon: <Coffee size={20} />,
          },
        ].map((stat, i) => (
          <motion.div
            variants={itemVariants}
            key={i}
            className="p-4 rounded-2xl border shadow-sm flex items-start gap-4 group hover:shadow-md hover:scale-[1.01] transition-all"
            style={{
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.secondary,
            }}
          >
            <div
              className="p-2.5 rounded-xl"
              style={{
                backgroundColor: theme.colors.accent,
                color: theme.colors.contrastAccent,
              }}
            >
              {stat.icon}
            </div>
            <div>
              <div
                className="text-[10px] font-black uppercase mb-1 tracking-widest opacity-50"
                style={{ color: theme.colors.text }}
              >
                {stat.label}
              </div>
              <div
                className="font-bold text-sm sm:text-base leading-tight"
                style={{ color: theme.colors.text }}
              >
                {stat.val}
              </div>
              {stat.sub && (
                <div
                  className="text-xs font-medium opacity-60 mt-0.5"
                  style={{ color: theme.colors.text }}
                >
                  {stat.sub}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Badge Section */}
        <motion.div
          variants={itemVariants}
          className="sm:col-span-2 p-4 rounded-2xl border shadow-sm flex items-center gap-4 hover:shadow-md hover:scale-[1.01] transition-all"
          style={{
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.secondary,
          }}
        >
          <div
            className="p-3 rounded-xl"
            style={{
              backgroundColor: theme.colors.cardBg,
              color: theme.colors.accent,
              border: `2px solid ${theme.colors.secondary}`,
            }}
          >
            <Medal size={24} />
          </div>
          <div>
            <div
              className="text-[10px] font-black uppercase mb-1 tracking-widest opacity-50"
              style={{ color: theme.colors.text }}
            >
              {t("modal.badges")}
            </div>
            <div
              className="font-bold text-sm sm:text-base"
              style={{ color: theme.colors.text }}
            >
              Certified Scrum Master (2021)
            </div>
          </div>
        </motion.div>
      </div>

      {/* MOBILE CONNECT (Visible only on mobile) */}
      <div className="sm:hidden">
        <motion.div variants={itemVariants} className="space-y-3">
          <h4
            className="text-xs font-black uppercase tracking-widest opacity-80"
            style={{ color: theme.colors.text }}
          >
            Connect
          </h4>
          <a
            href={cvUrl}
            download
            className="w-full p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-sm mb-3 shadow-sm active:scale-95 transition-transform"
            style={{
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.secondary,
              color: theme.colors.text,
            }}
          >
            <Download size={16} />
            {cvLabel}
          </a>
          <div className="grid grid-cols-3 gap-3">
            {SOCIALS.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer"
                style={{
                  backgroundColor: theme.colors.accent,
                  color: theme.colors.contrastAccent,
                  boxShadow: "0 4px 15px -5px rgba(0,0,0,0.3)",
                }}
              >
                <div className="opacity-80">{social.icon}</div>
                <span className="text-xs font-bold">{social.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Quote */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-2xl border relative mt-4"
        style={{
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.secondary,
        }}
      >
        <Quote
          size={32}
          className="absolute top-4 right-4 rotate-12 opacity-20"
          style={{ color: theme.colors.accent }}
        />
        <p
          className="text-lg font-bold italic relative z-10 text-center"
          style={{ color: theme.colors.text }}
        >
          {t("modal.sakurai_quote")}
        </p>
        <p
          className="text-xs font-black uppercase tracking-widest text-right mt-4 opacity-60"
          style={{ color: theme.colors.text }}
        >
          {t("modal.quote_author")}
        </p>
      </motion.div>
    </div>
  );
};

export const TabExperience = ({ theme }: { theme: Theme }) => {
  const { language } = useLanguage();

  return (
    <div
      className="sm:pt-4 relative border-l-2 ml-3 space-y-8 py-2"
      style={{ borderColor: theme.colors.secondary }}
    >
      {EXPERIENCE_DATA.map((item, i) => (
        <motion.div
          variants={itemVariants}
          key={i}
          className="relative pl-8 group"
        >
          <div
            className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-[3px] shadow-sm group-hover:scale-125 transition-transform duration-300"
            style={{
              borderColor: theme.colors.cardBg,
              backgroundColor: theme.colors.accent,
            }}
          ></div>
          <div
            className="p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all hover:-translate-y-1"
            style={{
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.secondary,
            }}
          >
            <div className="flex flex-wrap justify-between items-baseline mb-2 gap-2">
              <h3
                className="font-bold text-lg"
                style={{ color: theme.colors.text }}
              >
                {item.title}
              </h3>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full opacity-80"
                style={{
                  backgroundColor: theme.colors.cardBg,
                  color: theme.colors.text,
                }}
              >
                {item.year}
              </span>
            </div>
            <div
              className="text-xs font-bold uppercase tracking-wide mb-3"
              style={{ color: theme.colors.accent }}
            >
              {item.role[language]}
            </div>
            <p
              className="text-sm leading-relaxed opacity-80"
              style={{ color: theme.colors.text }}
            >
              {item.desc[language]}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const TabSkills = ({ theme }: { theme: Theme }) => {
  const { language } = useLanguage();
  const [activeSkillLevel, setActiveSkillLevel] =
    useState<SkillLevel>("PROFICIENT");
  const activeSkillCategory = SKILLS_DATA.find(
    (cat) => cat.id === activeSkillLevel,
  );

  return (
    <div className="sm:pt-4 space-y-6">
      <div
        className="flex gap-2 p-1 rounded-xl border w-fit max-w-full overflow-x-auto no-scrollbar mx-auto"
        style={{
          borderColor: theme.colors.secondary,
          backgroundColor: theme.colors.primary,
        }}
      >
        {SKILLS_DATA.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveSkillLevel(cat.id)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all relative shrink-0 cursor-pointer ${activeSkillLevel === cat.id ? "text-white" : "opacity-60 hover:opacity-100 hover:scale-105"}`}
            style={{
              color:
                activeSkillLevel === cat.id
                  ? theme.colors.contrastAccent
                  : theme.colors.text,
            }}
          >
            {activeSkillLevel === cat.id && (
              <motion.div
                layoutId="activeSkillTab"
                className="absolute inset-0 rounded-lg"
                style={{ backgroundColor: theme.colors.accent }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
            <span className="relative z-10">{cat.label[language]}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeSkillCategory && (
          <motion.div
            key={activeSkillCategory.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <p
              className="text-sm font-medium opacity-70 italic"
              style={{ color: theme.colors.text }}
            >
              {activeSkillCategory.description[language]}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeSkillCategory.skills.map((skill, i) => (
                <motion.div
                  custom={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={skill.name}
                  className="p-5 rounded-2xl shadow-sm border hover:shadow-md hover:scale-[1.01] transition-all"
                  style={{
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.secondary,
                  }}
                >
                  <div className="flex justify-between text-sm font-bold mb-3">
                    <span style={{ color: theme.colors.text }}>
                      {skill.name}
                    </span>
                    <span style={{ color: theme.colors.accent }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    className="h-2.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: theme.colors.cardBg }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{
                        duration: 1,
                        delay: 0.2 + i * 0.1,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const TabLikes = ({ theme }: { theme: Theme }) => {
  const { language } = useLanguage();

  const shuffledLikes = useMemo(() => {
    const array = [...LIKES_DATA];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:pt-4">
      {shuffledLikes.map((item) => (
        <motion.div
          variants={itemVariants}
          key={item.id}
          className="p-5 rounded-2xl shadow-sm border flex gap-5 items-center hover:shadow-md hover:scale-[1.01]"
          style={{
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.secondary,
          }}
        >
          <div
            className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center text-white shrink-0 shadow-md`}
          >
            {item.icon}
          </div>
          <div>
            <h3
              className="font-bold text-lg"
              style={{ color: theme.colors.text }}
            >
              {item.title}
            </h3>
            <p
              className="text-xs font-bold uppercase tracking-wide mb-1 opacity-60"
              style={{ color: theme.colors.text }}
            >
              {item.role[language]}
            </p>
            <p
              className="text-sm leading-snug opacity-80"
              style={{ color: theme.colors.text }}
            >
              {item.description[language]}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
