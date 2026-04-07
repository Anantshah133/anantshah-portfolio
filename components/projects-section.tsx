"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowUpRight, Github, Globe } from "lucide-react"
import { SectionTitle } from "./section-title"

const projects = [
  {
    title: "Healhub",
    category: "Hospital Management System",
    description: "A full-stack MERN hospital management system handling patients, doctors, and admins. Features real-time appointment scheduling and secure role-based access.",
    tags: ["React", "Express", "Node.js", "MongoDB", "Tailwind", "JWT", "Cloudinary"],
    image: "/healhub-project-1-img.png",
    githubUrl: "https://github.com/Anantshah133/healhub",
    liveUrl: "#",
  },
  {
    title: "Orpel Complaint Tracker",
    category: "Complaint Tracking System",
    description: "A specialized complaint management system for tracking customer issues across regions. Features automated notifications and streamlined backend logic.",
    tags: ["PHP", "MySQL", "Tailwind", "Alpine.js"],
    image: "/orpel-project-2-img.png",
    githubUrl: "https://github.com/Anantshah133/Onelife-dashboard",
    liveUrl: "#",
  },
  {
    title: "As Store",
    category: "Stock management system",
    description: "A real-time stock management portal for efficient retail inventory. Dual-role setup ensures centralized control and reduces manual coordination delays.",
    tags: ["PHP", "MySQL", "Tailwind", "Bootstrap", "Alpine.js"],
    image: "/asstore-project-3-img.png",
    githubUrl: "https://github.com/Anantshah133/pinky-sales",
    liveUrl: "https://pragmanxt.com/asstore.in/index.php",
  },
]

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      {/* Smoky background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-0 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[100px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[80px]"
          animate={{
            x: [0, -80, 0],
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div ref={containerRef} className="relative max-w-6xl mx-auto">
        <SectionTitle subtitle="Selected Work" title="Projects That" highlight="Speak" isInView={isInView} />

        {/* Projects Grid - Editorial Layout */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              className="relative p-8 md:p-12 rounded-3xl border border-accent/10 bg-card/10 backdrop-blur-md overflow-hidden group cursor-pointer grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-16 items-center"
            >
              {/* Ancient Decorative Corners for Card */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-accent/20 rounded-tl-xl opacity-50 pointer-events-none" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-accent/20 rounded-tr-xl opacity-50 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-accent/20 rounded-bl-xl opacity-50 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-accent/20 rounded-br-xl opacity-50 pointer-events-none" />
              
              {/* Image Container with Data Cursor */}
              <div
                data-cursor="View Project"
                className={`relative aspect-4/3 rounded-2xl shadow-xl shadow-black/40 overflow-hidden ${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}
              >
                <div className="absolute inset-0 bg-card border border-border/50" />
                <motion.div
                  className="absolute inset-0"
                  animate={hoveredProject === index ? { scale: 1.05, opacity: 1 } : { scale: 1, opacity: 0.8 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  animate={hoveredProject === index ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
                {/* Golden corner accents */}
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/60 rounded-tr-lg"
                  initial={{ opacity: 0 }}
                  animate={hoveredProject === index ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent/60 rounded-bl-lg"
                  initial={{ opacity: 0 }}
                  animate={hoveredProject === index ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />

                {/* Project number indicator */}
                <div className="absolute top-4 left-4 font-mono text-xs text-accent/60">0{index + 1}</div>
              </div>

              {/* Content */}
              <div className={`flex flex-col justify-center ${index % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                <span className="text-accent/70 text-xs tracking-[0.2em] uppercase">{project.category}</span>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mt-3 mb-4 text-foreground group-hover:text-accent/90 transition-colors duration-500">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 max-w-md">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-full text-[11px] tracking-widest capitalize text-accent/80 bg-accent/5 border border-accent/20 hover:bg-accent/15 hover:border-accent/50 hover:text-accent transition-all duration-300 shadow-[inset_0_0_8px_rgba(201,169,98,0.02)] hover:shadow-[0_0_12px_rgba(201,169,98,0.15)] cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-6 mt-2">
                  {
                    project.liveUrl !== "#" && (
                      <motion.a
                        href={project.liveUrl}
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground bg-primary/10 border border-primary/20 px-6 py-2.5 rounded-full shadow-[0_0_10px_rgba(69,160,150,0.1)] hover:shadow-[0_0_20px_rgba(69,160,150,0.2)] hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 group/link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Live Preview</span>
                        <Globe className="w-4 h-4 transition-transform duration-300 group-hover/link:rotate-12 group-hover/link:scale-110" />
                      </motion.a>
                    )
                  }

                  <motion.a
                    href={project.githubUrl}
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group/git relative"
                    whileHover={{ x: 2 }}
                  >
                    <Github className="w-4 h-4 transition-transform duration-300 group-hover/git:-translate-y-0.5 group-hover/git:text-accent" />
                    <span className="group-hover/git:text-accent transition-colors duration-300">View Code</span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-px bg-accent/50"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
