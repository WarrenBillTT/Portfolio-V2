import { useState, useEffect, useRef } from 'react'
import TopographicBackground from './TopographicBackground'
import ProfileCard3D from './ProfileCard3D'

const BIO_WORDS = [
  { text: "'m" },
  { text: 'a' },
  { text: 'Computer', bold: true },
  { text: 'Science', bold: true },
  { text: 'student', bold: true },
  { text: 'who' },
  { text: 'loves' },
  { text: 'building' },
  { text: 'products' },
  { text: 'end-to-end' },
  { text: '-' },
  { text: 'from' },
  { text: 'database' },
  { text: 'schema' },
  { text: 'design' },
  { text: 'and' },
  { text: 'REST/GraphQL' },
  { text: 'APIs' },
  { text: 'to' },
  { text: 'polished,' },
  { text: 'accessible' },
  { text: 'frontends.' },
  { text: 'I' },
  { text: 'care' },
  { text: 'as' },
  { text: 'much' },
  { text: 'about' },
  { text: 'code' },
  { text: 'quality' },
  { text: 'as' },
  { text: 'the' },
  { text: 'final' },
  { text: 'product.' },
  { text: 'My' },
  { text: 'focus' },
  { text: 'is' },
  { text: 'full-stack', bold: true },
  { text: 'web', bold: true },
  { text: 'development', bold: true },
  { text: ',' },
  { text: 'with' },
  { text: 'a' },
  { text: 'specialization' },
  { text: 'in' },
  { text: 'artificial', bold: true },
  { text: 'intelligence', bold: true },
  { text: '.' },
  { text: 'I' },
  { text: 'am' },
  { text: 'comfortable' },
  { text: 'owning' },
  { text: 'an' },
  { text: 'entire' },
  { text: 'feature' },
  { text: 'solo:' },
  { text: 'architecture,' },
  { text: 'implementation,' },
  { text: 'testing,' },
  { text: 'deployment.' },
  { text: 'Currently' },
  { text: 'seeking' },
  { text: 'internship', bold: true },
  { text: 'or', bold: true },
  { text: 'part-time', bold: true },
  { text: 'roles', bold: true },
  { text: 'where' },
  { text: 'I' },
  { text: 'can' },
  { text: 'ship' },
  { text: 'real' },
  { text: 'things' },
  { text: 'and' },
  { text: 'grow' },
  { text: 'fast.' },
]

const SKILLS = [
  { title: 'Frontend', pills: ['React', 'Next.js', 'Three.js', 'Tailwind CSS', 'TypeScript', 'HTML / CSS'], accent: false },
  { title: 'Backend', pills: ['Node.js', 'Express', 'REST API', 'Python', 'Prisma'], accent: false },
  { title: 'Database & Cloud', pills: ['MongoDB', 'PostgreSQL', 'Firebase', 'Supabase', 'Docker', 'Vercel', 'Stripe'], accent: false },
  { title: 'Currently Learning', pills: ['Kubernetes', 'Go', 'AWS'], accent: true },
]

const STATS = [
  { n: '10+', l: 'Projects' },
  { n: '2+', l: 'Years Coding' },
  { n: '2×', l: 'Hackathons' },
  { n: '3.9', l: 'CS GPA' },
]

