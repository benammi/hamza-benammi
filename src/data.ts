export const profile = {
  name: 'Hamza Benammi',
  title: 'Senior Software Engineer',
  location: 'Marrakesh, Morocco',
  email: 'benammihamza@gmail.com',
  github: 'https://github.com/benammi',
  linkedin: 'https://www.linkedin.com/in/hamza-benammi',
  cv: '/Hamza_Benammi_Senior_Software_Engineer.pdf',
  summary:
    'I design and ship backend platforms and AWS serverless systems for SaaS products: the business logic, APIs, data models, security and delivery pipelines behind them.',
}

export const stats = [
  { value: '8+', label: 'years shipping software' },
  { value: '2', label: 'SaaS platforms led end to end' },
  { value: '4', label: 'environments per release path' },
]

export const expertise = [
  { title: 'Backend architecture', text: 'Node.js, TypeScript, Laravel. Service boundaries, REST contracts, business logic.' },
  { title: 'AWS & IaC', text: 'Lambda, API Gateway, DynamoDB, S3, CloudFront, CloudFormation.' },
  { title: 'Security & data', text: 'RBAC and permissions middleware for multi-tenant SaaS. DynamoDB access patterns, PostgreSQL.' },
  { title: 'Quality engineering', text: 'Unit, API, integration and E2E with Jest, Vitest, Cypress and Playwright.' },
  { title: 'Technical leadership', text: 'Sprint planning, estimation, code review, defect triage and root cause.' },
  { title: 'AI engineering', text: 'Amazon Bedrock, RAG, fine-tuning experiments and local agents with Ollama.' },
]

export const pipeline = [
  { id: 'client', label: 'Client / CLI', sub: 'dashboard, CI job' },
  { id: 'api', label: 'API Gateway', sub: 'REST + auth' },
  { id: 'fn', label: 'Lambda', sub: 'Node.js services' },
  { id: 'scan', label: 'Browser workers', sub: 'Playwright / Selenium' },
  { id: 'data', label: 'DynamoDB + S3', sub: 'results, evidence' },
]

export const caseStudies = [
  {
    name: 'Accessibility audit platform',
    org: 'Stryve · Inveneo (Vially)',
    problem:
      'Teams needed repeatable WCAG audits of complex, authenticated websites, with evidence they could track across scans, not one-off reports.',
    built: [
      'Audit engine on Selenium, Playwright and Node.js: authenticated sessions, device simulation, custom criteria, screenshots, multi-page runs.',
      'Serverless workflows on Lambda, API Gateway, S3, DynamoDB and CloudFront for scanning, monitoring, reporting and analytics.',
      'Issue lifecycle logic that closes resolved findings and reopens recurring ones across repeated scans.',
      'Stripe billing: plan selection, upgrades, add-ons and tax previews.',
    ],
    stack: ['Node.js', 'TypeScript', 'AWS Lambda', 'DynamoDB', 'Playwright', 'Stripe'],
  },
  {
    name: 'Audit CLI & automation packages',
    org: 'Inveneo',
    problem: 'Audits had to run the same way from a laptop, a pipeline or a scheduled job.',
    built: [
      'Reusable Node.js command-line packages exposing consistent commands.',
      'Designed for CI/CD pipelines and other automation systems.',
    ],
    stack: ['Node.js CLI', 'CI/CD', 'Developer tooling'],
  },
  {
    name: 'Local & cloud AI systems',
    org: 'Personal R&D',
    problem: 'Explore where retrieval and local models are practical in real workflows.',
    built: [
      'RAG pipelines and fine-tuning experiments on Amazon Bedrock.',
      'Local assistants on Ollama: web-aware agents, code generation, document workflows.',
    ],
    stack: ['Amazon Bedrock', 'RAG', 'Ollama'],
  },
]

export const experience = [
  {
    company: 'Inveneo',
    role: 'AWS Engineer · Senior Backend & Technical Lead',
    period: '2025 – now',
    points: [
      'Lead backend and business logic for Vially: Node.js services and AWS serverless workflows.',
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
    points: [
      'Python desktop app that automated web data collection, cleaning and export for a vehicle-pricing site, replacing a manual process.',
    ],
  },
  {
    company: 'Profonde Solution',
    role: 'Full-stack Developer · Enterprise ERP',
    period: '2021 – 2022',
    points: [
      'Backend modules in PHP / Laravel and interactive features in Vue.js and Livewire for a large multi-module ERP.',
      'PostgreSQL data models in an Agile / Scrum team.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Web Developer',
    period: '2018 – 2021',
    points: ['Websites and web applications for clients, from requirements to deployment and support.'],
  },
]

export const skills: Record<string, string[]> = {
  Languages: ['TypeScript', 'JavaScript', 'Node.js', 'Python', 'PHP', 'SQL'],
  Cloud: ['Lambda', 'API Gateway', 'S3', 'DynamoDB', 'CloudFront', 'CloudWatch', 'CloudFormation', 'CodePipeline', 'Docker', 'Kubernetes'],
  Data: ['DynamoDB', 'PostgreSQL', 'MySQL'],
  Testing: ['Jest', 'Vitest', 'Cypress', 'Playwright', 'Selenium', 'Puppeteer', 'Postman'],
  Frontend: ['React', 'Vue.js', 'Livewire'],
  AI: ['Amazon Bedrock', 'RAG', 'Ollama'],
}

export const education = [
  { school: 'ISTA NTIC', degree: 'Diploma in Software Development', period: '2016 – 2018' },
  { school: 'ISIM', degree: 'Diploma in IT Maintenance, Support & Networks', period: '2013 – 2015' },
]

export const languages = ['Arabic', 'French', 'English']
