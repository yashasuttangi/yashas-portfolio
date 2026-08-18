import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "../hooks/useScrollProgress";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (t: number) => t * t * (3 - 2 * t);
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const PARTICLE_COUNT = 600;

function createCircleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0,   "rgba(255, 255, 255, 1)");
  grad.addColorStop(0.3, "rgba(255, 255, 255, 0.9)");
  grad.addColorStop(0.7, "rgba(255, 255, 255, 0.3)");
  grad.addColorStop(1,   "rgba(255, 255, 255, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ── SHAPE GENERATORS ──

// 1. CLOUD — drifting individual particles
function generateCloud(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 0.9 + Math.random() * 1.1;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    out[i * 3]     = r * Math.sin(phi) * Math.cos(theta) * (1 + (Math.random() - 0.5) * 0.4);
    out[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * (1 + (Math.random() - 0.5) * 0.4);
    out[i * 3 + 2] = r * Math.cos(phi) * (1 + (Math.random() - 0.5) * 0.4);
  }
  return out;
}

// 2. ICOSAHEDRON — particles on the edges (more crystalline)
function generateIcosahedron(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  const geo = new THREE.IcosahedronGeometry(1.6, 0);
  const edges = new THREE.EdgesGeometry(geo);
  const positions = edges.attributes.position.array;
  const edgeVertCount = positions.length / 3;

  for (let i = 0; i < count; i++) {
    // pick two consecutive verts (an edge) and put particle along it
    const pairIdx = Math.floor((i / count) * (edgeVertCount / 2)) * 2;
    const idxA = (pairIdx % edgeVertCount) * 3;
    const idxB = ((pairIdx + 1) % edgeVertCount) * 3;
    const t = Math.random();

    out[i * 3]     = lerp(positions[idxA],     positions[idxB],     t);
    out[i * 3 + 1] = lerp(positions[idxA + 1], positions[idxB + 1], t);
    out[i * 3 + 2] = lerp(positions[idxA + 2], positions[idxB + 2], t);
  }
  geo.dispose();
  edges.dispose();
  return out;
}

// 3. TOWER — stacked horizontal rings (much more distinct)
function generateTower(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  const layers = 5;
  const perLayer = Math.floor(count / layers);

  for (let i = 0; i < count; i++) {
    const layer = Math.floor(i / perLayer);
    const y = (layer - (layers - 1) / 2) * 0.6;
    const inLayer = i % perLayer;
    const angle = (inLayer / perLayer) * Math.PI * 2;
    // narrower at top, wider at bottom (tower silhouette)
    const layerWidth = 1.2 - (layer / layers) * 0.4;
    const ringThickness = 0.06;
    out[i * 3]     = Math.cos(angle) * (layerWidth + (Math.random() - 0.5) * ringThickness);
    out[i * 3 + 1] = y + (Math.random() - 0.5) * 0.05;
    out[i * 3 + 2] = Math.sin(angle) * (layerWidth + (Math.random() - 0.5) * ringThickness);
  }
  return out;
}

// 4. UNIVERSITY BUILDING — classical building with columns + roof
function generateUniversity(count: number): Float32Array {
  const out = new Float32Array(count * 3);

  // Building proportions
  const baseWidth = 1.8;     // total width
  const buildingHeight = 1.4;
  const roofHeight = 0.8;
  const columnCount = 5;     // 5 columns across front
  const columnRadius = 0.1;
  const columnHeight = 1.0;

  // Distribute particles: 25% base/floor, 25% columns, 25% pediment (triangle roof), 25% roof slopes
  let idx = 0;

  // ── 1. BASE (rectangular foundation/floor) — bottom slab ──
  const baseCount = Math.floor(count * 0.20);
  for (let i = 0; i < baseCount; i++) {
    out[idx * 3]     = (Math.random() - 0.5) * baseWidth;
    out[idx * 3 + 1] = -buildingHeight / 2 - 0.05 + Math.random() * 0.1;
    out[idx * 3 + 2] = (Math.random() - 0.5) * 0.4;
    idx++;
  }

  // ── 2. COLUMNS (5 vertical pillars) ──
  const columnCountTotal = Math.floor(count * 0.30);
  const perColumn = Math.floor(columnCountTotal / columnCount);
  for (let c = 0; c < columnCount; c++) {
    const cx = ((c - (columnCount - 1) / 2) / (columnCount - 1)) * (baseWidth - 0.2);
    for (let i = 0; i < perColumn; i++) {
      const t = Math.random();
      const ringAngle = Math.random() * Math.PI * 2;
      out[idx * 3]     = cx + Math.cos(ringAngle) * columnRadius;
      out[idx * 3 + 1] = -buildingHeight / 2 + t * columnHeight;
      out[idx * 3 + 2] = Math.sin(ringAngle) * columnRadius;
      idx++;
    }
  }

  // ── 3. ARCHITRAVE (horizontal bar above columns) ──
  const archCount = Math.floor(count * 0.10);
  for (let i = 0; i < archCount; i++) {
    out[idx * 3]     = (Math.random() - 0.5) * baseWidth;
    out[idx * 3 + 1] = -buildingHeight / 2 + columnHeight + Math.random() * 0.15;
    out[idx * 3 + 2] = (Math.random() - 0.5) * 0.3;
    idx++;
  }

  // ── 4. TRIANGULAR PEDIMENT (the iconic triangle on top) ──
  const pedimentCount = count - idx;
  const pedimentBase = -buildingHeight / 2 + columnHeight + 0.15;
  for (let i = 0; i < pedimentCount; i++) {
    // random point inside triangle (front-facing)
    let u = Math.random();
    let v = Math.random();
    if (u + v > 1) { u = 1 - u; v = 1 - v; }
    const h = 1 - u - v;  // barycentric
    // triangle: (-baseWidth/2, base), (baseWidth/2, base), (0, base + roofHeight)
    const x = u * (-baseWidth / 2) + v * (baseWidth / 2) + h * 0;
    const y = u * pedimentBase + v * pedimentBase + h * (pedimentBase + roofHeight);
    out[idx * 3]     = x;
    out[idx * 3 + 1] = y;
    out[idx * 3 + 2] = (Math.random() - 0.5) * 0.15;
    idx++;
  }

  return out;
}

// 5. CUBES CLUSTER — 5 distinct cubes with clear edges
function generateCubes(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  const cubeCount = 5;
  const perCube = Math.floor(count / cubeCount);

  const centers = [
    [0, 0.8, 0],
    [0.9, -0.3, 0.5],
    [-0.9, -0.3, 0.5],
    [0.5, 0.3, -0.7],
    [-0.5, 0.3, -0.7],
  ];

  for (let i = 0; i < count; i++) {
    const cubeIdx = Math.floor(i / perCube) % cubeCount;
    const [cx, cy, cz] = centers[cubeIdx];
    const half = 0.32;
    // particles on EDGES of the cube (not faces) — gives a wireframe-cube look
    const edge = Math.floor(Math.random() * 12);
    const t = Math.random();
    let lx = 0, ly = 0, lz = 0;
    const corners: [number, number, number][] = [
      [-half, -half, -half], [ half, -half, -half],
      [-half,  half, -half], [ half,  half, -half],
      [-half, -half,  half], [ half, -half,  half],
      [-half,  half,  half], [ half,  half,  half],
    ];
    const edgePairs: [number, number][] = [
      [0,1],[2,3],[4,5],[6,7],   // X edges
      [0,2],[1,3],[4,6],[5,7],   // Y edges
      [0,4],[1,5],[2,6],[3,7],   // Z edges
    ];
    const [a, b] = edgePairs[edge];
    lx = lerp(corners[a][0], corners[b][0], t);
    ly = lerp(corners[a][1], corners[b][1], t);
    lz = lerp(corners[a][2], corners[b][2], t);

    out[i * 3]     = cx + lx;
    out[i * 3 + 1] = cy + ly;
    out[i * 3 + 2] = cz + lz;
  }
  return out;
}

// 6. STARBURST — radial rays expanding from center
function generateStarburst(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  const rayCount = 14;
  const perRay = Math.floor(count / rayCount);

  for (let i = 0; i < count; i++) {
    const rayIdx = Math.floor(i / perRay) % rayCount;
    const inRay = i % perRay;

    // fibonacci sphere distribution for evenly spread rays
    const phi = Math.acos(1 - 2 * (rayIdx + 0.5) / rayCount);
    const theta = Math.PI * (1 + Math.sqrt(5)) * rayIdx;
    const dx = Math.sin(phi) * Math.cos(theta);
    const dy = Math.sin(phi) * Math.sin(theta);
    const dz = Math.cos(phi);

    const t = inRay / perRay;
    const dist = 0.25 + t * 1.8;
    const jitter = (Math.random() - 0.5) * 0.04;

    out[i * 3]     = dx * dist + jitter;
    out[i * 3 + 1] = dy * dist + jitter;
    out[i * 3 + 2] = dz * dist + jitter;
  }
  return out;
}

const SHAPES = [
  { name: 'CLOUD',       color: '#a78bfa', generator: generateCloud,      label: 'about' },
  { name: 'ICOSAHEDRON', color: '#5eead4', generator: generateIcosahedron, label: 'skills' },
  { name: 'TOWER',       color: '#fda4af', generator: generateTower,       label: 'experience' },
  { name: 'UNIVERSITY',  color: '#fbbf24', generator: generateUniversity,  label: 'education' },
  { name: 'CLUSTER',     color: '#a78bfa', generator: generateCubes,       label: 'projects' },
  { name: 'STARBURST',   color: '#5eead4', generator: generateStarburst,   label: 'contact' },
];

function MorphingParticles({ onShapeName }: { onShapeName: (name: string, color: string) => void }) {
  const pointsRef = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);

  const shapes = useMemo(() => SHAPES.map(s => s.generator(PARTICLE_COUNT)), []);
  const shapeColors = useMemo(() => SHAPES.map(s => new THREE.Color(s.color)), []);

  const currentPos = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);
  const currentCol = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);
  const circleTexture = useMemo(() => createCircleTexture(), []);

  useEffect(() => {
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      currentPos[i] = shapes[0][i];
    }
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      currentCol[i * 3]     = shapeColors[0].r;
      currentCol[i * 3 + 1] = shapeColors[0].g;
      currentCol[i * 3 + 2] = shapeColors[0].b;
    }
  }, []);

  useFrame((_, delta) => {
    const { section, sectionProgress } = useScrollProgress.getState();

    const shapeIdx = clamp(section - 1, 0, SHAPES.length - 1);

    // ⭐ TIMING FIX: shape locks in much earlier (first 25% of section)
    // 0 to 0.25 → smooth transition into the section's shape
    // 0.25 to 1.0 → fully at section's shape
    const morph = smoothstep(clamp(sectionProgress / 0.25, 0, 1));

    // morph FROM the previous shape (if we just entered this section)
    // TO the current section's shape
    const prevShapeIdx = clamp(shapeIdx - 1, 0, SHAPES.length - 1);
    const fromShape = shapes[prevShapeIdx];
    const toShape   = shapes[shapeIdx];
    const fromColor = shapeColors[prevShapeIdx];
    const toColor   = shapeColors[shapeIdx];

    if (geoRef.current) {
      const pos = geoRef.current.attributes.position.array as Float32Array;
      const col = geoRef.current.attributes.color.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        const target = lerp(fromShape[i], toShape[i], morph);
        pos[i] += (target - pos[i]) * 0.1;
      }
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        const targetR = lerp(fromColor.r, toColor.r, morph);
        const targetG = lerp(fromColor.g, toColor.g, morph);
        const targetB = lerp(fromColor.b, toColor.b, morph);
        col[idx]     += (targetR - col[idx])     * 0.06;
        col[idx + 1] += (targetG - col[idx + 1]) * 0.06;
        col[idx + 2] += (targetB - col[idx + 2]) * 0.06;
      }

      geoRef.current.attributes.position.needsUpdate = true;
      geoRef.current.attributes.color.needsUpdate = true;
    }

    // show the section's destination shape name immediately as you enter
    onShapeName(SHAPES[shapeIdx].name, SHAPES[shapeIdx].color);

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.15;
      pointsRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[currentPos, 3]} />
        <bufferAttribute attach="attributes-color"    args={[currentCol, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={1.0}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={circleTexture}
        alphaTest={0.001}
      />
    </points>
  );
}

export default function MorphingShape() {
  const [, setShapeName] = useState('CLOUD');
  const [, setShapeColor] = useState('#a78bfa');
  const section = useScrollProgress((s) => s.section);

  const visible = section >= 1 && section <= 6;

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 z-20 hidden lg:block transition-opacity duration-700 pointer-events-none ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        left: '40px',
        width: '220px',
        height: '260px',
      }}
    >
      <div className="w-full h-full relative">
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <MorphingParticles onShapeName={(n, c) => { setShapeName(n); setShapeColor(c); }} />
        </Canvas>
      </div>
    </div>
  );
}