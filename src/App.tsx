import { useCallback, useEffect, useState } from 'react'
import Counter from './components/Counter'
import { AuditMock, CliMock, FixMock } from './components/Mocks'
import NeuralField from './components/NeuralField'
import Palette from './components/Palette'
import Pipeline from './components/Pipeline'
import RagDemo from './components/RagDemo'
import Scramble from './components/Scramble'
import Terminal from './components/Terminal'
import { initMotion } from './lib/motion'
import {
  building,
  caseStudies,
  education,
  experience,
  languages,
  marquee,
  offers,
  principles,
  process,
  profile,
  rotator,
  skills,
  stats,
  workflow,
} from './data'

const nav = ['ask', 'ai', 'building', 'work', 'hire', 'experience', 'contact']
const railIds = ['ask', 'ai', 'building', 'work', 'hire', 'experience', 'skills', 'contact']
const year = new Date().getFullYear()

function Split({ text, className = '' }: { text: string; className?: string }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span className="w" key={i}>
          <span className={`wi ${className}`}>{w}</span>
        </span>
      ))}
    </>
  )
}

function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  )
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

function useEffects() {
  useEffect(() => {
    // cursor spotlight on cards + scroll progress bar
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.spot')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    const onScroll = () => {
      const h = document.documentElement
      h.style.setProperty('--progress', `${(h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100}%`)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    const stopMotion = initMotion()
    return () => {
      stopMotion()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}

export default function App() {
  const { theme, toggle } = useTheme()
  useEffects()

  return (
    <>
      <div className="aurora" aria-hidden="true">
        <i /> <i /> <i />
      </div>
      <div className="progress" aria-hidden="true" />
      <div className="cursor" aria-hidden="true" />

      <nav className="rail" aria-label="Sections">
        {railIds.map((id) => (
          <a key={id} href={`#${id}`} aria-label={id}>
            <span>{id}</span>
          </a>
        ))}
      </nav>

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
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
              </svg>
            )}
          </button>
          <Palette onToggleTheme={toggle} />
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <NeuralField />
          <div className="hero-copy">
            <p className="badge">
              <i /> Applied AI · Automation · AWS · Mobile
            </p>
            <h1>
              <Split text="Senior engineer." />
              <br />
              <Split text="AI-native builder." className="grad" />
            </h1>
            <p className="rotator">
              I build <Scramble words={rotator} />
            </p>
            <p className="lead">{profile.summary}</p>
            <div className="actions">
              <a className="btn primary" href="#hire">
                Start a project
              </a>
              <a className="btn" href={profile.cv} target="_blank" rel="noreferrer">
                Download CV
              </a>
              <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </div>
            <a className="cue" href="#ask">
              Interrogate my CV with a live RAG demo <span>↓</span>
            </a>
          </div>
          <div id="ask" className="rag-wrap">
            <RagDemo />
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div>
            {[...marquee, ...marquee].map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>

        <ul className="stats">
          {stats.map((s) => (
            <li key={s.label}>
              <strong>
                <Counter to={s.to} suffix={s.suffix} />
              </strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>

        <p className="statement">
          {profile.statement.split(' ').map((w, i) => (
            <span className="sw" key={i}>
              {w}{' '}
            </span>
          ))}
        </p>

        <section id="ai">
          <header className="sec-head">
            <span>01</span>
            <h2>How I build with AI</h2>
          </header>
          <div className="flow-stage">
            <p className="sec-lead">
              Anyone can prompt an agent now. The difference is what happens around it. This site was built with AI agents and reviewed by me, using the same loop I use on production systems.
            </p>
            <div className="flow-line">
              <i />
            </div>
            <ol className="flow">
              {workflow.map((w) => (
                <li key={w.n} className={`glass spot ${w.who}`}>
                  <small>
                    {w.n} · {w.who === 'ai' ? 'AI agents' : w.who === 'human' ? 'Me' : 'Both'}
                  </small>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="principles">
            {principles.map((p) => (
              <div key={p.k}>
                <h3>{p.k}</h3>
                <p>{p.v}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="building">
          <header className="sec-head">
            <span>02</span>
            <h2>What I'm building now</h2>
          </header>
          <p className="sec-lead">Work in progress, described by what it does. Client and product names stay private until launch.</p>
          <div className="hpin">
            <div className="htrack">
              {building.map((b, i) => (
                <article key={b.name} className="bcard glass spot tilt">
                  <div className="bcard-top">
                    <span className="bnum">{String(i + 1).padStart(2, '0')}</span>
                    <span className="bstatus">{b.status}</span>
                  </div>
                  <h3>{b.name}</h3>
                  <p className="bblurb">{b.blurb}</p>
                  <ul>
                    {b.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <ul className="tags">
                    {b.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="hbar" aria-hidden="true">
              <i />
            </div>
          </div>
        </section>

        <section id="work">
          <header className="sec-head">
            <span>03</span>
            <h2>Shipped work</h2>
          </header>
          <div className="cases">
            {caseStudies.map((c, i) => (
              <article key={c.name} className="case spot" style={{ ['--i' as string]: i }}>
                <div className="case-text">
                  <small>{c.org}</small>
                  <h3>{c.name}</h3>
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
                </div>
                {c.mock === 'audit' && <AuditMock />}
                {c.mock === 'fix' && <FixMock />}
                {c.mock === 'cli' && <CliMock />}
              </article>
            ))}
          </div>
          <Pipeline />
        </section>

        <section id="hire">
          <header className="sec-head">
            <span>04</span>
            <h2>Work with me</h2>
          </header>
          <p className="sec-lead">
            I take on a small number of projects at a time. If you have a process that eats your team's hours, or a product that needs a senior engineer who can move fast with AI, let's talk.
          </p>
          <div className="offers">
            {offers.map((o) => (
              <article key={o.title} className="offer glass spot tilt">
                <small>{o.tag}</small>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </article>
            ))}
          </div>
          <ol className="steps">
            {process.map((s) => (
              <li key={s.n} className="step">
                <b>{s.n}</b>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="cta-box glass">
            <div>
              <h3>Which manual process costs your team the most time?</h3>
              <p>Send me one line. I'll reply with a 3-point plan: what to automate first, the benefit, and how to get there.</p>
            </div>
            <a className="btn primary" href={`mailto:${profile.email}?subject=Project%20idea`}>
              Email me
            </a>
          </div>
        </section>

        <section id="experience">
          <header className="sec-head">
            <span>05</span>
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

        <section id="terminal">
          <header className="sec-head">
            <span>06</span>
            <h2>Prefer a terminal?</h2>
          </header>
          <Terminal />
        </section>

        <section id="skills">
          <header className="sec-head">
            <span>07</span>
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

        <section id="contact" className="contact">
          <h2>
            Let's build something <span className="grad">intelligent</span>.
          </h2>
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
        © {year} {profile.name} · {profile.location} · React + TypeScript · built with AI agents, reviewed by a human · press <kbd>⌘</kbd> <kbd>K</kbd>
      </footer>
    </>
  )
}
