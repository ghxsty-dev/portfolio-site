import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { HiStar } from "react-icons/hi"
import { GoRepoForked, GoRepo } from "react-icons/go"

const LEVEL_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]
const MONTHS = ["", "Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"]
const DAYS = ["", "Pzt", "", "Çar", "", "Cum", ""]

function ContributionsGraph({ username }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!username) return
    fetch(`https://github-contributions-api.deno.dev/${username}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json() })
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [username])

  const weeks = useMemo(() => {
    if (!data) return []
    const result = []
    let week = []
    const first = new Date(data.contributions[0]?.date)
    const startDay = first.getDay()
    for (let i = 0; i < startDay; i++) week.push(null)
    for (const c of data.contributions) {
      week.push(c)
      if (week.length === 7) { result.push(week); week = [] }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(null)
      result.push(week)
    }
    return result
  }, [data])

  const monthLabels = useMemo(() => {
    if (!data) return []
    const labels = []
    let lastMonth = -1
    weeks.forEach((week, wi) => {
      const firstDay = week.find((d) => d)
      if (firstDay) {
        const m = new Date(firstDay.date).getMonth() + 1
        if (m !== lastMonth) {
          labels.push({ month: m, weekIndex: wi })
          lastMonth = m
        }
      }
    })
    return labels
  }, [weeks, data])

  if (!username) return null
  if (loading) {
    return (
      <div className="animate-pulse rounded-md border p-4 mb-8" style={{ borderColor: "#21262d", background: "#161b22" }}>
        <div className="h-4 rounded w-48 mb-4" style={{ background: "#21262d" }} />
        <div className="flex gap-0.5">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              {Array.from({ length: 7 }).map((_, j) => (
                <div key={j} className="w-[10px] h-[10px] rounded-sm" style={{ background: "#21262d" }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-md border p-4 sm:p-6 mb-8 overflow-x-auto" style={{ borderColor: "#21262d", background: "#161b22" }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-semibold" style={{ color: "#e6edf3" }}>
          {data?.totalContributions?.toLocaleString() ?? 0}
        </span>
        <span className="text-sm" style={{ color: "#8b949e" }}>contributions in the last year</span>
      </div>

      {/* Graph container */}
      <div className="flex">
        {/* Day labels */}
        <div className="flex flex-col mr-1 pt-5" style={{ width: 28 }}>
          {DAYS.map((d, i) => d ? (
            <div key={i} className="flex items-center text-[10px] leading-[10px] h-[10px] mb-[3px]" style={{ color: "#8b949e" }}>
              {d}
            </div>
          ) : <div key={i} className="h-[10px] mb-[3px]" />)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Month labels */}
          <div className="flex text-[10px] h-4 mb-1" style={{ color: "#8b949e" }}>
            {monthLabels.map((l, i) => (
              <div key={i} style={{ marginLeft: i === 0 ? 0 : (l.weekIndex - monthLabels[i - 1].weekIndex) * 13 - 13 }}>
                <span className="block" style={{ paddingLeft: i === 0 ? 0 : 0 }}>{MONTHS[l.month]}</span>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className="rounded-sm cursor-default transition-all duration-100 hover:ring-1 hover:ring-white/30"
                    style={{
                      width: 10,
                      height: 10,
                      background: day ? LEVEL_COLORS[day.level] || LEVEL_COLORS[0] : "transparent",
                    }}
                    title={day ? `${day.count} contributions on ${day.date}` : ""}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1 mt-3">
        <span className="text-[10px]" style={{ color: "#8b949e" }}>Less</span>
        {LEVEL_COLORS.map((c, i) => (
          <div key={i} className="w-[10px] h-[10px] rounded-sm" style={{ background: c }} />
        ))}
        <span className="text-[10px]" style={{ color: "#8b949e" }}>More</span>
      </div>
    </div>
  )
}

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
        <div className="flex items-center gap-3 mb-8">
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

        <ContributionsGraph username={username} />

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
