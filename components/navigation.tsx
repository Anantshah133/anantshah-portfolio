"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import { Sun, Moon } from "lucide-react"
import Link from "next/link"
import { MobileSidebar } from "./mobile-sidebar"
import { useBird } from "./bird-provider"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { birdEnabled, toggleBird } = useBird()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)

    // Scroll-spy logic
    const observerOptions = {
      rootMargin: "-20% 0% -70% 0%",
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [sidebarOpen])

  const navItems = [
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/#projects" },
    { label: "Process", href: "/#process" },
    { label: "Signature", href: "/#signature" },
    { label: "Blogs", href: "/#blogs" },
    { label: "Contact", href: "/#contact" },
  ]

  const isDark = theme === "dark"

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="group">
            <motion.div
              className="font-serif text-2xl font-medium tracking-tight text-foreground"
              whileHover={{ scale: 1.02 }}
            >
              Anant <span className="text-accent">Shah</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.slice(1)
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm transition-colors duration-300 relative group ${isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7 + index * 0.1 }}
                  >
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`} />
                  </motion.span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Let's Talk CTA — hidden on mobile when hamburger is shown */}
            <motion.a
              href="#contact"
              className="hidden md:inline-flex px-5 py-2.5 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary hover:bg-primary/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Let's Talk
            </motion.a>

            {/* Bird Companion Toggle */}
            <motion.button
              onClick={toggleBird}
              className={`relative w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                birdEnabled
                  ? "border-accent/40 bg-accent/10 text-accent hover:bg-accent/20"
                  : "border-border/50 bg-card/40 text-muted-foreground hover:text-foreground hover:border-accent/30"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              aria-label={birdEnabled ? "Disable bird companion" : "Enable bird companion"}
              title={birdEnabled ? "Disable companion" : "Enable companion"}
            >
              <AnimatePresence mode="wait">
                {birdEnabled ? (
                  <motion.svg
                    key="bird-on"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Bird body */}
                    <ellipse cx="12" cy="14" rx="4.5" ry="5" fill="currentColor" opacity="0.9" />
                    {/* Head */}
                    <circle cx="11" cy="7.5" r="3.5" fill="currentColor" opacity="0.95" />
                    {/* Beak */}
                    <path d="M7.5,8 L5,9 L7.5,10" fill="currentColor" opacity="0.8" />
                    {/* Eye */}
                    <circle cx="9.8" cy="7" r="0.8" fill="var(--background)" />
                    {/* Wing */}
                    <path d="M15,10 C18,8 20,7 21,9 C19,11 17,12 15,12 Z" fill="currentColor" opacity="0.7" />
                    {/* Tail */}
                    <path d="M14,18 C14,20 13,22 12,23 M12,18 C11,20 10,22 9,23" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="bird-off"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Bird body (dimmed) */}
                    <ellipse cx="12" cy="14" rx="4.5" ry="5" fill="currentColor" opacity="0.3" />
                    {/* Head */}
                    <circle cx="11" cy="7.5" r="3.5" fill="currentColor" opacity="0.35" />
                    {/* Beak */}
                    <path d="M7.5,8 L5,9 L7.5,10" fill="currentColor" opacity="0.25" />
                    {/* Wing */}
                    <path d="M15,10 C18,8 20,7 21,9 C19,11 17,12 15,12 Z" fill="currentColor" opacity="0.25" />
                    {/* Diagonal slash through */}
                    <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                    <line x1="3" y1="3" x2="21" y2="21" stroke="var(--background)" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Hamburger button — visible on mobile/tablet */}
            <motion.button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden relative w-10 h-10 rounded-full border border-border/50 bg-card/40 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all duration-300"
              whileTap={{ scale: 0.92 }}
              aria-label="Open menu"
            >
              <div className="flex flex-col gap-[5px]">
                <span className="block w-4 h-[1.5px] bg-current rounded-full" />
                <span className="block w-3 h-[1.5px] bg-current rounded-full" />
                <span className="block w-4 h-[1.5px] bg-current rounded-full" />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
      />
    </>
  )
}
