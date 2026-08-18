import type { Project, ProjectLinkType } from '../data/types';

interface Props {
  project: Project;
  onClick: () => void;
}

function LinkIcon({ type }: { type: ProjectLinkType }) {
  if (type === 'github') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38v-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.96 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.22 2.2.82a7.61 7.61 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.28.82 2.15 0 3.08-1.87 3.76-3.65 3.96.29.25.54.73.54 1.48v2.19c0 .21.15.46.55.38A8 8 0 008 0z" />
      </svg>
    );
  }
  if (type === 'website' || type === 'demo') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="7" />
        <path d="M1 8h14M8 1a10 10 0 010 14M8 1a10 10 0 000 14" />
      </svg>
    );
  }
  if (type === 'playstore') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M3 1.5L11.5 8 3 14.5V1.5z" opacity="0.9" />
        <path d="M3 1.5L11.5 8 3 14.5l5-6.5z" opacity="0.6" />
      </svg>
    );
  }
  if (type === 'press') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1.5" y="2.5" width="13" height="11" rx="1" />
        <path d="M4 5.5h8M4 8h8M4 10.5h5" />
      </svg>
    );
  }
  if (type === 'video') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M1 4a2 2 0 012-2h7a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm14 .5l-3 2v3l3 2v-7z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 9.5l4-4M5 3.5h3a3 3 0 010 6h-1M11 12.5h-3a3 3 0 010-6h1" />
    </svg>
  );
}

function linkLabel(type: ProjectLinkType): string {
  const labels: Record<ProjectLinkType, string> = {
    github: 'Code',
    demo: 'Demo',
    website: 'Live',
    video: 'Video',
    paper: 'Paper',
    press: 'Press',
    playstore: 'Play Store',
    appstore: 'App Store',
  };
  return labels[type];
}

export default function ProjectCard({ project, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl p-7 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
        project.featured
          ? 'glass border-violet-glow/30 hover:border-violet-glow/60'
          : 'glass hover:border-line-bright'
      }`}
      style={{
        background: project.featured
          ? 'linear-gradient(135deg, rgba(167,139,250,0.04), rgba(94,234,212,0.02))'
          : undefined,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(167,139,250,0.08), transparent 70%)',
        }}
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-[10px] text-teal-glow tracking-[0.15em] uppercase">
            {project.category}
          </p>
          {project.featured && (
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full bg-violet-glow/15 text-violet-glow border border-violet-glow/30">
              Featured
            </span>
          )}
        </div>

        <h3 className="font-display text-2xl font-bold tracking-tight mb-2 group-hover:text-violet-glow transition-colors">
          {project.title}
        </h3>

        <p className="text-ink-secondary text-base leading-relaxed mb-5">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techPreview?.map((t, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 text-xs rounded-full border border-line-base text-ink-secondary bg-white/[0.02]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="h-px bg-line-base mb-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {project.links?.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-line-base hover:border-violet-glow/40 hover:bg-violet-glow/5 text-ink-secondary hover:text-violet-glow transition-colors"
              >
                <LinkIcon type={link.type} />
                <span className="font-mono text-[11px] tracking-wider uppercase">
                  {linkLabel(link.type)}
                </span>
              </a>
            ))}
          </div>

          <span className="font-mono text-[10px] text-ink-muted tracking-[0.15em] uppercase group-hover:text-violet-glow transition-colors">
            Details →
          </span>
        </div>
      </div>
    </div>
  );
}