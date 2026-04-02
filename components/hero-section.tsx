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
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      {/* ═══ 1. Mandala Chakra Background ═══ */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

        {/* Radial Golden Glow */}
        <div
          className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201,169,98,0.08) 0%, rgba(201,169,98,0.03) 35%, rgba(201,169,98,0.01) 55%, transparent 70%)",
          }}
        />

        {/* ── Layer 1: Outermost Ring — Medallions + Arcs ── */}
        <motion.div
          className="absolute w-[520px] h-[520px] md:w-[680px] md:h-[680px] lg:w-[840px] lg:h-[840px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 600 600" className="w-full h-full" fill="none" overflow="visible">
            {/* Double outer circles */}
            <circle cx="300" cy="300" r="292" stroke="rgba(201,169,98,0.08)" strokeWidth="0.7" />
            <circle cx="300" cy="300" r="288" stroke="rgba(201,169,98,0.05)" strokeWidth="0.5" />
            <circle cx="300" cy="300" r="282" stroke="rgba(201,169,98,0.04)" strokeWidth="0.4" strokeDasharray="4 8" />

            {/* 8 Medallion nodes */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180
              const cx = 300 + 290 * Math.cos(rad - Math.PI / 2)
              const cy = 300 + 290 * Math.sin(rad - Math.PI / 2)
              return (
                <g key={`med-${angle}`}>
                  <circle cx={cx.toFixed(2)} cy={cy.toFixed(2)} r="16" stroke="rgba(201,169,98,0.12)" strokeWidth="0.7" fill="rgba(201,169,98,0.02)" />
                  <circle cx={cx.toFixed(2)} cy={cy.toFixed(2)} r="11" stroke="rgba(201,169,98,0.08)" strokeWidth="0.5" />
                  <circle cx={cx.toFixed(2)} cy={cy.toFixed(2)} r="4" fill="rgba(201,169,98,0.08)" />
                  {/* Cross lines inside medallion */}
                  <line x1={Number(cx.toFixed(2)) - 7} y1={cy.toFixed(2)} x2={Number(cx.toFixed(2)) + 7} y2={cy.toFixed(2)} stroke="rgba(201,169,98,0.05)" strokeWidth="0.3" />
                  <line x1={cx.toFixed(2)} y1={Number(cy.toFixed(2)) - 7} x2={cx.toFixed(2)} y2={Number(cy.toFixed(2)) + 7} stroke="rgba(201,169,98,0.05)" strokeWidth="0.3" />
                </g>
              )
            })}

            {/* Connecting arcs between adjacent medallions */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const nextAngle = (angle + 45) * Math.PI / 180
              const curAngle = angle * Math.PI / 180
              const r = 290
              const x1 = 300 + r * Math.cos(curAngle - Math.PI / 2)
              const y1 = 300 + r * Math.sin(curAngle - Math.PI / 2)
              const x2 = 300 + r * Math.cos(nextAngle - Math.PI / 2)
              const y2 = 300 + r * Math.sin(nextAngle - Math.PI / 2)
              const midAngle = ((angle + 22.5) * Math.PI) / 180
              const mx = 300 + 260 * Math.cos(midAngle - Math.PI / 2)
              const my = 300 + 260 * Math.sin(midAngle - Math.PI / 2)
              return (
                <path
                  key={`arc-${i}`}
                  d={`M${x1.toFixed(2)},${y1.toFixed(2)} Q${mx.toFixed(2)},${my.toFixed(2)} ${x2.toFixed(2)},${y2.toFixed(2)}`}
                  stroke="rgba(201,169,98,0.06)"
                  strokeWidth="0.6"
                  fill="none"
                />
              )
            })}

            {/* 16 radial tick marks between medallions */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = i * 22.5
              const rad = (angle * Math.PI) / 180
              const x1 = 300 + 275 * Math.cos(rad - Math.PI / 2)
              const y1 = 300 + 275 * Math.sin(rad - Math.PI / 2)
              const x2 = 300 + 282 * Math.cos(rad - Math.PI / 2)
              const y2 = 300 + 282 * Math.sin(rad - Math.PI / 2)
              return <line key={`tick1-${i}`} x1={x1.toFixed(2)} y1={y1.toFixed(2)} x2={x2.toFixed(2)} y2={y2.toFixed(2)} stroke="rgba(201,169,98,0.06)" strokeWidth="0.4" />
            })}
          </svg>
        </motion.div>

        {/* ── Layer 2: Geometric Star Ring — 8pt + 16pt Stars ── */}
        <motion.div
          className="absolute w-[420px] h-[420px] md:w-[550px] md:h-[550px] lg:w-[680px] lg:h-[680px]"
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 500 500" className="w-full h-full" fill="none" overflow="visible">
            {/* Bounding circles */}
            <circle cx="250" cy="250" r="240" stroke="rgba(201,169,98,0.08)" strokeWidth="0.6" />
            <circle cx="250" cy="250" r="235" stroke="rgba(201,169,98,0.04)" strokeWidth="0.4" strokeDasharray="2 6" />

            {/* 8-pointed star (two overlapping squares) */}
            <polygon
              points={Array.from({ length: 4 }).map((_, i) => {
                const angle = i * 90
                const rad = (angle * Math.PI) / 180
                const x = 250 + 220 * Math.cos(rad - Math.PI / 2)
                const y = 250 + 220 * Math.sin(rad - Math.PI / 2)
                return `${x.toFixed(2)},${y.toFixed(2)}`
              }).join(' ')}
              fill="none" stroke="rgba(201,169,98,0.06)" strokeWidth="0.5"
            />
            <polygon
              points={Array.from({ length: 4 }).map((_, i) => {
                const angle = i * 90 + 45
                const rad = (angle * Math.PI) / 180
                const x = 250 + 220 * Math.cos(rad - Math.PI / 2)
                const y = 250 + 220 * Math.sin(rad - Math.PI / 2)
                return `${x.toFixed(2)},${y.toFixed(2)}`
              }).join(' ')}
              fill="none" stroke="rgba(201,169,98,0.05)" strokeWidth="0.5"
            />

            {/* 16-pointed star — radial lines from center to edge */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = i * 22.5
              const rad = (angle * Math.PI) / 180
              const x1 = 250 + 180 * Math.cos(rad - Math.PI / 2)
              const y1 = 250 + 180 * Math.sin(rad - Math.PI / 2)
              const x2 = 250 + 230 * Math.cos(rad - Math.PI / 2)
              const y2 = 250 + 230 * Math.sin(rad - Math.PI / 2)
              return <line key={`ray-${i}`} x1={x1.toFixed(2)} y1={y1.toFixed(2)} x2={x2.toFixed(2)} y2={y2.toFixed(2)} stroke="rgba(201,169,98,0.04)" strokeWidth="0.4" />
            })}

            {/* Inner concentric circles */}
            <circle cx="250" cy="250" r="200" stroke="rgba(201,169,98,0.05)" strokeWidth="0.5" />
            <circle cx="250" cy="250" r="180" stroke="rgba(201,169,98,0.04)" strokeWidth="0.4" strokeDasharray="3 5" />

            {/* 8 dots at inner circle junctions */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = i * 45
              const rad = (angle * Math.PI) / 180
              const cx = 250 + 200 * Math.cos(rad - Math.PI / 2)
              const cy = 250 + 200 * Math.sin(rad - Math.PI / 2)
              return <circle key={`jdot-${i}`} cx={cx.toFixed(2)} cy={cy.toFixed(2)} r="2.5" fill="rgba(201,169,98,0.08)" />
            })}
          </svg>
        </motion.div>

        {/* ── Layer 3: Zigzag Triangle Border Band ── */}
        <motion.div
          className="absolute w-[330px] h-[330px] md:w-[430px] md:h-[430px] lg:w-[530px] lg:h-[530px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" overflow="visible">
            {/* Outer zigzag ring */}
            <path
              d={Array.from({ length: 48 }).map((_, i) => {
                const angle1 = i * 7.5
                const angle2 = i * 7.5 + 3.75
                const r1 = 192
                const r2 = 180
                const rad1 = (angle1 * Math.PI) / 180
                const rad2 = (angle2 * Math.PI) / 180
                const x1 = 200 + r1 * Math.cos(rad1 - Math.PI / 2)
                const y1 = 200 + r1 * Math.sin(rad1 - Math.PI / 2)
                const x2 = 200 + r2 * Math.cos(rad2 - Math.PI / 2)
                const y2 = 200 + r2 * Math.sin(rad2 - Math.PI / 2)
                return `${i === 0 ? 'M' : 'L'}${x1.toFixed(2)},${y1.toFixed(2)} L${x2.toFixed(2)},${y2.toFixed(2)}`
              }).join(' ') + ' Z'}
              stroke="rgba(201,169,98,0.08)"
              strokeWidth="0.5"
              fill="none"
            />

            {/* Inner zigzag ring (inverted teeth) */}
            <path
              d={Array.from({ length: 48 }).map((_, i) => {
                const angle1 = i * 7.5
                const angle2 = i * 7.5 + 3.75
                const r1 = 170
                const r2 = 160
                const rad1 = (angle1 * Math.PI) / 180
                const rad2 = (angle2 * Math.PI) / 180
                const x1 = 200 + r1 * Math.cos(rad1 - Math.PI / 2)
                const y1 = 200 + r1 * Math.sin(rad1 - Math.PI / 2)
                const x2 = 200 + r2 * Math.cos(rad2 - Math.PI / 2)
                const y2 = 200 + r2 * Math.sin(rad2 - Math.PI / 2)
                return `${i === 0 ? 'M' : 'L'}${x1.toFixed(2)},${y1.toFixed(2)} L${x2.toFixed(2)},${y2.toFixed(2)}`
              }).join(' ') + ' Z'}
              stroke="rgba(201,169,98,0.05)"
              strokeWidth="0.4"
              fill="none"
            />

            {/* Concentric guide circles */}
            <circle cx="200" cy="200" r="175" stroke="rgba(201,169,98,0.05)" strokeWidth="0.4" />
            <circle cx="200" cy="200" r="155" stroke="rgba(201,169,98,0.04)" strokeWidth="0.3" />
            <circle cx="200" cy="200" r="150" stroke="rgba(201,169,98,0.03)" strokeWidth="0.3" strokeDasharray="1.5 4" />
          </svg>
        </motion.div>

        {/* ── Layer 4: Inner Sacred Geometry — Stars + Hexagon ── */}
        <motion.div
          className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] lg:w-[370px] lg:h-[370px]"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" overflow="visible">
            <circle cx="200" cy="200" r="195" stroke="rgba(201,169,98,0.1)" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="188" stroke="rgba(201,169,98,0.06)" strokeWidth="0.3" strokeDasharray="2 5" />

            {/* Inscribed hexagon */}
            <polygon
              points={Array.from({ length: 6 }).map((_, i) => {
                const angle = i * 60
                const rad = (angle * Math.PI) / 180
                const x = 200 + 175 * Math.cos(rad - Math.PI / 2)
                const y = 200 + 175 * Math.sin(rad - Math.PI / 2)
                return `${x.toFixed(2)},${y.toFixed(2)}`
              }).join(' ')}
              fill="none" stroke="rgba(201,169,98,0.08)" strokeWidth="0.6"
            />

            {/* Star of David — two overlapping triangles */}
            <polygon
              points={Array.from({ length: 3 }).map((_, i) => {
                const angle = i * 120
                const rad = (angle * Math.PI) / 180
                const x = 200 + 165 * Math.cos(rad - Math.PI / 2)
                const y = 200 + 165 * Math.sin(rad - Math.PI / 2)
                return `${x.toFixed(2)},${y.toFixed(2)}`
              }).join(' ')}
              fill="none" stroke="rgba(201,169,98,0.08)" strokeWidth="0.5"
            />
            <polygon
              points={Array.from({ length: 3 }).map((_, i) => {
                const angle = i * 120 + 60
                const rad = (angle * Math.PI) / 180
                const x = 200 + 165 * Math.cos(rad - Math.PI / 2)
                const y = 200 + 165 * Math.sin(rad - Math.PI / 2)
                return `${x.toFixed(2)},${y.toFixed(2)}`
              }).join(' ')}
              fill="none" stroke="rgba(201,169,98,0.06)" strokeWidth="0.5"
            />

            {/* Inner concentric rings */}
            <circle cx="200" cy="200" r="120" stroke="rgba(201,169,98,0.05)" strokeWidth="0.4" />
            <circle cx="200" cy="200" r="80" stroke="rgba(201,169,98,0.04)" strokeWidth="0.4" strokeDasharray="3 4" />

            {/* Interlocking spiral knot at center */}
            <path d="M200,160 C230,160 240,185 240,200 C240,215 230,240 200,240 C170,240 160,215 160,200 C160,185 170,160 200,160" stroke="rgba(201,169,98,0.06)" strokeWidth="0.5" />
            <path d="M180,170 C200,150 230,170 230,200 C230,230 200,250 180,230 C160,210 180,190 200,200" stroke="rgba(201,169,98,0.05)" strokeWidth="0.4" />
            <path d="M220,170 C200,150 170,170 170,200 C170,230 200,250 220,230 C240,210 220,190 200,200" stroke="rgba(201,169,98,0.05)" strokeWidth="0.4" />

            {/* Center focal point */}
            <circle cx="200" cy="200" r="12" stroke="rgba(201,169,98,0.08)" strokeWidth="0.6" />
            <circle cx="200" cy="200" r="5" fill="rgba(201,169,98,0.1)" />
            <circle cx="200" cy="200" r="30" stroke="rgba(201,169,98,0.04)" strokeWidth="0.3" strokeDasharray="2 3" />

            {/* 12 tiny rays from center */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = i * 30
              const rad = (angle * Math.PI) / 180
              const x1 = 200 + 15 * Math.cos(rad - Math.PI / 2)
              const y1 = 200 + 15 * Math.sin(rad - Math.PI / 2)
              const x2 = 200 + 35 * Math.cos(rad - Math.PI / 2)
              const y2 = 200 + 35 * Math.sin(rad - Math.PI / 2)
              return <line key={`cray-${i}`} x1={x1.toFixed(2)} y1={y1.toFixed(2)} x2={x2.toFixed(2)} y2={y2.toFixed(2)} stroke="rgba(201,169,98,0.04)" strokeWidth="0.3" />
            })}
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
          I focus on building real applications - not just projects that look good, but ones that actually make sense (Not an average GPT developer).
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#about"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-sm tracking-wide hover:bg-primary/90 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(69, 160, 150, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            Explore About Me
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
