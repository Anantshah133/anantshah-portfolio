"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { SectionTitle } from "./section-title"

const projects = [
  {
    title: "Lumina",
    category: "SaaS Platform",
    description: "A meditation app blending ancient mindfulness with modern interface design.",
    tags: ["Next.js", "Supabase", "AI"],
    image: "/meditation-app-dark-minimal-interface.jpg",
  },
  {
    title: "Vertex",
    category: "E-Commerce",
    description: "Premium furniture brand with immersive 3D product visualization.",
    tags: ["Three.js", "Shopify", "React"],
    image: "/luxury-furniture-ecommerce-dark-minimal.jpg",
  },
  {
    title: "Chronicle",
    category: "Editorial Platform",
    description: "Long-form publishing platform focused on typography and reading experience.",
    tags: ["TypeScript", "MDX", "Tailwind"],
    image: "/editorial-blog-platform-dark-elegant-typography.jpg",
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
              className={`group grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                index % 2 === 1 ? "md:grid-flow-col-dense" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative aspect-[4/3] rounded-xl overflow-hidden ${
                  index % 2 === 1 ? "md:col-start-2" : ""
                }`}
              >
                <div className="absolute inset-0 bg-card border border-border/50" />
                <motion.div
                  className="absolute inset-0"
                  animate={hoveredProject === index ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                </motion.div>
                {/* Overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
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
              <div className={`${index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}`}>
                <span className="text-accent/70 text-xs tracking-[0.2em] uppercase">{project.category}</span>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mt-3 mb-4 text-foreground group-hover:text-accent/90 transition-colors duration-500">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 max-w-md">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs bg-muted/50 text-muted-foreground border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Link with golden underline */}
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-accent transition-colors duration-300 group/link relative"
                  whileHover={{ x: 4 }}
                >
                  <span>View Project</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px bg-accent"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
