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
        </div>
        
        {/* Brand Story Section */}
        <BrandStory />
        
        {/* Product Introduction Section */}
        <section className="relative py-24 px-8 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Product Image */}
              <div className="relative">
                <img
                  src="/model-image.png"
                  alt="Taya Jewelry Design"
                  className="w-full rounded-3xl shadow-2xl"
                  style={{
                    filter: "brightness(1.1) contrast(1.2) saturate(1.1)",
                  }}
                />
              </div>
              
              {/* Right - Content */}
              <div className="space-y-12">
                {/* Main heading */}
                <div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl tracking-tight font-light text-[#FFF6DC] mb-4 leading-none">
                    <span className="font-medium">Taya</span>
                  </h2>
                  <p className="text-2xl md:text-3xl font-light text-white/90 mb-8 leading-none">
                    Intelligence, worn close.
                  </p>
                </div>
                
                {/* Main description */}
                <div>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Jewelry that remembers. Beautiful even when it's off. This isn't just another wearable.
                  </p>
                </div>
                
                {/* Key features section */}
                <div className="backdrop-blur-sm bg-gradient-to-r from-white/5 to-[#52B9CA]/5 rounded-3xl p-8 border border-white/10">
                  <h3 className="text-xl font-medium text-[#FFF6DC] mb-8">Key Features</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-[#FFF6DC] rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-lg text-white/90 font-light">Seamless voice capture & AI processing</p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-[#FFF6DC] rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-lg text-white/90 font-light">Elegant design that complements your style</p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-[#FFF6DC] rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-lg text-white/90 font-light">Intelligent processing, never intrusive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ShaderBackground>
    </div>
  )
}
