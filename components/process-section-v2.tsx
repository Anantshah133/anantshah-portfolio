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
    iconId: "eye",
  },
  {
    number: "02",
    title: "Distill",
    sanskrit: "सार",
    description: "Stripping away noise to find the essential elements that matter.",
    iconId: "flame",
  },
  {
    number: "03",
    title: "Shape",
    sanskrit: "रूप",
    description: "Crafting interfaces that feel natural, intuitive, and purposeful.",
    iconId: "lotus",
  },
  {
    number: "04",
    title: "Refine",
    sanskrit: "शुद्धि",
    description: "Iterating with precision until every detail resonates.",
    iconId: "diamond",
  },
  {
    number: "05",
    title: "Evolve",
    sanskrit: "विकास",
    description: "Continuous improvement beyond completion, adapting and growing with every iteration.",
    iconId: "infinity",
  },
]

// Sacred Geometry SVGs mapped by iconId
const SacredIcon = ({ id, active }: { id: string, active: boolean }) => {
  const color = active ? "rgba(201,169,98,0.9)" : "rgba(201,169,98,0.4)"
  
  if (id === "eye") return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 transition-colors duration-500" fill="none" stroke={color} strokeWidth="1.2">
      <path d="M2.5 12C2.5 12 7 4 12 4C17 4 21.5 12 21.5 12C21.5 12 17 20 12 20C7 20 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  )
  if (id === "flame") return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 transition-colors duration-500" fill="none" stroke={color} strokeWidth="1.2">
      <path d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z" />
      <path d="M12 22C12 22 16 19 16 15C16 11 12 9 12 9C12 9 8 11 8 15C8 19 12 22 12 22Z" />
    </svg>
  )
  if (id === "lotus") return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 transition-colors duration-500" fill="none" stroke={color} strokeWidth="1.2">
      <path d="M12 22C12 22 18 18 18 12C18 6 12 2 12 2C12 2 6 6 6 12C6 18 12 22 12 22Z" />
      <path d="M12 22C12 22 23 19 23 13C23 6 12 9 12 9C12 9 1 6 1 13C1 19 12 22 12 22Z" />
    </svg>
  )
  if (id === "diamond") return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 transition-colors duration-500" fill="none" stroke={color} strokeWidth="1.2">
      <path d="M12 2L22 12L12 22L2 12L12 2Z" />
      <path d="M12 2L16 12L12 22L8 12L12 2Z" />
      <path d="M2 12L22 12" />
    </svg>
  )
  if (id === "infinity") return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 transition-colors duration-500" fill="none" stroke={color} strokeWidth="1.2">
      <path d="M2.5 12C2.5 15.6 5.4 18.5 9 18.5C11.5 18.5 13.6 17 14.5 15L19.5 9C20.4 7 22.5 5.5 25 5.5" transform="translate(-2, 0) scale(0.9)" />
      <path d="M21.5 12C21.5 15.6 18.6 18.5 15 18.5C12.5 18.5 10.4 17 9.5 15L4.5 9C3.6 7 1.5 5.5 -1 5.5" transform="translate(2.5, 0) scale(0.9)" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
  return null
}

export function ProcessSectionV2() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeStep, setActiveStep] = useState<number>(0)

  return (
    <section id="process" className="relative py-32 px-6 overflow-hidden min-h-screen flex items-center">
      {/* Background Starfield */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-primary/5 blur-[120px] rounded-[100%]" />
      </div>

      <div ref={containerRef} className="relative max-w-7xl mx-auto w-full z-10">
        <SectionTitle subtitle="Process" title="The Alchemist's" highlight="Path" isInView={isInView} />

        <div className="mt-24 relative lg:h-[400px] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
          
          {/* Desktop SVG Path connecting stars */}
          <div className="hidden lg:block absolute top-[50%] left-0 right-0 h-px -translate-y-1/2 z-0 pointer-events-none">
            <svg className="w-full h-24 overflow-visible" fill="none">
              <motion.path 
                d="M 50,0 C 150,50 250,-50 350,0 C 450,50 550,-50 650,0 C 750,50 850,-50 950,0 C 1050,50 1150,-50 1200,0" 
                stroke="rgba(201,169,98,0.1)" strokeWidth="1" strokeDasharray="4 4" 
                initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 3, ease: "easeInOut" }}
              />
              <motion.path 
                d="M 50,0 C 150,50 250,-50 350,0 C 450,50 550,-50 650,0 C 750,50 850,-50 950,0 C 1050,50 1150,-50 1200,0" 
                stroke="rgba(201,169,98,0.5)" strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }} 
                animate={{ pathLength: (activeStep + 1) / processSteps.length, opacity: 1 }} 
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Steps */}
          {processSteps.map((step, index) => {
            const isActive = activeStep === index || activeStep > index;
            const isCurrent = activeStep === index;
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.2 }}
                onMouseEnter={() => setActiveStep(index)}
                className={`relative flex flex-col items-center group cursor-pointer w-full lg:w-48 z-10 transition-all duration-500`}
                style={{ transform: `translateY(${index % 2 === 0 ? '-30px' : '30px'})` }}
              >
                {/* Constellation Star (Icon Node) */}
                <div className="relative mb-6">
                  {/* Glowing Aura */}
                  <div className={`absolute inset-0 rounded-full transition-all duration-700 blur-xl ${isCurrent ? 'bg-accent/40 scale-150' : isActive ? 'bg-accent/10 scale-100' : 'bg-transparent'}`} />
                  
                  {/* Inner Node Background */}
                  <div className={`relative w-24 h-24 rounded-full border border-accent/20 flex items-center justify-center bg-background/90 backdrop-blur-md transition-all duration-500 ${isCurrent ? 'border-accent/80 shadow-[0_0_20px_rgba(201,169,98,0.3)]' : isActive ? 'border-accent/40' : ''}`}>
                    <SacredIcon id={step.iconId} active={isCurrent} />
                  </div>

                  {/* Number Badge */}
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-serif transition-colors duration-500 ${isCurrent ? 'bg-accent text-background' : 'bg-background border border-accent/30 text-accent'}`}>
                    {step.number}
                  </div>
                </div>

                {/* Text Content */}
                <div className={`text-center transition-all duration-500 ${isCurrent ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2'}`}>
                  <h3 className="font-serif text-2xl text-accent mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground font-serif tracking-widest uppercase mb-3">{step.sanskrit}</p>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {step.description}
                  </p>
                </div>

                {/* Vertical line connecting mobile */}
                {index < processSteps.length - 1 && (
                  <div className={`lg:hidden w-px h-12 mt-6 transition-colors duration-500 ${isActive ? 'bg-accent/50' : 'bg-accent/10'}`} />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
