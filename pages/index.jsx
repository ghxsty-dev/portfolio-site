import Hero from "@/components/Hero"
import About from "@/components/About"
import Projects from "@/components/Projects"
import GitHubRepos from "@/components/GitHubRepos"
import Contact from "@/components/Contact"

import profile from "@/data/profile.json"
import projects from "@/data/projects.json"
import designs from "@/data/designs.json"

export default function Home() {
  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} designs={designs} />
      <Projects projects={projects} />
      <GitHubRepos username="ghxsty-dev" />
      <Contact profile={profile} />
    </>
  )
}
