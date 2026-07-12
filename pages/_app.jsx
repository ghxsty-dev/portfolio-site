import { ThemeProvider } from "next-themes"
import { AnimationProvider, useAnimations } from "@/context/AnimationContext"
import { MotionConfig } from "framer-motion"
import Layout from "@/components/Layout"
import "@/styles/globals.css"

function AppContent({ children }) {
  const { animationsEnabled } = useAnimations()
  return (
    <MotionConfig reducedMotion={animationsEnabled ? "never" : "always"}>
      {children}
    </MotionConfig>
  )
}

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AnimationProvider>
        <AppContent>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContent>
      </AnimationProvider>
    </ThemeProvider>
  )
}
