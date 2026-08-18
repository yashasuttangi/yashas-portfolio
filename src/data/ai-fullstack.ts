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
      location: "Boston, MA",
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
      location: "Bengaluru, India",
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
      location: "Bengaluru, India",
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
      location: "Bengaluru, India",
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
      location: "Bengaluru, India",
      period: "Jun 2022 – Aug 2022",
      bullets: [
        "Built a scale model autonomous vehicle with computer vision and sensor integration.",
        "Implemented real-time object detection and path planning for autonomous navigation.",
      ],
    },
  ],

  // ── PROJECTS ──
  projects: [
    // ── 1. BIT BOUNTY (headline featured) ──
    {
      title: "Bit Bounty",
      tagline:
        "Decentralized bug bounty platform with on-chain cryptographic verification.",
      category: "Web3 · MIT Hackathon",
      featured: true,
      context: "MIT Hackathon · 2025",
      techPreview: ["Solidity", "FastAPI", "Gemini", "EVM"],
      links: [
        {
          type: "github",
          url: "https://github.com/yashasuttangi/crypto-bounty",
        },
      ],
      fullDescription: [
        "Bit Bounty is a decentralized bug bounty platform where ETH payouts are triggered by cryptographic proof — not human review. Developers deposit ETH against a target smart contract; security researchers (hunters) find bugs and claim rewards. Everything settles on-chain, with no intermediary or oracle.",
        "The platform handles two distinct classes of vulnerabilities through a two-tier architecture. Tier 1 verifies deterministic bugs (reentrancy, integer overflow, broken access control) using on-chain invariant verification — the hunter submits exploit bytecode, the contract deploys and runs the exploit inside a self-call that always reverts (so no state is ever mutated), then decodes the result to check if a postcondition was violated. If so, the ETH transfers atomically in the same transaction.",
        "Tier 2 handles logic bugs that don't trip a measurable invariant — a reward calculation silently truncating small stakers to zero, for example. A hunter submits the contract source, exploit description, and before/after storage snapshots through a frontend. A FastAPI agent analyzes the contract against its NatSpec documentation using Gemini, determines whether the observed behavior contradicts documented intent, and returns a verdict with severity and an auto-generated Foundry test.",
      ],
      features: [
        "On-chain invariant verification for deterministic bugs — no oracle, no delay, no trust",
        "Self-reverting exploit execution pattern — exploits run but never mutate state",
        "AI-assisted logic bug analysis using Gemini + NatSpec documentation parsing",
        "Auto-generated Foundry tests for verified vulnerabilities",
        "Supports 7 standard invariants: SumNonDecreasing, OnlyOwnerCanChange, SlotsEqual, MaxValue, MustRemainZero, NonDecreasing, Immutable",
        "End-to-end on-chain settlement — bounties paid out atomically with vulnerability proof",
      ],
      fullStack: [
        {
          category: "Smart Contracts",
          items: ["Solidity", "Foundry", "EVM Bytecode", "CREATE opcode"],
        },
        { category: "Backend", items: ["FastAPI", "Python", "Gemini API"] },
        { category: "Frontend", items: ["React", "ethers.js", "Web3 wallets"] },
        {
          category: "Concepts",
          items: [
            "Invariant verification",
            "NatSpec parsing",
            "RAG over contract source",
          ],
        },
      ],
      role: "Co-built end-to-end during a 36-hour MIT hackathon — designed the two-tier architecture, implemented invariant verification contracts, and built the AI analysis pipeline.",
    },

    // ── 2. SJCE PLACEMENT & ALUMNI PORTAL ──
    {
      title: "SJCE Placement & Alumni Portal",
      tagline:
        "Campus placement and alumni network platform — live and featured in regional press.",
      category: "Full-Stack · Production",
      featured: true,
      context: "At JSSSTU · 2022 – 2023",
      techPreview: ["React", "Node.js", "MongoDB", "AWS"],
      links: [{ type: "website", url: "https://sjceplacements.org/" }],
      press: [
        {
          type: "press",
          url: "https://starofmysore.com/young-alumni-meet-to-commemorate-sjces-diamond-jubilee-year-celebration/",
          label: "Star of Mysore — Diamond Jubilee Feature",
        },
      ],
      fullDescription: [
        "Built as part of my role as Placement Secretary at JSSSTU, this portal serves as the central platform for campus placements and alumni engagement. It's currently live at sjceplacements.org and has been used across multiple recruitment cycles.",
        "The system supports placement workflows — companies posting jobs, students applying, the placement office coordinating drives — alongside alumni features for networking, profile browsing, and event coordination. The project was featured in Star of Mysore during the college's Diamond Jubilee celebrations, highlighting the alumni meet that the platform helped organize.",
        "// PLACEHOLDER: add more detail on specific features, scale of usage, or any technical challenges worth highlighting (e.g., handling concurrent applications during placement drives).",
      ],
      features: [
        "Student, alumni, and admin role-based access",
        "Job posting and application management for recruiters",
        "Alumni profile and networking features",
        "Event management for placement drives and alumni meets",
        "// PLACEHOLDER: add more specific features you implemented",
      ],
      fullStack: [
        { category: "Frontend", items: ["React", "Tailwind CSS", "Vite"] },
        { category: "Backend", items: ["Node.js", "Express", "MongoDB"] },
        { category: "Hosting", items: ["AWS EC2", "AWS S3"] },
        // PLACEHOLDER — confirm the actual stack used
      ],
      role: "Led development as Placement Secretary — built end-to-end with student team contributors. // PLACEHOLDER: confirm exact role",
    },

    // ── 3. CANCER CLASSIFICATION MLOPS ──
    {
      title: "Cancer Classification — MLOps Pipeline",
      tagline:
        "End-to-end ML pipeline for medical image classification with MLflow tracking and DVC versioning.",
      category: "ML · MLOps",
      context: "Personal Project · 2024",
      techPreview: ["TensorFlow", "MLflow", "DVC", "Python"],
      links: [
        {
          type: "github",
          url: "https://github.com/yashasuttangi/Cancer-classification-end-to-end-using-MLFlow-and-DVC",
        },
      ],
      fullDescription: [
        "An end-to-end machine learning project demonstrating production MLOps practices for a cancer cell classification task. The focus wasn't just the model — it was the *workflow* around the model: reproducible training, experiment tracking, data versioning, and pipeline orchestration.",
        "Used MLflow to track experiments, hyperparameters, and model artifacts across runs — making it possible to compare model versions and roll back if needed. Used DVC (Data Version Control) to version both the dataset and intermediate pipeline stages, ensuring that any team member could reproduce a specific model from a specific data snapshot.",
        "// PLACEHOLDER: add detail on the dataset (size, source if shareable), model architecture (CNN? transfer learning?), and any results / accuracy metrics you got.",
      ],
      features: [
        "Modular pipeline stages: data ingestion → validation → preprocessing → training → evaluation",
        "MLflow experiment tracking with parameter logging, metric tracking, and model registry",
        "DVC data versioning with remote storage for reproducible training",
        "Configurable hyperparameters via YAML — no code changes needed for experiments",
        "// PLACEHOLDER: any standout feature like CI/CD integration or deployment",
      ],
      fullStack: [
        {
          category: "ML / Framework",
          items: ["TensorFlow", "Keras", "NumPy", "Pandas"],
        },
        { category: "MLOps", items: ["MLflow", "DVC", "YAML configs"] },
        { category: "Tooling", items: ["Python", "Jupyter", "Git"] },
      ],
      role: "Solo project — designed the pipeline architecture and implemented all stages from scratch.",
    },

    // ── 4. AIKYAMIND ──
    {
      title: "AikyaMind",
      tagline:
        "Mental health and mindfulness mobile app — published on Google Play.",
      category: "Mobile · Mental Health",
      context: "Personal Project",
      techPreview: ["Flutter", "Dart", "Firebase"],
      links: [
        {
          type: "playstore",
          url: "https://play.google.com/store/apps/details?id=com.aikyamind.aikyamind&hl=en&pli=1",
        },
      ],
      fullDescription: [
        'AikyaMind ("aikya" meaning unity or oneness in Sanskrit) is a mental health and mindfulness app I built and published to the Google Play Store. The name reflects the core idea — that mental wellness comes from a sense of unity between mind and body.',
        "Built with Flutter for cross-platform support, the app delivers mental health resources, mindfulness exercises, and tools to support emotional well-being. // PLACEHOLDER: confirm or refine the description of what the app actually does — meditation timer? mood tracking? journaling? resource library?",
        "// PLACEHOLDER: any standout technical challenge or design decision worth highlighting?",
      ],
      features: [
        "// PLACEHOLDER: list 3-5 specific features the app has",
        "Cross-platform mobile experience built with Flutter",
        "Published live on Google Play Store",
      ],
      fullStack: [
        { category: "Mobile", items: ["Flutter", "Dart"] },
        {
          category: "Backend",
          items: ["Firebase", "// PLACEHOLDER — confirm"],
        },
        { category: "Platforms", items: ["Android", "iOS"] },
      ],
      role: "Solo developer — designed, built, and published the app end-to-end.",
    },

    // ── 5. CAMPUS EVENT MANAGEMENT (DBMS) ──
    {
      title: "Campus Event Management System",
      tagline:
        "Role-based event and club management platform built for a DBMS coursework project.",
      category: "Full-Stack · Coursework",
      context: "Coursework · Northeastern",
      techPreview: ["React", "Express", "MySQL", "JWT"],
      links: [
        {
          type: "github",
          url: "https://github.com/yashasuttangi/campus_event_management",
        },
      ],
      fullDescription: [
        "A full-stack web application built for a Database Management Systems coursework project — designed to manage campus events, clubs, and members with role-based access controls.",
        "While the project scope was set by coursework, I took the opportunity to build it as a production-style application: separated frontend and backend services, JWT authentication, normalized relational schema, and modular API design. The result is a cleanly-architected reference implementation of CRUD-heavy multi-role systems.",
      ],
      features: [
        "Three user roles: Student, Club Lead, Admin — each with distinct dashboards",
        "JWT-based authentication and protected API routes",
        "Event creation, registration, and notification flows",
        "Club management with members and lead designation",
        "Normalized MySQL schema with sample seed data",
      ],
      fullStack: [
        {
          category: "Frontend",
          items: ["React", "Vite", "Tailwind CSS", "Context API"],
        },
        { category: "Backend", items: ["Node.js", "Express", "JWT"] },
        { category: "Database", items: ["MySQL"] },
      ],
      role: "Solo developer — full-stack implementation from schema design to UI.",
    },
  ],

  // ── CONTACT ──
  contactHeading: "Let's build something",
  contactSub:
    "Open to AI Engineer and Full-Stack roles. Based in Boston, open to relocation or remote. Always up for an interesting conversation about agents, systems, or what we could build together.",
};