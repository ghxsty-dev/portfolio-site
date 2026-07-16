import { useState, useEffect, useRef, useCallback } from "react"

const ROWS = 40
const COLS = 100
const CELL = 14

function seededRand(a, b) {
  let x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function drawShape(ctx, x, y, type, size, alpha) {
  ctx.strokeStyle = `rgba(255,255,255,${alpha})`
  ctx.fillStyle = `rgba(255,255,255,${alpha})`
  ctx.lineWidth = 0.8
  const s = size
  switch (type) {
    case 0:
      ctx.beginPath()
      ctx.arc(x, y, 1.2, 0, Math.PI * 2)
      ctx.fill()
      break
    case 1:
      ctx.beginPath()
      ctx.moveTo(x - s, y - s)
      ctx.lineTo(x + s, y + s)
      ctx.moveTo(x + s, y - s)
      ctx.lineTo(x - s, y + s)
      ctx.stroke()
      break
    case 2:
      ctx.beginPath()
      ctx.moveTo(x - s, y)
      ctx.lineTo(x + s, y)
      ctx.moveTo(x, y - s)
      ctx.lineTo(x, y + s)
      ctx.stroke()
      break
    case 3:
      ctx.beginPath()
      ctx.moveTo(x - s, y)
      ctx.lineTo(x + s, y)
      ctx.stroke()
      break
  }
}

export default function Hero({ profile }) {
  const [titleIndex, setTitleIndex] = useState(0)
  const titles = ["Full Stack Developer", "UI/UX Designer", "Creative Developer"]
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef(null)
  const timeRef = useRef(0)
  const shapeMapRef = useRef(null)

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

    if (!shapeMapRef.current) {
      shapeMapRef.current = []
      for (let r = 0; r < ROWS; r++) {
        shapeMapRef.current[r] = []
        for (let c = 0; c < COLS; c++) {
          shapeMapRef.current[r][c] = Math.floor(seededRand(r, c) * 4)
        }
      }
    }

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    function draw() {
      timeRef.current += 0.006
      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      const textCenterY = h * 0.42
      const bandHalf = h * 0.22

      const gridW = COLS * CELL
      const gridH = ROWS * CELL
      const offsetX = (w - gridW) / 2
      const offsetY = textCenterY - gridH / 2

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const shapeType = shapeMapRef.current[row][col]
          const baseX = offsetX + col * CELL + CELL / 2
          const baseY = offsetY + row * CELL + CELL / 2
          const rowNorm = row / (ROWS - 1)

          const waveX = Math.sin(timeRef.current + col * 0.1 + mx * 0.6) * (1.5 + rowNorm * 1.5)
          const waveY = Math.cos(timeRef.current * 0.7 + col * 0.06 + my * 0.4) * (2 + rowNorm * 2)

          let x = baseX + waveX + mx * (2 + rowNorm * 4)
          let y = baseY + waveY + my * (1.5 + rowNorm * 3)

          const centerY = textCenterY
          const distY = Math.abs(y - centerY) / bandHalf
          const vertFade = Math.max(0, 1 - distY * distY)

          const centerX = w / 2
          const distX = Math.abs(x - centerX) / (w / 2)
          const horizFade = Math.max(0, 1 - distX * distX)

          const alpha = vertFade * horizFade * 0.18

          if (alpha < 0.005) continue

          drawShape(ctx, x, y, shapeType, shapeType === 0 ? 1.2 : 2.5, alpha)
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
