"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import {
  FaReact,
  FaAngular,
  FaVuejs,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaSass,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiRedux,
  SiExpress,
  SiTailwindcss,
  SiFigma,
} from "react-icons/si";
import type { IconType } from "react-icons";

/* ── Tech roster shown as badges ───────────────────────────── */
const TECH: { Icon: IconType; color: string; label: string }[] = [
  { Icon: FaReact, color: "#38bdf8", label: "React" },
  { Icon: FaAngular, color: "#dd0031", label: "Angular" },
  { Icon: FaVuejs, color: "#42b883", label: "Vue" },
  { Icon: FaNodeJs, color: "#539e43", label: "Node" },
  { Icon: SiTypescript, color: "#3178c6", label: "TypeScript" },
  { Icon: SiJavascript, color: "#f7df1e", label: "JavaScript" },
  { Icon: SiMongodb, color: "#47a248", label: "MongoDB" },
  { Icon: SiPostgresql, color: "#336791", label: "Postgres" },
  { Icon: SiRedux, color: "#764abc", label: "Redux" },
  { Icon: SiExpress, color: "#64748b", label: "Express" },
  { Icon: SiTailwindcss, color: "#06b6d4", label: "Tailwind" },
  { Icon: FaHtml5, color: "#e34f26", label: "HTML5" },
  { Icon: FaCss3Alt, color: "#1572b6", label: "CSS3" },
  { Icon: FaSass, color: "#cc6699", label: "Sass" },
  { Icon: FaGitAlt, color: "#f05032", label: "Git" },
  { Icon: SiFigma, color: "#f24e1e", label: "Figma" },
];

/** Even point distribution on a sphere via the Fibonacci spiral. */
function fibonacciSphere(samples: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push(
      new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius)
    );
  }
  return points;
}

function Globe({ velocityRef }: { velocityRef: RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const sphere = useRef<THREE.Mesh>(null);
  const positions = useMemo(() => fibonacciSphere(TECH.length, 2.2), []);

  useFrame((_, delta) => {
    if (!group.current) return;
    // Base idle rotation + scroll velocity contribution (capped).
    const v = THREE.MathUtils.clamp(velocityRef.current ?? 0, -40, 40);
    group.current.rotation.y += delta * (0.12 + Math.abs(v) * 0.012) * Math.sign(v || 1);
    group.current.rotation.x = Math.sin(group.current.rotation.y * 0.25) * 0.15;
  });

  return (
    <group ref={group}>
      {/* faint wireframe core for depth context */}
      <mesh ref={sphere}>
        <icosahedronGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="#c4b5fd" wireframe transparent opacity={0.18} />
      </mesh>
      {/* solid inner sphere used purely as the occluder for badges */}
      <mesh>
        <sphereGeometry args={[2.0, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite />
      </mesh>

      {positions.map((p, i) => {
        const { Icon, color, label } = TECH[i];
        return (
          <Html
            key={label}
            position={p}
            center
            sprite
            transform
            distanceFactor={9}
            occlude={[sphere as RefObject<THREE.Object3D>]}
          >
            <div
              className="flex select-none items-center gap-1.5 whitespace-nowrap rounded-full border border-white/70 bg-white/80 px-2.5 py-1 shadow-md backdrop-blur"
              style={{ boxShadow: `0 4px 16px ${color}33` }}
            >
              <Icon size={16} color={color} />
              <span className="text-[11px] font-semibold text-slate-700">{label}</span>
            </div>
          </Html>
        );
      })}
    </group>
  );
}

/**
 * Self-contained skills globe. Lazy-load with `ssr:false`. The parent
 * passes a live scroll-velocity ref (from SmoothScrollProvider) so
 * scrolling speeds up / reverses the spin.
 */
export default function TechGlobeCanvas({
  velocityRef,
  className,
}: {
  velocityRef: RefObject<number>;
  className?: string;
}) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <Globe velocityRef={velocityRef} />
    </Canvas>
  );
}
