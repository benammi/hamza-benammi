import { chunks, type Chunk } from '../knowledge'

const STOP = new Set(
  'a an the is are was were be been do does did has have had he his him she her it its of in on at to for from with and or but not what which who how why when where about tell me can could would should any his hamza'.split(
    ' ',
  ),
)

// Light query expansion so "AI" also finds Bedrock, Ollama and agents, etc.
const SYNONYMS: Record<string, string[]> = {
  ai: ['rag', 'bedrock', 'ollama', 'llm', 'agent', 'prompt'],
  llm: ['ai', 'bedrock', 'ollama'],
  rag: ['retrieval', 'bedrock', 'ollama', 'ai'],
  agent: ['ai', 'ollama', 'automation'],
  automation: ['automate', 'cli', 'ci', 'pipeline', 'scraping'],
  lead: ['leader', 'leadership', 'team', 'sprint', 'estimate'],
  team: ['lead', 'leadership', 'scrum', 'agile'],
  manage: ['lead', 'sprint', 'jira'],
  aws: ['lambda', 'dynamodb', 'cloudformation', 'serverless'],
  serverless: ['lambda', 'aws', 'dynamodb'],
  cloud: ['aws', 'lambda', 'serverless', 'kubernetes'],
  network: ['networking', 'networks', 'isim', 'owncloud', 'linux'],
  networking: ['network', 'networks', 'isim', 'owncloud'],
  test: ['testing', 'jest', 'cypress', 'playwright', 'quality'],
  payment: ['stripe', 'billing'],
  billing: ['stripe'],
  hire: ['contact', 'email'],
  email: ['contact'],
  where: ['marrakesh', 'morocco', 'located', 'remote'],
  based: ['marrakesh', 'morocco', 'located', 'remote'],
  live: ['marrakesh', 'morocco', 'located'],
  study: ['education', 'diploma'],
  school: ['education', 'diploma'],
  database: ['dynamodb', 'postgresql', 'mysql'],
  security: ['rbac', 'authentication', 'permissions'],
  n8n: ['automation', 'workflow', 'content', 'approval'],
  workflow: ['n8n', 'automation', 'automate'],
  mobile: ['react', 'native', 'expo', 'c#', 'fitness'],
  app: ['mobile', 'web', 'react', 'next'],
  available: ['freelance', 'projects', 'contracts', 'hire', 'contact'],
  availability: ['available', 'freelance', 'projects', 'contracts'],
  freelance: ['projects', 'contracts', 'available'],
  project: ['building', 'development', 'projects'],
  building: ['development', 'projects', 'top', 'morocco'],
  travel: ['top', 'morocco', 'trip', 'guide'],
  legal: ['law', 'firm', 'saas'],
  law: ['legal', 'firm', 'saas'],
  language: ['arabic', 'french', 'english', 'darija'],
}

function stem(w: string) {
  return w.replace(/(ing|ed|es|s)$/, '')
}

export function tokenize(text: string): string[] {
  return (text.toLowerCase().match(/[a-z0-9+#.]+/g) ?? [])
    .map((t) => t.replace(/^\.+|\.+$/g, ''))
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem)
}

function expand(tokens: string[]): string[] {
  const out = new Set(tokens)
  tokens.forEach((t) => {
    for (const [k, v] of Object.entries(SYNONYMS)) {
      if (stem(k) === t) v.forEach((s) => out.add(stem(s)))
    }
  })
  return [...out]
}

// Precompute BM25 stats once.
const docs = chunks.map((c) => tokenize(`${c.title} ${c.title} ${c.text}`))
const avgLen = docs.reduce((n, d) => n + d.length, 0) / docs.length
const df = new Map<string, number>()
docs.forEach((d) => new Set(d).forEach((t) => df.set(t, (df.get(t) ?? 0) + 1)))

const K1 = 1.4
const B = 0.75

function bm25(query: string[], doc: string[]) {
  let score = 0
  for (const q of query) {
    const f = doc.filter((t) => t === q).length
    if (!f) continue
    const n = df.get(q) ?? 0
    const idf = Math.log(1 + (docs.length - n + 0.5) / (n + 0.5))
    score += (idf * f * (K1 + 1)) / (f + K1 * (1 - B + (B * doc.length) / avgLen))
  }
  return score
}

export type Hit = { chunk: Chunk; score: number }

export type RagResult = {
  query: string
  tokens: string[]
  hits: Hit[]
  answer: string
  grounded: boolean
}

const MIN_SCORE = 2.2

export function ask(query: string, k = 3): RagResult {
  const base = tokenize(query)
  const tokens = expand(base)
  const ranked = chunks
    .map((chunk, i) => ({ chunk, score: bm25(tokens, docs[i]) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .filter((h) => h.score > 0)

  const top = ranked[0]
  if (!top || top.score < MIN_SCORE) {
    return {
      query,
      tokens,
      hits: ranked,
      grounded: false,
      answer:
        "That's not in Hamza's CV, so I won't guess. Try asking about his AI/RAG work, AWS, leadership, automation or education — or email him directly.",
    }
  }

  // Extractive answer: pick the sentences that best match the query from the top chunks.
  const qset = new Set(tokens)
  const sentences = ranked
    .filter((h) => h.score >= top.score * 0.45)
    .flatMap((h, idx) =>
      h.chunk.text
        .split(/(?<=[.!?])\s+/)
        .map((s, pos) => ({
          s,
          idx,
          pos,
          overlap: tokenize(s).filter((t) => qset.has(t)).length,
        })),
    )
    .filter((x) => x.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 3)
    .sort((a, b) => a.idx - b.idx || a.pos - b.pos)

  const body = sentences.length ? sentences : [{ s: top.chunk.text.split(/(?<=[.!?])\s+/)[0], idx: 0, pos: 0 }]
  const answer = body.map((x) => `${x.s} [${x.idx + 1}]`).join(' ')

  return { query, tokens: base, hits: ranked, answer, grounded: true }
}
