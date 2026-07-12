import Hero from "@/components/Hero"
import About from "@/components/About"
import SkyBlue from "@/components/SkyBlue"
import GitHubRepos from "@/components/GitHubRepos"
import Contact from "@/components/Contact"

import profile from "@/data/profile.json"
import designs from "@/data/designs.json"

export default function Home() {
  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} designs={designs} />
      <SkyBlue />
      <GitHubRepos username="ghxsty-dev" />
      <Contact profile={profile} />
    </>
  )
}
