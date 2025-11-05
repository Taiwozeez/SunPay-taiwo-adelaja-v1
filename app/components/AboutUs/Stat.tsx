import Image from "next/image"

export default function Stat() {
  const stats = [
    {
      icon: "/images/profile-2user1.png",
      number: "13k",
      label: "Active Users",
    },
    {
      icon: "/images/favorite-chart.png",
      number: "98%",
      label: "User Satisfaction",
    },
    {
      icon: "/images/shield-tick.png",
      number: "14",
      label: "Years of Experience",
    },
    {
      icon: "/images/people.png",
      number: "43",
      label: "Partners",
    },
  ]

  return (
    <div className="w-full py-12 px-6">
      {/* Top horizontal line */}
      <div className="mx-auto max-w-6xl border-t border-gray-200 pt-10">
        {/* Mobile Layout - 2x2 grid */}
        <div className="md:hidden grid grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-2">
              <Image
                src={stat.icon || "/placeholder.svg"}
                alt={stat.label}
                width={40}
                height={40}
                className="h-10 w-10 flex-shrink-0"
              />
              <div>
                <p className="text-xl font-bold text-gray-900">{stat.number}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout - Horizontal with separators */}
        <div className="hidden md:flex flex-wrap items-center justify-between gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={stat.icon || "/placeholder.svg"}
                  alt={stat.label}
                  width={40}
                  height={40}
                  className="h-10 w-10 flex-shrink-0"
                />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.number}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
              {index < stats.length - 1 && (
                <div className="hidden h-16 w-px bg-gray-200 md:block" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom horizontal line */}
        <div className="mt-10 border-t border-gray-200" />
      </div>
    </div>
  )
}