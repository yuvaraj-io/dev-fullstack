"use client";

import dynamic from "next/dynamic";
import Heading from "@/components/ui-reusables/Heading";
import Reveal from "@/components/motion/Reveal";
import { useReducedMotionPref } from "@/hooks/useReducedMotionPref";
import { useScrollVelocity } from "@/components/providers/SmoothScrollProvider";
import { skills } from "@/constants/commons/constants";

const TechGlobeCanvas = dynamic(
  () => import("@/components/three/TechGlobeCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto h-full w-full max-w-md rounded-full bg-gradient-to-br from-violet-200/40 to-cyan-200/40 blur-2xl" />
    ),
  }
);

/* Flatten the existing skills map into a simple badge list for the
   reduced-motion fallback so we never depend on the 3D scene. */
const ALL_SKILLS = Object.values(skills).flatMap((g) => g.skills);

export default function SkillsSphere() {
  const reduced = useReducedMotionPref();
  const velocityRef = useScrollVelocity();

  return (
    <section className="-mx-6 bg-slate-50/70 px-6 py-16">
      <Heading icon="-" text="Skills" line={false} variant="gradient" />
      <p className="-mt-4 mb-2 max-w-md text-sm text-slate-500">
        A rotating constellation of the tools I build with — scroll to spin it
        faster.
      </p>

      {reduced ? (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {ALL_SKILLS.map((s) => (
            <span
              key={s}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm"
            >
              {s}
            </span>
          ))}
        </div>
      ) : (
        <Reveal depth={false}>
          <div className="relative mx-auto h-[460px] w-full max-w-2xl">
            <TechGlobeCanvas velocityRef={velocityRef} className="!h-full !w-full" />
          </div>
        </Reveal>
      )}
    </section>
  );
}
