import { motion } from "framer-motion"
import { useMemo } from "react"

export function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 8,
      duration: Math.random() * 5 + 5,
      driftX: (Math.random() - 0.5) * 60,
      color: i % 3 === 0 ? "accent" : i % 3 === 1 ? "white" : "accent",
    })), []
  )

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -60, 0],
            x: [0, p.driftX, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1.8, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className={`w-${p.size} h-${p.size} rounded-full ${p.color === "accent" ? "bg-accent shadow-[0_0_8px_3px_rgba(225,29,72,0.4)]" : "bg-white dark:bg-white/30 shadow-[0_0_6px_2px_rgba(255,255,255,0.2)]"}`}
            style={{ width: p.size, height: p.size }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export function JapanesePattern() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="seigaiha" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="60" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="30" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="30" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#seigaiha)" />
    </svg>
  )
}

export function AnimeSilhouette() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80, rotate: 5 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hidden lg:block absolute right-0 bottom-0 w-[460px] h-[570px] select-none z-[5]"
    >
      <div className="relative w-full h-full">
        <motion.div
          animate={{
            boxShadow: ["0 0 30px rgba(225,29,72,0.3)", "0 0 60px rgba(225,29,72,0.5)", "0 0 30px rgba(225,29,72,0.3)"],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent rounded-full blur-3xl"
        />
        <div className="relative w-full h-full">
          <img
            src="/images/anime-character.png"
            alt="Anime karakter"
            className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(225,29,72,0.3)]"
            draggable={false}
          />
        </div>
      </div>
    </motion.div>
  )
}

export function SakuraPetals() {
  const petals = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      size: Math.random() * 14 + 6,
      duration: Math.random() * 8 + 10,
      sway: (Math.random() - 0.5) * 120,
    })), []
  )

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.left}%`, top: -30 }}
          animate={{
            y: [0, 900],
            x: [0, p.sway, p.sway / 2, -p.sway / 2, 0],
            rotate: [0, 360, 720, 1080],
            opacity: [0, 0.6, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 20 20" className="text-accent">
            <path
              d="M10 2 C12 6 16 8 18 10 C16 12 12 14 10 18 C8 14 4 12 2 10 C4 8 8 6 10 2Z"
              fill="currentColor"
              opacity="0.5"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

export function ScrollProgress() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent z-[100] origin-left"
      style={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.1 }}
    />
  )
}
