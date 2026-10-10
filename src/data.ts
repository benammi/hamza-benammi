export const profile = {
  name: 'Hamza Benammi',
  title: 'Senior Software Engineer',
  location: 'Marrakesh, Morocco',
  email: 'benammihamza@gmail.com',
  github: 'https://github.com/benammi',
  linkedin: 'https://www.linkedin.com/in/hamza-benammi',
  cv: '/Hamza_Benammi_Senior_Software_Engineer.pdf',
  summary:
    '8+ years across networks, backend, cloud and mobile. Today I build RAG assistants, n8n automations and AI products that remove manual work, and I ship them with the discipline of a production engineer.',
  statement:
    'I turn slow, manual work into reliable AI-powered systems, and I ship them with the discipline of an engineer who has run production for years.',
}

export const rotator = ['RAG assistants', 'n8n automations', 'serverless backends', 'multilingual AI apps', 'mobile apps']

export const stats = [
  { to: 8, suffix: '+', label: 'years building software' },
  { to: 2, suffix: '', label: 'SaaS platforms led end to end' },
  { to: 6, suffix: '', label: 'AI & automation projects in flight' },
  { to: 3, suffix: '', label: 'working languages: AR, FR, EN' },
]

export const workflow = [
  { n: '01', title: 'I write the spec', text: 'Architecture, API contracts, data flows and acceptance criteria come from me, before any agent runs.', who: 'human' },
  { n: '02', title: 'Agents do the volume', text: 'Scaffolding, refactors, test generation and docs go to AI agents, in parallel and fast.', who: 'ai' },
  { n: '03', title: 'Tests are the gate', text: 'Unit, API, E2E and manual checks decide what ships. Nothing merges on vibes.', who: 'both' },
  { n: '04', title: 'I review every diff', text: 'Security, RBAC, cost, failure modes and edge cases: the judgement that years in production teach.', who: 'human' },
]

export const principles = [
  { k: 'Experience is the multiplier', v: 'AI makes writing code cheap. Knowing what to build, what breaks at scale and what is safe to ship still takes years.' },
  { k: 'Fundamentals, not just prompts', v: 'Networking, Linux, databases and cloud internals let me debug what an agent got wrong instead of guessing.' },
  { k: 'AI proposes, humans approve', v: 'Every system I design keeps a human in the loop for risky decisions, with sources, audit trails and a dry-run mode.' },
]

export type Building = {
  name: string
  status: string
  blurb: string
  points: string[]
  stack: string[]
}

