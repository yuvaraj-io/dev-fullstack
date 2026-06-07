"use client";

import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import HeroImmersive from "./HeroImmersive";
import PortfolioTilt from "./PortfolioTilt";
import SkillsSphere from "./SkillsSphere";
import AboutHorizontal from "./AboutHorizontal";
import ContactGlass from "./ContactGlass";

/**
 * Client orchestrator for the immersive home experience. Wraps every
 * section in the smooth-scroll provider (Lenis + GSAP ScrollTrigger)
 * and composes the depth-driven sections in order. Each 3D layer is
 * lazy-loaded and reduced-motion aware inside its own section.
 */
export default function ImmersiveHome() {
  return (
    <SmoothScrollProvider>
      <HeroImmersive />
      <div className="py-4">
        <PortfolioTilt />
      </div>
      <SkillsSphere />
      <AboutHorizontal />
      <ContactGlass />
    </SmoothScrollProvider>
  );
}
