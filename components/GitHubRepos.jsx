import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import AnimatedSection from "./AnimatedSection"
import SectionHeader from "./SectionHeader"
import { HiStar, HiCode, HiExternalLink } from "react-icons/hi"
import { GoRepoForked } from "react-icons/go"

export default function GitHubRepos({ username }) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!username) return
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8`)
      .then((r) => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then((data) => {
        setRepos(data.filter((r) => !r.fork).slice(0, 6))
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [username])

  return (
    <AnimatedSection id="github" className="py-24 bg-gray-50 dark:bg-[#080808]">
      <div className="section-container">
        <SectionHeader
          title="GitHub Projelerim"
          subtitle="GitHub'daki güncel açık kaynak projelerim"
          jpText="GitHub"
          side="left"
        />

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-4" />
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-12" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-12" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">GitHub projeleri yüklenirken bir hata oluştu.</p>
          </div>
        )}

        {!loading && !error && (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                whileHover={{ y: -4 }}
                className="card group block"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-all">
                    <HiCode size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-black dark:text-white truncate group-hover:text-accent transition-colors">
                      {repo.name}
                    </h3>
                    {repo.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <HiStar size={14} />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GoRepoForked size={14} />
                    {repo.forks_count}
                  </span>
                  <HiExternalLink size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  )
}
