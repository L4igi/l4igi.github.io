import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Clock, Zap } from "lucide-react";
import { createPortal } from "react-dom";
import type { Theme } from "../../types";

// --- PARTICLES ---
const ExplosionParticles = ({
  x,
  y,
  color,
}: {
  x: number;
  y: number;
  color: string;
}) => {
  const particles = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    angle: (i * 22.5 * Math.PI) / 180,
    velocity: Math.random() * 150 + 50,
    size: Math.random() * 6 + 2,
  }));

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{ left: x, top: y }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0 }}
          animate={{
            x: Math.cos(p.angle) * p.velocity,
            y: Math.sin(p.angle) * p.velocity,
            scale: [0, 1.5, 0],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute rounded-full shadow-[0_0_10px_currentColor]"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: color,
            color: color,
          }}
        />
      ))}
    </div>
  );
};

// --- DISTORTION FILTER ---
const DistortionFilter = () => (
  <svg
    style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
  >
    <defs>
      <filter id="dizzy-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01 0.02"
          numOctaves="2"
          result="warp"
        >
          <animate
            attributeName="baseFrequency"
            values="0.01 0.02;0.02 0.05;0.01 0.02"
            dur="3s"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap
          xChannelSelector="R"
          yChannelSelector="G"
          scale="40"
          in="SourceGraphic"
          in2="warp"
        />
      </filter>
    </defs>
  </svg>
);

interface StatusBarProps {
  time: string;
  theme: Theme;
  onOpenProfile: () => void;
  onGoHome: () => void;
  showProfile: boolean;
}

