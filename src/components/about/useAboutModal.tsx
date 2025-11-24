import { useState, useEffect, useCallback, useRef } from "react";

export type AboutTab = "ID" | "EXP" | "SKILLS" | "LIKES";

export const useAboutModal = (onClose: () => void) => {
  const [activeTab, setActiveTab] = useState<AboutTab>("ID");
  const [isClosing, setIsClosing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-expand on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsExpanded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // Scroll reset on tab change
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeTab]);

  const initiateClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  }, [onClose]);

  return {
    state: {
      activeTab,
      isClosing,
      isExpanded,
      isImageLoaded,
      contentRef,
    },
    actions: {
      setActiveTab,
      setIsImageLoaded,
      close: initiateClose,
    },
  };
};
