import { motion } from "framer-motion"

export default function SectionHeader({ title, subtitle, jpText, side = "left" }) {
  return (
    <div className="text-center mb-16 relative">
      <div
        className={`absolute top-1/2 -translate-y-1/2 ${side === "left" ? "-left-8" : "-right-8"} pointer-events-none select-none hidden lg:block`}
      >
        <motion.span
          initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-jp text-[10rem] leading-none font-bold text-black/[0.04] dark:text-white/[0.04] whitespace-nowrap"
        >
          {jpText}
        </motion.span>
      </div>
      <h2 className="section-title">{title}</h2>
      <div className="glow-line mt-3" />
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  )
}
