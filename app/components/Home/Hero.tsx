"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

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

  // Background image variants
  const backgroundVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 1.1,
      x: direction > 0 ? 100 : -100,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        opacity: { duration: 1.2, ease: "easeOut" },
        scale: { duration: 1.5, ease: "easeOut" },
        x: { duration: 1.2, ease: "easeOut" }
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.9,
      x: direction > 0 ? -100 : 100,
      transition: {
        opacity: { duration: 0.8, ease: "easeIn" },
        scale: { duration: 1, ease: "easeIn" },
        x: { duration: 0.8, ease: "easeIn" }
      }
    })
  }

  // Content variants
  const contentVariants = {
    enter: {
      opacity: 0,
      y: 50,
    },
    center: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  }

  // Scroll to How It Works section
  const scrollToHowItWorks = () => {
    const el = document.getElementById("how-it-works")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Carousel Images with Framer Motion */}
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout" custom={currentSlide}>
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            variants={backgroundVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={currentSlide}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content with Animation */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 text-white text-balance"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {slide.title}
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-4 text-white/90 leading-relaxed text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {slide.description}
            </motion.p>
            <motion.p 
              className="text-base md:text-lg text-white/80 mb-10 text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {slide.details}
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <motion.button 
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold transition-colors"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(255, 193, 7, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up Now
              </motion.button>
              <motion.button
                onClick={scrollToHowItWorks}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ▶
                </motion.span>
                See How it Works
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left Arrow (hidden on mobile) */}
      <motion.button
        onClick={prev}
        className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full w-12 h-12 flex items-center justify-center hover:bg-white transition-colors"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.span 
          className="text-black text-2xl leading-none"
          whileHover={{ x: -2 }}
        >
          ‹
        </motion.span>
      </motion.button>

      {/* Right Arrow (hidden on mobile) */}
      <motion.button
        onClick={next}
        className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full w-12 h-12 flex items-center justify-center hover:bg-white transition-colors"
        aria-label="Next slide"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.span 
          className="text-black text-2xl leading-none"
          whileHover={{ x: 2 }}
        >
          ›
        </motion.span>
      </motion.button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            animate={{
              width: index === currentSlide ? 32 : 8,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
        ))}
      </div>
    </section>
  )
}