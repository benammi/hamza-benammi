import { useEffect, useRef } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#%&'

/** Cycles through words with a decode / scramble transition. Writes to the DOM directly. */
export default function Scramble({ words }: { words: string[] }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let i = 0
    let raf = 0
    let timer = 0

    const scrambleTo = (to: string) => {
      const from = el.textContent ?? ''
      const len = Math.max(from.length, to.length)
      const queue = Array.from({ length: len }, (_, k) => {
        const start = Math.floor(Math.random() * 14)
        return { from: from[k] ?? '', to: to[k] ?? '', start, end: start + 8 + Math.floor(Math.random() * 14) }
      })
      let frame = 0
      const tick = () => {
        let out = ''
        let done = 0
        for (const q of queue) {
          if (frame >= q.end) {
            done++
            out += q.to
          } else if (frame >= q.start) {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          } else out += q.from
        }
        el.textContent = out
        if (done === queue.length) {
          timer = window.setTimeout(next, 2300)
        } else {
          frame++
          raf = requestAnimationFrame(tick)
        }
      }
      tick()
    }

    const next = () => {
      i = (i + 1) % words.length
      if (reduce) {
        el.textContent = words[i]
        timer = window.setTimeout(next, 2600)
      } else scrambleTo(words[i])
    }

    timer = window.setTimeout(next, 2600)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [words])

  return (
    <span ref={ref} className="scramble">
      {words[0]}
    </span>
  )
}
