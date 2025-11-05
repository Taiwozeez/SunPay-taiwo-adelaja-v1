"use client"

import Image from "next/image"

interface StepCard {
  number: number
  title: string
  description: string
  image: string
  bgColor: string
  borderColor: string
}

const steps: StepCard[] = [
  {
    number: 1,
    title: "Sign Up & Set",
    description:
      "Sign up and tell us about your study goals, interests, and learning style.",
    image: "/images/Rectangle7(1).png",
    bgColor: "bg-yellow-200",
    borderColor: "border-yellow-400",
  },
  {
    number: 2,
    title: "Study with Your AI Buddy",
    description:
      "Ask questions, get learning tips, and create content-rich study resources like videos and audio.",
    image: "/images/Rectangle7(2).png",
    bgColor: "bg-purple-200",
    borderColor: "border-purple-400",
  },
  {
    number: 3,
    title: "Create Your Schedule with AI",
    description:
      "Easily set up your study schedule, or let your AI Chat Buddy generate one for you.",
    image: "/images/Rectangle12.png",
    bgColor: "bg-pink-200",
    borderColor: "border-pink-400",
  },
  {
    number: 4,
    title: "Track Your Progress & Goals",
    description:
      "Monitor your progress with smart analytics, execute plans, and stay confident in your learning.",
    image: "/images/Rectangle13.png",
    bgColor: "bg-orange-200",
    borderColor: "border-orange-400",
  },
]

export default function CTA2() {
  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-5">
            <span className="bg-[#AC222D] text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <span>+</span> GET STARTED WITH EASE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            See How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Make your study mode smarter in 4 simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`relative flex flex-col h-full ${step.number > 2 ? "mt-8" : ""}`}
            >
              <div
                className={`border-2 ${step.borderColor} rounded-3xl flex flex-col h-full bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden`}
              >
                {/* Text Content */}
                <div className="flex flex-col flex-grow p-8 sm:p-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Image touching the borders */}
                <div className="relative w-full h-56">
                  {step.image ? (
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">Image not available</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Number Badge */}
              <div
                className={`${step.bgColor} w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl text-gray-900 absolute -top-8 left-1/2 transform -translate-x-1/2 border-4 border-white shadow-md`}
              >
                {step.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
