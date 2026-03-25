"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { SectionTitle } from "./section-title"
import { CircleDot, Lightbulb, Hexagon, Sparkles, Infinity as InfinityIcon } from "lucide-react"

const processSteps = [
  {
    roman: "I",
    title: "Listen",
    sanskrit: "श्रवण",
    description: "Understanding your vision, constraints, and the story you want to tell.",
    icon: CircleDot,
  },
  {
    roman: "II",
    title: "Distill",
    sanskrit: "सार",
    description: "Stripping away noise to find the essential elements that matter.",
    icon: Lightbulb,
  },
  {
    roman: "III",
    title: "Shape",
    sanskrit: "रूप",
    description: "Crafting interfaces that feel natural, intuitive, and purposeful.",
    icon: Hexagon,
  },
  {
    roman: "IV",
    title: "Refine",
    sanskrit: "शुद्धि",
    description: "Iterating with precision until every detail resonates.",
    icon: Sparkles,
  },
  {
    roman: "V",
    title: "Evolve",
    sanskrit: "विकास",
    description: "Continuous improvement beyond completion, adapting and growing with every iteration.",
    icon: InfinityIcon,
  },
]

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  return (
    <section id="process" className="relative py-32 px-6 overflow-hidden bg-background">
      {/* Background Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        <div ref={headerRef}>
          <SectionTitle subtitle="Process" title="How I" highlight="Work" isInView={isHeaderInView} />
        </div>

        <div ref={containerRef} className="relative mt-24 mb-32">
          {/* Central Golden Thread Background */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-accent/10 -translate-x-1/2" />
          
          {/* Animated Central Golden Thread */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden flex justify-center">
            <motion.div 
              className="w-full h-full bg-linear-to-b from-accent to-accent/50 origin-top shadow-[0_0_15px_rgba(201,169,98,0.5)]"
              style={{ scaleY: scrollYProgress }}
            />
          </div>

          <div className="space-y-16 lg:space-y-32">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0
              return (
                <ProcessCard key={step.roman} step={step} isEven={isEven} Icon={Icon} index={index} />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessCard({ step, isEven, Icon, index }: any) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-150px" })
  
  // Triggers exactly when the card crosses the center of the viewport (matching the golden thread)
  const isHit = useInView(cardRef, { margin: "0px 0px -50% 0px" })
  
  const [isHovered, setIsHovered] = useState(false)
  const isActive = isHovered || isHit

  return (
    <div 
      ref={cardRef} 
      className={`relative flex items-center md:gap-16 group ${isEven ? 'row' : 'md:flex-row-reverse flex-row'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline Node */}
      <motion.div 
        className="absolute left-[24px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-accent z-10 shadow-[0_0_15px_rgba(201,169,98,0.5)] flex items-center justify-center transition-colors duration-500"
        initial={{ backgroundColor: "rgba(13,26,26,1)" }}
        animate={isActive ? { backgroundColor: "rgba(201,169,98,0.2)" } : { backgroundColor: "rgba(13,26,26,1)" }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-accent rounded-full" 
          initial={{ scale: 0 }}
          animate={isActive ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : { scale: 0 }}
          transition={isActive ? { duration: 2, repeat: Infinity } : {}}
        />
      </motion.div>

      {/* Empty space for alternating layout on desktop */}
      <div className="hidden md:block w-1/2" />

      {/* Card Content (Astrolabe Style Design logic merged into Scrolls Layout) */}
      <div className={`relative w-full md:w-1/2 ml-16 md:ml-0 ${isEven ? 'md:pr-12 lg:pr-16 text-left md:text-right' : 'md:pl-12 lg:pl-16 text-left'}`}>
        <motion.div 
          className="relative min-h-[280px] p-8 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ease-out border shadow-black/50"
          initial={{ opacity: 0, y: 50, rotateX: -10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background: isActive 
              ? "linear-gradient(135deg, rgba(201,169,98,0.1) 0%, rgba(13,26,26,0.95) 100%)" 
              : "linear-gradient(135deg, rgba(18,36,36,0.9) 0%, rgba(13,26,26,0.95) 100%)",
            borderColor: isActive ? "rgba(201,169,98,0.4)" : "rgba(201,169,98,0.1)"
          }}
        >
          {/* Glowing Outline Box SVG mapping on hover */}
          <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-700 ease-out ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`} fill="none">
            <rect x="12" y="12" width="calc(100% - 24px)" height="calc(100% - 24px)" stroke="rgba(201,169,98,0.3)" strokeWidth="1" rx="8" strokeDasharray="4 6" />
            <circle cx="12" cy="12" r="3" fill="rgba(201,169,98,0.5)" />
            <circle cx="calc(100% - 12px)" cy="12" r="3" fill="rgba(201,169,98,0.5)" />
            <circle cx="12" cy="calc(100% - 12px)" r="3" fill="rgba(201,169,98,0.5)" />
            <circle cx="calc(100% - 12px)" cy="calc(100% - 12px)" r="3" fill="rgba(201,169,98,0.5)" />
          </svg>

          {/* Giant Faded Sanskrit Background Letter */}
          <div className={`absolute -bottom-10 select-none pointer-events-none z-0 ${isEven ? 'md:-left-6 -right-6' : '-right-6'}`}>
            <span className={`font-serif text-[12rem] leading-none transition-all duration-1000 ${isActive ? 'text-accent/10 scale-110 rotate-12' : 'text-accent/5 scale-100 rotate-0'}`}>
              {step.sanskrit.charAt(0)}
            </span>
          </div>

          {/* Glowing Embers */}
          {isActive && (
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
            <div className={`flex items-start ${isEven ? 'md:flex-row-reverse flex-row justify-between' : 'justify-between'}`}>
              <div className={`p-4 rounded-xl transition-all duration-500 ${isActive ? 'bg-accent/20 text-accent shadow-[0_0_20px_rgba(201,169,98,0.3)]' : 'bg-primary/20 text-muted-foreground'}`}>
                <Icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <span className={`font-serif text-5xl font-light text-muted-foreground/30 ${isEven ? 'md:mr-auto md:ml-0 ml-auto' : ''}`}>{step.roman}</span>
            </div>

            <div className={`mt-10 ${isEven ? 'md:text-right text-left' : 'text-left'}`}>
              <span className="text-accent tracking-[0.3em] text-xs uppercase block mb-3 opacity-80">{step.sanskrit}</span>
              <h3 className="text-2xl font-serif text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground/80 leading-relaxed font-light text-[15px]">
                {step.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
