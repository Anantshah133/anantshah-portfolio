"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { FogEffect } from "./fog-effect"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const nameLetters = "Anant Shah".split("")

  // Constellation points (fixed positions as percentages)
  const stars = [
    { x: 20, y: 25 }, { x: 35, y: 15 }, { x: 65, y: 18 },
    { x: 78, y: 28 }, { x: 72, y: 72 }, { x: 30, y: 78 },
    { x: 50, y: 50 },
  ]
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    [0, 6], [2, 6], [4, 6],
  ]

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fog Background Effect */}
      <FogEffect />

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* ═══ 1. Sacred Geometry Ring ═══ */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer ring — slow clockwise */}
        <motion.div
          className="absolute w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
            <circle cx="200" cy="200" r="195" stroke="rgba(201,169,98,0.06)" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="195" stroke="rgba(201,169,98,0.08)" strokeWidth="0.5" strokeDasharray="4 12" />
            {/* Cardinal dots at N, E, S, W */}
            <circle cx="200" cy="5" r="2" fill="rgba(201,169,98,0.15)" />
            <circle cx="395" cy="200" r="2" fill="rgba(201,169,98,0.15)" />
            <circle cx="200" cy="395" r="2" fill="rgba(201,169,98,0.15)" />
            <circle cx="5" cy="200" r="2" fill="rgba(201,169,98,0.15)" />
          </svg>
        </motion.div>

        {/* Middle ring — counter-clockwise */}
        <motion.div
          className="absolute w-[380px] h-[380px] md:w-[500px] md:h-[500px] lg:w-[620px] lg:h-[620px]"
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
            <circle cx="200" cy="200" r="195" stroke="rgba(201,169,98,0.05)" strokeWidth="0.5" strokeDasharray="2 8" />
            {/* 8 tick marks at 45-degree intervals */}
            <line x1="200" y1="5" x2="200" y2="25" stroke="rgba(201,169,98,0.08)" strokeWidth="0.5" />
            <line x1="338" y1="62" x2="324" y2="76" stroke="rgba(201,169,98,0.08)" strokeWidth="0.5" />
            <line x1="395" y1="200" x2="375" y2="200" stroke="rgba(201,169,98,0.08)" strokeWidth="0.5" />
            <line x1="338" y1="338" x2="324" y2="324" stroke="rgba(201,169,98,0.08)" strokeWidth="0.5" />
            <line x1="200" y1="395" x2="200" y2="375" stroke="rgba(201,169,98,0.08)" strokeWidth="0.5" />
            <line x1="62" y1="338" x2="76" y2="324" stroke="rgba(201,169,98,0.08)" strokeWidth="0.5" />
            <line x1="5" y1="200" x2="25" y2="200" stroke="rgba(201,169,98,0.08)" strokeWidth="0.5" />
            <line x1="62" y1="62" x2="76" y2="76" stroke="rgba(201,169,98,0.08)" strokeWidth="0.5" />
          </svg>
        </motion.div>

        {/* Inner ring — slow clockwise */}
        <motion.div
          className="absolute w-[260px] h-[260px] md:w-[350px] md:h-[350px] lg:w-[440px] lg:h-[440px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
            <circle cx="200" cy="200" r="195" stroke="rgba(201,169,98,0.04)" strokeWidth="0.5" />
            {/* Inscribed triangle */}
            <polygon
              points="200,5 369,297.5 31,297.5"
              fill="none"
              stroke="rgba(201,169,98,0.04)"
              strokeWidth="0.5"
            />
            {/* Center dot */}
            <circle cx="200" cy="200" r="3" fill="rgba(201,169,98,0.08)" />
            <circle cx="200" cy="200" r="8" stroke="rgba(201,169,98,0.05)" strokeWidth="0.3" />
          </svg>
        </motion.div>
      </div>

      {/* ═══ 2. Golden Particle Constellation ═══ */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" fill="none">
          {/* Connecting lines */}
          {connections.map(([a, b], i) => (
            <motion.line
              key={`line-${i}`}
              x1={`${stars[a].x}%`} y1={`${stars[a].y}%`}
              x2={`${stars[b].x}%`} y2={`${stars[b].y}%`}
              stroke="rgba(201,169,98,0.06)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 2 + i * 0.15, ease: "easeOut" }}
            />
          ))}
          {/* Star dots */}
          {stars.map((star, i) => (
            <motion.circle
              key={`star-${i}`}
              cx={`${star.x}%`}
              cy={`${star.y}%`}
              r={i === 6 ? "2.5" : "1.5"}
              fill="rgba(201,169,98,0.2)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.4, 0.2, 0.4],
                scale: 1,
              }}
              transition={{
                opacity: { duration: 6, delay: 2.5 + i * 0.2, repeat: Infinity, repeatType: "reverse" },
                scale: { duration: 0.5, delay: 2 + i * 0.1 },
              }}
            />
          ))}
        </svg>
      </div>

      {/* ═══ 3. Decorative Border Ornaments ═══ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left corner */}
        <motion.div
          className="absolute top-6 left-6 md:top-10 md:left-10 w-16 h-16 md:w-20 md:h-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
        >
          <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
            <path d="M0,40 C0,8 8,0 40,0" stroke="rgba(201,169,98,0.2)" strokeWidth="0.8" />
            <path d="M0,28 C0,6 6,0 28,0" stroke="rgba(201,169,98,0.12)" strokeWidth="0.5" />
            <circle cx="40" cy="0" r="2" fill="rgba(201,169,98,0.2)" />
            <circle cx="0" cy="40" r="2" fill="rgba(201,169,98,0.2)" />
            <path d="M6,6 L10,2 L14,6 L10,10 Z" fill="rgba(201,169,98,0.08)" stroke="rgba(201,169,98,0.15)" strokeWidth="0.5" />
          </svg>
        </motion.div>

        {/* Top-right corner */}
        <motion.div
          className="absolute top-6 right-6 md:top-10 md:right-10 w-16 h-16 md:w-20 md:h-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1.5 }}
        >
          <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
            <path d="M80,40 C80,8 72,0 40,0" stroke="rgba(201,169,98,0.2)" strokeWidth="0.8" />
            <path d="M80,28 C80,6 74,0 52,0" stroke="rgba(201,169,98,0.12)" strokeWidth="0.5" />
            <circle cx="40" cy="0" r="2" fill="rgba(201,169,98,0.2)" />
            <circle cx="80" cy="40" r="2" fill="rgba(201,169,98,0.2)" />
            <path d="M66,6 L70,2 L74,6 L70,10 Z" fill="rgba(201,169,98,0.08)" stroke="rgba(201,169,98,0.15)" strokeWidth="0.5" />
          </svg>
        </motion.div>

        {/* Bottom-left corner */}
        <motion.div
          className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-16 h-16 md:w-20 md:h-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1.5 }}
        >
          <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
            <path d="M0,40 C0,72 8,80 40,80" stroke="rgba(201,169,98,0.2)" strokeWidth="0.8" />
            <path d="M0,52 C0,74 6,80 28,80" stroke="rgba(201,169,98,0.12)" strokeWidth="0.5" />
            <circle cx="40" cy="80" r="2" fill="rgba(201,169,98,0.2)" />
            <circle cx="0" cy="40" r="2" fill="rgba(201,169,98,0.2)" />
            <path d="M6,74 L10,70 L14,74 L10,78 Z" fill="rgba(201,169,98,0.08)" stroke="rgba(201,169,98,0.15)" strokeWidth="0.5" />
          </svg>
        </motion.div>

        {/* Bottom-right corner */}
        <motion.div
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-16 h-16 md:w-20 md:h-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1.5 }}
        >
          <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
            <path d="M80,40 C80,72 72,80 40,80" stroke="rgba(201,169,98,0.2)" strokeWidth="0.8" />
            <path d="M80,52 C80,74 74,80 52,80" stroke="rgba(201,169,98,0.12)" strokeWidth="0.5" />
            <circle cx="40" cy="80" r="2" fill="rgba(201,169,98,0.2)" />
            <circle cx="80" cy="40" r="2" fill="rgba(201,169,98,0.2)" />
            <path d="M66,74 L70,70 L74,74 L70,78 Z" fill="rgba(201,169,98,0.08)" stroke="rgba(201,169,98,0.15)" strokeWidth="0.5" />
          </svg>
        </motion.div>
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase mb-6"
        >
          ⚡Full Stack Developer⚡
        </motion.p>

        {/* Main Name */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight mb-4">
          {nameLetters.map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block"
              initial={{ opacity: 0, y: 100, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5 + index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="font-serif text-xl md:text-2xl lg:text-3xl text-muted-foreground italic max-w-2xl mx-auto mb-8"
        >
          "Just a little more than infinity."
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-muted-foreground/80 max-w-lg mx-auto text-sm md:text-base leading-relaxed mb-12"
        >
          I'm not an average GPT developer. I craft digital experiences that blend ancient wisdom with modern
          innovation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#signature"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-sm tracking-wide hover:bg-primary/90 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(69, 160, 150, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 border border-border/50 text-foreground rounded-full font-medium text-sm tracking-wide hover:border-primary/50 hover:text-primary transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
