import type { PortfolioContent } from "../data/types";
import SectionHeader from "../components/SectionHeader";
import LeadershipCard from "../components/LeadershipCard";

interface Props {
  content: PortfolioContent;
}

export default function Education({ content }: Props) {
  return (
    <section
      id="education"
      className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32"
    >
      <SectionHeader num="04" title="Education" />

      <div className="grid md:grid-cols-2 gap-6">
        {content.education.map((edu, i) => (
          <div
            key={i}
            className="glass rounded-2xl p-8 relative transition-all duration-300 hover:border-violet-glow/30 hover:-translate-y-1"
          >
            {/* status badge */}
            {edu.status === "current" && (
              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-glow/10 border border-teal-glow/30">
                <span className="w-1.5 h-1.5 bg-teal-glow rounded-full animate-pulseGlow" />
                <span className="font-mono text-[11px] text-teal-glow tracking-[0.15em] uppercase">
                  Current
                </span>
              </div>
            )}

            {/* period */}
            <p className="font-mono text-s text-ink-muted tracking-[0.15em] uppercase mb-4">
              {edu.period}
            </p>

            {/* degree + institution */}
            <h3 className="font-display text-2xl font-bold tracking-tight mb-2">
              {edu.degree}
            </h3>
            <p className="text-violet-glow text-xl font-semibold mb-1.5">
              {edu.institution}
            </p>
            <p className="text-ink-muted text-sm font-mono tracking-wider">
              {edu.location}
            </p>

            {/* GPA */}
            {edu.gpa && (
              <div className="mt-5 inline-block px-4 py-1.5 rounded-md bg-violet-glow/8 border border-violet-glow/25">
                <span className="font-mono text-xs text-ink-muted tracking-wider uppercase mr-2">
                  GPA
                </span>
                <span className="font-mono text-base font-semibold text-violet-glow">
                  {edu.gpa}
                </span>
              </div>
            )}

            {/* coursework */}
            {edu.coursework && edu.coursework.length > 0 && (
              <div className="mt-7">
                <p className="font-mono text-xs text-teal-glow tracking-[0.15em] uppercase mb-3.5">
                  Coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course, j) => (
                    <span
                      key={j}
                      className="px-3 py-1.5 text-sm rounded-full border border-line-base text-ink-secondary bg-white/[0.02] hover:border-line-bright hover:text-ink-primary transition-colors"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* highlights / leadership */}
            {edu.highlights && edu.highlights.length > 0 && (
              <div className="mt-7">
                <p className="font-mono text-xs text-coral-glow tracking-[0.15em] uppercase mb-4">
                  Leadership & Activities
                </p>
                <div className="space-y-3">
                  {edu.highlights.map((role, j) => (
                    <LeadershipCard key={j} role={role} index={j} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
