import { useEffect } from 'react'
import { initMotion } from './lib/motion'
import Counter from './components/Counter'
import { AuditMock, CliMock } from './components/Mocks'
import Palette from './components/Palette'
import Pipeline from './components/Pipeline'
import RagDemo from './components/RagDemo'
import Terminal from './components/Terminal'
import {
  caseStudies,
  education,
  expertise,
  experience,
  languages,
  marquee,
  principles,
  profile,
  skills,
  stats,
  workflow,
} from './data'

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

const nav = ['ask', 'ai', 'work', 'experience', 'skills', 'contact']
const year = new Date().getFullYear()

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
  useEffects()

  return (
    <>
      <div className="aurora" aria-hidden="true">
        <i /> <i /> <i />
      </div>
      <div className="progress" aria-hidden="true" />

      <nav className="rail" aria-label="Sections">
        {['ask', 'ai', 'about', 'work', 'experience', 'skills', 'contact'].map((id) => (
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
        <Palette />
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
          <p className="badge">
            <i /> Applied AI · AWS · Automation
          </p>
          <h1>
            <Split text="Senior engineer." />
            <br />
            <Split text="AI-native builder." className="grad" />
          </h1>
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
          <a className="cue" href="#ask">
            Try the live demo <span>↓</span>
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

        <section id="about">
          <header className="sec-head">
            <span>02</span>
            <h2>What I bring</h2>
          </header>
          <div className="bento">
            {expertise.map((e) => (
              <article key={e.title} className={`glass spot ${e.big ? 'big' : ''}`}>
                <small>{e.tag}</small>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work">
          <header className="sec-head">
            <span>03</span>
            <h2>Selected work</h2>
          </header>
          <div className="cases">
            {caseStudies.map((c, i) => (
              <article key={c.name} className="case glass spot">
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
                {i === 0 && <AuditMock />}
                {i === 1 && <CliMock />}
              </article>
            ))}
          </div>
          <Pipeline />
        </section>

        <section id="experience">
          <header className="sec-head">
            <span>04</span>
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
            <span>05</span>
            <h2>Prefer a terminal?</h2>
          </header>
          <Terminal />
        </section>

        <section id="skills">
          <header className="sec-head">
            <span>06</span>
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
        © {year} {profile.name} · React + TypeScript · built with AI agents, reviewed by a human · press <kbd>⌘</kbd> <kbd>K</kbd>
      </footer>
    </>
  )
}
