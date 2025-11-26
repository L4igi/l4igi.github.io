import { useState, useEffect, useCallback } from "react";
import type { Project } from "../../types";

export const useGameScreen = (
  project: Project,
  onClose: () => void,
  onNext?: () => void,
  onPrev?: () => void,
) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const initiateClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % project.screenshots.length : null,
    );
  }, [project.screenshots.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + project.screenshots.length) % project.screenshots.length
        : null,
    );
  }, [project.screenshots.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") setLightboxIndex(null);
      } else {
        if (e.key === "ArrowRight" && onNext) {
          e.preventDefault();
          onNext();
        }
        if (e.key === "ArrowLeft" && onPrev) {
          e.preventDefault();
          onPrev();
        }
        if (e.key === "Escape") {
          initiateClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage, initiateClose, onNext, onPrev]);

  return {
    state: {
      isClosing,
      isReady,
      lightboxIndex,
    },
    actions: {
      setIsReady,
      setLightboxIndex,
      close: initiateClose,
    },
  };
};
