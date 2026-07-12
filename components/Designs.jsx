import { motion } from "framer-motion"
import { HiPhotograph, HiExternalLink } from "react-icons/hi"

export default function Designs({ designs }) {
  return (
    <div className="mt-16">
      <div>
        <div className="text-center mb-12">
          <h2 className="section-title">Tasarımlarım</h2>
          <div className="glow-line mt-3" />
          <p className="section-subtitle">
            Yaptığım grafik ve UI/UX tasarımları
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design, i) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="card group overflow-hidden"
            >
              <div className="relative h-52 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/[0.08] dark:to-accent/[0.02] flex items-center justify-center">
                <HiPhotograph className="w-16 h-16 text-accent/30" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  {design.link && (
                    <a
                      href={design.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity btn-primary text-sm"
                    >
                      <HiExternalLink size={16} />
                      İncele
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {design.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-black dark:text-white mb-2 group-hover:text-accent transition-colors">
                {design.title}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {design.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
