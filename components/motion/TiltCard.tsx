"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Default 10. */
  max?: number;
  /** Forward-lift translateZ in px on hover. Default 40. */
  lift?: number;
  /** Show the moving glare highlight. Default true. */
  glare?: boolean;
};

/**
 * Pointer-reactive 3D tilt card. Rotates toward the cursor, lifts
 * forward on hover, and casts a depth-aware shadow + light glare.
 * Uses springs for buttery settle and reads pointer position via
 * motion values (no React re-renders). Static when reduced-motion.
 */
export default function TiltCard({
  children,
  className = "",
  max = 10,
  lift = 40,
  glare = true,
}: TiltCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Normalised pointer offset from card centre, [-0.5, 0.5].
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 220, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);
  const z = useSpring(useMotionValue(0), spring);

  // Glare follows the pointer across the surface. Computed
  // unconditionally (rules-of-hooks) even when glare is disabled.
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(180px circle at ${gx} ${gy}, rgba(255,255,255,0.55), transparent 70%)`
  );

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function handleEnter() {
    if (!reduced) z.set(lift);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
    z.set(0);
  }

  if (reduced) {
    return (
      <div className={className}>
        <div className="h-full transition-transform duration-300 hover:-translate-y-1">
          {children}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      style={{ perspective: 1000 }}
      className={className}
    >
      <motion.div
        style={{ rotateX, rotateY, translateZ: z, transformStyle: "preserve-3d" }}
        className="relative h-full rounded-2xl will-change-transform"
      >
        {children}

        {glare && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 rounded-2xl mix-blend-soft-light"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
