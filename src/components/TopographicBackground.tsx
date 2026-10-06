import { useEffect, useRef } from 'react'

export default function TopographicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const context = cv.getContext('2d')
    if (!context) return
    const ctx: CanvasRenderingContext2D = context

    let rafId: number
    let width = 0
    let height = 0

    const resize = () => {
      const parent = cv.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = parent.offsetWidth
      height = parent.offsetHeight
      cv.width = width * dpr
      cv.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    let time = 0

    // Multi-octave organic noise for smooth survey elevation curves
    function getRadius(
      angle: number,
      baseR: number,
      t: number,
      seed: number
    ): number {
      const n1 = Math.sin(angle * 2 + t * 0.35 + seed) * 0.16
      const n2 = Math.cos(angle * 3 - t * 0.28 + seed * 1.5) * 0.12
      const n3 = Math.sin(angle * 5 + t * 0.5 + seed * 2.2) * 0.05
      const n4 = Math.cos(angle * 1 + t * 0.18 + seed * 0.7) * 0.18
      return baseR * (1 + n1 + n2 + n3 + n4)
    }

    // Draw smooth closed topographic contour loop
    function drawContour(
      cx: number,
      cy: number,
      baseR: number,
      t: number,
      seed: number
    ) {
      const points: [number, number][] = []
      const steps = 64
      for (let i = 0; i < steps; i++) {
        const theta = (i / steps) * Math.PI * 2
        const r = getRadius(theta, baseR, t, seed)
        points.push([cx + Math.cos(theta) * r, cy + Math.sin(theta) * r])
      }

      ctx.beginPath()
      ctx.moveTo(
        (points[0][0] + points[steps - 1][0]) / 2,
        (points[0][1] + points[steps - 1][1]) / 2
      )
      for (let i = 0; i < steps; i++) {
        const p1 = points[i]
        const p2 = points[(i + 1) % steps]
        ctx.quadraticCurveTo(p1[0], p1[1], (p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2)
      }
      ctx.closePath()
      ctx.stroke()
    }

    const render = () => {
      rafId = requestAnimationFrame(render)
      time += 0.003 // slow, breathing tempo

      ctx.clearRect(0, 0, width, height)

      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      ctx.lineWidth = 1

      // ── Contour Peak 1: Top-Right (matching user's reference image) ──
      const h1x = width * 0.85
      const h1y = height * 0.18
      const h1Layers = 15
      for (let i = 1; i <= h1Layers; i++) {
        const r = i * (width > 800 ? 32 : 22)
        // Subtle, elegant opacity
        const alpha = isLight
          ? Math.max(0.03, 0.16 - i * 0.008)
          : Math.max(0.04, 0.18 - i * 0.009)
        ctx.strokeStyle = isLight
          ? `rgba(21, 128, 61, ${alpha})`
          : `rgba(200, 245, 58, ${alpha})`
        drawContour(h1x, h1y, r, time, 1.2)
      }

      // ── Contour Peak 2: Center-Right meandering elevation ──
      const h2x = width * 0.70
      const h2y = height * 0.65
      const h2Layers = 11
      for (let i = 1; i <= h2Layers; i++) {
        const r = i * (width > 800 ? 38 : 26)
        const alpha = isLight
          ? Math.max(0.025, 0.13 - i * 0.008)
          : Math.max(0.035, 0.15 - i * 0.009)
        ctx.strokeStyle = isLight
          ? `rgba(17, 17, 19, ${alpha})`
          : `rgba(248, 245, 240, ${alpha})`
        drawContour(h2x, h2y, r, time * 0.85, 3.4)
      }

      // ── Contour Peak 3: Bottom-Left subtle ridge ──
      const h3x = width * 0.18
      const h3y = height * 0.90
      const h3Layers = 8
      for (let i = 1; i <= h3Layers; i++) {
        const r = i * (width > 800 ? 44 : 28)
        const alpha = isLight
          ? Math.max(0.02, 0.10 - i * 0.008)
          : Math.max(0.025, 0.11 - i * 0.008)
        ctx.strokeStyle = isLight
          ? `rgba(21, 128, 61, ${alpha * 0.7})`
          : `rgba(200, 245, 58, ${alpha * 0.7})`
        drawContour(h3x, h3y, r, time * 0.65, 5.2)
      }
    }

    render()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
