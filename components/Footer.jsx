export default function Footer() {
  return (
    <footer className="py-6" style={{ background: "#000", borderTop: "1px solid #111" }}>
      <div className="section-container">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-xs" style={{ color: "#444" }}>&copy; {new Date().getFullYear()} ghxsty</p>
          <a href="https://discord.gg/CGmxFdwfCV" target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: "#444" }}>
            Discord
          </a>
        </div>
      </div>
    </footer>
  )
}
