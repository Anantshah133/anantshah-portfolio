"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { SectionTitle } from "./section-title"

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "primary" as const,
    angle: 0,
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "GraphQL", "REST APIs", "Microservices"],
    color: "accent" as const,
    angle: 90,
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
    color: "primary" as const,
    angle: 180,
  },
  {
    title: "Tools & AI",
    skills: ["Git", "Docker", "AWS", "OpenAI", "LangChain"],
    color: "accent" as const,
    angle: 270,
  },
]

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  const centerX = 200
  const centerY = 200
  const ringRadii = [55, 85, 115, 145, 175]

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="relative max-w-6xl mx-auto">
        <SectionTitle subtitle="Expertise" title="Crafting the" highlight="Digital Universe" isInView={isInView} />

        {/* Yantra Mandala */}
        <div className="relative w-full max-w-[600px] mx-auto aspect-square mb-12">
          <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
            {/* Concentric rings */}
            {ringRadii.map((r, i) => (
              <motion.circle
                key={`ring-${i}`}
                cx={centerX} cy={centerY} r={r}
                stroke="rgba(201,169,98,0.08)"
                strokeWidth="0.5"
                strokeDasharray={i % 2 === 0 ? "none" : "3 6"}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                style={{ transformOrigin: `${centerX}px ${centerY}px` }}
              />
            ))}

            {/* Cross axis lines */}
            {[0, 45, 90, 135].map((angle) => {
              const rad = (angle * Math.PI) / 180
              return (
                <motion.line
                  key={`axis-${angle}`}
                  x1={centerX - 175 * Math.cos(rad)} y1={centerY - 175 * Math.sin(rad)}
                  x2={centerX + 175 * Math.cos(rad)} y2={centerY + 175 * Math.sin(rad)}
                  stroke="rgba(201,169,98,0.04)"
                  strokeWidth="0.3"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              )
            })}

            {/* Center mandala */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ transformOrigin: `${centerX}px ${centerY}px` }}
            >
              <circle cx={centerX} cy={centerY} r="20" fill="rgba(13,26,26,0.9)" stroke="rgba(201,169,98,0.2)" strokeWidth="0.5" />
              <circle cx={centerX} cy={centerY} r="14" stroke="rgba(201,169,98,0.1)" strokeWidth="0.3" fill="none" />
              <circle cx={centerX} cy={centerY} r="4" fill="rgba(201,169,98,0.3)" />
              <circle cx={centerX} cy={centerY} r="2" fill="rgba(69,160,150,0.5)" />
            </motion.g>

            {/* Category quadrants with skills on rings */}
            {skillCategories.map((category, catIdx) => {
              const isActive = activeCategory === catIdx
              const baseAngle = category.angle
              const isPrimary = category.color === "primary"
              const dotColor = isPrimary ? "69,160,150" : "201,169,98"
              const spreadAngle = 18

              return (
                <g key={category.title}>
                  {/* Category label arc */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + catIdx * 0.15 }}
                    onMouseEnter={() => setActiveCategory(catIdx)}
                    onMouseLeave={() => setActiveCategory(null)}
                    className="cursor-pointer"
                  >
                    {/* Category title at outermost ring */}
                    {(() => {
                      const titleAngle = ((baseAngle + 45) * Math.PI) / 180
                      const titleR = 185
                      const tx = centerX + titleR * Math.cos(titleAngle)
                      const ty = centerY + titleR * Math.sin(titleAngle)
                      return (
                        <text
                          x={tx} y={ty}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill={isActive ? `rgba(${dotColor},0.9)` : `rgba(${dotColor},0.4)`}
                          fontSize="8"
                          fontFamily="Georgia, serif"
                          letterSpacing="1.5"
                          style={{ transition: "fill 0.3s" }}
                        >
                          {category.title.toUpperCase()}
                        </text>
                      )
                    })()}

                    {/* Skill dots distributed across rings */}
                    {category.skills.map((skill, skillIdx) => {
                      const ring = ringRadii[skillIdx]
                      const angleOffset = baseAngle + 22.5 + (skillIdx - 2) * spreadAngle
                      const rad = (angleOffset * Math.PI) / 180
                      const sx = centerX + ring * Math.cos(rad)
                      const sy = centerY + ring * Math.sin(rad)

                      return (
                        <g key={skill}>
                          {/* Glow on active */}
                          {isActive && (
                            <motion.circle
                              cx={sx} cy={sy} r="8"
                              fill={`rgba(${dotColor},0.08)`}
                              initial={{ scale: 0 }}
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: skillIdx * 0.2 }}
                            />
                          )}
                          {/* Dot */}
                          <motion.circle
                            cx={sx} cy={sy}
                            r={isActive ? "4" : "3"}
                            fill={`rgba(${dotColor},${isActive ? 0.6 : 0.2})`}
                            stroke={`rgba(${dotColor},${isActive ? 0.4 : 0.1})`}
                            strokeWidth="0.5"
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ duration: 0.4, delay: 0.6 + catIdx * 0.1 + skillIdx * 0.05 }}
                            style={{ transition: "r 0.3s, fill 0.3s" }}
                          />
                          {/* Skill label */}
                          <motion.text
                            x={sx} y={sy + (isActive ? 10 : 8)}
                            textAnchor="middle"
                            fill={`rgba(${dotColor},${isActive ? 0.9 : 0.35})`}
                            fontSize={isActive ? "5.5" : "4.5"}
                            fontFamily="'Plus Jakarta Sans', sans-serif"
                            style={{ transition: "fill 0.3s, font-size 0.3s" }}
                          >
                            {skill}
                          </motion.text>
                        </g>
                      )
                    })}
                  </motion.g>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Category buttons below */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {skillCategories.map((cat, i) => (
            <motion.button
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 + i * 0.1 }}
              onMouseEnter={() => setActiveCategory(i)}
              onMouseLeave={() => setActiveCategory(null)}
              className={`px-5 py-2.5 rounded-full border font-serif text-sm transition-all duration-300 ${activeCategory === i
                ? cat.color === "primary"
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-accent/50 bg-accent/10 text-accent"
                : "border-border/30 text-muted-foreground hover:text-foreground"
                }`}
            >
              {cat.title}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
