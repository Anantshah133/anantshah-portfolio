"use client"

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useEffect, useState, useCallback, useRef } from "react"
import { useBird } from "./bird-provider"

export function BirdCompanion() {
  const { birdEnabled } = useBird()
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const [isRuffling, setIsRuffling] = useState(false)
  const [isTapped, setIsTapped] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const moveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Cursor tracking with springs for smooth follow
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 90, mass: 1 }
  const birdX = useSpring(cursorX, springConfig)
  const birdY = useSpring(cursorY, springConfig)

  // Check if mobile and handle mounting
  useEffect(() => {
    setMounted(true)
    const check = () => setIsMobile(window.innerWidth < 768)
    check()

    // Set initial position for desktop
    if (window.innerWidth >= 768) {
      cursorX.set(window.innerWidth - 80)
      cursorY.set(window.innerHeight - 120)
    }

    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [cursorX, cursorY])

  // Mouse tracking (desktop only)
  useEffect(() => {
    if (isMobile || !mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      // Offset so the bird sits above and to the right of cursor
      cursorX.set(e.clientX + 8)
      cursorY.set(e.clientY - 32)

      setIsMoving(true)
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current)
      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false)
      }, 200)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current)
    }
  }, [isMobile, mounted, cursorX, cursorY])

  // Global click interaction — bird does a happy flutter
  useEffect(() => {
    if (!mounted) return

    const handleClick = () => {
      setIsClicked(true)
      setTimeout(() => setIsClicked(false), 900)
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [mounted])

  // Typing interaction — bird reacts when user types in contact form
  useEffect(() => {
    if (!mounted) return

    const handleTyping = () => {
      setIsTyping(true)
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false)
      }, 400)
    }

    window.addEventListener("bird-typing", handleTyping)
    return () => {
      window.removeEventListener("bird-typing", handleTyping)
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    }
  }, [mounted])

  // Idle animations — periodic blinking & feather ruffle
  useEffect(() => {
    if (!mounted) return

    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 3200)

    const ruffleInterval = setInterval(() => {
      setIsRuffling(true)
      setTimeout(() => setIsRuffling(false), 500)
    }, 7000)

    return () => {
      clearInterval(blinkInterval)
      clearInterval(ruffleInterval)
    }
  }, [mounted])

  const handleTap = useCallback(() => {
    setIsTapped(true)
    setTimeout(() => setIsTapped(false), 800)
  }, [])

  if (!mounted || !birdEnabled) return null

  // ── The Bird SVG — a more detailed golden sparrow/falcon ──
  const BirdSVG = (
    <svg
      width="32"
      height="32"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 2px 6px rgba(201,169,98,0.25))" }}
    >
      <defs>
        <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(220,190,120,0.95)" />
          <stop offset="70%" stopColor="rgba(180,145,70,0.9)" />
          <stop offset="100%" stopColor="rgba(150,120,55,0.85)" />
        </radialGradient>
        <radialGradient id="headGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="rgba(225,195,125,0.95)" />
          <stop offset="100%" stopColor="rgba(190,155,80,0.9)" />
        </radialGradient>
        <radialGradient id="bellyGrad" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="rgba(240,220,170,0.7)" />
          <stop offset="100%" stopColor="rgba(200,170,100,0.3)" />
        </radialGradient>
      </defs>

      {/* Tail feathers */}
      <motion.g
        animate={
          isClicked
            ? { rotate: [0, -12, 15, -8, 0], y: [0, 1, -1, 0] }
            : isTyping
              ? { rotate: [0, 2, -2, 1, 0], y: [0, 0.5, 0] }
              : isRuffling
                ? { rotate: [0, 3, -2, 0] }
                : {}
        }
        transition={{ duration: isClicked ? 0.7 : isTyping ? 0.3 : 0.4 }}
        style={{ transformOrigin: "18px 28px" }}
      >
        <path d="M14,27 C11,31 9,35 7,37" stroke="rgba(170,135,65,0.7)" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M17,28 C15,32 13,36 12,38" stroke="rgba(185,150,75,0.6)" strokeWidth="0.8" strokeLinecap="round" fill="none" />
        <path d="M20,28 C19,32 18,36 17,38" stroke="rgba(170,135,65,0.5)" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      </motion.g>

      {/* Body — rounded, natural shape */}
      <ellipse cx="18" cy="22" rx="8" ry="9" fill="url(#bodyGrad)" />

      {/* Belly patch */}
      <ellipse cx="17" cy="24" rx="5" ry="6" fill="url(#bellyGrad)" />

      {/* Wing overlay — folded resting or animated */}
      <motion.path
        d={
          isClicked
            ? undefined
            : isMoving
              ? undefined
              : isTyping
                ? undefined
                : "M24,17 C28,20 29,25 27,29 C25,27 23,24 24,17 Z"
        }
        animate={
          isClicked
            ? {
                d: [
                  "M24,17 C32,10 37,6 39,8 C36,12 30,18 24,20 Z",
                  "M24,17 C28,24 29,28 27,30 C25,28 23,24 24,17 Z",
                  "M24,17 C32,10 37,6 39,8 C36,12 30,18 24,20 Z",
                  "M24,17 C28,20 29,25 27,29 C25,27 23,24 24,17 Z",
                ],
                transition: { duration: 0.8, ease: "easeInOut" as const },
              }
            : isMoving
              ? {
                  d: [
                    "M24,17 C30,12 34,9 36,11 C33,15 28,19 24,20 Z",
                    "M24,17 C28,22 29,27 27,30 C25,28 23,24 24,17 Z",
                    "M24,17 C30,12 34,9 36,11 C33,15 28,19 24,20 Z",
                  ],
                  transition: { duration: 0.35, repeat: Infinity, ease: "easeInOut" as const },
                }
              : isTyping
                ? {
                    d: [
                      "M24,17 C27,14 30,12 32,14 C30,17 27,19 24,19 Z",
                      "M24,17 C28,20 29,25 27,29 C25,27 23,24 24,17 Z",
                      "M24,17 C27,14 30,12 32,14 C30,17 27,19 24,19 Z",
                    ],
                    transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" as const },
                  }
                : {}
        }
        fill="rgba(175,140,65,0.8)"
        stroke="rgba(150,120,50,0.3)"
        strokeWidth="0.5"
      />

      {/* Head — with typing head-bob */}
      <motion.circle
        cx="16" cy="11" r="6.5" fill="url(#headGrad)"
        animate={
          isTyping
            ? { cy: [11, 10, 11.5, 11], cx: [16, 15.5, 16.5, 16] }
            : {}
        }
        transition={{ duration: 0.4, repeat: isTyping ? Infinity : 0, ease: "easeInOut" }}
      />

      {/* Eye — dark with shine */}
      {isBlinking ? (
        <line x1="12" y1="10" x2="14.5" y2="10" stroke="rgba(40,30,15,0.9)" strokeWidth="0.8" strokeLinecap="round" />
      ) : (
        <>
          <circle cx="13" cy="10" r="1.8" fill="rgba(40,30,15,0.9)" />
          <circle cx="13.5" cy="9.3" r="0.5" fill="rgba(255,255,255,0.85)" />
        </>
      )}

      {/* Beak — small and triangular */}
      <path d="M9.5,11.5 L6,12.5 L9.5,13.5 Z" fill="rgba(200,140,50,0.95)" />
      <line x1="9.5" y1="12.5" x2="6.5" y2="12.5" stroke="rgba(160,110,40,0.6)" strokeWidth="0.3" />

      {/* Crown tuft — ancient royal touch */}
      <motion.g
        animate={
          isClicked
            ? { rotate: [0, -15, 10, -5, 0] }
            : isRuffling
              ? { rotate: [0, 5, -3, 0] }
              : {}
        }
        transition={{ duration: isClicked ? 0.6 : 0.4 }}
        style={{ transformOrigin: "16px 5px" }}
      >
        <path d="M16,5 C16,2.5 17,1 18.5,0" stroke="rgba(190,155,70,0.7)" strokeWidth="0.7" strokeLinecap="round" fill="none" />
        <path d="M15,5.5 C14,3 13.5,1.5 14,0" stroke="rgba(190,155,70,0.5)" strokeWidth="0.5" strokeLinecap="round" fill="none" />
      </motion.g>

      {/* Tiny feet */}
      <g opacity="0.5">
        <path d="M15,30 L14,33 M15,30 L16,33 M15,30 L13,32" stroke="rgba(180,140,60,0.7)" strokeWidth="0.5" strokeLinecap="round" />
        <path d="M20,30 L19,33 M20,30 L21,33 M20,30 L18,32" stroke="rgba(180,140,60,0.7)" strokeWidth="0.5" strokeLinecap="round" />
      </g>

      {/* Feather texture lines on body */}
      <path d="M13,19 C15,20 17,20 19,19" stroke="rgba(160,130,60,0.15)" strokeWidth="0.4" fill="none" />
      <path d="M12,22 C14,23 17,23 20,22" stroke="rgba(160,130,60,0.12)" strokeWidth="0.4" fill="none" />
      <path d="M13,25 C15,26 17,26 19,25" stroke="rgba(160,130,60,0.1)" strokeWidth="0.4" fill="none" />
    </svg>
  )

  // ── Mobile: Perched in corner ──
  if (isMobile) {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={handleTap}
        onTouchStart={handleTap}
      >
        {/* Perch line */}
        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-12 h-px bg-accent/20 rounded-full" />

        {/* Breathing animation */}
        <motion.div
          animate={{
            y: [0, -1.5, 0],
            rotate: [0, -1.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {BirdSVG}
        </motion.div>

        {/* Tap reaction — small feather particles */}
        <AnimatePresence>
          {isTapped && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`feather-${i}`}
                  className="absolute top-0 left-1/2"
                  initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    y: -(15 + i * 10),
                    x: (i - 1) * 14,
                    scale: 0.4,
                    rotate: (i - 1) * 40,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8">
                    <path d="M4,0 C5.5,2.5 5.5,5.5 4,8 C2.5,5.5 2.5,2.5 4,0" fill="rgba(201,169,98,0.6)" />
                  </svg>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  // ── Desktop: Following cursor ──
  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none"
      style={{
        x: birdX,
        y: birdY,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      {/* Happy click reaction — bounce up and spin */}
      <motion.div
        animate={
          isClicked
            ? {
                y: [0, -18, -12, -20, 0],
                rotate: [0, -8, 5, -3, 0],
              }
            : {}
        }
        transition={{ duration: 0.85, ease: "easeOut" }}
      >
        {/* Subtle glow underneath */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201,169,98,0.06) 0%, transparent 70%)",
          }}
        />
        {BirdSVG}

        {/* Click sparkle particles */}
        <AnimatePresence>
          {isClicked && (
            <>
              {[0, 1, 2, 3, 4].map((i) => {
                const angle = (i * 72 + 30) * (Math.PI / 180)
                return (
                  <motion.div
                    key={`spark-${i}`}
                    className="absolute top-1/2 left-1/2"
                    initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    animate={{
                      opacity: 0,
                      x: Math.cos(angle) * 25,
                      y: Math.sin(angle) * 25 - 10,
                      scale: 0.3,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.04 }}
                  >
                    <div className="w-1 h-1 rounded-full bg-accent/60" />
                  </motion.div>
                )
              })}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
