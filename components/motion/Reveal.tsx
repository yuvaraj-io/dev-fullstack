"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  /** Slide-in direction. Default "up". */
  from?: Direction;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Add a subtle 3D rotation for depth. Default true. */
  depth?: boolean;
  className?: string;
  /** Re-animate every time it enters the viewport. Default false (once). */
  repeat?: boolean;
};

const OFFSET: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: 48 },
  right: { x: -48 },
};

/**
 * Scroll-reveal wrapper with depth. Elements enter with a slight
 * translate + perspective rotation so sections feel layered rather
 * than flat. Collapses to a plain fade (no transform) when the user
 * prefers reduced motion.
 */
export default function Reveal({
  children,
  from = "up",
  delay = 0,
  depth = true,
  className,
  repeat = false,
}: RevealProps) {
  const reduced = useReducedMotion();
  const off = OFFSET[from];

  const variants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.4, delay } },
      }
    : {
        hidden: {
          opacity: 0,
          x: off.x ?? 0,
          y: off.y ?? 0,
          rotateX: depth ? 8 : 0,
          filter: "blur(6px)",
        },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.8,
            delay,
            ease: [0.16, 1, 0.3, 1], // expo-out, Apple-ish
          },
        },
      };

  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 1000 }}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, amount: 0.25, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}
