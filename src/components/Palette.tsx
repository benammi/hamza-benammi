import { useEffect, useMemo, useState } from 'react'
import { profile } from '../data'

type Item = { label: string; hint: string; run: () => void }

const sections = ['about', 'work', 'experience', 'terminal', 'skills', 'contact']

export default function Palette({ onToggleTheme }: { onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const items = useMemo<Item[]>(
    () => [
      ...sections.map((id) => ({
        label: `Go to ${id}`,
        hint: 'section',
        run: () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
      })),
      { label: 'Download CV', hint: 'pdf', run: () => window.open(profile.cv, '_blank') },
      { label: 'Email Hamza', hint: 'mailto', run: () => (window.location.href = `mailto:${profile.email}`) },
      { label: 'Open GitHub', hint: 'link', run: () => window.open(profile.github, '_blank') },
      { label: 'Open LinkedIn', hint: 'link', run: () => window.open(profile.linkedin, '_blank') },
      { label: 'Toggle theme', hint: 'ui', run: onToggleTheme },
    ],
    [onToggleTheme],
  )

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
        setQuery('')
        setActive(0)
      } else if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function choose(item?: Item) {
    if (!item) return
    setOpen(false)
    item.run()
  }

  return (
    <>
      <button className="kbd-btn" onClick={() => {
          setQuery('')
          setActive(0)
          setOpen(true)
        }}
        aria-label="Open command palette">
        <kbd>⌘</kbd>
        <kbd>K</kbd>
      </button>
      {open && (
        <div className="palette-backdrop" onClick={() => setOpen(false)}>
          <div className="palette" role="dialog" aria-label="Command palette" onClick={(e) => e.stopPropagation()}>
            <input
              autoFocus
              value={query}
              placeholder="Type a command…"
              onChange={(e) => {
                setQuery(e.target.value)
                setActive(0)
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') setActive((a) => Math.min(a + 1, filtered.length - 1))
                if (e.key === 'ArrowUp') setActive((a) => Math.max(a - 1, 0))
                if (e.key === 'Enter') choose(filtered[active])
              }}
            />
            <ul>
              {filtered.map((item, i) => (
                <li key={item.label}>
                  <button className={i === active ? 'active' : ''} onMouseEnter={() => setActive(i)} onClick={() => choose(item)}>
                    {item.label}
                    <small>{item.hint}</small>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && <li className="empty">No match</li>}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
