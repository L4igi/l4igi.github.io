import { useRef, useState, useCallback } from "react";
import type { MouseEvent } from "react";

export const useDraggableScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Ref to track if movement happened, used to block clicks after dragging
  const hasMoved = useRef(false);

  const onMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    setIsDragging(true);
    hasMoved.current = false;
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !ref.current) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      ref.current.scrollLeft = scrollLeft - walk;

      // If moved more than 5px, consider it a drag (not a click)
      if (Math.abs(x - startX) > 5) {
        hasMoved.current = true;
      }
    },
    [isDragging, startX, scrollLeft],
  );

  return {
    scrollRef: ref,
    isDragging,
    hasMoved,
    events: {
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onMouseMove,
    },
  };
};
