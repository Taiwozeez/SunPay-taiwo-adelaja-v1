import Image from "next/image"

export default function CTA() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div
        className="max-w-7xl mx-auto rounded-3xl overflow-hidden flex items-center justify-center text-center"
        style={{
          background: "linear-gradient(to bottom, #560B10, #BC1823)",
        }}
      >
        <div className="flex flex-col items-center justify-center p-12 md:p-16 text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-4 w-fit">
            <span className="text-white text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
              ✦ Your Ultimate Study Companion
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
            Simplify Your Study Journey <br />
            With <span className="text-red-100">[APP NAME]</span>
          </h2>

          {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="inline-block hover:opacity-90 transition-opacity">
              <Image
                src="/images/Google-Play-button(1).png"
                alt="Get it on Google Play"
                width={190}
                height={60}
                className="h-auto"
              />
            </a>

            <a href="#" className="inline-block hover:opacity-90 transition-opacity">
              <Image
                src="/images/ios-button(1).png"
                alt="Download on the App Store"
                width={190}
                height={60}
                className="h-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
