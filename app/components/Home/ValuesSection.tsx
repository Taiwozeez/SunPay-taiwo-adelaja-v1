import Image from "next/image"

export default function ValuesSection() {
  const values = [
    {
      icon: "/images/book.png",
      title: "Personalized Study Plans",
      description: "Study plans to help you achieve your academic goals.",
    },
    {
      icon: "/images/diagram.png",
      title: "Actionable Insights",
      description: "Track your performances with detailed analytics in real-time.",
    },
    {
      icon: "/images/note-2.png",
      title: "Smart Content Access",
      description: "Study with AI Chat Buddy, designed to simplify your learning journey.",
    },
    {
      icon: "/images/people.png",
      title: "Peer Learning Support",
      description: "Learn better together by adding up to four study partners.",
    },
    {
      icon: "/images/star.png",
      title: "Motivation & Accountability",
      description: "Stay engaged with streaks, badges, and progress tracking.",
    },
    {
      icon: "/images/lamp-charge.png",
      title: "Plan smarter, stay on track.",
      description: "Get the resources you need, when you need them.",
    },
  ]

  return (
    <section className="w-full px-4 py-12 sm:py-16 md:px-8 md:py-20">
      <div className="relative mx-auto max-w-[1400px] bg-[#FFF0F1] rounded-3xl px-6 py-12 sm:px-10 md:px-12 md:py-16 lg:px-16 lg:py-20">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-[#AC222D] text-white text-sm font-medium px-4 py-2 rounded-full">
            <span className="text-lg">✦</span>
            <span>OUR CORE VALUES</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-16 max-w-2xl mx-auto leading-tight">
          What Makes Us Unique From Others
        </h2>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start justify-start text-left min-h-[260px]"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6 text-[#BC1823]">
                <Image
                  src={value.icon || "/placeholder.svg"}
                  alt={value.title}
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
