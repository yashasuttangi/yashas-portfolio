import type { LeadershipRole } from '../data/types';

interface Props {
  role: LeadershipRole;
  index: number;
}

const accentMap: Record<string, { glow: string; mid: string; bg: string; border: string }> = {
  violet: {
    glow: 'text-violet-glow',
    mid: '#a78bfa',
    bg: 'bg-violet-glow/5',
    border: 'border-violet-glow/30',
  },
  teal: {
    glow: 'text-teal-glow',
    mid: '#5eead4',
    bg: 'bg-teal-glow/5',
    border: 'border-teal-glow/30',
  },
  coral: {
    glow: 'text-coral-glow',
    mid: '#fda4af',
    bg: 'bg-coral-glow/5',
    border: 'border-coral-glow/30',
  },
};

// ── unique animated SVG icons per role ──
function RoleIcon({ icon, color }: { icon: string; color: string }) {
  if (icon === 'briefcase') {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <g style={{ transformOrigin: 'center' }}>
          {/* outer ring */}
          <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="0.5" opacity="0.4">
            <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="20s" repeatCount="indefinite" />
          </circle>
          {/* briefcase shape */}
          <rect x="10" y="14" width="20" height="14" rx="2" stroke={color} strokeWidth="1.4" />
          <path d="M16 14 L16 11 Q16 9 18 9 L22 9 Q24 9 24 11 L24 14" stroke={color} strokeWidth="1.4" fill="none" />
          <line x1="10" y1="20" x2="30" y2="20" stroke={color} strokeWidth="0.8" opacity="0.6" />
          {/* glow dot */}
          <circle cx="20" cy="20" r="1.5" fill={color}>
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    );
  }

  if (icon === 'rocket') {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <g style={{ transformOrigin: 'center' }}>
          {/* orbiting outer dot */}
          <circle cx="20" cy="20" r="17" stroke={color} strokeWidth="0.5" opacity="0.3" strokeDasharray="2 3">
            <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="15s" repeatCount="indefinite" />
          </circle>
          {/* rocket body */}
          <path d="M20 8 Q24 16 24 22 L24 28 L16 28 L16 22 Q16 16 20 8 Z" stroke={color} strokeWidth="1.4" fill="none" />
          {/* circular porthole */}
          <circle cx="20" cy="18" r="2" stroke={color} strokeWidth="1.2" fill="none" />
          {/* flame */}
          <path d="M18 28 L20 32 L22 28" stroke={color} strokeWidth="1.4" fill="none">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.2s" repeatCount="indefinite" />
          </path>
          {/* side fins */}
          <path d="M16 24 L13 28 L16 26" stroke={color} strokeWidth="1" fill="none" />
          <path d="M24 24 L27 28 L24 26" stroke={color} strokeWidth="1" fill="none" />
        </g>
      </svg>
    );
  }

  // sparkle / community
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <g style={{ transformOrigin: 'center' }}>
        {/* outer rotating ring */}
        <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="0.5" opacity="0.4" strokeDasharray="4 4">
          <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="-360 20 20" dur="25s" repeatCount="indefinite" />
        </circle>
        {/* 3 connected nodes (network feel) */}
        <circle cx="20" cy="10" r="2.5" fill={color}>
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="11" cy="25" r="2.5" fill={color}>
          <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="29" cy="25" r="2.5" fill={color}>
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.3s" repeatCount="indefinite" />
        </circle>
        {/* connecting lines */}
        <line x1="20" y1="10" x2="11" y2="25" stroke={color} strokeWidth="0.8" opacity="0.5" />
        <line x1="20" y1="10" x2="29" y2="25" stroke={color} strokeWidth="0.8" opacity="0.5" />
        <line x1="11" y1="25" x2="29" y2="25" stroke={color} strokeWidth="0.8" opacity="0.5" />
        {/* center sparkle */}
        <circle cx="20" cy="20" r="1.5" fill={color}>
          <animate attributeName="r" values="1;2;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

export default function LeadershipCard({ role, index }: Props) {
  const accent = accentMap[role.accent];

  return (
    <div
      className={`group relative rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1`}
      style={{
        background: 'rgba(255, 255, 255, 0.025)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* gradient border on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${accent.mid}25, transparent 70%)`,
        }}
      />

      {/* corner accent line */}
      <div
        className="absolute top-0 left-0 h-px transition-all duration-700 group-hover:w-full"
        style={{
          width: '32px',
          background: `linear-gradient(to right, ${accent.mid}, transparent)`,
        }}
      />

      <div className="relative p-5 flex items-start gap-4">
        {/* icon block */}
        <div
          className={`flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center ${accent.bg} ${accent.border} border transition-transform duration-500 group-hover:scale-110`}
          style={{
            backdropFilter: 'blur(4px)',
          }}
        >
          <RoleIcon icon={role.icon} color={accent.mid} />
        </div>

        {/* content */}
        <div className="flex-1 min-w-0">
          <h4 className={`font-display text-base md:text-lg font-bold tracking-tight mb-1.5 ${accent.glow}`}>
            {role.title}
          </h4>
          <p className="text-sm md:text-base text-ink-secondary leading-relaxed">
            {role.description}
          </p>
        </div>
      </div>
    </div>
  );
}