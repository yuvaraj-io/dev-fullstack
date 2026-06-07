"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ParticlesProps = {
  count?: number;
  /** Bounding cube half-size the points are scattered within. */
  spread?: number;
  color?: string;
};

/**
 * Lightweight drifting point-cloud. Tuned for a LIGHT background:
 * small, semi-transparent violet points with additive-free blending
 * so they read as soft dust rather than glowing on white.
 *
 * Must be rendered inside an R3F <Canvas>.
 */
export default function Particles({
  count = 120,
  spread = 6,
  color = "#8b5cf6",
}: ParticlesProps) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    // Deterministic scatter (pure render) — keeps the point cloud
    // stable across renders and SSR-safe.
    const rand = (s: number) => {
      const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand(i * 3 + 1) - 0.5) * spread * 2;
      arr[i * 3 + 1] = (rand(i * 3 + 2) - 0.5) * spread * 2;
      arr[i * 3 + 2] = (rand(i * 3 + 3) - 0.5) * spread;
    }
    return arr;
  }, [count, spread]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += delta * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}
