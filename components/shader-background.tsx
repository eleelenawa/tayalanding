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
      className="relative overflow-hidden"
      style={{ backgroundColor: "#000000" }}
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
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(82, 185, 202, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 249, 230, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(7, 107, 139, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 60% 70%, rgba(156, 203, 211, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #0D2951 0%, #076B8B 30%, #52B9CA 70%, #9CCBD3 100%)
          `,
          animation: "gradientShift 8s ease-in-out infinite",
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
        }}
      />

      {children}

      {/* Water ripple effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Multiple ripple layers */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, transparent 30%, rgba(82, 185, 202, 0.12) 40%, rgba(82, 185, 202, 0.08) 50%, transparent 70%),
              radial-gradient(ellipse at 70% 60%, transparent 25%, rgba(156, 203, 211, 0.1) 35%, rgba(156, 203, 211, 0.06) 45%, transparent 65%),
              radial-gradient(ellipse at 20% 80%, transparent 35%, rgba(255, 249, 230, 0.08) 45%, rgba(255, 249, 230, 0.04) 55%, transparent 75%),
              radial-gradient(ellipse at 80% 30%, transparent 28%, rgba(7, 107, 139, 0.1) 38%, rgba(7, 107, 139, 0.06) 48%, transparent 68%)
            `,
            animation: "rippleWave1 4s ease-in-out infinite",
          }}
        />
        
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 60% 40%, transparent 32%, rgba(82, 185, 202, 0.08) 42%, rgba(82, 185, 202, 0.04) 52%, transparent 72%),
              radial-gradient(ellipse at 10% 70%, transparent 30%, rgba(156, 203, 211, 0.09) 40%, rgba(156, 203, 211, 0.05) 50%, transparent 70%),
              radial-gradient(ellipse at 90% 80%, transparent 26%, rgba(255, 249, 230, 0.07) 36%, rgba(255, 249, 230, 0.03) 46%, transparent 66%)
            `,
            animation: "rippleWave2 3s ease-in-out infinite",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 40% 90%, transparent 24%, rgba(7, 107, 139, 0.09) 29%, transparent 39%),
              radial-gradient(circle at 85% 15%, transparent 19%, rgba(82, 185, 202, 0.11) 24%, transparent 34%)
            `,
            animation: "rippleWave3 5s ease-in-out infinite",
          }}
        />

        {/* Additional fast-moving ripple layers */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, transparent 10%, rgba(82, 185, 202, 0.15) 15%, transparent 25%),
              radial-gradient(circle at 25% 40%, transparent 12%, rgba(156, 203, 211, 0.12) 17%, transparent 27%),
              radial-gradient(circle at 75% 70%, transparent 14%, rgba(255, 249, 230, 0.08) 19%, transparent 29%)
            `,
            animation: "rippleWave4 2s ease-in-out infinite",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 15% 25%, transparent 16%, rgba(7, 107, 139, 0.1) 21%, transparent 31%),
              radial-gradient(circle at 65% 85%, transparent 11%, rgba(82, 185, 202, 0.13) 16%, transparent 26%),
              radial-gradient(circle at 90% 45%, transparent 13%, rgba(156, 203, 211, 0.09) 18%, transparent 28%)
            `,
            animation: "rippleWave5 2.5s ease-in-out infinite",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 35% 65%, transparent 8%, rgba(255, 249, 230, 0.1) 13%, transparent 23%),
              radial-gradient(circle at 80% 20%, transparent 15%, rgba(7, 107, 139, 0.08) 20%, transparent 30%)
            `,
            animation: "rippleWave6 1.8s ease-in-out infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { 
            filter: hue-rotate(0deg) brightness(1);
          }
          33% { 
            filter: hue-rotate(8deg) brightness(1.03);
          }
          66% { 
            filter: hue-rotate(-5deg) brightness(0.98);
          }
        }
        
        @keyframes wireframeMove {
          0% { 
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(20px, 30px) rotate(2deg);
          }
          66% {
            transform: translate(40px, 10px) rotate(-1deg);
          }
          100% { 
            transform: translate(50px, 50px) rotate(0deg);
          }
        }

        @keyframes rippleWave1 {
          0%, 100% {
            opacity: 0.5;
          }
          25% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.3;
          }
          75% {
            opacity: 0.6;
          }
        }

        @keyframes rippleWave2 {
          0%, 100% {
            opacity: 0.4;
          }
          33% {
            opacity: 0.7;
          }
          66% {
            opacity: 0.2;
          }
        }

        @keyframes rippleWave3 {
          0%, 100% {
            opacity: 0.6;
          }
          40% {
            opacity: 0.3;
          }
          80% {
            opacity: 0.8;
          }
        }

        @keyframes rippleWave4 {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes rippleWave5 {
          0%, 100% {
            opacity: 0.5;
          }
          25% {
            opacity: 0.2;
          }
          75% {
            opacity: 0.7;
          }
        }

        @keyframes rippleWave6 {
          0%, 100% {
            opacity: 0.4;
          }
          33% {
            opacity: 0.1;
          }
          66% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  )
}
