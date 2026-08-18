import type { PortfolioContent } from "../data/types";
import SectionHeader from "../components/SectionHeader";

interface Props {
  content: PortfolioContent;
}

export default function Experience({ content }: Props) {
  return (
    <section
      id="experience"
      className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 lg:-translate-x-12"
    >
      <SectionHeader num="03" title="Experience" />

      <div className="space-y-0">
        {content.experiences.map((exp, i) => (
          <div
            key={i}
            className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-10 py-10 border-b border-line-base last:border-b-0"
          >
            {/* Left — meta */}
            <div>
              <p className="font-mono text-[12px] text-ink-muted tracking-wider leading-relaxed">
                {exp.period}
              </p>
              <p className="text-md font-semibold text-violet-glow mt-2">
                {exp.company}
              </p>
              {exp.location && (
                <p className="font-mono text-[14px] text-ink-muted tracking-wider mt-1">
                  {exp.location}
                </p>
              )}
              {exp.badge && (
                <span
                  className={`inline-flex items-center gap-1.5 mt-3 font-mono text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border ${
                    exp.badge.toLowerCase() === "current"
                      ? "bg-teal-glow/10 text-teal-glow border-teal-glow/30"
                      : "bg-violet-glow/10 text-violet-glow border-violet-glow/25"
                  }`}
                >
                  {exp.badge.toLowerCase() === "current" && (
                    <span className="w-1 h-1 bg-teal-glow rounded-full animate-pulseGlow" />
                  )}
                  {exp.badge}
                </span>
              )}
            </div>

            {/* Right — role + bullets */}
            <div>
              <h3 className="font-display text-xl font-bold tracking-tight mb-4">
                {exp.role}
              </h3>
              <ul className="space-y-2">
                {exp.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="relative pl-5 text-sm text-ink-secondary leading-relaxed"
                  >
                    <span className="absolute left-1 text-violet-glow">▸</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}