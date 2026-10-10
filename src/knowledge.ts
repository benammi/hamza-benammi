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
    text: 'Hamza programs in JavaScript, TypeScript, Node.js, Python, PHP and SQL, with earlier experience in Java, C# and ASP.NET. He works with Express, Laravel, Vue.js, Livewire and React, and databases including PostgreSQL, DynamoDB and MySQL.',
  },
  {
    id: 'contact',
    title: 'Contact',
    source: 'CV · Header',
    text: 'You can contact Hamza by email at benammihamza@gmail.com. He is on GitHub at github.com/benammi and LinkedIn at linkedin.com/in/hamza-benammi. He is located in Marrakesh, Morocco.',
  },
]

export const suggestions = [
  'What AI and RAG work has he done?',
  'Has he led a team?',
  'How does he use automation?',
  'Does he know AWS serverless?',
  'What is his networking background?',
]
