import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Theme } from "../../types";

interface BootSplashProps {
  onComplete: () => void;
  theme: Theme;
}

export const BootSplash = ({ onComplete, theme }: BootSplashProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // We set timers without dependencies to ensure they run only ONCE
    // during the initial application load. This prevents the animation
    // from rerunning when the theme or props change later.

    const t1 = setTimeout(() => setStep(1), 100);
    const t2 = setTimeout(() => setStep(2), 800);
    const t3 = setTimeout(() => setStep(3), 2400);
    const t4 = setTimeout(onComplete, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []); // Empty dependency array ensures run-once behavior

  const letters = ["l", "4", "i", "g", "i"];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center cursor-wait overflow-hidden select-none"
      style={{ backgroundColor: theme.colors.primary }}
    >
      <AnimatePresence mode="wait">
        {step < 3 && (
          <motion.div
            key="splash-content"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.1,
              filter: "blur(10px)",
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
            className="flex flex-col items-center relative"
          >
            {/* --- LOGO ANIMATION --- */}
            <div className="relative mb-10 flex items-center justify-center">
              {/* Background Burst Glow */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={step >= 1 ? { scale: 2, opacity: [0, 0.15, 0] } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ backgroundColor: theme.colors.accent }}
              />

              <div className="flex items-baseline gap-0.5 sm:gap-1">
                {letters.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: -100, opacity: 0, scale: 0.5 }}
                    animate={step >= 1 ? { y: 0, opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: 0.1 + i * 0.08,
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                      mass: 1.2,
                    }}
                    className="text-6xl sm:text-8xl font-black tracking-tighter"
                    // Highlight the '4' with the theme accent color
                    style={{
                      color: i === 1 ? theme.colors.accent : theme.colors.text,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Decorative Sparkle - Pops up after text lands */}
              <motion.div
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={step >= 1 ? { scale: 1, rotate: 12, opacity: 1 } : {}}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute -right-8 -top-2 sm:-right-10 sm:-top-4"
                style={{ color: theme.colors.accent }}
              >
                <Sparkles size={32} fill="currentColor" />
              </motion.div>
            </div>

            {/* --- LOADING BAR --- */}
            <div className="flex flex-col items-center gap-3">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={step >= 2 ? { width: 180, opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
                className="h-1.5 rounded-full overflow-hidden bg-black/5 dark:bg-white/10 relative"
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={step >= 2 ? { width: "100%" } : {}}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={step >= 2 ? { opacity: 0.4 } : {}}
                transition={{ delay: 0.2 }}
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: theme.colors.text }}
              >
                Initializing...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
