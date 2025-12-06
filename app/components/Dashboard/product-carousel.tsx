"use client"

import { useState, useEffect } from "react"

interface Product {
  id: number
  name: string
  description: string
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Solar Panel Kit",
    description: "Complete 300W solar panel setup with inverter and battery storage",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "LED Lighting System",
    description: "Energy-efficient LED lights with smart control for homes and offices",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop",
  },
]

export function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrev = () => {
    setCurrentIndex(currentIndex === 0 ? products.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === products.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 rounded-2xl p-4 md:p-6 relative overflow-hidden h-full">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(251 191 36 / 0.3) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">Check Out More Products</h2>
          <p className="text-sm text-gray-500">Discover our solar energy solutions</p>
        </div>

        {/* Carousel Container - Takes remaining space */}
        <div className="flex-grow relative bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center z-10 transition-colors"
            title="Previous product"
            aria-label="Previous product"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center z-10 transition-colors"
            title="Next product"
            aria-label="Next product"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Slides */}
          <div className="relative w-full h-full overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-full flex-shrink-0 h-full"
                >
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Product Image - Larger on mobile, half on desktop */}
                    <div className="h-1/2 md:h-full md:w-1/2 overflow-hidden">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${product.image})` }}
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="h-1/2 md:h-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-amber-600 font-bold">From ₦45,000</span>
                        <button
                          className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                          title={`Learn more about ${product.name}`}
                          aria-label={`Learn more about ${product.name}`}
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Dots and View More link */}
        <div className="mt-4 flex items-center justify-between">
          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-amber-500' : 'bg-gray-300'
                }`}
                title={`Go to product ${index + 1}`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>

          {/* View More Link */}
          <a
            href="/products"
            className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
            title="View all products"
            aria-label="View all products"
          >
            View More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}