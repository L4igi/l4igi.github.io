import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Moon,
  CloudLightning,
  Zap,
} from "lucide-react";
import { createPortal } from "react-dom";
import type { Theme } from "../../types";
import { getComplementaryColor } from "../../utils/themeHelpers.ts";

type WeatherCondition =
  | "clear"
  | "cloudy"
  | "rain"
  | "snow"
  | "storm"
  | "night";

interface WeatherData {
  temp: number;
  condition: WeatherCondition;
  isDay: boolean;
}

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

const getConditionFromCode = (code: number): WeatherCondition => {
  if (code <= 1) return "clear";
  if (code <= 48) return "cloudy";
  if (code <= 67) return "rain";
  if (code <= 77) return "snow";
  if (code <= 82) return "rain";
  if (code <= 86) return "snow";
  if (code <= 99) return "storm";
  return "clear";
};

interface StatusBarProps {
  theme: Theme;
  onOpenProfile: () => void;
  showProfile: boolean;
}

export const StatusBar = ({
  theme,
  onOpenProfile,
  showProfile,
}: StatusBarProps) => {
  const [imgError, setImgError] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const [weather, setWeather] = useState<WeatherData | null>(null);

  const [isCrazy, setIsCrazy] = useState(false);
  const [clickCoords, setClickCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);

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

  const forceStop = useCallback(
    (shouldAnimate = true) => {
      triggerId.current++;

      if (activeTimeout.current) {
        clearTimeout(activeTimeout.current);
        activeTimeout.current = null;
      }

      document.body.style.transition = "none";
      document.body.style.filter = "";

      if (isMounted.current) {
        setIsCrazy(false);

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
    [controls],
  );

  useEffect(() => {
    return () => forceStop(false);
  }, [forceStop]);

  useEffect(() => {
    if (isCrazy) forceStop(true);
  }, [showProfile, forceStop]);

  useEffect(() => {
    if (isCrazy) {
      document.body.style.transition = "filter 2.5s ease-in-out";
      document.body.style.filter =
        "url(#dizzy-filter) hue-rotate(180deg) saturate(3) contrast(1.1)";
    } else {
      document.body.style.transition = "none";
      document.body.style.filter = "";
    }
  }, [isCrazy]);

  useEffect(() => {
    const fetchWeather = async () => {
      const latitude = 48.2082;
      const longitude = 16.3738;
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,is_day`,
        );
        if (!res.ok) throw new Error("API Error");
        const data = await res.json();

        if (isMounted.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            condition: getConditionFromCode(data.current.weather_code),
            isDay: data.current.is_day === 1,
          });
        }
      } catch (error) {
        console.error("Weather API failed:", error);
      }
    };
    fetchWeather();
  }, []);

  const handleWeatherClick = async (e: React.MouseEvent) => {
    if (!weather) return;

    if (isCrazy) {
      forceStop(true);
      return;
    }

    setIsCrazy(true);
    const currentSession = ++triggerId.current;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    try {
      await controls.start({
        scale: 0.8,
        rotate: -15,
        y: 5,
        transition: { duration: 0.2, ease: "backIn" },
      });

      if (!isMounted.current || triggerId.current !== currentSession) {
        return;
      }

      setClickCoords(coords);

      controls.start({
        scale: [0.8, 1.3, 1],
        rotate: [0, 10, -10, 5, -5, 0],
        transition: { duration: 0.6, ease: "backOut" },
      });

      if (activeTimeout.current) clearTimeout(activeTimeout.current);
      activeTimeout.current = window.setTimeout(() => {
        if (isMounted.current && triggerId.current === currentSession) {
          forceStop(true);
        }
      }, 2500);
    } catch (error) {
      forceStop(true);
    }
  };

  const getWeatherStyles = () => {
    if (!weather) return { bg: "", glow: "", iconColor: "" };

    if (!weather.isDay && weather.condition === "clear") {
      return {
        bg: "rgba(30, 41, 59, 0.6)",
        glow: "rgba(99, 102, 241, 0.4)",
        iconColor: "#818cf8",
      };
    }

    switch (weather.condition) {
      case "clear":
        return {
          bg: "rgba(254, 243, 199, 0.4)",
          glow: "rgba(251, 191, 36, 0.4)",
          iconColor: "#f59e0b",
        };
      case "rain":
        return {
          bg: "rgba(219, 234, 254, 0.4)",
          glow: "rgba(59, 130, 246, 0.4)",
          iconColor: "#3b82f6",
        };
      case "storm":
        return {
          bg: "rgba(226, 232, 240, 0.4)",
          glow: "rgba(148, 163, 184, 0.4)",
          iconColor: "#64748b",
        };
      case "snow":
        return {
          bg: "rgba(236, 254, 255, 0.4)",
          glow: "rgba(6, 182, 212, 0.4)",
          iconColor: "#06b6d4",
        };
      default:
        return {
          bg: "rgba(243, 244, 246, 0.4)",
          glow: "rgba(156, 163, 175, 0.2)",
          iconColor: "#9ca3af",
        };
    }
  };

  const renderIcon = () => {
    if (!weather) return null;
    const iconClass = "w-4 h-4 md:w-5 md:h-5 drop-shadow-sm";

    if (isCrazy)
      return (
        <Zap
          className={`w-5 h-5 md:w-6 md:h-6`}
          fill="currentColor"
          color={theme.colors.contrastAccent}
        />
      );

    if (!weather.isDay && weather.condition === "clear")
      return <Moon className={iconClass} strokeWidth={2.5} />;

    switch (weather.condition) {
      case "clear":
        return <Sun className={iconClass} strokeWidth={2.5} />;
      case "rain":
        return <CloudRain className={iconClass} strokeWidth={2.5} />;
      case "storm":
        return <CloudLightning className={iconClass} strokeWidth={2.5} />;
      case "snow":
        return <CloudSnow className={iconClass} strokeWidth={2.5} />;
      default:
        return <Cloud className={iconClass} strokeWidth={2.5} />;
    }
  };

  const styles = getWeatherStyles();
  const particleColor = isCrazy
    ? getComplementaryColor(theme.colors.accent)
    : styles.iconColor || theme.colors.accent;

  return (
    <>
      <DistortionFilter />

      {clickCoords &&
        isCrazy &&
        createPortal(
          <ExplosionParticles
            x={clickCoords.x}
            y={clickCoords.y}
            color={particleColor}
          />,
          document.body,
        )}

      <div
        className="flex justify-between items-center px-4 md:px-6 py-4 z-50 relative select-none h-20 shrink-0"
        style={{ background: "transparent" }}
      >
        {showProfile && (
          <motion.button
            onClick={() => {
              forceStop(false);
              onOpenProfile();
            }}
            layout
            initial={
              !hasAnimated
                ? { opacity: 0, scale: 0, y: 20, rotate: -20 }
                : false
            }
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{
              opacity: 0,
              scale: 0,
              y: 20,
              transition: { duration: 0.2 },
            }}
            onAnimationComplete={() => setHasAnimated(true)}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 500, damping: 15 },
            }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-3 pl-2 pr-5 py-2 rounded-full cursor-pointer border-2 shadow-lg group overflow-hidden origin-center backdrop-blur-md"
            style={{
              backgroundColor: theme.isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.6)",
              borderColor: theme.isDark
                ? "rgba(255,255,255,0.15)"
                : "rgba(0,0,0,0.08)",
            }}
          >
            <motion.div
              className="w-12 h-12 rounded-full overflow-hidden shadow-md border-2 shrink-0 relative z-10"
              style={{
                borderColor: theme.isDark
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(255,255,255,0.8)",
              }}
              whileHover={{
                rotate: [0, -3, 3, 0],
                transition: { duration: 0.4 },
              }}
            >
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-10" />
              {!imgError ? (
                <img
                  src="/profile/me.jpg"
                  alt="LH"
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-black font-black text-sm">
                  LH
                </div>
              )}
            </motion.div>
            <span
              className="font-black text-base relative z-10 tracking-wide uppercase group-hover:text-[var(--accent)] transition-colors"
              style={{ color: theme.colors.text }}
            >
              Lukas
            </span>
          </motion.button>
        )}

        <div className="flex-1" />

        <AnimatePresence>
          {weather && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center justify-end"
            >
              <motion.button
                onClick={handleWeatherClick}
                animate={controls}
                layout
                whileHover={{
                  scale: 1.05,
                  rotate: isCrazy ? 0 : 2,
                  transition: { type: "spring", stiffness: 400, damping: 15 },
                }}
                whileTap={{ scale: 0.95 }}
                // Removed 'cursor-default' when crazy. It stays 'cursor-pointer' to imply clickability (failsafe)
                className="relative flex items-center gap-2 md:gap-3 pr-1 pl-2 md:pr-2 md:pl-4 py-1 md:py-2 h-10 md:h-[60px] rounded-full backdrop-blur-md border-2 shadow-lg overflow-hidden group cursor-pointer"
                style={{
                  backgroundColor: isCrazy
                    ? theme.colors.accent
                    : theme.isDark
                      ? "rgba(30,30,30,0.6)"
                      : "rgba(255,255,255,0.6)",
                  borderColor: theme.isDark
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(0,0,0,0.08)",
                  boxShadow: isCrazy
                    ? `0 0 30px ${theme.colors.accent}`
                    : `0 8px 32px -4px ${styles.glow}`,
                  color: isCrazy
                    ? theme.colors.contrastAccent
                    : theme.colors.text,
                }}
              >
                {!isCrazy && (
                  <div
                    className="absolute inset-0 transition-colors duration-500 opacity-20"
                    style={{ backgroundColor: styles.bg }}
                  />
                )}

                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none z-20" />

                <span className="font-black text-sm md:text-lg tracking-tight tabular-nums relative z-10">
                  {weather.temp}°
                </span>

                <div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 shadow-inner relative z-10 bg-white/20"
                  style={{
                    borderColor: theme.isDark
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(255,255,255,0.6)",
                    color: isCrazy
                      ? theme.colors.contrastAccent
                      : styles.iconColor,
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isCrazy ? "crazy" : weather.condition}
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -90 }}
                    >
                      {renderIcon()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
