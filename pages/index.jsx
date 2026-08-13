import ScrollAnimation from "@/components/ScrollAnimation"
import Hero from "@/components/Hero"
import About from "@/components/About"
import GitHubRepos from "@/components/GitHubRepos"
import Contact from "@/components/Contact"

import profile from "@/data/profile.json"

export default function Home() {
  return (
    <ScrollAnimation>
      <Hero profile={profile} />
      <About profile={profile} />
      <GitHubRepos username="ghxsty-dev" />
      <Contact profile={profile} />
    </ScrollAnimation>
  )
}
