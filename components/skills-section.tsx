"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { SectionTitle } from "./section-title"

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "primary",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "GraphQL", "REST APIs", "Microservices"],
    color: "accent",
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
    color: "primary",
  },
  {
    title: "Tools & AI",
    skills: ["Git", "Docker", "AWS", "OpenAI", "LangChain"],
    color: "accent",
  },
]

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="relative max-w-6xl mx-auto">
        <SectionTitle subtitle="Expertise" title="Crafting the" highlight="Digital Universe" isInView={isInView} />

        {/* Center Element */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 w-40 h-40 mx-auto mb-16 rounded-full bg-linear-to-br from-primary/20 to-accent/10 border border-primary/30 flex items-center justify-center"
        >
          <div className="text-center">
            <span className="font-serif text-3xl font-light text-foreground">अनंत</span>
            <p className="text-xs text-muted-foreground mt-2 tracking-wider">INFINITE</p>
          </div>

          {/* Orbiting Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute -inset-4 rounded-full border border-dashed border-primary/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + categoryIndex * 0.15 }}
              onMouseEnter={() => setHoveredCategory(categoryIndex)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`relative p-6 lg:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border transition-all duration-500 ${hoveredCategory === categoryIndex
                ? "border-primary/50 shadow-lg shadow-primary/10 -translate-y-1"
                : "border-border/50"
                }`}
            >
              {/* Category Title */}
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  className={`w-3 h-3 rounded-full ${category.color === "primary" ? "bg-primary" : "bg-accent"}`}
                  animate={hoveredCategory === categoryIndex ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
                <h3 className="font-serif text-xl lg:text-2xl font-light text-foreground">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
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

              {/* Decorative Line */}
              <motion.div
                className={`absolute bottom-0 left-6 right-6 h-px ${category.color === "primary" ? "bg-primary/30" : "bg-accent/30"
                  }`}
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
