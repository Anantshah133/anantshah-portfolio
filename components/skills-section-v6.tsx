"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { SectionTitle } from "./section-title"

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "primary" as const,
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "GraphQL", "REST APIs", "Microservices"],
    color: "accent" as const,
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
    color: "primary" as const,
  },
  {
    title: "Tools & AI",
    skills: ["Git", "Docker", "AWS", "OpenAI", "LangChain"],
    color: "accent" as const,
  },
]

// Hex dimensions
const HEX_SIZE = 52
const HEX_GAP = 6
const hexWidth = HEX_SIZE * 2
const hexHeight = Math.sqrt(3) * HEX_SIZE

function hexPoints(cx: number, cy: number, size: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`
  }).join(" ")
}

// Layout: 4 clusters in a 2x2 grid, each cluster is a hex group
// Each cluster has 1 center (title) + 5 surrounding hexes (skills)
function getClusterCenter(clusterIdx: number): [number, number] {
  const col = clusterIdx % 2
  const row = Math.floor(clusterIdx / 2)
  const clusterW = (hexWidth + HEX_GAP) * 2.2
  const clusterH = (hexHeight + HEX_GAP) * 2.2
  const offsetX = 200
  const offsetY = 140
  return [offsetX + col * clusterW, offsetY + row * clusterH]
}

function getSkillHexPos(cx: number, cy: number, skillIdx: number): [number, number] {
  // Place 5 skills around the category center
  const positions: [number, number][] = [
    [cx, cy - hexHeight - HEX_GAP],                          // top
    [cx + (hexWidth * 0.75 + HEX_GAP), cy - (hexHeight / 2 + HEX_GAP / 2)], // top-right
    [cx + (hexWidth * 0.75 + HEX_GAP), cy + (hexHeight / 2 + HEX_GAP / 2)], // bottom-right
    [cx, cy + hexHeight + HEX_GAP],                          // bottom
    [cx - (hexWidth * 0.75 + HEX_GAP), cy + (hexHeight / 2 + HEX_GAP / 2)], // bottom-left
  ]
  return positions[skillIdx] || [cx, cy]
}

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="relative max-w-6xl mx-auto">
        <SectionTitle subtitle="Expertise" title="Crafting the" highlight="Digital Universe" isInView={isInView} />

        {/* Hexagonal Grid */}
        <div className="relative w-full max-w-[750px] mx-auto overflow-visible">
          <svg viewBox="0 0 750 550" className="w-full h-auto overflow-visible" fill="none">
            {skillCategories.map((category, catIdx) => {
              const [cx, cy] = getClusterCenter(catIdx)
              const isClusterActive = hoveredCategory === catIdx
              const isPrimary = category.color === "primary"
              const colorRGB = isPrimary ? "69,160,150" : "201,169,98"

              return (
                <g key={category.title}>
                  {/* Connecting lines from center to skill hexes */}
                  {category.skills.map((skill, skillIdx) => {
                    const [sx, sy] = getSkillHexPos(cx, cy, skillIdx)
                    return (
                      <motion.line
                        key={`conn-${skill}`}
                        x1={cx} y1={cy} x2={sx} y2={sy}
                        stroke={`rgba(${colorRGB},${isClusterActive ? 0.15 : 0.05})`}
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 + catIdx * 0.1 + skillIdx * 0.05 }}
                        style={{ transition: "stroke 0.3s" }}
                      />
                    )
                  })}

                  {/* Center hex (category title) */}
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + catIdx * 0.15, type: "spring" }}
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                    onMouseEnter={() => setHoveredCategory(catIdx)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className="cursor-pointer"
                  >
                    <polygon
                      points={hexPoints(cx, cy, HEX_SIZE)}
                      fill={isClusterActive ? `rgba(${colorRGB},0.12)` : "rgba(13,26,26,0.8)"}
                      stroke={`rgba(${colorRGB},${isClusterActive ? 0.5 : 0.2})`}
                      strokeWidth={isClusterActive ? "1.5" : "0.8"}
                      style={{ transition: "fill 0.3s, stroke 0.3s, stroke-width 0.3s" }}
                    />
                    {/* Inner hex border */}
                    <polygon
                      points={hexPoints(cx, cy, HEX_SIZE - 6)}
                      fill="none"
                      stroke={`rgba(${colorRGB},${isClusterActive ? 0.2 : 0.06})`}
                      strokeWidth="0.3"
                      strokeDasharray="3 5"
                      style={{ transition: "stroke 0.3s" }}
                    />
                    <text
                      x={cx} y={cy - 2}
                      textAnchor="middle" dominantBaseline="middle"
                      fill={`rgba(${colorRGB},${isClusterActive ? 0.9 : 0.5})`}
                      fontSize="10"
                      fontFamily="Georgia, serif"
                      letterSpacing="1"
                      style={{ transition: "fill 0.3s" }}
                    >
                      {category.title.toUpperCase()}
                    </text>
                    {/* Small decorative dot */}
                    <circle cx={cx} cy={cy + 14} r="2" fill={`rgba(${colorRGB},${isClusterActive ? 0.4 : 0.15})`} style={{ transition: "fill 0.3s" }} />
                  </motion.g>

                  {/* Skill hexes */}
                  {category.skills.map((skill, skillIdx) => {
                    const [sx, sy] = getSkillHexPos(cx, cy, skillIdx)
                    const isSkillHovered = hoveredSkill === `${catIdx}-${skillIdx}`
                    const isActive = isClusterActive || isSkillHovered

                    return (
                      <motion.g
                        key={skill}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + catIdx * 0.1 + skillIdx * 0.08, type: "spring" }}
                        style={{ transformOrigin: `${sx}px ${sy}px` }}
                        onMouseEnter={() => { setHoveredSkill(`${catIdx}-${skillIdx}`); setHoveredCategory(catIdx) }}
                        onMouseLeave={() => { setHoveredSkill(null); setHoveredCategory(null) }}
                        className="cursor-pointer"
                      >
                        {/* Glow on hover */}
                        {isSkillHovered && (
                          <motion.circle
                            cx={sx} cy={sy} r={HEX_SIZE + 5}
                            fill={`rgba(${colorRGB},0.04)`}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                        <polygon
                          points={hexPoints(sx, sy, HEX_SIZE - 4)}
                          fill={isActive ? `rgba(${colorRGB},0.08)` : "rgba(13,26,26,0.6)"}
                          stroke={`rgba(${colorRGB},${isActive ? 0.35 : 0.1})`}
                          strokeWidth={isActive ? "1" : "0.5"}
                          style={{ transition: "fill 0.3s, stroke 0.3s, stroke-width 0.3s" }}
                        />
                        <text
                          x={sx} y={sy + 1}
                          textAnchor="middle" dominantBaseline="middle"
                          fill={`rgba(${colorRGB},${isActive ? 0.9 : 0.4})`}
                          fontSize="7.5"
                          fontFamily="'Plus Jakarta Sans', sans-serif"
                          style={{ transition: "fill 0.3s" }}
                        >
                          {skill}
                        </text>
                      </motion.g>
                    )
                  })}
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </section>
  )
}
