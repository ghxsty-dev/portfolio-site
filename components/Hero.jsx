import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiArrowDown } from "react-icons/hi"
import { AnimeSilhouette, FloatingParticles, SakuraPetals } from "./AnimeDecoration"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  visible: {
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

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

export default function Hero({ profile }) {
  const [titleIndex, setTitleIndex] = useState(0)
  const [termPhase, setTermPhase] = useState("idle")
  const [termCmd, setTermCmd] = useState("")
  const [termLines, setTermLines] = useState(0)
  const titles = ["Full Stack Developer", "UI/UX Designer", "Creative Developer"]

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setTermPhase("typing"), 600)
    let i = 0
    const t2 = setInterval(() => {
      i++
      setTermCmd("fastfetch".slice(0, i))
      if (i >= 9) {
        clearInterval(t2)
        setTimeout(() => {
          setTermPhase("output")
          let li = 0
          const t3 = setInterval(() => {
            li++
            setTermLines(li)
            if (li >= fastfetch.length) clearInterval(t3)
          }, 40)
        }, 400)
      }
    }, 80)
    return () => { clearTimeout(t1); clearInterval(t2) }
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden bg-white dark:bg-black">
      <FloatingParticles />
      <SakuraPetals />
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />

      <div className="section-container w-full relative z-10">
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="font-jp text-sm mb-4 text-accent">
            こんにちは
          </motion.p>

          <motion.p variants={itemVariants} className="text-sm mb-2 text-gray-500 dark:text-gray-400">
            Merhaba, ben
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-4"
          >
            {profile.name.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.5, duration: 0.3 }}
                className="inline-block hover:text-[#e11d48] transition-colors duration-300 cursor-default"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div variants={itemVariants} className="h-10 mb-6">
            <motion.h2
              key={titleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent"
            >
              {titles[titleIndex]}
            </motion.h2>
          </motion.div>

          <motion.p variants={itemVariants} className="text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
            {profile.bio}
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4 mt-8">
            <motion.a
              href="#github"
              className="btn-primary"
              onClick={(e) => { e.preventDefault(); document.getElementById("github")?.scrollIntoView({ behavior: "smooth" }) }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Projelerimi Gör
            </motion.a>
            <motion.a
              href="https://discord.gg/CGmxFdwfCV"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              İletişime Geç
            </motion.a>
          </motion.div>

          {/* Terminal */}
          <motion.div
            variants={itemVariants}
            className="mt-8 rounded-lg overflow-hidden shadow-2xl max-w-[640px]"
            style={{ background: "#1a1b26", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center justify-between px-3 py-2" style={{ background: "#2f3340", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="flex items-center gap-2 text-[11px]" style={{ color: "#cdd6f4" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a6adc8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                <span>ghxsty@github: ~</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#f38ba8" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#fab387" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#a6e3a1" }} />
              </div>
            </div>
            <div className="p-3 sm:p-4" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 12 }}>
              <div className="flex items-center gap-0" style={{ color: "#cdd6f4" }}>
                <span style={{ color: "#a6e3a1" }}>ghxsty@github</span>
                <span style={{ color: "#89b4fa" }}>:</span>
                <span style={{ color: "#f5c2e7" }}>~</span>
                <span style={{ color: "#89b4fa" }}>$</span>
                <span className="ml-1.5">{termCmd}</span>
                {(termPhase === "typing" || (termPhase === "output" && termLines < fastfetch.length)) && (
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}>▊</motion.span>
                )}
              </div>
              <AnimatePresence>
                {termPhase === "output" && (
                  <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="leading-[1.4] whitespace-pre mt-1" style={{ color: "#a6e3a1" }}>
                    {fastfetch.slice(0, termLines).map((line, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -2 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.1 }}>
                        {line}
                      </motion.div>
                    ))}
                    {termLines >= fastfetch.length && (
                      <div className="flex items-center gap-0 mt-1.5">
                        <span style={{ color: "#a6e3a1" }}>ghxsty@github</span>
                        <span style={{ color: "#89b4fa" }}>:</span>
                        <span style={{ color: "#f5c2e7" }}>~</span>
                        <span style={{ color: "#89b4fa" }}>$</span>
                        <motion.span className="ml-1.5" animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>▊</motion.span>
                      </div>
                    )}
                  </motion.pre>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimeSilhouette />

      <motion.a
        href="#about"
        onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 dark:text-gray-600 hover:text-accent transition-colors"
      >
        <HiArrowDown size={24} />
      </motion.a>
    </section>
  )
}
