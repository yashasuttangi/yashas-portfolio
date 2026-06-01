import type { PortfolioContent } from '../data/types';
import SectionHeader from '../components/SectionHeader';

interface Props {
  content: PortfolioContent;
}

export default function Projects({ content }: Props) {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
      <SectionHeader num="05" title="Projects" />

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
        {content.projects.map((project, i) => (
          <div
            key={i}
            className={`
              glass rounded-2xl p-7 relative overflow-hidden
              transition-all duration-300 cursor-default
              hover:-translate-y-1 hover:border-violet-glow/30
              ${project.featured ? 'border-violet-glow/30' : ''}
            `}
          >
            {/* subtle glow on hover */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-violet-glow/[0.08] via-transparent to-transparent" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-[10px] text-ink-muted tracking-wider">
                  {String(i + 1).padStart(2, '0')} /
                </p>
                {project.featured && (
                  <span className="font-mono text-[9px] text-violet-glow tracking-wider px-2 py-0.5 rounded-full border border-violet-glow/30 bg-violet-glow/5">
                    FEATURED
                  </span>
                )}
              </div>

              <h3 className="font-display text-lg font-bold tracking-tight mb-3">
                {project.title}
              </h3>

              <p className="text-sm text-ink-secondary leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="font-mono text-[10px] tracking-wider px-2.5 py-1 rounded-full bg-white/[0.04] text-ink-muted border border-line-base"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}