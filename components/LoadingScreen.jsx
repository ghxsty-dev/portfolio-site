import { useState, useEffect } from "react"

const titles = ["Full Stack Developer", "UI/UX Designer", "Creative Developer"]

export default function LoadingScreen({ children }) {
  const [show, setShow] = useState(true)
  const [titleIndex, setTitleIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length)
    }, 650)
    return () => clearInterval(interval)
  }, [])

  if (!show) return <>{children}</>

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Glacial Indifference', sans-serif",
      }}
    >
      <div
        style={{
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.03em",
          marginBottom: "1rem",
        }}
      >
        ghxsty
      </div>
      <div style={{ height: "1.8rem", overflow: "hidden" }}>
        <span
          key={titleIndex}
          style={{
            display: "inline-block",
            color: "#666",
            fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
            animation: "fadeSlideIn 0.4s ease-out",
          }}
        >
          {titles[titleIndex]}
        </span>
      </div>
    </div>
  )
}
