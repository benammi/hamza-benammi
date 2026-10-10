import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const REVEAL = [
  '.stats li',
  '.sec-head h2',
  '.offer',
  '.step',
  '.principles > div',
  '.skill-row',
  '.timeline > li',
  '.pipeline',
  '.terminal',
  '.edu',
  '.cta-box',
  '.contact h2',
  '.contact .mail',
  '.contact .actions',
].join(',')

/** All scroll, pointer and entrance motion. Returns a cleanup. No-op under prefers-reduced-motion. */
export function initMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  // Smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
  const lenis = new Lenis({ lerp: 0.1 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (t: number) => lenis.raf(t * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  const onAnchor = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
    if (!a) return
    const target = document.querySelector<HTMLElement>(a.getAttribute('href')!)
    if (!target) return
    e.preventDefault()
    lenis.scrollTo(target, { offset: -70, duration: 1.4 })
  }
  document.addEventListener('click', onAnchor)

  const cleanups: Array<() => void> = []

  const ctx = gsap.context(() => {
    // 1. Hero intro: words rise out of a mask, then the rest settles in.
    gsap
      .timeline({ defaults: { ease: 'power4.out' } })
      .fromTo('.badge', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7 })
      .fromTo('.hero h1 .wi', { yPercent: 115, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.1, stagger: 0.12 }, '-=0.4')
      .fromTo('.hero .rotator, .hero .lead, .hero .actions, .hero .cue', { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, '-=0.7')
      .fromTo('.rag-wrap', { autoAlpha: 0, y: 60, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1 }, '-=0.5')

    // 2. Hero copy drifts away as you leave it.
    gsap.to('.hero-copy', {
      yPercent: -10,
      autoAlpha: 0.15,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '60% top', scrub: true },
    })

    // 3. The whole background shifts colour as you travel down the page.
    gsap.to('.aurora', {
      filter: 'hue-rotate(75deg)',
      scale: 1.18,
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1 },
    })

    // 4. Statement: words light up as you read.
    const words = gsap.utils.toArray<HTMLElement>('.statement .sw')
    gsap.set(words, { opacity: 0.14 })
    gsap.to(words, {
      opacity: 1,
      stagger: 0.12,
      ease: 'none',
      scrollTrigger: { trigger: '.statement', start: 'top 82%', end: 'bottom 48%', scrub: true },
    })

    // 5. Staggered entrances for everything else.
    ScrollTrigger.batch(REVEAL, {
      start: 'top 90%',
      once: true,
      onEnter: (els) =>
        gsap.fromTo(els, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', overwrite: true }),
    })
    gsap.utils.toArray<HTMLElement>('.sec-head').forEach((el) =>
      gsap.fromTo(el, { '--line': 0 }, { '--line': 1, ease: 'power2.out', duration: 1.2, scrollTrigger: { trigger: el, start: 'top 88%', once: true } }),
    )

    // 6. Timeline line draws itself.
    gsap.fromTo('.timeline', { '--fill': 0 }, { '--fill': 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 70%', scrub: true } })

    // 7. Side rail: highlight the current section.
    const setActive = (id: string) =>
      document.querySelectorAll('.rail a').forEach((a) => a.classList.toggle('on', a.getAttribute('href') === `#${id}`))
    document.querySelectorAll<HTMLAnchorElement>('.rail a').forEach((a) => {
      const id = a.getAttribute('href')!.slice(1)
      ScrollTrigger.create({ trigger: `#${id}`, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => s.isActive && setActive(id) })
    })

    const mm = gsap.matchMedia()

    // 8. Desktop scenes: pinned workflow, pinned horizontal gallery, stacking case cards.
    mm.add('(min-width: 861px)', () => {
      const steps = gsap.utils.toArray<HTMLElement>('.flow li')
      gsap.set(steps, { opacity: 0.22, scale: 0.95 })
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.flow-stage', start: 'top 14%', end: '+=1000', pin: true, scrub: 0.6, anticipatePin: 1 },
      })
      tl.fromTo('.flow-line i', { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: steps.length }, 0)
      steps.forEach((s, i) => tl.to(s, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, i))

      const track = document.querySelector<HTMLElement>('.htrack')
      const pin = document.querySelector<HTMLElement>('.hpin')
      if (track && pin) {
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth)
        gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top 12%',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => gsap.set('.hbar i', { scaleX: self.progress }),
          },
        })
      }

      const cases = gsap.utils.toArray<HTMLElement>('.case')
      cases.slice(0, -1).forEach((c, i) =>
        gsap.to(c, {
          scale: 0.94,
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: { trigger: cases[i + 1], start: 'top 80%', end: 'top 18%', scrub: true },
        }),
      )
    })

    mm.add('(max-width: 860px)', () => {
      ScrollTrigger.batch('.flow li, .bcard, .case', {
        start: 'top 90%',
        once: true,
        onEnter: (els) => gsap.fromTo(els, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.12, duration: 0.7 }),
      })
    })

    // 9. Pointer effects (fine pointers only): magnetic buttons, card tilt, cursor ring.
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      document.querySelectorAll<HTMLElement>('.btn.primary').forEach((btn) => {
        btn.addEventListener('pointermove', (e) => {
          const r = btn.getBoundingClientRect()
          gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.3 })
        })
        btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' }))
      })

      document.querySelectorAll<HTMLElement>('.tilt').forEach((el) => {
        gsap.set(el, { transformPerspective: 900 })
        const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3' })
        const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3' })
        el.addEventListener('pointermove', (e) => {
          const r = el.getBoundingClientRect()
          ry(((e.clientX - r.left) / r.width - 0.5) * 9)
          rx(-((e.clientY - r.top) / r.height - 0.5) * 9)
        })
        el.addEventListener('pointerleave', () => {
          rx(0)
          ry(0)
        })
      })

      const cursor = document.querySelector<HTMLElement>('.cursor')
      if (cursor) {
        const cx = gsap.quickTo(cursor, 'x', { duration: 0.22, ease: 'power3' })
        const cy = gsap.quickTo(cursor, 'y', { duration: 0.22, ease: 'power3' })
        const move = (e: PointerEvent) => {
          cursor.classList.add('show')
          cx(e.clientX)
          cy(e.clientY)
          cursor.classList.toggle('big', !!(e.target as HTMLElement).closest('a, button, input, .spot'))
        }
        const leave = () => cursor.classList.remove('show')
        window.addEventListener('pointermove', move)
        document.addEventListener('pointerleave', leave)
        cleanups.push(() => {
          window.removeEventListener('pointermove', move)
          document.removeEventListener('pointerleave', leave)
        })
      }
    }

    // 10. The tech marquee speeds up with scroll velocity.
    const marquee = document.querySelector('.marquee div')?.getAnimations()[0]
    let rate = 1
    const spin = () => {
      if (!marquee) return
      const target = 1 + Math.min(Math.abs(lenis.velocity), 30) * 0.45
      rate += (target - rate) * 0.08
      marquee.playbackRate = rate
    }
    gsap.ticker.add(spin)
    cleanups.push(() => gsap.ticker.remove(spin))

    // Layout shifts once fonts load; recompute trigger positions.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  })

  return () => {
    cleanups.forEach((fn) => fn())
    ctx.revert()
    document.removeEventListener('click', onAnchor)
    gsap.ticker.remove(tick)
    lenis.destroy()
  }
}
