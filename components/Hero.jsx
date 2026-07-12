import { motion } from "framer-motion"
import { HiArrowDown } from "react-icons/hi"
import { AnimeSilhouette, FloatingParticles, SakuraPetals } from "./AnimeDecoration"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function Hero({ profile }) {
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
            {profile.name}
          </motion.h1>

          <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent mb-6">
            {profile.title}
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
            {profile.bio}
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4 mt-8">
            <a
              href="#projects"
              className="btn-primary"
              onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) }}
            >
              Projelerimi Gör
            </a>
            <a
              href="https://discord.gg/CGmxFdwfCV"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              İletişime Geç
            </a>
          </motion.div>
        </motion.div>
      </div>

      <AnimeSilhouette />

      <motion.a
        href="#about"
        onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 dark:text-gray-600 hover:text-accent transition-colors animate-bounce"
      >
        <HiArrowDown size={24} />
      </motion.a>
    </section>
  )
}
