import { motion } from "framer-motion"
import { HiExternalLink, HiCode } from "react-icons/hi"

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="card group cursor-pointer perspective-1000"
    >
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/[0.08] dark:to-accent/[0.02]">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: [0, 8, 0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiCode className="w-14 h-14 text-accent/30" />
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-accent origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {project.tags.map((tag, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="tag"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <h3 className="text-xl font-semibold text-black dark:text-white mb-2 group-hover:text-accent transition-colors">
        {project.title}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex gap-3">
        {project.link && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-accent hover:text-accent-light transition-colors font-medium"
            whileHover={{ x: 3 }}
          >
            <HiExternalLink size={16} />
            Canlı
          </motion.a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors"
          >
            <HiCode size={16} />
            Kod
          </a>
        )}
      </div>
    </motion.div>
  )
}
