import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Clock, Zap } from "lucide-react";
import { createPortal } from "react-dom";
import type { Theme } from "../../types";

// --- 1. RETRO SOUND SYNTHESIZER (Upgraded + Noise) ---
const playTimeWarpSound = () => {
  if (typeof window === "undefined") return;
  const AudioContext =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();
  const now = ctx.currentTime;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.2, now);
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
  masterGain.connect(ctx.destination);

  // Osc 1: The "Whistle"
  const osc1 = ctx.createOscillator();
  osc1.type = "square";
  osc1.frequency.setValueAtTime(220, now);
  osc1.frequency.linearRampToValueAtTime(880, now + 0.2);
  osc1.frequency.linearRampToValueAtTime(440, now + 0.4);
  osc1.frequency.linearRampToValueAtTime(1760, now + 0.6); // High finish
  osc1.connect(masterGain);

  // Osc 2: The "Growl"
  const osc2 = ctx.createOscillator();
  osc2.type = "sawtooth";
  osc2.frequency.setValueAtTime(55, now);
  osc2.frequency.linearRampToValueAtTime(110, now + 0.8);
  osc2.connect(masterGain);

  // Noise Burst (The "Pop")
  const bufferSize = ctx.sampleRate * 0.1; // 100ms burst
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.1, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  noise.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  noise.start(now);

  osc1.stop(now + 1.5);
  osc2.stop(now + 1.5);
};

// --- 2. PARTICLE SYSTEM (Gravity + Tumble) ---
const ExplosionParticles = ({
  x,
  y,
  color,
}: {
  x: number;
  y: number;
  color: string;
}) => {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    angle: (Math.random() * 360 * Math.PI) / 180,
    velocity: Math.random() * 150 + 50,
    size: Math.random() * 6 + 3,
    color:
      Math.random() > 0.6 ? color : Math.random() > 0.5 ? "#ffffff" : "#000000", // Mix accents
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
            // Physics: Initial upward velocity + Gravity pulling down
            y: Math.sin(p.angle) * p.velocity + 300,
            scale: [0, 1.5, 0],
            rotate: p.rotation + 720, // Tumble effect
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 1.5, ease: [0.2, 0.4, 0.8, 1] }} // Gravity-like ease
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
      animate={{ scale: 5, opacity: 0, borderWidth: 0 }}
      transition={{ duration: 0.6, ease: "circOut" }}
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-solid"
      style={{ width: 50, height: 50, borderColor: color }}
    />
  </div>
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

  // --- EASTER EGG STATE ---
  const [isTimeTraveling, setIsTimeTraveling] = useState(false);
  const [displayTime, setDisplayTime] = useState(time);
  const [glitchOffset, setGlitchOffset] = useState(0); // For RGB split effect

  const intervalRef = useRef<number | null>(null);
  const controls = useAnimation();
  const [clickCoords, setClickCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isTimeTraveling) setDisplayTime(time);
  }, [time, isTimeTraveling]);

  const triggerEasterEgg = async (e: React.MouseEvent) => {
    if (isTimeTraveling) return;
    setIsTimeTraveling(true);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    // 1. Wind Up
    await controls.start({
      scale: 0.8,
      rotate: -10,
      y: 5,
      transition: { duration: 0.2, ease: "backIn" },
    });

    // 2. POP!
    setClickCoords(coords);
    playTimeWarpSound();

    // Shake & Glitch
    controls.start({
      scale: 1.2,
      rotate: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.5, ease: "circOut" },
    });

    // 3. Scramble & Glitch Loop
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
      setGlitchOffset(Math.random() * 4 - 2); // Jitter text shadow
      counter++;

      if (counter > 60) stopTimeTravel();
    }, 40);

    setTimeout(stopTimeTravel, 2500);
  };

  const stopTimeTravel = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsTimeTraveling(false);
    setDisplayTime(time);
    setGlitchOffset(0);

    setTimeout(() => setClickCoords(null), 1000);

    // 4. Landing
    controls.start({
      scale: 1,
      rotate: 0,
      y: 0,
      transition: { type: "spring", stiffness: 500, damping: 15 },
    });
  };

  const handleProfileClick = () => {
    if (showProfile) onGoHome();
    else onOpenProfile();
  };

  return (
    <>
      {/* --- FULL SCREEN VIGNETTE FLASH --- */}
      {isTimeTraveling &&
        createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden"
            style={{
              // Heavy blur + Vignette + Color Shift
              background:
                "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.4) 90%)",
              backdropFilter: "blur(8px) hue-rotate(90deg) contrast(1.2)",
            }}
          >
            {/* Chromatic Wobble Overlay */}
            <motion.div
              animate={{
                x: [0, -5, 5, 0],
                y: [0, 5, -5, 0],
              }}
              transition={{ duration: 0.2, repeat: Infinity }}
              className="w-full h-full bg-gradient-to-t from-purple-500/20 to-transparent mix-blend-overlay"
            />
          </motion.div>,
          document.body,
        )}

      {/* PARTICLES & SHOCKWAVE */}
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
            className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border shadow-sm relative overflow-visible"
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
              cursor: "pointer",
              // RGB Glitch Shadow
              boxShadow: isTimeTraveling
                ? `2px 0 0 rgba(255,0,0,0.5), -2px 0 0 rgba(0,255,255,0.5)`
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
                // Text Glitch Effect
                textShadow: isTimeTraveling
                  ? `${glitchOffset}px 0 0 rgba(255,0,0,0.7), -${glitchOffset}px 0 0 rgba(0,255,255,0.7)`
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
