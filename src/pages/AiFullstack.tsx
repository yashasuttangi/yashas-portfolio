import HeroScene from "../three/HeroScene";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Education from "../sections/Education";
import Experience from "../sections/Experience";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";
import Nav from "../components/Nav";
import AtmosphericOverlay from "../components/AtmosphericOverlay";
import { aiFullstack } from "../data/ai-fullstack";
import { useLenis } from "../hooks/useLenis";
import { useScrollTracker } from "../hooks/useScrollTracker";
import Cursor from "../components/Cursor";
import MorphingShape from "../three/MorphingShape";

const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "experience",
  "education",
  "projects",
  "contact",
];

export default function AiFullstack() {
  const content = aiFullstack;

  useLenis();
  useScrollTracker(SECTION_IDS);

  return (
    <>
      <Cursor />
      <Nav />
      <HeroScene />
      <AtmosphericOverlay />
      <MorphingShape />

      <main className="relative">
        {/* ── HERO ── */}
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center px-6 relative"
        >
          <div className="text-center max-w-3xl relative z-10 animate-fadeUp">
            <div className="inline-flex items-center gap-2.5 mb-10 px-3.5 py-1.5 rounded-full border border-violet-glow/20 bg-violet-glow/5">
              <span className="w-1.5 h-1.5 bg-violet-glow rounded-full animate-pulseGlow" />
              <span className="font-mono text-[11px] text-violet-glow tracking-[0.18em] uppercase">
                {content.tagline}
              </span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.95]">
              <span className="block text-glow-violet">
                {content.nameFirst}
              </span>
              <span className="block gradient-text">{content.nameLast}</span>
            </h1>

            <p className="text-ink-secondary text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-3">
              {content.heroSubtitle}
            </p>

            <p className="gradient-text font-display text-sm md:text-base font-medium tracking-tight italic mb-10">
              {content.heroTagline}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto pt-8 border-t border-line-base">
              {content.highlights.map((h, i) => (
                <div
                  key={i}
                  className="glass rounded-xl px-5 py-5 text-center transition-all duration-300 hover:border-violet-glow/40 hover:-translate-y-0.5"
                >
                  <p className="font-mono text-[10px] text-teal-glow tracking-[0.15em] uppercase mb-2">
                    {h.label}
                  </p>
                  <p className="font-display text-base md:text-lg font-bold tracking-tight mb-1">
                    {h.value}
                  </p>
                  <p className="text-xs text-ink-muted">{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTIONS ── */}
        <About content={content} />
        <Skills content={content} />
        <Experience content={content} />
        <Education content={content} />
        <Projects content={content} />
        <Contact content={content} />
      </main>
    </>
  );
}
