"use client"

import { useState, useEffect } from "react"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Pay On Your Device",
      description: "Make secure payments anytime, anywhere directly from your phone.",
      details: "Trusted by millions of users worldwide.",
      image: "/images/lady-phone.jpg",
    },
    {
      title: "Add Money to Your Wallet",
      description: "Top up your wallet instantly and manage your funds on the go with ease.",
      details: "Trusted by millions of users worldwide.",
      image: "/images/lady-phone2.jpg",
    },
  ]

  const next = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[currentSlide]

  // Scroll to How It Works section
  const scrollToHowItWorks = () => {
    const el = document.getElementById("how-it-works")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Carousel Images */}
      <div className="absolute inset-0">
        {slides.map((s, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${s.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white text-balance">
          {slide.title}
        </h1>
        <p className="text-lg md:text-xl mb-4 text-white/90 leading-relaxed text-balance">
          {slide.description}
        </p>
        <p className="text-base md:text-lg text-white/80 mb-10 text-balance">
          {slide.details}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold transition-colors">
            Sign Up Now
          </button>
          <button
            onClick={scrollToHowItWorks}
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            ▶ See How it Works
          </button>
        </div>
      </div>

      {/* Left Arrow (hidden on mobile) */}
      <button
        onClick={prev}
        className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full w-12 h-12 flex items-center justify-center hover:bg-white transition-colors"
        aria-label="Previous slide"
      >
        <span className="text-black text-2xl leading-none">‹</span>
      </button>

      {/* Right Arrow (hidden on mobile) */}
      <button
        onClick={next}
        className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full w-12 h-12 flex items-center justify-center hover:bg-white transition-colors"
        aria-label="Next slide"
      >
        <span className="text-black text-2xl leading-none">›</span>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
