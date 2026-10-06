import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

const NAV_ITEMS = [
  { label: 'Projects', href: '#projects', num: '01' },
  { label: 'Background', href: '#background', num: '02' },
  { label: 'Contact', href: '#contact', num: '03' },
]

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-5 sm:px-8 md:px-10 py-3.5 md:py-5 backdrop-blur-md transition-colors duration-300"
        style={{
          background: 'var(--nav-bg)',
          borderBottom: '1px solid var(--nav-border)',
        }}
      >
        {/* Brand logo */}
        <a
          href="#hero"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 text-[11px] tracking-[.2em] uppercase font-medium no-underline transition-opacity hover:opacity-80 flex-none"
          style={{ color: 'var(--fg)' }}
        >
          <span
            className="w-[6px] h-[6px] rounded-full inline-block transition-colors duration-300"
            style={{ background: 'var(--accent)' }}
          />
          <span>Warren</span>
          <span className="opacity-30 mx-1">/</span>
          <span className="opacity-40 text-[10px] font-light">dev</span>
        </a>

        {/* Desktop Navigation Links & Theme Toggle */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-7">
            {NAV_ITEMS.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="text-[11px] tracking-[.15em] uppercase no-underline opacity-65 hover:opacity-100 transition-opacity"
                style={{ color: 'var(--fg)' }}
              >
                {item.label}
              </a>
            ))}
          </div>
          <ThemeToggle />
        </div>

        {/* Mobile: Always visible Theme Toggle + Hamburger Menu */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsOpen(prev => !prev)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="w-9 h-9 rounded-full flex flex-col justify-center items-center gap-1.5 focus:outline-none transition-colors"
            style={{
              background: 'var(--toggle-bg, rgba(125,125,125,0.08))',
              border: '1px solid var(--border)',
            }}
          >
            <span
              className="w-4 h-[1.5px] rounded-full transition-all duration-300 ease-out"
              style={{
                background: 'var(--fg)',
                transform: isOpen ? 'translateY(3.75px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="w-4 h-[1.5px] rounded-full transition-all duration-300 ease-out"
              style={{
                background: 'var(--fg)',
                transform: isOpen ? 'translateY(-3.75px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[53px] z-[99] md:hidden flex flex-col justify-between p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300"
          style={{
            background: 'var(--nav-bg)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {/* Menu links list */}
          <div className="flex flex-col gap-2 pt-4">
            <div
              className="text-[10px] tracking-[.25em] uppercase mb-3 opacity-40 font-mono"
              style={{ color: 'var(--muted)' }}
            >
              Navigation
            </div>
            {NAV_ITEMS.map(item => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-4 border-b no-underline transition-colors group"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--fg)',
                }}
              >
                <span
                  className="text-2xl font-bold tracking-tight transition-transform group-hover:translate-x-1"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {item.label}
                </span>
                <span
                  className="text-xs font-mono tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-[var(--accent)]"
                >
                  {item.num} ↗
                </span>
              </a>
            ))}
          </div>

          {/* Bottom info in drawer */}
          <div className="pt-6 border-t border-[var(--border)] flex flex-col gap-2">
            <div className="text-[10px] tracking-[.2em] uppercase font-mono" style={{ color: 'var(--muted)' }}>
              Warren · Full Stack Dev
            </div>
            <div className="text-[11px] font-mono tracking-wide" style={{ color: 'var(--accent)' }}>
              Open to Opportunities 2026
            </div>
          </div>
        </div>
      )}
    </>
  )
}
