import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import ParticleSphere from "./ParticleSphere";
import { useScrollProgress } from "../hooks/useScrollProgress";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

function CameraRig() {
  const { camera } = useThree();
  const targetZ = useRef(28);

  useFrame(() => {
    const { progress } = useScrollProgress.getState();
    const heroToAbout = clamp(progress / 0.15, 0, 1);
    targetZ.current = lerp(28, 24, heroToAbout);
    camera.position.z += (targetZ.current - camera.position.z) * 0.05;
  });

  return null;
}

export default function HeroScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 28], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <ParticleSphere />
        <CameraRig />
      </Canvas>
    </div>
  );
}