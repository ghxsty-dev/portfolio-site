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

const desktopIcons = [
  { label: "Home", icon: "🏠", x: "5%", y: "5%" },
  { label: "Terminal", icon: "", x: "5%", y: "18%" },
  { label: "Projects", icon: "📁", x: "5%", y: "31%" },
  { label: "Trash", icon: "🗑️", x: "5%", y: "44%" },
]

const panelApps = [
  { id: "kickoff", icon: "" },
  { id: "terminal", icon: "" },
  { id: "files", icon: "📁" },
  { id: "browser", icon: "🌐" },
  { id: "settings", icon: "⚙" },
]

function useTypewriter(text, speed = 60, start = false) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!start) { setDisplayed(""); setDone(false); return }
    let i = 0
    setDisplayed("")
    setDone(false)
    const timer = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(timer); setDone(true) }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed, start])

  return { displayed, done }
}

function useLineRevealer(lines, start = false, lineDelay = 80) {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (!start) { setVisible(0); return }
    setVisible(0)
    const timer = setInterval(() => {
      setVisible((v) => { if (v >= lines.length) { clearInterval(timer); return v }; return v + 1 })
    }, lineDelay)
    return () => clearInterval(timer)
  }, [lines, start, lineDelay])

  return visible
}

function CursorSVG({ size = 28 }) {
  return (
    <svg width={size} height={size * 1.35} viewBox="0 0 24 32" fill="none">
      <path d="M3 2L5 30L10.5 22L16.5 29.5L19.5 27L13.5 19.5L21 17L3 2Z" fill="white" stroke="#1a1a1a" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export default function Linux() {
  const [phase, setPhase] = useState("idle")
  const sectionRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleSectionEnter = useCallback(() => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const startX = rect.left + rect.width - 40
    const startY = rect.top + rect.height - 60
    const targetX = rect.left + rect.width * 0.3
    const targetY = rect.bottom - 55
    setMousePos({ startX, startY, targetX, targetY })
    setPhase("cursor-move")
  }, [])

  const handleSectionLeave = useCallback(() => {
    setPhase("idle")
    setMousePos({})
  }, [])

  const cursorInitDone = useRef(false)
  useEffect(() => {
    if (phase !== "cursor-move" || cursorInitDone.current) return
    cursorInitDone.current = true
    const t1 = setTimeout(() => setPhase("cursor-click"), 1500)
    const t2 = setTimeout(() => setPhase("typing"), 2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [phase])

  const { displayed: cmdText, done: cmdDone } = useTypewriter("fastfetch", 90, phase === "typing")
  useEffect(() => { if (cmdDone) { const t = setTimeout(() => setPhase("output"), 400); return () => clearTimeout(t) } }, [cmdDone])

  const outputLines = useLineRevealer(fastfetch, phase === "output", 50)

  const [time, setTime] = useState("")
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }))
    tick(); const i = setInterval(tick, 10000)
    return () => clearInterval(i)
  }, [])

  const resetAll = useCallback(() => {
    cursorInitDone.current = false
    setPhase("idle")
    setMousePos({})
  }, [])

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
      onMouseEnter={handleSectionEnter}
      onMouseLeave={() => { handleSectionLeave(); resetAll() }}
    >
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url(/images/background.png)", backgroundSize: "cover" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1e1e2e 0%, #2b2b3d 30%, #1a1a2e 60%, #0f0f1a 100%)", opacity: 0.8 }} />

      {/* Ambient glow behind terminal */}
      <AnimatePresence>
        {phase === "output" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(137,180,250,0.06) 0%, transparent 70%)" }} />
        )}
      </AnimatePresence>

      {/* Desktop Icons */}
      {desktopIcons.map((icon, i) => (
        <motion.div
          key={icon.label}
          className="absolute flex flex-col items-center gap-1"
          style={{ left: icon.x, top: icon.y }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl cursor-pointer"
            style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.04)" }}
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut", delay: i * 0.5 }}
          >
            {icon.icon}
          </motion.div>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md" style={{ color: "#cdd6f4", background: "rgba(0,0,0,0.3)" }}>
            {icon.label}
          </span>
        </motion.div>
      ))}

      {/* Terminal */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          className="rounded-lg overflow-hidden shadow-2xl"
          style={{
            width: "75%",
            maxWidth: 820,
            background: "#1a1b26",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={
            phase === "idle" ? { opacity: 0.3, scale: 0.95, y: 0 }
            : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "#2f3340", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "#a6adc8" }}></span>
              <span className="text-xs font-medium" style={{ color: "#cdd6f4" }}>ghxsty@github: ~</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div className="w-3.5 h-3.5 rounded-full" style={{ background: "#f38ba8" }} whileHover={{ scale: 1.3 }}>
                <svg width="6" height="6" viewBox="0 0 6 6" className="m-auto" style={{ marginTop: 3.5 }}><path d="M1 1L5 5M5 1L1 5" stroke="#1e1e2e" strokeWidth="1.5" /></svg>
              </motion.div>
              <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: "#fab387" }}>
                <svg width="6" height="6" viewBox="0 0 6 6"><path d="M1 3H5M3 1V5" stroke="#1e1e2e" strokeWidth="1.5" /></svg>
              </div>
              <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: "#a6e3a1" }}>
                <svg width="6" height="6" viewBox="0 0 6 6"><path d="M1 5V1H5V5Z" stroke="#1e1e2e" strokeWidth="1.5" /></svg>
              </div>
            </div>
          </div>

          {/* Terminal body */}
          <div className="p-4 sm:p-5 min-h-[200px]" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
            {/* Command line */}
            <div className="flex items-center gap-2 text-xs mb-3">
              <span style={{ color: "#89b4fa" }}>$</span>
              <span style={{ color: "#cdd6f4" }}>
                {cmdText}
                {(phase === "typing" && !cmdDone) && (
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} style={{ color: "#cdd6f4" }}>▊</motion.span>
                )}
                {(phase === "typing" && cmdDone) && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <motion.span
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 0.85, 1] }}
                      transition={{ duration: 0.2 }}
                      style={{ color: "#6c7086" }}
                    >
                      ⏎
                    </motion.span>
                  </motion.span>
                )}
              </span>
            </div>

            {/* Output */}
            <AnimatePresence>
              {phase === "output" && (
                <motion.pre
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs leading-[1.45] whitespace-pre"
                  style={{ color: "#a6e3a1" }}
                >
                  {fastfetch.slice(0, outputLines).map((line, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }}>{line}</motion.div>
                  ))}
                  {outputLines < fastfetch.length && (
                    <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} style={{ color: "#a6e3a1" }}>▊</motion.span>
                  )}
                  {outputLines >= fastfetch.length && (
                    <div className="flex items-center gap-2 mt-3">
                      <span style={{ color: "#89b4fa" }}>$</span>
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        style={{ color: "#cdd6f4" }}
                      >
                        ▊
                      </motion.span>
                    </div>
                  )}
                </motion.pre>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Animated Cursor */}
      <AnimatePresence>
        {(phase === "cursor-move") && (
          <motion.div
            className="fixed z-50 pointer-events-none"
            initial={{ left: mousePos.startX, top: mousePos.startY, opacity: 0, scale: 0.8 }}
            animate={{ left: mousePos.targetX, top: mousePos.targetY, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <CursorSVG />
          </motion.div>
        )}
        {phase === "cursor-click" && (
          <motion.div
            className="fixed z-50 pointer-events-none"
            initial={{ left: mousePos.targetX, top: mousePos.targetY }}
            animate={{ left: mousePos.targetX, top: mousePos.targetY }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ scale: [1, 0.85, 1] }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <CursorSVG />
              <motion.div
                initial={{ scale: 0.5, opacity: 0.7 }}
                animate={{ scale: 3.5, opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute rounded-full"
                style={{ top: 14, left: 8, width: 10, height: 10, border: "2px solid rgba(255,255,255,0.7)" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KDE Panel */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-1.5"
        style={{ background: "rgba(30,30,46,0.85)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-1">
          {panelApps.map((app) => (
            <motion.button
              key={app.id}
              className="flex items-center px-2.5 py-1 rounded-md text-lg transition-all duration-200"
              style={{
                background: app.id === "terminal" && (phase === "typing" || phase === "output") ? "rgba(137,180,250,0.15)" : "transparent",
                color: app.id === "terminal" && (phase === "typing" || phase === "output") ? "#89b4fa" : "#cdd6f4",
              }}
              whileHover={{ background: "rgba(255,255,255,0.06)" }}
              animate={app.id === "terminal" && (phase === "typing" || phase === "output") ? { scale: [1, 1.08, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {app.icon}
            </motion.button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs" style={{ color: "#cdd6f4" }}>
          <motion.span animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 3 }}>🔊</motion.span>
          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2.5 }}>📶</motion.span>
          <span className="font-medium" style={{ letterSpacing: "0.3px" }}>{time}</span>
        </div>
      </motion.div>
    </section>
  )
}
