"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useCallback } from "react"

import { SectionTitle } from "./section-title"

export function SignatureSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX)
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  return (
    <section id="signature" className="relative py-32 px-6 overflow-hidden bg-muted/20">
      <div ref={containerRef} className="relative max-w-6xl mx-auto">
        <SectionTitle subtitle="Transformation" title="The Anant" highlight="Difference" isInView={isInView} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Drag the slider to see how I transform digital experiences
          </p>
        </motion.div>

        {/* Before/After Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          ref={sliderRef}
          className="relative aspect-16/10 md:aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none border border-border/50 shadow-2xl shadow-primary/10"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Before (Messy/Outdated) Side */}
          <div className="absolute inset-0 bg-[#1a1a2e]">
            <div className="h-full p-4 md:p-8">
              {/* Old Website Mock */}
              <div className="h-full rounded-lg bg-[#16213e] border border-[#0f3460]/50 overflow-hidden">
                {/* Old Header */}
                <div className="h-12 md:h-16 bg-linear-to-r from-[#e94560] to-[#0f3460] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-white/80 text-xs md:text-sm font-mono">oldwebsite.com</span>
                </div>
                {/* Old Content */}
                <div className="p-4 md:p-6 space-y-4">
                  <div className="text-[#e94560] font-mono text-lg md:text-2xl animate-pulse">{">>> WELCOME <<<"}</div>
                  <div className="flex gap-4 flex-wrap">
                    <div className="px-3 py-1 bg-[#e94560] text-white text-xs rounded">HOME</div>
                    <div className="px-3 py-1 bg-[#0f3460] text-white text-xs rounded border border-[#e94560]">
                      ABOUT
                    </div>
                    <div className="px-3 py-1 bg-[#0f3460] text-white text-xs rounded border border-[#e94560]">
                      CONTACT
                    </div>
                  </div>
                  <div className="h-24 md:h-32 bg-linear-to-r from-[#0f3460] to-[#e94560] rounded flex items-center justify-center">
                    <span className="text-white/60 text-xs md:text-sm">[ Image Not Found ]</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-[#0f3460] rounded w-full" />
                    <div className="h-3 bg-[#0f3460] rounded w-4/5" />
                    <div className="h-3 bg-[#0f3460] rounded w-3/5" />
                  </div>
                  <div className="text-[#e94560]/60 text-xs">
                    <span className="animate-pulse">|</span> Last updated: 2015
                  </div>
                </div>
              </div>
            </div>
            {/* Before Label */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 px-4 py-2 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30">
              <span className="text-red-400 text-xs md:text-sm font-medium">Before</span>
            </div>
          </div>

          {/* After (Modern/Premium) Side */}
          <div className="absolute inset-0 bg-background" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
            <div className="h-full p-4 md:p-8">
              {/* Modern Website Mock */}
              <div className="h-full rounded-xl bg-card border border-border/50 overflow-hidden shadow-inner">
                {/* Modern Header */}
                <div className="h-12 md:h-16 bg-card/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 md:px-6">
                  <span className="font-serif text-foreground text-sm md:text-lg">
                    Brand<span className="text-primary">.</span>
                  </span>
                  <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
                    <span className="hover:text-primary cursor-pointer transition-colors">Work</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">About</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Contact</span>
                  </div>
                </div>
                {/* Modern Content */}
                <div className="p-4 md:p-8 space-y-6">
                  <div>
                    <p className="text-primary text-xs tracking-widest mb-2">WELCOME</p>
                    <h3 className="font-serif text-xl md:text-3xl font-light text-foreground leading-tight">
                      Crafting Digital
                      <br />
                      <span className="italic text-primary">Experiences</span>
                    </h3>
                  </div>
                  <div className="h-24 md:h-32 rounded-lg bg-linear-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/30 mx-auto mb-2 flex items-center justify-center">
                        <span className="text-lg md:text-2xl">✦</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Featured Work</span>
                    </div>
                  </div>
                  <div className="flex gap-2 md:gap-3">
                    <div className="flex-1 h-12 md:h-16 rounded-lg bg-muted/50 border border-border/50" />
                    <div className="flex-1 h-12 md:h-16 rounded-lg bg-muted/50 border border-border/50" />
                    <div className="flex-1 h-12 md:h-16 rounded-lg bg-muted/50 border border-border/50" />
                  </div>
                </div>
              </div>
            </div>
            {/* After Label */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
              <span className="text-primary text-xs md:text-sm font-medium">After</span>
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-foreground/80 cursor-ew-resize z-10"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            {/* Handle Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-foreground flex items-center justify-center shadow-lg">
              <div className="flex gap-0.5">
                <div className="w-0.5 h-4 bg-background rounded-full" />
                <div className="w-0.5 h-4 bg-background rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-muted-foreground mt-8 text-sm md:text-base"
        >
          From outdated chaos to premium clarity — that's the transformation I deliver.
        </motion.p>
      </div>
    </section>
  )
}
