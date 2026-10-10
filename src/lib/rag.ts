import { faqs } from '../faq'
import { chunks, type Chunk } from '../knowledge'

const STOP = new Set(
  'a an the is are was were be been do does did has have had he his him she her it its of in on at to for from with and or but not what which who how why when where about tell me can could would should any his hamza you your yours know knows do give get'.split(
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
  still: ['inveneo', 'left', 'freelance', 'available'],
  current: ['inveneo', 'freelance', 'available', 'building'],
  currently: ['inveneo', 'freelance', 'available', 'building'],
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

const K1 = 1.4
const B = 0.75

// Small BM25 index factory so the curated FAQ and the CV passages are scored the same way.
function buildIndex(texts: string[]) {
  const docs = texts.map(tokenize)
  const avgLen = docs.reduce((n, d) => n + d.length, 0) / docs.length
  const df = new Map<string, number>()
  docs.forEach((d) => new Set(d).forEach((t) => df.set(t, (df.get(t) ?? 0) + 1)))
  return (query: string[], i: number) => {
    const doc = docs[i]
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
}

const chunkScore = buildIndex(chunks.map((c) => `${c.title} ${c.title} ${c.text}`))
const faqScore = buildIndex(faqs.map((f) => `${f.q} ${f.q} ${f.alts.join(' ')}`))

export type Hit = { chunk: Chunk; score: number }

export type RagResult = {
  query: string
  tokens: string[]
  hits: Hit[]
  answer: string
  grounded: boolean
  /** faq = curated answer, chunks = quoted from CV passages, none = not covered */
  kind: 'faq' | 'chunks' | 'none'
  /** closest answerable questions, shown when nothing matched */
  related: string[]
}

const MIN_CHUNK = 2.2
const MIN_FAQ = 2.4

export function ask(query: string, k = 3): RagResult {
  const base = tokenize(query)
  const tokens = expand(base)

  const faqRanked = faqs
    .map((faq, i) => ({ faq, score: faqScore(tokens, i) }))
    .sort((a, b) => b.score - a.score)

  const chunkRanked = chunks
    .map((chunk, i) => ({ chunk, score: chunkScore(tokens, i) }))
    .sort((a, b) => b.score - a.score)

  const bestFaq = faqRanked[0]
  const related = faqRanked.filter((f) => f.score > 0).slice(0, 3).map((f) => f.faq.q)

  // 1. Curated answer wins when the question clearly matches one.
  const topChunk = chunkRanked[0]?.score ?? 0
  if (bestFaq && bestFaq.score >= MIN_FAQ && bestFaq.score * 3 >= topChunk) {
    const hits = bestFaq.faq.sources
      .map((id) => chunkRanked.find((c) => c.chunk.id === id))
      .filter((h): h is Hit => !!h)
      .map((h) => ({ chunk: h.chunk, score: Math.max(h.score, 1) }))
    return { query, tokens: base, hits, answer: bestFaq.faq.a, grounded: true, kind: 'faq', related: [] }
  }

  // 2. Otherwise quote the best-matching CV passages.
  const ranked = chunkRanked.slice(0, k).filter((h) => h.score > 0)
  const top = ranked[0]
  if (!top || top.score < MIN_CHUNK) {
    return {
      query,
      tokens: base,
      hits: [],
      grounded: false,
      kind: 'none',
      related: related.length ? related : ['What AI experience do you have?', 'Are you available for projects?', 'What are you building right now?'],
      answer: "I don't have a good answer for that, and I won't guess. Here are the closest things I can answer, or you can send the question to me directly.",
    }
  }

  const qset = new Set(tokens)
  const sentences = ranked
    .filter((h) => h.score >= top.score * 0.45)
    .flatMap((h, idx) =>
      h.chunk.text
        .split(/(?<=[.!?])\s+/)
        .map((s, pos) => ({ s, idx, pos, overlap: tokenize(s).filter((t) => qset.has(t)).length })),
    )
    .filter((x) => x.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 3)
    .sort((a, b) => a.idx - b.idx || a.pos - b.pos)

  const body = sentences.length ? sentences : [{ s: top.chunk.text.split(/(?<=[.!?])\s+/)[0], idx: 0, pos: 0 }]
  const answer = body.map((x) => `${x.s} [${x.idx + 1}]`).join(' ')
  return { query, tokens: base, hits: ranked, answer, grounded: true, kind: 'chunks', related: [] }
}
