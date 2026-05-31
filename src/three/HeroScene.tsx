import { Canvas } from "@react-three/fiber";
import ParticleSphere from "./ParticleSphere";

export default function HeroScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 28], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* ambient lighting — soft fill */}
        <ambientLight intensity={0.3} />

        {/* the actual particles */}
        <ParticleSphere />
      </Canvas>
    </div>
  );
}