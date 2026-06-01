import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "../hooks/useScrollProgress";

function createCircleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
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

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

// ── ripple state ──
interface Ripple {
  x: number;        // world-space x
  y: number;        // world-space y
  z: number;        // world-space z
  age: number;      // seconds since spawned
  strength: number; // intensity (1.0 = full)
}

export default function ParticleSphere() {
  const outerRef = useRef<THREE.Points>(null);
  const innerRef = useRef<THREE.Points>(null);
  const outerMatRef = useRef<THREE.PointsMaterial>(null);
  const innerMatRef = useRef<THREE.PointsMaterial>(null);
  const mouseRef = useRef({ x: 0, y: 0, smX: 0, smY: 0 });
  const ripplesRef = useRef<Ripple[]>([]);

  const { camera, size } = useThree();
  const circleTexture = useMemo(() => createCircleTexture(), []);

  // ── generate particle positions and KEEP the originals ──
  const outer = useMemo(() => {
    const count = 2800;
    const positions = new Float32Array(count * 3);   // current rendered positions
    const originals = new Float32Array(count * 3);   // home positions
    const colors    = new Float32Array(count * 3);

    const c1 = new THREE.Color("#a78bfa");
    const c2 = new THREE.Color("#5eead4");
    const c3 = new THREE.Color("#fda4af");
    const palette = [c1, c1, c1, c2, c3];

    for (let i = 0; i < count; i++) {
      const r = 18 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) - 10;

      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originals[i * 3]     = x;
      originals[i * 3 + 1] = y;
      originals[i * 3 + 2] = z;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { count, positions, originals, colors };
  }, []);

  const inner = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const originals = new Float32Array(count * 3);
    const c1 = new THREE.Color("#a78bfa");

    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originals[i * 3]     = x;
      originals[i * 3 + 1] = y;
      originals[i * 3 + 2] = z;
    }

    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      colors[i * 3]     = c1.r;
      colors[i * 3 + 1] = c1.g;
      colors[i * 3 + 2] = c1.b;
    }
    return { count, positions, originals, colors };
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

  // ── click/tap → spawn a ripple ──
  useEffect(() => {
    const spawnRipple = (clientX: number, clientY: number) => {
      // convert screen coords → world coords at z=0 plane
      const ndcX = (clientX / size.width) * 2 - 1;
      const ndcY = -(clientY / size.height) * 2 + 1;
      // approximate world position by raycasting to z=0 plane
      const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const worldPos = camera.position.clone().add(dir.multiplyScalar(distance));

      ripplesRef.current.push({
        x: worldPos.x,
        y: worldPos.y,
        z: worldPos.z,
        age: 0,
        strength: 1.0,
      });

      // cap simultaneous ripples to avoid runaway
      if (ripplesRef.current.length > 6) {
        ripplesRef.current.shift();
      }
    };

    const onClick = (e: MouseEvent) => {
      // ignore clicks on interactive elements (nav, buttons, links)
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [data-no-ripple]')) return;
      spawnRipple(e.clientX, e.clientY);
    };
    const onTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [data-no-ripple]')) return;
      const t = e.touches[0];
      if (t) spawnRipple(t.clientX, t.clientY);
    };

    window.addEventListener("click", onClick);
    window.addEventListener("touchstart", onTouch);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onTouch);
    };
  }, [camera, size]);

  useFrame((_, delta) => {
    const m = mouseRef.current;
    m.smX += (m.x - m.smX) * 0.04;
    m.smY += (m.y - m.smY) * 0.04;

    const { progress } = useScrollProgress.getState();
    const heroToAbout = clamp(progress / 0.15, 0, 1);

    const outerScale   = lerp(1.0, 1.6, heroToAbout);
    const outerOpacity = lerp(0.85, 0.35, heroToAbout);
    const innerScale   = lerp(1.0, 0.7, heroToAbout);
    const innerOpacity = lerp(0.6, 0.15, heroToAbout);
    const rotSpeed     = lerp(1.0, 1.6, heroToAbout);

    // ── age and clean up ripples ──
    const ripples = ripplesRef.current;
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].age += delta;
      // ripple lifespan: 1.5s
      if (ripples[i].age > 1.5) {
        ripples.splice(i, 1);
      }
    }

    // ── update outer particles ──
    if (outerRef.current) {
      const posAttr = outerRef.current.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;
      const orig = outer.originals;

      for (let i = 0; i < outer.count; i++) {
        const idx = i * 3;
        const ox = orig[idx];
        const oy = orig[idx + 1];
        const oz = orig[idx + 2];

        let offsetX = 0, offsetY = 0, offsetZ = 0;

        // ── compute ripple displacement ──
        for (let r = 0; r < ripples.length; r++) {
          const rip = ripples[r];
          // ripple radius grows over time (5 units/sec)
          const rippleRadius = rip.age * 25;
          // ripple wave thickness
          const waveThickness = 6;

          const dx = ox - rip.x;
          const dy = oy - rip.y;
          const dz = oz - rip.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // how close is this particle to the wave's current radius?
          const distFromWave = Math.abs(dist - rippleRadius);
          if (distFromWave < waveThickness) {
            // bell curve — strongest at wave center, fading outward
            const bell = 1 - distFromWave / waveThickness;
            // fade out over the ripple's lifetime
            const lifeFade = 1 - (rip.age / 1.5);
            // push particle outward from ripple center
            const push = bell * lifeFade * rip.strength * 2.5;
            if (dist > 0.01) {
              offsetX += (dx / dist) * push;
              offsetY += (dy / dist) * push;
              offsetZ += (dz / dist) * push;
            }
          }
        }

        // ── lerp current toward (original + ripple offset) ──
        const targetX = ox + offsetX;
        const targetY = oy + offsetY;
        const targetZ = oz + offsetZ;

        arr[idx]     += (targetX - arr[idx])     * 0.15;
        arr[idx + 1] += (targetY - arr[idx + 1]) * 0.15;
        arr[idx + 2] += (targetZ - arr[idx + 2]) * 0.15;
      }
      posAttr.needsUpdate = true;

      outerRef.current.rotation.y += delta * 0.025 * rotSpeed;
      outerRef.current.rotation.x += delta * 0.008 * rotSpeed;
      outerRef.current.position.x = m.smX * 0.5;
      outerRef.current.position.y = m.smY * 0.4;
      outerRef.current.scale.setScalar(outerScale);
    }

    // ── update inner particles (same ripple logic, smaller scale) ──
    if (innerRef.current) {
      const posAttr = innerRef.current.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;
      const orig = inner.originals;

      for (let i = 0; i < inner.count; i++) {
        const idx = i * 3;
        const ox = orig[idx];
        const oy = orig[idx + 1];
        const oz = orig[idx + 2];

        let offsetX = 0, offsetY = 0, offsetZ = 0;

        for (let r = 0; r < ripples.length; r++) {
          const rip = ripples[r];
          const rippleRadius = rip.age * 25;
          const waveThickness = 6;
          const dx = ox - rip.x;
          const dy = oy - rip.y;
          const dz = oz - rip.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const distFromWave = Math.abs(dist - rippleRadius);
          if (distFromWave < waveThickness) {
            const bell = 1 - distFromWave / waveThickness;
            const lifeFade = 1 - (rip.age / 1.5);
            const push = bell * lifeFade * rip.strength * 1.5;
            if (dist > 0.01) {
              offsetX += (dx / dist) * push;
              offsetY += (dy / dist) * push;
              offsetZ += (dz / dist) * push;
            }
          }
        }

        const targetX = ox + offsetX;
        const targetY = oy + offsetY;
        const targetZ = oz + offsetZ;

        arr[idx]     += (targetX - arr[idx])     * 0.15;
        arr[idx + 1] += (targetY - arr[idx + 1]) * 0.15;
        arr[idx + 2] += (targetZ - arr[idx + 2]) * 0.15;
      }
      posAttr.needsUpdate = true;

      innerRef.current.rotation.y -= delta * 0.04 * rotSpeed;
      innerRef.current.rotation.x += delta * 0.015 * rotSpeed;
      innerRef.current.position.x = m.smX * 0.8;
      innerRef.current.position.y = m.smY * 0.6;
      innerRef.current.scale.setScalar(innerScale);
    }

    if (outerMatRef.current) outerMatRef.current.opacity = outerOpacity;
    if (innerMatRef.current) innerMatRef.current.opacity = innerOpacity;
  });

  return (
    <>
      <points ref={outerRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[outer.positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[outer.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={outerMatRef}
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

      <points ref={innerRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[inner.positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[inner.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={innerMatRef}
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