"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { SectionTitle } from "@/components/section-title"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const blogs = [
  {
    id: 1,
    slug: "design-philosophy-ancient-meets-modern",
    category: "Design",
    readTime: "6 min read",
    date: "Mar 12, 2026",
    title: "The Philosophy of Timeless Design: What Ancient Wisdom Teaches Modern Builders",
    excerpt:
      "Every great structure built by ancient civilisations was not merely functional — it was intentional. There is a lesson embedded in stone, in symmetry, in sacred geometry that modern interfaces desperately need.",
    tag: "Philosophy",
    image: "/blog-1-ancient-design.jpg",
  },
  {
    id: 2,
    slug: "building-with-intention",
    category: "Development",
    readTime: "8 min read",
    date: "Feb 28, 2026",
    title: "Building With Intention: Why Every Line of Code Is a Decision",
    excerpt:
      "Most developers write code to make things work. Few write code to make things right. The difference between the two is the difference between a product that survives and one that endures.",
    tag: "Craft",
    image: "/blog-2-intention-code.jpg",
  },
  {
    id: 3,
    slug: "whitespace-is-not-empty",
    category: "UI/UX",
    readTime: "5 min read",
    date: "Feb 14, 2026",
    title: "Whitespace Is Not Empty — It Is Everything",
    excerpt:
      "Silence in music is what gives notes their weight. In the same way, negative space in design is not absence — it is presence. It is breathing room. It is where the eye rests and the mind absorbs.",
    tag: "Design",
    image: "/blog-3-whitespace.jpg",
  },
  {
    id: 4,
    slug: "react-performance-at-scale",
    category: "Development",
    readTime: "10 min read",
    date: "Jan 30, 2026",
    title: "React at Scale: Patterns I Wish I Knew Three Years Ago",
    excerpt:
      "Scaling a React application is less about technology and more about discipline. The patterns that serve you well at 10 components will quietly destroy you at 1000. Here is what I learned the hard way.",
    tag: "Technical",
    image: "/blog-4-react-scale.jpg",
  },
  {
    id: 5,
    slug: "the-art-of-the-first-impression",
    category: "Design",
    readTime: "7 min read",
    date: "Jan 15, 2026",
    title: "The Art of the First Impression: Hero Sections That Actually Hold Attention",
    excerpt:
      "A user decides whether to stay or leave within 3 seconds. That is not a statistic to fear — it is a canvas to work with. The hero section is not a banner. It is a statement of intent.",
    tag: "UI/UX",
    image: "/blog-5-hero-sections.jpg",
  },
  {
    id: 6,
    slug: "typography-as-architecture",
    category: "Design",
    readTime: "6 min read",
    date: "Jan 02, 2026",
    title: "Typography Is Architecture: How Fonts Shape Feeling Before Words",
    excerpt:
      "Before the reader processes meaning, the eye processes form. A serif typeface whispers of centuries. A geometric sans speaks of precision. Typography is not decoration — it is the structure of voice.",
    tag: "Typography",
    image: "/blog-6-typography.jpg",
  },
]

const VISIBLE = 3

export function BlogsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const maxIndex = blogs.length - VISIBLE

  const paginate = (dir: number) => {
    const next = current + dir
    if (next < 0 || next > maxIndex) return
    setDirection(dir)
    setCurrent(next)
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  }

  const romanNumerals = ["I", "II", "III", "IV", "V", "VI"]

  return (
    <section ref={ref} id="blogs" className="relative py-32 px-6 overflow-hidden parchment-edge">
      {/* Ancient ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-primary/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle
          subtitle="Writings & Reflections"
          title="Thoughts Cast in"
          highlight="Words"
          isInView={isInView}
        />

        {/* Decorative Sanskrit label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-center text-accent/30 font-serif text-sm tracking-widest mb-16 -mt-10"
        >
          ॥ विचार ॥
        </motion.p>

        {/* Slider */}
        <div className="relative">
          {/* Cards */}
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {blogs.slice(current, current + VISIBLE).map((blog, i) => (
                <BlogCard key={blog.id} blog={blog} index={i} numeral={romanNumerals[blog.id - 1]} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation row */}
          <div className="flex items-center justify-between mt-14">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className="relative h-px transition-all duration-500 focus:outline-none"
                  style={{ width: i === current ? 32 : 16 }}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <div
                    className={`absolute inset-0 transition-colors duration-500 ${i === current
                        ? "bg-accent"
                        : "bg-border hover:bg-muted-foreground"
                      }`}
                  />
                  {i === current && (
                    <div className="absolute inset-0 bg-accent/40 blur-sm" />
                  )}
                </button>
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(-1)}
                disabled={current === 0}
                className="group w-11 h-11 border border-border rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-25 hover:border-accent/50 hover:bg-accent/5"
                aria-label="Previous blogs"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(1)}
                disabled={current === maxIndex}
                className="group w-11 h-11 border border-border rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-25 hover:border-accent/50 hover:bg-accent/5"
                aria-label="Next blogs"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* View all blogs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="flex justify-center mt-16"
        >
            <Link
              href="/blogs"
              className="group relative flex items-center gap-3 px-8 py-3 border border-border rounded-full text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all duration-500 overflow-hidden"
            >
              {/* Hover fill */}
              <span className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
              <span className="relative">View All Writings</span>
              <ArrowUpRight className="relative w-3.5 h-3.5 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </Link>
        </motion.div>
      </div>
    </section>
  )
}

function BlogCard({ blog, index, numeral }: { blog: (typeof blogs)[0]; index: number; numeral: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      <Link 
        href={`/blogs/${blog.slug}`} 
        className="block h-full"
        data-cursor="Click to read more..."
      >
        <div className="relative h-full border border-border rounded-lg bg-card/40 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-accent/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(13,26,26,0.8)]">

          {/* Image */}
          <div className="relative h-44 overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Image overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />
            {/* Ancient roman numeral — top right watermark */}
            <span className="absolute top-4 right-5 font-serif text-4xl font-light text-white/20 select-none transition-colors duration-500 group-hover:text-accent/30 leading-none drop-shadow-lg">
              {numeral}
            </span>
            {/* Corner ornaments on hover */}
            <div className={`absolute top-3 left-3 w-4 h-4 border-l border-t border-accent/60 transition-all duration-500 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} />
            <div className={`absolute top-3 right-3 w-4 h-4 border-r border-t border-accent/60 transition-all duration-500 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} />
          </div>

          {/* Subtle smoke bg on hover */}
          <div className={`absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent transition-opacity duration-700 pointer-events-none ${hovered ? "opacity-100" : "opacity-0"}`} />

          {/* Top hairline accent */}
          <div className={`absolute top-44 left-6 right-6 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`} />

          <div className="relative flex flex-col h-[calc(100%-11rem)] gap-4 p-6">
            {/* Meta row */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-accent/80 border border-accent/20 rounded-full px-3 py-0.5 font-mono tracking-wider bg-accent/5">
                {blog.tag}
              </span>
              <span className="text-xs text-muted-foreground">{blog.readTime}</span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-lg font-light leading-snug text-foreground/90 group-hover:text-foreground transition-colors duration-300 text-pretty line-clamp-2">
              {blog.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
              {blog.excerpt}
            </p>

            {/* Footer row */}
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
