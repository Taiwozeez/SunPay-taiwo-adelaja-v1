"use client"

import Image from "next/image"

export default function WhoWeAre() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Image */}
          <div className="flex justify-center md:justify-start">
            <div className="w-full max-w-2xl bg-gray-200 rounded-3xl p-0 flex items-center justify-center overflow-hidden">
              <div className="relative w-full aspect-video">
                <Image src="/images/aboutuspic1.jpg" alt="Student with laptop" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex w-fit">
              <span className="bg-[#BC1823] text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                <span className="text-lg">✦</span>
                WHO WE ARE
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Empowering Students to Study Smarter, Not Harder.
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              At [APP NAME], we are passionate about redefining the way students approach their studies. Our platform
              leverages cutting-edge AI technology to provide personalized schedules, curated content, and actionable
              insights, helping students achieve their academic goals with ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
