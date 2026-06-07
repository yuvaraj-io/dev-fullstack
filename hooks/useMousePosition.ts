"use client";

import { useEffect, useRef, useState } from "react";

type Vec2 = { x: number; y: number };

/**
 * Normalised pointer position in the range [-1, 1] on both axes,
 * with (0,0) at the centre of the viewport. Used to drive subtle
 * parallax. Listener is passive and attaches only on devices that
 * actually have a fine pointer, so touch devices stay at rest.
 *
 * Pass `enabled = false` (e.g. when reduced-motion is on) to freeze
 * the value at the origin and skip the listener entirely.
 */
export function useMousePosition(enabled = true): Vec2 {
  const [pos, setPos] = useState<Vec2>({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        setPos({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  return pos;
}
