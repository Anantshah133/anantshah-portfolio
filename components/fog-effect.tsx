"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

export function FogEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background to-muted/30" />

      {/* Fog layers */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-64 opacity-30"
          style={{
            top: `${15 + i * 15}%`,
            background: `linear-gradient(90deg, transparent, rgba(69, 160, 150, ${0.03 + i * 0.01}), transparent)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: i % 2 === 0 ? ["-20%", "20%", "-20%"] : ["20%", "-20%", "20%"],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
