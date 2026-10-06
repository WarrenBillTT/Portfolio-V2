import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="group relative flex items-center justify-between w-[58px] h-[28px] px-[3px] rounded-full transition-all duration-300 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      style={{
        background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Sliding pill thumb */}
      <span
        className="absolute top-[3px] bottom-[3px] w-[22px] rounded-full transition-all duration-300 ease-out shadow-sm flex items-center justify-center pointer-events-none"
        style={{
          left: isDark ? '31px' : '3px',
          background: isDark ? 'var(--accent)' : '#111113',
          color: isDark ? '#050505' : '#ffffff',
          boxShadow: isDark
            ? '0 0 10px rgba(200, 245, 58, 0.45)'
            : '0 1px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        {isDark ? (
          /* Moon icon inside active dark thumb */
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          /* Sun icon inside active light thumb */
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </span>

      {/* Sun icon on left */}
      <span
        className="w-[22px] h-[22px] flex items-center justify-center transition-opacity duration-300"
        style={{
          opacity: isDark ? 0.4 : 0,
          color: 'var(--fg)',
        }}
      >
        <svg className="w-3 h-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </span>

      {/* Moon icon on right */}
      <span
        className="w-[22px] h-[22px] flex items-center justify-center transition-opacity duration-300"
        style={{
          opacity: isDark ? 0 : 0.4,
          color: 'var(--fg)',
        }}
      >
        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  )
}
