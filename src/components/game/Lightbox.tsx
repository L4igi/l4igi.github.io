import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src);
const isImagePath = (str: string) => str.includes("/") || str.includes(".");

interface LightboxProps {
  index: number | null;
  screenshots: string[];
  onClose: () => void;
  setIndex: (i: number) => void;
}

export const Lightbox = ({
  index,
  screenshots,
  onClose,
  setIndex,
}: LightboxProps) => {
  const showNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (index === null) return;
      setIndex((index + 1) % screenshots.length);
    },
    [index, screenshots.length, setIndex],
  );

  const showPrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (index === null) return;
      setIndex((index - 1 + screenshots.length) % screenshots.length);
    },
    [index, screenshots.length, setIndex],
  );

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
          <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50">
            <X size={32} />
          </button>

          <div
            className="relative w-full h-full flex items-center justify-center p-4 sm:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            {screenshots.length > 1 && (
              <button
                onClick={showPrev}
                className="absolute left-2 sm:left-8 text-white/50 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-50"
              >
                <ChevronLeft size={48} />
              </button>
            )}

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full max-w-6xl max-h-[85vh] rounded-2xl shadow-2xl flex items-center justify-center ring-1 ring-white/10 overflow-hidden bg-black/90 sm:bg-black/50 sm:backdrop-blur-xl transform-gpu"
            >
              {isVideo(screenshots[index]) ? (
                <div className="w-full h-full flex items-center justify-center bg-black relative">
                  <video
                    src={screenshots[index]}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              ) : isImagePath(screenshots[index]) ? (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 z-0 hidden sm:block">
                    <img
                      src={screenshots[index]}
                      alt=""
                      className="w-full h-full object-cover blur-2xl opacity-40 scale-110 brightness-75"
                      decoding="async"
                    />
                  </div>
                  <img
                    src={screenshots[index]}
                    alt={`Screenshot ${index + 1}`}
                    className="relative z-10 w-full h-full object-contain shadow-2xl"
                    decoding="async"
                  />
                </div>
              ) : (
                <div
                  className={`w-full h-full ${screenshots[index]} flex items-center justify-center`}
                >
                  <div className="text-center">
                    <span className="font-mono text-white/20 text-4xl font-bold block mb-2">
                      PREVIEW
                    </span>
                    <span className="font-mono text-white/40 text-sm">
                      {index + 1} / {screenshots.length}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {screenshots.length > 1 && (
              <button
                onClick={showNext}
                className="absolute right-2 sm:right-8 text-white/50 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-50"
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
