import type { PortfolioContent } from "./types";

export const aiFullstack: PortfolioContent = {
  // ── HERO ──
  tagline: "AI + Full-Stack Engineer",
  nameFirst: "Yashas",
  nameLast: "Uttangi",
  heroSubtitle:
    "Software engineer exploring the intersection of full-stack development and applied AI. Two years at Cisco, now studying at Northeastern and contributing to autism research on campus.",

  heroTagline: "Always curious, always learning.",

  stats: [
    { num: "2+", label: "yrs at Cisco" },
    { num: "4×", label: "IT Challenge Coins" },
    { num: "3k+", label: "users shipped to" },
    { num: "6×", label: "AWS certified" },
  ],

  // ── ABOUT ──
  aboutParagraphs: [
    "I'm a software engineer who thrives at the intersection of systems thinking and applied AI. Two years of production engineering at Cisco taught me how to ship code that real teams depend on — and the AI revolution made me realize what's possible when you combine that foundation with intelligent agents.",
    "Currently pursuing my Master's in Computer Science at Northeastern University, I'm deepening my work in machine learning, distributed systems, and agentic AI architectures. I care about building things that actually matter — not demos, not hype, but tools and systems that make people's work better.",
    "Lorem ipsum dolor sit amet — placeholder paragraph we'll replace with your real story. The structure stays, the words evolve.",
  ],

  highlights: [
    {
      label: "Currently",
      value: "MS Computer Science",
      description: "Graduating May 2027 · Boston",
    },
    {
      label: "At Cisco",
      value: "4× IT Challenge Coins",
      description: "Software Engineer · 2 years",
    },
    {
      label: "Focus",
      value: "Applied AI",
      description: "Agentic systems · production AI",
    },
  ],

  // ── SKILLS ──
  skillGroups: [
    {
      name: "AI & Agentic Systems",
      accent: "violet",
      skills: [
        { name: "LangChain", featured: true },
        { name: "LangGraph", featured: true },
        { name: "OpenAI API", featured: true },
        { name: "RAG Pipelines" },
        { name: "Vector DBs" },
        { name: "n8n + MCP", featured: true },
        { name: "TensorFlow" },
        { name: "scikit-learn" },
        { name: "NLTK" },
      ],
    },
    {
      name: "Frontend",
      accent: "teal",
      skills: [
        { name: "React.js", featured: true },
        { name: "Next.js", featured: true },
        { name: "TypeScript", featured: true },
        { name: "TailwindCSS" },
        { name: "Material UI" },
        { name: "Three.js" },
        { name: "GSAP" },
      ],
    },
    {
      name: "Backend & Cloud",
      accent: "coral",
      skills: [
        { name: "Node.js", featured: true },
        { name: "Python", featured: true },
        { name: "FastAPI" },
        { name: "Express.js" },
        { name: "AWS", featured: true },
        { name: "GCP" },
        { name: "Docker" },
        { name: "Kubernetes" },
        { name: "CI/CD" },
      ],
    },
    {
      name: "Data",
      accent: "violet",
      skills: [
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "Snowflake", featured: true },
        { name: "Oracle" },
        { name: "MySQL" },
      ],
    },
  ],

  // ── EDUCATION ──
  education: [
    {
      degree: "M.S. in Computer Science",
      institution: "Northeastern University",
      location: "Boston, MA · USA",
      period: "Sep 2025 – May 2027",
      gpa: "3.67",
      // gpa: '3.67 / 4.00',  // uncomment if you want to show it
      coursework: [
        "Programming Design Paradigm",
        "Algorithms",
        "Machine Learning",
        "Database Management Systems",
        "Foundations of Generative AI",
      ],
      status: "current",
    },
    {
      degree: "B.E. in Computer Science and Business Systems",
      institution: "JSS Science and Technology University",
      location: "Mysuru, India",
      period: "Aug 2019 – Jul 2023",
      gpa: "3.78",
      coursework: [
        "Design and Analysis of Algorithms",
        "Artificial Intelligence",
        "Web Development",
        "Cloud Computing & Microservices",
      ],
      highlights: [
        {
          title: "Placement Secretary",
          description:
            "Lead coordinator for campus placements — organized recruitment drives and supported peers through interview preparation across the CSE batch.",
          icon: "briefcase",
          accent: "violet",
        },
        {
          title: "President · VentureX",
          description:
            "Led the college Entrepreneurship Cell — organized hackathons, seminars, and pitch events to nurture student startups and the campus founder ecosystem.",
          icon: "rocket",
          accent: "coral",
        },
        {
          title: "Member · Google Developer Student Club",
          description:
            "Active contributor to Google DSC events, technical sessions, and developer community initiatives.",
          icon: "sparkle",
          accent: "teal",
        },
      ],
      status: "completed",
    },
  ],

  // ── EXPERIENCE ──
  experiences: [
    {
      role: "Full-Stack Developer",
      company: "Neurodevelopmental Dynamics Lab · Northeastern University",
      period: "Sep 2025 – Present",
      badge: "Current",
      bullets: [
        "Tech lead for the lab's engineering work — sole engineer at start, now mentoring incoming developers, running code reviews, and owning deployments across the stack.",
        "Built and maintain the lab's web platform with React, TypeScript, and Python/Django + MySQL — supporting research on minimally verbal and non-verbal autistic individuals.",
        "Designed and operate the full AWS cloud infrastructure — ECS Fargate, RDS, S3 — handling deployments, scaling, and reliability for research-critical systems.",
        "Develop iOS/Android mobile applications for in-the-field research data collection, used by the lab to capture observational and behavioral data.",
        "Working under Prof. Kristy Johnson on technology that broadens communication access for the autism community.",
      ],
    },
    {
      role: "Software Engineer",
      company: "Cisco Systems",
      period: "Aug 2023 – Aug 2025",
      badge: "4× Award Winner",
      bullets: [
        "4× Cisco IT Challenge Coin recipient, awarded by Cisco IT VP for solving critical business problems.",
        "Co-led React development for Partner Compensation Platform with 100+ feature deliveries and peer reviews.",
        "Built a rebate modeling engine that improved system accuracy by 50%, maximizing contra allocation budgets.",
        "Developed React CI/CD pipelines accelerating release cycles by 30%.",
        "Built an agentic AI chatbot using n8n + MCP, automating reports and cutting manual effort by 60%.",
        "Converted hackathon prototype into a Snowflake CI/CD pipeline, reducing deployment time by 40%.",
        "Lorem ipsum placeholder bullet — we will refine all of this together later.",
      ],
    },
    {
      role: "Technical Undergraduate Intern",
      company: "Cisco Systems",
      period: "Feb 2023 – Jul 2023",
      bullets: [
        "Developed an RPA framework in UiPath to automate 1200+ regression test cases, cutting manual effort by 75%.",
        "Boosted testing throughput 2× and halved execution time, accelerating releases.",
        "Optimized PL/SQL views and procedures via query tuning, reducing execution time by 40%.",
      ],
    },
    {
      role: "AWS Cloud Intern",
      company: "F13 Technologies",
      period: "Oct 2021 – Mar 2022",
      bullets: [
        "Earned 6 AWS certifications across architecture, security, and cloud deployment.",
        "Designed cloud infrastructure with EC2, S3, RDS, and Lambda for performance and scalability.",
        "Implemented IAM and VPC for secure and scalable environments, following AWS best practices.",
      ],
    },
    {
      role: "Project Intern",
      company: "Tata Consultancy Services",
      period: "Jun 2022 – Aug 2022",
      bullets: [
        "Built a scale model autonomous vehicle with computer vision and sensor integration.",
        "Implemented real-time object detection and path planning for autonomous navigation.",
      ],
    },
  ],

  // ── PROJECTS ──
  projects: [
    {
      title: "Bit Bounty",
      description:
        "Trustless, decentralized bug bounty protocol built at the MIT Bitcoin Hackathon. ETH payouts are triggered by on-chain cryptographic proof — no human review, no intermediary. Dual-tier system: deterministic bugs verified atomically via smart contract sandbox; logic bugs analyzed by an AI agent.",
      tags: [
        "Solidity",
        "Foundry",
        "React",
        "FastAPI",
        "Web3",
        "MIT Hackathon",
      ],
    },
    {
      title: "Placement & Alumni Portal",
      description:
        "Full-stack platform streamlining recruitment processes and fostering alumni interaction. 3,000+ users onboarded and active. Lorem ipsum filler text.",
      tags: ["React", "Node.js", "MongoDB", "3k+ users"],
    },
    {
      title: "Medicine Prescription OCR",
      description:
        "OCR + NLP pipeline extracting structured data from handwritten medical prescriptions. Reducing manual entry errors. Placeholder description.",
      tags: ["Python", "OpenCV", "NLTK", "NLP"],
    },
    {
      title: "AikyaMind Mental Health App",
      description:
        "Mobile application providing self-diagnosis tools, counselling resources, and mental health support — privacy-first design.",
      tags: ["React Native", "ML", "Firebase"],
    },
  ],

  // ── CONTACT ──
  contactHeading: "Let's build something",
  contactSub:
    "Open to AI Engineer and Full-Stack roles. Based in Boston, open to relocation or remote. Always up for an interesting conversation about agents, systems, or what we could build together.",
};