// Unreleased work is described by what it does, not by client or product names.
export const building: Building[] = [
  {
    name: 'Top in Morocco',
    status: 'In development · pilot deployed',
    blurb: 'An AI travel guide and trip planner for Morocco that understands English, French, Arabic and Darija.',
    points: [
      'Natural-language search and day-by-day trip planning with budget, party size and transport estimates.',
      'Data pipeline from open data into PostGIS, deduplicated and validated. AI proposes, sources decide: it never invents places or prices.',
      'Hexagonal Node API, hybrid keyword + vector retrieval, local LLMs on Ollama, CI with auto-deploy.',
    ],
    stack: ['Node.js', 'PostgreSQL / PostGIS', 'pgvector', 'Ollama', 'Next.js'],
  },
  {
    name: 'Content automation on n8n',
    status: 'In development · dry-run verified',
    blurb: 'A reusable, local-first n8n system that turns a company profile into researched, quality-checked, approved content.',
    points: [
      'Idea scoring, sourced research, article and per-platform social drafts, then automated QA and revision loops.',
      'Human approval gate and immutable, versioned artifacts with hashes. Nothing publishes without sign-off.',
      'Docker stack, 13 exported workflows, fail-closed dry-run mode and a test suite.',
    ],
    stack: ['n8n', 'Docker', 'PostgreSQL', 'LLM APIs', 'WordPress / Next.js adapters'],
  },
  {
    name: 'Private AI for service businesses',
    status: 'Freelance · AI operations',
    blurb: 'Private, source-cited knowledge assistants and workflow automation for teams drowning in email, documents and handoffs.',
    points: [
      'Find the costliest repetitive workflow first, then automate it with human approval where it matters.',
      'Permission-aware assistants on private or open-source models when confidentiality requires it.',
      'Integrations with the tools a team already uses: email, CRM, documents and reporting.',
    ],
    stack: ['RAG', 'Node.js', 'Python', 'n8n', 'AWS'],
  },
  {
    name: 'Law-firm SaaS for Morocco',
    status: 'In development · private pilot',
    blurb: 'A bilingual (Arabic RTL and French) practice-management platform with court monitoring and AI that always defers to a lawyer.',
    points: [
      '.NET / C# API on PostgreSQL, a background worker for court-calendar monitoring and a Next.js live app.',
      'Role-based access, audit trail, backups with restore verification and a one-command local pilot.',
      '200+ automated tests across backend, frontend and browser gates.',
    ],
    stack: ['C# / .NET', 'PostgreSQL', 'Next.js', 'Docker', 'Playwright'],
  },
  {
    name: 'Exception-driven vertical SaaS',
    status: 'Prototypes · accounting & HR',
    blurb: 'Morocco-first accounting and HR platforms where AI finishes routine work and escalates only the ambiguous cases.',
    points: [
      'A guided payroll story: safe exceptions resolved automatically, ambiguous ones routed to a human, confirmation required before payroll.',
      'Role-aware interfaces for firm staff, clients and employees, in French and Arabic.',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Recharts'],
  },
  {
    name: 'Fitness platform · web + mobile',
    status: 'In development',
    blurb: 'A coach-and-athlete platform with a shared domain layer across API, web and a native-feeling mobile app.',
    points: [
      'NestJS API, Next.js web and an Expo React Native app in one pnpm / Turborepo monorepo.',
      'Shared validation, types, design tokens and a program-generation engine used by every client.',
    ],
    stack: ['React Native (Expo)', 'NestJS', 'Next.js', 'Prisma', 'Zod'],
  },
]

export type Case = {
  name: string
  org: string
  problem: string
  built: string[]
  stack: string[]
  mock: 'audit' | 'fix' | 'cli'
}

export const caseStudies: Case[] = [
  {
    name: 'Accessibility audit platform',
    org: 'Stryve · Inveneo (Vially)',
    problem: 'Teams needed repeatable WCAG audits of complex, authenticated websites, with evidence they could track across scans, not one-off reports.',
    built: [
      'Audit engine on Selenium, Playwright and Node.js: authenticated sessions, device simulation, custom criteria, screenshots, multi-page runs.',
      'Serverless workflows on Lambda, API Gateway, S3, DynamoDB and CloudFront for scanning, monitoring, reporting and analytics.',
      'Issue lifecycle logic that closes resolved findings and reopens recurring ones across repeated scans.',
      'Stripe billing: plan selection, upgrades, add-ons and tax previews.',
    ],
    stack: ['Node.js', 'TypeScript', 'AWS Lambda', 'DynamoDB', 'Playwright', 'Stripe'],
    mock: 'audit',
  },
  {
    name: 'AI remediation service',
    org: 'Inveneo',
    problem: 'Findings told developers what was wrong but not how to fix it. Fixing took research on every issue.',
    built: [
      'Amazon Bedrock RAG API that returns remediation guidance and code-fix suggestions for audit findings.',
      'Knowledge-base mode for grounded answers plus a direct-model mode, selectable per request.',
      'OpenAPI-documented, authenticated and covered by contract and validation tests.',
    ],
    stack: ['Amazon Bedrock', 'RAG', 'AWS Lambda', 'API Gateway', 'OpenAPI'],
    mock: 'fix',
  },
  {
    name: 'Audit CLI & automation packages',
    org: 'Inveneo',
    problem: 'Audits had to run the same way from a laptop, a pipeline or a scheduled job.',
    built: ['Reusable Node.js command-line packages exposing consistent commands.', 'Designed for CI/CD pipelines and other automation systems.'],
    stack: ['Node.js CLI', 'CI/CD', 'Developer tooling'],
    mock: 'cli',
  },
]

export const offers = [
  { tag: 'AI', title: 'A knowledge assistant on your documents', text: 'A RAG assistant that answers from your own files and cites its sources. Private or open-source models when data must stay in-house.' },
  { tag: 'Automation', title: 'Workflows that run themselves', text: 'n8n and custom automation for email, documents, CRM and reporting, with human approval where a mistake would cost you.' },
  { tag: 'Backend', title: 'A serverless backend or SaaS MVP', text: 'AWS Lambda, DynamoDB or PostgreSQL, auth and RBAC, CI/CD and tests. From idea to something you can charge for.' },
  { tag: 'Apps', title: 'Web and mobile products', text: 'React and Next.js, React Native, and C# / .NET. One team-minded engineer across the stack.' },
]

export const process = [
  { n: '1', t: 'A short call', d: 'You tell me which manual process costs the most time.' },
  { n: '2', t: 'A 3-point plan', d: 'What to automate first, the expected benefit and a practical path.' },
  { n: '3', t: 'Weekly increments', d: 'Working software every week, tested and demoed.' },
  { n: '4', t: 'Handover', d: 'Docs, runbooks and support so your team owns it.' },
]

export const experience = [
  {
    company: 'Freelance & personal',
    role: 'AI & automation engineer',
    period: 'Ongoing',
    points: [
      'Building RAG assistants, n8n content-automation pipelines and multilingual AI products for service businesses and early-stage SaaS.',
      'Delivering web and mobile apps with React, Next.js, React Native and C# / .NET.',
    ],
  },
  {
    company: 'Inveneo',
    role: 'AWS Engineer · Senior Backend & Technical Lead',
    period: '2025 – now',
    points: [
      'Lead backend and business logic for Vially: Node.js services and AWS serverless workflows.',
      'Built a Bedrock RAG service that suggests remediation and code fixes for audit findings.',
      'Define architecture, API contracts and data flows; coordinate with frontend engineers.',
      'Design DynamoDB schemas, CloudFormation infrastructure and RBAC middleware.',
      'Plan sprints in Jira, review implementation, support defect triage and root-cause analysis.',
    ],
  },
  {
    company: 'Stryve',
    role: 'AWS Engineer · Backend Platform & Team Lead',
    period: '2022 – 2025',
    points: [
      'Led backend delivery for an enterprise accessibility SaaS across dev, staging, pre-production and production.',
      'Built Lambda, API Gateway, S3, DynamoDB, CloudFront and CodePipeline services.',
      'Built multi-service architectures with Docker and Kubernetes.',
      'Monitoring, alerting and scan analytics; investigated production issues through logs and cloud data.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Python data automation',
    period: '2022',
    points: ['Python desktop app that automated web data collection, cleaning and export for a vehicle-pricing site, replacing a manual process.'],
  },
  {
    company: 'Profonde Solution',
    role: 'Full-stack Developer · Enterprise ERP',
    period: '2021 – 2022',
    points: ['Backend modules in PHP / Laravel and interactive features in Vue.js and Livewire for a large multi-module ERP.', 'PostgreSQL data models in an Agile / Scrum team.'],
  },
  {
    company: 'Freelance',
    role: 'Web Developer',
    period: '2018 – 2021',
    points: ['Websites and web applications for clients, from requirements to deployment and support.'],
  },
]

export const pipeline = [
  { id: 'client', label: 'Client / CLI', sub: 'dashboard, CI job' },
  { id: 'api', label: 'API Gateway', sub: 'REST + auth' },
  { id: 'fn', label: 'Lambda', sub: 'Node.js services' },
  { id: 'scan', label: 'Browser workers', sub: 'Playwright / Selenium' },
  { id: 'data', label: 'DynamoDB + S3', sub: 'results, evidence' },
]

export const marquee = [
  'Amazon Bedrock', 'RAG', 'n8n', 'Ollama', 'AI agents', 'Prompt engineering', 'Node.js', 'TypeScript', 'AWS Lambda', 'DynamoDB', 'React Native', 'C# / .NET', 'Next.js', 'PostgreSQL', 'Playwright', 'Docker', 'Kubernetes', 'CI/CD', 'Python',
]

export const skills: Record<string, string[]> = {
  AI: ['Amazon Bedrock', 'RAG', 'Ollama', 'n8n', 'Prompt engineering', 'Fine-tuning'],
  Languages: ['TypeScript', 'JavaScript', 'Node.js', 'Python', 'C#', 'PHP', 'SQL'],
  Cloud: ['Lambda', 'API Gateway', 'S3', 'DynamoDB', 'CloudFront', 'CloudFormation', 'CodePipeline', 'Docker', 'Kubernetes'],
  Mobile: ['React Native (Expo)', 'C#'],
  Data: ['PostgreSQL', 'PostGIS', 'DynamoDB', 'MySQL'],
  Testing: ['Jest', 'Vitest', 'Cypress', 'Playwright', 'Selenium', 'Postman'],
  Frontend: ['React', 'Next.js', 'Vue.js', 'Livewire'],
}

export const education = [
  { school: 'ISTA NTIC', degree: 'Diploma in Software Development', period: '2016 – 2018' },
  { school: 'ISIM', degree: 'Diploma in IT Maintenance, Support & Networks', period: '2013 – 2015' },
]

export const languages = ['Arabic', 'French', 'English']
