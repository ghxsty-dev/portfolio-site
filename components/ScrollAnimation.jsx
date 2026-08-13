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
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: i === currentSection ? "#fff" : "#333",
              transform: i === currentSection ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Indikator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ opacity: currentSection < sections.length - 1 ? 0.4 : 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 8L10 14L16 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
