import { useEffect, useRef } from 'react'

// Counts up to `to` when scrolled into view. Writes straight to the DOM to avoid re-renders.
export default function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${to}${suffix}`
      return
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1100, 1)
        el.textContent = `${Math.round(to * (1 - Math.pow(1 - p, 3)))}${suffix}`
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [to, suffix])

  return <span ref={ref}>0{suffix}</span>
}