export const StatusBar = ({
  time,
  theme,
  onOpenProfile,
  showProfile,
}: StatusBarProps) => {
  const [imgError, setImgError] = useState(false);
  const [hours, minutes] = time.split(":");

  // STATE
  const [isTimeTraveling, setIsTimeTraveling] = useState(false);
  const [displayTime, setDisplayTime] = useState(time);
  const [glitchOffset, setGlitchOffset] = useState(0);
  const [clickCoords, setClickCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // REFS
  const activeInterval = useRef<number | null>(null);
  const activeTimeout = useRef<number | null>(null);
  const isMounted = useRef(false);
  const triggerId = useRef(0);

  const controls = useAnimation();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // --- FORCE STOP / CLEANUP ---
  const forceStop = useCallback(
    (shouldAnimate = true) => {
      triggerId.current++;

      // 1. Cleanup Timers
      if (activeInterval.current) {
        clearInterval(activeInterval.current);
        activeInterval.current = null;
      }
      if (activeTimeout.current) {
        clearTimeout(activeTimeout.current);
        activeTimeout.current = null;
      }

      // 2. Instant Reset
      document.body.style.transition = "none";
      document.body.style.filter = "";

      // 3. Reset State
      if (isMounted.current) {
        setIsTimeTraveling(false);
        setGlitchOffset(0);
        setDisplayTime(time);

        setTimeout(() => {
          if (isMounted.current) setClickCoords(null);
        }, 1000);

        if (shouldAnimate) {
          controls.start({
            scale: 1,
            rotate: 0,
            y: 0,
            transition: { type: "spring", stiffness: 400, damping: 20 },
          });
        }
      }
    },
    [controls, time],
  );

  // Sync time
  useEffect(() => {
    if (!isTimeTraveling && isMounted.current) setDisplayTime(time);
  }, [time, isTimeTraveling]);

  // Cleanup
  useEffect(() => {
    return () => forceStop(false);
  }, [forceStop]);

  useEffect(() => {
    if (isTimeTraveling) forceStop(true);
  }, [showProfile, forceStop]);

  // --- APPLY FILTER ---
  useEffect(() => {
    if (isTimeTraveling) {
      // Slow onset
      document.body.style.transition = "filter 2.5s ease-in-out";
      document.body.style.filter =
        "url(#dizzy-filter) hue-rotate(180deg) saturate(3) contrast(1.1)";
    } else {
      // Instant off
      document.body.style.transition = "none";
      document.body.style.filter = "";
    }
  }, [isTimeTraveling]);

  const handleTrigger = async (e: React.MouseEvent) => {
    if (isTimeTraveling) return;

    // 1. Lock
    setIsTimeTraveling(true);
    const currentSession = ++triggerId.current;

    // 2. Coords
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    try {
      // 3. Charge Up
      await controls.start({
        scale: 0.8,
        rotate: -15,
        y: 5,
        transition: { duration: 0.2, ease: "backIn" },
      });

      // 4. Session Check
      if (!isMounted.current || triggerId.current !== currentSession) {
        return;
      }

      // 5. Visuals
      setClickCoords(coords);

      // 6. Explode
      controls.start({
        scale: [0.8, 1.3, 1],
        rotate: [0, 10, -10, 5, -5, 0],
        transition: { duration: 0.6, ease: "backOut" },
      });

      // 7. Glitch
      if (activeInterval.current) clearInterval(activeInterval.current);
      activeInterval.current = window.setInterval(() => {
        if (!isMounted.current) return;
        const rH = Math.floor(Math.random() * 23)
          .toString()
          .padStart(2, "0");
        const rM = Math.floor(Math.random() * 59)
          .toString()
          .padStart(2, "0");
        setDisplayTime(`${rH}:${rM}`);
        setGlitchOffset((Math.random() - 0.5) * 8);
      }, 50);

      // 8. Auto Stop (2.5s strict)
      if (activeTimeout.current) clearTimeout(activeTimeout.current);
      activeTimeout.current = window.setTimeout(() => {
        if (isMounted.current && triggerId.current === currentSession) {
          forceStop(true);
        }
      }, 2500);
    } catch (error) {
      console.error("Easter egg failed", error);
      forceStop(true);
    }
  };

  const handleProfileClick = () => {
    forceStop(false);
    onOpenProfile();
  };

  return (
    <>
      <DistortionFilter />

      {clickCoords &&
        isTimeTraveling &&
        createPortal(
          <ExplosionParticles
            x={clickCoords.x}
            y={clickCoords.y}
            color={theme.colors.accent}
          />,
          document.body,
        )}

      <div
        className="flex justify-between items-center px-6 py-4 z-50 relative select-none h-16 shrink-0 font-bold text-xs tracking-widest uppercase"
        style={{ color: theme.colors.text }}
      >
        {showProfile && (
          <motion.button
            onClick={handleProfileClick}
            layout
            initial={{
              opacity: 0,
              scale: 0,
              y: 20,
              rotate: -20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0,
              y: 20,
              transition: { duration: 0.2 },
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 8,
              mass: 0.8,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 3,
              transition: { type: "spring", stiffness: 400, damping: 15 },
            }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-full cursor-pointer border shadow-sm group overflow-hidden origin-center"
            style={{
              backgroundColor: theme.isDark
                ? "rgba(255,255,255,0.05)"
                : "rgba(255,255,255,0.5)",
              borderColor: theme.isDark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)",
            }}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden shadow-inner border border-white/10 shrink-0">
              {!imgError ? (
                <img
                  src="/profile/me.jpg"
                  alt="LH"
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-black font-black text-[10px]">
                  LH
                </div>
              )}
            </div>
            <span className="font-black group-hover:text-[var(--accent)] transition-colors">
              Lukas
            </span>
          </motion.button>
        )}

        {/* Center Spacer */}
        <div className="flex-1"></div>

        {/* Time / Easter Egg Button */}
        <div className="min-w-[140px] flex items-center justify-end">
          <motion.button
            onClick={handleTrigger}
            animate={controls}
            layout
            // --- PHYSICS ONLY HOVER ---
            whileHover={{
              scale: 1.1,
              rotate: -3, // Symmetrical tilt
              // No background change here anymore, just physics
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            whileTap={{
              scale: 0.9,
              rotate: 0,
              transition: { duration: 0.1 },
            }}
            disabled={isTimeTraveling}
            className={`flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border shadow-sm relative overflow-visible group origin-center ${
              isTimeTraveling ? "cursor-default" : "cursor-pointer"
            }`}
            style={{
              backgroundColor: isTimeTraveling
                ? theme.colors.accent
                : theme.isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.5)",
              borderColor: theme.isDark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)",
              // Text color is base text normally, or contrast when active
              color: isTimeTraveling
                ? theme.colors.contrastAccent
                : theme.colors.text,
              boxShadow: isTimeTraveling
                ? `0 0 30px ${theme.colors.accent}`
                : "none",
            }}
          >
            {/* Icon Container - Adds hover color transition */}
            <div className="relative w-4 h-4 group-hover:text-[#facc15] transition-colors duration-200">
              <AnimatePresence mode="wait">
                {isTimeTraveling ? (
                  <motion.div
                    key="zap"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1.2, rotate: 0 }}
                    exit={{ scale: 0 }}
                    className="absolute inset-0"
                  >
                    <Zap size={16} fill="currentColor" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="clock"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute inset-0 opacity-60 group-hover:opacity-100"
                  >
                    <Clock size={14} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Text Container - Adds hover color transition */}
            <div
              className="font-mono text-sm font-bold flex items-center tabular-nums w-[44px] justify-center transition-colors duration-200 group-hover:text-[#facc15]"
              style={{
                transform: `translate(${glitchOffset}px, ${-glitchOffset}px)`,
                textShadow: isTimeTraveling
                  ? `${glitchOffset * 3}px 0 0 rgba(255,0,0,0.5), -${glitchOffset * 3}px 0 0 rgba(0,255,255,0.5)`
                  : "none",
              }}
            >
              {isTimeTraveling ? (
                <span className="tracking-tighter font-black">
                  {displayTime}
                </span>
              ) : (
                <>
                  <span>{hours}</span>
                  <span className="animate-pulse mx-[1px]">:</span>
                  <span>{minutes}</span>
                </>
              )}
            </div>
          </motion.button>
        </div>
      </div>
    </>
  );
};
