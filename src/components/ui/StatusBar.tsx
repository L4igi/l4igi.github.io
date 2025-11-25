import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Clock, Zap } from "lucide-react";
import { createPortal } from "react-dom";
import type { Theme } from "../../types";

let audioCtx: AudioContext | null = null;
let oscillators: AudioScheduledSourceNode[] = [];

const stopAllSounds = () => {
  oscillators.forEach((osc) => {
    try {
      osc.stop();
      osc.disconnect();
    } catch (e) {
      /* ignore */
    }
  });
  oscillators = [];

  if (audioCtx && audioCtx.state !== "closed") {
    audioCtx.close().catch(() => {});
    audioCtx = null;
  }
};

const playTimeWarpSound = () => {
  if (typeof window === "undefined") return;
  const AudioContext =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;

  stopAllSounds();

  audioCtx = new AudioContext();
  const ctx = audioCtx;
  const now = ctx.currentTime;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.15, now);
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2);
  masterGain.connect(ctx.destination);

  const osc1 = ctx.createOscillator();
  osc1.type = "square";
  osc1.frequency.setValueAtTime(220, now);
  osc1.frequency.linearRampToValueAtTime(440, now + 0.5);
  osc1.frequency.linearRampToValueAtTime(220, now + 1.0);
  osc1.frequency.linearRampToValueAtTime(440, now + 1.5);
  osc1.connect(masterGain);

  const osc2 = ctx.createOscillator();
  osc2.type = "sawtooth";
  osc2.frequency.setValueAtTime(55, now);
  osc2.frequency.linearRampToValueAtTime(110, now + 1.5);
  osc2.connect(masterGain);

  oscillators.push(osc1, osc2);

  osc1.start(now);
  osc2.start(now);

  osc1.stop(now + 2);
  osc2.stop(now + 2);
};

