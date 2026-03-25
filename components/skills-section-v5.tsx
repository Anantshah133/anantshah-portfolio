"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { SectionTitle } from "./section-title"

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "primary" as const,
    orbitRadius: 140,
    duration: 45,
    direction: 1,
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "GraphQL", "REST APIs", "Microservices"],
    color: "accent" as const,
    orbitRadius: 190,
    duration: 60,
    direction: -1,
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
    color: "primary" as const,
    orbitRadius: 240,
    duration: 80,
    direction: 1,
  },
  {
    title: "Tools & AI",
    skills: ["Git", "Docker", "AWS", "OpenAI", "LangChain"],
    color: "accent" as const,
    orbitRadius: 285,
    duration: 100,
    direction: -1,
  },
]

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredOrbit, setHoveredOrbit] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)

  const center = 300

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="relative max-w-6xl mx-auto">
        <SectionTitle subtitle="Expertise" title="Crafting the" highlight="Digital Universe" isInView={isInView} />

        {/* Orbit System */}
        <div
          className="relative w-full max-w-[620px] mx-auto aspect-square mb-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { setPaused(false); setHoveredOrbit(null) }}
        >
          <svg viewBox="0 0 600 600" className="w-full h-full overflow-visible" fill="none">
            {/* Orbit rings */}
            {skillCategories.map((cat, catIdx) => {
              const isActive = hoveredOrbit === catIdx
              const isPrimary = cat.color === "primary"
              const strokeColor = isPrimary ? "69,160,150" : "201,169,98"

              return (
                <g key={`orbit-${catIdx}`}>
                  {/* Orbit track */}
                  <motion.circle
                    cx={center} cy={center} r={cat.orbitRadius}
                    stroke={`rgba(${strokeColor},${isActive ? 0.2 : 0.06})`}
                    strokeWidth={isActive ? "1" : "0.5"}
                    strokeDasharray={catIdx % 2 === 0 ? "none" : "4 8"}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + catIdx * 0.15 }}
                    style={{ transformOrigin: `${center}px ${center}px`, transition: "stroke 0.3s, stroke-width 0.3s" }}
                  />

                  {/* Rotating group with pills */}
                  <motion.g
                    animate={isInView && !paused ? { rotate: [0, 360 * cat.direction] } : {}}
                    transition={{
                      duration: cat.duration,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: `${center}px ${center}px` }}
                    onMouseEnter={() => setHoveredOrbit(catIdx)}
                  >
                    {cat.skills.map((skill, skillIdx) => {
                      const angle = (skillIdx / cat.skills.length) * Math.PI * 2 - Math.PI / 2
                      const sx = center + cat.orbitRadius * Math.cos(angle)
                      const sy = center + cat.orbitRadius * Math.sin(angle)

                      return (
                        <g key={skill}>
                          {/* Glow */}
                          {isActive && (
                            <circle
                              cx={sx} cy={sy} r="20"
                              fill={`rgba(${strokeColor},0.06)`}
                            />
                          )}
                          {/* Pill background */}
                          <rect
                            x={sx - 24} y={sy - 9}
                            width="48" height="18"
                            rx="9"
                            fill={isActive ? `rgba(${strokeColor},0.15)` : "rgba(13,26,26,0.8)"}
                            stroke={`rgba(${strokeColor},${isActive ? 0.4 : 0.15})`}
                            strokeWidth="0.5"
                            style={{ transition: "fill 0.3s, stroke 0.3s" }}
                          />
                          {/* Counter-rotate text so it stays readable */}
                          <motion.g
                            animate={isInView && !paused ? { rotate: [0, -360 * cat.direction] } : {}}
                            transition={{ duration: cat.duration, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: `${sx}px ${sy}px` }}
                          >
                            <text
                              x={sx} y={sy + 1}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill={`rgba(${strokeColor},${isActive ? 0.9 : 0.5})`}
                              fontSize="6"
                              fontFamily="'Plus Jakarta Sans', sans-serif"
                              style={{ transition: "fill 0.3s" }}
                            >
                              {skill}
                            </text>
                          </motion.g>
                        </g>
                      )
                    })}
                  </motion.g>

                  {/* Category label on the ring */}
                  <motion.text
                    x={center + cat.orbitRadius + 8}
                    y={center - 4}
                    fill={`rgba(${strokeColor},${isActive ? 0.7 : 0.25})`}
                    fontSize="7"
                    fontFamily="Georgia, serif"
                    letterSpacing="1"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + catIdx * 0.15 }}
                    style={{ transition: "fill 0.3s" }}
                  >
                    {cat.title.toUpperCase()}
                  </motion.text>
                </g>
              )
            })}

            {/* Center mandala */}
            <motion.g
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              style={{ transformOrigin: `${center}px ${center}px` }}
            >
              <circle cx={center} cy={center} r="30" fill="rgba(13,26,26,0.95)" stroke="rgba(201,169,98,0.2)" strokeWidth="0.5" />
              <circle cx={center} cy={center} r="22" stroke="rgba(201,169,98,0.1)" strokeWidth="0.3" strokeDasharray="2 4" fill="none" />
              <circle cx={center} cy={center} r="8" fill="rgba(201,169,98,0.15)" stroke="rgba(201,169,98,0.2)" strokeWidth="0.3" />
              <circle cx={center} cy={center} r="3" fill="rgba(69,160,150,0.6)" />
              {/* Rotating inner star */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: `${center}px ${center}px` }}
              >
                {[0, 60, 120, 180, 240, 300].map((a) => {
                  const rad = (a * Math.PI) / 180
                  return (
                    <line
                      key={a}
                      x1={center + 8 * Math.cos(rad)} y1={center + 8 * Math.sin(rad)}
                      x2={center + 14 * Math.cos(rad)} y2={center + 14 * Math.sin(rad)}
                      stroke="rgba(201,169,98,0.15)" strokeWidth="0.3"
                    />
                  )
                })}
              </motion.g>
            </motion.g>
          </svg>

          {/* Hover instruction */}
          <motion.p
            className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/40 font-serif italic"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            hover to pause orbits
          </motion.p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {skillCategories.map((cat, i) => (
            <motion.button
              key={cat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 + i * 0.1 }}
              onMouseEnter={() => { setHoveredOrbit(i); setPaused(true) }}
              onMouseLeave={() => { setHoveredOrbit(null); setPaused(false) }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-serif transition-all duration-300 ${hoveredOrbit === i
                ? cat.color === "primary"
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-accent/50 bg-accent/10 text-accent"
                : "border-border/30 text-muted-foreground"
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${cat.color === "primary" ? "bg-primary" : "bg-accent"}`} />
              {cat.title}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
