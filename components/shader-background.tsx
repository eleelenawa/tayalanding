"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden pb-20"
      style={{ backgroundColor: "#0D2951" }}
    >
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Animated gradient background */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
          isActive ? "scale-110" : "scale-100"
        }`}
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(82, 185, 202, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 249, 230, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(7, 107, 139, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 60% 70%, rgba(156, 203, 211, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #0D2951 0%, #076B8B 30%, #52B9CA 70%, #9CCBD3 100%)
          `,
          animation: "gradientShift 8s ease-in-out infinite",
          minHeight: "120vh",
        }}
      />

      {/* Wireframe overlay effect */}
      <div
        className="absolute inset-0 w-full opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 246, 220, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(156, 203, 211, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "wireframeMove 10s linear infinite",
          minHeight: "120vh",
        }}
      />

      {children}

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { 
            filter: hue-rotate(0deg) brightness(1);
          }
          50% { 
            filter: hue-rotate(15deg) brightness(1.05);
          }
        }
        
        @keyframes wireframeMove {
          0% { 
            transform: translate(0, 0);
          }
          100% { 
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </div>
  )
}
