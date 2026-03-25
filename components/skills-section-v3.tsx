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

// Pre-computed star positions for each skill in a constellation layout
// 4 clusters arranged in quadrants, connected by lines
const clusterPositions = [
  // Frontend (top-left quadrant)
  { cx: 18, cy: 25 }, { cx: 28, cy: 15 }, { cx: 12, cy: 38 }, { cx: 32, cy: 32 }, { cx: 22, cy: 45 },
  // Backend (top-right quadrant)
  { cx: 72, cy: 18 }, { cx: 82, cy: 28 }, { cx: 68, cy: 35 }, { cx: 78, cy: 42 }, { cx: 88, cy: 15 },
  // Databases (bottom-left quadrant)  
  { cx: 15, cy: 65 }, { cx: 25, cy: 72 }, { cx: 10, cy: 78 }, { cx: 30, cy: 82 }, { cx: 20, cy: 55 },
  // Tools & AI (bottom-right quadrant)
  { cx: 75, cy: 62 }, { cx: 85, cy: 70 }, { cx: 70, cy: 78 }, { cx: 80, cy: 85 }, { cx: 90, cy: 58 },
]

// Intra-cluster connections (within each category)
const intraConnections = [
  // Frontend
  [0,1], [0,2], [1,3], [2,4], [3,4],
  // Backend  
  [5,6], [5,7], [6,8], [7,8], [5,9],
  // Databases
  [10,11], [10,14], [11,12], [12,13], [11,13],
  // Tools & AI
  [15,16], [15,19], [16,17], [17,18], [16,18],
]

// Inter-cluster connections (between categories — the bridges)
const interConnections = [
  [3,7], [4,14], [8,19], [13,17],
]

function getCategoryIndex(starIndex: number) {
  if (starIndex < 5) return 0
  if (starIndex < 10) return 1
  if (starIndex < 15) return 2
  return 3
}

function getSkillName(starIndex: number) {
  const catIdx = getCategoryIndex(starIndex)
  const skillIdx = starIndex - catIdx * 5
  return skillCategories[catIdx].skills[skillIdx]
}

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const [hoveredCluster, setHoveredCluster] = useState<number | null>(null)

  const hoveredCatIdx = hoveredStar !== null ? getCategoryIndex(hoveredStar) : hoveredCluster

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="relative max-w-6xl mx-auto">
        <SectionTitle subtitle="Expertise" title="Crafting the" highlight="Digital Universe" isInView={isInView} />

        {/* Category Legend */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {skillCategories.map((cat, i) => (
            <button
              key={cat.title}
              onMouseEnter={() => setHoveredCluster(i)}
              onMouseLeave={() => setHoveredCluster(null)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${hoveredCatIdx === i
                ? cat.color === "primary"
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-accent/50 bg-accent/10 text-accent"
                : "border-border/30 text-muted-foreground hover:text-foreground"
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${cat.color === "primary" ? "bg-primary" : "bg-accent"}`} />
              <span className="text-sm font-serif">{cat.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Constellation Canvas */}
        <motion.div
          className="relative w-full aspect-[16/10] md:aspect-[2/1] mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Inter-cluster connections (dimmer) */}
            {interConnections.map(([a, b], i) => (
              <motion.line
                key={`inter-${i}`}
                x1={clusterPositions[a].cx} y1={clusterPositions[a].cy}
                x2={clusterPositions[b].cx} y2={clusterPositions[b].cy}
                stroke="rgba(201,169,98,0.06)"
                strokeWidth="0.15"
                strokeDasharray="0.5 1"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 1.5 + i * 0.2 }}
              />
            ))}

            {/* Intra-cluster connections */}
            {intraConnections.map(([a, b], i) => {
              const catIdx = getCategoryIndex(a)
              const isHighlighted = hoveredCatIdx === catIdx
              const isPrimary = skillCategories[catIdx].color === "primary"
              const color = isPrimary ? "69,160,150" : "201,169,98"

              return (
                <motion.line
                  key={`intra-${i}`}
                  x1={clusterPositions[a].cx} y1={clusterPositions[a].cy}
                  x2={clusterPositions[b].cx} y2={clusterPositions[b].cy}
                  stroke={`rgba(${color},${isHighlighted ? 0.3 : 0.1})`}
                  strokeWidth={isHighlighted ? "0.3" : "0.15"}
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.8 + i * 0.06 }}
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                />
              )
            })}

            {/* Star dots */}
            {clusterPositions.map((pos, i) => {
              const catIdx = getCategoryIndex(i)
              const isHighlighted = hoveredCatIdx === catIdx
              const isThisStar = hoveredStar === i
              const isPrimary = skillCategories[catIdx].color === "primary"
              const color = isPrimary ? "69,160,150" : "201,169,98"

              return (
                <g key={`star-${i}`}>
                  {/* Glow on hover */}
                  {isThisStar && (
                    <motion.circle
                      cx={pos.cx} cy={pos.cy} r="3"
                      fill={`rgba(${color},0.15)`}
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  {/* Star */}
                  <motion.circle
                    cx={pos.cx} cy={pos.cy}
                    r={isThisStar ? "1" : isHighlighted ? "0.7" : "0.5"}
                    fill={`rgba(${color},${isHighlighted ? 0.7 : 0.3})`}
                    className="cursor-pointer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.04 }}
                    onMouseEnter={() => setHoveredStar(i)}
                    onMouseLeave={() => setHoveredStar(null)}
                    style={{ transition: "r 0.3s, fill 0.3s" }}
                  />

                  {/* Skill label */}
                  {isThisStar && (
                    <motion.g
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <rect
                        x={pos.cx - 6} y={pos.cy - 4}
                        width="12" height="3"
                        rx="0.5"
                        fill="rgba(13,26,26,0.9)"
                        stroke={`rgba(${color},0.3)`}
                        strokeWidth="0.15"
                      />
                      <text
                        x={pos.cx} y={pos.cy - 2}
                        textAnchor="middle"
                        fill={`rgba(${color},0.9)`}
                        fontSize="1.4"
                        fontFamily="Georgia, serif"
                      >
                        {getSkillName(i)}
                      </text>
                    </motion.g>
                  )}
                </g>
              )
            })}
          </svg>
        </motion.div>

        {/* Skills list below the constellation (for mobile / accessibility) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5 + catIdx * 0.1 }}
              onMouseEnter={() => setHoveredCluster(catIdx)}
              onMouseLeave={() => setHoveredCluster(null)}
              className={`p-4 rounded-xl border transition-all duration-300 ${hoveredCatIdx === catIdx
                ? category.color === "primary"
                  ? "border-primary/40 bg-primary/5"
                  : "border-accent/40 bg-accent/5"
                : "border-border/20 bg-card/30"
                }`}
            >
              <h4 className="font-serif text-sm text-foreground mb-2">{category.title}</h4>
              <div className="flex flex-wrap gap-1">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`text-xs px-2 py-0.5 rounded-full transition-colors duration-300 ${hoveredCatIdx === catIdx
                      ? category.color === "primary"
                        ? "text-primary bg-primary/10"
                        : "text-accent bg-accent/10"
                      : "text-muted-foreground"
                      }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
