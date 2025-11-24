import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import type { Theme } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { useDraggableScroll } from "../../hooks/useDraggableScroll";
import { VideoThumbnail } from "../ui/VideoThumbnail";
import type { Variants } from "motion";

// Helpers moved here or imported from a utils file
const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src);
const isImagePath = (str: string) => str.includes("/") || str.includes(".");

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

interface GameGalleryProps {
  screenshots: string[];
  theme: Theme;
  onImageClick: (index: number) => void;
}

export const GameGallery = ({
  screenshots,
  theme,
  onImageClick,
}: GameGalleryProps) => {
  const { t } = useLanguage();
  // Hook usage is now encapsulated where it belongs
  const { scrollRef, hasMoved, events: dragEvents } = useDraggableScroll();

  if (!screenshots || screenshots.length === 0) return null;

  return (
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
        {screenshots.map((item, i) => (
          <motion.button
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!hasMoved.current) onImageClick(i);
            }}
            className="w-56 h-32 sm:w-64 sm:h-40 shrink-0 rounded-xl shadow-md flex items-center justify-center relative group border-4 overflow-hidden bg-black/5"
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
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none flex items-center gap-1">
              {isVideo(item) ? "VIDEO" : `IMG_0${i + 1}`}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
