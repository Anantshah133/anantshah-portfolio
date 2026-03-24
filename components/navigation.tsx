"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import { Sun, Moon } from "lucide-react"
import Link from "next/link"
import { MobileSidebar } from "./mobile-sidebar"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()

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
