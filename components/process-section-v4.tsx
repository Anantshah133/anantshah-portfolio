"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { SectionTitle } from "./section-title"
import { Leaf, Sparkles, Droplets, Target, RefreshCw } from "lucide-react"

const processSteps = [
  {
    number: "01",
    title: "Listen",
    sanskrit: "श्रवण",
    description: "Understanding your vision, constraints, and the story you want to tell.",
    icon: Leaf,
  },
  {
    number: "02",
    title: "Distill",
    sanskrit: "सार",
    description: "Stripping away noise to find the essential elements that matter.",
    icon: Droplets,
  },
  {
    number: "03",
    title: "Shape",
    sanskrit: "रूप",
    description: "Crafting interfaces that feel natural, intuitive, and purposeful.",
    icon: Target,
  },
  {
    number: "04",
    title: "Refine",
    sanskrit: "शुद्धि",
    description: "Iterating with precision until every detail resonates.",
    icon: Sparkles,
  },
  {
    number: "05",
    title: "Evolve",
    sanskrit: "विकास",
    description: "Continuous improvement beyond completion, adapting and growing with every iteration.",
    icon: RefreshCw,
  },
]

export function ProcessSectionV4() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-background">
      {/* Background Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div ref={containerRef} className="relative max-w-5xl mx-auto z-10 w-full">
        <SectionTitle subtitle="Process" title="Manuscript" highlight="Scrolls" isInView={isInView} />

        <div className="relative mt-24">
          {/* Central Golden Thread */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-accent/20 -translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-linear-to-b from-accent to-accent/0"
              initial={{ height: 0, opacity: 0 }}
              animate={isInView ? { height: '100%', opacity: 1 } : {}}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>

          <div className="space-y-16 lg:space-y-32">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                  className={`relative flex items-center gap-8 md:gap-16 group ${isEven ? 'flex-row' : 'md:flex-row-reverse flex-row'}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-accent z-10 shadow-[0_0_15px_rgba(201,169,98,0.5)] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content (Torn Parchment Style) */}
                  <div className={`relative w-full md:w-1/2 ml-12 md:ml-0 ${isEven ? 'md:pr-12 lg:pr-16 text-left md:text-right' : 'md:pl-12 lg:pl-16 text-left'}`}>
                    <div className="relative p-8 rounded border border-accent/20 backdrop-blur-md overflow-hidden bg-primary/5 transition-all duration-500 group-hover:bg-primary/10 group-hover:border-accent/40 group-hover:-translate-y-2 shadow-xl">
                      
                      {/* Abstract Decorative SVG Corners */}
                      <svg className="absolute top-0 left-0 w-16 h-16 text-accent/10 pointer-events-none transition-all duration-500 group-hover:text-accent/30" fill="none" viewBox="0 0 100 100">
                        <path d="M0,50 C20,50 50,20 50,0" stroke="currentColor" strokeWidth="2" />
                        <circle cx="25" cy="25" r="2" fill="currentColor" />
                      </svg>
                      <svg className="absolute bottom-0 right-0 w-16 h-16 text-accent/10 pointer-events-none transition-all duration-500 group-hover:text-accent/30 transform rotate-180" fill="none" viewBox="0 0 100 100">
                        <path d="M0,50 C20,50 50,20 50,0" stroke="currentColor" strokeWidth="2" />
                        <circle cx="25" cy="25" r="2" fill="currentColor" />
                      </svg>

                      {/* Giant Number Watermark */}
                      <div className={`absolute top-1/2 -translate-y-1/2 font-serif text-[10rem] font-bold text-accent/3 select-none pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:text-accent/5 ${isEven ? 'md:-right-10 right-4' : 'right-4'}`}>
                        {step.number}
                      </div>

                      <div className={`flex flex-col ${isEven ? 'md:items-end items-start' : 'items-start'} relative z-10`}>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="font-serif text-3xl font-bold tracking-wider text-accent drop-shadow-[0_0_10px_rgba(201,169,98,0.3)]">{step.title}</span>
                          <span className="text-muted-foreground font-serif tracking-widest uppercase text-sm">{step.sanskrit}</span>
                        </div>
                        <p className={`text-muted-foreground/90 leading-relaxed font-light ${isEven ? 'md:text-right text-left' : 'text-left'}`}>
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
      </div>
    </section>
  )
}
