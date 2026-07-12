import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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

export default function Hero({ profile }) {
  const [titleIndex, setTitleIndex] = useState(0)
  const titles = ["Full Stack Developer", "UI/UX Designer", "Creative Developer"]

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
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
