"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { SectionTitle } from "./section-title"
import { Headphones, Lightbulb, PenTool, Sparkles } from "lucide-react"

const processSteps = [
  {
    number: "01",
    title: "Listen",
    sanskrit: "श्रवण",
    description: "Understanding your vision, constraints, and the story you want to tell.",
    icon: Headphones,
    size: "large", // Bento grid size
  },
  {
    number: "02",
    title: "Distill",
    sanskrit: "सार",
    description: "Stripping away noise to find the essential elements that matter.",
    icon: Lightbulb,
    size: "medium",
  },
  {
    number: "03",
    title: "Shape",
    sanskrit: "रूप",
    description: "Crafting interfaces that feel natural, intuitive, and purposeful.",
    icon: PenTool,
    size: "medium",
  },
  {
    number: "04",
    title: "Refine",
    sanskrit: "शुद्धि",
    description: "Iterating with precision until every detail resonates.",
    icon: Sparkles,
    size: "large",
  },
]

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <section id="process" className="relative py-32 px-6 overflow-hidden">
      {/* Ancient texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(13,26,26,0.4)_100%)]" />

      {/* Decorative corner ornaments */}
      <div className="absolute top-8 left-8 w-16 h-16 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-accent">
          <path d="M0,50 Q0,0 50,0 M50,0 Q100,0 100,50" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="0" r="3" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute top-8 right-8 w-16 h-16 opacity-10 rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full text-accent">
          <path d="M0,50 Q0,0 50,0 M50,0 Q100,0 100,50" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="0" r="3" fill="currentColor" />
        </svg>
      </div>

      <div ref={containerRef} className="relative max-w-6xl mx-auto">
        <SectionTitle subtitle="Process" title="How I" highlight="Work" isInView={isInView} />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mt-16">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            const isHovered = hoveredStep === index
            const isLarge = step.size === "large"

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                className={`relative group cursor-pointer ${isLarge ? "lg:col-span-2 lg:row-span-1" : "lg:col-span-1"}`}
              >
                <motion.div
                  className="relative h-full min-h-[280px] lg:min-h-[320px] p-6 lg:p-8 rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(18,36,36,0.9) 0%, rgba(13,26,26,0.95) 100%)",
                  }}
                  animate={{
                    y: isHovered ? -8 : 0,
                    scale: isHovered ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl border border-border/30 group-hover:border-accent/40 transition-colors duration-500" />

                  {/* Glowing border on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: "inset 0 0 30px rgba(201,169,98,0.1), 0 0 40px rgba(201,169,98,0.05)",
                    }}
                  />

                  {/* Ancient corner accents */}
                  <motion.div
                    className="absolute top-3 left-3 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    animate={{ rotate: isHovered ? 0 : -90, scale: isHovered ? 1 : 0.5 }}
                  >
                    <svg viewBox="0 0 32 32" className="w-full h-full text-accent/60">
                      <path d="M0,16 Q0,0 16,0" fill="none" stroke="currentColor" strokeWidth="1" />
                      <circle cx="0" cy="16" r="2" fill="currentColor" />
                      <circle cx="16" cy="0" r="2" fill="currentColor" />
                    </svg>
                  </motion.div>
                  <motion.div
                    className="absolute bottom-3 right-3 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-180"
                    animate={{ rotate: isHovered ? 180 : 270, scale: isHovered ? 1 : 0.5 }}
                  >
                    <svg viewBox="0 0 32 32" className="w-full h-full text-accent/60">
                      <path d="M0,16 Q0,0 16,0" fill="none" stroke="currentColor" strokeWidth="1" />
                      <circle cx="0" cy="16" r="2" fill="currentColor" />
                      <circle cx="16" cy="0" r="2" fill="currentColor" />
                    </svg>
                  </motion.div>

                  {/* Step number - ancient numeral style */}
                  <motion.div
                    className="absolute top-4 right-4 font-mono text-6xl lg:text-7xl font-bold text-accent/10 select-none"
                    animate={{
                      opacity: isHovered ? 0.25 : 0.1,
                      scale: isHovered ? 1.1 : 1,
                      y: isHovered ? -5 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Sanskrit character - ancient touch */}
                  <motion.span
                    className="absolute bottom-4 right-4 font-serif text-3xl text-accent/20 select-none"
                    animate={{
                      opacity: isHovered ? 0.4 : 0.2,
                      y: isHovered ? -3 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.sanskrit}
                  </motion.span>

                  {/* Icon with glow effect */}
                  <motion.div
                    className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: isHovered
                        ? "linear-gradient(135deg, rgba(201,169,98,0.15) 0%, rgba(201,169,98,0.05) 100%)"
                        : "rgba(42,64,64,0.5)",
                    }}
                    animate={{
                      boxShadow: isHovered
                        ? "0 0 25px rgba(201,169,98,0.2), inset 0 0 15px rgba(201,169,98,0.1)"
                        : "none",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon
                      className={`w-6 h-6 transition-all duration-400 ${
                        isHovered ? "text-accent" : "text-muted-foreground"
                      }`}
                    />
                    {/* Rotating ring on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border border-accent/30 opacity-0"
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        rotate: isHovered ? 90 : 0,
                        scale: isHovered ? 1.15 : 1,
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="relative">
                    <motion.h3
                      className="font-serif text-2xl lg:text-3xl text-foreground mb-3"
                      animate={{ x: isHovered ? 4 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.title}
                      {/* Underline animation */}
                      <motion.span
                        className="block h-px bg-gradient-to-r from-accent to-transparent mt-2"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        style={{ originX: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      />
                    </motion.h3>
                    <motion.p
                      className="text-muted-foreground leading-relaxed text-sm lg:text-base"
                      animate={{ opacity: isHovered ? 1 : 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.description}
                    </motion.p>
                  </div>

                  {/* Decorative line pattern - ancient manuscript feel */}
                  <div className="absolute bottom-0 left-0 right-0 h-px">
                    <motion.div
                      className="h-full bg-gradient-to-r from-transparent via-accent/40 to-transparent"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: isHovered ? 1 : 0,
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Statement with ancient styling */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center relative"
        >
          {/* Decorative mandala-inspired element */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-16 h-16 opacity-20">
            <svg viewBox="0 0 64 64" className="w-full h-full text-accent">
              <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="32" cy="32" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="32" cy="32" r="3" fill="currentColor" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent/50" />
              <div className="w-16 h-px bg-gradient-to-r from-accent/50 to-transparent" />
            </div>
            <p className="font-serif text-lg md:text-xl text-muted-foreground italic">
              "Good process creates space for great work."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-16 h-px bg-gradient-to-l from-accent/50 to-transparent" />
              <span className="w-2 h-2 rounded-full bg-accent/50" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
