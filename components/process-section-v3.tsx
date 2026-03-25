"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { SectionTitle } from "./section-title"

const processSteps = [
  {
    number: "01",
    title: "Listen",
    sanskrit: "श्रवण",
    description: "Understanding your vision, constraints, and the story you want to tell.",
  },
  {
    number: "02",
    title: "Distill",
    sanskrit: "सार",
    description: "Stripping away noise to find the essential elements that matter.",
  },
  {
    number: "03",
    title: "Shape",
    sanskrit: "रूप",
    description: "Crafting interfaces that feel natural, intuitive, and purposeful.",
  },
  {
    number: "04",
    title: "Refine",
    sanskrit: "शुद्धि",
    description: "Iterating with precision until every detail resonates.",
  },
  {
    number: "05",
    title: "Evolve",
    sanskrit: "विकास",
    description: "Continuous improvement beyond completion, adapting and growing with every iteration.",
  },
]

export function ProcessSectionV3() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <section id="process" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      <div ref={containerRef} className="relative max-w-7xl mx-auto z-10 w-full h-[800px] lg:h-[600px] flex flex-col">
        <SectionTitle subtitle="Process" title="Ancient Stone" highlight="Pillars" isInView={isInView} />

        {/* Pillars Container */}
        <div className="flex-1 mt-16 flex flex-col lg:flex-row gap-4 h-full">
          {processSteps.map((step, index) => {
            const isHovered = hoveredStep === index
            const isDimmed = hoveredStep !== null && hoveredStep !== index

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.15, ease: "easeOut" }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                className={`relative group cursor-pointer overflow-hidden rounded-t-full rounded-b-xl border transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-center justify-between py-12 px-4 shadow-2xl ${
                  isHovered 
                    ? "lg:flex-3 flex-3 border-accent/40 bg-accent/5 backdrop-blur-md" 
                    : "lg:flex-1 flex-1 border-muted bg-background/50"
                } ${isDimmed ? "opacity-40 grayscale" : "opacity-100 grayscale-0"}`}
                style={{
                  background: isHovered
                    ? "linear-gradient(180deg, rgba(201,169,98,0.08) 0%, rgba(13,26,26,0.95) 100%)"
                    : "linear-gradient(180deg, rgba(13,26,26,0.8) 0%, rgba(13,26,26,0.95) 100%)",
                }}
              >
                {/* Top Temple Cap SVG */}
                <div className="w-full flex justify-center mb-8 shrink-0">
                  <svg viewBox="0 0 60 40" className={`w-16 h-12 transition-colors duration-500 ${isHovered ? 'text-accent' : 'text-accent/30'}`} fill="none" stroke="currentColor">
                    <path d="M10,40 L10,20 C10,10 20,5 30,5 C40,5 50,10 50,20 L50,40" strokeWidth="1" />
                    <line x1="0" y1="40" x2="60" y2="40" strokeWidth="1.5" />
                    <line x1="5" y1="35" x2="55" y2="35" strokeWidth="0.5" />
                    <circle cx="30" cy="20" r="4" fill="currentColor" opacity="0.5" />
                  </svg>
                </div>

                {/* Giant Faded Sanskrit Background Letter */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
                  <span className={`font-serif text-[15rem] leading-none transition-all duration-1000 ${isHovered ? 'text-accent/10 scale-110' : 'text-accent/5 scale-100'}`}>
                    {step.sanskrit.charAt(0)}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center flex-1 w-full justify-center min-h-[120px]">
                  <div className={`transition-all duration-500 flex flex-col items-center w-full min-w-[200px]`}>
                    <span className="font-serif text-accent/50 text-xl mb-4">{step.number}</span>
                    <h3 className={`font-serif text-3xl mb-2 text-foreground transition-all duration-500 whitespace-nowrap ${isHovered ? 'lg:rotate-0' : 'lg:-rotate-90'}`}>
                      {step.title}
                    </h3>
                    
                    {/* Collapsed view content */}
                    <motion.div
                      animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                      className="overflow-hidden flex flex-col items-center text-center"
                    >
                      <span className="text-accent tracking-[0.3em] text-sm uppercase mb-4">{step.sanskrit}</span>
                      <p className="text-muted-foreground/90 max-w-[220px] text-sm leading-relaxed px-4">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Bottom Base SVG */}
                <div className="w-full flex justify-center mt-8 shrink-0">
                  <svg viewBox="0 0 60 20" className={`w-16 h-6 transition-colors duration-500 ${isHovered ? 'text-accent' : 'text-accent/30'}`} fill="none" stroke="currentColor">
                    <line x1="0" y1="0" x2="60" y2="0" strokeWidth="1.5" />
                    <line x1="5" y1="5" x2="55" y2="5" strokeWidth="0.5" />
                    <path d="M15,0 L15,15 L45,15 L45,0" strokeWidth="1" />
                  </svg>
                </div>

                {/* Glowing Embers underneath hovered pillar */}
                {isHovered && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-accent/20 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[0, 1, 2, 3, 4].map(i => (
                      <motion.div
                        key={`ember-${i}`}
                        className="absolute bottom-0 w-1 h-1 bg-accent rounded-full"
                        style={{ left: `${20 + Math.random() * 60}%` }}
                        animate={{ 
                          y: [0, -40 - Math.random() * 40],
                          x: [0, (Math.random() - 0.5) * 20],
                          opacity: [0, 0.8, 0]
                        }}
                        transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
