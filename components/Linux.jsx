import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const fastfetch = [
  { line: "                 -`                     ghxsty@github", color: "#a6e3a1" },
  { line: "                .o+`                    -------------------------", color: "#a6e3a1" },
  { line: "               `ooo/                    Name      : Kıvanç Toprak", color: "#a6e3a1" },
  { line: "              `+oooo:                   Alias     : Ghxsty", color: "#a6e3a1" },
  { line: "             `+oooooo:                  Brand     : SkyBlue", color: "#a6e3a1" },
  { line: "             -+oooooo+:                 Role      : Developer, Designer", color: "#a6e3a1" },
  { line: "           `/:-:++oooo+:                Focus     : Discord Systems, Logo, Banner", color: "#a6e3a1" },
  { line: "          `/++++/+++++++:               Stack     : JS • TS • Node.js", color: "#a6e3a1" },
  { line: "         `/++++++++++++++:              Frontend  : HTML • CSS", color: "#a6e3a1" },
  { line: "        `/+++ooooooooooooo/`            Database  : MongoDB", color: "#a6e3a1" },
  { line: "       ./ooosssso++osssssso+`           Website   : ghxsty.lol", color: "#a6e3a1" },
  { line: "      .oossssso-````/ossssss+`          Status    : Online on Discord (Add me: ghxsty.lol)", color: "#a6e3a1" },
  { line: "     -osssssso.      :ssssssso.", color: "#a6e3a1" },
  { line: "    :osssssss/        osssso+++.", color: "#a6e3a1" },
  { line: "   /ossssssss/        +ssssooo/-", color: "#a6e3a1" },
  { line: " `/ossssso+/:-        -:/+osssso+-", color: "#a6e3a1" },
  { line: "`+sso+:-`                 `.-/+oso:", color: "#a6e3a1" },
  { line: "`++:.                           `-/+/", color: "#a6e3a1" },
]

const desktopIcons = [
  { label: "Home", icon: "🏠", x: "5%", y: "5%" },
  { label: "Terminal", icon: "", x: "5%", y: "18%" },
  { label: "Projects", icon: "📁", x: "5%", y: "31%" },
  { label: "Trash", icon: "🗑️", x: "5%", y: "44%" },
]

const panelApps = [
  { id: "kickoff", icon: "", label: "Applications" },
  { id: "terminal", icon: "", label: "Terminal" },
  { id: "files", icon: "📁", label: "File Manager" },
  { id: "browser", icon: "🌐", label: "Web Browser" },
  { id: "settings", icon: "⚙", label: "Settings" },
]

