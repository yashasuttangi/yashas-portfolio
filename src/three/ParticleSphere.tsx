import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── generate a soft circular sprite for particles ──
function createCircleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // radial gradient — bright center, fading edges
  const grad = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  grad.addColorStop(0,   "rgba(255, 255, 255, 1)");
  grad.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
  grad.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
  grad.addColorStop(1,   "rgba(255, 255, 255, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function ParticleSphere() {
  const outerRef = useRef<THREE.Points>(null);
  const innerRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0, smX: 0, smY: 0 });

  // ⭐ generate the circular sprite once
  const circleTexture = useMemo(() => createCircleTexture(), []);

  // ── OUTER sphere — the wide distant field ──
  const outer = useMemo(() => {
    const count = 2800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const c1 = new THREE.Color("#a78bfa"); // violet
    const c2 = new THREE.Color("#5eead4"); // teal
    const c3 = new THREE.Color("#fda4af"); // coral
    const palette = [c1, c1, c1, c2, c3]; // violet-dominant

    for (let i = 0; i < count; i++) {
      const r = 18 + Math.random() * 12; // ⭐ BIG radius — 18 to 30
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 10; // ⭐ pushed back

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    return { positions, colors };
  }, []);

  // ── INNER sphere — denser violet cluster, closer in ──
  const inner = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const c1 = new THREE.Color("#a78bfa");

    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 10; // smaller — 6 to 16
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      colors[i * 3]     = c1.r;
      colors[i * 3 + 1] = c1.g;
      colors[i * 3 + 2] = c1.b;
    }

    return { positions, colors };
  }, []);

  // ── mouse tracking ──
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 3;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── animation loop ──
  useFrame((_, delta) => {
    const m = mouseRef.current;
    // smooth mouse follow
    m.smX += (m.x - m.smX) * 0.04;
    m.smY += (m.y - m.smY) * 0.04;

    if (outerRef.current) {
      // continuous slow rotation
      outerRef.current.rotation.y += delta * 0.025;
      outerRef.current.rotation.x += delta * 0.008;
      // mouse-driven position offset (parallax)
      outerRef.current.position.x = m.smX * 0.5;
      outerRef.current.position.y = m.smY * 0.4;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.04;
      innerRef.current.rotation.x += delta * 0.015;
      // inner cluster moves more — creates parallax depth
      innerRef.current.position.x = m.smX * 0.8;
      innerRef.current.position.y = m.smY * 0.6;
    }
  });

  return (
    <>
      {/* OUTER — wide, distant, multi-color */}
      <points ref={outerRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[outer.positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[outer.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          map={circleTexture}
          alphaTest={0.001}
        />
      </points>

      {/* INNER — denser violet cluster */}
      <points ref={innerRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[inner.positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[inner.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          map={circleTexture}
          alphaTest={0.001}
        />
      </points>
    </>
  );
}