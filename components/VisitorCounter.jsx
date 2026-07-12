import { useState, useEffect } from "react"
import { HiEye } from "react-icons/hi"

export default function VisitorCounter() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    const id = "ghxstylol"
    const visited = sessionStorage.getItem(id)
    if (!visited) {
      fetch(`https://api.countapi.xyz/hit/ghxsty-lol/visits`)
        .then((r) => r.json())
        .then((d) => { setCount(d.value); sessionStorage.setItem(id, "1") })
        .catch(() => setCount("?"))
    } else {
      fetch(`https://api.countapi.xyz/get/ghxsty-lol/visits`)
        .then((r) => r.json())
        .then((d) => setCount(d.value))
        .catch(() => setCount("?"))
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
