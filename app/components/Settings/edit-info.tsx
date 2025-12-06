"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"

interface EditInfoProps {
  profileImage: string | null
  onImageChange: (image: string) => void
  onSave: () => void
  onCancel: () => void
}

export function EditInfo({ profileImage, onImageChange, onSave, onCancel }: EditInfoProps) {
  const [email, setEmail] = useState("taiwo.adelaja@email.com")
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onImageChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    onSave()
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
      {/* Profile Picture Upload Section */}
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-amber-100 border-4 border-amber-200 overflow-hidden flex items-center justify-center relative group">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Profile picture"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg 
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-amber-400" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
            <svg 
              className="w-6 h-6 sm:w-8 sm:h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
        <input 
          ref={fileInputRef} 
          id="profile-image-upload"
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="hidden"
          aria-label="Upload profile picture"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 sm:px-6 py-1.5 sm:py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 text-sm sm:text-base"
          type="button"
          aria-label="Upload photo"
        >
          Upload Photo
        </button>
        <span className="text-xs text-gray-400 text-center px-2">JPG, PNG. Max 2MB</span>
      </div>

      {/* Edit Form */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-6">Basic Information</h3>

        <div className="space-y-4 sm:space-y-5">
          {/* Customer Name - Not Editable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-600 mb-2">
                First Name
              </label>
              <div className="relative">
                <input
                  id="first-name"
                  type="text"
                  value="Taiwo"
                  disabled
                  aria-label="First name (cannot be changed)"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-600 mb-2">
                Last Name
              </label>
              <div className="relative">
                <input
                  id="last-name"
                  type="text"
                  value="Adelaja"
                  disabled
                  aria-label="Last name (cannot be changed)"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 -mt-2 sm:-mt-3" id="name-help-text">
            Name cannot be changed. Contact support for assistance.
          </p>

          {/* Email - Editable */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby="email-help-text"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <p id="email-help-text" className="sr-only">You can edit this field</p>
          </div>

          {/* Lamp No - Not Editable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label htmlFor="lamp-number" className="block text-sm font-medium text-gray-600 mb-2">
                Lamp No.
              </label>
              <input
                id="lamp-number"
                type="text"
                value="123456789"
                disabled
                aria-label="Lamp number (cannot be changed)"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="product-name" className="block text-sm font-medium text-gray-600 mb-2">
                Product Name
              </label>
              <input
                id="product-name"
                type="text"
                value="Powerplay"
                disabled
                aria-label="Product name (cannot be changed)"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Registration Date - Not Editable */}
          <div>
            <label htmlFor="registration-date" className="block text-sm font-medium text-gray-600 mb-2">
              Device Registration Date
            </label>
            <input
              id="registration-date"
              type="text"
              value="1/12/2025"
              disabled
              aria-label="Device registration date (cannot be changed)"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-0">
            <svg 
              className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span>Last saved 2 minutes ago</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={onCancel}
              className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-sm sm:text-base"
              type="button"
              aria-label="Cancel changes"
            >
              <svg 
                className="w-3 h-3 sm:w-4 sm:h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="whitespace-nowrap">Cancel</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 text-sm sm:text-base"
              type="button"
              aria-label={isSaving ? "Saving changes..." : "Save changes"}
            >
              <svg 
                className="w-3 h-3 sm:w-4 sm:h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              <span className="whitespace-nowrap">{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}