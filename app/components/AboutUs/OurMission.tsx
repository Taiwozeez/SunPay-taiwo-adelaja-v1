"use client"

import Image from "next/image"

export default function OurMission() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto bg-pink-100 rounded-3xl p-8 md:p-12 lg:p-16">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#AC222D] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            ✦ OUR MISSION & VISION
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Our Vision and Mission: Driving Purpose, Inspiring Success
        </h2>

        {/* Content Grid */}
        <div className="space-y-12">
          {/* First Row - Image Left, Text Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600 h-96 md:h-[430px]">
              <Image
                src="/images/happy-man.jpg"
                alt="Man studying with tablet"
                width={300}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                We Are on the Mission to Optimize Your Study Plan
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To create an inclusive, innovative, and intuitive platform that empowers students
                to maximize their learning potential. We believe every student deserves tools that
                simplify learning, foster motivation, and provide clarity in their academic journey.
              </p>
            </div>
          </div>

          {/* Second Row - Text Left, Image Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                We Are Doing This Because;
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We understand the challenges of modern education—overwhelming workloads,
                inconsistent guidance, and lack of motivation. Our vision is to ensure a world
                where every student has the tools and support to unlock their full potential.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-400 to-cyan-500 h-96 md:h-[430px]">
              <Image
                src="/images/happy-lady.jpg"
                alt="Woman with books smiling"
                width={300}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
