import { useCallback, useEffect, useState } from 'react'
import Palette from './components/Palette'
import Pipeline from './components/Pipeline'
import Terminal from './components/Terminal'
import {
  caseStudies,
  education,
  expertise,
  experience,
  languages,
  profile,
  skills,
  stats,
} from './data'

const nav = ['about', 'work', 'experience', 'terminal', 'skills', 'contact']
const year = new Date().getFullYear()

function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') return saved
    } catch {
      /* storage unavailable */
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage unavailable */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, toggle }
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useSpotlight() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.spot')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}

export default function App() {
  const { theme, toggle } = useTheme()
  useReveal()
  useSpotlight()

  return (
    <>
      <header className="nav">
        <a href="#top" className="brand">
          hb<span>_</span>
        </a>
        <nav aria-label="Primary">
          {nav.map((id) => (
            <a key={id} href={`#${id}`}>
              {id}
            </a>
          ))}
        </nav>
        <div className="nav-tools">
          <button className="theme" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <Palette onToggleTheme={toggle} />
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <p className="status">
            <i /> {profile.location} · remote-friendly
          </p>
          <h1>
            {profile.name}
            <span className="dot">.</span>
          </h1>
          <p className="role">{profile.title}</p>
          <p className="lead">{profile.summary}</p>
          <div className="actions">
            <a className="btn primary" href={`mailto:${profile.email}`}>
              Get in touch
            </a>
            <a className="btn" href={profile.cv} target="_blank" rel="noreferrer">
              Download CV
            </a>
            <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
          <Pipeline />
        </section>

        <section id="about" className="reveal">
          <header className="sec-head">
            <span>01</span>
            <h2>What I do</h2>
          </header>
          <ul className="stats">
            {stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
          <div className="bento">
            {expertise.map((e) => (
              <article key={e.title} className="card spot">
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="reveal">
          <header className="sec-head">
            <span>02</span>
            <h2>Selected work</h2>
          </header>
          <div className="cases">
            {caseStudies.map((c) => (
              <article key={c.name} className="case spot">
                <div className="case-head">
                  <h3>{c.name}</h3>
                  <small>{c.org}</small>
                </div>
                <p className="problem">
                  <b>Problem</b> {c.problem}
                </p>
                <ul>
                  {c.built.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <ul className="tags">
                  {c.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="reveal">
          <header className="sec-head">
            <span>03</span>
            <h2>Experience</h2>
          </header>
          <ol className="timeline">
            {experience.map((job) => (
              <li key={job.company + job.period}>
                <div className="job-head">
                  <h3>
                    {job.role} <em>@ {job.company}</em>
                  </h3>
                  <time>{job.period}</time>
                </div>
                <ul>
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section id="terminal" className="reveal">
          <header className="sec-head">
            <span>04</span>
            <h2>Ask the terminal</h2>
          </header>
          <Terminal />
        </section>

        <section id="skills" className="reveal">
          <header className="sec-head">
            <span>05</span>
            <h2>Stack</h2>
          </header>
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="skill-row">
              <h3>{group}</h3>
              <ul className="tags">
                {items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="edu">
            {education.map((e) => (
              <p key={e.school}>
                <b>{e.school}</b> · {e.degree} <time>{e.period}</time>
              </p>
            ))}
            <p>
              <b>Languages</b> · {languages.join(', ')}
            </p>
          </div>
        </section>

        <section id="contact" className="contact reveal">
          <header className="sec-head">
            <span>06</span>
            <h2>Contact</h2>
          </header>
          <a className="mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="actions">
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a className="btn" href={profile.cv} target="_blank" rel="noreferrer">
              CV (PDF) ↗
            </a>
          </div>
        </section>
      </main>

      <footer>
        © {year} {profile.name} · built with React + TypeScript · press <kbd>⌘</kbd> <kbd>K</kbd>
      </footer>
    </>
  )
}
