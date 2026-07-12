import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiPhotograph, HiX, HiExternalLink } from "react-icons/hi"

export default function Designs({ designs }) {
  const [selected, setSelected] = useState(null)

  const close = useCallback(() => setSelected(null), [])

  useEffect(() => {
    if (!selected) return
    const onKey = (e) => { if (e.key === "Escape") close() }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = "" }
  }, [selected, close])

  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h2 className="section-title">Tasarımlarım</h2>
        <div className="glow-line mt-3" />
        <p className="section-subtitle">Yaptığım grafik ve UI/UX tasarımları</p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {designs.map((design, i) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            layout
            className="break-inside-avoid cursor-pointer group relative rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-900"
            onClick={() => setSelected(design)}
          >
            <motion.img
              src={design.image}
              alt={design.title}
              className="w-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex" }}
            />
            <HiPhotograph className="w-16 h-16 text-gray-400 dark:text-gray-600 hidden absolute inset-0 m-auto" />

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5"
            >
              <h3 className="text-white font-semibold text-lg">{design.title}</h3>
              <p className="text-white/70 text-sm line-clamp-2">{design.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {design.tags.map((t, j) => (
                  <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white/90">{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden bg-white dark:bg-[#111] shadow-2xl flex flex-col lg:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <HiX size={20} />
              </button>

              <div className="lg:w-3/5 bg-gray-100 dark:bg-black flex items-center justify-center min-h-[300px]">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-contain max-h-[60vh] lg:max-h-[85vh]"
                />
              </div>

              <div className="lg:w-2/5 p-6 lg:p-8 overflow-y-auto">
                <h2 className="text-2xl font-bold text-black dark:text-white mb-3">
                  {selected.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {selected.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.tags.map((t, j) => (
                    <span key={j} className="tag">{t}</span>
                  ))}
                </div>

                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <HiExternalLink size={16} />
                    İncele
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
