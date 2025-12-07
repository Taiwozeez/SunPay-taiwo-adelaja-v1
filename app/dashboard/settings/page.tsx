"use client"

import { useState } from "react"
import { PersonalDetails } from "../../components/Settings/personal-details"
import { EditInfo } from "../../components/Settings/edit-info"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"details" | "edit">("details")
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const handleReset = () => {
    setProfileImage(null)
  }

  const handleSave = () => {
    setActiveTab("details")
  }

  const handleCancel = () => {
    setActiveTab("details")
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-full">
      {/* Removed max-width constraint on mobile, added it back on sm breakpoint */}
      <div className="mx-auto w-full sm:max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Personal Information</h1>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors self-start sm:self-auto text-sm sm:text-base"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset Changes
          </button>
        </div>

        {/* Main Card - Wider on mobile */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs - Adjusted for mobile */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab("details")}
              className={`flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-4 font-medium transition-colors relative ${
                activeTab === "details" ? "text-amber-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="text-sm sm:text-base">Personal Details</span>
              {activeTab === "details" && (
                <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
              {activeTab === "details" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />}
            </button>
            <button
              onClick={() => setActiveTab("edit")}
              className={`flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-4 font-medium transition-colors relative ${
                activeTab === "edit" ? "text-amber-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="text-sm sm:text-base">Edit Info</span>
              {activeTab === "edit" && (
                <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </span>
              )}
              {activeTab === "edit" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />}
            </button>
          </div>

          {/* Content - Adjusted padding for mobile */}
          <div className="p-4 sm:p-6 lg:p-8">
            {activeTab === "details" ? (
              <PersonalDetails profileImage={profileImage} />
            ) : (
              <EditInfo
                profileImage={profileImage}
                onImageChange={setProfileImage}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}