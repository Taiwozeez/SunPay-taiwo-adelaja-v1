"use client"

import Image from "next/image"

export default function Features() {
  const features = [
    "AI Chat Buddy provides instant answers, schedules, & others.",
    "Custom study plans fit your unique goals and learning style.",
    "Analytics help you track progress with clear insights.",
    "Motivations like with streaks, badges, Awards & reminders.",
  ]

  return (
    <section className="bg-white rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#AC222D] text-white px-4 py-2 rounded-full text-sm font-semibold">
              <span>✦</span>
              <span>SOME OF OUR FEATURES</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                We simplify studying to succeed
              </h2>
              <p className="text-gray-600 text-lg">
                At [APP NAME], we empower students with tools that make learning smarter, more engaging, and efficient.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-5">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {/* Green Round Tick */}
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700 text-base">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-pink-200 rounded-3xl overflow-hidden aspect-square">
                <Image
                  src="/images/happypeople1.jpg" // ← replace with your local image path
                  alt="Happy students with phone"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
