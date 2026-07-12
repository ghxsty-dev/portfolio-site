import { motion } from "framer-motion"

export default function SkyBlue() {
  return (
    <section
      id="skyblue"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #97cdf2 0%, #59abfe 100%)" }}
    >
      <div className="absolute inset-0 bg-white/10 dark:opacity-0" />
      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-64 h-64 lg:w-80 lg:h-80 rounded-3xl bg-white/20 backdrop-blur-sm p-4 flex items-center justify-center shadow-2xl"
          >
            <img
              src="/images/skyblue.png"
              alt="SkyBlue Logo"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left max-w-lg"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-sm">
              SkyBlue
            </h2>
            <p className="text-xl text-white/90 font-medium mb-2">
              Tasarım Hizmetleri
            </p>
            <p className="text-white/80 leading-relaxed mb-6">
              Kurumsal tasarım, UI/UX tasarım ve web geliştirme hizmetleri.
              Modern ve profesyonel çözümlerle markanızı bir adım öne taşıyoruz.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <span className="px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
                Kurumsal Tasarım
              </span>
              <span className="px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
                UI/UX Tasarım
              </span>
              <span className="px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
                Web Geliştirme
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
