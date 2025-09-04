"use client"

import { useEffect, useRef, useState } from "react"

export default function BrandStory() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const words = [
    { text: "present,", color: "text-[#FFF6DC]" },
    { text: "graceful,", color: "text-[#FFF6DC]" },
    { text: "transformative.", color: "text-[#9CCBD3]" }
  ]

  useEffect(() => {
    // Start cycling immediately when component mounts
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [words.length])

  return (
    <section ref={sectionRef} className="relative py-24 px-8 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-relaxed">
          Not intrusive. Just{" "}
          <span className="relative inline-block">
            {words.map((word, index) => (
              <span
                key={word.text}
                className={`absolute font-medium transition-all duration-1000 ${word.color} ${
                  currentWordIndex === index
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-4"
                }`}
              >
                {word.text}
              </span>
            ))}
            {/* Invisible placeholder to maintain spacing */}
            <span className="opacity-0 font-medium">transformative.</span>
          </span>
        </p>
      </div>
    </section>
  )
}