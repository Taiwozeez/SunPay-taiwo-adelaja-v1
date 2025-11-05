"use client"

const PolicyHero = () => {
  return (
    <div className="relative w-full px-4 py-12 md:px-8 md:py-16">
      {/* Main container with gradient background */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#BC1823] to-[#8B1219] px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
        {/* Decorative stars */}
        <div className="absolute left-8 top-12 text-white text-2xl animate-expand-return">✦</div>
        <div className="absolute left-12 top-32 text-white text-xl animate-expand-return [animation-delay:0.5s]">✦</div>
        <div className="absolute right-16 top-8 text-white text-sm animate-expand-return [animation-delay:1s]">▲</div>
        <div className="absolute right-24 top-20 text-white text-2xl animate-expand-return [animation-delay:1.5s]">
          ✦
        </div>
        <div className="absolute right-12 bottom-20 text-white text-sm animate-expand-return [animation-delay:2s]">
          ▲
        </div>
        <div className="absolute right-32 bottom-12 text-white text-sm animate-expand-return [animation-delay:2.5s]">
          ▲
        </div>
        <div className="absolute left-1/4 top-16 text-white text-xl animate-expand-return [animation-delay:3s]">✦</div>
        <div className="absolute left-1/3 bottom-16 text-white text-sm animate-expand-return [animation-delay:3.5s]">
          ✦
        </div>
        <div className="absolute right-1/4 bottom-20 text-purple-300 text-sm animate-expand-return [animation-delay:4s]">
          ✦
        </div>
        <div className="absolute left-20 top-24 text-white text-lg animate-expand-return [animation-delay:0.8s]">✦</div>
        <div className="absolute left-1/2 top-8 text-purple-300 text-sm animate-expand-return [animation-delay:1.2s]">
          ✦
        </div>
        <div className="absolute right-40 top-32 text-white text-xl animate-expand-return [animation-delay:1.8s]">
          ✦
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          {/* Heading */}
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">Privacy Policy</h1>

          {/* Description */}
          <p className="mb-8 text-base text-white/90 md:text-lg leading-relaxed">
            Welcome to [Platform Name]. Your privacy is important to us, and we are committed to protecting your
            personal information. This Privacy Policy outlines how we collect, use, store, and protect your data.
          </p>

          {/* Last updated badge */}
          <div className="inline-block">
            <div className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white">
              Last updated: June 23 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PolicyHero
