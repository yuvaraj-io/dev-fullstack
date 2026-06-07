"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import Particles from "./Particles";

/* ── The floating, gently morphing sphere ──────────────────── */
function Blob() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    // slow idle spin
    mesh.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
      <mesh ref={mesh} scale={1.6}>
        <icosahedronGeometry args={[1, 16]} />
        {/* Light-theme friendly: pearly violet with low roughness so the
            coloured rim lights read as a purple→blue→cyan gradient sheen. */}
        <MeshDistortMaterial
          color="#a78bfa"
          roughness={0.15}
          metalness={0.35}
          distort={0.35}
          speed={1.6}
          transparent
          opacity={0.92}
        />
      </mesh>
    </Float>
  );
}

/* ── Camera parallax driven by the R3F pointer ─────────────── */
function ParallaxRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    // Mutating the camera each frame is the idiomatic R3F pattern; this
    // runs in the render loop, not React render. (immutability rule
    // can't distinguish the two, so it's suppressed here.)
    /* eslint-disable react-hooks/immutability */
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    /* eslint-enable react-hooks/immutability */
  });
  return null;
}

type HeroCanvasProps = { className?: string };

/**
 * Self-contained hero scene (sphere + particles + pointer parallax).
 * Designed to be lazy-loaded with `next/dynamic({ ssr: false })`.
 * DPR is capped at 1.5 and the loop runs on-demand to protect 60fps
 * on weaker GPUs.
 */
export default function HeroCanvas({ className }: HeroCanvasProps) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      {/* Coloured rim lights paint the purple→blue→cyan gradient */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -2, 2]} intensity={2.4} color="#22d3ee" />
      <pointLight position={[4, 2, -2]} intensity={2.2} color="#7c3aed" />

      <Blob />
      <Particles count={90} spread={5} />
      <ParallaxRig />
    </Canvas>
  );
}
