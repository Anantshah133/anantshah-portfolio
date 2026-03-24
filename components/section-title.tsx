"use client"

import { motion } from "framer-motion"

interface SectionTitleProps {
  subtitle: string
  title: string
  highlight: string
  isInView: boolean
}

export function SectionTitle({ subtitle, title, highlight, isInView }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center mb-20"
    >
      {/* Subtitle with golden glowing dots */}
      <div className="flex items-center justify-center gap-4">
        {/* Left golden dot */}
        <motion.div
          className="relative w-2 h-2"
          animate={isInView ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-full bg-accent" />
          <div className="absolute inset-0 rounded-full bg-accent blur-sm opacity-60" />
          <div className="absolute -inset-1 rounded-full bg-accent/20 blur-md" />
        </motion.div>

        <span className="text-primary text-sm tracking-[0.3em] uppercase">{subtitle}</span>

        {/* Right golden dot */}
        <motion.div
          className="relative w-2 h-2"
          animate={isInView ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="absolute inset-0 rounded-full bg-accent" />
          <div className="absolute inset-0 rounded-full bg-accent blur-sm opacity-60" />
          <div className="absolute -inset-1 rounded-full bg-accent/20 blur-md" />
        </motion.div>
      </div>

      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mt-4 text-balance">
        {title} <span className="italic text-primary">{highlight}</span>
      </h2>
    </motion.div>
  )
}
