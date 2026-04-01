"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Navigation } from "@/components/navigation"
import { SectionTitle } from "@/components/section-title"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  ArrowLeft,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { SectionDivider } from "@/components/section-divider"

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/anantshah133" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/anantshah133/" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/anantshah133" },
  { icon: Mail, label: "Email", href: "mailto:dev.anantshah@gmail.com" },
]

const contactInfo = [
  { icon: Mail, label: "Email", value: "dev.anantshah@gmail.com", href: "mailto:dev.anantshah@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 99245 90125", href: "tel:+919924590125" },
  { icon: MapPin, label: "Location", value: "Surat, Gujarat, India", href: "https://maps.app.goo.gl/yjfNpsw3c968gQE76" },
]

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: "-50px" })
  const isFormInView = useInView(formRef, { once: true, margin: "-80px" })
  const isInfoInView = useInView(infoRef, { once: true, margin: "-80px" })

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    // Dispatch custom event so the bird companion can react to typing
    window.dispatchEvent(new CustomEvent("bird-typing"))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
    setFormState({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="ancient-overlay" />
      <Navigation />

      {/* ─── Hero Header ─── */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Ambient gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 -left-32 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px]"
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 -right-32 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[150px]"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Decorative corner ornaments */}
        <div className="absolute top-28 left-8 w-16 h-16 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-accent">
            <path d="M0,50 Q0,0 50,0 M50,0 Q100,0 100,50" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="0" r="3" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute top-28 right-8 w-16 h-16 opacity-10 rotate-90">
          <svg viewBox="0 0 100 100" className="w-full h-full text-accent">
            <path d="M0,50 Q0,0 50,0 M50,0 Q100,0 100,50" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="0" r="3" fill="currentColor" />
          </svg>
        </div>

        <div ref={heroRef} className="relative max-w-4xl mx-auto text-center">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>
          </motion.div>

          <SectionTitle
            subtitle="Get in Touch"
            title="Let's Build Something"
            highlight="Remarkable"
            isInView={isHeroInView}
          />

          {/* Sanskrit decorative label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-accent/30 font-serif text-sm tracking-widest -mt-10 mb-6"
          >
            ॥ संपर्क ॥
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed"
          >
            Every great collaboration begins with a conversation. Share your vision, and let's
            craft something that transcends the ordinary.
          </motion.p>
        </div>
      </section>

      <SectionDivider />

      {/* ─── Main Content: Form + Info ─── */}
      <section className="relative px-6 py-20">
        {/* Vignette effect */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(13,26,26,0.3)_100%)]" />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* ─── Contact Form (3 cols) ─── */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -40 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="relative p-8 md:p-10 rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(18,36,36,0.9) 0%, rgba(13,26,26,0.95) 100%)",
              }}
            >
              {/* Card border */}
              <div className="absolute inset-0 rounded-2xl border border-border/30" />

              {/* Glowing accent line at top */}
              <motion.div
                className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Ancient corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 opacity-20">
                <svg viewBox="0 0 24 24" className="w-full h-full text-accent">
                  <path d="M0,12 Q0,0 12,0" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="0" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="0" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute bottom-4 right-4 w-6 h-6 opacity-20 rotate-180">
                <svg viewBox="0 0 24 24" className="w-full h-full text-accent">
                  <path d="M0,12 Q0,0 12,0" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="0" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="0" r="1.5" fill="currentColor" />
                </svg>
              </div>

              {/* Form header */}
              <div className="relative mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <h3 className="font-serif text-2xl text-foreground">Send a Message</h3>
                </div>
                <p className="text-sm text-muted-foreground pl-5">
                  Fill in the details below and I'll get back to you within 24 hours.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="relative space-y-6">
                {/* Name + Email row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="Your Name"
                    name="name"
                    type="text"
                    placeholder="e.g. John Doe"
                    value={formState.name}
                    onChange={handleChange}
                    focused={focusedField === "name"}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="e.g. john@example.com"
                    value={formState.email}
                    onChange={handleChange}
                    focused={focusedField === "email"}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                </div>

                {/* Subject */}
                <FormField
                  label="Subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  value={formState.subject}
                  onChange={handleChange}
                  focused={focusedField === "subject"}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  required
                />

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-base font-medium text-foreground/80 font-serif tracking-wide">
                    Message
                  </label>
                  <div className={`relative rounded-xl transition-all duration-500 ${focusedField === "message"
                    ? "shadow-[0_0_20px_rgba(201,169,98,0.1)]"
                    : ""
                    }`}>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project, your vision, or just say hello..."
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-5 py-4 rounded-xl bg-background/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:bg-background/70 transition-all duration-500 resize-none text-sm leading-relaxed"
                    />
                    {/* Focus accent line */}
                    <motion.div
                      className="absolute bottom-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: focusedField === "message" ? 1 : 0,
                        opacity: focusedField === "message" ? 1 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`relative w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-medium text-base tracking-wide transition-all duration-500 overflow-hidden group ${isSubmitted
                    ? "bg-accent/20 text-accent border border-accent/40"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  whileHover={!isSubmitting && !isSubmitted ? { scale: 1.03, boxShadow: "0 0 40px rgba(69, 160, 150, 0.3)" } : {}}
                  whileTap={!isSubmitting && !isSubmitted ? { scale: 0.98 } : {}}
                >
                  {/* Hover shimmer */}
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="relative">Sending...</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span className="relative">Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 relative" />
                      <span className="relative">Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* ─── Info + Map (2 cols) ─── */}
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: 40 }}
            animate={isInfoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <h4 className="font-serif text-lg text-foreground">Contact Information</h4>
            </div>
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="group flex items-center gap-4 p-4 rounded-xl bg-card/40 border border-border/30 hover:border-accent/30 hover:bg-card/60 transition-all duration-500"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground/70 tracking-wider uppercase">{item.label}</p>
                        <p className="text-sm text-foreground group-hover:text-primary transition-colors duration-300">{item.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 p-4 rounded-xl bg-card/40 border border-border/30">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground/70 tracking-wider uppercase">{item.label}</p>
                        <p className="text-sm text-foreground">{item.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <h4 className="font-serif text-lg text-foreground">Connect</h4>
              </div>
              <div className="flex items-center gap-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    className="w-11 h-11 rounded-full bg-card/50 border border-border/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.08 }}
                    aria-label={link.label}
                  >
                    <link.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="relative"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <h4 className="font-serif text-lg text-foreground">Find Me</h4>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-border/30 group">
                {/* Map iframe */}
                <div className="aspect-4/3 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41709451063!2d72.73988483609048!3d21.15934029880327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1774360308124!5m2!1sen!2sin"
                    className="absolute inset-0 w-full h-full"
                    style={{
                      border: 0,
                      filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.7)",
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map - Surat, Gujarat, India"
                  />
                  {/* Map overlay for theme blending */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20 pointer-events-none" />
                  <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" /> */}
                </div>

                {/* Golden corner accents */}
                {/* <div className="absolute top-3 left-3 w-5 h-5 border-l border-t border-accent/40 rounded-tl-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-3 right-3 w-5 h-5 border-r border-t border-accent/40 rounded-tr-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-l border-b border-accent/40 rounded-bl-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-accent/40 rounded-br-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}
              </div>
            </motion.div>

            {/* Decorative quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInfoInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.1 }}
              className="text-center pt-4"
            >
              <div className="inline-flex items-center gap-4">
                <div className="w-8 h-px bg-linear-to-r from-transparent to-accent/40" />
                <p className="font-serif text-sm text-muted-foreground/60 italic">
                  "संवाद — the art of meaningful exchange"
                </p>
                <div className="w-8 h-px bg-linear-to-l from-transparent to-accent/40" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <section className="relative px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pt-8 border-t border-border/30 text-center"
          >
            <p className="text-muted-foreground/60 text-sm">
              © {new Date().getFullYear()} Anant Shah. Crafted with care and infinite passion.
            </p>
            <p className="text-muted-foreground/40 text-xs mt-2 font-serif italic">
              "अनंत" — Beyond boundaries, beyond limits.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

/* ─── Reusable Form Field Component ─── */
function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  focused,
  onFocus,
  onBlur,
  required,
}: {
  label: string
  name: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  focused: boolean
  onFocus: () => void
  onBlur: () => void
  required?: boolean
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-base font-medium text-foreground/80 font-serif tracking-wide">
        {label}
      </label>
      <div className={`relative rounded-xl transition-all duration-500 ${focused ? "shadow-[0_0_20px_rgba(201,169,98,0.1)]" : ""
        }`}>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          className="w-full px-5 py-3.5 rounded-xl bg-background/50 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:bg-background/70 transition-all duration-500 text-sm"
        />
        {/* Focus accent line */}
        <motion.div
          className="absolute bottom-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: focused ? 1 : 0,
            opacity: focused ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  )
}
