// Knowledge base for the "Ask my CV" RAG demo. Every fact comes from the CV.
export type Chunk = { id: string; title: string; source: string; text: string }

export const chunks: Chunk[] = [
  {
    id: 'summary',
    title: 'Profile summary',
    source: 'CV · Profile',
    text: 'Hamza Benammi is a Senior Software Engineer with 8+ years of experience designing and delivering SaaS products, backend platforms, enterprise applications, data-automation tools and cloud-native systems. He has advanced hands-on expertise in Node.js, TypeScript, Python, PHP and AWS serverless architecture. He is based in Marrakesh, Morocco and works remotely.',
  },
  {
    id: 'inveneo',
    title: 'Inveneo — Senior Backend & Technical Lead',
    source: 'CV · Experience · 2025–now',
    text: 'Since August 2025 Hamza leads backend engineering and business logic for Vially at Inveneo. He structures Node.js services and AWS serverless workflows for accessibility scanning, monitoring, reporting and analytics. He defines solution architecture, REST API contracts and data flows, and coordinates with frontend engineers. He plans sprints in Jira, reviews technical implementation and supports defect triage and root-cause analysis.',
  },
  {
    id: 'stryve',
    title: 'Stryve — Backend Platform & Team Lead',
    source: 'CV · Experience · 2022–2025',
    text: 'From November 2022 to August 2025 Hamza led backend delivery for an enterprise accessibility SaaS platform at Stryve. He defined service boundaries, shared modules, API behaviour and deployment patterns across development, staging, pre-production and production. He built cloud-native services with Node.js, TypeScript, AWS Lambda, API Gateway, S3, DynamoDB, CloudFront, CloudWatch, CodePipeline and CodeBuild. He collaborated with product, frontend, DevOps and business stakeholders and estimated timelines as a team lead.',
  },
  {
    id: 'stripe',
    title: 'Stripe billing flows',
    source: 'CV · Stryve',
    text: 'At Stryve Hamza implemented and validated Stripe billing flows including plan selection, upgrades, add-ons and tax previews. He combined backend business logic with reliable frontend integration.',
  },
  {
    id: 'audit-engine',
    title: 'Accessibility audit engine',
    source: 'CV · Projects',
    text: 'Hamza designed an automated engine that scans complex websites. It supports authenticated sessions and device simulation, runs custom accessibility criteria, captures screenshot evidence and produces structured reports for repeated audits and monitoring. It is built with Selenium, Playwright, Puppeteer and Node.js. Browser automation, website scanning and data-extraction workflows are a core strength.',
  },
  {
    id: 'lifecycle',
    title: 'Issue lifecycle & analytics',
    source: 'CV · Stryve',
    text: 'Hamza designed monitoring, alerting, media-asset reporting, scan analytics and issue-lifecycle workflows. Resolved findings are closed and recurring issues are reopened across repeated scans.',
  },
  {
    id: 'cli',
    title: 'Audit CLI & automation packages',
    source: 'CV · Projects',
    text: 'Hamza creates reusable Node.js command-line packages that automate audits and expose consistent commands. They run in CI/CD pipelines, scheduled jobs and other automation systems. Developer tooling and automation are a recurring theme of his work.',
  },
  {
    id: 'ai',
    title: 'AI, RAG & local agents',
    source: 'CV · Projects',
    text: 'Hamza has built AI-assisted systems using Amazon Bedrock and local Ollama models. The work includes retrieval-augmented generation (RAG), fine-tuning experiments, web-aware assistants, code generation and document workflows, plus prompt engineering and local AI agents. He pairs these AI skills with production engineering discipline.',
  },
  {
    id: 'automation',
    title: 'Automation & data pipelines',
    source: 'CV · Freelance 2022',
    text: 'As a freelancer in 2022 Hamza delivered a Python desktop application that automated web data collection, cleaned and normalised the extracted information and transformed it into structured data for a vehicle-pricing website. It replaced a manual data-preparation process with a reusable tool covering desktop UI, scraping automation, validation and export.',
  },
  {
    id: 'aws',
    title: 'AWS & infrastructure as code',
    source: 'CV · Skills',
    text: 'Hamza works with AWS Lambda, API Gateway, S3, DynamoDB, CloudFront, CloudWatch, CodePipeline, CodeBuild and CloudFormation. He designs DynamoDB schemas and access patterns, provisions infrastructure through CloudFormation and manual AWS configuration, and builds CI/CD pipelines. He also uses Docker and Kubernetes for service-oriented and multi-service architectures.',
  },
  {
    id: 'security',
    title: 'Security, RBAC & multi-tenancy',
    source: 'CV · Inveneo',
    text: 'Hamza implements and reviews authentication, role-based access control (RBAC) and permissions middleware for multi-tenant SaaS products. He works with PostgreSQL where relational modelling is required.',
  },
  {
    id: 'testing',
    title: 'Quality engineering',
    source: 'CV · Skills',
    text: 'Hamza has a strong quality-engineering background across unit, API, integration, end-to-end, regression and manual testing. He uses Cypress, Jest, Vitest, Selenium, Playwright, Puppeteer and Postman to protect releases and verify backend-to-frontend integration.',
  },
  {
    id: 'leadership',
    title: 'Technical leadership',
    source: 'CV · Experience',
    text: 'Hamza has held lead responsibilities at Stryve and Inveneo. He plans sprints and timelines in Jira, breaks requirements into deliverable tickets, prioritises work, reviews code, estimates delivery and supports defect triage and root-cause analysis. He works in Agile and Scrum teams.',
  },
  {
    id: 'erp',
    title: 'Enterprise ERP at Profonde Solution',
    source: 'CV · Experience · 2021–2022',
    text: 'From October 2021 to July 2022 Hamza was a full-stack developer at Profonde Solution in Marrakesh. He contributed to a large multi-module ERP platform, building backend modules in PHP and Laravel and interactive features with Vue.js and Livewire. He designed and queried PostgreSQL data models and worked in Agile Scrum with GitLab and Trello.',
  },
  {
    id: 'freelance',
    title: 'Freelance web developer',
    source: 'CV · Experience · 2018–2021',
    text: 'From October 2018 to October 2021 Hamza worked as a freelance web developer. He delivered websites and web applications for clients covering requirements discovery, implementation, testing, deployment and ongoing support.',
  },
  {
    id: 'networking',
    title: 'Networking & systems background',
    source: 'CV · Education',
    text: 'Hamza holds a diploma in IT Maintenance, Support and Networks from ISIM (2013–2015). During a 2015 traineeship at ISGA Campus Marrakech he installed and administered an OwnCloud server and a local network. This networking and Linux systems foundation shapes how he designs cloud infrastructure.',
  },
  {
    id: 'education',
    title: 'Education & languages',
    source: 'CV · Education',
    text: 'Hamza holds a Diploma in Software Development from ISTA NTIC (2016–2018) and a diploma in IT Maintenance, Support and Networks from ISIM (2013–2015). He speaks Arabic, French and English.',
  },
  {
    id: 'stack',
    title: 'Languages & frameworks',
    source: 'CV · Skills',
    text: 'Hamza programs in JavaScript, TypeScript, Node.js, Python, C#, PHP and SQL, with earlier experience in Java and ASP.NET. He works with Express, Laravel, Vue.js, Livewire and React, and databases including PostgreSQL, DynamoDB and MySQL.',
  },
  {
    id: 'top-in-morocco',
    title: 'Top in Morocco — AI travel guide',
    source: 'Projects · In development',
    text: 'Top in Morocco is an AI travel guide and trip planner for Morocco that Hamza is building. It understands English, French, Arabic and Darija. Users search in natural language and get day-by-day trip plans with budget, party size and transport estimates. A data pipeline collects places from open data into PostGIS, deduplicates and validates them, and the AI proposes while sources decide, so it never invents places or prices. The API is a hexagonal Node.js service with hybrid keyword and vector retrieval and local Ollama models.',
  },
  {
    id: 'n8n',
    title: 'Content automation on n8n',
    source: 'Projects · In development',
    text: 'Hamza is building a reusable local-first content automation system on n8n. It scores content ideas, researches them with recorded sources, writes an article and platform-specific social posts, runs automated quality checks and revision loops, and requires human approval before anything is published. Approved output is stored as immutable versioned artifacts with hashes. It runs in Docker with 13 exported workflows and a fail-closed dry-run mode. This is workflow automation with a human in the loop.',
  },
  {
    id: 'ai-venture',
    title: 'Private AI & automation for businesses',
    source: 'Freelance · AI operations',
    text: 'As a freelancer Hamza builds private, source-cited AI knowledge assistants and workflow automation for service businesses. He first finds the costliest repetitive workflow, then automates email, document, CRM and reporting handoffs with human approval. He uses private or open-source models when confidentiality requires it and integrates with the tools a team already uses. He is available for freelance projects and contracts.',
  },
  {
    id: 'legal-saas',
    title: 'Law-firm SaaS for Morocco',
    source: 'Projects · In development',
    text: 'Hamza is building a bilingual Arabic (right-to-left) and French practice-management SaaS for Moroccan law firms. The backend uses C# and .NET with PostgreSQL, a background worker monitors court calendars, and the live app uses Next.js. It has role-based access, audit trails, backup and restore verification, over 200 automated tests, and AI features that always defer to a lawyer for review.',
  },
  {
    id: 'vertical-saas',
    title: 'Accounting & HR SaaS prototypes',
    source: 'Projects · Prototypes',
    text: 'Hamza has prototyped Morocco-first accounting and HR SaaS platforms built on exception-driven AI. Routine work completes automatically from approved rules, while ambiguous or sensitive decisions are escalated to a human. The guided payroll demo resolves safe attendance exceptions automatically and requires human confirmation before payroll. They use Next.js, TypeScript and Tailwind in French and Arabic.',
  },
  {
    id: 'mobile',
    title: 'Mobile development',
    source: 'Projects & Skills',
    text: 'Hamza has mobile development experience with React Native (Expo) and C#. He is building a fitness platform for coaches and athletes as a pnpm and Turborepo monorepo with a NestJS API, a Next.js web app and an Expo React Native mobile app, sharing validation, types and a program-generation engine. He also works with C# and .NET on backend services.',
  },
  {
    id: 'ai-remediation',
    title: 'Bedrock RAG remediation service',
    source: 'CV · Inveneo',
    text: 'At Inveneo Hamza built an Amazon Bedrock RAG API that returns remediation guidance and code-fix suggestions for accessibility audit findings. It offers a knowledge-base mode for grounded answers and a direct-model mode, is documented with OpenAPI, authenticated, and covered by contract and validation tests.',
  },
  {
    id: 'contact',
    title: 'Contact',
    source: 'CV · Header',
    text: 'You can contact Hamza by email at benammihamza@gmail.com. He is on GitHub at github.com/benammi and LinkedIn at linkedin.com/in/hamza-benammi. He is located in Marrakesh, Morocco.',
  },
]

export const suggestions = [
  'What is he building right now?',
  'Can he build an n8n automation?',
  'What AI and RAG work has he done?',
  'Does he have mobile experience?',
  'Is he available for projects?',
]
