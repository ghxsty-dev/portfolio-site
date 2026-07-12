import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiStar, HiCode } from "react-icons/hi"
import { GoRepoForked, GoRepo } from "react-icons/go"

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
    <section id="github" className="py-24" style={{ background: "#0d1117" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <GoRepo size={28} style={{ color: "#8b949e" }} />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#e6edf3" }}>
              GitHub Projelerim
            </h2>
            <p className="text-sm" style={{ color: "#8b949e" }}>
              <span style={{ color: "#58a6ff" }}>{username}</span> hesabımdaki güncel repolar
            </p>
          </div>
        </div>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-md border" style={{ borderColor: "#21262d", background: "#161b22", padding: "16px" }}>
                <div className="h-4 rounded w-3/4 mb-3" style={{ background: "#21262d" }} />
                <div className="h-3 rounded w-full mb-2" style={{ background: "#21262d" }} />
                <div className="h-3 rounded w-1/2" style={{ background: "#21262d" }} />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12" style={{ color: "#8b949e" }}>
            <p>GitHub projeleri yüklenirken bir hata oluştu.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="block rounded-md border p-4 transition-all duration-200"
                style={{
                  borderColor: "#21262d",
                  background: "#161b22",
                }}
                whileHover={{ y: -2, borderColor: "#30363d" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <GoRepo size={16} style={{ color: "#8b949e", flexShrink: 0 }} />
                  <span
                    className="font-semibold truncate text-sm"
                    style={{ color: "#58a6ff", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif" }}
                  >
                    {repo.name}
                  </span>
                </div>

                {repo.description && (
                  <p className="text-xs mb-3 line-clamp-2" style={{ color: "#8b949e" }}>
                    {repo.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs" style={{ color: "#8b949e" }}>
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#2da44e" }} />
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
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
