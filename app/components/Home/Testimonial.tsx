"use client"

import { useState } from "react"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  location: string
  quote: string
  image: string
  company: string
  companyLogo: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "AISHA O.",
    location: "LAGOS, NIGERIA",
    quote:
      "This app has completely transformed how I study! The AI Study Buddy keeps me on track, and the personalized schedules are a game-changer.",
    image: "/images/happypeople1.jpg",
    company: "Google",
    companyLogo: "/images/Google.png",
  },
  {
    id: 2,
    name: "JOHN D.",
    location: "NEW YORK, USA",
    quote:
      "The AI-powered study recommendations have helped me improve my grades significantly. Highly recommended for all students!",
    image: "/images/happypeople1.jpg",
    company: "Microsoft",
    companyLogo: "/images/Google.png",
  },
  {
    id: 3,
    name: "MARIA S.",
    location: "MADRID, SPAIN",
    quote:
      "Finally, an app that understands my learning style. The personalized approach makes studying enjoyable and effective.",
    image: "/images/happypeople1.jpg",
    company: "Apple",
    companyLogo: "/images/Google.png",
  },
]

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section className="py-16 px-4 md:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block mb-4">
          <span className="bg-[#AC222D] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <span className="text-lg">✦</span> GET FAMILIAR
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Users Are Saying</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          From Companies to schools and users, here is how [APP NAME] has transformed their studying.
        </p>
      </div>

      {/* Testimonial Card Container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
        {/* Left Arrow - visible on web */}
        <button
          onClick={handlePrev}
          className="hidden md:flex bg-[#AC222D] hover:bg-red-700 text-white rounded-full p-3 transition-colors items-center justify-center flex-shrink-0 shadow-lg"
          aria-label="Previous testimonial"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Testimonial Card */}
        <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch bg-white shadow-lg flex-1">
          {/* Left - Image with Pink Background */}
          <div className="bg-pink-300 w-full md:w-2/5 relative h-64 md:h-auto">
            <Image
              src={current.image || "/placeholder.svg?height=400&width=300&query=happy students"}
              alt={current.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* S-shaped Curve Divider - Desktop only */}
          <div className="absolute top-1/2 left-2/5 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
            <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
              <path
                d="M60 0 C40 0 40 30 20 30 C0 30 0 60 20 60 C40 60 40 90 20 90 C0 90 0 120 20 120"
                stroke="#F472B6"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M60 0 C40 0 40 30 20 30 C0 30 0 60 20 60 C40 60 40 90 20 90 C0 90 0 120 20 120"
                stroke="white"
                strokeWidth="6"
                fill="none"
              />
            </svg>
          </div>

          {/* Right - Content with Light Pink Background */}
          <div className="bg-pink-100 flex-1 flex flex-col justify-center p-8 md:p-12">
            {/* Company Logo */}
            <div className="mb-8">
              <Image
                src={current.companyLogo || "/placeholder.svg?height=40&width=120&query=company logo"}
                alt={current.company}
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>

            {/* Quote */}
            <blockquote className="text-lg md:text-xl text-gray-800 mb-8 leading-relaxed font-medium">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div className="text-[#BC1823] font-semibold text-sm">
              &mdash; {current.name}, {current.location}
            </div>
          </div>
        </div>

        {/* Right Arrow - visible on web */}
        <button
          onClick={handleNext}
          className="hidden md:flex bg-[#AC222D] hover:bg-red-700 text-white rounded-full p-3 transition-colors items-center justify-center flex-shrink-0 shadow-lg"
          aria-label="Next testimonial"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Arrows below (mobile only) */}
      <div className="flex md:hidden justify-center gap-6 mt-8">
        <button
          onClick={handlePrev}
          className="bg-[#AC222D] hover:bg-red-700 text-white rounded-full p-3 transition-colors flex items-center justify-center shadow-lg"
          aria-label="Previous testimonial"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="bg-[#AC222D] hover:bg-red-700 text-white rounded-full p-3 transition-colors flex items-center justify-center shadow-lg"
          aria-label="Next testimonial"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicators */}
      <div className="flex gap-2 justify-center mt-10">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-[#AC222D] w-8" : "bg-gray-300 w-2"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}