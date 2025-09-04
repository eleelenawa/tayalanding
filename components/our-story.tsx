"use client"

import React from "react"

interface OurStoryProps {
  isOpen: boolean
  onClose: () => void
}

export default function OurStory({ isOpen, onClose }: OurStoryProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="backdrop-blur-xl bg-gradient-to-br from-[#FFF6DC]/10 via-[#9CCBD3]/15 to-[#52B9CA]/10 rounded-3xl p-12 border border-[#FFF6DC]/20 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-light text-white">Our Story</h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-3xl transition-colors"
            >
              ×
            </button>
          </div>

          {/* Story Content */}
          <div className="space-y-8">
            <p className="text-lg md:text-xl font-light text-white/95 leading-relaxed">
              Taya was founded by <a href="https://www.linkedin.com/in/elena-wagenmans/" target="_blank" rel="noopener noreferrer" className="text-[#FFF6DC] font-medium hover:text-[#FFF6DC]/80 transition-colors underline decoration-[#FFF6DC]/50 hover:decoration-[#FFF6DC]">Elena Wagenmans</a> and <a href="https://www.linkedin.com/in/amy7/" target="_blank" rel="noopener noreferrer" className="text-[#FFF6DC] font-medium hover:text-[#FFF6DC]/80 transition-colors underline decoration-[#FFF6DC]/50 hover:decoration-[#FFF6DC]">Amy Zhou</a>, Stanford-trained product designers and former Apple engineers, to reinvent how AI lives with us. They saw that no one had cracked everyday AI wearables, since most still look like gadgets, so they started with jewelry instead.
            </p>
            
            <p className="text-lg md:text-xl font-light text-white/95 leading-relaxed">
              The result is the <span className="text-[#9CCBD3] font-medium">Taya necklace</span>: timeless in design, crafted like fine jewelry, and powered by intelligence inside. It captures ideas, memories, and moments seamlessly — a piece you want to wear every day, not just a device you carry.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}