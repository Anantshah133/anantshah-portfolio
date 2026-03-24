"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { SectionTitle } from "./section-title"

const experience = [
  { year: "APR 2024 - MAR 2026 (2 Year)", role: "Full Stack Developer", company: "Red & White Skill Education - Surat" },
  { year: "APR 2023 - APR 2024 (1 Year)", role: "Jr. PHP Developer", company: "Pragma Infotech - Surat" },
  // { year: "DEC 2022 - JAN 2023 (1 Month)", role: "Internship Trainee", company: "Vermillion Tech - Surat" },
]

const education = [
  { year: "2023 - 2025", degree: "Bachelor Of Computer Application - (BCA)", institution: "Bhagwan Mahavir University - Surat" },
  { year: "2022 - 2024", degree: "Full Stack Development Course", institution: "Red & White Skill Education - Surat" },
  { year: "2022", degree: "Higher Secondary - (HSC)", institution: "Jeevan Bharti Vidhyalaya - Surat" },
]

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [imageHovered, setImageHovered] = useState(false)

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="relative max-w-6xl mx-auto">
        <SectionTitle subtitle="About" title="The Mind" highlight="Behind" isInView={isInView} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Image with interaction */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden group cursor-pointer">
              {/* Image container with hover effect */}
              <motion.div
                className="absolute inset-0"
                animate={imageHovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <img src="/my-photo.png" alt="Anant Shah" className="w-full h-full object-cover" />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
              </motion.div>

              {/* Golden frame corners that appear on hover */}
              <motion.div
                className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-accent/60 rounded-tl-lg"
                initial={{ opacity: 0, x: -10, y: -10 }}
                animate={imageHovered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -10, y: -10 }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-accent/60 rounded-tr-lg"
                initial={{ opacity: 0, x: 10, y: -10 }}
                animate={imageHovered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 10, y: -10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-accent/60 rounded-bl-lg"
                initial={{ opacity: 0, x: -10, y: 10 }}
                animate={imageHovered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -10, y: 10 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />
              <motion.div
                className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-accent/60 rounded-br-lg"
                initial={{ opacity: 0, x: 10, y: 10 }}
                animate={imageHovered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 10, y: 10 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              />

              {/* Floating info card on hover */}
              <motion.div
                className="absolute bottom-8 left-8 right-8 p-4 rounded-xl bg-card/80 backdrop-blur-md border border-accent/30"
                initial={{ opacity: 0, y: 20 }}
                animate={imageHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <p className="font-serif text-lg text-foreground">Anant Shah</p>
                <p className="text-sm text-muted-foreground">Full Stack Developer</p>
              </motion.div>
            </div>

            {/* Decorative accent line */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-linear-to-r from-transparent via-accent/50 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              I'm a Full Stack Developer with a passion for creating digital experiences that blend aesthetic beauty with functional excellence.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              My approach merges ancient principles of balance and harmony with modern technology.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Every project I undertake is an opportunity to craft something meaningful - interfaces that feel intuitive, backends that scale gracefully, and experiences that leave a lasting impression.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
              {[
                { number: "2+", label: "Years Exp." },
                { number: "15+", label: "Projects" },
                { number: "5+", label: "Clients" },
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

        {/* Experience & Education */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <h3 className="font-serif text-2xl text-foreground">Experience</h3>
            </div>

            <div className="space-y-8">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="group relative pl-6 border-l-2 border-border/50 hover:border-accent/50 transition-colors duration-300"
                >
                  <div className="absolute left-0 top-0 w-2 h-2 -translate-x-[5px] rounded-full bg-border group-hover:bg-accent transition-colors duration-300" />
                  <span className="text-xs text-accent tracking-wider">{item.year}</span>
                  <h4 className="font-medium text-foreground mt-1">{item.role}</h4>
                  <p className="text-sm text-muted-foreground">{item.company}</p>
                </motion.div>
              ))}
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
