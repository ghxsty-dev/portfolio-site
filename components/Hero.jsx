import { useState, useEffect, useRef, useCallback } from "react"

const ROWS = 28
const COLS = 80
const DOT_SIZE = 1.2

export default function Hero({ profile }) {
  const [titleIndex, setTitleIndex] = useState(0)
  const titles = ["Full Stack Developer", "UI/UX Designer", "Creative Developer"]
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let w, h

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    function draw() {
      timeRef.current += 0.008
      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      const bandTop = h * 0.52
      const bandHeight = h * 0.35

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const baseX = (col / (COLS - 1)) * w
          const rowNorm = row / (ROWS - 1)

          const waveX = Math.sin(timeRef.current + col * 0.12 + mx * 0.8) * (2 + rowNorm * 2)
          const waveY = Math.cos(timeRef.current * 0.7 + col * 0.08 + my * 0.5) * (3 + rowNorm * 3)

          let x = baseX + waveX + mx * (3 + rowNorm * 6)
          let y = bandTop + rowNorm * bandHeight + waveY + my * (2 + rowNorm * 4)

          const centerX = w / 2
          const distFromCenter = Math.abs(x - centerX) / (w / 2)
          const edgeFade = Math.max(0, 1 - distFromCenter * distFromCenter)

          const rowFade = Math.sin(rowNorm * Math.PI)
          const alpha = edgeFade * rowFade * 0.12

          if (alpha < 0.005) continue

          ctx.beginPath()
          ctx.arc(x, y, DOT_SIZE, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${alpha})`
          ctx.fill()
        }
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  const handleMouse = useCallback((e) => {
    const w = window.innerWidth
    const h = window.innerHeight
    mouseRef.current = {
      x: (e.clientX / w - 0.5) * 2,
      y: (e.clientY / h - 0.5) * 2,
    }
  }, [])

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#000" }}
      onMouseMove={handleMouse}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      <div className="text-center px-4 relative" style={{ zIndex: 1 }}>
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
          {profile.name}
        </h1>

        <div className="h-7 mb-5">
          <span className="text-lg sm:text-xl" style={{ color: "#666" }}>
            {titles[titleIndex]}
          </span>
        </div>

        <p className="text-sm mx-auto" style={{ color: "#555", maxWidth: "28rem", lineHeight: 1.8 }}>
          {profile.bio}
        </p>
      </div>
    </section>
  )
}
