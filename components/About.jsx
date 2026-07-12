import AnimatedSection from "./AnimatedSection"
import SectionHeader from "./SectionHeader"
import Designs from "./Designs"

export default function About({ profile, designs }) {
  return (
    <AnimatedSection id="about" className="py-24 bg-gray-50 dark:bg-[#080808]">
      <div className="section-container">
        <SectionHeader
          title="Hakkımda"
          subtitle={profile.about.description}
          jpText="私について"
          side="left"
        />

        <Designs designs={designs} />
      </div>
    </AnimatedSection>
  )
}
