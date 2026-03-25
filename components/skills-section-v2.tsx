"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { SectionTitle } from "./section-title"

// Unique SVG seal icons for each category
function SealIcon({ type, color }: { type: string; color: "primary" | "accent" }) {
  const stroke = color === "primary" ? "rgba(69,160,150,0.7)" : "rgba(201,169,98,0.7)"
  const fill = color === "primary" ? "rgba(69,160,150,0.15)" : "rgba(201,169,98,0.15)"

  switch (type) {
    case "lotus": // Frontend — lotus flower (beauty/interface)
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
          <path d="M12,20 C12,20 6,15 6,10 C6,6 9,4 12,6 C15,4 18,6 18,10 C18,15 12,20 12,20Z" fill={fill} stroke={stroke} strokeWidth="0.8" />
          <path d="M12,6 C12,6 9,8 9,12" stroke={stroke} strokeWidth="0.4" fill="none" />
          <path d="M12,6 C12,6 15,8 15,12" stroke={stroke} strokeWidth="0.4" fill="none" />
          <path d="M12,3 L12,6" stroke={stroke} strokeWidth="0.4" />
          <circle cx="12" cy="2.5" r="0.8" fill={stroke} />
        </svg>
      )
    case "yantra": // Backend — interlocking gear/yantra (architecture)
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
          <circle cx="12" cy="12" r="4" stroke={stroke} strokeWidth="0.7" fill={fill} />
          <circle cx="12" cy="12" r="7" stroke={stroke} strokeWidth="0.4" strokeDasharray="2 3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a}
              x1={12 + 7 * Math.cos((a * Math.PI) / 180)} y1={12 + 7 * Math.sin((a * Math.PI) / 180)}
              x2={12 + 9.5 * Math.cos((a * Math.PI) / 180)} y2={12 + 9.5 * Math.sin((a * Math.PI) / 180)}
              stroke={stroke} strokeWidth="0.6" strokeLinecap="round" />
          ))}
          <circle cx="12" cy="12" r="1.5" fill={stroke} />
        </svg>
      )
    case "vessel": // Databases — sacred vessel/kalash (knowledge container)
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
          <path d="M8,20 L16,20 L15,14 C15,14 17,12 17,10 C17,8 15,7 12,7 C9,7 7,8 7,10 C7,12 9,14 9,14 Z" fill={fill} stroke={stroke} strokeWidth="0.7" />
          <path d="M10,7 C10,5 10.5,3 12,3 C13.5,3 14,5 14,7" stroke={stroke} strokeWidth="0.5" fill="none" />
          <circle cx="12" cy="2.5" r="1" fill={fill} stroke={stroke} strokeWidth="0.4" />
          <line x1="8" y1="20" x2="16" y2="20" stroke={stroke} strokeWidth="0.8" />
          <path d="M9.5,11 L14.5,11" stroke={stroke} strokeWidth="0.3" strokeDasharray="1 1.5" />
        </svg>
      )
    case "compass": // Tools — ancient compass/astrolabe
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
          <circle cx="12" cy="12" r="8" stroke={stroke} strokeWidth="0.6" />
          <circle cx="12" cy="12" r="5.5" stroke={stroke} strokeWidth="0.3" strokeDasharray="1.5 2" />
          <polygon points="12,4.5 13.2,10 12,8 10.8,10" fill={stroke} opacity="0.6" />
          <polygon points="12,19.5 13.2,14 12,16 10.8,14" fill={fill} stroke={stroke} strokeWidth="0.3" />
          <line x1="4" y1="12" x2="20" y2="12" stroke={stroke} strokeWidth="0.3" />
          <circle cx="12" cy="12" r="1.2" fill={stroke} />
        </svg>
      )
    default:
      return <span className="text-xl">✦</span>
  }
}

