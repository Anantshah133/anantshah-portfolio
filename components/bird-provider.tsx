"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface BirdContextType {
  birdEnabled: boolean
  toggleBird: () => void
}

const BirdContext = createContext<BirdContextType>({
  birdEnabled: true,
  toggleBird: () => {},
})

export function useBird() {
  return useContext(BirdContext)
}

export function BirdProvider({ children }: { children: ReactNode }) {
  const [birdEnabled, setBirdEnabled] = useState(true)

  // Persist preference in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("bird-companion")
    if (stored !== null) {
      setBirdEnabled(stored === "true")
    }
  }, [])

  const toggleBird = () => {
    setBirdEnabled((prev) => {
      const next = !prev
      localStorage.setItem("bird-companion", String(next))
      return next
    })
  }

  return (
    <BirdContext.Provider value={{ birdEnabled, toggleBird }}>
      {children}
    </BirdContext.Provider>
  )
}
