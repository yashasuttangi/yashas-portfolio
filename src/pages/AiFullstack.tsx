import HeroScene from '../three/HeroScene';

export default function AiFullstack() {
  return (
    <>
      {/* The 3D world — persistent background, sits behind everything */}
      <HeroScene />

      <main className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="text-center max-w-2xl relative z-10 animate-fadeUp">
          <div className="inline-flex items-center gap-2.5 mb-10 px-3.5 py-1.5 rounded-full border border-violet-glow/20 bg-violet-glow/5">
            <span className="w-1.5 h-1.5 bg-violet-glow rounded-full animate-pulseGlow" />
            <span className="font-mono text-[11px] text-violet-glow tracking-[0.18em]">
              AI + FULL-STACK ENGINEER
            </span>
          </div>

          <h1 className="font-display text-7xl font-bold tracking-tight mb-6">
            <span className="block text-glow-violet">Yashas</span>
            <span className="block gradient-text">Uttangi</span>
          </h1>

          <p className="text-ink-secondary text-lg leading-relaxed max-w-md mx-auto">
            Phase 3 · the world is alive
          </p>

          <p className="text-ink-faint text-xs mt-12 font-mono tracking-[0.2em]">
            MOVE YOUR MOUSE · WATCH THE PARTICLES
          </p>
        </div>
      </main>
    </>
  );
}