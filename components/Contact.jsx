import { HiMail } from "react-icons/hi"
import { FaDiscord, FaGithub, FaInstagram } from "react-icons/fa"
import AnimatedSection from "./AnimatedSection"

const socialLinks = [
  { icon: HiMail, label: "Email", key: "email" },
  { icon: FaDiscord, label: "Discord", key: "discord" },
  { icon: FaGithub, label: "GitHub", key: "github" },
  { icon: FaInstagram, label: "Instagram", key: "instagram" },
]

export default function Contact({ profile }) {
  return (
    <section className="min-h-screen flex items-center justify-center py-24" style={{ background: "#000" }}>
      <div className="section-container">
        <AnimatedSection>
          <p className="text-xs mb-2 text-center" style={{ color: "#555" }}>İletişim</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">Contact</h2>
        </AnimatedSection>

        <div className="max-w-lg mx-auto space-y-3">
          {socialLinks.map((link, i) => {
            const value = profile.social[link.key]
            if (!value) return null
            const href = link.key === "email" ? `mailto:${value}` : value
            const isExternal = link.key !== "email"

            return (
              <AnimatedSection key={link.key} delay={i * 0.1}>
                <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-lg transition-all"
                  style={{ background: "#0a0a0a", border: "1px solid #1a1a1a" }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "#333"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "#1a1a1a"}
                >
                  <link.icon size={18} style={{ color: "#555" }} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white">{link.label}</p>
                    <p className="text-xs truncate" style={{ color: "#666" }}>{value}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.3 }}>
                    <path d="M5 2L10 7L5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
