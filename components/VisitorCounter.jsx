import { useState, useEffect } from "react"
import { HiEye } from "react-icons/hi"

const API = "https://api.countapi.xyz"
const NS = "ghxsty-lol-site"

export default function VisitorCounter() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    const visited = sessionStorage.getItem("vc_ghxsty")
    const doFetch = (endpoint) =>
      fetch(`${API}${endpoint}`)
        .then((r) => r.json())
        .then((d) => d.value)
        .catch(() => null)

    if (!visited) {
      doFetch(`/hit/${NS}/visits`).then((v) => {
        if (v) setCount(v)
        else doFetch(`/get/${NS}/visits`).then((v2) => setCount(v2 ?? "0"))
        sessionStorage.setItem("vc_ghxsty", "1")
      })
    } else {
      doFetch(`/get/${NS}/visits`).then((v) => setCount(v ?? "0"))
    }
  }, [])

  if (count === null) return null

  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
      <HiEye size={14} />
      <span>{count}</span>
    </div>
  )
}
