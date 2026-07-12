import { useState, useEffect } from "react"
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

export default function Terminal() {
  const [phase, setPhase] = useState("idle")
  const [cmd, setCmd] = useState("")
  const [lines, setLines] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("typing"), 300)
    let i = 0
    const t2 = setInterval(() => {
      i++
      setCmd("fastfetch".slice(0, i))
      if (i >= 9) {
        clearInterval(t2)
        setTimeout(() => {
          setPhase("output")
          let li = 0
          const t3 = setInterval(() => {
            li++
            setLines(li)
            if (li >= fastfetch.length) clearInterval(t3)
          }, 40)
        }, 400)
      }
    }, 80)
    return () => { clearTimeout(t1); clearInterval(t2) }
  }, [])

  return (
    <section className="py-12 sm:py-16 flex items-center justify-center" style={{ background: "#0d1117" }}>
      <div className="w-full max-w-3xl mx-auto px-4">
        <motion.div
          className="rounded-lg overflow-hidden shadow-2xl"
          style={{ background: "#1a1b26", border: "1px solid rgba(255,255,255,0.06)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "#2f3340", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="flex items-center gap-2 text-xs" style={{ color: "#cdd6f4" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a6adc8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              <span>ghxsty@github: ~</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "#f38ba8" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#fab387" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#a6e3a1" }} />
            </div>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-5 min-h-[200px]" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 13 }}>
            <div className="flex items-center gap-0 mb-2" style={{ color: "#cdd6f4" }}>
              <span style={{ color: "#a6e3a1" }}>ghxsty@github</span>
              <span style={{ color: "#89b4fa" }}>:</span>
              <span style={{ color: "#f5c2e7" }}>~</span>
              <span style={{ color: "#89b4fa" }}>$</span>
              <span className="ml-2">{cmd}</span>
              {(phase === "typing" || (phase === "output" && lines < fastfetch.length)) && (
                <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}>▊</motion.span>
              )}
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
                    <div className="flex items-center gap-0 mt-2">
                      <span style={{ color: "#a6e3a1" }}>ghxsty@github</span>
                      <span style={{ color: "#89b4fa" }}>:</span>
                      <span style={{ color: "#f5c2e7" }}>~</span>
                      <span style={{ color: "#89b4fa" }}>$</span>
                      <motion.span className="ml-2" animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>▊</motion.span>
                    </div>
                  )}
                </motion.pre>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
