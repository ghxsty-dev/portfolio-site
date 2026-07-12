import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const fastfetch = [
  "                 -`                     ghxsty@github",
  "                .o+`                    -------------------------",
  "               `ooo/                    Name      : Kıvanç Toprak",
  "              `+oooo:                   Alias     : Ghxsty",
  "             `+oooooo:                  Brand     : SkyBlue",
  "             -+oooooo+:                 Role      : Developer, Designer",
  "           `/:-:++oooo+:                Focus     : Discord Systems, Logo, Banner",
  "          `/++++/+++++++:               Stack     : JS • TS • Node.js",
  "         `/++++++++++++++:              Frontend  : HTML • CSS",
  "        `/+++ooooooooooooo/`            Database  : MongoDB",
  "       ./ooosssso++osssssso+`           Website   : ghxsty.lol",
  "      .oossssso-````/ossssss+`          Status    : Online on Discord (Add me: ghxsty.lol)",
  "     -osssssso.      :ssssssso.",
  "    :osssssss/        osssso+++.",
  "   /ossssssss/        +ssssooo/-",
  " `/ossssso+/:-        -:/+osssso+-",
  "`+sso+:-`                 `.-/+oso:",
  "`++:.                           `-+/+",
]

export default function Linux() {
  const [phase, setPhase] = useState("idle")
  const [cmd, setCmd] = useState("")
  const [lines, setLines] = useState(0)
  const [cursorPos, setCursorPos] = useState({ fromX: 0, fromY: 0, toX: 0, toY: 0 })
  const sectionRef = useRef(null)
  const timerRef = useRef(null)

  const clearTimers = useCallback(() => {
    timerRef.current?.forEach(clearTimeout)
    timerRef.current = null
  }, [])

  const start = useCallback(() => {
    if (phase !== "idle") return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return

    const fromX = rect.right - 50
    const fromY = rect.bottom - 70
    const toX = rect.left + rect.width * 0.3
    const toY = rect.bottom - 50

    setCursorPos({ fromX, fromY, toX, toY })
    setPhase("cursor")

    const t1 = setTimeout(() => {
      setPhase("typing")
      let i = 0
      const t = setInterval(() => {
        i++
        setCmd("fastfetch".slice(0, i))
        if (i >= 9) {
          clearInterval(t)
          setTimeout(() => {
            setPhase("output")
            let li = 0
            const lt = setInterval(() => {
              li++
              setLines(li)
              if (li >= fastfetch.length) clearInterval(lt)
            }, 40)
          }, 400)
        }
      }, 80)
    }, 1400)

    timerRef.current = [t1]
  }, [phase])

  const reset = useCallback(() => {
    clearTimers()
    setPhase("idle")
    setCmd("")
    setLines(0)
  }, [clearTimers])

  return (
    <section
      ref={sectionRef}
      id="linux"
      className="relative overflow-hidden select-none"
      style={{
        background: "#1e1e2e",
        minHeight: 580,
        height: "100vh",
        maxHeight: 700,
      }}
      onMouseEnter={start}
      onMouseLeave={reset}
    >
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url(/images/background.png)", backgroundSize: "cover" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1e1e2e 0%, #2b2b3d 30%, #1a1a2e 60%, #0f0f1a 100%)", opacity: 0.8 }} />

      {/* Terminal */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          className="rounded-lg overflow-hidden shadow-2xl w-[75%] max-w-[820px]"
          style={{ background: "#1a1b26", border: "1px solid rgba(255,255,255,0.06)" }}
          initial={{ opacity: 0.25, scale: 0.95 }}
          animate={phase !== "idle" ? { opacity: 1, scale: 1 } : { opacity: 0.25, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "#2f3340", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="flex items-center gap-2 text-xs" style={{ color: "#cdd6f4" }}>
              <span style={{ color: "#a6adc8" }}></span>
              <span>ghxsty@github: ~</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "#f38ba8" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#fab387" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#a6e3a1" }} />
            </div>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-5 min-h-[220px]" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 13 }}>
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: "#89b4fa" }}>$</span>
              <span style={{ color: "#cdd6f4" }}>
                {cmd}
                {(phase === "typing" || (phase === "output" && lines < fastfetch.length)) && (
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}>▊</motion.span>
                )}
              </span>
            </div>

            <AnimatePresence>
              {phase === "output" && (
                <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="leading-[1.45] whitespace-pre" style={{ color: "#a6e3a1" }}>
                  {fastfetch.slice(0, lines).map((line, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.1 }}>
                      {line}
                    </motion.div>
                  ))}
                  {lines >= fastfetch.length && (
                    <div className="flex items-center gap-2 mt-2">
                      <span style={{ color: "#89b4fa" }}>$</span>
                      <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>▊</motion.span>
                    </div>
                  )}
                </motion.pre>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Mouse Cursor */}
      <AnimatePresence>
        {phase === "cursor" && (
          <motion.div
            key="cursor"
            className="fixed z-50 pointer-events-none"
            initial={{ left: cursorPos.fromX, top: cursorPos.fromY, opacity: 1, scale: 1 }}
            animate={[
              { left: cursorPos.toX, top: cursorPos.toY, transition: { duration: 1.2, ease: "easeInOut" } },
              { scale: [1, 0.85, 1], transition: { duration: 0.3, delay: 0 } },
            ]}
            exit={{ opacity: 0 }}
          >
            <svg width="22" height="30" viewBox="0 0 22 30" fill="none">
              <path d="M2 2L4 27L9 20L14 27L17 25L12 18L19 16L2 2Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <motion.div
              initial={{ scale: 0.5, opacity: 0.7 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute rounded-full"
              style={{ top: 13, left: 7, width: 10, height: 10, border: "2px solid rgba(255,255,255,0.7)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* KDE Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-1.5" style={{ background: "rgba(30,30,46,0.85)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-1">
          <button className="text-lg px-2.5 py-1 rounded-md transition-all" style={{ color: phase !== "idle" ? "#89b4fa" : "#cdd6f4", background: phase !== "idle" ? "rgba(137,180,250,0.15)" : "transparent" }}>
            
          </button>
        </div>
        <div className="flex items-center gap-3 text-xs" style={{ color: "#cdd6f4" }}>
          <span className="opacity-60">🔊</span>
          <span className="opacity-60">📶</span>
          <span>{new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>
    </section>
  )
}
