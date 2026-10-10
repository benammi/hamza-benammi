import { useEffect, useState } from 'react'
import { suggestions } from '../knowledge'
import { ask, type RagResult } from '../lib/rag'

function Typewriter({ text }: { text: string }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = setInterval(() => setN((v) => (reduce ? text.length : Math.min(v + 3, text.length))), 18)
    return () => clearInterval(id)
  }, [text])
  const shown = text.slice(0, n)
  return (
    <p className="answer">
      {shown}
      {n < text.length && <span className="caret" />}
    </p>
  )
}

const steps = ['Tokenize query', 'Retrieve (BM25 over CV chunks)', 'Rank + threshold', 'Compose cited answer']

export default function RagDemo() {
  const [value, setValue] = useState('')
  const [phase, setPhase] = useState(-1)
  const [result, setResult] = useState<RagResult | null>(null)
  const [runId, setRunId] = useState(0)

  function run(q: string) {
    const query = q.trim()
    if (!query) return
    setValue(query)
    setResult(null)
    setRunId((r) => r + 1)
    // Visible pipeline: each stage lights up in turn so visitors see how RAG works.
    steps.forEach((_, i) => setTimeout(() => setPhase(i), i * 260))
    setTimeout(() => {
      setResult(ask(query))
      setPhase(steps.length)
    }, steps.length * 260)
  }

  const max = result?.hits[0]?.score || 1

  return (
    <div className="rag glass">
      <div className="rag-head">
        <span className="live">
          <i /> live demo
        </span>
        <b>Ask anything about me</b>
        <small>retrieval runs in your browser · answers cite their source chunks</small>
      </div>

      <form
        className="rag-form"
        onSubmit={(e) => {
          e.preventDefault()
          run(value)
        }}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What is he building? Can he automate with n8n? Mobile?"
          aria-label="Ask a question about Hamza's CV"
        />
        <button type="submit" className="btn primary">
          Ask
        </button>
      </form>

      <div className="chips">
        {suggestions.map((s) => (
          <button key={s} type="button" onClick={() => run(s)}>
            {s}
          </button>
        ))}
      </div>

      <ol className="steps" aria-label="Pipeline">
        {steps.map((s, i) => (
          <li key={s} className={phase >= i ? 'on' : ''}>
            <span>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>

      <div className="rag-out" aria-live="polite">
        {result ? (
          <>
            <Typewriter key={runId} text={result.answer} />
            {result.hits.length > 0 && (
              <ul className="sources">
                {result.hits.map((h, i) => (
                  <li key={h.chunk.id} className={result.grounded ? '' : 'weak'}>
                    <div>
                      <em>[{i + 1}]</em> {h.chunk.title}
                      <small>{h.chunk.source}</small>
                    </div>
                    <div className="bar" title={`BM25 score ${h.score.toFixed(1)}`}>
                      <i style={{ width: `${Math.max(6, (h.score / max) * 100)}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="idle">Pick a question above. You'll see the query tokenised, chunks ranked, and an answer built only from my CV. If it isn't in there, it says so.</p>
        )}
      </div>
    </div>
  )
}
