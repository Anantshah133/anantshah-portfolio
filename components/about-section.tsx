"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { SectionTitle } from "./section-title"


const experience = [
  {
    year: "APR 2024 – MAR 2026",
    duration: "2 Years",
    role: "Full Stack Developer",
    company: "Red & White Skill Education",
    location: "Surat",
    bullets: [
      "Architected and built full-stack web applications using React, Next.js, Node.js, and MySQL.",
      "Led development of an internal Learning Management System (LMS) serving 1,000+ students.",
      "Designed RESTful APIs and integrated third-party payment gateways and SMS services.",
      "Mentored junior developers and conducted weekly code review sessions.",
      "Improved application performance by 40% through query optimization and caching strategies.",
    ],
  },
  {
    year: "APR 2023 – APR 2024",
    duration: "1 Year",
    role: "Jr. PHP Developer",
    company: "Pragma Infotech",
    location: "Surat",
    bullets: [
      "Developed and maintained client-facing PHP/Laravel web applications.",
      "Built dynamic UI components using HTML, CSS, Bootstrap, and jQuery.",
      "Integrated MySQL databases, wrote stored procedures and optimized slow queries.",
      "Collaborated with the design team to implement pixel-perfect responsive layouts.",
      "Participated in Agile sprints and daily standups to deliver features on schedule.",
    ],
  },
]

