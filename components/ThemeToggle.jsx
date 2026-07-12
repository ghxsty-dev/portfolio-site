import { useTheme } from "next-themes"
import { useEffect, useState, useRef, useCallback } from "react"
import { HiSun, HiMoon } from "react-icons/hi"
import { motion, AnimatePresence } from "framer-motion"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const [nextTheme, setNextTheme] = useState(null)
  const btnRef = useRef(null)

  useEffect(() => setMounted(true), [])

  const toggle = useCallback(() => {
    if (animating || !btnRef.current || !mounted) return

    const rect = btnRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const target = theme === "dark" ? "light" : "dark"

    setOrigin({ x: cx, y: cy })
    setNextTheme(target)
    setAnimating(true)
  }, [animating, mounted, theme])

  useEffect(() => {
    if (!animating || !nextTheme) return
    const t1 = setTimeout(() => setTheme(nextTheme), 200)
    const t2 = setTimeout(() => {
      setAnimating(false)
      setNextTheme(null)
    }, 500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [animating, nextTheme, setTheme])

  if (!mounted) return null

  return (
    <>
      <motion.button
        ref={btnRef}
        onClick={toggle}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                   text-gray-600 dark:text-gray-400 hover:text-accent hover:border-accent/50
                   transition-colors duration-300 relative overflow-hidden"
        aria-label="Tema değiştir"
      >
        {theme === "dark" ? <HiSun size={20} /> : <HiMoon size={20} />}
      </motion.button>

      <AnimatePresence>
        {animating && (
          <motion.div
            key="theme-reveal"
            initial={{ clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }}
            animate={{ clipPath: `circle(150% at ${origin.x}px ${origin.y}px)` }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{ backgroundColor: nextTheme === "dark" ? "#000" : "#fff" }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
