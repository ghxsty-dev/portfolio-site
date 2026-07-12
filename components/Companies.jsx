import AnimatedSection from "./AnimatedSection"
import { HiBriefcase, HiExternalLink } from "react-icons/hi"
import { motion } from "framer-motion"

export default function Companies({ companies }) {
  return (
    <AnimatedSection id="companies" className="py-24 bg-gray-50 dark:bg-[#080808]">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="font-jp text-xs text-accent mb-2">経験</p>
          <h2 className="section-title">Deneyim</h2>
          <div className="glow-line mt-3" />
          <p className="section-subtitle">Çalıştığım şirketler ve üstlendiğim roller</p>
        </div>

        <div className="space-y-6 relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-800 hidden sm:block" />
          {companies.map((company, i) => (
            <AnimatedSection key={company.id} delay={i * 0.15}>
              <motion.div
                whileHover={{ x: 4 }}
                className="card flex flex-col sm:flex-row sm:items-start gap-4 relative"
              >
                <div className="hidden sm:flex absolute -left-[1.35rem] w-3 h-3 rounded-full bg-accent border-2 border-white dark:border-black z-10" />
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <HiBriefcase className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-black dark:text-white">
                      {company.name}
                    </h3>
                    <span className="text-sm text-gray-400 dark:text-gray-500">
                      {company.period}
                    </span>
                  </div>
                  <p className="text-accent font-medium text-sm mb-2">{company.role}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{company.description}</p>
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-light transition-colors mt-2"
                    >
                      <HiExternalLink size={14} />
                      {company.website.replace(/https?:\/\//, "")}
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
