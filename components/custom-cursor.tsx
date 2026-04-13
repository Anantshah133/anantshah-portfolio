"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false)
  const [hoverText, setHoverText] = useState<string | null>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  
  // Track position for the badge
  const mousePos = useRef({ x: -100, y: -100 })
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY

      const target = e.target as HTMLElement
      const cursorTarget = target.closest('[data-cursor]') as HTMLElement

      if (cursorTarget) {
        setHoverText(cursorTarget.getAttribute('data-cursor'))
      } else {
        setHoverText(null)
      }
    }

    const updateBadge = () => {
      if (infoRef.current) {
        // Offset the badge slightly from the cursor so it doesn't block clicks
        infoRef.current.style.transform = `translate3d(${mousePos.current.x + 20}px, ${mousePos.current.y + 20}px, 0)`
      }
      rafId.current = requestAnimationFrame(updateBadge)
    }

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove)
      rafId.current = requestAnimationFrame(updateBadge)
    }

    // Generate the SVG data URI for the native cursor
    const svgCursor = `
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
        <g transform="rotate(18, 12, 12)">
          <path d="M4.5 3L20.5 10L13.5 12.5L11 19.5L4.5 3Z" fill="#C9A962" stroke="rgba(0,0,0,0.6)" stroke-width="1" stroke-linejoin="round" />
        </g>
      </svg>
    `.trim().replace(/\s+/g, ' ');

    const cursorStr = `url('data:image/svg+xml;utf8,${encodeURIComponent(svgCursor)}') 4 3, auto`;
    const pointerCursorStr = `url('data:image/svg+xml;utf8,${encodeURIComponent(svgCursor)}') 4 3, pointer`;

    const style = document.createElement('style')
    style.innerHTML = `
      @media (min-width: 768px) {
        body, html {
          cursor: ${cursorStr};
        }
        
        a, button, [role="button"], input, select, textarea, [data-cursor] {
          cursor: ${pointerCursorStr} !important;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <div
      ref={infoRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex flex-col items-start will-change-transform"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      <AnimatePresence>
        {hoverText && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-2 bg-background/90 backdrop-blur-md border border-accent/30 text-accent tracking-[0.15em] text-[10px] uppercase rounded-full shadow-[0_0_15px_rgba(201,169,98,0.2)] whitespace-nowrap"
          >
            {hoverText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
