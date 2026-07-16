import { useEffect, useRef } from "react"

export default function Hero({ profile }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let w, h

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      draw()
    }

    function draw() {
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, w, h)

      const spacing = 12
      const maxR = 5
      const cx = w / 2
      const cy = h * 0.45
      const maxDist = Math.sqrt(cx * cx + cy * cy)

      ctx.fillStyle = "#fff"

      for (let y = 0; y < h; y += spacing) {
        for (let x = 0; x < w; x += spacing) {
          const dx = x - cx
          const dy = (y - cy) * 1.6
          const dist = Math.sqrt(dx * dx + dy * dy)
          const norm = Math.min(dist / maxDist, 1)
          const r = maxR * (1 - norm * norm)

          if (r < 0.3) continue

          ctx.globalAlpha = 0.15 * (1 - norm * 0.8)
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#000" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      <div className="text-center px-4 relative" style={{ zIndex: 1 }}>
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight">
          {profile.name}
        </h1>
      </div>
    </section>
  )
}
