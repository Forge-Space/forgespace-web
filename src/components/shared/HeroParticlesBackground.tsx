"use client";

import { Component, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { forgeTokens } from "@/styles/design-tokens";

const PARTICLE_COUNT = 800;
const REDUCED_PARTICLE_COUNT = 50;

function Particles({ count, animate }: { count: number; animate: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = (i: number) => {
      const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seed(i * 7) - 0.5) * 20;
      pos[i * 3 + 1] = (seed(i * 13) - 0.5) * 20;
      pos[i * 3 + 2] = (seed(i * 19) - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!animate || !meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position
      .array as Float32Array;
    const time = state.clock.elapsedTime * 0.1;
    for (let i = 0; i < count; i++) {
      positions[i * 3] += Math.sin(time + i * 0.1) * 0.002;
      positions[i * 3 + 1] += Math.cos(time * 0.7 + i * 0.05) * 0.002;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={forgeTokens.primary}
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Scene({ count, animate }: { count: number; animate: boolean }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Particles count={count} animate={animate} />
    </>
  );
}

function HeroParticlesFallback() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
      data-testid="hero-particles-fallback"
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{ background: "var(--forge-gradient-hero)" }}
      />
      <div className="absolute left-[-10%] top-[15%] h-72 w-72 rounded-full bg-forge-primary/20 blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-5%] h-80 w-80 rounded-full bg-forge-primary/10 blur-[140px]" />
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20px_20px,var(--forge-border)_1px,transparent_1px)] [background-size:40px_40px]" />
    </div>
  );
}

function supportsWebGL() {
  const canvas = document.createElement("canvas");
  return Boolean(
    canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl") ||
      canvas.getContext("webgl2"),
  );
}

class HeroParticlesErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export function HeroParticlesBackground() {
  const [reduced, setReduced] = useState(true);
  const [ready, setReady] = useState(false);
  const [canRenderCanvas, setCanRenderCanvas] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(mediaQuery.matches);
      setCanRenderCanvas(!mediaQuery.matches && supportsWebGL());
      setReady(true);
    };

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  const count = reduced ? REDUCED_PARTICLE_COUNT : PARTICLE_COUNT;
  const animate = !reduced;
  const fallback = <HeroParticlesFallback />;

  if (!ready || !canRenderCanvas) {
    return fallback;
  }

  return (
    <HeroParticlesErrorBoundary fallback={fallback}>
      {fallback}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{ opacity: 0.6 }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: false }}
          data-testid="hero-particles-canvas"
        >
          <Scene count={count} animate={animate} />
        </Canvas>
      </div>
    </HeroParticlesErrorBoundary>
  );
}
