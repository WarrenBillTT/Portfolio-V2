import { useEffect, useRef } from 'react'

export function useBlob(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const mouseRef = useRef({ rawX: 0, rawY: 0, x: 0, y: 0, vx: 0, vy: 0 })
  const rafRef   = useRef<number>(0)
  const lastTRef = useRef(0)
  const hueRef   = useRef(0)
  const btRef    = useRef(0)

  useEffect(() => {
    const cv  = canvasRef.current
    if (!cv) return
    const hero = cv.parentElement!
    const gx   = cv.getContext('2d')!

    // Offscreen canvas for batching
    const oc = new OffscreenCanvas(2, 2)
    const og = oc.getContext('2d')!

    const resize = () => {
      cv.width = hero.offsetWidth
      cv.height = hero.offsetHeight
      oc.width  = hero.offsetWidth
      oc.height = hero.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect()
      mouseRef.current.rawX = ((e.clientX - r.left)  / r.width  - 0.5) * 2
      mouseRef.current.rawY = ((e.clientY - r.top)   / r.height - 0.5) * 2
    }
    document.addEventListener('mousemove', onMouse)

    const SPRING = 0.032, DAMPING = 0.80
    const FPS    = 1000 / 30

    function noise(a: number, t: number, ph: number) {
      return  Math.sin(a*2 + t*0.68 + ph) * 0.42
            + Math.sin(a*3 + t*1.00 + ph) * 0.26
            + Math.sin(a*5 + t*1.50 + ph) * 0.18
            + Math.sin(a*8 + t*2.20 + ph) * 0.10
            + Math.sin(a*9 + t*2.65 + ph) * 0.04
    }

    function bpts(
      t: number, cx: number, cy: number,
      rx: number, ry: number,
      n: number, ns: number, ph: number,
      fAngle: number, fPow: number, twist: number
    ): [number, number][] {
      const pts: [number, number][] = []
      for (let i = 0; i < n; i++) {
        const a    = (i / n) * Math.PI * 2 + twist
        const no   = noise(a, t, ph)
        const face = Math.cos(a - fAngle) * fPow * rx
        pts.push([cx + (rx + no*ns + face) * Math.cos(a),
                  cy + (ry + no*ns + face*0.6) * Math.sin(a)])
      }
      return pts
    }

    function bpath(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, p: [number,number][]) {
      const n = p.length
      ctx.beginPath()
      ctx.moveTo((p[0][0]+p[n-1][0])/2, (p[0][1]+p[n-1][1])/2)
      for (let i = 0; i < n; i++) {
        const a = p[i], b = p[(i+1)%n]
        ctx.quadraticCurveTo(a[0], a[1], (a[0]+b[0])/2, (a[1]+b[1])/2)
      }
      ctx.closePath()
    }

    function hsl(h: number, s: number, l: number, a: number) {
      return `hsla(${((h + hueRef.current) % 360 + 360) % 360},${s}%,${l}%,${a})`
    }

    function drawFrame(ts: number) {
      rafRef.current = requestAnimationFrame(drawFrame)
      if (ts - lastTRef.current < FPS) return
      lastTRef.current = ts

      const W = oc.width, H = oc.height
      og.clearRect(0, 0, W, H)

      btRef.current  += 0.0022
      hueRef.current  = (hueRef.current + 0.06) % 360

      const m = mouseRef.current
      m.vx = (m.vx + (m.rawX - m.x) * SPRING) * DAMPING
      m.vy = (m.vy + (m.rawY - m.y) * SPRING) * DAMPING
      m.x += m.vx; m.y += m.vy

      const sDist  = Math.sqrt(m.x*m.x + m.y*m.y)
      const dead   = 0.08
      const fPow   = Math.max(0, (sDist-dead)/(1-dead)) * 0.16
      const fAngle = Math.atan2(m.y, m.x)
      const twist  = m.x * 0.055

      const CX = W/2, CY = H/2
      const RX = Math.min(W,H) * 0.160
      const RY = Math.min(W,H) * 0.352
      const NS = Math.min(W,H) * 0.054
      const N  = 18

      const P = (rxM: number, ryM: number, ph: number) =>
        bpts(btRef.current, CX, CY, RX*rxM, RY*ryM, N, NS, ph, fAngle, fPow*rxM, twist)

      const core = P(1, 1, 0)
      const isLight = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light'

      if (!isLight) {
        // 1. Core (Dark mode)
        const cg = og.createRadialGradient(CX-RX*.17, CY-RY*.34, RX*.10, CX, CY, RY*1.06)
        cg.addColorStop(0,   '#18264a')
        cg.addColorStop(.45, '#0d1530')
        cg.addColorStop(.8,  '#050810')
        cg.addColorStop(1,   '#010204')
        og.save(); og.globalCompositeOperation='source-over'
        bpath(og, core); og.fillStyle=cg; og.fill(); og.restore()

        // 2. Key light
        const kg = og.createRadialGradient(CX-RX*.38, CY-RY*.46, 0, CX-RX*.13, CY-RY*.20, RY*.80)
        kg.addColorStop(0,'rgba(16,40,150,.58)'); kg.addColorStop(.4,'rgba(6,18,80,.20)'); kg.addColorStop(1,'rgba(0,0,0,0)')
        og.save(); og.globalCompositeOperation='source-over'
        bpath(og, core); og.fillStyle=kg; og.fill(); og.restore()

        // 3. Chromatic rim
        const bands: [number,number,number,number,number,number,number,number][] = [
          [1.20,1.095,1.058, 245, 80, 38,  7, 0.42],
          [0.88,1.078,1.046,  22,100, 54, 12, 0.72],
          [0.56,1.060,1.036, 338, 95, 58,  9, 0.65],
          [0.25,1.042,1.024, 192,100, 48, 20, 0.90],
          [0.05,1.018,1.011, 195, 90, 75, 28, 0.11],
          [0.00,1.005,1.003, 200, 60, 92,  3, 0.86],
        ]
        for (const [ph,rxM,ryM,h,s,l,lw,al] of bands) {
          og.save(); og.globalCompositeOperation='screen'
          bpath(og, P(rxM,ryM,ph)); og.strokeStyle=hsl(h,s,l,al); og.lineWidth=lw; og.stroke(); og.restore()
        }
        og.save(); og.globalCompositeOperation='screen'
        bpath(og, P(1.028,1.018,.22)); og.strokeStyle=hsl(192,100,50,.45); og.lineWidth=14; og.stroke(); og.restore()
        og.save(); og.globalCompositeOperation='screen'
        bpath(og, P(1.050,1.030,.92)); og.strokeStyle=hsl(22,100,52,.38); og.lineWidth=10; og.stroke(); og.restore()
        og.save(); og.globalCompositeOperation='screen'
        bpath(og, P(1.006,1.003,.01)); og.strokeStyle=hsl(200,60,94,.70); og.lineWidth=2; og.stroke(); og.restore()

        // 4. Specular
        const hg = og.createRadialGradient(CX-RX*.42, CY-RY*.66, 0, CX-RX*.22, CY-RY*.46, RY*.40)
        hg.addColorStop(0,'rgba(255,255,255,.20)'); hg.addColorStop(.4,'rgba(172,210,255,.07)'); hg.addColorStop(1,'rgba(0,0,0,0)')
        og.save(); og.globalCompositeOperation='screen'
        bpath(og, core); og.fillStyle=hg; og.fill(); og.restore()

        // 5. Ambient glows
        og.save(); og.globalCompositeOperation='screen'
        const glows = [
          {x:CX-RX*.52,y:CY-RY*.38,r:RY*1.38,h:192,s:100,l:50,a:.26},
          {x:CX+RX*.42,y:CY+RY*.12,r:RY*1.08,h: 22,s:100,l:52,a:.17},
          {x:CX-RX*.18,y:CY+RY*.32,r:RY*.88, h:248,s: 80,l:32,a:.20},
          {x:CX+RX*.12,y:CY-RY*.22,r:RY*.78, h:338,s: 95,l:56,a:.10},
        ]
        for (const g of glows) {
          const gg = og.createRadialGradient(g.x,g.y,0,g.x,g.y,g.r)
          gg.addColorStop(0,    hsl(g.h,g.s,g.l,g.a))
          gg.addColorStop(0.45, hsl(g.h,g.s,g.l,g.a*.10))
          gg.addColorStop(1,    'rgba(0,0,0,0)')
          og.fillStyle=gg; og.fillRect(0,0,W,H)
        }
        og.restore()
      } else {
        // Light mode: Iridescent Pearl Fluid Core
        const cg = og.createRadialGradient(CX-RX*.17, CY-RY*.34, RX*.10, CX, CY, RY*1.06)
        cg.addColorStop(0,   'rgba(220, 240, 230, 0.85)')
        cg.addColorStop(.4,  'rgba(215, 232, 255, 0.65)')
        cg.addColorStop(.75, 'rgba(238, 228, 255, 0.35)')
        cg.addColorStop(1,   'rgba(248, 247, 244, 0)')
        og.save(); og.globalCompositeOperation='source-over'
        bpath(og, core); og.fillStyle=cg; og.fill(); og.restore()

        const kg = og.createRadialGradient(CX-RX*.38, CY-RY*.46, 0, CX-RX*.13, CY-RY*.20, RY*.80)
        kg.addColorStop(0,'rgba(34,197,94,.35)'); kg.addColorStop(.5,'rgba(59,130,246,.15)'); kg.addColorStop(1,'rgba(248,247,244,0)')
        og.save(); og.globalCompositeOperation='source-over'
        bpath(og, core); og.fillStyle=kg; og.fill(); og.restore()

        const bands: [number,number,number,number,number,number,number,number][] = [
          [1.20,1.095,1.058, 245, 75, 45,  5, 0.35],
          [0.88,1.078,1.046,  22, 90, 48,  8, 0.40],
          [0.56,1.060,1.036, 338, 85, 50,  6, 0.38],
          [0.25,1.042,1.024, 192, 90, 42, 12, 0.45],
          [0.05,1.018,1.011, 195, 80, 55, 18, 0.20],
          [0.00,1.005,1.003, 200, 60, 60,  3, 0.50],
        ]
        for (const [ph,rxM,ryM,h,s,l,lw,al] of bands) {
          og.save(); og.globalCompositeOperation='source-over'
          bpath(og, P(rxM,ryM,ph)); og.strokeStyle=hsl(h,s,l,al); og.lineWidth=lw; og.stroke(); og.restore()
        }

        const glows = [
          {x:CX-RX*.52,y:CY-RY*.38,r:RY*1.2,h:192,s:90,l:42,a:.18},
          {x:CX+RX*.42,y:CY+RY*.12,r:RY*.95,h: 22,s:90,l:45,a:.12},
          {x:CX-RX*.18,y:CY+RY*.32,r:RY*.80,h:248,s:75,l:38,a:.14},
          {x:CX+RX*.12,y:CY-RY*.22,r:RY*.70,h:338,s:85,l:48,a:.10},
        ]
        og.save(); og.globalCompositeOperation='source-over'
        for (const g of glows) {
          const gg = og.createRadialGradient(g.x,g.y,0,g.x,g.y,g.r)
          gg.addColorStop(0,    hsl(g.h,g.s,g.l,g.a))
          gg.addColorStop(0.45, hsl(g.h,g.s,g.l,g.a*.12))
          gg.addColorStop(1,    'rgba(248,247,244,0)')
          og.fillStyle=gg; og.fillRect(0,0,W,H)
        }
        og.restore()
      }

      // Composite to main canvas
      gx.clearRect(0,0,W,H)
      gx.imageSmoothingEnabled=true
      gx.imageSmoothingQuality='medium'
      gx.drawImage(oc,0,0,W,H)
    }

    rafRef.current = requestAnimationFrame(drawFrame)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove', onMouse)
    }
  }, [canvasRef])
}
