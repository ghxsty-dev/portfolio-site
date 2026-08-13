import Image from "next/image"
import { motion } from "framer-motion"

export default function Hero({ profile }) {
  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#000" }}
    >
      <Image
        src="/images/background.png"
        alt="Background"
        fill
        className="object-cover"
        style={{ zIndex: 0 }}
        priority
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center px-4 relative"
        style={{ zIndex: 1 }}
      >
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight">
          {profile.name}
        </h1>
      </motion.div>
    </section>
  )
}
