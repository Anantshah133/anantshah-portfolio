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
  "design-philosophy-ancient-meets-modern": {
    id: 1,
    slug: "design-philosophy-ancient-meets-modern",
    category: "Design",
    readTime: "6 min read",
    date: "Mar 12, 2026",
    title: "The Philosophy of Timeless Design: What Ancient Wisdom Teaches Modern Builders",
    excerpt: "Every great structure built by ancient civilisations was not merely functional — it was intentional.",
    tag: "Philosophy",
    image: "/blog-1-ancient-design.jpg",
    content: [
      "Every great structure built by ancient civilisations was not merely functional — it was intentional. There is a lesson embedded in stone, in symmetry, in sacred geometry that modern interfaces desperately need.",
      "When I walk through the ruins of ancient temples or study the proportions of classical architecture, I am struck not by their age, but by their timelessness. These structures were built with a philosophy that transcended their era. They understood something we often forget: that form follows meaning, not just function.",
      "## The Sacred Geometry of User Experience",
      "The ancients used the golden ratio not because it was trendy, but because it reflected a deep truth about harmony and balance. When we apply these same principles to interface design, something remarkable happens — users feel at ease without knowing why.",
      "Consider the Parthenon. Its columns are not perfectly straight; they curve slightly inward to create the illusion of perfect straightness to the human eye. This is not deception — it is empathy. The architects understood human perception and designed for it.",
      "## Intention Over Decoration",
      "Modern design often confuses decoration with intention. We add gradients, shadows, and animations because we can, not because we should. Ancient builders added nothing without purpose. Every carving told a story. Every proportion served a function.",
      "This is the philosophy I carry into every project: before adding any element, I ask — what does this serve? If the answer is merely aesthetic, it must earn its place through genuine contribution to the experience.",
      "## The Patience of Permanence",
      "Perhaps the most important lesson from ancient design is patience. These structures were built to last centuries. Their creators knew they would never see the full impact of their work. This long-term thinking produces fundamentally different choices.",
      "When we design with permanence in mind, we choose simplicity over complexity. We choose clarity over cleverness. We choose systems over one-off solutions. The result is work that ages gracefully rather than becoming technical debt.",
      "## Applying Ancient Wisdom Today",
      "I am not suggesting we abandon modern tools or return to building with stone. Rather, I propose we adopt the mindset of ancient builders: intentional, patient, and deeply respectful of human experience.",
      "Every pixel we place should carry the weight of consideration that ancient architects gave to every stone. When we build with this philosophy, we create digital experiences that feel not just modern, but timeless."
    ]
  },
  "building-with-intention": {
    id: 2,
    slug: "building-with-intention",
    category: "Development",
    readTime: "8 min read",
    date: "Feb 28, 2026",
    title: "Building With Intention: Why Every Line of Code Is a Decision",
    excerpt: "Most developers write code to make things work. Few write code to make things right.",
    tag: "Craft",
    image: "/blog-2-intention-code.jpg",
    content: [
      "Most developers write code to make things work. Few write code to make things right. The difference between the two is the difference between a product that survives and one that endures.",
      "I learned this lesson early in my career, watching codebases I contributed to crumble under their own weight within months of launch. The code worked — until it didn't. And when it failed, no one could understand why, including the people who wrote it.",
      "## The Weight of Every Decision",
      "Every line of code is a decision. Every variable name, every function boundary, every abstraction — these are not merely technical choices. They are architectural decisions that compound over time.",
      "A poorly named variable costs seconds to write but hours to understand later. A clever shortcut saves minutes today but creates days of debugging tomorrow. The math is simple, yet we consistently choose short-term convenience over long-term clarity.",
      "## Code as Communication",
      "The primary purpose of code is not to instruct machines — it is to communicate with humans. Machines can understand anything; humans are the bottleneck. This realization fundamentally changes how I approach every file I touch.",
      "I write code for the developer who will read it at 3 AM during an outage. I write for the new team member trying to understand the system. I write for my future self, who will have forgotten every clever trick I thought was so important.",
      "## The Craft of Simplicity",
      "Simplicity is not the absence of complexity — it is the management of complexity. A simple system can handle complex problems; a complex system struggles with simple ones.",
      "The craft lies in finding the simplest solution that fully addresses the problem. Not the shortest code, not the most elegant abstraction, but the most understandable approach that works reliably.",
      "## Intention in Practice",
      "Building with intention means pausing before typing. It means sketching architecture before writing implementation. It means asking 'what problem does this solve?' before asking 'how do I build this?'",
      "This approach is slower initially. But the compound returns are immense. Systems built with intention are systems that can evolve. They welcome change rather than resisting it. They make their successors grateful rather than resentful.",
      "## The Long Game",
      "Software that lasts is software built by people playing the long game. Not chasing the latest framework, not optimizing for demo day, but building foundations that support growth.",
      "When I approach a project, I ask: will this decision make sense in five years? Will the next developer thank me or curse me? These questions guide every choice, from architecture to naming conventions."
    ]
  },
  "whitespace-is-not-empty": {
    id: 3,
    slug: "whitespace-is-not-empty",
    category: "UI/UX",
    readTime: "5 min read",
    date: "Feb 14, 2026",
    title: "Whitespace Is Not Empty — It Is Everything",
    excerpt: "Silence in music is what gives notes their weight. In design, negative space serves the same purpose.",
    tag: "Design",
    image: "/blog-3-whitespace.jpg",
    content: [
      "Silence in music is what gives notes their weight. In the same way, negative space in design is not absence — it is presence. It is breathing room. It is where the eye rests and the mind absorbs.",
      "I have watched countless clients ask me to 'fill the empty space' on their interfaces. They see whitespace as wasted real estate, unused potential. But whitespace is never empty — it is always working.",
      "## The Psychology of Space",
      "Our brains process information in chunks. When we encounter a wall of text or a screen packed with elements, we don't see everything — we see chaos. Whitespace creates the boundaries that allow comprehension.",
      "Studies consistently show that appropriate whitespace increases comprehension by up to 20%. This is not aesthetics — it is cognitive science. Space literally helps people think.",
      "## Luxury Is Space",
      "Notice how luxury brands use space. A high-end watch advertisement might show a single timepiece floating in a sea of white. A premium hotel website breathes with generous margins and isolated elements.",
      "This is not coincidence. Space signals value. It says: we do not need to shout. We do not need to cram. We have the confidence to let our content speak for itself.",
      "## Functional Whitespace",
      "Beyond aesthetics and psychology, whitespace serves crucial functional purposes. It creates visual hierarchy, guiding the eye from most important to least important. It groups related elements and separates unrelated ones.",
      "When I design an interface, I think of whitespace as the skeleton that gives the body its shape. Remove it, and everything collapses into an undifferentiated mass.",
      "## The Courage to Subtract",
      "Adding whitespace requires courage. It means leaving things out. It means trusting that less content, presented clearly, is more valuable than more content, presented chaotically.",
      "Every time I resist the urge to fill space, I am making a statement about quality over quantity, clarity over comprehensiveness, user experience over information density.",
      "## Breathing Room for Thought",
      "Ultimately, whitespace is about respect — respect for the user's attention, their cognitive load, their time. When we give content room to breathe, we give users room to think.",
      "The next time you design an interface, before adding another element, ask: what if I added space instead? The answer might surprise you."
    ]
  },
  "react-performance-at-scale": {
    id: 4,
    slug: "react-performance-at-scale",
    category: "Development",
    readTime: "10 min read",
    date: "Jan 30, 2026",
    title: "React at Scale: Patterns I Wish I Knew Three Years Ago",
    excerpt: "The patterns that serve you well at 10 components will quietly destroy you at 1000.",
    tag: "Technical",
    image: "/blog-4-react-scale.jpg",
    content: [
      "Scaling a React application is less about technology and more about discipline. The patterns that serve you well at 10 components will quietly destroy you at 1000. Here is what I learned the hard way.",
      "Three years ago, I inherited a React codebase that had grown from a weekend project to a production application serving millions of users. The architecture that worked at launch had become a labyrinth of prop drilling, unnecessary re-renders, and components that did far too much.",
      "## The Component Responsibility Principle",
      "The single most important lesson: every component should have exactly one reason to change. This sounds obvious until you're staring at a 500-line component that handles data fetching, state management, business logic, and rendering.",
      "Split ruthlessly. A component that fetches data should not format that data. A component that formats data should not decide how to display it. A component that displays data should not know where it came from.",
      "## State Colocation",
      "State should live as close as possible to where it's used. Global state is not a solution — it's a last resort. Every piece of state lifted higher than necessary is a performance cost and a maintenance burden.",
      "Before reaching for Redux or Context, ask: can this state live in the component that uses it? Can it live in a parent that's still close to the usage? Only when the answer is truly 'no' should state become global.",
      "## Memoization Strategy",
      "React.memo, useMemo, and useCallback are not optimizations to sprinkle everywhere — they are tools with specific use cases. Misused, they add complexity without benefit. Used correctly, they prevent catastrophic re-render cascades.",
      "The rule: memoize components that receive non-primitive props and render expensive trees. Memoize calculations that are genuinely expensive. Memoize callbacks passed to memoized children. Otherwise, trust React.",
      "## Data Fetching Patterns",
      "The biggest architectural mistake I see: coupling data fetching to components. This creates components that are impossible to test, impossible to reuse, and impossible to reason about.",
      "Extract data fetching to hooks or services. Let components be pure renderers that receive data as props. This separation enables testing, enables Server Components, and enables the flexibility to change data sources without rewriting UI.",
      "## The Composition Pattern",
      "Inheritance was never React's model, but neither is the god-component that accepts 47 props. Composition — building complex UI from simple, focused pieces — is the pattern that scales.",
      "Instead of a Sidebar component with isCollapsed, hasHeader, headerContent, footerContent props, build SidebarRoot, SidebarHeader, SidebarContent, SidebarFooter. Let consumers compose what they need.",
      "## Performance Budgets",
      "What gets measured gets managed. Set explicit budgets: bundle size, Time to Interactive, re-render counts for key interactions. Make these part of CI. Catch regressions before they ship.",
      "Performance at scale is not about heroic optimizations — it's about preventing slow accumulation of small decisions that each seem harmless but compound into disaster."
    ]
  },
  "the-art-of-the-first-impression": {
    id: 5,
    slug: "the-art-of-the-first-impression",
    category: "Design",
    readTime: "7 min read",
    date: "Jan 15, 2026",
    title: "The Art of the First Impression: Hero Sections That Actually Hold Attention",
    excerpt: "A user decides whether to stay or leave within 3 seconds. That is not a statistic to fear — it is a canvas to work with.",
    tag: "UI/UX",
    image: "/blog-5-hero-sections.jpg",
    content: [
      "A user decides whether to stay or leave within 3 seconds. That is not a statistic to fear — it is a canvas to work with. The hero section is not a banner. It is a statement of intent.",
      "I have studied thousands of hero sections, from startups to Fortune 500 companies. The patterns that work share common DNA, while the patterns that fail share common mistakes. Let me break down both.",
      "## The Clarity Imperative",
      "Within three seconds, a visitor should understand: what this is, who it's for, and why they should care. Not everything about the product — just enough to earn the next scroll.",
      "The mistake I see most often: trying to say everything at once. The hero becomes a wall of text, features, and calls to action. The result is that nothing gets communicated effectively.",
      "## Visual Hierarchy in Action",
      "A hero section has one job: guide the eye to the most important message first. This requires ruthless prioritization. You cannot have three equally weighted headlines. You cannot have five calls to action.",
      "One headline. One supporting line. One primary action. Everything else is secondary or absent entirely. This constraint is not limitation — it is focus.",
      "## The Emotional Hook",
      "Logic convinces; emotion decides. The hero section should make visitors feel something before they think something. This is where imagery, color, and copywriting tone work together.",
      "What do you want visitors to feel? Curious? Excited? Relieved? Ambitious? Design every element to evoke that specific emotion. Vague feelings produce vague results.",
      "## Motion With Purpose",
      "Animation in hero sections can captivate or irritate. The difference is purpose. Motion that reveals content, guides attention, or creates delight earns its place. Motion that simply moves because it can becomes noise.",
      "I follow a simple rule: every animation should have a narrative function. It should answer 'why does this move?' with something other than 'because it looks cool.'",
      "## The Scroll Invitation",
      "A hero section that doesn't invite scrolling has failed. The user needs to know that more value awaits below. This can be subtle — a gradient that suggests continuation, content peeking from below, a gentle arrow.",
      "But be careful: forced scroll indicators feel desperate. The invitation should be earned through curiosity, not demanded through design.",
      "## Testing Reality",
      "Every hero section theory must face the reality of user behavior. Heat maps, scroll depth, bounce rates — these tell the true story. What we think works and what actually works are often different.",
      "I test hero sections more than any other part of an interface. A 10% improvement in hero engagement compounds through the entire funnel. The investment in getting this right pays dividends everywhere."
    ]
  },
  "typography-as-architecture": {
    id: 6,
    slug: "typography-as-architecture",
    category: "Design",
    readTime: "6 min read",
    date: "Jan 02, 2026",
    title: "Typography Is Architecture: How Fonts Shape Feeling Before Words",
    excerpt: "Before the reader processes meaning, the eye processes form. Typography is not decoration — it is the structure of voice.",
    tag: "Typography",
    image: "/blog-6-typography.jpg",
    content: [
      "Before the reader processes meaning, the eye processes form. A serif typeface whispers of centuries. A geometric sans speaks of precision. Typography is not decoration — it is the structure of voice.",
      "I came to understand typography as architecture during a project where we changed only the typeface. Same colors, same layout, same copy. The perceived quality of the brand shifted dramatically. Typography had done what a complete redesign could not.",
      "## The Emotional Register of Type",
      "Every typeface carries emotional associations built over centuries of use. Serif fonts connect to tradition, authority, establishment. Sans-serif fonts feel modern, clean, accessible. Script fonts suggest elegance or casualness depending on their execution.",
      "Choosing a typeface is choosing an emotional register. It sets expectations before a single word is read. This choice deserves as much consideration as the words themselves.",
      "## The Mathematics of Readability",
      "Beyond emotion, typography follows mathematical principles that affect comprehension. Line height, line length, letter spacing — these are not aesthetic preferences. They are cognitive requirements.",
      "Lines too long exhaust the eye tracking back to start. Lines too short interrupt reading flow. Line height too tight makes text feel oppressive. Too loose, and paragraphs lose cohesion. The mathematics are precise.",
      "## Hierarchy Through Type",
      "Visual hierarchy in text is primarily established through typography: size, weight, style, spacing. A well-designed type system can make a page scannable and comprehensible before the first word is consciously read.",
      "I design type systems before anything else. Once the hierarchy is clear in type alone, adding color and imagery becomes refinement rather than construction.",
      "## The Rhythm of Reading",
      "Good typography has rhythm. Headings create beats. Paragraphs create measures. Pull quotes provide rests. This rhythm guides the reader through content, maintaining engagement and comprehension.",
      "When I review designs, I read them aloud. Where does my voice want to pause? Where does it want emphasis? Typography should match these natural rhythms of speech.",
      "## Restraint in Selection",
      "The mark of amateur typography is too many typefaces. Two families, used with discipline, create sophistication. Five families create chaos. The skill is in creating variety within constraint.",
      "I limit myself to two typefaces per project: one for headlines, one for body. Within these, I find all the variation needed through size, weight, spacing, and case. Constraint becomes freedom.",
      "## The Invisible Art",
      "The goal of typography is not to be noticed. When type is working perfectly, readers forget they are reading. They are absorbed in content, not conscious of form. This invisibility is the highest achievement.",
      "Typography as architecture means building structures that support the content inhabiting them. The building should enhance the experience of being inside, not demand attention for its own sake."
    ]
  }
}

const relatedBlogs = [
  { slug: "design-philosophy-ancient-meets-modern", title: "The Philosophy of Timeless Design", tag: "Philosophy", image: "/blog-1-ancient-design.jpg" },
  { slug: "building-with-intention", title: "Building With Intention", tag: "Craft", image: "/blog-2-intention-code.jpg" },
  { slug: "whitespace-is-not-empty", title: "Whitespace Is Not Empty", tag: "Design", image: "/blog-3-whitespace.jpg" },
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
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-accent/40" />
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
