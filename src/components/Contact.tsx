const LINKS = [
  { label: '✉ Email Me', href: 'mailto:warenbill77@email.com', primary: true },
  { label: '⌥ GitHub', href: 'https://github.com/WarrenBillTT', primary: false },
  { label: 'in LinkedIn', href: 'https://www.linkedin.com/in/warren-bill-trumputra-tjhin/', primary: false },
  { label: '↓ Resume PDF', href: '#', primary: false },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-32 px-10 text-center transition-colors duration-300"
      style={{ background: 'var(--contact-bg)', color: 'var(--contact-fg)' }}
    >
      <div className="reveal">
        <div
          className="text-[10px] tracking-[.25em] uppercase mb-6 transition-colors duration-300"
          style={{ color: 'var(--contact-muted)', fontFamily: 'DM Mono,monospace' }}
        >
          Get In Touch
        </div>
        <h2
          className="mb-10 transition-colors duration-300"
          style={{
            fontFamily: '"Playfair Display",serif',
            fontSize: 'clamp(2.5rem,5vw,4rem)',
            fontWeight: 700,
            color: 'var(--contact-fg)',
          }}
        >
          Open to Opportunities
        </h2>
        <div className="flex justify-center flex-wrap gap-3 max-w-[500px] mx-auto">
          {LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] text-[11px] tracking-[.07em] uppercase no-underline transition-all"
              style={
                l.primary
                  ? {
                      background: 'var(--contact-btn-bg)',
                      color: 'var(--contact-btn-fg)',
                      border: '1px solid var(--contact-btn-bg)',
                    }
                  : {
                      background: 'transparent',
                      color: 'var(--contact-muted)',
                      border: '1px solid var(--contact-border)',
                    }
              }
              onMouseEnter={e => {
                if (!l.primary) {
                  e.currentTarget.style.background = 'var(--contact-btn-bg)'
                  e.currentTarget.style.color = 'var(--contact-btn-fg)'
                  e.currentTarget.style.borderColor = 'var(--contact-btn-bg)'
                }
              }}
              onMouseLeave={e => {
                if (!l.primary) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--contact-muted)'
                  e.currentTarget.style.borderColor = 'var(--contact-border)'
                }
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <p
          className="mt-8 text-[11px] tracking-[.08em] uppercase transition-colors duration-300"
          style={{ color: 'var(--contact-muted)', fontFamily: 'DM Mono,monospace' }}
        >
          Currently accepting internship &amp; part-time roles - 2026
        </p>
      </div>
    </section>
  )
}
