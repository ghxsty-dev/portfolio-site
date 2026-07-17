import { useEffect, useRef } from "react"

function hash(x, y) {
  let h = x * 374761393 + y * 668265263
  h = (h ^ (h >> 13)) * 1274126177
  h = h ^ (h >> 16)
  return h
}

function noise(x, y) {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = x - ix
  const fy = y - iy
  const sx = fx * fx * (3 - 2 * fx)
  const sy = fy * fy * (3 - 2 * fy)

  const n00 = (hash(ix, iy) & 0xffff) / 0xffff
  const n10 = (hash(ix + 1, iy) & 0xffff) / 0xffff
  const n01 = (hash(ix, iy + 1) & 0xffff) / 0xffff
  const n11 = (hash(ix + 1, iy + 1) & 0xffff) / 0xffff

  return (n00 * (1 - sx) + n10 * sx) * (1 - sy) +
         (n01 * (1 - sx) + n11 * sx) * sy
}

function fbm(x, y, octaves) {
  let val = 0
  let amp = 0.5
  let freq = 1
  for (let i = 0; i < octaves; i++) {
    val += amp * noise(x * freq, y * freq)
    amp *= 0.5
    freq *= 2
  }
  return val
}

function drawImage(ctx, w, h, time) {
  ctx.fillStyle = "#000"
  ctx.fillRect(0, 0, w, h)

  const spacing = 10
  const maxR = 4.5
  const scale = 0.003

  for (let y = 0; y < h; y += spacing) {
    for (let x = 0; x < w; x += spacing) {
      const nx = x * scale
      const ny = y * scale

      const n = fbm(nx + time * 0.1, ny + time * 0.05, 5)
      const n2 = fbm(nx * 2 + 3.7 + time * 0.08, ny * 2 + 7.1 + time * 0.04, 4)

      const combined = n * 0.7 + n2 * 0.3

      if (combined < 0.32) continue

      const intensity = Math.min((combined - 0.32) / 0.35, 1)
      const r = maxR * intensity

      if (r < 0.3) continue

      const light = Math.floor(80 + intensity * 100)
      const alpha = 0.3 + intensity * 0.5

      ctx.globalAlpha = alpha
      ctx.fillStyle = `rgb(${light}, ${light}, ${light})`
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  ctx.globalAlpha = 1
}

export default function Hero({ profile }) {
  const canvasRef = useRef(null)
  const frameRef = useRef(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let w, h

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    function animate() {
      timeRef.current += 0.015
      drawImage(ctx, w, h, timeRef.current)
      frameRef.current = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener("resize", resize)
    }
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
