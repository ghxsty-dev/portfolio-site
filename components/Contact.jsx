import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiMail, HiSearch, HiChevronRight } from "react-icons/hi"
import { FaDiscord, FaGithub, FaInstagram, FaPhone, FaPhoneSlash, FaMicrophone, FaVolumeUp, FaCircle } from "react-icons/fa"
import { MdKeyboard, MdAddCall, MdVideocam } from "react-icons/md"

const socialLinks = [
  { icon: HiMail, label: "Email", key: "email", sub: "kivancghxsty@gmail.com", color: "#007aff" },
  { icon: FaDiscord, label: "Discord", key: "discord", sub: "ghxsty.lol", color: "#5865f2" },
  { icon: FaGithub, label: "GitHub", key: "github", sub: "ghxsty-dev", color: "#f0f6fc" },
  { icon: FaInstagram, label: "Instagram", key: "instagram", sub: "@kivanctsirin", color: "#e1306c" },
]

const callButtons = [
  { icon: FaMicrophone, label: "Mute", color: "#f0f6fc" },
  { icon: MdKeyboard, label: "Keypad", color: "#f0f6fc" },
  { icon: FaVolumeUp, label: "Speaker", color: "#f0f6fc" },
  { icon: MdAddCall, label: "Add Call", color: "#f0f6fc" },
  { icon: MdVideocam, label: "FaceTime", color: "#34c759" },
  { icon: FaCircle, label: "Contacts", color: "#f0f6fc" },
]

export default function Contact({ profile }) {
  const [selected, setSelected] = useState(socialLinks[0])
  const [calling, setCalling] = useState(false)
  const [search, setSearch] = useState("")

  const filtered = socialLinks.filter((l) => {
    const val = profile.social[l.key]
    return val && l.label.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0a0a0f 0%, #1c1c2e 40%, #0d0d1a 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{ background: "#007aff" }} />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{ background: "#5865f2" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#e1306c" }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2
            className="text-3xl font-semibold mb-2"
            style={{ color: "#f5f5f7", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif", letterSpacing: "-0.5px" }}
          >
            İletişim
          </h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
            Bana ulaşmak için bir kişi seçin
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* ─── SOL: Kişi Listesi (iOS Contacts) ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-xl rounded-3xl p-1"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <div className="rounded-[22px] overflow-hidden" style={{ background: "rgba(22,22,34,0.7)" }}>
              {/* Search Bar */}
              <div className="px-4 pt-4 pb-2">
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <HiSearch size={16} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Ara"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    style={{ color: "#f5f5f7", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}
                  />
                </div>
              </div>

              {/* Contact List */}
              <div className="px-3 pb-3 space-y-0.5">
                {filtered.map((link, i) => {
                  const val = profile.social[link.key]
                  const isSelected = selected.key === link.key

                  return (
                    <motion.button
                      key={link.key}
                      onClick={() => { setSelected(link); setCalling(false) }}
                      className="flex items-center gap-3.5 w-full px-4 py-3 rounded-2xl transition-all duration-200 text-left"
                      style={{
                        background: isSelected ? "rgba(0,122,255,0.15)" : "rgba(255,255,255,0.03)",
                        border: isSelected ? "1px solid rgba(0,122,255,0.2)" : "1px solid transparent",
                      }}
                      whileHover={{ background: "rgba(255,255,255,0.07)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${link.color}88, ${link.color}44)`,
                          boxShadow: `0 0 15px ${link.color}22`,
                        }}
                      >
                        <link.icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className="text-sm font-medium truncate"
                          style={{
                            color: isSelected ? "#f5f5f7" : "rgba(255,255,255,0.8)",
                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                          }}
                        >
                          {link.label}
                        </p>
                        <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
                          {link.sub}
                        </p>
                      </div>
                      <HiChevronRight size={16} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                    </motion.button>
                  )
                })}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>Sonuç bulunamadı</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* ─── SAĞ: Arama Ekranı (Active Call UI) ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="backdrop-blur-xl rounded-3xl p-1"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <div
              className="rounded-[22px] py-8 px-6 flex flex-col items-center relative overflow-hidden"
              style={{ background: "rgba(22,22,34,0.7)", minHeight: 420 }}
            >
              {/* Dynamic Island animasyonu */}
              {calling && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-3 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full text-[11px] font-medium tracking-wide"
                  style={{
                    background: "rgba(0,0,0,0.6)",
                    color: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(20px)",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34c759]" />
                    0:12
                  </span>
                </motion.div>
              )}

              {/* Avatar */}
              <motion.div
                key={selected.key}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative mb-5 mt-2"
              >
                <motion.div
                  animate={calling ? { scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] } : {}}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${selected.color}44, transparent)`,
                    filter: "blur(8px)",
                  }}
                />
                <motion.div
                  animate={calling ? { scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] } : {}}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${selected.color}33, transparent)`,
                    filter: "blur(12px)",
                  }}
                />
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl relative z-10"
                  style={{
                    background: `linear-gradient(135deg, ${selected.color}, ${selected.color}88)`,
                    boxShadow: `0 0 40px ${selected.color}44, inset 0 1px 0 rgba(255,255,255,0.3)`,
                    border: "2px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <selected.icon size={36} />
                </div>
              </motion.div>

              {/* İsim */}
              <motion.h3
                key={`name-${selected.key}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-semibold mb-1"
                style={{ color: "#f5f5f7", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}
              >
                {selected.label}
              </motion.h3>

              {/* Alt başlık */}
              <motion.p
                key={`sub-${selected.key}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm mb-6"
                style={{ color: "rgba(255,255,255,0.4)", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}
              >
                {calling ? (
                  <span className="flex items-center gap-1.5 justify-center">
                    <span className="w-1 h-1 rounded-full bg-[#34c759] animate-pulse" />
                    Bağlandı
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff9500]" />
                    Bekliyor
                  </span>
                )}
              </motion.p>

              {/* Ses dalgası (calling) */}
              {calling && (
                <div className="flex items-center gap-1 mb-6 h-8">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [8, 24 + Math.random() * 20, 8] }}
                      transition={{ repeat: Infinity, duration: 0.8 + i * 0.15, ease: "easeInOut" }}
                      className="w-1 rounded-full"
                      style={{ background: selected.color, opacity: 0.5 }}
                    />
                  ))}
                </div>
              )}

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-xs">
                {callButtons.map((btn) => (
                  <motion.button
                    key={btn.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-1.5 py-2 rounded-2xl transition-all"
                    style={{
                      background: btn.label === "End" ? "rgba(255,59,48,0.2)" : "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm"
                      style={{
                        background: btn.label === "FaceTime" ? "rgba(52,199,89,0.2)" : "rgba(255,255,255,0.06)",
                        color: btn.color,
                      }}
                    >
                      <btn.icon size={18} />
                    </div>
                    <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
                      {btn.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Ara / Kapat Butonu */}
              <motion.button
                onClick={() => setCalling(!calling)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: calling ? "rgba(255,59,48,0.9)" : "rgba(52,199,89,0.9)",
                  boxShadow: calling
                    ? "0 0 30px rgba(255,59,48,0.4)"
                    : "0 0 30px rgba(52,199,89,0.4)",
                }}
              >
                {calling ? <FaPhoneSlash size={22} style={{ color: "white" }} /> : <FaPhone size={22} style={{ color: "white" }} />}
              </motion.button>

              {/* Link butonu (seçili kanala git) */}
              {!calling && selected.key !== "discord" && (
                <motion.a
                  href={profile.social[selected.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-xs font-medium transition-all"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  whileHover={{ color: selected.color }}
                >
                  {selected.sub} aç →
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
