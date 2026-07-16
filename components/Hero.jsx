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
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#000" }}
    >
      <img
        src="/images/background.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.6)", zIndex: 1 }}
      />

      <div className="text-center px-4 relative" style={{ zIndex: 2 }}>
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
          {profile.name}
        </h1>

        <div className="h-7 mb-5">
          <span className="text-lg sm:text-xl" style={{ color: "#999" }}>
            {titles[titleIndex]}
          </span>
        </div>

        <p className="text-sm mx-auto" style={{ color: "#777", maxWidth: "28rem", lineHeight: 1.8 }}>
          {profile.bio}
        </p>
      </div>
    </section>
  )
}
