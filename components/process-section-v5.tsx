"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { SectionTitle } from "./section-title"
import { CircleDot, Lightbulb, Hexagon, Sparkles, Infinity as InfinityIcon } from "lucide-react"

const processSteps = [
  {
    number: "01",
    title: "Listen",
    sanskrit: "श्रवण",
    description: "Understanding your vision, constraints, and the story you want to tell.",
    icon: CircleDot,
    size: "medium", // Bento grid size
  },
  {
    number: "02",
    title: "Distill",
    sanskrit: "सार",
    description: "Stripping away noise to find the essential elements that matter.",
    icon: Lightbulb,
    size: "large",
  },
  {
    number: "03",
    title: "Shape",
    sanskrit: "रूप",
    description: "Crafting interfaces that feel natural, intuitive, and purposeful.",
    icon: Hexagon,
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
  {
    number: "05",
    title: "Evolve",
    sanskrit: "विकास",
    description: "Continuous improvement beyond completion, adapting and growing with every iteration.",
    icon: InfinityIcon,
    size: "large",
  },
]

export function ProcessSectionV5() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-[#0d1a1a]">
      {/* Astrolabe Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] pointer-events-none opacity-[0.03]">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_120s_linear_infinite]" fill="none" stroke="currentColor">
          <circle cx="50" cy="50" r="48" strokeWidth="0.1" strokeDasharray="1 2" />
          <circle cx="50" cy="50" r="40" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="30" strokeWidth="0.1" strokeDasharray="4 4" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
            <line key={a} x1="50" y1="2" x2="50" y2="10" transform={`rotate(${a} 50 50)`} strokeWidth="0.2" />
          ))}
        </svg>
      </div>

      <div ref={containerRef} className="relative max-w-6xl mx-auto z-10">
        <SectionTitle subtitle="Process" title="Astrolabe" highlight="Grid" isInView={isInView} />

        {/* Upgraded Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mt-16">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            const isHovered = hoveredStep === index
            const isLarge = step.size === "large"

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.15, ease: "easeOut" }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                className={`group cursor-pointer ${isLarge ? "lg:col-span-2 lg:row-span-1" : "lg:col-span-1"}`}
              >
                <div 
                  className="relative h-full min-h-[280px] p-8 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ease-out border border-transparent"
                  style={{
                    background: isHovered 
                      ? "linear-gradient(135deg, rgba(201,169,98,0.1) 0%, rgba(13,26,26,0.95) 100%)" 
                      : "linear-gradient(135deg, rgba(18,36,36,0.9) 0%, rgba(13,26,26,0.95) 100%)",
                    borderColor: isHovered ? "rgba(201,169,98,0.4)" : "rgba(201,169,98,0.1)"
                  }}
                >
                  {/* Glowing Outline Box SVG mapping on hover */}
                  <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-700 ease-out ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`} fill="none">
                    <rect x="12" y="12" width="calc(100% - 24px)" height="calc(100% - 24px)" stroke="rgba(201,169,98,0.3)" strokeWidth="1" rx="8" strokeDasharray="4 6" />
                    <circle cx="12" cy="12" r="3" fill="rgba(201,169,98,0.5)" />
                    <circle cx="calc(100% - 12px)" cy="12" r="3" fill="rgba(201,169,98,0.5)" />
                    <circle cx="12" cy="calc(100% - 12px)" r="3" fill="rgba(201,169,98,0.5)" />
                    <circle cx="calc(100% - 12px)" cy="calc(100% - 12px)" r="3" fill="rgba(201,169,98,0.5)" />
                  </svg>

                  {/* Giant Faded Sanskrit Background Letter */}
                  <div className="absolute -bottom-10 -right-6 select-none pointer-events-none z-0">
                    <span className={`font-serif text-[12rem] leading-none transition-all duration-1000 ${isHovered ? 'text-accent/10 scale-110 rotate-12' : 'text-accent/5 scale-100 rotate-0'}`}>
                      {step.sanskrit.charAt(0)}
                    </span>
                  </div>

                  {/* Glowing Embers */}
                  {isHovered && (
                    <motion.div 
                      className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
                    >
                      {[0, 1, 2, 3].map(i => (
                        <motion.div
                          key={`ember-${i}`}
                          className="absolute bottom-4 w-1.5 h-1.5 bg-accent rounded-full blur-[1px]"
                          style={{ left: `${20 + Math.random() * 60}%` }}
                          animate={{ 
                            y: [0, -100 - Math.random() * 50],
                            x: [0, (Math.random() - 0.5) * 40],
                            opacity: [0, 0.8, 0]
                          }}
                          transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() * 1.5 }}
                        />
                      ))}
                    </motion.div>
                  )}

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                      <div className={`p-4 rounded-xl transition-all duration-500 ${isHovered ? 'bg-accent/20 text-accent shadow-[0_0_20px_rgba(201,169,98,0.3)]' : 'bg-primary/20 text-muted-foreground'}`}>
                        <Icon className="w-8 h-8" strokeWidth={1.5} />
                      </div>
                      <span className="font-serif text-5xl font-light text-muted-foreground/30">{step.number}</span>
                    </div>

                    <div className="mt-8">
                      <span className="text-accent tracking-[0.3em] text-xs uppercase block mb-3 opacity-80">{step.sanskrit}</span>
                      <h3 className="text-2xl font-serif text-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground/80 leading-relaxed font-light text-sm hidden sm:block">
                        {step.description}
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
