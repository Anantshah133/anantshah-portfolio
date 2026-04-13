"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { SectionDivider } from "@/components/section-divider"
import { ArrowLeft, Clock, Calendar, Tag, Share2, Bookmark, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

const blogsData: Record<string, {
  id: number
  slug: string
  category: string
  readTime: string
  date: string
  title: string
  excerpt: string
  tag: string
  image: string
  content: string[]
}> = {
  "how-to-think-like-developer": {
    id: 1,
    slug: "how-to-think-like-developer",
    category: "Development",
    readTime: "8 min read",
    date: "Apr 07, 2026",
    title: "How to Think Like a Developer (Problem Solving Mindset Guide)",
    excerpt: "Thinking like a developer is not about syntax. It is about breaking problems into smaller parts and solving them step by step.",
    tag: "Mindset",
    image: "/blog-1-ancient-design.jpg",
    content: [
      "Thinking like a developer is not about syntax. It is about breaking problems into smaller parts and solving them step by step. This guide will walk you through the core mental frameworks every developer needs.",
      "Many aspiring developers focus heavily on learning syntax, frameworks, and tools. While these are important, they are not what separates good developers from great ones. The real differentiator is the ability to think systematically about problems.",
      "## What Does It Mean to Think Like a Developer?",
      "At its core, thinking like a developer means approaching problems with structure, logic, and patience. It means resisting the urge to jump straight to code and instead taking time to understand the problem fully.",
      "A developer's mindset is built on curiosity. When something breaks, a developer does not panic — they investigate. They ask: what changed? What is the expected behavior? What is the actual behavior? This systematic curiosity is the foundation of all problem solving.",
      "## Breaking Down Problems",
      "Every complex system is just a collection of smaller problems. The best developers don't jump to coding — they decompose. They take a large, intimidating problem and break it into smaller, manageable pieces.",
      "This process of decomposition is perhaps the most valuable skill in software development. A feature that seems impossible to build becomes achievable when you break it into ten smaller tasks, each of which is straightforward.",
      "## Pattern Recognition",
      "Top developers don't solve problems from scratch every time. They recognize patterns like loops, recursion, or data structures. They see similarities between new problems and ones they have solved before.",
      "Pattern recognition develops with experience, but you can accelerate it by studying common algorithms and data structures. Every time you solve a problem, ask yourself: where else could this pattern apply?",
      "## Debugging Mindset",
      "Debugging is where real developers are made. Instead of guessing, isolate variables, test assumptions, and trace execution. A methodical approach to debugging saves hours of frustration.",
      "The key insight about debugging is that the bug is never where you think it is. If it were, you would have already found it. This means you need to question your assumptions and verify each step of the process.",
      "## Real World Thinking Example",
      "Think of building a login system: input → validation → authentication → response. This structured thinking is everything. By mapping out the flow before writing code, you can identify edge cases, potential security issues, and performance bottlenecks.",
      "This approach applies to every project, from a simple to-do app to a complex distributed system. The scale changes, but the methodology remains the same: understand, decompose, plan, implement, verify."
    ]
  },
  "become-top-1-percent-developer-2026": {
    id: 2,
    slug: "become-top-1-percent-developer-2026",
    category: "Career",
    readTime: "10 min read",
    date: "Apr 07, 2026",
    title: "How to Become a Top 1% Developer in 2026 (Real Roadmap)",
    excerpt: "Top developers are not defined by knowledge, but by execution. They build, ship, and iterate faster.",
    tag: "Career",
    image: "/blog-2-intention-code.jpg",
    content: [
      "Top developers are not defined by knowledge, but by execution. They build, ship, and iterate faster. This is a practical roadmap to becoming a top 1% developer in 2026.",
      "The software industry is more competitive than ever, but it is also more accessible. The tools, resources, and communities available today would have been unimaginable a decade ago. The question is not whether you can become exceptional — it is whether you will put in the work.",
      "## What Separates Top 1% Developers",
      "Top developers share common traits: they ship consistently, they learn from production, and they communicate effectively. They do not just write code — they solve business problems through code.",
      "The gap between good and great is not about knowing more languages or frameworks. It is about depth of understanding, quality of execution, and the ability to make good decisions under pressure.",
      "## Core Skills You Must Master",
      "JavaScript fundamentals, system design basics, and debugging are non-negotiable. These are the foundations upon which everything else is built. Without strong fundamentals, you will always be building on shaky ground.",
      "Beyond technical skills, learn to communicate clearly, write documentation, and collaborate effectively. The best code in the world is worthless if no one can understand or maintain it.",
      "## Project-Based Learning",
      "Stop consuming tutorials. Build real-world systems like authentication, dashboards, and APIs. Tutorial hell is real, and the only escape is to build something of your own.",
      "Start with projects that solve real problems. Build a tool for yourself, contribute to open source, or create something that helps others. Real projects force you to deal with ambiguity, trade-offs, and edge cases that tutorials never cover.",
      "## Consistency Over Motivation",
      "Motivation fades. Systems win. Daily focused work compounds massively. Set up a system where you write code every day, even if it is just for 30 minutes.",
      "The developers who become exceptional are not the ones with the most talent — they are the ones who show up consistently. They write code on days when they do not feel like it. They push through plateaus. They trust the process.",
      "## Leveraging AI as a Tool",
      "AI will not replace developers. Developers using AI will replace those who don't. Learn to use AI tools effectively — for code generation, debugging, documentation, and learning.",
      "The key is to use AI as leverage, not as a crutch. Understand what the AI generates. Question its suggestions. Use it to accelerate your workflow, not to avoid understanding."
    ]
  },
  "how-rest-api-works": {
    id: 3,
    slug: "how-rest-api-works",
    category: "Backend",
    readTime: "12 min read",
    date: "Apr 07, 2026",
    title: "How REST APIs Work: Complete Guide with Real Backend Flow",
    excerpt: "A REST API allows communication between client and server using HTTP methods like GET, POST, PUT, DELETE.",
    tag: "Backend",
    image: "/blog-3-whitespace.jpg",
    content: [
      "A REST API allows communication between client and server using HTTP methods like GET, POST, PUT, DELETE. This guide walks you through the complete backend flow with real-world examples.",
      "APIs are the backbone of modern software. Every app you use — from social media to banking — relies on APIs to exchange data between the frontend and backend. Understanding how they work is essential for any developer.",
      "## What is a REST API?",
      "REST stands for Representational State Transfer. It is an architectural style that defines a set of constraints for creating web services. RESTful APIs use HTTP protocols and standard methods to perform operations on resources.",
      "The beauty of REST is its simplicity and universality. Any client that can make HTTP requests can communicate with a REST API, regardless of programming language or platform.",
      "## Request Lifecycle",
      "Client → Server → Route → Controller → Database → Response. This is the journey every API request takes. Understanding each step helps you build more robust and efficient systems.",
      "When a client sends a request, the server receives it, matches it to a route, passes it to the appropriate controller, which performs any necessary business logic and database operations, and finally sends back a response.",
      "## Routing and Controllers",
      "Routes define endpoints. Controllers handle logic. This separation keeps code clean and maintainable. Routes are like a table of contents, telling the server where to send each request.",
      "Controllers contain the business logic for each endpoint. They validate input, interact with databases or external services, and format the response. Keeping controllers focused on a single responsibility makes them easier to test and maintain.",
      "## Database Interaction",
      "Controllers interact with databases using queries or ORM tools. ORMs like Prisma, Sequelize, or Mongoose provide a higher-level interface for database operations, reducing boilerplate and improving type safety.",
      "Understanding raw SQL alongside ORM usage gives you the flexibility to optimize queries when needed and debug issues that ORMs might obscure.",
      "## Real World Flow",
      "Login request: client sends credentials → server validates → JWT generated → response sent. This real-world example shows how all the pieces come together in a practical authentication flow.",
      "Security considerations like password hashing, token expiration, and rate limiting are crucial parts of any production API. The flow might look simple, but each step requires careful implementation."
    ]
  },
  "react-performance-optimization": {
    id: 4,
    slug: "react-performance-optimization",
    category: "Development",
    readTime: "11 min read",
    date: "Apr 07, 2026",
    title: "React Performance Optimization: 10 Techniques Every Developer Must Know",
    excerpt: "Slow apps kill user experience. Performance is not optional.",
    tag: "React",
    image: "/blog-4-react-scale.jpg",
    content: [
      "Slow apps kill user experience. Performance is not optional. Users expect instant feedback, and even a 100ms delay can feel sluggish. Optimizing your React app is a responsibility, not a luxury.",
      "React is fast by default, but as applications grow in complexity, performance can degrade if you are not careful. Understanding how React renders and re-renders components is the key to optimization.",
      "## Why Performance Matters",
      "Users expect interfaces to respond instantly. Studies show that even a 100ms delay feels sluggish. A slow app does not just frustrate users — it drives them away. Performance is directly tied to business metrics.",
      "In React, performance issues usually stem from unnecessary re-renders, large bundle sizes, or inefficient data fetching. Identifying which of these is the bottleneck is the first step toward optimization.",
      "## 1. Avoid Unnecessary Re-renders",
      "Use React.memo to wrap components that receive the same props frequently. Combine it with proper state management — keep state as close to where it is used as possible to avoid re-rendering unrelated components.",
      "The key is to keep state as close to where it is used as possible. Lifting state too high in the component tree causes unnecessary re-renders in sibling components that do not need the data.",
      "## 2. useMemo and useCallback",
      "useMemo caches the result of expensive calculations so they are not re-computed on every render. useCallback caches function references so child components wrapped in React.memo do not re-render unnecessarily.",
      "Be careful not to over-use these hooks. They add complexity and memory overhead. Profile first, optimize second. Only memoize when you have measured a real performance improvement.",
      "## 3. Lazy Loading",
      "Load components only when needed using React.lazy and Suspense. This keeps your initial bundle small and speeds up the first meaningful paint. Ideal for routes, modals, and below-the-fold content.",
      "Combine lazy loading with route-based code splitting for maximum impact. Each route loads only the code it needs, keeping the initial load fast regardless of how large the application grows.",
      "## 4. Code Splitting",
      "Split bundles to reduce initial load time. Use dynamic imports to create separate chunks for different parts of your app. Tools like webpack-bundle-analyzer help identify what is bloating your bundle.",
      "Analyze your bundle to identify large dependencies that can be loaded lazily or replaced with lighter alternatives.",
      "## 5. Virtualize Long Lists",
      "Rendering thousands of DOM nodes kills performance. Use libraries like react-window or react-virtuoso to render only the items visible in the viewport.",
      "This keeps scroll performance smooth even with massive datasets. Instead of rendering 10,000 items, you only render the 20 or so that are visible at any given time.",
      "## 6. Optimize Images and Media",
      "Use next/image or similar components for automatic image optimization, lazy loading, and responsive sizing. Serve modern formats like WebP and AVIF.",
      "Compress assets and use CDNs to reduce load times. Images are often the largest assets on a page — optimizing them can cut load times dramatically.",
      "## 7. Avoid Inline Functions in JSX",
      "Defining functions directly inside JSX creates a new function reference on every render, which can break memoization.",
      "Extract handlers into named functions or use useCallback to maintain stable references. This is especially important when passing callbacks to memoized child components.",
      "## 8. Use React Fragments",
      "Avoid unnecessary wrapper divs by using React.Fragment or the shorthand syntax. Extra DOM nodes increase memory usage, slow down rendering, and can cause unexpected layout issues with CSS.",
      "Fragments let you group elements without adding extra nodes to the DOM, keeping your markup clean and your rendering efficient.",
      "## 9. Debounce Expensive Operations",
      "For search inputs, resize handlers, and API calls triggered by user input, use debouncing to limit how often expensive operations run.",
      "This prevents performance bottlenecks during rapid user interactions. Libraries like Lodash provide battle-tested debounce implementations you can use right away.",
      "## 10. Profile with React DevTools",
      "Never optimize blindly. Use the React DevTools Profiler to identify which components re-render most often and which renders are slowest.",
      "Measure first, then optimize the actual bottlenecks — not what you assume is slow. Data-driven optimization always beats guesswork."
    ]
  },
  "debounce-vs-throttle": {
    id: 5,
    slug: "debounce-vs-throttle",
    category: "JavaScript",
    readTime: "9 min read",
    date: "Apr 07, 2026",
    title: "Debouncing vs Throttling in JavaScript (When & Why to Use Each)",
    excerpt: "Debouncing delays execution until the user stops triggering an event. Throttling limits execution rate.",
    tag: "JavaScript",
    image: "/blog-5-hero-sections.jpg",
    content: [
      "Debouncing and throttling are two essential techniques for controlling how frequently a function executes. Understanding when to use each can dramatically improve your application's performance.",
      "Modern web applications respond to many events: scrolling, resizing, typing, mouse movements. Without optimization, these events can trigger expensive calculations hundreds of times per second, causing janky interfaces and poor performance.",
      "## What is Debouncing?",
      "Debouncing delays execution until the user stops triggering an event. Think of it like an elevator door — it waits for people to stop entering before closing. The function only runs after a period of inactivity.",
      "The most common use case is search input. Instead of making an API call on every keystroke, you debounce the search function so it only fires after the user stops typing. This reduces unnecessary API calls and improves performance.",
      "## What is Throttling?",
      "Throttling ensures a function runs at fixed intervals, regardless of how many times the event fires. Think of it like a metronome — it ticks at a consistent rate no matter what.",
      "Scroll handlers are the classic throttling use case. Instead of recalculating layout on every scroll event (which can fire 60+ times per second), you throttle to run at most once every 100-200ms.",
      "## Key Differences",
      "Debounce waits for silence. Throttle limits frequency. Debounce is ideal when you only care about the final value (search input). Throttle is ideal when you want regular updates during continuous activity (scroll position).",
      "Another way to think about it: debounce groups rapid events into one, while throttle spreads them out at regular intervals. Both serve different purposes and choosing the wrong one can lead to either missed events or excessive processing.",
      "## Real Use Cases",
      "Debounce: search input, form validation, API calls on user input, window resize handlers for layout recalculation, autocomplete suggestions.",
      "Throttle: scroll events, mousemove tracking, game loop updates, rate-limiting API requests, progress bar updates during file uploads.",
      "In practice, most UI libraries provide utility functions for both. Libraries like Lodash offer battle-tested implementations. But understanding the underlying concept helps you make the right choice for each situation."
    ]
  },
  "ai-impact-on-developers-2026": {
    id: 6,
    slug: "ai-impact-on-developers-2026",
    category: "Technology",
    readTime: "10 min read",
    date: "Apr 07, 2026",
    title: "Impact of AI on Developers in 2026: How It's Changing the Game",
    excerpt: "AI tools can now generate code, debug issues, and even design systems.",
    tag: "AI",
    image: "/professional-developer-portrait-dark-minimal.jpg",
    content: [
      "AI tools can now generate code, debug issues, and even design systems. The landscape of software development is changing rapidly, and developers who adapt will thrive.",
      "The conversation around AI and development has shifted from speculation to reality. AI-powered tools are now part of the daily workflow for millions of developers. Understanding how to leverage them effectively is no longer optional.",
      "## Rise of AI in Development",
      "AI tools can now generate code, debug issues, and even design systems. From GitHub Copilot to specialized code review bots, AI has become an integral part of the modern development workflow.",
      "These tools are not just autocomplete on steroids. They can understand context, suggest architectural patterns, write tests, and explain complex code. The productivity gains are real and measurable.",
      "## What AI Can Replace",
      "Boilerplate code, repetitive tasks, and basic debugging are increasingly handled by AI. Writing CRUD endpoints, form validation, unit tests for straightforward functions — these are tasks where AI excels.",
      "Documentation generation, code formatting, and routine refactoring are also areas where AI tools save significant time. The pattern is clear: tasks that are repetitive and well-defined are being automated.",
      "## What AI Cannot Replace",
      "System design, critical thinking, and decision making remain uniquely human capabilities. Understanding business requirements, making architectural trade-offs, and navigating team dynamics require human judgment.",
      "Creativity, empathy for users, and the ability to question assumptions are irreplaceable. AI can generate solutions, but it cannot determine which problem to solve or why it matters. These higher-order skills become more valuable as AI handles the routine.",
      "## How Developers Should Adapt",
      "Use AI as leverage, not dependency. Focus on fundamentals and architecture. Developers who understand the foundations can evaluate AI-generated code critically, catch errors, and make informed decisions.",
      "The developers who will thrive are those who pair deep technical knowledge with effective AI usage. They will be dramatically more productive than either humans working alone or AI working without human guidance.",
      "Invest in skills that complement AI: system design, communication, domain expertise, and the ability to transform ambiguous requirements into clear technical plans. These skills amplify the value of AI tools rather than competing with them."
    ]
  }
}

const relatedBlogs = [
  { slug: "how-to-think-like-developer", title: "How to Think Like a Developer", tag: "Mindset", image: "/blog-1-ancient-design.jpg" },
  { slug: "become-top-1-percent-developer-2026", title: "Become a Top 1% Developer", tag: "Career", image: "/blog-2-intention-code.jpg" },
  { slug: "how-rest-api-works", title: "How REST APIs Work", tag: "Backend", image: "/blog-3-whitespace.jpg" },
]

export default function BlogPage() {
  const params = useParams()
  const slug = params.slug as string
  const blog = blogsData[slug]

  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true })
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  if (!blog) {
    return (
      <main className="relative min-h-screen overflow-x-hidden">
        <div className="ancient-overlay" />
        <Navigation />
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-6">
          <h1 className="font-serif text-4xl text-foreground">Writing Not Found</h1>
          <p className="text-muted-foreground">The writing you seek has not yet been inscribed.</p>
          <Link href="/blogs" className="text-primary hover:text-accent transition-colors duration-300">
            Return to all writings
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="ancient-overlay" />

      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-accent/80 z-50 origin-left"
        style={{ width: progressWidth }}
      />

      <Navigation />

      {/* Hero */}
      <div ref={headerRef} className="relative pt-32 pb-16 px-6">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 mb-10"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to All Writings
            </Link>
          </motion.div>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="flex items-center gap-4 flex-wrap mb-6"
          >
            <span className="flex items-center gap-1.5 text-xs text-accent/80 border border-accent/25 rounded-full px-3 py-1 font-mono tracking-wider bg-accent/5">
              <Tag className="w-3 h-3" />
              {blog.tag}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {blog.readTime}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {blog.date}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-foreground text-balance mb-6"
          >
            {blog.title}
          </motion.h1>

          {/* Sanskrit decoration */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-accent/30 font-serif text-sm tracking-widest mb-10"
          >
            ॥ {blog.tag.toLowerCase()} ॥
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex items-center gap-4"
          >
            <button className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
              <Bookmark className="w-4 h-4" />
              Save
            </button>
          </motion.div>
        </div>
      </div>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative max-w-5xl mx-auto px-6 mb-16"
      >
        <div className="relative aspect-[21/9] rounded-xl overflow-hidden border border-border">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          {/* Corner ornaments */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent/40" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent/40" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent/40" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent/40" />
        </div>
      </motion.div>

      <SectionDivider />

      {/* Content */}
      <article className="relative py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {blog.content.map((paragraph, i) => {
            const isHeading = paragraph.startsWith("## ")
            const text = isHeading ? paragraph.replace("## ", "") : paragraph

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                {isHeading ? (
                  <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mt-14 mb-6 relative">
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/40" />
                    {text}
                  </h2>
                ) : (
                  <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                    {text}
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* End ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mt-16"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-accent/40" />
            <span className="font-serif text-accent/40 text-2xl">॥</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-accent/40" />
          </div>
        </motion.div>
      </article>

      <SectionDivider />

      {/* Related posts */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <p className="flex items-center gap-3 text-sm tracking-[0.3em] uppercase text-primary mb-3">
              <span className="relative w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-accent" />
                <span className="absolute inset-0 rounded-full bg-accent blur-sm opacity-60" />
              </span>
              Continue Reading
              <span className="relative w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-accent" />
                <span className="absolute inset-0 rounded-full bg-accent blur-sm opacity-60" />
              </span>
            </p>
            <h2 className="font-serif text-3xl font-light">
              More <span className="italic text-primary">Writings</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBlogs
              .filter((b) => b.slug !== slug)
              .slice(0, 3)
              .map((related, i) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <Link href={`/blogs/${related.slug}`}>
                    <div className="relative border border-border rounded-lg overflow-hidden bg-card/40 backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:-translate-y-1">
                      <div className="relative h-36 overflow-hidden">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      </div>
                      <div className="p-5">
                        <span className="text-xs text-accent/70 font-mono tracking-wider">{related.tag}</span>
                        <h3 className="font-serif text-lg font-light mt-2 text-foreground/90 group-hover:text-foreground transition-colors duration-300 line-clamp-2">
                          {related.title}
                        </h3>
                        <span className="flex items-center gap-1.5 text-xs text-primary mt-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-400">
                          Read
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-serif text-2xl md:text-3xl font-light text-muted-foreground mb-8">
              Have a project that needs this level of <span className="italic text-primary">intention</span>?
            </p>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-accent/40 rounded-full text-sm tracking-widest uppercase text-foreground hover:bg-accent/10 hover:border-accent/60 transition-all duration-500"
            >
              Let&apos;s Create Together
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
