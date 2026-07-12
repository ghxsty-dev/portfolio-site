import { motion } from "framer-motion"
import { HiExternalLink, HiCode } from "react-icons/hi"

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="card group cursor-pointer"
    >
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/[0.08] dark:to-accent/[0.02]">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <HiCode className="w-14 h-14 text-accent/30" />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {project.tags.map((tag, i) => (
          <span key={i} className="tag">
            {tag}
          </span>
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
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-accent hover:text-accent-light transition-colors font-medium"
          >
            <HiExternalLink size={16} />
            Canlı
          </a>
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
