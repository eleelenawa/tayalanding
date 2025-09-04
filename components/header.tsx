"use client"

import React, { useState } from "react"
import OurStory from "./our-story"

export default function Header() {
  const [isStoryOpen, setIsStoryOpen] = useState(false)

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-16 py-12">
        {/* Logo on the left */}
        <div>
          <span className="text-white font-medium text-5xl">Taya</span>
        </div>

        {/* Our Story button on the right */}
        <button 
          onClick={() => setIsStoryOpen(true)}
          className="text-white/80 hover:text-white text-sm font-light px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-200"
        >
          Our Story
        </button>
      </header>

      {/* Our Story Modal */}
      <OurStory 
        isOpen={isStoryOpen} 
        onClose={() => setIsStoryOpen(false)} 
      />
    </>
  )
}
