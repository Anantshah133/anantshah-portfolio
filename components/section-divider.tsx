"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="relative">
      <motion.div
        className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </div>
  )
}
