"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotionPref } from "@/hooks/useReducedMotionPref";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Live scroll velocity (px/frame-ish, as reported by Lenis). Consumers
 * — notably the 3D tech globe — read `.current` inside their own rAF
 * loop so they never trigger React re-renders. Defaults to a detached
 * ref so the context is always safe to call.
 */
const ScrollVelocityContext = createContext<RefObject<number>>({ current: 0 });

export function useScrollVelocity(): RefObject<number> {
  return useContext(ScrollVelocityContext);
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const velocity = useRef(0);
  const reduced = useReducedMotionPref();

  useEffect(() => {
    // Respect reduced-motion: skip Lenis entirely and let the browser
    // use its native (instant/Os-controlled) scroll. ScrollTrigger still
    // works against the native scroll position.
    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    const onScroll = (e: { velocity: number }) => {
      velocity.current = e.velocity;
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    // Drive Lenis from GSAP's ticker so both share one rAF loop (no
    // competing animation frames → smoother, cheaper).
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return (
    <ScrollVelocityContext.Provider value={velocity}>
      {children}
    </ScrollVelocityContext.Provider>
  );
}
