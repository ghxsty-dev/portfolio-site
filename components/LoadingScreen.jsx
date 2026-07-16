import { useState, useEffect } from "react"

export default function LoadingScreen({ children }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {show && <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#000" }} />}
      {children}
    </>
  )
}
