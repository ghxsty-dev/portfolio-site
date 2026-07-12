import { motion } from "framer-motion"
import { useMemo } from "react"

export function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 4,
    })), []
  )

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full rounded-full bg-accent shadow-[0_0_6px_2px_rgba(225,29,72,0.5)]" />
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
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      className="hidden lg:block absolute right-0 bottom-0 w-[460px] h-[570px] select-none z-[5]"
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent rounded-full blur-3xl" />
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
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      size: Math.random() * 12 + 6,
      duration: Math.random() * 6 + 8,
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
            y: [0, 800],
            x: [0, Math.random() * 80 - 40],
            rotate: [0, 720],
            opacity: [0, 0.5, 0],
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
