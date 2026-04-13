"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { SectionDivider } from "@/components/section-divider"
import { ArrowUpRight, ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const blogs = [
  {
    id: 1,
    slug: "how-to-think-like-developer",
    category: "Development",
    readTime: "8 min read",
    date: "Apr 07, 2026",
    title: "How to Think Like a Developer (Problem Solving Mindset Guide)",
    excerpt:
      "Thinking like a developer is not about syntax. It is about breaking problems into smaller parts, recognizing patterns, and solving them step by step with a debugging mindset.",
    tag: "Mindset",
    featured: true,
    image: "/blog-1-ancient-design.jpg",
  },
  {
    id: 2,
    slug: "become-top-1-percent-developer-2026",
    category: "Career",
    readTime: "10 min read",
    date: "Apr 07, 2026",
    title: "How to Become a Top 1% Developer in 2026 (Real Roadmap)",
    excerpt:
      "Top developers are not defined by knowledge, but by execution. They build, ship, and iterate faster. Here is a practical roadmap to join the top 1% in 2026.",
    tag: "Career",
    featured: false,
    image: "/blog-2-intention-code.jpg",
  },
  {
    id: 3,
    slug: "how-rest-api-works",
    category: "Backend",
    readTime: "12 min read",
    date: "Apr 07, 2026",
    title: "How REST APIs Work: Complete Guide with Real Backend Flow",
    excerpt:
      "A REST API allows communication between client and server using HTTP methods. Understand the full request lifecycle from routing to database and back.",
    tag: "Backend",
    featured: false,
    image: "/blog-3-whitespace.jpg",
  },
  {
    id: 4,
    slug: "react-performance-optimization",
    category: "Development",
    readTime: "11 min read",
    date: "Apr 07, 2026",
    title: "React Performance Optimization: 10 Techniques Every Developer Must Know",
    excerpt:
      "Slow apps kill user experience. Performance is not optional. Learn 10 powerful React optimization techniques including memoization, lazy loading, and code splitting.",
    tag: "React",
    featured: false,
    image: "/blog-4-react-scale.jpg",
  },
  {
    id: 5,
    slug: "debounce-vs-throttle",
    category: "JavaScript",
    readTime: "9 min read",
    date: "Apr 07, 2026",
    title: "Debouncing vs Throttling in JavaScript (When & Why to Use Each)",
    excerpt:
      "Debouncing delays execution until the user stops triggering an event. Throttling ensures a function runs at fixed intervals. Know when and why to use each.",
    tag: "JavaScript",
    featured: false,
    image: "/blog-5-hero-sections.jpg",
  },
  {
    id: 6,
    slug: "ai-impact-on-developers-2026",
    category: "Technology",
    readTime: "10 min read",
    date: "Apr 07, 2026",
    title: "Impact of AI on Developers in 2026: How It's Changing the Game",
    excerpt:
      "AI tools can now generate code, debug issues, and even design systems. But system design, critical thinking, and decision making remain irreplaceable.",
    tag: "AI",
    featured: false,
    image: "/professional-developer-portrait-dark-minimal.jpg",
  },
]

const categories = ["All", "Development", "Career", "Backend", "JavaScript", "Technology"]

export default function BlogsPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true })
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = blogs.filter((b) => {
    const matchCat = activeCategory === "All" || b.category === activeCategory
    const matchSearch =
      search.trim() === "" ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = filtered.find((b) => b.featured) ?? filtered[0]
  const rest = filtered.filter((b) => b.id !== featured?.id)

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="ancient-overlay" />
      <Navigation />

      {/* Header */}
      <div ref={headerRef} className="pt-36 pb-20 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 mb-12"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>
          </motion.div>

          {/* Title block */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <p className="flex items-center gap-3 text-sm tracking-[0.3em] uppercase text-primary mb-4">
                <span className="relative w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-accent" />
                  <span className="absolute inset-0 rounded-full bg-accent blur-sm opacity-60" />
                  <span className="absolute -inset-1 rounded-full bg-accent/20 blur-md" />
                </span>
                Writings &amp; Reflections
                <span className="relative w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-accent" />
                  <span className="absolute inset-0 rounded-full bg-accent blur-sm opacity-60" />
                  <span className="absolute -inset-1 rounded-full bg-accent/20 blur-md" />
                </span>
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-balance">
                All <span className="italic text-primary">Writings</span>
              </h1>
              <p className="text-accent/30 font-serif text-sm tracking-widest mt-2">॥ सर्व विचार ॥</p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative w-full md:w-72"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search writings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/40 focus:bg-card/80 transition-all duration-300"
              />
            </motion.div>
          </div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex items-center gap-3 flex-wrap"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-1.5 rounded-full text-xs tracking-widest uppercase transition-all duration-300 border ${activeCategory === cat
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      <SectionDivider />

      {/* Content */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Featured post */}
          {featured && <FeaturedCard blog={featured} />}

          {/* Grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((blog, i) => (
                <SmallCard key={blog.id} blog={blog} index={i} />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <p className="font-serif text-3xl font-light text-muted-foreground/50">No writings found</p>
              <p className="text-sm text-muted-foreground/40">Try a different search or category</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function FeaturedCard({ blog }: { blog: (typeof blogs)[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group"
    >
      <Link href={`/blogs/${blog.slug}`}>
        <div className="relative border border-border rounded-xl overflow-hidden bg-card/40 backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:-translate-y-1 hover:shadow-[0_30px_80px_-20px_rgba(13,26,26,0.9)]">
          {/* Ambient glow */}
          <div className={`absolute inset-0 bg-linear-to-br from-primary/6 via-transparent to-accent/3 transition-opacity duration-700 pointer-events-none ${hovered ? "opacity-100" : "opacity-0"}`} />

          {/* Top hairline */}
          <div className={`absolute top-0 left-12 right-12 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent transition-opacity duration-500 z-10 ${hovered ? "opacity-100" : "opacity-0"}`} />

          <div className="relative grid md:grid-cols-2">
            {/* Image side */}
            <div className="relative h-64 md:h-auto md:min-h-[400px] overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-card md:bg-linear-to-r md:from-transparent md:to-card" />
              <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent md:hidden" />
              {/* Corner ornaments */}
              <div className={`absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-accent/60 transition-all duration-500 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} />
              <div className={`absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-accent/60 transition-all duration-500 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} />
              {/* Featured watermark */}
              <span className="absolute bottom-6 right-6 font-serif text-8xl font-light text-white/10 select-none leading-none">I</span>
            </div>

            {/* Content side */}
            <div className="relative p-10 md:p-14 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-accent/80 border border-accent/25 rounded-full px-3 py-0.5 font-mono tracking-wider bg-accent/5">
                    {blog.tag}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">{blog.readTime}</span>
                  <span className="text-xs text-muted-foreground/50 font-mono">{blog.date}</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-light leading-snug text-foreground text-balance">
                  {blog.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{blog.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all duration-300">
                  Read this writing
                  <ArrowUpRight className="w-4 h-4 group-hover:text-accent transition-colors duration-300" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function SmallCard({ blog, index }: { blog: (typeof blogs)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const [hovered, setHovered] = useState(false)
  const numerals = ["II", "III", "IV", "V", "VI", "VII"]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group"
    >
      <Link href={`/blogs/${blog.slug}`} className="block h-full">
        <div className="relative h-full border border-border rounded-lg bg-card/40 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-accent/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(13,26,26,0.8)]">
          {/* Image */}
          <div className="relative h-44 overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />
            <span className="absolute top-4 right-5 font-serif text-4xl font-light text-white/20 select-none transition-colors duration-500 group-hover:text-accent/30 leading-none drop-shadow-lg">
              {numerals[index] ?? ""}
            </span>
            {/* Corner ornaments */}
            <div className={`absolute top-3 left-3 w-4 h-4 border-l border-t border-accent/60 transition-all duration-500 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} />
            <div className={`absolute top-3 right-3 w-4 h-4 border-r border-t border-accent/60 transition-all duration-500 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} />
          </div>

          <div className={`absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent transition-opacity duration-700 pointer-events-none ${hovered ? "opacity-100" : "opacity-0"}`} />
          <div className={`absolute top-44 left-6 right-6 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`} />

          <div className="relative flex flex-col h-[calc(100%-11rem)] gap-4 p-6">
            <div className="flex items-center gap-3">
              <span className="text-xs text-accent/80 border border-accent/20 rounded-full px-3 py-0.5 font-mono tracking-wider bg-accent/5">
                {blog.tag}
              </span>
              <span className="text-xs text-muted-foreground">{blog.readTime}</span>
            </div>
            <h3 className="font-serif text-lg font-light leading-snug text-foreground/90 group-hover:text-foreground transition-colors duration-300 text-pretty line-clamp-2">
              {blog.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">{blog.excerpt}</p>
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <span className="text-xs text-muted-foreground/60 font-mono">{blog.date}</span>
              <span className="flex items-center gap-1.5 text-xs text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-400">
                Read more
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
