import Link from "next/link"

export default function Custom404() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center px-4">
        <h1 className="text-8xl sm:text-9xl font-bold text-white tracking-tight mb-4">
          404
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Aradigin sayfa bulunamadi.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 border border-gray-700 text-white rounded-lg hover:bg-white hover:text-black transition-colors duration-300"
        >
          Ana Sayfaya Don
        </Link>
      </div>
    </section>
  )
}