export default function Background() {
  const [isBioVisible, setIsBioVisible] = useState(false)
  const bioRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = bioRef.current
    if (!el) return

    // If reduced motion is preferred, show immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsBioVisible(true)
      return
    }

    if (!('IntersectionObserver' in window)) {
      setIsBioVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsBioVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="background" className="relative overflow-hidden reveal transition-colors duration-300"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>

      {/* Subtle topographic contour map background animation */}
      <TopographicBackground />

      <div className="relative z-10 max-w-[1360px] mx-auto">

        {/* Header - oversized, asymmetric, editorial layout */}
        <div className="relative px-8 md:px-14 pt-24 md:pt-28 pb-8 md:pb-12">
          <div className="flex items-center gap-3 mb-6"
            style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', letterSpacing: '.25em' }}>
            <span style={{ color: 'var(--accent)' }}>( 02 )</span>
            <span className="w-8 h-px" style={{ background: 'var(--border)' }} />
            <span style={{ color: 'var(--muted)' }}>BACKGROUND</span>
          </div>
          <h2 className="max-w-[920px]"
            style={{
              fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2.5rem,6vw,5rem)',
              fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.02
            }}>
            Building things that<br />
            work <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>elegantly.</em>
          </h2>
        </div>

        <div className="relative flex flex-col md:flex-row md:items-start gap-y-12 md:gap-x-16 px-8 md:px-14 pb-24">

          {/* Photo - Floating 3D Card, duotone tint, vertical caption, sticky while the text scrolls past */}
          <div className="w-full max-w-[260px] md:max-w-none md:w-[320px] flex-none relative mx-auto md:mx-0 md:sticky md:top-28">
            <ProfileCard3D />
          </div>

          {/* Bio + stat ticker + skills list */}
          <div className="flex-1 min-w-0">
            {/* Extended Bio Text with word-by-word fade-in animation */}
            <p
              ref={bioRef}
              className="text-[15.5px] md:text-[16px] leading-[1.95] font-light mb-10 w-full transition-colors duration-300"
              style={{ color: 'var(--bio-text)' }}
            >
              <span
                style={{
                  fontFamily: '"Playfair Display",serif',
                  fontSize: '3.4rem',
                  fontWeight: 700,
                  float: 'left',
                  lineHeight: 0.76,
                  marginRight: '11px',
                  marginTop: '4px',
                  color: 'var(--accent)',
                  opacity: isBioVisible ? 1 : 0,
                  transform: isBioVisible ? 'translateY(0)' : 'translateY(6px)',
                  filter: isBioVisible ? 'blur(0px)' : 'blur(4px)',
                  transition: 'opacity 0.4s ease-out 0ms, transform 0.4s ease-out 0ms, filter 0.4s ease-out 0ms',
                }}
              >
                I
              </span>
              {BIO_WORDS.map((item, index) => {
                const delay = 35 + index * 26
                return (
                  <span key={index}>
                    <span
                      className={`inline-block ${item.bold ? 'font-medium' : ''}`}
                      style={{
                        color: item.bold ? 'var(--fg)' : undefined,
                        opacity: isBioVisible ? 1 : 0,
                        transform: isBioVisible ? 'translateY(0)' : 'translateY(4px)',
                        filter: isBioVisible ? 'blur(0px)' : 'blur(3px)',
                        transition: `opacity 0.32s cubic-bezier(0.2, 0.65, 0.3, 0.9) ${delay}ms, transform 0.32s cubic-bezier(0.2, 0.65, 0.3, 0.9) ${delay}ms, filter 0.32s cubic-bezier(0.2, 0.65, 0.3, 0.9) ${delay}ms`,
                        willChange: isBioVisible ? 'auto' : 'opacity, transform, filter',
                      }}
                    >
                      {item.text}
                    </span>
                    {' '}
                  </span>
                )
              })}
            </p>

            {/* Stat ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-6 mb-11 py-8 transition-colors duration-300" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
              {STATS.map((s) => (
                <div key={s.l} className="flex flex-col">
                  <div style={{ fontFamily: '"Playfair Display",serif', fontSize: '2.2rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                    {s.n}
                  </div>
                  <div className="text-[9.5px] mt-2 tracking-[.06em] uppercase" style={{ color: 'var(--muted)' }}>{s.l}</div>
                </div>
              ))}
            </div>

            <div className="text-[10px] tracking-[.25em] uppercase mb-1" style={{ color: 'var(--accent)', fontFamily: 'DM Mono,monospace' }}>
              Technical Skills
            </div>

            {/* Skills - flat numbered rows, plain-text tags instead of pill badges */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              {SKILLS.map((sg, i) => (
                <div key={sg.title} className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-8 py-4 transition-colors duration-300"
                  style={{ borderBottom: '1px solid var(--border)' }}>
                  <div className="flex items-baseline gap-3 sm:w-[180px] flex-none">
                    <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', color: sg.accent ? 'var(--accent)' : 'var(--muted)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[12.5px] uppercase tracking-[.06em]"
                      style={{ fontFamily: 'DM Mono,monospace', color: sg.accent ? 'var(--accent)' : 'var(--fg)' }}>
                      {sg.title}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {sg.pills.map(p => (
                      <span key={p} className="text-[12.5px] font-light transition-colors"
                        style={{ color: sg.accent ? 'var(--accent)' : 'var(--muted)' }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
