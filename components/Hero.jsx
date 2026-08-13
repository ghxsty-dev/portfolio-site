import Image from "next/image"

export default function Hero({ profile }) {
  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#000" }}
    >
      <Image
        src="/images/background.png"
        alt="Background"
        fill
        className="object-cover"
        style={{ zIndex: 0 }}
        priority
      />

      <div className="text-center px-4 relative" style={{ zIndex: 1 }}>
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight">
          {profile.name}
        </h1>
      </div>
    </section>
  )
}
