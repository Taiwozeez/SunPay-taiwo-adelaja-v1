"use client"

import Image from "next/image"

export default function ContactHelp() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Image */}
          <div className="flex justify-center md:justify-start">
            <div className="w-full max-w-2xl bg-gray-300 rounded-3xl p-0 flex items-center justify-center overflow-hidden">
              <div className="relative w-full aspect-video">
                <Image src="/images/lady-phone.jpg" alt="Support team member" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex w-fit">
              <span className="bg-yellow-400 text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                <span className="text-lg">✦</span>
                WE ARE HERE TO HELP!
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              We&apos;re Here to Listen & Support You
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Reach out with your questions, feedback, or support needs Our team is ready to assist you.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