const education = [
  { year: "2023 – 2025", degree: "Bachelor Of Computer Application (BCA)", institution: "Bhagwan Mahavir University – Surat" },
  { year: "2022 – 2024", degree: "Full Stack Development Course", institution: "Red & White Skill Education – Surat" },
  { year: "2022", degree: "Higher Secondary (HSC)", institution: "Jeevan Bharti Vidhyalaya – Surat" },
]

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [imageHovered, setImageHovered] = useState(false)
  const [openExp, setOpenExp] = useState<number | null>(null)

  const toggleExp = (i: number) => setOpenExp(prev => prev === i ? null : i)

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="relative max-w-6xl mx-auto">
        <SectionTitle subtitle="About" title="The Mind" highlight="Behind" isInView={isInView} />

        {/* ── Main Content Grid ── */}
        <div className="grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-20 mb-20 items-start">

          {/* ── Photo Column ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            {/* Decorative golden frame behind image */}
            <div className="absolute -top-3 -left-3 w-full h-full rounded-2xl border border-accent/20" />
            <div className="absolute -top-6 -left-6 w-full h-full rounded-2xl border border-accent/10" />

            <div className="relative rounded-2xl overflow-hidden aspect-3/4 cursor-pointer">
              <motion.img
                src="/my-photo.png"
                alt="Anant Shah"
                className="w-full h-full object-cover object-top"
                animate={imageHovered ? { scale: 1.04 } : { scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {/* Gradient overlay — stronger at bottom */}
              <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/10 to-transparent" />

              {/* Corner accents on hover */}
              {[
                "top-3 left-3 border-l-2 border-t-2 rounded-tl-lg",
                "top-3 right-3 border-r-2 border-t-2 rounded-tr-lg",
                "bottom-3 left-3 border-l-2 border-b-2 rounded-bl-lg",
                "bottom-3 right-3 border-r-2 border-b-2 rounded-br-lg",
              ].map((cls, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-10 h-10 border-accent/70 ${cls}`}
                  initial={{ opacity: 0 }}
                  animate={imageHovered ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                />
              ))}

              {/* Name card on hover */}
              <motion.div
                className="absolute bottom-6 left-5 right-5 p-3 rounded-xl bg-card/80 backdrop-blur-md border border-accent/30"
                initial={{ opacity: 0, y: 12 }}
                animate={imageHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <p className="font-serif text-base text-foreground">Anant Shah</p>
                <p className="text-xs text-muted-foreground">Full Stack Developer</p>
              </motion.div>
            </div>

            {/* Pulsing accent line below image */}
            <motion.div
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-20 h-px rounded-full bg-linear-to-r from-transparent via-accent/60 to-transparent"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* ── Text Column ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            {/* New Bio Content */}
            <div className="relative mb-6">
              {/* Sanskrit Watermark */}
              <p className="absolute -top-6 left-0 right-0 font-serif text-4xl text-accent/6 select-none pointer-events-none overflow-hidden whitespace-nowrap tracking-widest">
                यत्र यत्र मनो याति तत्र तत्र समाधयः
              </p>
              <p className="relative text-muted-foreground text-lg leading-relaxed pt-2">
                I&apos;m a Full Stack Developer who enjoys building things that actually work - not just look good on the surface. I started with curiosity - breaking down how websites function, how data flows, how systems scale - and that turned into a focus on building clean, reliable, and production-ready applications.
              </p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I believe good software should feel effortless to the user and structured under the hood. That&apos;s why I focus on writing code that is maintainable, scalable, and intentional - whether it&apos;s designing intuitive interfaces or building backend systems that handle real-world use.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Over time, I&apos;ve worked on multiple projects across the MERN stack, implementing authentication systems, APIs, and real-world features that go beyond tutorials. I don&apos;t just build projects - I try to understand the &quot;why&quot; behind every decision, refine it, and make it better with each iteration.
            </p>

            <p className="text-accent/80 font-serif text-xl italic mb-10">
              "Always learning. Always improving. Always building with purpose"
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
              {[
                { number: "2+", label: "Years Experience" },
                { number: "15+", label: "Projects Built" },
                { number: "5+", label: "Clients Served" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <span className="block font-serif text-3xl text-accent">{stat.number}</span>
                  <span className="text-xs text-muted-foreground tracking-wider uppercase">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Experience & Education ── */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Section heading with ornamental line */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <h3 className="font-serif text-2xl text-foreground">Experience</h3>
            </div>

            <div className="space-y-6">
              {experience.map((item, index) => {
                const isOpen = openExp === index
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className={`group relative pl-6 border-l-2 transition-all duration-300 ${isOpen ? 'border-accent/50' : 'border-border/50 hover:border-accent/50'}`}
                  >
                    {/* Absolute dot matching education style but golden */}
                    <div className={`absolute left-0 top-0 w-2 h-2 -translate-x-[5px] rounded-full transition-all duration-300 ${isOpen ? 'bg-accent' : 'bg-border group-hover:bg-accent'}`} />

                    {/* ── Header: Ancient Timeline Row ── */}
                    <button
                      onClick={() => toggleExp(index)}
                      className="w-full text-left group focus:outline-none mb-2 cursor-pointer"
                    >
                      <div className="relative flex items-start justify-between gap-4 py-1">
                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <span className={`text-xs tracking-wider transition-colors duration-300 ${isOpen ? 'text-accent font-medium' : 'text-accent/60 group-hover:text-accent'}`}>
                            {item.year} · {item.duration}
                          </span>
                          <h4 className={`font-medium transition-colors duration-300 mt-1 text-foreground`}>
                            {item.role}
                          </h4>
                          <p className="text-sm text-muted-foreground">{item.company} — {item.location}</p>
                        </div>

                        {/* Right side icon matching education style */}
                        <div className="shrink-0 pt-1 flex items-center gap-1 opacity-40 group-hover:opacity-80 transition-opacity duration-300">
                          <motion.div
                            animate={isOpen ? { scaleX: -1, color: 'rgb(201,169,98)' } : { scaleX: 1 }}
                            transition={{ duration: 0.4 }}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                              <path d="M12 3 C12 3 5 8 5 14 C5 18 8 21 12 21" />
                              <path d="M12 3 C12 3 19 8 19 14 C19 18 16 21 12 21" />
                              <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity={isOpen ? 0.8 : 0} stroke="none" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                    </button>

                    {/* ── Body: Scroll Unfurl ── */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="scroll-body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="relative mt-1 mb-4">
                            <div className="relative py-3 pr-8 pl-2">
                              <ul className="space-y-3">
                                {item.bullets.map((b, bi) => (
                                  <motion.li
                                    key={bi}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.35, delay: 0.1 + bi * 0.07 }}
                                    className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                                  >
                                    <div className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-accent/60" />
                                    {b}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <h3 className="font-serif text-2xl text-foreground">Education</h3>
            </div>

            <div className="space-y-8">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="group relative pl-6 border-l-2 border-border/50 hover:border-primary/50 transition-colors duration-300"
                >
                  <div className="absolute left-0 top-0 w-2 h-2 -translate-x-[5px] rounded-full bg-border group-hover:bg-primary transition-colors duration-300" />
                  <span className="text-xs text-primary tracking-wider">{item.year}</span>
                  <h4 className="font-medium text-foreground mt-1">{item.degree}</h4>
                  <p className="text-sm text-muted-foreground">{item.institution}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}