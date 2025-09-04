"use client"

import { useState } from "react"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: [] as string[],
    contentCreator: false,
    heardAbout: "",
    otherSource: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})

  const professionOptions = [
    "Founder / small-business owner",
    "Professional (corporate or startup)",
    "Creative professional / designer / creator",
    "Parent or caregiver",
    "Health, education, or public-service professional",
    "Frequent traveler / on-the-go for work"
  ]

  const sourceOptions = [
    "Google/Search Engine",
    "TikTok",
    "Instagram", 
    "Twitter",
    "LinkedIn",
    "Friend or Colleague",
    "Online article / press",
    "Other"
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (formData.description.length === 0) {
      newErrors.description = "Please select at least one option"
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          description: formData.description.join(', '),
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        console.log("Form submitted successfully!")
        setShowSuccess(true)
        // Reset form immediately
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          description: [],
          contentCreator: false,
          heardAbout: "",
          otherSource: ""
        })
        // Start graceful closing sequence
        setTimeout(() => {
          setIsClosing(true)
          setTimeout(() => {
            onClose()
            setShowSuccess(false)
            setIsClosing(false)
          }, 800) // Allow time for closing animation
        }, 3500)
      } else {
        const errorData = await response.json()
        console.error("Failed to submit form:", errorData)
        alert("Failed to submit form. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleDescriptionChange = (option: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      description: checked 
        ? [...prev.description, option]
        : prev.description.filter(item => item !== option)
    }))
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: "" }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        <div className="backdrop-blur-xl bg-gradient-to-br from-[#FFF6DC]/10 via-[#9CCBD3]/15 to-[#52B9CA]/10 rounded-3xl p-8 border border-[#FFF6DC]/20 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-light text-white">Join the Waitlist</h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-2xl transition-colors"
            >
              ×
            </button>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-8 p-8 rounded-xl bg-gradient-to-r from-[#FFF6DC]/20 to-[#52B9CA]/20 border border-[#FFF6DC]/30 text-center transform animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-light text-[#FFF6DC] mb-3">Welcome to Taya!</h3>
              <p className="text-white/90 font-light text-lg leading-relaxed">
                You're in. We'll be in touch with early access details soon.
              </p>
            </div>
          )}

          {!showSuccess && <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-light text-white/90 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FFF6DC]/50 transition-colors"
                  placeholder="Enter your first name"
                  disabled={isSubmitting}
                />
                {errors.firstName && (
                  <p className="text-red-300 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-light text-white/90 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FFF6DC]/50 transition-colors"
                  placeholder="Enter your last name"
                  disabled={isSubmitting}
                />
                {errors.lastName && (
                  <p className="text-red-300 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-light text-white/90 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FFF6DC]/50 transition-colors"
                placeholder="Enter your email address"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-300 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Description Checkboxes */}
            <div>
              <label className="block text-sm font-light text-white/90 mb-4">
                What best describes you? (Select all that apply) *
              </label>
              <div className="space-y-3">
                {professionOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.description.includes(option)}
                      onChange={(e) => handleDescriptionChange(option, e.target.checked)}
                      className="w-4 h-4 text-[#FFF6DC] bg-white/10 border-white/30 rounded focus:ring-[#FFF6DC]/50"
                    />
                    <span className="text-white/90 font-light group-hover:text-white transition-colors">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
              {errors.description && (
                <p className="text-red-300 text-sm mt-2">{errors.description}</p>
              )}
            </div>

            {/* Content Creator Checkbox */}
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.contentCreator}
                  onChange={(e) => handleInputChange("contentCreator", e.target.checked)}
                  className="w-4 h-4 mt-1 text-[#FFF6DC] bg-white/10 border-white/30 rounded focus:ring-[#FFF6DC]/50"
                />
                <div>
                  <span className="text-white/90 font-light">
                    Would you like to be included in offers to content creators to promote Taya in the future?
                  </span>
                  <p className="text-white/60 text-sm mt-1">Optional</p>
                </div>
              </label>
            </div>

            {/* How You Heard Dropdown */}
            <div>
              <label className="block text-sm font-light text-white/90 mb-2">
                How did you hear about us? <span className="text-white/60">Optional</span>
              </label>
              <select
                value={formData.heardAbout}
                onChange={(e) => handleInputChange("heardAbout", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#FFF6DC]/50 transition-colors"
              >
                <option value="" className="bg-black">Select an option</option>
                {sourceOptions.map((option) => (
                  <option key={option} value={option} className="bg-black">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Other Text Field */}
            {formData.heardAbout === "Other" && (
              <div>
                <label className="block text-sm font-light text-white/90 mb-2">
                  Please specify
                </label>
                <input
                  type="text"
                  value={formData.otherSource}
                  onChange={(e) => handleInputChange("otherSource", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FFF6DC]/50 transition-colors"
                  placeholder="Please tell us how you heard about us"
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-full border border-white/30 text-white font-light hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-full bg-[#FFF6DC] text-black font-normal transition-all duration-300 hover:bg-[#FFF6DC]/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "Submitting..." : "Join Waitlist"}
              </button>
            </div>
          </form>}
        </div>
      </div>
    </div>
  )
}