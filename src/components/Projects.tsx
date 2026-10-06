import { useEffect, useRef, useState } from 'react'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '../data/projects'

const CSTEP = 320

function copiesNeeded(viewportWidth: number, setWidth: number) {
  const home = Math.ceil(viewportWidth / setWidth) + 2
  return home * 2 + 1 // odd, so there's a clean centered "home" copy
}

export default function Projects() {
  const trackRef  = useRef<HTMLDivElement>(null)
  const wrapRef   = useRef<HTMLDivElement>(null)
  const stateRef  = useRef({ off: 0, tOff: 0, drag: false, dX: 0, dOff: 0 })

  const setWidth = PROJECTS.length * CSTEP

  const [copies, setCopies] = useState(() => copiesNeeded(typeof window !== 'undefined' ? window.innerWidth : 1600, PROJECTS.length * CSTEP))
  const home = Math.floor(copies / 2)
  const ALL  = Array.from({ length: copies }, () => PROJECTS).flat()

  useEffect(() => {
    const onResize = () => setCopies(copiesNeeded(window.innerWidth, setWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [setWidth])

  useEffect(() => {
    const track = trackRef.current
    const wrap  = wrapRef.current
    if (!track || !wrap) return

    // Center padding
    const pad = (window.innerWidth - 300) / 2
    track.style.paddingLeft  = `${pad}px`
    track.style.paddingRight = `${pad}px`

    const s = stateRef.current
    const base = -home * setWidth
    s.off  = base
    s.tOff = base

    // Map any (unbounded) physical offset onto the band centered on the home
    // copy, purely for rendering. off/tOff/dOff themselves are never reset -
    // that's what keeps the drag anchor from desyncing mid-wrap. With enough
    // copies (see copiesNeeded), that band always has real rendered cards on
    // both sides, however wide the viewport is.
    const wrapped = (v: number) => {
      let diff = (v - base) % setWidth
      if (diff < -setWidth / 2) diff += setWidth
      if (diff >= setWidth / 2) diff -= setWidth
      return base + diff
    }

    let raf: number
    const animate = () => {
      if (!s.drag) s.tOff -= 0.5
      s.off += (s.tOff - s.off) * 0.09
      track.style.transform = `translateX(${wrapped(s.off)}px)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const onDown = (e: MouseEvent) => {
      s.drag = true; s.dX = e.clientX; s.dOff = s.tOff
      wrap.style.cursor = 'grabbing'; e.preventDefault()
    }
    const onMove = (e: MouseEvent) => {
      if (!s.drag) return
      s.tOff = s.dOff + (e.clientX - s.dX)
    }
    const onUp = () => {
      if (!s.drag) return
      s.drag = false; wrap.style.cursor = 'grab'
      s.tOff = Math.round(s.tOff / CSTEP) * CSTEP
    }
    // Touch drag with vertical scroll detection so mobile page scroll is never blocked
    let touchStartX = 0
    let touchStartY = 0
    let isHorizontalTouch = false
    let isTrackingTouch = false

    const onTStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
      s.dX = touchStartX
      s.dOff = s.tOff
      isHorizontalTouch = false
      isTrackingTouch = true
    }

    const onTMove = (e: TouchEvent) => {
      if (!isTrackingTouch) return
      const curX = e.touches[0].clientX
      const curY = e.touches[0].clientY
      const dx = curX - touchStartX
      const dy = curY - touchStartY

      // Detect if user is swiping horizontally or scrolling vertically
      if (!s.drag && !isHorizontalTouch) {
        if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
          // Horizontal intent: engage carousel drag
          isHorizontalTouch = true
          s.drag = true
          s.dX = curX
        } else if (Math.abs(dy) > 10) {
          // Vertical intent: release and let native browser scroll smoothly
          isTrackingTouch = false
          s.drag = false
          return
        }
      }

      if (s.drag) {
        s.tOff = s.dOff + (curX - s.dX)
      }
    }

    const onTEnd = () => {
      isTrackingTouch = false
      if (s.drag) {
        s.drag = false
        s.tOff = Math.round(s.tOff / CSTEP) * CSTEP
      }
    }

    wrap.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    wrap.addEventListener('touchstart', onTStart, { passive: true })
    wrap.addEventListener('touchmove',  onTMove,  { passive: true })
    wrap.addEventListener('touchend',   onTEnd,   { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      wrap.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      wrap.removeEventListener('touchstart', onTStart)
      wrap.removeEventListener('touchmove',  onTMove)
      wrap.removeEventListener('touchend',   onTEnd)
    }
  }, [copies, home, setWidth])

  return (
    <section id="projects" className="overflow-hidden py-20 transition-colors duration-300" style={{ background:'var(--bg)', borderTop:'1px solid var(--border)' }}>
      <div className="flex justify-between items-end px-10 mb-14 reveal">
        <div>
          <div className="text-[10px] tracking-[.25em] uppercase mb-1.5" style={{ color:'var(--muted)', fontFamily:'DM Mono,monospace' }}>
            Featured Work
          </div>
          <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:'clamp(1.6rem,3vw,2.4rem)',
                       fontWeight:700, color:'var(--fg)', letterSpacing:'-.02em' }}>
            Projects I've Built
          </h2>
        </div>
        <p className="text-[12px] font-light text-right max-w-[240px] leading-[1.75]"
           style={{ color:'var(--muted)' }}>
          Drag to explore - loops continuously.
        </p>
      </div>

      <div ref={wrapRef} className="overflow-hidden py-5 pb-10" style={{ cursor:'grab', userSelect:'none', touchAction:'pan-y' }}>
        <div ref={trackRef} className="cards-track">
          {ALL.map((p, i) => (
            <ProjectCard key={`${p.name}-${i}`} project={p} index={i % PROJECTS.length} total={PROJECTS.length} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-6 reveal"
           style={{ fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)', fontFamily:'DM Mono,monospace' }}>
        <span className="w-10 h-px" style={{ background:'var(--border)', display:'inline-block' }} />
        ← Drag to explore →
        <span className="w-10 h-px" style={{ background:'var(--border)', display:'inline-block' }} />
      </div>
    </section>
  )
}