// --- 2. PARTICLE SYSTEM ---
const ExplosionParticles = ({
  x,
  y,
  color,
}: {
  x: number;
  y: number;
  color: string;
}) => {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    angle: (Math.random() * 360 * Math.PI) / 180,
    velocity: Math.random() * 100 + 50,
    size: Math.random() * 6 + 3,
    color: Math.random() > 0.5 ? color : "#ffffff",
    rotation: Math.random() * 360,
  }));

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{ left: x, top: y }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, rotate: p.rotation }}
          animate={{
            x: Math.cos(p.angle) * p.velocity,
            y: Math.sin(p.angle) * p.velocity + 300,
            scale: [0, 1.5, 0],
            rotate: p.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute rounded-sm shadow-sm"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
};

// --- 3. SHOCKWAVE RING ---
const Shockwave = ({
  x,
  y,
  color,
}: {
  x: number;
  y: number;
  color: string;
}) => (
  <div
    className="fixed pointer-events-none z-[9998]"
    style={{ left: x, top: y }}
  >
    <motion.div
      initial={{ scale: 0, opacity: 0.8, borderWidth: 50 }}
      animate={{ scale: 8, opacity: 0, borderWidth: 0 }}
      transition={{ duration: 1.0, ease: "circOut" }}
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-solid"
      style={{ width: 50, height: 50, borderColor: color }}
    />
  </div>
);

// --- 4. GLOBAL DISTORTION FILTER (The "Dizzy" Effect) ---
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
            values="0.01 0.02;0.02 0.04;0.01 0.02"
            dur="3s"
            repeatCount="indefinite"
          />
        </feTurbulence>
        {/* Scale controls intensity. 20 is noticeable but legible. */}
        <feDisplacementMap
          xChannelSelector="R"
          yChannelSelector="G"
          scale="30"
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
  onGoHome,
  showProfile,
}: StatusBarProps) => {
  const [imgError, setImgError] = useState(false);
  const [hours, minutes] = time.split(":");

  const [isTimeTraveling, setIsTimeTraveling] = useState(false);
  const [displayTime, setDisplayTime] = useState(time);
  const [glitchOffset, setGlitchOffset] = useState(0);

  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const controls = useAnimation();
  const [clickCoords, setClickCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    stopAllSounds();

    document.body.style.filter = "";
    document.body.style.transition = "";

    setIsTimeTraveling(false);
    setClickCoords(null);
    setGlitchOffset(0);
    setDisplayTime(time);
  }, [time]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  useEffect(() => {
    if (!isTimeTraveling) setDisplayTime(time);
  }, [time, isTimeTraveling]);

  useEffect(() => {
    if (isTimeTraveling) {
      document.body.style.transition = "filter 2s ease";
      document.body.style.filter =
        "url(#dizzy-filter) hue-rotate(180deg) contrast(1.2)";
    } else {
      document.body.style.transition = "filter 0.5s ease-out";
      document.body.style.filter = "none";
    }
  }, [isTimeTraveling]);

  const triggerEasterEgg = async (e: React.MouseEvent) => {
    if (isTimeTraveling) return;

    setIsTimeTraveling(true);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    await controls.start({
      scale: 0.8,
      rotate: -15,
      y: 5,
      transition: { duration: 0.2, ease: "backIn" },
    });

    setClickCoords(coords);
    playTimeWarpSound();

    await controls.start({
      scale: 1.3,
      rotate: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.6, ease: "circOut" },
    });

    let counter = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      const rH = Math.floor(Math.random() * 23)
        .toString()
        .padStart(2, "0");
      const rM = Math.floor(Math.random() * 59)
        .toString()
        .padStart(2, "0");
      setDisplayTime(`${rH}:${rM}`);
      setGlitchOffset(Math.random() * 6 - 3); // Stronger glitch
      counter++;

      if (counter > 60) stopTimeTravel();
    }, 40);

    timeoutRef.current = window.setTimeout(stopTimeTravel, 2500);
  };

  const stopTimeTravel = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsTimeTraveling(false);
    setDisplayTime(time);
    setGlitchOffset(0);

    setTimeout(() => setClickCoords(null), 1000);

    controls.start({
      scale: 1,
      rotate: 0,
      y: 0,
      transition: { type: "spring", stiffness: 500, damping: 15 },
    });
  };

  const handleProfileClick = () => {
    cleanup();
    if (showProfile) onGoHome();
    else onOpenProfile();
  };

  return (
    <>
      <DistortionFilter />

      {clickCoords &&
        createPortal(
          <>
            <ExplosionParticles
              x={clickCoords.x}
              y={clickCoords.y}
              color={theme.colors.accent}
            />
            <Shockwave
              x={clickCoords.x}
              y={clickCoords.y}
              color={theme.colors.accent}
            />
          </>,
          document.body,
        )}

      <div
        className="flex justify-between items-center px-6 py-4 z-50 relative select-none h-16 shrink-0 font-bold text-xs tracking-widest uppercase"
        style={{ color: theme.colors.text }}
      >
        <div className="min-w-[140px] h-full flex items-center">
          {showProfile && (
            <motion.button
              onClick={handleProfileClick}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="flex items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-full cursor-pointer border shadow-sm group overflow-hidden relative active:scale-95 transition-transform"
              style={{
                backgroundColor: theme.isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(255,255,255,0.4)",
                borderColor: theme.isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)",
              }}
              title={showProfile ? "Return to Home" : "Open Profile"}
            >
              <motion.div
                layout
                className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-inner relative overflow-hidden shrink-0"
                style={{ backgroundColor: theme.colors.accent }}
              >
                {!imgError ? (
                  <motion.img
                    layout
                    src="/profile/me.jpg"
                    alt="Lukas"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span className="font-black text-[10px] z-10">LH</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-start justify-center leading-none whitespace-nowrap"
              >
                <span className="opacity-100 font-black text-xs group-hover:text-[var(--accent)] transition-colors duration-300">
                  Lukas
                </span>
              </motion.div>
            </motion.button>
          )}
        </div>

        <div className="flex items-center justify-end min-w-[100px]">
          <motion.button
            onClick={triggerEasterEgg}
            animate={controls}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isTimeTraveling}
            className={`flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border shadow-sm relative overflow-visible ${isTimeTraveling ? "cursor-default" : "cursor-pointer"}`}
            style={{
              backgroundColor: isTimeTraveling
                ? theme.colors.accent
                : theme.isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(255,255,255,0.4)",
              borderColor: theme.isDark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)",
              color: isTimeTraveling
                ? theme.colors.contrastAccent
                : theme.colors.text,
              boxShadow: isTimeTraveling
                ? `3px 0 0 rgba(255,0,0,0.6), -3px 0 0 rgba(0,255,255,0.6)`
                : "none",
            }}
          >
            <div className="relative w-4 h-4">
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
                    className="absolute inset-0 opacity-60"
                  >
                    <Clock size={14} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="font-mono text-sm font-bold flex items-center tabular-nums w-[44px] justify-center"
              style={{
                textShadow: isTimeTraveling
                  ? `${glitchOffset}px 0 0 rgba(255,0,0,0.8), -${glitchOffset}px 0 0 rgba(0,255,255,0.8)`
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
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="mx-[1px]"
                  >
                    :
                  </motion.span>
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
