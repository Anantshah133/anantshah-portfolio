import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Cormorant_Garamond, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { BirdProvider } from "@/components/bird-provider"
import { BirdCompanion } from "@/components/bird-companion"
import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Anant Shah ⚡ | Full Stack Developer",
  description: "Just a little more than infinity. Premium web experiences crafted with precision and creativity.",
  // generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} ${cormorant.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="dark">
          <BirdProvider>
            <div className="noise-overlay" />
            <BirdCompanion />
            {children}
          </BirdProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
