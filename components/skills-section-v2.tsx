"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { SectionTitle } from "./section-title"

const skillCategories = [
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "Javascript", "React", "Next.js (Learning)", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
    color: "primary" as const,
    seal: "✦",
    verse: "शिल्प - The Art of Interface",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "PHP", "REST APIs", "GraphQL", "Python (Basics)"],
    color: "accent" as const,
    seal: "✦",
    verse: "तंत्र - The Architecture Within",
  },
  {
    title: "Databases",
    skills: ["MongoDB", "MySQL (Basics)", "PostgreSQL (Learning)", "Prisma", "Supabase", "Firebase"],
    color: "primary" as const,
    seal: "✦",
    verse: "ज्ञान - The Keeper of Knowledge",
  },
  {
    title: "Tools, AI & Others",
    skills: ["Git", "GitHub", "Vercel", "AWS", "OpenAI API", "AI Tools", "Problem Solving"],
    color: "accent" as const,
    seal: "✦",
    verse: "यंत्र - The Instruments of Power",
  },
]

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
          {skillCategories.map((category, categoryIndex) => {
            const isHovered = hoveredCategory === categoryIndex
            const isPrimary = category.color === "primary"

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.15 }}
                onMouseEnter={() => setHoveredCategory(categoryIndex)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`relative group rounded-2xl overflow-hidden transition-all duration-500 ${isHovered ? "-translate-y-1" : ""}`}
              >
                {/* Parchment background */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: isHovered
                      ? "linear-gradient(160deg, rgba(18,36,36,0.95) 0%, rgba(26,46,46,0.9) 40%, rgba(18,36,36,0.95) 100%)"
                      : "linear-gradient(160deg, rgba(18,36,36,0.7) 0%, rgba(22,40,40,0.6) 100%)",
                  }}
                />

                {/* Torn edge masks using CSS */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/15 to-transparent" />

                {/* Border */}
                <div className={`absolute inset-0 rounded-2xl border transition-all duration-500 ${isHovered ? "border-accent/30" : "border-border/30"}`} />

                {/* Ancient corner marks */}
                <div className="absolute top-3 left-3 w-4 h-4 opacity-20">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M0,8 Q0,0 8,0" stroke="rgba(201,169,98,0.6)" strokeWidth="0.5" /></svg>
                </div>
                <div className="absolute top-3 right-3 w-4 h-4 opacity-20 rotate-90">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M0,8 Q0,0 8,0" stroke="rgba(201,169,98,0.6)" strokeWidth="0.5" /></svg>
                </div>
                <div className="absolute bottom-3 left-3 w-4 h-4 opacity-20 -rotate-90">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M0,8 Q0,0 8,0" stroke="rgba(201,169,98,0.6)" strokeWidth="0.5" /></svg>
                </div>
                <div className="absolute bottom-3 right-3 w-4 h-4 opacity-20 rotate-180">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M0,8 Q0,0 8,0" stroke="rgba(201,169,98,0.6)" strokeWidth="0.5" /></svg>
                </div>

                <div className="relative p-6 lg:p-8">
                  {/* Wax Seal + Title */}
                  <div className="flex items-center gap-4 mb-2">
                    <motion.div
                      className={`relative w-12 h-12 rounded-full flex items-center justify-center ${isPrimary
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-accent/10 border border-accent/30"
                        }`}
                      animate={isHovered ? { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                    >
                      {/* Seal ring */}
                      <div className={`absolute inset-0.5 rounded-full border border-dashed ${isPrimary ? "border-primary/20" : "border-accent/20"}`} />
                      <span className={`text-xl ${isPrimary ? "text-primary" : "text-accent"}`}>
                        {category.seal}
                      </span>
                    </motion.div>

                    <div>
                      <h3 className="font-serif text-xl lg:text-2xl font-light text-foreground">{category.title}</h3>
                      <motion.p
                        className="text-xs text-accent/40 font-serif italic"
                        initial={{ opacity: 0 }}
                        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {category.verse}
                      </motion.p>
                    </div>
                  </div>

                  {/* Divider line */}
                  <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />
                    <div className={`w-1.5 h-1.5 rounded-full ${isPrimary ? "bg-primary/30" : "bg-accent/30"}`} />
                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />
                  </div>

                  {/* Skills with quill-reveal effect */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: 0.5 + categoryIndex * 0.15 + skillIndex * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isHovered
                          ? isPrimary
                            ? "bg-primary/15 text-primary border border-primary/25"
                            : "bg-accent/15 text-accent border border-accent/25"
                          : "bg-muted/30 text-muted-foreground border border-border/20"
                          }`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Bottom ornamental line */}
                  <motion.div
                    className="mt-6 flex items-center gap-2 justify-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + categoryIndex * 0.15 }}
                  >
                    <div className="w-6 h-px bg-linear-to-r from-transparent to-accent/20" />
                    <div className="w-1 h-1 rounded-full bg-accent/15" />
                    <div className="w-6 h-px bg-gradient-to-l from-transparent to-accent/20" />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
