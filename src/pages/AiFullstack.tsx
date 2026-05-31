export default function AiFullstack() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative">
      {/* Placeholder star field — will be replaced with real Three.js scene in Phase 3 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              top:  `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width:  `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

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
          Phase 2 ready · spatial direction locked
        </p>

        <p className="text-ink-faint text-xs mt-12 font-mono tracking-[0.2em]">
          PHASE_3 · BUILDING THE 3D WORLD
        </p>
      </div>
    </main>
  );
}