import { motion } from "framer-motion"
import { HiMail } from "react-icons/hi"
import { FaDiscord, FaGithub, FaInstagram } from "react-icons/fa"

const socialLinks = [
  { icon: HiMail, label: "Email", href: "mailto:", key: "email", color: "#007aff" },
  { icon: FaDiscord, label: "Discord", href: null, key: "discord", color: "#5865f2" },
  { icon: FaGithub, label: "GitHub", href: null, key: "github", color: "#f0f6fc" },
  { icon: FaInstagram, label: "Instagram", href: null, key: "instagram", color: "#e1306c" },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Contact({ profile }) {
  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{ background: "#007aff" }} />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{ background: "#5865f2" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#e1306c" }} />
      </div>

      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl rounded-3xl p-1"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <div className="rounded-[22px] overflow-hidden" style={{ background: "rgba(22,22,34,0.6)" }}>
            <div className="px-6 pt-8 pb-4 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-semibold mb-1"
                style={{ color: "#f5f5f7", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}
              >
                İletişim
              </motion.h2>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
                Bana ulaşmak için birini seçin
              </p>
            </div>

            <div className="px-3 pb-3 space-y-0.5">
              {socialLinks.map((link) => {
                const value = profile.social[link.key]
                if (!value) return null

                const href = link.key === "email" ? `mailto:${value}` : value
                const isExternal = link.key !== "email"

                return (
                  <motion.a
                    key={link.key}
                    variants={item}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${link.color}88, ${link.color}44)`,
                        boxShadow: `0 0 20px ${link.color}33, inset 0 1px 0 rgba(255,255,255,0.2)`,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <link.icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate" style={{ color: "#f5f5f7", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>
                        {link.label}
                      </p>
                      <p className="text-xs truncate max-w-[200px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
                        {value}
                      </p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.3, flexShrink: 0 }}>
                      <path d="M5 2L10 7L5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.a>
                )
              })}
            </div>

            <div className="pt-2 pb-6 text-center">
              <p className="text-[11px] tracking-[0.3px]" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
                {socialLinks.filter(l => profile.social[l.key]).length} kişi
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
