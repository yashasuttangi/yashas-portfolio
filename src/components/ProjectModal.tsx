import { useEffect } from "react";
import type { Project, ProjectLinkType } from "../data/types";

interface Props {
  project: Project | null;
  onClose: () => void;
}

function LinkIcon({ type }: { type: ProjectLinkType }) {
  if (type === "github") {
    return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38v-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.96 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.22 2.2.82a7.61 7.61 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.28.82 2.15 0 3.08-1.87 3.76-3.65 3.96.29.25.54.73.54 1.48v2.19c0 .21.15.46.55.38A8 8 0 008 0z"/></svg>;
  }
  if (type === "website" || type === "demo") {
    return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="7"/><path d="M1 8h14M8 1a10 10 0 010 14M8 1a10 10 0 000 14"/></svg>;
  }
  if (type === "playstore") {
    return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M3 1.5L11.5 8 3 14.5V1.5z"/></svg>;
  }
  if (type === "press") {
    return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="2.5" width="13" height="11" rx="1"/><path d="M4 5.5h8M4 8h8M4 10.5h5"/></svg>;
  }
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9.5l4-4M5 3.5h3a3 3 0 010 6h-1M11 12.5h-3a3 3 0 010-6h1"/></svg>;
}

function linkLabel(type: ProjectLinkType): string {
  const labels: Record<ProjectLinkType, string> = {
    github: "View Source",
    demo: "Live Demo",
    website: "Visit Site",
    video: "Watch Video",
    paper: "Read Paper",
    press: "Press Feature",
    playstore: "Google Play",
    appstore: "App Store",
  };
  return labels[type];
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    // Pause Lenis smooth scroll so modal can scroll natively
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.stop === "function") {
      lenis.stop();
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";

      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  const links = project.links ?? [];
  const fullDescription = project.fullDescription ?? [];
  const features = project.features ?? [];
  const fullStack = project.fullStack ?? [];
  const press = project.press ?? [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fadeIn" onClick={onClose}>
      <div className="absolute inset-0 bg-space-void/80 backdrop-blur-md" />

      <div
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl glass border-violet-glow/25"
        style={{ animation: "fadeUp 0.3s ease-out", overscrollBehavior: "contain" }}
      >
        <button onClick={onClose} className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-space-deep/80 border border-line-base hover:border-violet-glow/40 hover:bg-violet-glow/10 transition-colors" aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2l10 10M12 2L2 12"/></svg>
        </button>

        <div className="p-8 md:p-10">
          <div className="mb-7">
            <div className="flex items-center gap-3 mb-3">
              <p className="font-mono text-xs text-teal-glow tracking-[0.15em] uppercase">{project.category}</p>
              {project.featured && (
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full bg-violet-glow/15 text-violet-glow border border-violet-glow/30">Featured</span>
              )}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">{project.title}</h2>
            <p className="text-ink-secondary text-lg leading-relaxed mb-4">{project.tagline}</p>
            {project.context && (
              <p className="font-mono text-xs text-ink-muted tracking-wider uppercase">{project.context}</p>
            )}
          </div>

          {links.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-glow/10 border border-violet-glow/30 hover:bg-violet-glow/15 hover:border-violet-glow/50 text-violet-glow transition-colors">
                  <LinkIcon type={link.type} />
                  <span className="font-mono text-xs tracking-wider uppercase">{link.label || linkLabel(link.type)}</span>
                </a>
              ))}
            </div>
          )}

          {fullDescription.length > 0 && (
            <div className="mb-8 space-y-4">
              {fullDescription.map((para, i) => (
                <p key={i} className="text-ink-secondary text-base leading-relaxed">{para}</p>
              ))}
            </div>
          )}

          {features.length > 0 && (
            <div className="mb-8">
              <h3 className="font-mono text-xs text-teal-glow tracking-[0.15em] uppercase mb-4">Key Features</h3>
              <ul className="space-y-2">
                {features.map((f, i) => (
                  <li key={i} className="relative pl-5 text-base text-ink-secondary leading-relaxed">
                    <span className="absolute left-0 text-violet-glow">—</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {fullStack.length > 0 && (
            <div className="mb-8">
              <h3 className="font-mono text-xs text-coral-glow tracking-[0.15em] uppercase mb-4">Tech Stack</h3>
              <div className="space-y-3">
                {fullStack.map((group, i) => (
                  <div key={i}>
                    <p className="font-mono text-[10px] text-ink-muted tracking-[0.15em] uppercase mb-2">{group.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(group.items ?? []).map((tech, j) => (
                        <span key={j} className="px-3 py-1 text-sm rounded-full border border-line-base text-ink-secondary bg-white/[0.02]">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.role && (
            <div className="mb-8 p-5 rounded-xl bg-violet-glow/5 border border-violet-glow/20">
              <p className="font-mono text-[10px] text-violet-glow tracking-[0.15em] uppercase mb-2">My Role</p>
              <p className="text-base text-ink-secondary leading-relaxed">{project.role}</p>
            </div>
          )}

          {press.length > 0 && (
            <div className="pt-6 border-t border-line-base">
              <h3 className="font-mono text-xs text-coral-glow tracking-[0.15em] uppercase mb-4">Press & Recognition</h3>
              <div className="space-y-2">
                {press.map((p, i) => (
                  <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-base text-coral-glow hover:text-coral-mid underline-offset-4 hover:underline transition-colors">
                    <LinkIcon type="press" />{p.label || "Press Feature"}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}