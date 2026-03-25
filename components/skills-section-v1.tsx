"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { SectionTitle } from "./section-title"

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "primary" as const,
    mastery: 92,
    icon: "◇",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "GraphQL", "REST APIs", "Microservices"],
    color: "accent" as const,
    mastery: 87,
    icon: "◈",
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
    color: "primary" as const,
    mastery: 85,
    icon: "◆",
  },
  {
    title: "Tools & AI",
    skills: ["Git", "Docker", "AWS", "OpenAI", "LangChain"],
    color: "accent" as const,
    mastery: 80,
    icon: "✦",
  },
]

function ArcGauge({ mastery, color, isHovered, isInView }: { mastery: number; color: "primary" | "accent"; isHovered: boolean; isInView: boolean }) {
  const radius = 50
  const circumference = Math.PI * radius // semicircle
  const strokeDashoffset = circumference - (mastery / 100) * circumference

  const primaryColor = color === "primary" ? "rgba(69,160,150," : "rgba(201,169,98,"
  const glowColor = color === "primary" ? "rgba(69,160,150,0.4)" : "rgba(201,169,98,0.4)"

  return (
    <div className="relative w-full flex justify-center -mb-4">
      <svg width="140" height="75" viewBox="0 0 120 65" className="overflow-visible">
        {/* Background arc */}
        <path
          d="M10,60 A50,50 0 0,1 110,60"
          fill="none"
          stroke={`${primaryColor}0.1)`}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <motion.path
          d="M10,60 A50,50 0 0,1 110,60"
          fill="none"
          stroke={`${primaryColor}${isHovered ? "0.8)" : "0.4)"}`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />
        {/* Glow effect on hover */}
        {isHovered && (
          <motion.path
            d="M10,60 A50,50 0 0,1 110,60"
            fill="none"
            stroke={glowColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ filter: "blur(4px)" }}
          />
        )}
        {/* Mastery percentage */}
        <motion.text
          x="60"
          y="52"
          textAnchor="middle"
          className="fill-foreground font-serif"
          fontSize="18"
          fontWeight="300"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {mastery}%
        </motion.text>
        <motion.text
          x="60"
          y="64"
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize="7"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.7, duration: 0.5 }}
        >
          MASTERY
        </motion.text>
        {/* Endpoint dots */}
        <motion.circle
          cx="10" cy="60" r="2"
          fill={`${primaryColor}0.4)`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        />
        <motion.circle
          cx="110" cy="60" r="2"
          fill={`${primaryColor}0.4)`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        />
      </svg>
    </div>
  )
}

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="relative max-w-6xl mx-auto">
        <SectionTitle subtitle="Expertise" title="Crafting the" highlight="Digital Universe" isInView={isInView} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.15 }}
              onMouseEnter={() => setHoveredCategory(categoryIndex)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`relative p-6 lg:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border transition-all duration-500 ${hoveredCategory === categoryIndex
                ? "border-primary/50 shadow-lg shadow-primary/10 -translate-y-1"
                : "border-border/50"
                }`}
            >
              {/* Arc Gauge */}
              <ArcGauge
                mastery={category.mastery}
                color={category.color}
                isHovered={hoveredCategory === categoryIndex}
                isInView={isInView}
              />

              {/* Category Header */}
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className={`text-lg ${category.color === "primary" ? "text-primary" : "text-accent"}`}>
                  {category.icon}
                </span>
                <h3 className="font-serif text-xl lg:text-2xl font-light text-foreground">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap justify-center gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.6 + categoryIndex * 0.15 + skillIndex * 0.05,
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${hoveredCategory === categoryIndex
                      ? category.color === "primary"
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-accent/20 text-accent border border-accent/30"
                      : "bg-muted/50 text-muted-foreground border border-transparent"
                      }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Bottom accent line */}
              <motion.div
                className={`absolute bottom-0 left-6 right-6 h-px ${category.color === "primary" ? "bg-primary/30" : "bg-accent/30"}`}
                initial={{ scaleX: 0 }}
                animate={hoveredCategory === categoryIndex ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
