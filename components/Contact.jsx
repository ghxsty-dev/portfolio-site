import AnimatedSection from "./AnimatedSection"
import SectionHeader from "./SectionHeader"
import { HiMail } from "react-icons/hi"
import { FaDiscord, FaGithub, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa"
import { motion } from "framer-motion"

const socialLinks = [
  { icon: HiMail, label: "Email", href: "mailto:", key: "email" },
  { icon: FaDiscord, label: "Discord", href: null, key: "discord" },
  { icon: FaGithub, label: "GitHub", href: null, key: "github" },
  { icon: FaTwitter, label: "Twitter", href: null, key: "twitter" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: null, key: "linkedin" },
  { icon: FaInstagram, label: "Instagram", href: null, key: "instagram" },
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
    <AnimatedSection id="contact" className="py-24">
      <div className="section-container">
        <SectionHeader
          title="İletişim"
          subtitle="Benimle iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz"
          jpText="連絡先"
          side="right"
        />

        <div className="max-w-2xl mx-auto">
          <motion.div
            className="grid sm:grid-cols-2 gap-4"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {socialLinks.map((link) => {
              const value = profile.social[link.key]
              if (!value) return null

              const href = link.key === "email" ? `mailto:${value}` : link.href ? `${link.href}${value}` : value
              const isExternal = link.key !== "email" && link.key !== "discord"

              return (
                <motion.a
                  key={link.key}
                  variants={item}
                  whileHover={{ scale: 1.03 }}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="card flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all group-hover:scale-110">
                    <link.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black dark:text-white">
                      {link.label}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[200px]">
                      {value}
                    </p>
                  </div>
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
