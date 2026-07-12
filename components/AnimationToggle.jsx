import { HiSparkles, HiBan } from "react-icons/hi"
import { useAnimations } from "@/context/AnimationContext"

export default function AnimationToggle() {
  const { animationsEnabled, toggleAnimations } = useAnimations()

  return (
    <button
      onClick={toggleAnimations}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                 text-gray-600 dark:text-gray-400 hover:text-accent hover:border-accent/50
                 transition-colors duration-300"
      aria-label={animationsEnabled ? "Animasyonları kapat" : "Animasyonları aç"}
      title={animationsEnabled ? "Animasyonları kapat" : "Animasyonları aç"}
    >
      {animationsEnabled ? <HiSparkles size={20} /> : <HiBan size={20} />}
    </button>
  )
}
