"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe `prefers-reduced-motion` hook.
 *
 * Returns `true` when the user has asked the OS to minimise motion.
 * Defaults to `true` during SSR / first paint so we never flash heavy
 * animation before we know the user's preference — the immersive layers
 * fade in only once we've confirmed motion is allowed.
 */
export function useReducedMotionPref(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
