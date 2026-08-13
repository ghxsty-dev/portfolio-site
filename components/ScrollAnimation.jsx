import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ScrollAnimation({ children }) {
  const sections = Array.isArray(children) ? children : [children]
  const [currentSection, setCurrentSection] = useState(0)
  const [direction, setDirection] = useState(1)
  const isAnimating = useRef(false)
  const touchStart = useRef(0)

  const goTo = useCallback((index) => {
    if (isAnimating.current) return
    if (index < 0 || index >= sections.length) return
    isAnimating.current = true
    setDirection(index > currentSection ? 1 : -1)
    setCurrentSection(index)
    setTimeout(() => { isAnimating.current = false }, 800)
  }, [currentSection, sections.length])

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      if (isAnimating.current) return
      if (e.deltaY > 30) goTo(currentSection + 1)
      else if (e.deltaY < -30) goTo(currentSection - 1)
    }

    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault()
        goTo(currentSection + 1)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        goTo(currentSection - 1)
      }
    }

    const handleTouchStart = (e) => {
      touchStart.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      const diff = touchStart.current - e.changedTouches[0].clientY
      if (Math.abs(diff) > 50) {
        if (diff > 0) goTo(currentSection + 1)
        else goTo(currentSection - 1)
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [currentSection, goTo])

  const slideVariants = {
    enter: (dir) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  }

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: "#000" }}>
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={currentSection}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="absolute inset-0"
        >
          {sections[currentSection]}
        </motion.div>
      </AnimatePresence>

      {/* Noktalar */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-0">
        {sections.map((_, i) => {
          const isActive = i === currentSection
          return (
            <div key={i} className="flex items-center justify-end h-10 relative group">
              {/* Container */}
              <button
                onClick={() => goTo(i)}
                className="relative flex items-center justify-center h-10 w-10 cursor-pointer"
              >
                {/* Dış halka - aktifken parlıyor */}
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute rounded-full"
                  style={{
                    width: 28,
                    height: 28,
                    background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                  }}
                />

                {/* Pulse halkası */}
                {isActive && (
                  <motion.div
                    animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    className="absolute rounded-full"
                    style={{
                      width: 12,
                      height: 12,
                      border: "1px solid rgba(255,255,255,0.4)",
                    }}
                  />
                )}

                {/* Aktif çizgi (pil shape) */}
                <motion.div
                  animate={{
                    width: isActive ? 24 : 6,
                    height: isActive ? 6 : 6,
                    borderRadius: isActive ? 999 : 999,
                  }}
                  transition={{ duration: 0.5, ease: [0.35, 0, 0.25, 1] }}
                  style={{
                    background: isActive
                      ? "linear-gradient(90deg, #fff 0%, #aaa 100%)"
                      : "#333",
                    boxShadow: isActive ? "0 0 12px rgba(255,255,255,0.4)" : "none",
                  }}
                />
              </button>
            </div>
          )
        })}

        {/* Dikey çizgi (progress) */}
        <div
          className="absolute top-0 right-[19px] w-[2px] h-full rounded-full overflow-hidden"
          style={{ background: "#1a1a1a" }}
        >
          <motion.div
            animate={{
              height: `${((currentSection) / (sections.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              width: "100%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)",
            }}
          />
        </div>
      </div>

      {/* İndikator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: currentSection < sections.length - 1 ? 0.3 : 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 8L10 14L16 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
        <motion.span
          animate={{ opacity: currentSection < sections.length - 1 ? 0.3 : 0 }}
          className="text-[10px] tracking-widest uppercase"
          style={{ color: "#666" }}
        >
          Kaydır
        </motion.span>
      </div>
    </div>
  )
}
