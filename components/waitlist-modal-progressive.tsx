"use client"

import { useState } from "react"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  // Progressive form stages
  const [currentStage, setCurrentStage] = useState<'initial' | 'personalize' | 'success'>('initial')
  const [waitlistId, setWaitlistId] = useState<number | null>(null)
  
  // Initial form data (stage 1 - core waitlist info)
  const [initialData, setInitialData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: [] as string[],
    contentCreator: false,
    heardAbout: "",
    otherSource: ""
  })

  // Personalization form data (stage 2 - creator-specific details)
  const [personalizeData, setPersonalizeData] = useState({
    description: [] as string[], // Add this back
    heardAbout: "",
    otherSource: "",
    socialHandleInstagram: "",
    socialHandleTiktok: "",
    socialHandleTwitter: "",
    socialHandleYoutube: "",
    followerCountRange: "",
    contentNiche: "",
    collaborationInterests: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const followerRanges = [
    "1K - 10K",
    "10K - 50K", 
    "50K - 100K",
    "100K - 500K",
    "500K - 1M",
    "1M+"
  ]

  const contentNiches = [
    "Fashion & Beauty",
    "Lifestyle",
    "Tech & Gadgets",
    "Travel",
    "Fitness & Wellness",
    "Food & Cooking",
    "Business & Entrepreneurship",
    "Entertainment",
    "Education",
    "Other"
  ]

  // Stage 1: Initial form submission (low friction)
  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    
    if (!initialData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    if (!initialData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    if (!initialData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(initialData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (initialData.description.length === 0) {
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
          firstName: initialData.firstName,
          lastName: initialData.lastName,
          email: initialData.email,
          contentCreator: initialData.contentCreator,
          description: initialData.description.join(', '),
          heardAbout: initialData.heardAbout || null,
          otherSource: initialData.otherSource || null,
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("Initial form submitted successfully!", result)
        
        // Store the waitlist ID for potential updates
        if (result.data && result.data.length > 0) {
          setWaitlistId(result.data[0].id)
        }
        
        // Move to success stage initially, then offer personalization
        setCurrentStage('success')
        
        // Auto-advance to personalization if they're a creator
        if (initialData.contentCreator) {
          setTimeout(() => {
            setCurrentStage('personalize')
          }, 800)
        } else {
          // For non-creators, close after success message
          setTimeout(() => {
            setIsClosing(true)
            setTimeout(() => {
              onClose()
              resetForm()
            }, 800)
          }, 3500)
        }
      } else {
        const errorData = await response.json()
        console.error("Failed to submit initial form:", errorData)
        alert("Failed to submit form. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting initial form:", error)
      alert("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Stage 2: Personalization form submission (optional)
  const handlePersonalizeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Update the existing waitlist entry with personalization data
      const response = await fetch('/api/waitlist/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          waitlistId,
          description: personalizeData.description.join(', '),
          heardAbout: personalizeData.heardAbout || null,
          otherSource: personalizeData.otherSource || null,
          socialHandleInstagram: personalizeData.socialHandleInstagram || null,
          socialHandleTiktok: personalizeData.socialHandleTiktok || null,
          socialHandleTwitter: personalizeData.socialHandleTwitter || null,
          socialHandleYoutube: personalizeData.socialHandleYoutube || null,
          followerCountRange: personalizeData.followerCountRange || null,
          contentNiche: personalizeData.contentNiche || null,
          collaborationInterests: personalizeData.collaborationInterests || null,
          formCompleted: true
        }),
      })

      if (response.ok) {
        console.log("Personalization completed successfully!")
        setCurrentStage('success')
        
        // Close after showing success
        setTimeout(() => {
          setIsClosing(true)
          setTimeout(() => {
            onClose()
            resetForm()
          }, 800)
        }, 3500)
      } else {
        const errorData = await response.json()
        console.error("Failed to submit personalization:", errorData)
        alert("Failed to save personalization. Your signup is still valid!")
        
        // Still close on error - they're already on the waitlist
        setTimeout(() => {
          setIsClosing(true)
          setTimeout(() => {
            onClose()
            resetForm()
          }, 800)
        }, 2000)
      }
    } catch (error) {
      console.error("Error submitting personalization:", error)
      alert("Network error. Your signup is still valid!")
      
      // Still close on error
      setTimeout(() => {
        setIsClosing(true)
        setTimeout(() => {
          onClose()
          resetForm()
        }, 800)
      }, 2000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setCurrentStage('initial')
    setWaitlistId(null)
    setInitialData({
      firstName: "",
      lastName: "",
      email: "",
      description: [],
      contentCreator: false,
      heardAbout: "",
      otherSource: ""
    })
    setPersonalizeData({
      description: [],
      heardAbout: "",
      otherSource: "",
      socialHandleInstagram: "",
      socialHandleTiktok: "",
      socialHandleTwitter: "",
      socialHandleYoutube: "",
      followerCountRange: "",
      contentNiche: "",
      collaborationInterests: ""
    })
    setErrors({})
    setIsClosing(false)
  }

  const handleInputChange = (field: string, value: string | boolean, isPersonalize = false) => {
    if (isPersonalize) {
      setPersonalizeData(prev => ({ ...prev, [field]: value }))
    } else {
      setInitialData(prev => ({ ...prev, [field]: value }))
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleDescriptionChange = (option: string, checked: boolean, isPersonalize = true) => {
    if (isPersonalize) {
      setPersonalizeData(prev => ({
        ...prev,
        description: checked 
          ? [...prev.description, option]
          : prev.description.filter(item => item !== option)
      }))
    } else {
      setInitialData(prev => ({
        ...prev,
        description: checked 
          ? [...prev.description, option]
          : prev.description.filter(item => item !== option)
      }))
    }
    
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: "" }))
    }
  }

  const skipPersonalization = () => {
    setCurrentStage('success')
    setTimeout(() => {
      setIsClosing(true)
      setTimeout(() => {
        onClose()
        resetForm()
      }, 800)
    }, 2000)
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
          
          {/* Stage 1: Initial Form (Low Friction) */}
          {currentStage === 'initial' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-light text-white">Join the Waitlist</h2>
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white text-2xl transition-colors"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleInitialSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-light text-white/90 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={initialData.firstName}
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
                      value={initialData.lastName}
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
                    value={initialData.email}
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
                          checked={initialData.description.includes(option)}
                          onChange={(e) => handleDescriptionChange(option, e.target.checked, false)}
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
                      checked={initialData.contentCreator}
                      onChange={(e) => handleInputChange("contentCreator", e.target.checked)}
                      className="w-4 h-4 mt-1 text-[#FFF6DC] bg-white/10 border-white/30 rounded focus:ring-[#FFF6DC]/50"
                    />
                    <div>
                      <span className="text-white/90 font-light">
                        I'm a content creator interested in collaboration opportunities
                      </span>
                      <p className="text-white/60 text-sm mt-1">
                        {initialData.contentCreator ? 
                          "Great! We'll ask for more details next to personalize opportunities for you." : 
                          "Optional - check if you create content online"
                        }
                      </p>
                    </div>
                  </label>
                </div>

                {/* How You Heard Dropdown */}
                <div>
                  <label className="block text-sm font-light text-white/90 mb-2">
                    How did you hear about us? <span className="text-white/60">Optional</span>
                  </label>
                  <select
                    value={initialData.heardAbout}
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
                {initialData.heardAbout === "Other" && (
                  <div>
                    <label className="block text-sm font-light text-white/90 mb-2">
                      Please specify
                    </label>
                    <input
                      type="text"
                      value={initialData.otherSource}
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
              </form>
            </>
          )}

          {/* Stage 2: Personalization Form (Optional) */}
          {currentStage === 'personalize' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-light text-white">Personalize Your Experience</h2>
                <button
                  onClick={skipPersonalization}
                  className="text-white/60 hover:text-white text-2xl transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="mb-6 p-4 rounded-xl bg-[#FFF6DC]/10 border border-[#FFF6DC]/20">
                <p className="text-white/90 font-light text-sm">
                  ✅ You're on the waitlist! Help us personalize collaboration opportunities by sharing more about your content.
                </p>
              </div>

              <form onSubmit={handlePersonalizeSubmit} className="space-y-6">
                {/* Social Handles */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-light text-white/90 mb-2">
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      value={personalizeData.socialHandleInstagram}
                      onChange={(e) => handleInputChange("socialHandleInstagram", e.target.value, true)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FFF6DC]/50 transition-colors"
                      placeholder="@yourusername"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-white/90 mb-2">
                      TikTok Handle
                    </label>
                    <input
                      type="text"
                      value={personalizeData.socialHandleTiktok}
                      onChange={(e) => handleInputChange("socialHandleTiktok", e.target.value, true)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FFF6DC]/50 transition-colors"
                      placeholder="@yourusername"
                    />
                  </div>
                </div>

                {/* Follower Count */}
                <div>
                  <label className="block text-sm font-light text-white/90 mb-2">
                    Follower Count (largest platform)
                  </label>
                  <select
                    value={personalizeData.followerCountRange}
                    onChange={(e) => handleInputChange("followerCountRange", e.target.value, true)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#FFF6DC]/50 transition-colors"
                  >
                    <option value="" className="bg-black">Select range</option>
                    {followerRanges.map((range) => (
                      <option key={range} value={range} className="bg-black">
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Content Niche */}
                <div>
                  <label className="block text-sm font-light text-white/90 mb-2">
                    Content Niche
                  </label>
                  <select
                    value={personalizeData.contentNiche}
                    onChange={(e) => handleInputChange("contentNiche", e.target.value, true)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#FFF6DC]/50 transition-colors"
                  >
                    <option value="" className="bg-black">Select your niche</option>
                    {contentNiches.map((niche) => (
                      <option key={niche} value={niche} className="bg-black">
                        {niche}
                      </option>
                    ))}
                  </select>
                </div>


                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={skipPersonalization}
                    className="px-6 py-3 rounded-full border border-white/30 text-white font-light hover:bg-white/10 transition-colors"
                  >
                    Skip for Now
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-full bg-[#FFF6DC] text-black font-normal transition-all duration-300 hover:bg-[#FFF6DC]/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? "Saving..." : "Complete Profile"}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Success Stage */}
          {currentStage === 'success' && (
            <div className="text-center py-12">
              <div className="mb-8 p-8 rounded-xl bg-gradient-to-r from-[#FFF6DC]/20 to-[#52B9CA]/20 border border-[#FFF6DC]/30">
                <h3 className="text-2xl font-light text-[#FFF6DC] mb-3">Welcome to Taya!</h3>
                <p className="text-white/90 font-light text-lg leading-relaxed">
                  {waitlistId ? 
                    "You're all set. We'll be in touch with early access details soon." :
                    "You're in. We'll be in touch with early access details soon."
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}