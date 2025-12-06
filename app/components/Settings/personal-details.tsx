"use client"

import Image from "next/image"

interface PersonalDetailsProps {
  profileImage: string | null
}

export function PersonalDetails({ profileImage }: PersonalDetailsProps) {
  const userInfo = [
    { label: "Customer Name", value: "Taiwo Adelaja" },
    { label: "Email Address", value: "taiwo.adelaja@email.com" },
    { label: "Lamp No.", value: "123456789" },
    { label: "Product Name", value: "Powerplay" },
    { label: "Device Registration Date", value: "1/12/2025" },
  ]

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-amber-100 border-4 border-amber-200 overflow-hidden flex items-center justify-center">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Profile"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </div>
        <span className="text-xs sm:text-sm text-gray-500 font-medium">Profile Photo</span>
      </div>

      {/* User Information List */}
      <div className="flex-1">
        {/* Updated heading with mobile-specific text size */}
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">Account Information</h3>
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-100 overflow-hidden">
          {userInfo.map((item, index) => (
            <div
              key={item.label}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 ${
                index !== userInfo.length - 1 ? "border-b border-amber-100" : ""
              }`}
            >
              <span className="text-xs sm:text-sm text-gray-500 font-medium mb-1 sm:mb-0">{item.label}</span>
              <span className="text-sm sm:text-base font-semibold text-gray-800 truncate pl-2 sm:pl-0 text-right sm:text-left">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Account Status */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 rounded-xl border border-green-100 flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-green-800 truncate">Account Active</p>
            <p className="text-xs text-green-600 truncate">Your device is registered and active</p>
          </div>
        </div>
      </div>
    </div>
  )
}