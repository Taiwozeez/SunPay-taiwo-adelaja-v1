"use client"

import { useState, useRef } from "react"
import Image from "next/image"

type ContactContent =
  | { label: string; type: "email" | "phone" }
  | { label: string; icon: string }

interface ContactSection {
  title: string
  availability: string
  content: ContactContent[]
}

export default function OurContacts() {
  const [message, setMessage] = useState("")
  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const contactSections: ContactSection[] = [
    {
      title: "EMAIL SUPPORT",
      availability: "Available Monday to Saturday, 9 AM - 5 PM",
      content: [{ label: "edurght@wecool.com", type: "email" }],
    },
    {
      title: "PHONE/CHAT SUPPORT",
      availability: "Available Monday to Saturday, 9 AM - 5 PM",
      content: [
        { label: "(+234) 709 7866 346", type: "phone" },
        { label: "(+234) 814 5678 843", type: "phone" },
      ],
    },
    {
      title: "SOCIAL MEDIA PAGES SUPPORT",
      availability: "Available Monday to Saturday, 9 AM - 5 PM",
      content: [
        { label: "Instagram", icon: "/images/instagram.svg" },
        { label: "Facebook", icon: "/images/facebook.svg" },
        { label: "X (Twitter)", icon: "/images/twitter.svg" },
      ],
    },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name)
    }
  }

  const handleSendMessage = () => {
    if (message.trim() || fileName) {
      alert(
        `Message sent: ${message}${fileName ? `\nAttached file: ${fileName}` : ""}`
      )
      setMessage("")
      setFileName("")
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const renderIcon = (item: ContactContent) => {
    if ("type" in item) {
      if (item.type === "email") {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-yellow-500 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        )
      } else if (item.type === "phone") {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-yellow-500 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a2 2 0 011.71 1l1.57 2.5a2 2 0 01-.36 2.62l-1.33 1.06a16 16 0 006.06 6.06l1.06-1.33a2 2 0 012.62-.36l2.5 1.57a2 2 0 011 1.71V19a2 2 0 01-2 2h-1C7.82 21 3 16.18 3 10V5z"
            />
          </svg>
        )
      }
    } else if ("icon" in item) {
      return <Image src={item.icon} alt={item.label} width={24} height={24} />
    }
    return null
  }

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-yellow-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {contactSections.map((section, index) => (
          <div key={index} className="bg-yellow-100 rounded-lg p-6 md:p-8">
            <div className="mb-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
              <p className="text-sm text-gray-700">{section.availability}</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-lg">
              <div className="space-y-3">
                {section.content.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {renderIcon(item)}
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Live Chat Input */}
        <div id="live-chat" className="bg-yellow-100 rounded-lg p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Live Chat</h3>
          <div className="relative flex items-center gap-2">
            <label htmlFor="chatMessage" className="sr-only">
              Type your message for SunPay NG
            </label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute left-3 text-gray-500 hover:text-gray-700"
              aria-label="Attach file"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-6-6m6 6l6-6" />
              </svg>
            </button>
            <input
              type="text"
              id="chatMessage"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              title="Enter your message for SunPay NG"
              className="flex-1 border border-gray-300 rounded-lg pl-10 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700"
            />
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-lg flex items-center justify-center transition"
              onClick={handleSendMessage}
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
          {fileName && <p className="mt-2 text-sm text-gray-700">Attached: {fileName}</p>}
        </div>
      </div>
    </section>
  )
}
