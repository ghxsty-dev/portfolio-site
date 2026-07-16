export default function About({ profile }) {
  return (
    <section className="py-24" style={{ background: "#000", borderTop: "1px solid #111" }}>
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs mb-2" style={{ color: "#555" }}>Hakkımda</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">About Me</h2>
          <p className="leading-relaxed" style={{ color: "#888" }}>
            {profile.bio}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {profile.about.skills.map((skill) => (
              <span key={skill} className="px-3 py-1.5 text-xs rounded" style={{ background: "#111", color: "#ccc", border: "1px solid #222" }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
