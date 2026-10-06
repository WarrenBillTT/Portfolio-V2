import { useEffect, useRef } from 'react'

export default function ProfileCard3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const cardBodyRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // If reduced motion is preferred, keep card static
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let isHovered = false
    let mouseX = 0
    let mouseY = 0
    let cardRect: DOMRect | null = null

    // Motion state (subtle, calm, professional micro-motion)
    let currRotX = 0
    let currRotY = 0
    let currTransY = 0

    let targetRotX = 0
    let targetRotY = 0
    let targetTransY = 0

    let glareX = 50
    let glareY = 50
    let currGlareOpacity = 0.05
    let targetGlareOpacity = 0.05

    let animId: number

    const handlePointerEnter = () => {
      isHovered = true
      if (cardRef.current) {
        cardRect = cardRef.current.getBoundingClientRect()
      }
    }

    const handlePointerMove = (e: MouseEvent) => {
      if (!isHovered || !cardRect) return
      mouseX = e.clientX - cardRect.left
      mouseY = e.clientY - cardRect.top

      const normX = Math.max(-1, Math.min(1, (mouseX - cardRect.width / 2) / (cardRect.width / 2)))
      const normY = Math.max(-1, Math.min(1, (mouseY - cardRect.height / 2) / (cardRect.height / 2)))

      // Controlled, professional tilt (reduced angle, no wobble)
      targetRotX = -normY * 5.5
      targetRotY = normX * 6.5
      targetTransY = -4

      glareX = ((normX + 1) / 2) * 100
      glareY = ((normY + 1) / 2) * 100
      targetGlareOpacity = 0.16
    }

    const handlePointerLeave = () => {
      isHovered = false
    }

    const node = containerRef.current
    if (node) {
      node.addEventListener('mouseenter', handlePointerEnter)
      window.addEventListener('mousemove', handlePointerMove, { passive: true })
      node.addEventListener('mouseleave', handlePointerLeave)
    }

    const updatePhysics = () => {
      const now = performance.now()

      if (!isHovered) {
        // Slow, elegant, calm 3D breathing float (strictly restrained angles)
        targetRotX = Math.sin(now * 0.00055) * 2.6
        targetRotY = Math.cos(now * 0.00042) * 3.2
        targetTransY = Math.sin(now * 0.00075) * 3.2

        glareX = 50 + Math.cos(now * 0.00042) * 25
        glareY = 50 + Math.sin(now * 0.00055) * 25
        targetGlareOpacity = 0.05 + Math.sin(now * 0.0008) * 0.03
      }

      // Smooth damping (lerp) - feels solid and premium
      const lerpSpeed = isHovered ? 0.07 : 0.038
      currRotX += (targetRotX - currRotX) * lerpSpeed
      currRotY += (targetRotY - currRotY) * lerpSpeed
      currTransY += (targetTransY - currTransY) * lerpSpeed
      currGlareOpacity += (targetGlareOpacity - currGlareOpacity) * 0.06

      // Apply 3D transform to card
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1200px) translateY(${currTransY.toFixed(2)}px) rotateX(${currRotX.toFixed(2)}deg) rotateY(${currRotY.toFixed(2)}deg)`
      }

      // Compact, realistic reactive shadow directly on the card body (no giant black box)
      if (cardBodyRef.current) {
        const shadowX = (-currRotY * 0.8).toFixed(1)
        const shadowY = (14 + currRotX * 0.6 - currTransY * 0.5).toFixed(1)
        const shadowBlur = (24 + Math.abs(currTransY) * 0.8).toFixed(1)
        cardBodyRef.current.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px -6px rgba(0, 0, 0, 0.45), 0 2px 6px -1px rgba(0, 0, 0, 0.25), 0 1px 1px rgba(255, 255, 255, 0.06) inset`
      }

      // Glare reflection
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(255, 255, 255, ${currGlareOpacity.toFixed(3)}) 0%, rgba(255, 255, 255, 0) 65%)`
      }

      animId = requestAnimationFrame(updatePhysics)
    }

    animId = requestAnimationFrame(updatePhysics)

    return () => {
      cancelAnimationFrame(animId)
      if (node) {
        node.removeEventListener('mouseenter', handlePointerEnter)
        node.removeEventListener('mouseleave', handlePointerLeave)
      }
      window.removeEventListener('mousemove', handlePointerMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto md:mx-0 select-none"
      style={{
        aspectRatio: '4 / 5',
        perspective: '1200px',
      }}
    >
      {/* Floating 3D Card Shell */}
      <div
        ref={cardRef}
        className="relative w-full h-full rounded-[3px] cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Card Main Body & Photo Container with compact, clean shadow */}
        <div
          ref={cardBodyRef}
          className="relative w-full h-full overflow-hidden rounded-[2px] border transition-colors duration-300"
          style={{
            borderColor: 'var(--border)',
            background: 'linear-gradient(160deg, #12122a 0%, #0a0a16 55%, #050508 100%)',
            boxShadow: '0 14px 28px -6px rgba(0, 0, 0, 0.45), 0 2px 6px -1px rgba(0, 0, 0, 0.25), 0 1px 1px rgba(255, 255, 255, 0.06) inset',
            transform: 'translateZ(0px)',
          }}
        >
          <img
            src="/profile.png"
            alt="Warren"
            className="w-full h-full object-cover object-top select-none pointer-events-none"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
              const parent = (e.target as HTMLImageElement).parentElement
              if (parent) {
                const placeholder = parent.querySelector('.photo-placeholder')
                if (placeholder) (placeholder as HTMLElement).style.display = 'flex'
              }
            }}
          />

          {/* Placeholder Fallback if image fails to load */}
          <div className="photo-placeholder hidden absolute inset-0 flex-col items-center justify-center gap-4 px-8">
            <div
              className="absolute inset-0"
              style={{
                mixBlendMode: 'overlay',
                background: 'linear-gradient(205deg, rgba(200,245,58,.22), transparent 55%)',
              }}
            />
            <div
              className="relative text-[9px] tracking-[.2em] uppercase"
              style={{ color: 'var(--muted)', fontFamily: 'DM Mono,monospace' }}
            >
              Add profile.jpg to public folder
            </div>
            <div
              className="relative text-[8px] tracking-[.1em]"
              style={{ color: 'rgba(248,245,240,.18)', fontFamily: 'DM Mono,monospace' }}
            >
              4:5 portrait recommended
            </div>
          </div>

          {/* Subtle Glare Specular Highlight */}
          <div
            ref={glareRef}
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{
              transition: 'opacity 0.25s ease',
            }}
          />
        </div>

        {/* Crisp Corner Accent Markers (Refined depth, matching editorial theme) */}
        <span
          className="absolute -top-px -left-px w-3 h-3 pointer-events-none"
          style={{
            borderTop: '1px solid var(--accent)',
            borderLeft: '1px solid var(--accent)',
            transform: 'translateZ(14px)',
          }}
        />
        <span
          className="absolute -bottom-px -right-px w-3 h-3 pointer-events-none"
          style={{
            borderBottom: '1px solid var(--accent)',
            borderRight: '1px solid var(--accent)',
            transform: 'translateZ(14px)',
          }}
        />

        {/* Vertical Side Tag */}
        <div
          className="hidden md:flex absolute top-0 -right-8 h-full items-center pointer-events-none"
          style={{
            transform: 'translateZ(10px)',
          }}
        >
          <span
            style={{
              writingMode: 'vertical-rl',
              fontFamily: 'DM Mono,monospace',
              fontSize: '9px',
              letterSpacing: '.22em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
            }}
          >
            Warren <span style={{ color: 'var(--accent)' }}>·</span> Jakarta <span style={{ color: 'var(--accent)' }}>·</span> 01
          </span>
        </div>
      </div>
    </div>
  )
}
