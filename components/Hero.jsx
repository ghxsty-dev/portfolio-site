import { useState, useEffect } from "react"

export default function Hero({ profile }) {
  const [titleIndex, setTitleIndex] = useState(0)
  const titles = ["Full Stack Developer", "UI/UX Designer", "Creative Developer"]

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center" style={{ background: "#000" }}>
      <div className="text-center px-4">
        <p className="text-xs mb-4" style={{ color: "#444", letterSpacing: "2px", textTransform: "uppercase" }}>
          Merhaba, ben
        </p>

        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
          {profile.name}
        </h1>

        <div className="h-7 mb-5">
          <span className="text-lg sm:text-xl" style={{ color: "#666" }}>
            {titles[titleIndex]}
          </span>
        </div>

        <p className="text-sm mx-auto mb-10" style={{ color: "#555", maxWidth: "28rem", lineHeight: 1.8 }}>
          {profile.bio}
        </p>

        <div className="flex items-center justify-center gap-4">
          <a
            href="#github"
            onClick={(e) => { e.preventDefault(); document.getElementById("github")?.scrollIntoView({ behavior: "smooth" }) }}
            className="px-6 py-3 text-sm font-medium transition-all duration-200"
            style={{ background: "#fff", color: "#000", borderRadius: "6px" }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            Projelerimi Gör
          </a>
          <a
            href="https://discord.gg/CGmxFdwfCV"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-sm font-medium transition-all duration-200"
            style={{ border: "1px solid #222", color: "#777", borderRadius: "6px" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#444"; e.currentTarget.style.color = "#aaa" }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#777" }}
          >
            İletişime Geç
          </a>
        </div>
      </div>
    </section>
  )
}
