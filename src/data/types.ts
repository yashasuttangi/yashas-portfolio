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
  icon: "briefcase" | "rocket" | "sparkle";
  accent: "violet" | "teal" | "coral";
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

export type ProjectLinkType =
  | "github"
  | "demo"
  | "video"
  | "paper"
  | "press"
  | "playstore"
  | "appstore"
  | "website";

export interface ProjectLink {
  type: ProjectLinkType;
  url: string;
  label?: string; // optional override (e.g., "Featured in Star of Mysore")
}

export interface ProjectStackGroup {
  category: string; // e.g., "Frontend", "AI / ML", "Smart Contracts"
  items: string[];
}

export interface Project {
  // Quick-scan fields (shown on card)
  title: string;
  tagline: string; // 1-line description
  category: string; // e.g., "Web3 · Hackathon", "AI · Healthcare"
  techPreview: string[]; // 3-4 chips on card
  featured?: boolean;
  links: ProjectLink[];

  // Modal-only fields
  fullDescription: string[]; // array of paragraphs
  features?: string[]; // bullet list of key features
  fullStack?: ProjectStackGroup[];
  role?: string; // your role / contribution
  context?: string; // "MIT Hackathon · 2024", "At Cisco", etc.
  timeline?: string; // optional
  image?: string; // optional screenshot path
  press?: ProjectLink[]; // separate press / recognition links
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
