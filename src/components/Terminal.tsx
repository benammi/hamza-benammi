import { useEffect, useRef, useState } from 'react'
import { education, experience, languages, profile, skills } from '../data'

type Line = { kind: 'in' | 'out'; text: string }

const commands: Record<string, () => string> = {
  help: () => 'commands: whoami, skills, experience, education, contact, clear',
  whoami: () => `${profile.name} — ${profile.title}\n${profile.summary}`,
  skills: () =>
    Object.entries(skills)
      .map(([group, items]) => `${group.padEnd(10)} ${items.join(', ')}`)
      .join('\n'),
  experience: () =>
    experience
      .slice(0, 3)
      .map((j) => `${j.period.padEnd(12)} ${j.company} — ${j.role}`)
      .join('\n'),
  education: () =>
    [...education.map((e) => `${e.period}  ${e.school} — ${e.degree}`), `languages: ${languages.join(', ')}`].join('\n'),
  contact: () => `${profile.email}\n${profile.github}\n${profile.linkedin}`,
}

const intro: Line[] = [{ kind: 'out', text: 'Type a command. Try "help".' }]

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(intro)
  const [value, setValue] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    if (cmd === 'clear') return setLines([])
    const handler = commands[cmd]
    const out = handler ? handler() : `command not found: ${cmd}. Try "help".`
    setLines((l) => [...l, { kind: 'in', text: cmd }, { kind: 'out', text: out }])
  }

  return (
    <div className="terminal" onClick={() => document.getElementById('term-input')?.focus()}>
      <div className="term-bar">
        <span /> <span /> <span />
        <b>hamza@marrakesh ~ %</b>
      </div>
      <div className="term-body" ref={bodyRef}>
        {lines.map((l, i) => (
          <pre key={i} className={l.kind}>
            {l.kind === 'in' ? `$ ${l.text}` : l.text}
          </pre>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            run(value)
            setValue('')
          }}
        >
          <span className="prompt">$</span>
          <input
            id="term-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Terminal command"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
      <div className="term-chips">
        {Object.keys(commands).map((c) => (
          <button key={c} type="button" onClick={() => run(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
