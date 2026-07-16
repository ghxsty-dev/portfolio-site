export default function Footer() {
  return (
    <footer className="py-6" style={{ background: "#000", borderTop: "1px solid #111" }}>
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#444" }}>&copy; {new Date().getFullYear()} Ghxsty</p>
          <a href="https://discord.gg/CGmxFdwfCV" target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: "#444" }}>
            Discord
          </a>
        </div>
      </div>
    </footer>
  )
}
