import { useState, useEffect, useRef, useCallback } from "react"

const POND_COUNT = 60

const shapes = [
  { type: "dot", render: (s) => `<circle cx="${s.x}" cy="${s.y}" r="1.5" fill="rgba(255,255,255,${s.o})"/>` },
  { type: "cross", render: (s) => `<path d="M${s.x-3} ${s.y-3}L${s.x+3} ${s.y+3}M${s.x+3} ${s.y-3}L${s.x-3} ${s.y+3}" stroke="rgba(255,255,255,${s.o})" stroke-width="1"/>` },
  { type: "line", render: (s) => `<line x1="${s.x-5}" y1="${s.y}" x2="${s.x+5}" y2="${s.y}" stroke="rgba(255,255,255,${s.o})" stroke-width="0.8"/>` },
  { type: "dash", render: (s) => `<line x1="${s.x-4}" y1="${s.y}" x2="${s.x+4}" y2="${s.y}" stroke="rgba(255,255,255,${s.o})" stroke-width="1" stroke-dasharray="2 1"/>` },
]

function generatePond(w, h) {
  const items = []
  for (let i = 0; i < POND_COUNT; i++) {
    const shape = shapes[i % shapes.length]
    items.push({
      x: Math.random() * w,
      y: Math.random() * h,
      ox: (Math.random() - 0.5) * 20,
      oy: (Math.random() - 0.5) * 20,
      o: 0.04 + Math.random() * 0.06,
      render: shape.render,
    })
  }
  return items
}

export default function Hero({ profile }) {
  const [titleIndex, setTitleIndex] = useState(0)
  const [pond, setPond] = useState([])
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const sectionRef = useRef(null)
  const titles = ["Full Stack Developer", "UI/UX Designer", "Creative Developer"]

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
    const { width, height } = sectionRef.current.getBoundingClientRect()
    setPond(generatePond(width, height))
  }, [])

  const handleMouse = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#000" }}
      onMouseMove={handleMouse}
    >
      {/* Pond SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {pond.map((p, i) => (
          <g
            key={i}
            style={{
              transform: `translate(${p.ox * mouse.x}px, ${p.oy * mouse.y}px)`,
              transition: "transform 0.15s ease-out",
            }}
            dangerouslySetInnerHTML={{ __html: p.render(p) }}
          />
        ))}
      </svg>

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

