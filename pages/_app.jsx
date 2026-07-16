import LoadingScreen from "@/components/LoadingScreen"
import "@/styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <LoadingScreen>
      <Component {...pageProps} />
    </LoadingScreen>
  )
}
