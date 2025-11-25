export const GBCFilter = ({ active }: { active: boolean }) => {
  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[900] overflow-hidden h-full w-full">
      {/* LCD Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.3) 2px,
              rgba(0, 0, 0, 0.3) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.3) 2px,
              rgba(0, 0, 0, 0.3) 4px
            )
          `,
        }}
      />

      {/* Color Matrix Filter - mimics GBC's limited color palette */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-20"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              rgba(155, 188, 15, 0.2) 0%,
              rgba(139, 172, 15, 0.3) 50%,
              rgba(48, 98, 48, 0.4) 100%
            )
          `,
        }}
      />

      {/* Screen Reflection */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: `
            linear-gradient(
              115deg,
              transparent 30%,
              rgba(255, 255, 255, 0.8) 45%,
              rgba(255, 255, 255, 0.9) 50%,
              rgba(255, 255, 255, 0.8) 55%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Subtle screen curvature vignette */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              transparent 50%,
              rgba(0, 0, 0, 0.3) 100%
            )
          `,
        }}
      />

      {/* Pixelation effect */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            repeating-conic-gradient(
              rgba(0, 0, 0, 0.4) 0% 25%,
              transparent 0% 50%
            ) 50% / 3px 3px
          `,
        }}
      />
    </div>
  );
};
