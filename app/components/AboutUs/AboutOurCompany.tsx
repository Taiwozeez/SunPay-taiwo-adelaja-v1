import Image from "next/image"

export default function AboutOurCompany() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-12">
          {/* Top Content - Badge, Heading, and Description in Flex */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex w-fit">
              <span className="bg-[#BC1823] text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                <span className="text-lg">✦</span>
                ABOUT OUR COMPANY
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight flex-1">
                We Treat Our Users Friendly with An Unparalleled Level of Service.
              </h2>

              {/* Description */}
              <p className="text-base text-muted-foreground leading-relaxed flex-1">
                We prioritize our users&rsquo; needs by offering seamless experiences and unmatched support, ensuring
                satisfaction at every step.
              </p>
            </div>
          </div>

          {/* Bottom Image */}
          <div className="w-full">
            <div className="relative w-full h-96 md:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-300 via-purple-400 to-purple-600">
              <Image src="/images/woman-working-laptop.jpg" alt="Woman working on laptop" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
