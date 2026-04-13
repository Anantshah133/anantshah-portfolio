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
    slug: "how-to-think-like-developer",
    category: "Development",
    readTime: "8 min read",
    date: "Apr 07, 2026",
    title: "How to Think Like a Developer (Problem Solving Mindset Guide)",
    metaTitle: "How to Think Like a Developer - Problem Solving Guide for Programmers",
    metaDescription:
      "Learn how to think like a developer with practical problem-solving techniques, debugging strategies, and real-world examples.",
    excerpt:
      "Thinking like a developer is not about syntax. It is about breaking problems into smaller parts, recognizing patterns, and solving them step by step with a debugging mindset.",
    keywords: ["developer mindset", "problem solving programming", "how to think like programmer"],
    tag: "Mindset",
    image: "/blog-1-ancient-design.jpg",
    featured: true,
    headings: [
      "What Does It Mean to Think Like a Developer?",
      "Breaking Down Problems",
      "Pattern Recognition",
      "Debugging Mindset",
      "Real World Thinking Example",
    ],
    content: `
<h2>What Does It Mean to Think Like a Developer?</h2>
<p>Thinking like a developer is not about syntax. It is about breaking problems into smaller parts and solving them step by step.</p>

<h2>Breaking Down Problems</h2>
<p>Every complex system is just a collection of smaller problems. The best developers don't jump to coding — they decompose.</p>

<h2>Pattern Recognition</h2>
<p>Top developers don't solve problems from scratch every time. They recognize patterns like loops, recursion, or data structures.</p>

<h2>Debugging Mindset</h2>
<p>Debugging is where real developers are made. Instead of guessing, isolate variables, test assumptions, and trace execution.</p>

<h2>Real World Thinking Example</h2>
<p>Think of building a login system: input → validation → authentication → response. This structured thinking is everything.</p>
`,
  },

  {
    id: 2,
    slug: "become-top-1-percent-developer-2026",
    category: "Career",
    readTime: "10 min read",
    date: "Apr 07, 2026",
    title: "How to Become a Top 1% Developer in 2026 (Real Roadmap)",
    metaTitle: "Top 1% Developer Roadmap 2026 - Skills, Projects, Strategy",
    metaDescription:
      "A practical roadmap to become a top 1% developer in 2026 with skills, projects, and real-world strategies.",
    excerpt:
      "Top developers are not defined by knowledge, but by execution. They build, ship, and iterate faster. Here is a practical roadmap to join the top 1% in 2026.",
    keywords: ["top developer roadmap", "how to become best developer", "developer growth 2026"],
    tag: "Career",
    image: "/blog-2-intention-code.jpg",
    featured: false,
    headings: [
      "What Separates Top 1% Developers",
      "Core Skills You Must Master",
      "Project-Based Learning",
      "Consistency Over Motivation",
      "Leveraging AI as a Tool",
    ],
    content: `
<h2>What Separates Top 1% Developers</h2>
<p>Top developers are not defined by knowledge, but by execution. They build, ship, and iterate faster.</p>

<h2>Core Skills You Must Master</h2>
<p>JavaScript fundamentals, system design basics, and debugging are non-negotiable.</p>

<h2>Project-Based Learning</h2>
<p>Stop consuming tutorials. Build real-world systems like authentication, dashboards, and APIs.</p>

<h2>Consistency Over Motivation</h2>
<p>Motivation fades. Systems win. Daily focused work compounds massively.</p>

<h2>Leveraging AI as a Tool</h2>
<p>AI will not replace developers. Developers using AI will replace those who don't.</p>
`,
  },

  {
    id: 3,
    slug: "how-rest-api-works",
    category: "Backend",
    readTime: "12 min read",
    date: "Apr 07, 2026",
    title: "How REST APIs Work: Complete Guide with Real Backend Flow",
    metaTitle: "How REST APIs Work - Backend Flow Explained with Examples",
    metaDescription:
      "Understand how REST APIs work with real backend flow including request lifecycle, routing, controllers, and database interaction.",
    excerpt:
      "A REST API allows communication between client and server using HTTP methods. Understand the full request lifecycle from routing to database and back.",
    keywords: ["rest api tutorial", "backend flow explained", "api working"],
    tag: "Backend",
    image: "/blog-3-whitespace.jpg",
    featured: false,
    headings: [
      "What is a REST API?",
      "Request Lifecycle",
      "Routing and Controllers",
      "Database Interaction",
      "Real World Flow",
    ],
    content: `
<h2>What is a REST API?</h2>
<p>A REST API allows communication between client and server using HTTP methods like GET, POST, PUT, DELETE.</p>

<h2>Request Lifecycle</h2>
<p>Client → Server → Route → Controller → Database → Response.</p>

<h2>Routing and Controllers</h2>
<p>Routes define endpoints. Controllers handle logic. This separation keeps code clean.</p>

<h2>Database Interaction</h2>
<p>Controllers interact with databases using queries or ORM tools.</p>

<h2>Real World Flow</h2>
<p>Login request: client sends credentials → server validates → JWT generated → response sent.</p>
`,
  },

  {
    id: 4,
    slug: "react-performance-optimization",
    category: "Development",
    readTime: "11 min read",
    date: "Apr 07, 2026",
    title: "React Performance Optimization: 10 Techniques Every Developer Must Know",
    metaTitle: "React Performance Optimization Guide - Improve Speed & Efficiency",
    metaDescription:
      "Learn 10 powerful React performance optimization techniques including memoization, lazy loading, and efficient rendering.",
    excerpt:
      "Slow apps kill user experience. Performance is not optional. Learn 10 powerful React optimization techniques including memoization, lazy loading, and code splitting.",
    keywords: ["react performance", "optimize react app", "react best practices"],
    tag: "React",
    image: "/blog-4-react-scale.jpg",
    featured: false,
    headings: [
      "Why Performance Matters",
      "1. Avoid Unnecessary Re-renders",
      "2. useMemo and useCallback",
      "3. Lazy Loading",
      "4. Code Splitting",
      "5. Virtualize Long Lists",
      "6. Optimize Images and Media",
      "7. Avoid Inline Functions in JSX",
      "8. Use React Fragments",
      "9. Debounce Expensive Operations",
      "10. Profile with React DevTools",
    ],
    content: `
<h2>Why Performance Matters</h2>
<p>Slow apps kill user experience. Performance is not optional. Users expect instant feedback, and even a 100ms delay can feel sluggish. Optimizing your React app is a responsibility, not a luxury.</p>

<h2>1. Avoid Unnecessary Re-renders</h2>
<p>Use React.memo to wrap components that receive the same props frequently. Combine it with proper state management — keep state as close to where it is used as possible to avoid re-rendering unrelated components.</p>

<h2>2. useMemo and useCallback</h2>
<p>useMemo caches the result of expensive calculations so they are not re-computed on every render. useCallback caches function references so child components wrapped in React.memo do not re-render unnecessarily.</p>

<h2>3. Lazy Loading</h2>
<p>Load components only when needed using React.lazy and Suspense. This keeps your initial bundle small and speeds up the first meaningful paint. Ideal for routes, modals, and below-the-fold content.</p>

<h2>4. Code Splitting</h2>
<p>Split bundles to reduce initial load time. Use dynamic imports to create separate chunks for different parts of your app. Tools like webpack-bundle-analyzer help identify what is bloating your bundle.</p>

<h2>5. Virtualize Long Lists</h2>
<p>Rendering thousands of DOM nodes kills performance. Use libraries like react-window or react-virtuoso to render only the items visible in the viewport. This keeps scroll performance smooth even with massive datasets.</p>

<h2>6. Optimize Images and Media</h2>
<p>Use next/image or similar components for automatic image optimization, lazy loading, and responsive sizing. Serve modern formats like WebP and AVIF. Compress assets and use CDNs to reduce load times.</p>

<h2>7. Avoid Inline Functions in JSX</h2>
<p>Defining functions directly inside JSX creates a new function reference on every render, which can break memoization. Extract handlers into named functions or use useCallback to maintain stable references.</p>

<h2>8. Use React Fragments</h2>
<p>Avoid unnecessary wrapper divs by using React.Fragment or the shorthand syntax. Extra DOM nodes increase memory usage, slow down rendering, and can cause unexpected layout issues with CSS.</p>

<h2>9. Debounce Expensive Operations</h2>
<p>For search inputs, resize handlers, and API calls triggered by user input, use debouncing to limit how often expensive operations run. This prevents performance bottlenecks during rapid user interactions.</p>

<h2>10. Profile with React DevTools</h2>
<p>Never optimize blindly. Use the React DevTools Profiler to identify which components re-render most often and which renders are slowest. Measure first, then optimize the actual bottlenecks — not what you assume is slow.</p>
`,
  },

  {
    id: 5,
    slug: "debounce-vs-throttle",
    category: "JavaScript",
    readTime: "9 min read",
    date: "Apr 07, 2026",
    title: "Debouncing vs Throttling in JavaScript (When & Why to Use Each)",
    metaTitle: "Debounce vs Throttle Explained - JavaScript Performance Guide",
    metaDescription:
      "Understand debouncing and throttling in JavaScript with real-world examples and performance use cases.",
    excerpt:
      "Debouncing delays execution until the user stops triggering an event. Throttling ensures a function runs at fixed intervals. Know when and why to use each.",
    keywords: ["debounce vs throttle", "javascript performance", "event optimization"],
    tag: "JavaScript",
    image: "/blog-5-hero-sections.jpg",
    featured: false,
    headings: [
      "What is Debouncing?",
      "What is Throttling?",
      "Key Differences",
      "Real Use Cases",
    ],
    content: `
<h2>What is Debouncing?</h2>
<p>Debouncing delays execution until the user stops triggering an event.</p>

<h2>What is Throttling?</h2>
<p>Throttling ensures a function runs at fixed intervals.</p>

<h2>Key Differences</h2>
<p>Debounce waits. Throttle limits.</p>

<h2>Real Use Cases</h2>
<p>Debounce: search input. Throttle: scroll events.</p>
`,
  },

  {
    id: 6,
    slug: "ai-impact-on-developers-2026",
    category: "Technology",
    readTime: "10 min read",
    date: "Apr 07, 2026",
    title: "Impact of AI on Developers in 2026: How It's Changing the Game",
    metaTitle: "AI Impact on Developers 2026 - Future of Programming",
    metaDescription:
      "Explore how AI is transforming software development in 2026 and what developers must do to stay ahead.",
    excerpt:
      "AI tools can now generate code, debug issues, and even design systems. But system design, critical thinking, and decision making remain irreplaceable.",
    keywords: ["ai for developers", "future of programming", "ai impact 2026"],
    tag: "AI",
    image: "/professional-developer-portrait-dark-minimal.jpg",
    featured: false,
    headings: [
      "Rise of AI in Development",
      "What AI Can Replace",
      "What AI Cannot Replace",
      "How Developers Should Adapt",
    ],
    content: `
<h2>Rise of AI in Development</h2>
<p>AI tools can now generate code, debug issues, and even design systems.</p>

<h2>What AI Can Replace</h2>
<p>Boilerplate code, repetitive tasks, and basic debugging.</p>

<h2>What AI Cannot Replace</h2>
<p>System design, critical thinking, and decision making.</p>

<h2>How Developers Should Adapt</h2>
<p>Use AI as leverage, not dependency. Focus on fundamentals and architecture.</p>
`,
  },
];

