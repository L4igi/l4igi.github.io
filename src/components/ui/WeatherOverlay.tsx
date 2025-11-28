import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

export type WeatherCondition =
  | "clear"
  | "cloudy"
  | "rain"
  | "snow"
  | "storm"
  | "night";

interface WeatherOverlayProps {
  condition: WeatherCondition;
  isDay: boolean;
  themeIsDark: boolean;
  intensity?: number; // 0 to 1
}

const RAIN_COUNT = 60;
const SNOW_COUNT = 40;
const STAR_COUNT = 25;

const CLOUD_LAYERS = [
  { top: 5, mobileTop: 5, scale: 0.6, duration: 85, delay: 0, zIndex: 1 }, // High, slow, far
  { top: 15, mobileTop: 20, scale: 0.9, duration: 65, delay: -30, zIndex: 2 }, // Mid, med, mid
  { top: 8, mobileTop: 12, scale: 0.5, duration: 95, delay: -50, zIndex: 1 }, // High, slow, far (offset)
  { top: 25, mobileTop: 50, scale: 1.3, duration: 45, delay: -15, zIndex: 3 }, // Low, fast, near -> Lower on mobile
  { top: 18, mobileTop: 35, scale: 0.8, duration: 70, delay: -70, zIndex: 2 }, // Mid, med, mid (offset)
  { top: 35, mobileTop: 65, scale: 1.5, duration: 35, delay: -40, zIndex: 4 }, // Lowest, fastest, nearest -> Much lower on mobile
];

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export const WeatherOverlay = ({
  condition,
  isDay,
  themeIsDark,
  intensity = 1,
}: WeatherOverlayProps) => {
  if (intensity === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        {/* --- SUNNY DAY --- */}
        {condition === "clear" && isDay && (
          <motion.div
            key="sun"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <HeroSun themeIsDark={themeIsDark} />

            {Array.from({ length: 8 }).map((_, i) => (
              <LensFlare key={i} index={i} themeIsDark={themeIsDark} />
            ))}
          </motion.div>
        )}

        {/* --- NIGHT --- */}
        {(condition === "clear" || condition === "night") && !isDay && (
          <motion.div
            key="night"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <HeroMoon themeIsDark={themeIsDark} />

            {Array.from({ length: STAR_COUNT }).map((_, i) => (
              <TwinkleStar key={i} themeIsDark={themeIsDark} />
            ))}

            {Array.from({ length: 2 }).map((_, i) => (
              <ShootingStar
                key={`shoot-${i}`}
                themeIsDark={themeIsDark}
                index={i}
              />
            ))}

            <div
              className={`absolute inset-0 bg-gradient-to-b ${themeIsDark ? "from-indigo-950/40" : "from-indigo-900/10"} to-transparent`}
            />
          </motion.div>
        )}

        {condition === "cloudy" && (
          <motion.div
            key="clouds"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {CLOUD_LAYERS.map((layer, i) => (
              <PuffyCloud key={i} config={layer} themeIsDark={themeIsDark} />
            ))}
          </motion.div>
        )}

        {(condition === "rain" || condition === "storm") && (
          <motion.div
            key="rain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {Array.from({ length: RAIN_COUNT }).map((_, i) => (
              <RainDrop
                key={i}
                isStorm={condition === "storm"}
                themeIsDark={themeIsDark}
              />
            ))}
            {condition === "storm" && <LightningFlash />}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${themeIsDark ? "from-slate-800/30" : "from-blue-200/20"} to-transparent pointer-events-none`}
            />
          </motion.div>
        )}

        {condition === "snow" && (
          <motion.div
            key="snow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {Array.from({ length: SNOW_COUNT }).map((_, i) => (
              <SnowFlake key={i} themeIsDark={themeIsDark} />
            ))}
            <div
              className={`absolute inset-0 ${themeIsDark ? "bg-white/5" : "bg-slate-200/20"} mix-blend-overlay`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HeroSun = ({ themeIsDark }: { themeIsDark: boolean }) => {
  return (
    <motion.div
      className={`absolute top-[-50px] right-[-50px] w-64 h-64 md:w-96 md:h-96 z-10`}
      initial={{ scale: 0.8, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 2, ease: "backOut" }}
    >
      <motion.svg
        viewBox="0 0 200 200"
        className={`w-full h-full ${themeIsDark ? "text-amber-300" : "text-orange-400"} drop-shadow-2xl`}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="100"
          cy="100"
          r="40"
          fill="currentColor"
          className="opacity-90"
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((degree, i) => (
          <rect
            key={i}
            x="90"
            y="0"
            width="20"
            height="35"
            rx="10"
            fill="currentColor"
            transform={`rotate(${degree} 100 100)`}
            className="opacity-80"
          />
        ))}
      </motion.svg>
    </motion.div>
  );
};

const LensFlare = ({
  index,
  themeIsDark,
}: {
  index: number;
  themeIsDark: boolean;
}) => {
  const size = useMemo(() => random(20, 100), []);
  const startX = useMemo(() => random(0, 100), []);
  const startY = useMemo(() => random(0, 100), []);
  const color = themeIsDark ? "bg-amber-100" : "bg-yellow-300";

  return (
    <motion.div
      className={`absolute rounded-full mix-blend-screen ${color} opacity-20`}
      style={{
        width: size,
        height: size,
        top: `${startY}%`,
        left: `${startX}%`,
      }}
      animate={{
        x: [0, random(-50, 50)],
        y: [0, random(-50, 50)],
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: random(10, 20),
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 2,
      }}
    />
  );
};

const HeroMoon = ({ themeIsDark }: { themeIsDark: boolean }) => {
  return (
    <motion.div
      className="absolute top-10 right-10 z-10"
      initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ duration: 1.5, type: "spring" }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        <path
          d="M70 10 A 40 40 0 1 0 70 90 A 30 30 0 1 1 70 10"
          className={themeIsDark ? "fill-yellow-100" : "fill-slate-600"}
        />
      </svg>
    </motion.div>
  );
};

const TwinkleStar = ({ themeIsDark }: { themeIsDark: boolean }) => {
  const x = useMemo(() => random(5, 95), []);
  const y = useMemo(() => random(5, 60), []);
  const size = useMemo(() => random(10, 25), []); // Much larger for "polish"
  const duration = useMemo(() => random(3, 6), []);

  return (
    <motion.div
      className={`absolute ${themeIsDark ? "text-yellow-50" : "text-slate-800"}`}
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{
        scale: [1, 0.5, 1],
        opacity: [0.8, 0.4, 0.8],
        rotate: [0, 45, 0],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* 4-Point Star SVG */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-full h-full drop-shadow-sm"
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
    </motion.div>
  );
};

const PuffyCloud = ({
  config,
  themeIsDark,
}: {
  config: (typeof CLOUD_LAYERS)[0];
  themeIsDark: boolean;
}) => {
  const color = themeIsDark ? "text-slate-200" : "text-slate-500";
  const opacity = themeIsDark ? "opacity-[0.08]" : "opacity-20";

  const baseWidthVw = 20;
  const widthVw = baseWidthVw * config.scale;

  return (
    <motion.div
      className={`absolute ${color} ${opacity} top-[var(--mobile-top)] md:top-[var(--desktop-top)]`}
      style={
        {
          "--mobile-top": `${config.mobileTop}%`,
          "--desktop-top": `${config.top}%`,
          width: `${widthVw}vw`,
          height: `${widthVw * 0.6}vw`,
          zIndex: config.zIndex,
        } as any
      }
      initial={{ left: "-40%" }}
      animate={{
        left: "110%",
        y: [0, -10, 0],
      }}
      transition={{
        left: {
          duration: config.duration,
          repeat: Infinity,
          ease: "linear",
          delay: config.delay,
        },
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.abs(config.delay),
        },
      }}
    >
      <svg
        viewBox="0 0 100 60"
        fill="currentColor"
        className="w-full h-full drop-shadow-sm"
      >
        <path d="M10,45 Q10,25 30,25 Q30,10 50,10 Q70,10 70,25 Q90,25 90,45 L10,45 Z" />
        <circle cx="30" cy="45" r="20" fill="currentColor" />
        <circle cx="50" cy="35" r="25" fill="currentColor" />
        <circle cx="70" cy="45" r="20" fill="currentColor" />
      </svg>
    </motion.div>
  );
};

const ShootingStar = ({
  themeIsDark,
  index,
}: {
  themeIsDark: boolean;
  index: number;
}) => {
  const top = useMemo(() => random(0, 30), []);
  const left = useMemo(() => random(0, 80), []);
  const delay = useMemo(() => random(2, 10) + index * 5, []);

  return (
    <motion.div
      className={`absolute h-[3px] w-[80px] rounded-full rotate-[15deg] origin-left ${themeIsDark ? "bg-gradient-to-r from-transparent via-white to-transparent" : "bg-gradient-to-r from-transparent via-slate-800 to-transparent"}`}
      style={{ top: `${top}%`, left: `${left}%` }}
      initial={{ scaleX: 0, opacity: 0, x: 0, y: 0 }}
      animate={{
        scaleX: [0, 1, 0],
        opacity: [0, 1, 0],
        x: [0, 250],
        y: [0, 60],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        repeatDelay: delay,
        ease: "easeInOut",
      }}
    />
  );
};

const RainDrop = ({
  isStorm,
  themeIsDark,
}: {
  isStorm: boolean;
  themeIsDark: boolean;
}) => {
  const x = useMemo(() => random(0, 100), []);
  const delay = useMemo(() => random(0, 1), []);
  const duration = useMemo(() => random(0.6, 1), []);

  const colorClass = themeIsDark
    ? isStorm
      ? "bg-slate-300/70"
      : "bg-blue-300/60"
    : isStorm
      ? "bg-slate-600/70"
      : "bg-blue-600/60";

  return (
    <motion.div
      className={`absolute w-1 rounded-full ${colorClass}`}
      style={{
        left: `${x}%`,
        height: isStorm ? 45 : 25,
      }}
      initial={{ top: -50, opacity: 0 }}
      animate={{
        top: ["0%", "100%"],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: isStorm ? duration * 0.7 : duration,
        repeat: Infinity,
        ease: "linear",
        delay: delay,
      }}
    />
  );
};

const LightningFlash = () => {
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    const triggerFlash = () => {
      setFlashing(true);
      setTimeout(() => setFlashing(false), 150);
      setTimeout(triggerFlash, random(3000, 10000));
    };

    const timer = setTimeout(triggerFlash, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-white mix-blend-hard-light pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: flashing ? 0.3 : 0 }}
      transition={{ duration: 0.1 }}
    />
  );
};

const SnowFlake = ({ themeIsDark }: { themeIsDark: boolean }) => {
  const x = useMemo(() => random(0, 100), []);
  const size = useMemo(() => random(6, 12), []);
  const duration = useMemo(() => random(6, 12), []);

  const colorClass = themeIsDark
    ? "bg-white/90 shadow-[0_0_2px_rgba(255,255,255,0.4)]"
    : "bg-slate-300/90 shadow-[0_0_1px_rgba(0,0,0,0.1)]";

  return (
    <motion.div
      className={`absolute rounded-full ${colorClass}`}
      style={{ width: size, height: size, left: `${x}%` }}
      initial={{ top: -20 }}
      animate={{
        top: "100%",
        x: [0, random(-50, 50)],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: random(0, 5),
      }}
    />
  );
};
