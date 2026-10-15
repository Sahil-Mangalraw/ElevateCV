import { AnalysisResult } from '../types';

export const SAMPLE_RESUME_SWE = `ALEX CHEN
San Jose, CA | alex.chen@example.edu | (555) 234-5678 | linkedin.com/in/alexchen | github.com/alexchen-dev

EDUCATION
University of California, Davis
Bachelor of Science in Computer Science | Expected Graduation: June 2026
GPA: 3.75 / 4.00
Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Web Development, Computer Networks

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, C++, SQL, HTML/CSS
Frameworks & Libraries: React, Node.js, Express, Tailwind CSS, Next.js, Redux
Developer Tools: Git, GitHub, VS Code, Postman, Docker, Vite, Jest
Concepts: RESTful APIs, Component-Driven Development, Relational Databases, Agile/Scrum

PROJECTS
CampusBook — Student Marketplace Platform (TypeScript, React, Node.js, PostgreSQL)
- Developed a full-stack student marketplace enabling over 450 active campus users to buy and sell textbooks and electronics securely.
- Built responsive client interfaces using React 19, TypeScript, and Tailwind CSS with sub-200ms page transitions.
- Designed 14 RESTful API endpoints in Express with JWT authentication and PostgreSQL transactions to handle concurrent purchases.
- Integrated automated end-to-end and unit testing with Jest achieving 82% code coverage across critical user flows.

AlgoVisualizer — Interactive Algorithm Learning Tool (React, Canvas API, Web Workers)
- Built an interactive web application helping undergraduate students visualize Sorting (Merge, Quick, Heap) and Graph algorithms (Dijkstra, BFS, DFS).
- Offloaded heavy computational pathfinding loops to background Web Workers to maintain smooth 60 FPS animation playback.
- Open-sourced the repository with 120+ GitHub stars; utilized by 3 university teaching assistants in weekly computer science discussion sections.

EXPERIENCE
Associated Students IT Department — Web Developer Intern
Davis, CA | September 2025 – Present
- Maintained and enhanced 4 internal web portals used daily by 15,000+ university students and faculty members.
- Migrated legacy jQuery frontends to modular React components, reducing bundle load times by 34%.
- Collaborated in a 5-member Agile sprint team with bi-weekly demos, code reviews, and Git flow releases.

CAMPUS & LEADERSHIP
- ACM Student Chapter — Technical Workshop Coordinator (Conducted 4 hands-on Git & React workshops for 100+ freshmen).
- HackDavis 2025 — 2nd Place Winner (Best Civic Tech Hack, 800+ participants).`;

export const SAMPLE_JOB_SWE = {
  title: 'Junior Software Engineer (Full-Stack / Frontend Focus)',
  description: `About the Role:
We are seeking an ambitious Junior Software Engineer to join our core product engineering team. You will work closely with senior engineers, product managers, and designers to build scalable, high-performance web applications that serve hundreds of thousands of users.

What You Will Do:
- Design, build, and maintain modern web applications using React, TypeScript, and Node.js.
- Collaborate with cross-functional teams to translate user needs and UI/UX wireframes into responsive, accessible code.
- Write clean, maintainable, and well-tested code (unit and integration tests).
- Participate in code reviews, technical architecture discussions, and continuous integration workflows.
- Troubleshoot, debug, and optimize application performance across modern desktop and mobile browsers.

Required Qualifications:
- Bachelor's degree in Computer Science, Software Engineering, or related technical field (or equivalent practical experience / graduating seniors).
- Solid foundation in computer science fundamentals: data structures, algorithms, and web architecture.
- Demonstrated proficiency with React, TypeScript, JavaScript (ES6+), and modern CSS (Tailwind or similar).
- Experience building and consuming RESTful APIs with Node.js or Express.
- Experience with Git version control and collaborative GitHub workflows.

Preferred / Nice-to-Have:
- Exposure to cloud deployment platforms (GCP, AWS, or Cloud Run) and Docker containerization.
- Familiarity with CI/CD pipelines (GitHub Actions).
- Experience with GraphQL or Next.js SSR.
- Knowledge of Web Accessibility standards (WCAG AA).
- Active open-source contributions or personal portfolio projects.`
};