const skillCategories = [
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "Javascript", "React", "Next.js (Learning)", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
    color: "primary" as const,
    sealType: "lotus",
    verse: "शिल्प - The Art of Interface",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "PHP", "REST APIs", "GraphQL", "Python (Basics)"],
    color: "accent" as const,
    sealType: "yantra",
    verse: "तंत्र - The Architecture Within",
  },
  {
    title: "Databases",
    skills: ["MongoDB", "MySQL (Basics)", "PostgreSQL (Learning)", "Prisma", "Supabase", "Firebase"],
    color: "primary" as const,
    sealType: "vessel",
    verse: "ज्ञान - The Keeper of Knowledge",
  },
  {
    title: "Tools, AI & Others",
    skills: ["Git", "GitHub", "Vercel", "AWS", "OpenAI API", "AI Tools", "Problem Solving"],
    color: "accent" as const,
    sealType: "compass",
    verse: "यंत्र - The Instruments of Power",
  },
]

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)
  const [chakraHovered, setChakraHovered] = useState(false)

  const renderChakra = (isMobile: boolean) => {
    const isHovered = chakraHovered && !isMobile
    return (
      <motion.div
        className={`absolute left-1/2 -translate-x-1/2 items-center justify-center ${isMobile
          ? "flex md:hidden top-1/2 -translate-y-1/2 -z-10 pointer-events-none"
          : "hidden md:flex top-1/2 -translate-y-1/2 z-20 cursor-pointer"
          }`}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: isHovered ? 1.30 : 1.15, opacity: 1 } : {}}
        transition={{ duration: 0.8, type: "spring" }}
        onMouseEnter={() => !isMobile && setChakraHovered(true)}
        onMouseLeave={() => !isMobile && setChakraHovered(false)}
      >
        {/* Glow backdrop */}
        <div className={`absolute w-24 h-24 rounded-full backdrop-blur-sm transition-all duration-200 ${isHovered ? 'bg-accent/10 shadow-[0_0_20px_rgba(201,169,98,0.2)]' : 'bg-background/80'}`} />

        {/* Outer rotating ring — hexagon + dots */}
        <motion.div
          className="absolute w-20 h-20"
          animate={{ rotate: 360 }}
          transition={{ duration: isHovered ? 3 : 10, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 90 90" className="w-full h-full" fill="none">
            <circle cx="45" cy="45" r="43" stroke={isHovered ? 'rgba(201,169,98,0.3)' : 'rgba(201,169,98,0.12)'} strokeWidth={isHovered ? '0.7' : '0.4'} strokeDasharray="3 5" style={{ transition: 'stroke 0.15s, stroke-width 0.15s' }} />
            <circle cx="45" cy="45" r="40" stroke={isHovered ? 'rgba(201,169,98,0.15)' : 'rgba(201,169,98,0.06)'} strokeWidth="0.3" style={{ transition: 'stroke 0.15s' }} />
            <polygon points={[0, 60, 120, 180, 240, 300].map(a => `${(45 + 40 * Math.cos((a * Math.PI) / 180)).toFixed(3)},${(45 + 40 * Math.sin((a * Math.PI) / 180)).toFixed(3)}`).join(' ')} stroke={isHovered ? 'rgba(201,169,98,0.25)' : 'rgba(201,169,98,0.1)'} strokeWidth="0.4" fill="none" style={{ transition: 'stroke 0.15s' }} />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
              <circle key={a}
                cx={(45 + 43 * Math.cos((a * Math.PI) / 180)).toFixed(3)}
                cy={(45 + 43 * Math.sin((a * Math.PI) / 180)).toFixed(3)}
                r={a % 60 === 0 ? '1.8' : '0.8'} fill={isHovered ? (a % 60 === 0 ? 'rgba(201,169,98,0.5)' : 'rgba(201,169,98,0.3)') : (a % 60 === 0 ? 'rgba(201,169,98,0.25)' : 'rgba(201,169,98,0.12)')} style={{ transition: 'fill 0.15s' }} />
            ))}
          </svg>
        </motion.div>

        {/* Middle counter-rotating ring */}
        <motion.div
          className="absolute w-14 h-14"
          animate={{ rotate: -360 }}
          transition={{ duration: isHovered ? 2 : 6, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
            <circle cx="32" cy="32" r="30" stroke={isHovered ? 'rgba(69,160,150,0.25)' : 'rgba(69,160,150,0.1)'} strokeWidth="0.4" style={{ transition: 'stroke 0.15s' }} />
            <circle cx="32" cy="32" r="26" stroke={isHovered ? 'rgba(69,160,150,0.15)' : 'rgba(69,160,150,0.06)'} strokeWidth="0.3" strokeDasharray="2 4" style={{ transition: 'stroke 0.15s' }} />
            <polygon points="32,4 57.8,47 6.2,47" fill="none" stroke={isHovered ? 'rgba(69,160,150,0.25)' : 'rgba(69,160,150,0.1)'} strokeWidth="0.35" style={{ transition: 'stroke 0.15s' }} />
            <polygon points="32,60 6.2,17 57.8,17" fill="none" stroke={isHovered ? 'rgba(201,169,98,0.2)' : 'rgba(201,169,98,0.08)'} strokeWidth="0.35" style={{ transition: 'stroke 0.15s' }} />
            <polygon points="32,6 58,32 32,58 6,32" fill="none" stroke={isHovered ? 'rgba(201,169,98,0.15)' : 'rgba(201,169,98,0.06)'} strokeWidth="0.3" style={{ transition: 'stroke 0.15s' }} />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line key={a}
                x1={(32 + 22 * Math.cos((a * Math.PI) / 180)).toFixed(3)} y1={(32 + 22 * Math.sin((a * Math.PI) / 180)).toFixed(3)}
                x2={(32 + 30 * Math.cos((a * Math.PI) / 180)).toFixed(3)} y2={(32 + 30 * Math.sin((a * Math.PI) / 180)).toFixed(3)}
                stroke={isHovered ? 'rgba(69,160,150,0.25)' : 'rgba(69,160,150,0.1)'} strokeWidth="0.4" style={{ transition: 'stroke 0.15s' }} />
            ))}
          </svg>
        </motion.div>

        {/* Inner ring — Star of David + square */}
        <motion.div
          className="absolute w-8 h-8"
          animate={{ rotate: 360 }}
          transition={{ duration: isHovered ? 1.5 : 4, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <circle cx="20" cy="20" r="18" stroke={isHovered ? 'rgba(201,169,98,0.2)' : 'rgba(201,169,98,0.08)'} strokeWidth="0.4" style={{ transition: 'stroke 0.15s' }} />
            <polygon points="20,3 35.6,27.5 4.4,27.5" fill="none" stroke={isHovered ? 'rgba(201,169,98,0.25)' : 'rgba(201,169,98,0.1)'} strokeWidth="0.3" style={{ transition: 'stroke 0.15s' }} />
            <polygon points="20,37 4.4,12.5 35.6,12.5" fill="none" stroke={isHovered ? 'rgba(201,169,98,0.25)' : 'rgba(201,169,98,0.1)'} strokeWidth="0.3" style={{ transition: 'stroke 0.15s' }} />
            <rect x="11" y="11" width="18" height="18" transform="rotate(45 20 20)" fill="none" stroke={isHovered ? 'rgba(69,160,150,0.18)' : 'rgba(69,160,150,0.07)'} strokeWidth="0.3" style={{ transition: 'stroke 0.15s' }} />
          </svg>
        </motion.div>

        {/* Micro inner ring */}
        <motion.div
          className="absolute w-4 h-4"
          animate={{ rotate: -360 }}
          transition={{ duration: isHovered ? 1 : 3, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 20 20" className="w-full h-full" fill="none">
            <circle cx="10" cy="10" r="8" stroke={isHovered ? 'rgba(201,169,98,0.2)' : 'rgba(201,169,98,0.08)'} strokeWidth="0.3" style={{ transition: 'stroke 0.15s' }} />
            <line x1="10" y1="2" x2="10" y2="18" stroke={isHovered ? 'rgba(201,169,98,0.25)' : 'rgba(201,169,98,0.1)'} strokeWidth="0.3" style={{ transition: 'stroke 0.15s' }} />
            <line x1="2" y1="10" x2="18" y2="10" stroke={isHovered ? 'rgba(201,169,98,0.25)' : 'rgba(201,169,98,0.1)'} strokeWidth="0.3" style={{ transition: 'stroke 0.15s' }} />
            <line x1="4.3" y1="4.3" x2="15.7" y2="15.7" stroke={isHovered ? 'rgba(201,169,98,0.15)' : 'rgba(201,169,98,0.06)'} strokeWidth="0.2" style={{ transition: 'stroke 0.15s' }} />
            <line x1="15.7" y1="4.3" x2="4.3" y2="15.7" stroke={isHovered ? 'rgba(201,169,98,0.15)' : 'rgba(201,169,98,0.06)'} strokeWidth="0.2" style={{ transition: 'stroke 0.15s' }} />
          </svg>
        </motion.div>

        {/* Center pulsing dot */}
        <div className="relative w-3 h-3">
          <div className={`absolute inset-0 rounded-full transition-colors duration-200 ${isHovered ? 'bg-accent/40' : 'bg-accent/20'}`} />
          <motion.div
            className="absolute inset-0.5 rounded-full bg-accent/40"
            animate={{ scale: [1, isHovered ? 1.8 : 1.4, 1], opacity: [0.4, isHovered ? 1 : 0.8, 0.4] }}
            transition={{ duration: isHovered ? 1 : 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="relative max-w-6xl mx-auto">
        <div className="relative">
          {renderChakra(true)}
          <SectionTitle subtitle="Expertise" title="Crafting the" highlight="Digital Universe" isInView={isInView} />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* ═══ Center Mandala Chakra (Desktop) ═══ */}
          {renderChakra(false)}
          {skillCategories.map((category, categoryIndex) => {
            const isHovered = hoveredCategory === categoryIndex
            const isPrimary = category.color === "primary"
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.15 }}
                onMouseEnter={() => setHoveredCategory(categoryIndex)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`relative group rounded-2xl overflow-hidden transition-all duration-500 ${isHovered ? "-translate-y-1" : ""}`}
              >
                {/* Parchment background */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: isHovered
                      ? "linear-gradient(160deg, rgba(18,36,36,0.95) 0%, rgba(26,46,46,0.9) 40%, rgba(18,36,36,0.95) 100%)"
                      : "linear-gradient(160deg, rgba(18,36,36,0.7) 0%, rgba(22,40,40,0.6) 100%)",
                  }}
                />

                {/* Torn edge masks using CSS */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/15 to-transparent" />

                {/* Border */}
                <div className={`absolute inset-0 rounded-2xl border transition-all duration-500 ${isHovered ? "border-accent/30" : "border-border/30"}`} />

                {/* Ancient corner marks */}
                <div className="absolute top-3 left-3 w-4 h-4 opacity-20">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M0,8 Q0,0 8,0" stroke="rgba(201,169,98,0.6)" strokeWidth="0.5" /></svg>
                </div>
                <div className="absolute top-3 right-3 w-4 h-4 opacity-20 rotate-90">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M0,8 Q0,0 8,0" stroke="rgba(201,169,98,0.6)" strokeWidth="0.5" /></svg>
                </div>
                <div className="absolute bottom-3 left-3 w-4 h-4 opacity-20 -rotate-90">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M0,8 Q0,0 8,0" stroke="rgba(201,169,98,0.6)" strokeWidth="0.5" /></svg>
                </div>
                <div className="absolute bottom-3 right-3 w-4 h-4 opacity-20 rotate-180">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M0,8 Q0,0 8,0" stroke="rgba(201,169,98,0.6)" strokeWidth="0.5" /></svg>
                </div>

                {/* ═══ Tree branch at top-right corner ═══ */}
                <div className="absolute -top-2 -right-2 w-40 h-36 pointer-events-none overflow-visible">
                  <svg viewBox="0 0 160 140" className="w-full h-full" fill="none">
                    <motion.path d="M160,10 C135,10 115,5 95,14 C75,23 62,35 55,50 C48,65 52,72 55,78" stroke="rgba(201,169,98,0.18)" strokeWidth="1.6" strokeLinecap="round"
                      initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 1.5, delay: 0.5 + categoryIndex * 0.2 }} />
                    <motion.path d="M95,14 C92,28 98,40 106,47" stroke="rgba(201,169,98,0.14)" strokeWidth="1" strokeLinecap="round"
                      initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 1, delay: 1 + categoryIndex * 0.2 }} />
                    <motion.path d="M120,8 C113,0 102,3 97,12" stroke="rgba(201,169,98,0.12)" strokeWidth="0.8" strokeLinecap="round"
                      initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.8, delay: 1.2 + categoryIndex * 0.2 }} />
                    <motion.path d="M70,42 C65,50 68,58 75,62" stroke="rgba(201,169,98,0.1)" strokeWidth="0.7" strokeLinecap="round"
                      initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.7, delay: 1.4 + categoryIndex * 0.2 }} />
                    <motion.ellipse cx="106" cy="47" rx="5" ry="2.5" transform="rotate(30 106 47)" fill="rgba(69,160,150,0.1)" stroke="rgba(69,160,150,0.16)" strokeWidth="0.4"
                      initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.3 + categoryIndex * 0.2 }} />
                    <motion.ellipse cx="97" cy="10" rx="4.5" ry="2.2" transform="rotate(-20 97 10)" fill="rgba(69,160,150,0.08)" stroke="rgba(69,160,150,0.14)" strokeWidth="0.4"
                      initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.4 + categoryIndex * 0.2 }} />
                    <motion.ellipse cx="65" cy="52" rx="4" ry="2" transform="rotate(45 65 52)" fill="rgba(69,160,150,0.08)" stroke="rgba(69,160,150,0.12)" strokeWidth="0.3"
                      initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.5 + categoryIndex * 0.2 }} />
                    <motion.ellipse cx="75" cy="62" rx="3.5" ry="1.8" transform="rotate(-15 75 62)" fill="rgba(69,160,150,0.07)" stroke="rgba(69,160,150,0.11)" strokeWidth="0.3"
                      initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.6 + categoryIndex * 0.2 }} />
                    <motion.circle cx="78" cy="30" r="2" fill="rgba(201,169,98,0.2)" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.4 + categoryIndex * 0.2 }} />
                    <motion.circle cx="55" cy="78" r="1.5" fill="rgba(201,169,98,0.18)" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.6 + categoryIndex * 0.2 }} />
                    <motion.circle cx="85" cy="18" r="1.2" fill="rgba(201,169,98,0.15)" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.5 + categoryIndex * 0.2 }} />
                  </svg>
                </div>

                {/* ═══ Tree branch at bottom-left corner ═══ */}
                <div className="absolute -bottom-2 -left-2 w-36 h-32 pointer-events-none overflow-visible">
                  <svg viewBox="0 0 140 125" className="w-full h-full" fill="none">
                    <motion.path d="M0,112 C20,108 42,116 58,102 C74,88 80,70 76,55" stroke="rgba(201,169,98,0.16)" strokeWidth="1.4" strokeLinecap="round"
                      initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 1.2, delay: 0.8 + categoryIndex * 0.2 }} />
                    <motion.path d="M58,102 C66,108 76,105 80,116" stroke="rgba(201,169,98,0.12)" strokeWidth="0.9" strokeLinecap="round"
                      initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.8, delay: 1.3 + categoryIndex * 0.2 }} />
                    <motion.path d="M35,110 C30,118 38,122 45,116" stroke="rgba(201,169,98,0.1)" strokeWidth="0.7" strokeLinecap="round"
                      initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 0.7, delay: 1.5 + categoryIndex * 0.2 }} />
                    <motion.ellipse cx="80" cy="116" rx="4.5" ry="2.2" transform="rotate(60 80 116)" fill="rgba(69,160,150,0.08)" stroke="rgba(69,160,150,0.14)" strokeWidth="0.4"
                      initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.5 + categoryIndex * 0.2 }} />
                    <motion.ellipse cx="76" cy="60" rx="4" ry="2" transform="rotate(-30 76 60)" fill="rgba(69,160,150,0.09)" stroke="rgba(69,160,150,0.14)" strokeWidth="0.4"
                      initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.6 + categoryIndex * 0.2 }} />
                    <motion.ellipse cx="45" cy="116" rx="3.5" ry="1.8" transform="rotate(-40 45 116)" fill="rgba(69,160,150,0.07)" stroke="rgba(69,160,150,0.11)" strokeWidth="0.3"
                      initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.7 + categoryIndex * 0.2 }} />
                    <motion.circle cx="48" cy="108" r="1.8" fill="rgba(201,169,98,0.18)" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.4 + categoryIndex * 0.2 }} />
                    <motion.circle cx="70" cy="80" r="1.3" fill="rgba(201,169,98,0.15)" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.5 + categoryIndex * 0.2 }} />
                  </svg>
                </div>

                {/* ═══ Floating golden fireflies — scatter on hover ═══ */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={`firefly-${categoryIndex}-${i}`}
                    className="absolute pointer-events-none z-10"
                    animate={isHovered
                      ? [
                        [{ right: 60, top: 20, opacity: 0.9 }, { right: 30, top: 35, opacity: 0.8 }, { right: 80, top: 15, opacity: 0.7 }],
                        [{ right: 45, top: 30, opacity: 0.8 }, { right: 70, top: 12, opacity: 0.9 }, { right: 55, top: 42, opacity: 0.7 }],
                        [{ right: 70, top: 15, opacity: 0.7 }, { right: 50, top: 40, opacity: 0.9 }, { right: 35, top: 20, opacity: 0.8 }],
                        [{ right: 40, top: 25, opacity: 0.9 }, { right: 65, top: 38, opacity: 0.7 }, { right: 50, top: 10, opacity: 0.8 }],
                      ][categoryIndex][i]
                      : [
                        [{ right: 22, top: 10, opacity: 0.3 }, { right: 35, top: 18, opacity: 0.2 }, { right: 28, top: 25, opacity: 0.15 }],
                        [{ right: 30, top: 15, opacity: 0.25 }, { right: 20, top: 22, opacity: 0.2 }, { right: 40, top: 8, opacity: 0.15 }],
                        [{ right: 25, top: 12, opacity: 0.3 }, { right: 38, top: 20, opacity: 0.15 }, { right: 18, top: 28, opacity: 0.2 }],
                        [{ right: 28, top: 8, opacity: 0.2 }, { right: 22, top: 24, opacity: 0.25 }, { right: 35, top: 16, opacity: 0.15 }],
                      ][categoryIndex][i]
                    }
                    transition={{ type: "spring", damping: 12, stiffness: 80, delay: i * 0.08 }}
                    style={{ width: [6, 4, 5][i], height: [6, 4, 5][i] }}
                  >
                    <motion.div
                      className="w-full h-full rounded-full bg-accent/60"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                        boxShadow: [
                          '0 0 3px rgba(201,169,98,0.3)',
                          '0 0 8px rgba(201,169,98,0.5)',
                          '0 0 3px rgba(201,169,98,0.3)',
                        ],
                      }}
                      transition={{ duration: [2.5, 3, 2][i], repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    />
                  </motion.div>
                ))}


                <div className="relative p-6 lg:p-8">
                  {/* Wax Seal + Title */}
                  <div className="flex items-center gap-4 mb-2">
                    <motion.div
                      className={`relative w-12 h-12 rounded-full flex items-center justify-center ${isPrimary
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-accent/10 border border-accent/30"
                        }`}
                      animate={isHovered ? { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                    >
                      {/* Seal ring */}
                      <div className={`absolute inset-0.5 rounded-full border border-dashed ${isPrimary ? "border-primary/20" : "border-accent/20"}`} />
                      <SealIcon type={category.sealType} color={category.color} />
                    </motion.div>

                    <div>
                      <h3 className="font-serif text-xl lg:text-2xl font-light text-foreground">{category.title}</h3>
                      <motion.p
                        className="text-xs text-accent/40 font-serif italic"
                        initial={{ opacity: 0 }}
                        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {category.verse}
                      </motion.p>
                    </div>
                  </div>

                  {/* Divider line */}
                  <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />
                    <div className={`w-1.5 h-1.5 rounded-full ${isPrimary ? "bg-primary/30" : "bg-accent/30"}`} />
                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />
                  </div>

                  {/* Skills with quill-reveal effect */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: 0.5 + categoryIndex * 0.15 + skillIndex * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isHovered
                          ? isPrimary
                            ? "bg-primary/15 text-primary border border-primary/25"
                            : "bg-accent/15 text-accent border border-accent/25"
                          : "bg-muted/30 text-muted-foreground border border-border/20"
                          }`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Bottom ornamental line */}
                  <motion.div
                    className="mt-6 flex items-center gap-2 justify-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + categoryIndex * 0.15 }}
                  >
                    <div className="w-6 h-px bg-linear-to-r from-transparent to-accent/20" />
                    <div className="w-1 h-1 rounded-full bg-accent/15" />
                    <div className="w-6 h-px bg-linear-to-l from-transparent to-accent/20" />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
