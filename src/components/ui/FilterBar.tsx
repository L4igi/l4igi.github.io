import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Star } from "lucide-react"; // Added Star
import type { Category, Theme } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { SOCIAL_LINKS } from "../../data/content.tsx";

interface FilterBarProps {
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  theme: Theme;
}

export const FilterBar = ({
  activeCategory,
  setActiveCategory,
  theme,
}: FilterBarProps) => {
  const { t } = useLanguage();

  const categories: Category[] = ["ALL", "WORK", "PERSONAL", "UNI", "LIKED"];
  const socialItems = [
    { Icon: Mail, url: SOCIAL_LINKS.email },
    { Icon: Github, url: SOCIAL_LINKS.github },
    { Icon: Linkedin, url: SOCIAL_LINKS.linkedin },
  ];
  return (
    <div className="sticky top-0 z-30 w-full flex justify-center pt-4 pb-2 pointer-events-none">
      <div
        className="pointer-events-auto backdrop-blur-xl border shadow-sm overflow-hidden transition-all duration-300 rounded-full w-fit max-w-[95%]"
        style={{
          backgroundColor: theme.isDark
            ? "rgba(30, 41, 59, 0.2)"
            : "rgba(255, 255, 255, 0.2)",
          borderColor: theme.colors.secondary,
        }}
      >
        <div className="flex flex-row items-center p-1 sm:p-1.5">
          {/* CATEGORIES */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto justify-start">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-black tracking-wide transition-colors z-10 shrink-0 cursor-pointer flex items-center justify-center gap-1.5`}
                style={{
                  color:
                    activeCategory === cat
                      ? theme.colors.contrastAccent
                      : theme.colors.text,
                }}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-full z-[-1]"
                    style={{ backgroundColor: theme.colors.accent }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {cat === "LIKED" ? (
                  <>
                    <Star
                      size={10}
                      fill={
                        activeCategory === "LIKED" ? "currentColor" : "none"
                      }
                      className="mb-[1px]"
                    />
                    <span>LIKED</span>
                  </>
                ) : cat === "ALL" ? (
                  t("cat.all")
                ) : cat === "WORK" ? (
                  t("cat.work")
                ) : cat === "PERSONAL" ? (
                  t("cat.personal")
                ) : (
                  t("cat.uni")
                )}
              </motion.button>
            ))}
          </div>

          {/* SOCIALS */}
          <div className="hidden sm:flex items-center pl-2">
            <div
              className="w-px h-4 mx-2 opacity-20 shrink-0"
              style={{ backgroundColor: theme.colors.text }}
            ></div>

            <div className="flex gap-1 shrink-0">
              {socialItems.map(({ Icon, url }, i) => (
                <motion.a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, color: theme.colors.accent }}
                  whileTap={{ scale: 0.9 }}
                  key={i}
                  className="p-1.5 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center"
                  style={{ color: theme.colors.text }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
