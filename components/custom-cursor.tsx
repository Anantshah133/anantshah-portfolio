"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

export function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false)
  const [hoverText, setHoverText] = useState<string | null>(null)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Remove useSpring and use raw motion values for zero delay tracking
  const springConfig = { damping: 100, stiffness: 2000, mass: 0.1 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      const target = e.target as HTMLElement
      const cursorTarget = target.closest('[data-cursor]') as HTMLElement

      if (cursorTarget) {
        setHoverText(cursorTarget.getAttribute('data-cursor'))
      } else {
        setHoverText(null)
      }

      // Hide default cursor across the document when moving
      if (document.body.style.cursor !== 'none') {
        document.body.style.cursor = 'none'
      }
    }

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove)
    } else {
      document.body.style.cursor = 'auto'
    }

    // also set cursor none for all standard clickable elements globally to avoid blinking
    const style = document.createElement('style')
    style.innerHTML = `
      @media (min-width: 768px) {
        * { cursor: none !important; }
      }
    `
    document.head.appendChild(style)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.style.cursor = 'auto'
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [cursorX, cursorY, isMobile])

  if (isMobile) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex flex-col items-start"
      style={{ x: cursorX, y: cursorY }}
    >
      <div className="relative -top-1 -left-1">
        {/* Custom arrow SVG tracking mouse */}
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="rgba(0,0,0,0.6)"
          strokeWidth="1"
          className="drop-shadow-md text-accent rotate-[15deg]"
        >
          <path d="M4.5 3L20.5 10L13.5 12.5L11 19.5L4.5 3Z" strokeLinejoin="round" />
        </svg>

        <AnimatePresence>
          {hoverText && (
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute top-6 left-5 px-4 py-2 bg-background/90 backdrop-blur-md border border-accent/30 text-accent tracking-[0.15em] text-[10px] uppercase rounded-full shadow-[0_0_15px_rgba(201,169,98,0.2)] whitespace-nowrap"
            >
              {hoverText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