export default function Linux() {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [cursorPhase, setCursorPhase] = useState("idle")
  const sectionRef = useRef(null)
  const terminalBtnRef = useRef(null)

  const handleSectionEnter = () => {
    setCursorPhase("moving")
    setTimeout(() => setCursorPhase("clicking"), 1200)
    setTimeout(() => { setTerminalOpen(true); setCursorPhase("done") }, 1800)
  }

  const handleSectionLeave = () => {
    setCursorPhase("idle")
    setTerminalOpen(false)
  }

  return (
    <section
      ref={sectionRef}
      id="linux"
      className="relative py-24 overflow-hidden select-none"
      style={{
        background: "#1e1e2e",
        minHeight: 600,
      }}
      onMouseEnter={handleSectionEnter}
      onMouseLeave={handleSectionLeave}
    >
      {/* Wallpaper layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url(/images/background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Fallback gradient if no wallpaper */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, #1e1e2e 0%, #2b2b3d 30%, #1a1a2e 60%, #111120 100%)",
        opacity: 0.7,
      }} />

      {/* Desktop icons */}
      <div className="relative z-10 h-full">
        {desktopIcons.map((icon) => (
          <div
            key={icon.label}
            className="absolute flex flex-col items-center gap-1 cursor-pointer group"
            style={{ left: icon.x, top: icon.y }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {icon.icon}
            </div>
            <span
              className="text-[11px] font-medium px-2 py-0.5 rounded-md"
              style={{ color: "#cdd6f4", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }}
            >
              {icon.label}
            </span>
          </div>
        ))}

        {/* Terminal Window */}
        <AnimatePresence>
          {terminalOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute rounded-lg overflow-hidden shadow-2xl"
              style={{
                width: "72%",
                maxWidth: 820,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background: "#1a1b26",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* Terminal Title Bar */}
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ background: "#2f3340", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium" style={{ color: "#a6adc8" }}></span>
                  <span className="text-xs font-medium" style={{ color: "#cdd6f4", fontFamily: "Inter, system-ui, sans-serif" }}>
                    ghxsty@github: ~
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center cursor-pointer" style={{ background: "#f38ba8" }} onClick={() => setTerminalOpen(false)}>
                    <svg width="6" height="6" viewBox="0 0 6 6"><path d="M1 1L5 5M5 1L1 5" stroke="#1e1e2e" strokeWidth="1.2" /></svg>
                  </div>
                  <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: "#fab387" }}>
                    <svg width="6" height="6" viewBox="0 0 6 6"><path d="M1 3H5M3 1V5" stroke="#1e1e2e" strokeWidth="1.2" /></svg>
                  </div>
                  <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: "#a6e3a1" }}>
                    <svg width="6" height="6" viewBox="0 0 6 6"><path d="M1 5V1H5V5Z" stroke="#1e1e2e" strokeWidth="1.2" /></svg>
                  </div>
                </div>
              </div>

              {/* Fastfetch Output */}
              <div className="p-4 sm:p-5 overflow-x-auto" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
                <div className="flex items-center gap-2 mb-3 text-xs" style={{ color: "#6c7086" }}>
                  <span style={{ color: "#89b4fa" }}>$</span>
                  <span>fastfetch</span>
                </div>
                <pre className="text-xs leading-[1.45] whitespace-pre" style={{ color: "#a6e3a1" }}>
                  {fastfetch.map((f, i) => (
                    <div key={i} style={{ color: f.color }}>{f.line}</div>
                  ))}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Mouse Cursor */}
        <AnimatePresence>
          {(cursorPhase === "moving" || cursorPhase === "clicking") && (
            <motion.div
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={
                cursorPhase === "moving"
                  ? { opacity: 1, x: 320, y: -120 }
                  : { opacity: 1, x: 320, y: -120 }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: cursorPhase === "moving" ? 1.2 : 0.3, ease: "easeInOut" }}
              className="fixed z-50 pointer-events-none"
              style={{ bottom: 100, right: 100 }}
            >
              <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                <path d="M4 2L4 26L10 20L16 28L19 26L13 18L20 17L4 2Z" fill="white" stroke="black" strokeWidth="1" />
              </svg>
            </motion.div>
          )}
          {cursorPhase === "clicking" && (
            <motion.div
              initial={{ opacity: 0, x: 320, y: -120 }}
              animate={{ opacity: 1, x: 320, y: -120, scale: [1, 0.85, 1] }}
              transition={{ duration: 0.4 }}
              className="fixed z-50 pointer-events-none"
              style={{ bottom: 100, right: 100 }}
            >
              <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                <path d="M4 2L4 26L10 20L16 28L19 26L13 18L20 17L4 2Z" fill="white" stroke="black" strokeWidth="1.5" />
              </svg>
              {/* Click ripple */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute w-6 h-6 rounded-full"
                style={{ top: 10, left: 6, border: "2px solid rgba(255,255,255,0.6)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* KDE Panel (Bottom) */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-1.5"
        style={{
          background: "rgba(30,30,46,0.85)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Left: App Icons */}
        <div className="flex items-center gap-1">
          {panelApps.map((app) => (
            <button
              key={app.id}
              ref={app.id === "terminal" ? terminalBtnRef : null}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-200 text-sm"
              style={{
                background: app.id === "terminal" && terminalOpen ? "rgba(137,180,250,0.15)" : "transparent",
                color: app.id === "terminal" && terminalOpen ? "#89b4fa" : "#cdd6f4",
              }}
              onMouseEnter={(e) => { if (!(app.id === "terminal" && terminalOpen)) e.currentTarget.style.background = "rgba(255,255,255,0.06)" }}
              onMouseLeave={(e) => { if (!(app.id === "terminal" && terminalOpen)) e.currentTarget.style.background = "transparent" }}
            >
              <span className="text-lg">{app.icon}</span>
            </button>
          ))}
        </div>

        {/* Center: Icons-only area (spacer) */}
        <div />

        {/* Right: Clock & System Tray */}
        <div className="flex items-center gap-3 text-xs" style={{ color: "#cdd6f4" }}>
          <span className="opacity-60">🔊</span>
          <span className="opacity-60">📶</span>
          <span className="font-medium" style={{ fontFamily: "Inter, system-ui, sans-serif", letterSpacing: "0.3px" }}>
            {new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>

      {/* Instruction text */}
      {!terminalOpen && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-xs"
            style={{ color: "#a6adc8" }}
          >
            Hover to open terminal →
          </motion.p>
        </div>
      )}
    </section>
  )
}
