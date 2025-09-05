"use client"

import { useState } from "react"
import WaitlistModal from "./waitlist-modal-progressive"

export default function HeroContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <main className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="relative w-full h-full px-6 pt-6">
        {/* Hero Image with Rounded Corners */}
        <div className="relative">
          <img
            src="/hero-image.png"
            alt="Taya Intelligent Jewelry"
            className="w-full h-[95vh] object-cover object-[center_75%] rounded-3xl shadow-2xl"
            style={{
              filter: "brightness(1.1) contrast(1.2) saturate(1.1)",
            }}
          />
          
          {/* Text Overlay with Colored Background */}
          <div className="absolute inset-0 flex items-end justify-start p-8">
            <div className="backdrop-blur-xl bg-gradient-to-br from-[#FFF6DC]/10 via-[#9CCBD3]/15 to-[#52B9CA]/10 rounded-3xl p-12 border border-[#FFF6DC]/20 shadow-2xl text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-4 relative">
                <span className="text-white/90 text-xs font-light">✨ Launching Soon</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-light text-white mb-8 drop-shadow-2xl leading-tight">
                <span className="font-light">Own your moments</span>
                <br />
                <span className="text-[#FFF6DC] font-medium">with intelligent jewelry.</span>
              </h1>

              {/* Button */}
              <div className="flex justify-start">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-10 py-4 rounded-full bg-[#FFF6DC] text-black font-normal text-sm transition-all duration-300 hover:bg-[#FFF6DC]/90 hover:scale-105 cursor-pointer shadow-lg backdrop-blur-sm"
                >
                  Join the Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  )
}