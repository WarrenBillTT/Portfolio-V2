import TopographicBackground from './TopographicBackground'

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

          {/* Photo - 4:5 portrait, duotone tint, vertical caption, sticky while the text scrolls past */}
          <div className="w-full max-w-[260px] md:max-w-none md:w-[320px] flex-none relative mx-auto md:mx-0 md:sticky md:top-28">
            <div className="relative w-full mx-auto md:mx-0" style={{ aspectRatio: '4 / 5' }}>
              <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center gap-4 text-center rounded-[2px]"
                style={{ background: 'linear-gradient(160deg,#12122a 0%,#0a0a16 55%,#050508 100%)' }}>
                <img
                  src="/profile.png"
                  alt="Warren"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Hide broken image icon and show placeholder if profile.jpg is not found yet
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      const placeholder = parent.querySelector('.photo-placeholder');
                      if (placeholder) (placeholder as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="photo-placeholder hidden absolute inset-0 flex-col items-center justify-center gap-4 px-8">
                  <div className="absolute inset-0" style={{
                    mixBlendMode: 'overlay',
                    background: 'linear-gradient(205deg, rgba(200,245,58,.22), transparent 55%)'
                  }} />
                  <div style={{
                    fontFamily: '"Playfair Display",serif', fontSize: '74px', fontWeight: 700,
                    fontStyle: 'italic', color: 'var(--accent)', opacity: .14, position: 'relative'
                  }}>
                  </div>
                  <div className="relative text-[9px] tracking-[.2em] uppercase" style={{ color: 'var(--muted)', fontFamily: 'DM Mono,monospace' }}>
                    Add profile.jpg to public folder
                  </div>
                  <div className="relative text-[8px] tracking-[.1em]" style={{ color: 'rgba(248,245,240,.18)', fontFamily: 'DM Mono,monospace' }}>
                    4:5 portrait recommended
                  </div>
                </div>
              </div>

              <span className="absolute -top-px -left-px w-3 h-3" style={{ borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }} />
              <span className="absolute -bottom-px -right-px w-3 h-3" style={{ borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }} />

              <div className="hidden md:flex absolute top-0 -right-8 h-full items-center">
                <span style={{
                  writingMode: 'vertical-rl', fontFamily: 'DM Mono,monospace', fontSize: '9px',
                  letterSpacing: '.22em', color: 'var(--muted)', textTransform: 'uppercase'
                }}>
                  Warren <span style={{ color: 'var(--accent)' }}>·</span> Jakarta <span style={{ color: 'var(--accent)' }}>·</span> 01
                </span>
              </div>
            </div>
          </div>

          {/* Bio + stat ticker + skills list */}
          <div className="flex-1 min-w-0">
            {/* Extended Bio Text filling full horizontal space */}
            <p className="text-[15.5px] md:text-[16px] leading-[1.95] font-light mb-10 w-full transition-colors duration-300" style={{ color: 'var(--bio-text)' }}>
              <span style={{
                fontFamily: '"Playfair Display",serif', fontSize: '3.4rem', fontWeight: 700,
                float: 'left', lineHeight: .76, marginRight: '11px', marginTop: '4px', color: 'var(--accent)'
              }}>
                I
              </span>'m a <strong className="font-medium" style={{ color: 'var(--fg)' }}>Computer Science student</strong> who loves building products end-to-end - from database schema design and REST/GraphQL APIs to polished, accessible frontends. I care as much about code quality as the final product. My focus is <strong className="font-medium" style={{ color: 'var(--fg)' }}>full-stack web development</strong> and <strong className="font-medium" style={{ color: 'var(--fg)' }}>artificial intelligence</strong>, with a specialization in intelligent systems. I am comfortable owning an entire feature solo: architecture, implementation, testing, deployment. Currently seeking <strong className="font-medium" style={{ color: 'var(--fg)' }}>internship or part-time roles</strong> where I can ship real things and grow fast.
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
