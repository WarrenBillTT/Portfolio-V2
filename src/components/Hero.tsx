import { useEffect, useRef, useState } from 'react'
import { useBlob } from '../hooks/useBlob'

const WORDS = ['BUILDING.', 'CRAFTING.', 'SHIPPING.', 'DESIGNING.', 'DEBUGGING.', 'LEARNING.']

export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const wrapRef    = useRef<HTMLDivElement>(null)
  const curRef     = useRef<HTMLSpanElement>(null)
  const nextRef    = useRef<HTMLSpanElement>(null)
  const [time, setTime] = useState('00:00:00')
  const wi = useRef(0)
  const cycling = useRef(false)

  useBlob(canvasRef)

  // Clock
  useEffect(() => {
    const tick = () => {
      const n = new Date()
      setTime([n.getHours(), n.getMinutes(), n.getSeconds()]
        .map(x => String(x).padStart(2, '0')).join(':'))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Cycling words
  useEffect(() => {
    const id = setInterval(() => {
      if (cycling.current) return
      cycling.current = true
      wi.current = (wi.current + 1) % WORDS.length

      const next = nextRef.current
      const wrap = wrapRef.current
      if (!next || !wrap) return

      next.textContent = WORDS[wi.current]
      next.style.cssText = 'position:absolute;top:0;left:0;right:0;display:block;white-space:nowrap'
      wrap.classList.add('animating')

      setTimeout(() => {
        const cur = curRef.current

        if (cur) {
          cur.textContent      = WORDS[wi.current]
          cur.style.transition = 'none'
        }
        wrap.classList.remove('animating')
        if (next) {
          next.style.transition = 'none'
          next.style.opacity    = '0'
          next.style.transform  = 'translateY(18px)'
        }

        void wrap.offsetHeight

        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (cur)  cur.style.transition  = ''
          if (next) next.style.transition = ''
          cycling.current = false
        }))
      }, 900)
    }, 4200)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Canvas - no z-index so it paints first */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Flex column: eyebrow - title(blend) - sub → tags - btns */}
      <div className="relative flex flex-col items-center text-center pointer-events-none w-full">

        {/* Eyebrow - no blend */}
        <div className="anim-fade flex items-center justify-center gap-3 mb-4"
             style={{ fontSize:'11px', letterSpacing:'.28em', textTransform:'uppercase', color:'var(--muted)' }}>
          <span className="w-6 h-px" style={{ background:'var(--accent)', opacity:.6 }} />
          Full Stack Developer
          <span className="w-6 h-px" style={{ background:'var(--accent)', opacity:.6 }} />
        </div>

        {/* Title - only this wrapper gets difference blend in dark mode */}
        <div className="title-blend w-full">
          <h1 style={{ fontFamily:'"Playfair Display",serif', fontWeight:700, letterSpacing:'-.02em', color:'var(--title-color)' }}>
            <span className="anim-slide block"
                  style={{ fontSize:'clamp(3.8rem,10vw,9.5rem)', lineHeight:.9 }}>
              WARREN
            </span>
            <span className="anim-fade block"
                  style={{ fontSize:'clamp(.9rem,1.8vw,1.5rem)', fontStyle:'italic',
                           fontWeight:400, color:'var(--accent)', lineHeight:2.2, letterSpacing:'.1em' }}>
              is
            </span>
            <div ref={wrapRef} className="cycle-wrap anim-slide-2 relative block"
                 style={{ fontSize:'clamp(3.8rem,10vw,9.5rem)', lineHeight:.9 }}>
              <span ref={curRef} className="word-current">BUILDING.</span>
              <span ref={nextRef} className="word-next" />
            </div>
          </h1>
        </div>

        {/* Sub - no blend */}
        <p className="anim-fade-2 mt-5"
           style={{ fontSize:'12px', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--muted)' }}>
          Computer Science Student &nbsp;·&nbsp; Jakarta, ID
        </p>

        <div className="anim-fade-3 flex flex-wrap justify-center gap-2 mt-5">
          {['React','Node.js','TypeScript','PostgreSQL','Docker'].map(t => (
            <span key={t} className="text-[10px] tracking-[.06em] px-3 py-1 rounded-[3px] transition-colors"
                  style={{ background:'var(--badge-bg)', border:'1px solid var(--badge-border)', color:'var(--badge-fg)', fontFamily:'DM Mono,monospace' }}>
              {t}
            </span>
          ))}
        </div>

        <div className="anim-fade-4 flex gap-3 mt-7 pointer-events-auto">
          <a href="#projects"
             className="px-6 py-3 rounded-[5px] text-[12px] font-semibold tracking-[.06em] uppercase no-underline transition-all hover:opacity-85 hover:-translate-y-0.5"
             style={{ background:'var(--accent)', color:'var(--accent-fg)', fontFamily:'DM Mono,monospace' }}>
            View Projects ↓
          </a>
          <a href="#contact"
             className="px-6 py-3 rounded-[5px] text-[12px] tracking-[.06em] uppercase no-underline transition-all hover:opacity-80 hover:-translate-y-0.5"
             style={{ background:'transparent', color:'var(--fg)', border:'1px solid var(--border)', fontFamily:'DM Mono,monospace' }}>
            Get In Touch →
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="anim-fade-5 absolute bottom-8 left-0 right-0 flex justify-between px-10 z-[2] pointer-events-none"
           style={{ fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)' }}>
        <div>
          <div>CS Student</div>
          <div className="mt-1 opacity-40" style={{ fontSize:'9px' }}>Full Stack</div>
        </div>
        <div className="flex items-center gap-3 cursor-pointer pointer-events-auto"
             onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior:'smooth' })}>
          <div className="scroll-line h-px" style={{ background:'var(--accent)' }} />
          Scroll to explore
        </div>
        <div className="text-right">
          <div>{time}</div>
          <div className="mt-1 opacity-40" style={{ fontSize:'9px' }}>Jakarta, ID</div>
        </div>
      </div>
    </section>
  )
}
