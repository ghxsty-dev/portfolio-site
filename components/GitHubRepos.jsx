import { useState, useEffect } from "react"
import { HiStar } from "react-icons/hi"
import { GoRepoForked, GoRepo } from "react-icons/go"
import AnimatedSection from "./AnimatedSection"

export default function GitHubRepos({ username }) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!username) return
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8`)
      .then((r) => r.ok ? r.json() : [])
      .then((data) => { setRepos(data.filter((r) => !r.fork).slice(0, 6)); setLoading(false) })
      .catch(() => setLoading(false))
  }, [username])

  return (
    <section id="github" className="min-h-screen flex items-center justify-center py-24" style={{ background: "#000" }}>
      <div className="section-container">
        <AnimatedSection>
          <p className="text-xs mb-2 text-center" style={{ color: "#555" }}>GitHub</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">Projelerim</h2>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row items-start gap-8 max-w-5xl mx-auto">
          <AnimatedSection className="hidden lg:block flex-shrink-0" style={{ width: "18rem" }}>
            <img
              src="/images/hakkimda.png"
              alt="hakkimda"
              className="w-full"
              style={{ objectFit: "cover", objectPosition: "center top", aspectRatio: "3/4" }}
            />
          </AnimatedSection>

          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse p-4 rounded-lg" style={{ background: "#0a0a0a", border: "1px solid #1a1a1a" }}>
                    <div className="h-4 rounded w-3/4 mb-3" style={{ background: "#1a1a1a" }} />
                    <div className="h-3 rounded w-full mb-2" style={{ background: "#1a1a1a" }} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {repos.map((repo, i) => (
                  <AnimatedSection key={repo.id} delay={i * 0.08}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                      className="block p-4 rounded-lg transition-all duration-200"
                      style={{ background: "#0a0a0a", border: "1px solid #1a1a1a" }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "#333"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = "#1a1a1a"}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <GoRepo size={14} style={{ color: "#555", flexShrink: 0 }} />
                        <span className="text-sm font-semibold truncate" style={{ color: "#58a6ff" }}>{repo.name}</span>
                      </div>
                      {repo.description && (
                        <p className="text-xs mb-3 line-clamp-2" style={{ color: "#666" }}>{repo.description}</p>
                      )}
                      <div className="flex items-center gap-3 text-xs" style={{ color: "#555" }}>
                        {repo.language && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: "#2da44e" }} />{repo.language}</span>}
                        <span className="flex items-center gap-1"><HiStar size={12} />{repo.stargazers_count}</span>
                        <span className="flex items-center gap-1"><GoRepoForked size={12} />{repo.forks_count}</span>
                      </div>
                    </a>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
