"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  navItems: { label: string; href: string }[]
  activeSection: string
}

export function MobileSidebar({ isOpen, onClose, navItems, activeSection }: MobileSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[300px] max-w-[85vw] overflow-hidden"
          >
            {/* Main background */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, rgba(13,26,26,0.98) 0%, rgba(18,36,36,0.99) 50%, rgba(13,26,26,0.98) 100%)",
              }}
            />

            {/* Subtle noise texture */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* ─── Left-edge vine/liana decoration ─── */}
            <div className="absolute top-0 left-0 bottom-0 w-12 pointer-events-none overflow-hidden">
              <svg
                viewBox="0 0 48 800"
                className="absolute top-0 left-0 h-full w-full"
                preserveAspectRatio="none"
                fill="none"
              >
                {/* Main vine stem */}
                <motion.path
                  d="M24,0 C24,80 8,120 16,200 C24,280 6,320 14,400 C22,480 8,520 16,600 C24,680 10,720 18,800"
                  stroke="rgba(201,169,98,0.15)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                />
                {/* Secondary thinner vine */}
                <motion.path
                  d="M20,0 C28,100 4,160 20,240 C36,320 4,380 20,460 C36,540 8,600 22,700 C30,760 12,780 20,800"
                  stroke="rgba(201,169,98,0.08)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
                />

                {/* Leaves / tendrils branching off the vine */}
                {[120, 250, 380, 510, 640, 770].map((y, i) => (
                  <motion.g key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.12, duration: 0.5 }}
                  >
                    {/* Leaf curl */}
                    <path
                      d={`M${14 + (i % 2) * 8},${y} C${22 + (i % 2) * 6},${y - 15} ${30 + (i % 3) * 4},${y - 8} ${36},${y - 12}`}
                      stroke="rgba(201,169,98,0.12)"
                      strokeWidth="0.8"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Small leaf shape */}
                    <ellipse
                      cx={36 + (i % 2) * 4}
                      cy={y - 12}
                      rx="4"
                      ry="2"
                      transform={`rotate(${-30 + (i % 3) * 20} ${36 + (i % 2) * 4} ${y - 12})`}
                      fill="rgba(201,169,98,0.06)"
                      stroke="rgba(201,169,98,0.1)"
                      strokeWidth="0.5"
                    />
                    {/* Small bead / flower bud */}
                    <circle
                      cx={18 + (i % 3) * 4}
                      cy={y + 20}
                      r="1.5"
                      fill="rgba(69,160,150,0.15)"
                    />
                  </motion.g>
                ))}

                {/* Decorative dots scattered along vine */}
                {[60, 170, 310, 450, 560, 700].map((y, i) => (
                  <motion.circle
                    key={`dot-${i}`}
                    cx={12 + (i % 3) * 6}
                    cy={y}
                    r="1"
                    fill="rgba(201,169,98,0.2)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0.2] }}
                    transition={{ delay: 1 + i * 0.15, duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                ))}
              </svg>
            </div>

            {/* ─── Top ornamental border ─── */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* ─── Content ─── */}
            <div className="relative h-full flex flex-col px-8 pt-24 pb-8">
              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full border border-border/40 bg-card/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all duration-300"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close menu"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="1" y1="1" x2="13" y2="13" />
                  <line x1="13" y1="1" x2="1" y2="13" />
                </svg>
              </motion.button>

              {/* Sanskrit decorative text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-accent/20 font-serif text-xs tracking-[0.4em] uppercase mb-10"
              >
                ॥ मार्ग ॥
              </motion.p>

              {/* Navigation Links */}
              <nav className="flex-1 space-y-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.split('#')[1]
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`group relative flex items-center gap-4 py-3.5 px-4 rounded-xl transition-all duration-300 ${isActive
                          ? "bg-primary/10 border border-primary/20 text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-card/40"
                          }`}
                      >
                        {/* Active indicator dot */}
                        <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? "bg-accent scale-100 shadow-[0_0_8px_rgba(201,169,98,0.4)]" : "bg-border/50 scale-75 group-hover:bg-muted-foreground group-hover:scale-100"
                          }`} />

                        {/* Step number — ancient numeral style */}
                        <span className="font-mono text-[10px] text-accent/40 w-4">{String(index + 1).padStart(2, "0")}</span>

                        {/* Label */}
                        <span className="font-serif text-lg tracking-wide">{item.label}</span>

                        {/* Active underline */}
                        {isActive && (
                          <motion.div
                            className="absolute bottom-1 left-10 right-10 h-px bg-linear-to-r from-accent/30 via-accent/10 to-transparent"
                            layoutId="sidebar-active-line"
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Bottom section — decorative vine curl + CTA */}
              <div className="mt-auto space-y-6">
                {/* Decorative separator with vine motif */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-1 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />
                  <svg width="20" height="20" viewBox="0 0 20 20" className="text-accent/30">
                    <circle cx="10" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="0.3" />
                    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                  </svg>
                  <div className="flex-1 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary hover:bg-primary/20 transition-all duration-300 group"
                  >
                    <span className="tracking-wide">Start a Conversation</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </Link>
                </motion.div>

                {/* Sanskrit footer */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="text-center text-muted-foreground/30 text-xs font-serif italic"
                >
                  "अनंत" — Beyond boundaries
                </motion.p>
              </div>
            </div>

            {/* ─── Bottom ornamental border ─── */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />

            {/* ─── Right-edge glow ─── */}
            <div className="absolute top-0 right-0 bottom-0 w-px bg-linear-to-b from-accent/20 via-primary/10 to-accent/20" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
