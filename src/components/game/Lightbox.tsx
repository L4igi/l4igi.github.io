import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback } from "react";

const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src);
const isImagePath = (str: string) => str.includes("/") || str.includes(".");

interface LightboxProps {
  index: number | null;
  screenshots: string[];
  onClose: () => void;
  setIndex: (i: number | null) => void;
}

export const Lightbox = ({
  index,
  screenshots,
  onClose,
  setIndex,
}: LightboxProps) => {
  const showNext = useCallback(() => {
    if (index === null) return;
    setIndex((index + 1) % screenshots.length);
  }, [index, screenshots.length, setIndex]);

  const showPrev = useCallback(() => {
    if (index === null) return;
    setIndex((index - 1 + screenshots.length) % screenshots.length);
  }, [index, screenshots.length, setIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, showNext, showPrev, onClose]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center"
          onClick={onClose}
        >
          <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full z-50">
            <X size={32} />
          </button>
          <div
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {screenshots.length > 1 && (
              <button
                onClick={showPrev}
                className="absolute left-2 sm:left-8 text-white z-50"
              >
                <ChevronLeft size={48} />
              </button>
            )}

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-6xl max-h-[85vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center"
            >
              {isVideo(screenshots[index]) ? (
                <video
                  src={screenshots[index]}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  loop
                />
              ) : isImagePath(screenshots[index]) ? (
                <img
                  src={screenshots[index]}
                  className="w-full h-full object-contain"
                  alt=""
                />
              ) : (
                <div className={`w-full h-full ${screenshots[index]}`} />
              )}
            </motion.div>

            {screenshots.length > 1 && (
              <button
                onClick={showNext}
                className="absolute right-2 sm:right-8 text-white z-50"
              >
                <ChevronRight size={48} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
