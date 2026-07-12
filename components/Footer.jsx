import ThemeToggle from "./ThemeToggle"
import VisitorCounter from "./VisitorCounter"
import AnimationToggle from "./AnimationToggle"

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 dark:border-gray-800 py-8 bg-white dark:bg-black">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <VisitorCounter />
            <ThemeToggle />
            <AnimationToggle />
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Ghxsty. Tüm hakları saklıdır.
          </p>
          <a
            href="https://discord.gg/CGmxFdwfCV"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 dark:text-gray-500 hover:text-accent transition-colors"
          >
            Discord
          </a>
        </div>
      </div>
    </footer>
  )
}
