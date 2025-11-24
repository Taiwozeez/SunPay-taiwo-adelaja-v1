"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

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

  const next = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsTransitioning(false), 1200)
  }, [slides.length, isTransitioning])

  const prev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsTransitioning(false), 1200)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 1200)
  }

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[currentSlide]

  // FIXED: TypeScript compatible variants
  const contentVariants = {
    enter: {
      opacity: 0,
      y: 40,
    },
    center: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -40,
    },
  }

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden">

      {/* CONTINUOUS LEFT SLIDING BACKGROUND */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="relative w-full h-full">
          {slides.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* TEXT CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.7,
              ease: "easeOut"
            }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {slide.title}
            </h1>

            <p className="text-lg md:text-xl mb-4 text-white/90">
              {slide.description}
            </p>

            <p className="text-base md:text-lg text-white/80 mb-10">
              {slide.details}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => router.push("/sign-up")}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up Now
              </motion.button>

              <motion.button
                onClick={() => {
                  const el = document.getElementById("how-it-works")
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ▶ See How it Works
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PREV ARROW */}
      <motion.button
        onClick={prev}
        className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full w-12 h-12 items-center justify-center hover:bg-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={isTransitioning}
      >
        <span className="text-black text-2xl">‹</span>
      </motion.button>

      {/* NEXT ARROW */}
      <motion.button
        onClick={next}
        className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full w-12 h-12 items-center justify-center hover:bg-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={isTransitioning}
      >
        <span className="text-black text-2xl">›</span>
      </motion.button>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            } ${isTransitioning ? "cursor-not-allowed" : "cursor-pointer"}`}
            animate={{
              width: index === currentSlide ? 32 : 8,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </section>
  )
}