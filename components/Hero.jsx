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
    <section className="min-h-screen flex items-center relative" style={{ background: "#000" }}>
      <div className="section-container w-full">
        <div className="max-w-3xl">
          <p className="text-xs mb-2" style={{ color: "#555" }}>Merhaba, ben</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            {profile.name}
          </h1>
          <div className="h-8 mb-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              {titles[titleIndex]}
            </h2>
          </div>
          <p className="text-base" style={{ color: "#888", maxWidth: "36rem", lineHeight: 1.7 }}>
            {profile.bio}
          </p>
          <div className="flex gap-4 mt-8">
            <a
              href="#github"
              onClick={(e) => { e.preventDefault(); document.getElementById("github")?.scrollIntoView({ behavior: "smooth" }) }}
              className="px-6 py-3 rounded-lg text-sm font-medium transition-all"
              style={{ background: "#fff", color: "#000" }}
            >
              Projelerimi Gör
            </a>
            <a
              href="https://discord.gg/CGmxFdwfCV"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg text-sm font-medium transition-all"
              style={{ border: "1px solid #333", color: "#999" }}
            >
              İletişime Geç
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