const VISIBLE = 3

export function BlogsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const totalSlides = Math.ceil(blogs.length / VISIBLE)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  const paginate = (dir: number) => {
    const next = currentSlide + dir
    if (next < 0 || next >= totalSlides) return
    setDirection(dir)
    setCurrentSlide(next)
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
              key={currentSlide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {blogs.slice(currentSlide * VISIBLE, (currentSlide * VISIBLE) + VISIBLE).map((blog, i) => (
                <BlogCard key={blog.id} blog={blog} index={i} numeral={romanNumerals[blog.id - 1]} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation row */}
          <div className="flex items-center justify-between mt-14">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > currentSlide ? 1 : -1); setCurrentSlide(i) }}
                  className="relative h-px transition-all duration-500 focus:outline-none"
                  style={{ width: i === currentSlide ? 32 : 16 }}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <div
                    className={`absolute inset-0 transition-colors duration-500 ${i === currentSlide
                      ? "bg-accent"
                      : "bg-border hover:bg-muted-foreground"
                      }`}
                  />
                  {i === currentSlide && (
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
                disabled={currentSlide === 0}
                className="group w-11 h-11 border border-border rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-25 hover:border-accent/50 hover:bg-accent/5"
                aria-label="Previous blogs"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(1)}
                disabled={currentSlide === totalSlides - 1}
                className="group w-11 h-11 border border-border rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-25 hover:border-accent/50 hover:bg-accent/5"
                aria-label="Next blogs"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
              </motion.button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="flex justify-center mt-16"
        >
          <Link
            href="/blogs"
            className="group relative flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-full font-medium text-sm tracking-widest uppercase hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(69,160,150,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 overflow-hidden"
          >
            <span className="relative">View All Writings</span>
            <ArrowUpRight className="relative w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
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
