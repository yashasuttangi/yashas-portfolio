// ── Content schemas — define the shape once, reuse everywhere ──

export interface NavLink {
  label: string;
  href: string;
}

export interface SkillGroup {
  name: string;
  accent: "violet" | "teal" | "coral";
  skills: Skill[];
}

export interface Skill {
  name: string;
  featured?: boolean;
}

export interface LeadershipRole {
  title: string;
  description: string;
  icon: 'briefcase' | 'rocket' | 'sparkle';
  accent: 'violet' | 'teal' | 'coral';
}


export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
  coursework?: string[];
  highlights?: LeadershipRole[];
  status?: "current" | "completed";
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  badge?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export interface Highlight {
  label: string;
  value: string;
  description: string;
}

export interface Stat {
  num: string; // e.g. "4×"
  label: string;
}

// ── The complete portfolio content ──
export interface PortfolioContent {
  // hero
  tagline: string;
  nameFirst: string;
  nameLast: string;
  heroSubtitle: string;
  heroTagline: string;
  stats: Stat[];

  // about
  aboutParagraphs: string[];
  highlights: Highlight[];

  // ⭐ NEW
  education: Education[];

  // skills
  skillGroups: SkillGroup[];

  // experience
  experiences: Experience[];

  // projects
  projects: Project[];

  // contact
  contactHeading: string;
  contactSub: string;
}
