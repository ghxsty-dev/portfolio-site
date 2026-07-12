"use client"
import { createContext, useContext, useState } from "react"

const AnimationContext = createContext()

export function AnimationProvider({ children }) {
  const [enabled, setEnabled] = useState(true)
  return (
    <AnimationContext.Provider value={{ animationsEnabled: enabled, toggleAnimations: () => setEnabled((v) => !v) }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimations() {
  return useContext(AnimationContext)
}
