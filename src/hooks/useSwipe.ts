import { useRef } from "react";
import type { TouchEvent, MouseEvent } from "react";

interface SwipeHandlers {
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
}

export const useSwipe = ({ onSwipedLeft, onSwipedRight }: SwipeHandlers) => {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Minimum distance required for a swipe
  const minSwipeDistance = 50;

  // --- TOUCH HANDLERS ---
  const onTouchStart = (e: TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onSwipedLeft();
    } else if (isRightSwipe) {
      onSwipedRight();
    }
  };

  // --- MOUSE HANDLERS (Desktop Drag) ---
  const onMouseDown = (e: MouseEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.clientX;
  };

  const onMouseMove = (e: MouseEvent) => {
    touchEndX.current = e.clientX;
  };

  const onMouseUp = () => {
    // Re-use the logic from touch end
    onTouchEnd();
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};
