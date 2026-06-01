import type { PortfolioContent } from "../data/types";
import { shared } from "../data/shared";
import SectionHeader from "../components/SectionHeader";

interface Props {
  content: PortfolioContent;
}

export default function About({ content }: Props) {
  return (
    <section
      id="about"
      className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32"
    >
      <SectionHeader num="01" title="About" />

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* ── Left: paragraphs ── */}
        <div className="space-y-6">
          {content.aboutParagraphs.map((p, i) => (
            <p
              key={i}
              className="text-ink-secondary text-base md:text-lg leading-relaxed"
            >
              {p}
            </p>
          ))}
          <p className="font-mono text-xs text-ink-muted tracking-wider pt-4">
            OPEN_TO_ROLES · 2026 · BOSTON → ANYWHERE
          </p>
        </div>

        {/* ── Right: photo + highlights ── */}
        <div className="space-y-6">
          {/* photo card */}
          <div className="relative group">
            {/* gradient glow behind photo */}
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-violet-glow/40 via-coral-glow/30 to-teal-glow/30 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative bg-space-deep rounded-2xl overflow-hidden border border-line-base">
              <img
                src="/photo-cropped-2.jpg"
                alt={shared.name}
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* subtle gradient overlay at bottom for text contrast */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-space-void via-space-void/60 to-transparent pointer-events-none" />

              {/* caption overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5">
                <p className="font-display text-lg font-bold tracking-tight text-ink-primary">
                  {shared.name}
                </p>
                <p className="font-mono text-[11px] text-violet-glow tracking-[0.15em] uppercase mt-0.5">
                  {content.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
