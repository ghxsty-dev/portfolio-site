import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiStar, HiPlay, HiCheck, HiClock, HiHeart } from "react-icons/hi"

export default function MyAnimeList({ username }) {
  const [profile, setProfile] = useState(null)
  const [anime, setAnime] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!username) return
    Promise.all([
      fetch(`https://api.jikan.moe/v4/users/${username}`).then(r => r.json()),
      fetch(`https://api.jikan.moe/v4/users/${username}/animelist?limit=8`).then(r => r.json()),
    ])
      .then(([p, a]) => {
        if (p.data) setProfile(p.data)
        if (a.data) setAnime(a.data)
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [username])

  return (
    <section id="mal" className="py-24 relative overflow-hidden" style={{ background: "#0e1624" }}>
      <div className="absolute inset-0 opacity-5" style={{
        background: "radial-gradient(ellipse at 20% 50%, #1d439b 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, #2db039 0%, transparent 60%)"
      }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="#2db039" />
            <path d="M8 8V16M12 8V16M16 8V16" stroke="#0e1624" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#e1e7f5" }}>MyAnimeList</h2>
            <p className="text-sm" style={{ color: "#7c8ca5" }}>
              <span style={{ color: "#2db039" }}>{username}</span> anime listem
            </p>
          </div>
        </motion.div>

        {loading && (
          <div className="rounded-xl border p-6 animate-pulse" style={{ borderColor: "#1b2a3e", background: "#0f1a2b" }}>
            <div className="flex gap-4 mb-6">
              <div className="w-20 h-20 rounded-lg" style={{ background: "#1b2a3e" }} />
              <div className="flex-1 space-y-2">
                <div className="h-4 rounded w-40" style={{ background: "#1b2a3e" }} />
                <div className="h-3 rounded w-28" style={{ background: "#1b2a3e" }} />
                <div className="h-3 rounded w-32" style={{ background: "#1b2a3e" }} />
              </div>
            </div>
            <div className="flex gap-4">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-8 rounded flex-1" style={{ background: "#1b2a3e" }} />)}
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-12 rounded-xl border" style={{ borderColor: "#1b2a3e", color: "#7c8ca5" }}>
            <p>MyAnimeList verileri yüklenirken bir hata oluştu. API şu anda yanıt vermiyor.</p>
          </div>
        )}

        {!loading && !error && profile && (
          <>
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border p-5 mb-6"
              style={{ borderColor: "#1b2a3e", background: "#0f1a2b" }}
            >
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={profile.images?.jpg?.image_url}
                  alt={profile.username}
                  className="w-16 h-16 rounded-lg object-cover"
                  style={{ border: "2px solid #1b2a3e" }}
                  onError={(e) => { e.target.style.display = "none" }}
                />
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: "#e1e7f5" }}>{profile.username}</h3>
                  <p className="text-xs" style={{ color: "#7c8ca5" }}>
                    Joined {new Date(profile.joined).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Anime Completed", value: profile.anime_stats?.completed ?? "?", icon: HiCheck, color: "#2db039" },
                  { label: "Watching", value: profile.anime_stats?.watching ?? "?", icon: HiPlay, color: "#1d439b" },
                  { label: "Plan to Watch", value: profile.anime_stats?.plan_to_watch ?? "?", icon: HiClock, color: "#f5a623" },
                  { label: "Days Watched", value: profile.anime_stats?.days_watched?.toFixed(1) ?? "?", icon: HiStar, color: "#e8a838" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <stat.icon size={16} style={{ color: stat.color, flexShrink: 0 }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#e1e7f5" }}>{stat.value}</p>
                      <p className="text-[10px]" style={{ color: "#7c8ca5" }}>{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {profile.favorites?.anime?.length > 0 && (
                <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <HiHeart size={12} style={{ color: "#e1306c" }} />
                    <span className="text-xs font-medium" style={{ color: "#7c8ca5" }}>Favorite Anime</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.favorites.anime.slice(0, 5).map((fav) => (
                      <span key={fav.mal_id} className="text-xs px-2 py-1 rounded-md" style={{ background: "rgba(45,176,57,0.1)", color: "#2db039" }}>
                        {fav.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Anime List */}
            {anime.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm font-medium mb-3" style={{ color: "#7c8ca5" }}>Recently Watched</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {anime.slice(0, 8).map((a, i) => (
                    <motion.a
                      key={a.anime?.mal_id || i}
                      href={`https://myanimelist.net/anime/${a.anime?.mal_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                      className="flex items-center gap-3 rounded-lg p-3 transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                      whileHover={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      <img
                        src={a.anime?.images?.jpg?.image_url}
                        alt={a.anime?.title}
                        className="w-10 h-14 rounded object-cover flex-shrink-0"
                        onError={(e) => { e.target.style.display = "none" }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium truncate" style={{ color: "#e1e7f5" }}>{a.anime?.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] px-1.5 py-0.5 rounded" style={{
                            background: a.watching_status === 2 ? "rgba(45,176,57,0.15)" : "rgba(29,67,155,0.15)",
                            color: a.watching_status === 2 ? "#2db039" : "#1d439b",
                          }}>
                            {a.watching_status === 2 ? "Completed" : a.watching_status === 1 ? "Watching" : "Plan"}
                          </span>
                          {a.score > 0 && (
                            <span className="text-[10px]" style={{ color: "#e8a838" }}>★ {a.score}</span>
                          )}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