export const SAMPLE_ANALYSIS_SWE: AnalysisResult = {
  id: 'sample-analysis-swe-2026',
  timestamp: new Date().toISOString(),
  jobTitle: 'Junior Software Engineer (Full-Stack / Frontend Focus)',
  jobDescription: SAMPLE_JOB_SWE.description,
  resumeText: SAMPLE_RESUME_SWE,
  overallScore: 84,
  scoreBreakdown: {
    skillsMatchScore: 88,
    experienceMatchScore: 82,
    educationMatchScore: 90,
    atsFormattingScore: 78,
    explanation: 'Calculated using objective weighted alignment: Core required technical stack (React, TypeScript, Node.js, Git) has strong evidence in both projects and internship. Cloud/Docker and CI/CD are nice-to-haves with minor gaps. This score represents content alignment, not an automated hiring decision.'
  },
  matchedSkills: [
    {
      name: 'React',
      category: 'Frontend Frameworks',
      contextInResume: 'Built CampusBook marketplace and AlgoVisualizer; migrated legacy portals to React components at Associated Students IT.'
    },
    {
      name: 'TypeScript',
      category: 'Programming Languages',
      contextInResume: 'Used throughout CampusBook student marketplace with React 19 for type-safe state and components.'
    },
    {
      name: 'Node.js & Express',
      category: 'Backend & APIs',
      contextInResume: 'Designed 14 RESTful API endpoints with Express and JWT authentication for CampusBook.'
    },
    {
      name: 'Data Structures & Algorithms',
      category: 'CS Fundamentals',
      contextInResume: 'Direct coursework and implemented sorting/graph algorithms in AlgoVisualizer tool.'
    },
    {
      name: 'Git & GitHub Collaboration',
      category: 'Version Control',
      contextInResume: 'Agile sprints with Git flow releases; open-source maintainer with 120+ GitHub stars; led university Git workshops.'
    },
    {
      name: 'Testing (Jest)',
      category: 'Quality Assurance',
      contextInResume: 'Built unit and integration test suites achieving 82% coverage on critical user flows.'
    },
    {
      name: 'Tailwind CSS',
      category: 'Styling & Design Systems',
      contextInResume: 'Developed responsive client interfaces with Tailwind CSS and sub-200ms transitions.'
    }
  ],
  missingSkills: [
    {
      name: 'CI/CD Pipelines (GitHub Actions)',
      importance: 'important',
      whyNeeded: 'The job specifically highlights CI/CD workflows and automated deployments which are not explicitly mentioned in your resume.'
    },
    {
      name: 'Cloud Services (GCP / AWS / Cloud Run)',
      importance: 'important',
      whyNeeded: 'Preferred qualification mentions cloud deployment familiarity; your resume highlights local Docker but lacks specific cloud provider references.'
    },
    {
      name: 'Web Accessibility (WCAG AA)',
      importance: 'bonus',
      whyNeeded: 'Role mentions building accessible web applications; calling out WCAG compliance or keyboard navigation would strengthen frontend qualifications.'
    },
    {
      name: 'GraphQL',
      importance: 'bonus',
      whyNeeded: 'Listed as a preferred nice-to-have skill for full-stack data fetching.'
    }
  ],
  identifiedExperience: {
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of California, Davis',
        year: 'Expected June 2026',
        relevance: 'Direct match for the CS degree requirement; graduating senior profile fits junior/entry-level posting.'
      }
    ],
    rolesAndProjects: [
      {
        title: 'Web Developer Intern',
        organization: 'Associated Students IT Department',
        highlights: 'Maintained 4 web portals for 15,000+ users, migrated legacy jQuery to React, reduced load times by 34%.',
        relevance: 'High relevance: demonstrates collaborative real-world experience, performance optimization, and agile team workflow.'
      },
      {
        title: 'CampusBook Platform Project',
        highlights: '450+ users, 14 REST APIs, PostgreSQL, Jest test coverage.',
        relevance: 'Strong evidence of full-stack architectural competence matching the role description.'
      },
      {
        title: 'AlgoVisualizer Open-Source Project',
        highlights: 'Canvas API, Web Workers, 120+ stars, pedagogical impact.',
        relevance: 'Demonstrates deep computer science algorithms knowledge and independent technical initiative.'
      }
    ]
  },
  strengths: [
    'Strong evidence of real user adoption (450+ CampusBook users, 15,000+ portal users, 120+ GitHub stars) rather than simple toy tutorial projects.',
    'Clear alignment with the required primary tech stack: React, TypeScript, Node.js, and automated testing (Jest).',
    'Demonstrated leadership and communication through ACM workshop coordination and hackathon recognition.',
    'Measurable performance outcomes cited (e.g., 34% bundle load time reduction, 82% test coverage).'
  ],
  areasForImprovement: [
    'Cloud and deployment tooling is underdeveloped: Docker is listed as a skill keyword but never integrated into project bullets.',
    'No explicit mention of CI/CD workflows, automated build scripts, or deployment pipelines which the job posting values.',
    'Accessibility standards (semantic HTML, ARIA, WCAG) are omitted despite this being a frontend-focused position.',
    'Bullet phrasing in CampusBook could emphasize team collaboration or code review standards.'
  ],
  actionableRecommendations: [
    {
      id: 'rec-1',
      title: 'Highlight CI/CD & Automated Deployment in Projects',
      action: 'Add a bullet point under CampusBook or AlgoVisualizer detailing how you configured GitHub Actions for automated linting, test execution, or deployment.',
      impact: 'Directly addresses the CI/CD qualification and proves end-to-end production engineering habits.',
      exampleSnippet: 'Configured automated CI/CD pipeline using GitHub Actions to run Jest suites and ESLint checks on every pull request.'
    },
    {
      id: 'rec-2',
      title: 'Contextualize Docker and Cloud Hosting',
      action: 'Clarify where and how Docker or cloud platforms were used in your project descriptions rather than leaving Docker stranded in the skills list.',
      impact: 'Bridges the gap between the preferred qualifications and your practical project evidence.',
      exampleSnippet: 'Containerized Express and PostgreSQL backend services with Docker Compose for consistent development and staging environments.'
    },
    {
      id: 'rec-3',
      title: 'Explicitly Mention Web Accessibility (WCAG)',
      action: 'Reference accessibility improvements made during your portal modernization work at the Associated Students IT department.',
      impact: 'Sets you apart from other junior candidates who overlook accessibility and semantic standards.',
      exampleSnippet: 'Audited and remediated UI components to adhere to WCAG 2.1 AA accessibility guidelines, improving keyboard navigation.'
    },
    {
      id: 'rec-4',
      title: 'Rephrase Action Verbs to Emphasize Architecture & Rigor',
      action: 'Replace generic verbs like "Developed" with stronger engineering verbs like "Architected", "Engineered", or "Implemented".',
      impact: 'Signals higher technical maturity and ownership of technical decisions.',
      exampleSnippet: 'Architected full-stack student exchange platform utilizing React 19 and Express with atomic transaction handling.'
    },
    {
      id: 'rec-5',
      title: 'Add a Short Technical Summary Statement',
      action: 'Place a concise 2-sentence summary below your contact info emphasizing full-stack TypeScript/React expertise and graduating status.',
      impact: 'Helps human recruiters instantly classify your profile within 6 seconds of scanning.',
      exampleSnippet: 'Graduating CS senior specializing in full-stack TypeScript and React web applications, with proven internship experience maintaining platforms for 15,000+ active users.'
    }
  ],
  bulletPointImprovements: [
    {
      originalBullet: 'Developed a full-stack student marketplace enabling over 450 active campus users to buy and sell textbooks and electronics securely.',
      critique: '"Developed" is passive and lacks technical depth regarding how security, performance, or transactions were handled.',
      improvedBullet: 'Architected full-stack marketplace in TypeScript and React, implementing secure PostgreSQL transactions and JWT auth for 450+ campus buyers and sellers.',
      styleApplied: 'Technical and impact-focused'
    },
    {
      originalBullet: 'Maintained and enhanced 4 internal web portals used daily by 15,000+ university students and faculty members.',
      critique: '"Maintained and enhanced" is vague about your personal contribution and measurable outcome.',
      improvedBullet: 'Spearheaded frontend reliability across 4 campus web portals serving 15,000+ daily active users, resolving [N] reported UI defects within 48-hour SLAs.',
      styleApplied: 'Achievement-oriented'
    },
    {
      originalBullet: 'Built responsive client interfaces using React 19, TypeScript, and Tailwind CSS with sub-200ms page transitions.',
      critique: 'Strong technical detail, but can be tightened for punchier scannability.',
      improvedBullet: 'Engineered responsive interfaces utilizing React 19, TypeScript, and Tailwind CSS, maintaining sub-200ms page transitions and WCAG AA contrast compliance.',
      styleApplied: 'Concise and professional'
    }
  ],
  atsReadability: {
    score: 88,
    observations: [
      'Standard standard reverse-chronological section headers (EDUCATION, TECHNICAL SKILLS, PROJECTS, EXPERIENCE) are easily parsed by ATS systems.',
      'Contact information is clean, single-line, and does not contain problematic nested tables or graphics.',
      'Bullet points start with strong action verbs and maintain consistent grammatical tense.'
    ],
    detectedSections: ['Contact Header', 'Education', 'Technical Skills', 'Projects', 'Experience', 'Campus & Leadership'],
    formattingRisks: [
      'Ensure dates use consistent month/year format across both Experience and Education (e.g., "September 2025 – Present" vs "Expected June 2026").',
      'Avoid multi-column tables if submitting directly to older Taleo or Workday ATS portals; keep plain text vertical flow.'
    ],
    recommendations: [
      'Keep resume to exactly 1 single page for entry-level / graduating student profiles.',
      'Submit as standard PDF exported directly from Word or LaTeX, not scanned image or flattened raster PDF.'
    ]
  },
  learningRoadmap: [
    {
      milestone: 'Week 1: Bridge CI/CD Fundamentals',
      timeframe: 'Days 1 – 7',
      focusSkills: ['GitHub Actions', 'Automated Testing in CI'],
      suggestedAction: 'Create a `.github/workflows/ci.yml` in your CampusBook repository that triggers `npm test` and `npm run lint` on all pull requests.',
      suggestedResourceOrProject: 'Official GitHub Actions docs + free GitHub Skills "Continuous Integration" course.'
    },
    {
      milestone: 'Week 2: Cloud Deployment & Containers',
      timeframe: 'Days 8 – 14',
      focusSkills: ['Google Cloud Run', 'Docker Containerization'],
      suggestedAction: 'Deploy your Express backend or full-stack Next.js app to Google Cloud Run using a multi-stage Dockerfile.',
      suggestedResourceOrProject: 'Google Cloud Free Tier & Cloud Run quickstart for Node.js.'
    },
    {
      milestone: 'Week 3: Web Accessibility (a11y) Certification',
      timeframe: 'Days 15 – 21',
      focusSkills: ['WCAG 2.1 AA', 'Axe Core', 'Keyboard Navigation'],
      suggestedAction: 'Run Lighthouse and Axe Core audits on your portfolio and projects; document before/after score improvements.',
      suggestedResourceOrProject: 'web.dev/learn/accessibility by Google Chrome team.'
    },
    {
      milestone: 'Week 4: Mock Interview & Resume Tailoring',
      timeframe: 'Days 22 – 30',
      focusSkills: ['STAR Method Articulation', 'System Design Basics'],
      suggestedAction: 'Practice walking through your CampusBook database schema and concurrency handling using STAR (Situation, Task, Action, Result).',
      suggestedResourceOrProject: 'LeetCode / NeetCode roadmap & peer mock interviews.'
    }
  ],
  isDemo: true
};
