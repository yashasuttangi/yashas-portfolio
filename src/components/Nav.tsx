import { useScrollProgress } from "../hooks/useScrollProgress";
import { shared } from "../data/shared";
import { useState, useEffect } from "react";

export default function Nav() {
  const progress = useScrollProgress((s) => s.progress);
  const section = useScrollProgress((s) => s.section);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setScrolled(progress > 0.02);
  }, [progress]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500 ${scrolled ? "backdrop-blur-md bg-space-void/70 border-b border-line-faint" : "bg-transparent"}`}
    >
      <a href="#" className="font-display text-lg font-bold tracking-tight">
        Yashas
      </a>

      <ul className="hidden md:flex items-center gap-1">
        {shared.nav.map((item, i) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`font-mono text-[13px] uppercase tracking-[0.15em] px-3 py-2 rounded-md transition-colors ${section === i + 1 ? "text-violet-glow" : "text-ink-muted hover:text-ink-primary"}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="hidden md:block relative group">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-glow/25 bg-teal-glow/5 cursor-default transition-all duration-300 group-hover:border-teal-glow/60 group-hover:bg-teal-glow/10">
          <span className="w-2 h-2 bg-teal-glow rounded-full animate-pulseGlow shadow-[0_0_8px_#5eead4]" />
          <span className="font-mono text-[11px] text-teal-glow tracking-widest uppercase">
            Available
          </span>
        </div>

        {/* Tooltip — appears on hover */}
        <div className="absolute top-full right-0 mt-3 pointer-events-none opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <div className="glass border-teal-glow/30 rounded-lg px-4 py-3 whitespace-nowrap">
            <p className="font-mono text-[10px] text-teal-glow tracking-[0.15em] uppercase mb-1">
              Open to
            </p>
            <p className="font-display text-sm font-bold text-ink-primary">
              Fall 2026 Internship Opportunities
            </p>
          </div>
          {/* small arrow pointing up to the pill */}
          <div className="absolute -top-1.5 right-6 w-3 h-3 rotate-45 bg-space-deep border-l border-t border-teal-glow/30" />
        </div>
      </div>
    </nav>
  );
}
