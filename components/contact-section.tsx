"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/anantshah133" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/anantshah133/" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/anantshah133" },
  { icon: Mail, label: "Email", href: "mailto:dev.anantshah@gmail.com" },
]

import { SectionTitle } from "./section-title"

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="relative py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="relative max-w-4xl mx-auto text-center">
        <SectionTitle subtitle="Contact" title="Let's Create Something" highlight="Extraordinary" isInView={isInView} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-muted-foreground max-w-lg mx-auto mb-12">
            Ready to transform your digital presence? Let's discuss how we can work together to bring your vision to
            life.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-full font-medium text-lg tracking-wide hover:bg-primary/90 hover:shadow-[0_0_40px_rgba(69,160,150,0.4)] hover:scale-105 active:scale-[0.98] transition-all duration-300 group">
            Start a Conversation
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-6"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="w-12 h-12 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              aria-label={link.label}
              target="_blank"
            >
              <link.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 pt-8 border-t border-border/30"
        >
          <p className="text-muted-foreground/60 text-sm">© {new Date().getFullYear()} Anant Shah. Crafted with care and infinite passion.</p>
          <p className="text-muted-foreground/40 text-xs mt-2 font-serif italic">
            "अनंत" — Beyond boundaries, beyond limits.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
