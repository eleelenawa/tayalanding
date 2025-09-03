"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import PulsingCircle from "@/components/pulsing-circle"
import ShaderBackground from "@/components/shader-background"
import BrandStory from "@/components/brand-story"

export default function ShaderShowcase() {
  return (
    <div>
      <ShaderBackground>
        {/* Hero Section */}
        <div className="min-h-screen relative">
          <Header />
          <HeroContent />
          <PulsingCircle />
        </div>
        
        {/* Brand Story Section */}
        <BrandStory />
      </ShaderBackground>
    </div>
  )
}
