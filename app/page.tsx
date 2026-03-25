import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section-v2"
import { ProjectsSection } from "@/components/projects-section"
import { ProcessSection } from "@/components/process-section"
import { SignatureSection } from "@/components/signature-section"
import { BlogsSection } from "@/components/blogs-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { SectionDivider } from "@/components/section-divider"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="ancient-overlay" />

      <Navigation />
      <HeroSection />
      <SectionDivider />

      <AboutSection />
      <SectionDivider />

      <SkillsSection />
      <SectionDivider />

      <ProjectsSection />
      <SectionDivider />

      <ProcessSection />
      <SectionDivider />

      <SignatureSection />
      <SectionDivider />

      <BlogsSection />
      <SectionDivider />

      <ContactSection />
    </main>
  )
}
