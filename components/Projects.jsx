import { useState } from "react"
import ProjectCard from "./ProjectCard"
import AnimatedSection from "./AnimatedSection"
import SectionHeader from "./SectionHeader"

export default function Projects({ projects }) {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? projects : projects.filter((p) => p.featured)

  return (
    <AnimatedSection id="projects" className="py-24">
      <div className="section-container">
        <SectionHeader
          title="Projeler"
          subtitle="Üzerinde çalıştığım ve gurur duyduğum projeler"
          jpText="プロジェクト"
          side="right"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {projects.length > 3 && (
          <div className="text-center mt-10">
            <button onClick={() => setShowAll(!showAll)} className="btn-outline">
              {showAll ? "Öne Çıkanları Göster" : "Tüm Projeleri Gör"}
            </button>
          </div>
        )}
      </div>
    </AnimatedSection>
  )
}
