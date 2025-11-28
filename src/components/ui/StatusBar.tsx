import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Moon,
  CloudLightning,
} from "lucide-react";
import type { Theme } from "../../types";
import { type WeatherCondition, WeatherOverlay } from "./WeatherOverlay.tsx";

interface WeatherData {
  temp: number;
  condition: WeatherCondition;
  isDay: boolean;
}

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

  // Toggle for the immersive overlay
  const [showImmersive, setShowImmersive] = useState(true);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      // Defaulting to Vienna coordinates or user location
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

  const handleWeatherClick = () => {
    setShowImmersive((prev) => !prev);
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

  return (
    <>
      {weather && showImmersive && (
        <WeatherOverlay
          condition={weather.condition}
          isDay={weather.isDay}
          themeIsDark={theme.isDark}
        />
      )}

      <div
        className="flex justify-between items-center px-4 md:px-6 py-4 z-50 relative select-none h-20 shrink-0"
        style={{ background: "transparent" }}
      >
        {showProfile && (
          <motion.button
            onClick={onOpenProfile}
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
                layout
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 15 },
                }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center gap-2 md:gap-3 pr-1 pl-2 md:pr-2 md:pl-4 py-1 md:py-2 h-10 md:h-[60px] rounded-full backdrop-blur-md border-2 shadow-lg overflow-hidden group cursor-pointer"
                style={{
                  backgroundColor: theme.isDark
                    ? "rgba(30,30,30,0.6)"
                    : "rgba(255,255,255,0.6)",
                  borderColor: theme.isDark
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(0,0,0,0.08)",
                  boxShadow: `0 8px 32px -4px ${styles.glow}`,
                  color: theme.colors.text,
                }}
              >
                <div
                  className="absolute inset-0 transition-colors duration-500 opacity-20"
                  style={{ backgroundColor: styles.bg }}
                />

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
                    color: styles.iconColor,
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={weather.condition}
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
