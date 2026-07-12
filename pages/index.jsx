import Hero from "@/components/Hero"
import About from "@/components/About"
import SkyBlue from "@/components/SkyBlue"
import Linux from "@/components/Linux"
import GitHubRepos from "@/components/GitHubRepos"
import MyAnimeList from "@/components/MyAnimeList"
import Contact from "@/components/Contact"

import profile from "@/data/profile.json"
import designs from "@/data/designs.json"

export default function Home() {
  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} designs={designs} />
      <SkyBlue />
      <Linux />
      <GitHubRepos username="ghxsty-dev" />
      <MyAnimeList username="ghxxxsty" />
      <Contact profile={profile} />
    </>
  )
}
