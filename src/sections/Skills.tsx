import type { PortfolioContent } from '../data/types';
import SectionHeader from '../components/SectionHeader';

interface Props {
  content: PortfolioContent;
}

const accentBorder: Record<string, string> = {
  violet: 'border-violet-glow/40 text-violet-glow',
  teal:   'border-teal-glow/40 text-teal-glow',
  coral:  'border-coral-glow/40 text-coral-glow',
};

const accentLabel: Record<string, string> = {
  violet: 'text-violet-glow',
  teal:   'text-teal-glow',
  coral:  'text-coral-glow',
};

export default function Skills({ content }: Props) {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 lg:-translate-x-12">
      <SectionHeader num="02" title="Tech matrix" />

      <div className="space-y-10">
        {content.skillGroups.map((group, i) => (
          <div key={i}>
            <p className={`font-mono text-[11px] tracking-[0.15em] uppercase mb-4 ${accentLabel[group.accent]}`}>
              {group.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill, j) => (
                <span
                  key={j}
                  className={`
                    px-4 py-1.5 text-sm font-medium rounded-full border
                    backdrop-blur-sm transition-all duration-200 cursor-default
                    hover:-translate-y-0.5
                    ${skill.featured
                      ? accentBorder[group.accent] + ' bg-white/[0.03]'
                      : 'border-line-base text-ink-secondary bg-white/[0.02] hover:border-line-bright hover:text-ink-primary'}
                  `}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}