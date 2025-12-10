"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { HiChatAlt2, HiCheck, HiUpload, HiX, HiPaperAirplane, HiPhotograph, HiDocument } from "react-icons/hi"

interface FilePreview {
  file: File
  preview: string
  type: "image" | "document"
}

export function SupportForm() {
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [files, setFiles] = useState<FilePreview[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles) return

    const newFiles: FilePreview[] = []

    Array.from(selectedFiles).forEach((file) => {
      const isImage = file.type.startsWith("image/")
      const preview = isImage ? URL.createObjectURL(file) : ""

      newFiles.push({
        file,
        preview,
        type: isImage ? "image" : "document",
      })
    })

    setFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev]
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview)
      }
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
    setEmail("")
    setSubject("")
    setMessage("")
    setFiles([])

    setTimeout(() => setSubmitted(false), 3000)
  }

  const getFileIcon = (type: string) => {
    if (type === "image") {
      return <HiPhotograph className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
    }
    return <HiDocument className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
  }

  return (
    <div className="bg-secondary rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-border relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-primary/30 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-primary/30 rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-primary rounded-lg sm:rounded-xl">
            <HiChatAlt2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-foreground truncate">Send us a Message</h3>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">We typically respond within 24 hours</p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-success-light border border-success/30 rounded-xl p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <HiCheck className="w-6 h-6 sm:w-8 sm:h-8 text-success" />
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-success mb-2">Message Sent Successfully!</h4>
            <p className="text-sm sm:text-base text-success">Our support team will get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                aria-label="Your email address"
                className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-card border-2 border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent transition-all text-foreground placeholder-muted-foreground"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="How can we help?"
                required
                aria-label="Subject of your message"
                className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-card border-2 border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent transition-all text-foreground placeholder-muted-foreground"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or question in detail..."
                required
                rows={4}
                className="min-h-[120px] sm:min-h-[150px] w-full px-4 py-3 text-sm sm:text-base bg-card border-2 border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent transition-all resize-none text-foreground placeholder-muted-foreground"
                aria-label="Your message"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Attachments (Optional)</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-primary/50 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center cursor-pointer hover:border-primary hover:bg-secondary/50 transition-all"
                role="button"
                tabIndex={0}
                aria-label="Click to upload files"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    fileInputRef.current?.click()
                  }
                }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <HiUpload className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <p className="text-sm sm:text-base text-foreground font-medium">Click to upload files</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">PNG, JPG, PDF up to 10MB</p>
              </div>
              <input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                aria-label="File upload"
              />
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">{files.length} file(s) selected</p>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="relative bg-card rounded-lg sm:rounded-xl border-2 border-border p-2 sm:p-3 group"
                    >
                      {file.type === "image" && file.preview ? (
                        <div className="relative w-full h-16 sm:h-20 rounded-lg mb-1 sm:mb-2 overflow-hidden">
                          <Image
                            src={file.preview || "/placeholder.svg"}
                            alt={`Preview of ${file.file.name}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-16 sm:h-20 bg-secondary rounded-lg flex items-center justify-center mb-1 sm:mb-2">
                          {getFileIcon(file.type)}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground truncate">{file.file.name}</p>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-error"
                        aria-label={`Remove ${file.file.name}`}
                      >
                        <HiX className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              aria-label={isSubmitting ? "Sending message..." : "Send message"}
              className="w-full py-3 sm:py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm sm:text-base"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" aria-hidden="true">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <HiPaperAirplane className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}