"use client"

export default function HeroContent() {
  return (
    <main className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="relative w-full h-full px-6 pt-6">
        {/* Hero Image with Rounded Corners */}
        <div className="relative">
          <img
            src="/hero-image.png"
            alt="Taya Intelligent Jewelry"
            className="w-full h-[95vh] object-cover rounded-3xl shadow-2xl"
            style={{
              filter: "brightness(1.1) contrast(1.2) saturate(1.1)",
            }}
          />
          
          {/* Text Overlay with Colored Background */}
          <div className="absolute inset-0 flex items-end justify-start p-8">
            <div className="bg-[#FFF6DC]/95 rounded-3xl p-12 shadow-2xl text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#52B9CA]/10 mb-4">
                <span className="text-[#076B8B] text-xs font-light">✨ Intelligent Jewelry Experience</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight font-light text-[#076B8B] mb-6">
                <span className="font-medium">Taya</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl font-light text-[#076B8B]/80 mb-8 leading-relaxed">
                Own your moments with intelligent jewelry.
              </p>

              {/* Button */}
              <div className="flex justify-start">
                <button className="px-10 py-4 rounded-full bg-[#52B9CA] text-white font-normal text-sm transition-all duration-300 hover:bg-[#52B9CA]/90 hover:scale-105 cursor-pointer shadow-lg">
                  Join the Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}