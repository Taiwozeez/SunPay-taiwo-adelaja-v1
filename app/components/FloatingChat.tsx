"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, type Variants, type TargetAndTransition } from "framer-motion"
import {
  HiChat,
  HiX,
  HiPhone,
  HiMail,
  HiOutlineLightBulb,
  HiOutlineCurrencyDollar,
  HiOutlineExclamation,
  HiOutlineCog,
  HiArrowLeft,
} from "react-icons/hi"
import { TbSolarPanel } from "react-icons/tb"

type Message = {
  id: number
  text: string
  isBot: boolean
  time: string
}

type Issue = {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  cause: string
  solution: string
}

type ContactInfo = {
  icon: React.ReactNode
  label: string
  value: string
  action: () => void
}

export default function FloatingChat() {
  const [showMessage, setShowMessage] = useState(false)
  const [showChatBox, setShowChatBox] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your SunPay assistant. I can help you with solar system issues or payment problems. Select an issue below:",
      isBot: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [viewingIssue, setViewingIssue] = useState(false)
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Solar troubleshooting options
  const solarIssues: Issue[] = [
    {
      id: "solar-1",
      icon: <TbSolarPanel className="w-5 h-5" />,
      title: "No Power Output",
      description: "System not generating electricity",
      cause: "Possible causes: Cloudy weather, faulty inverter, panel obstruction, or loose connections.",
      solution:
        "1. Check weather conditions\n2. Verify inverter display\n3. Inspect for panel shading\n4. Contact technical support",
    },
    {
      id: "solar-2",
      icon: <HiOutlineLightBulb className="w-5 h-5" />,
      title: "Low Power Generation",
      description: "Reduced energy production",
      cause: "Dusty panels, partial shading, seasonal changes, or aging components.",
      solution: "1. Clean solar panels\n2. Trim nearby trees\n3. Monitor daily production\n4. Schedule maintenance",
    },
    {
      id: "solar-3",
      icon: <HiOutlineExclamation className="w-5 h-5" />,
      title: "Inverter Error",
      description: "Display showing error codes",
      cause: "Overheating, grid issues, internal faults, or communication errors.",
      solution:
        "1. Check error code in manual\n2. Ensure proper ventilation\n3. Verify grid connection\n4. Contact technician",
    },
  ]

  // Payment troubleshooting options
  const paymentIssues: Issue[] = [
    {
      id: "payment-1",
      icon: <HiOutlineCurrencyDollar className="w-5 h-5" />,
      title: "Failed Payment",
      description: "Transaction not completed",
      cause: "Insufficient funds, network issues, bank restrictions, or incorrect details.",
      solution:
        "1. Verify account balance\n2. Check network connection\n3. Contact your bank\n4. Try alternative payment",
    },
    {
      id: "payment-2",
      icon: <HiOutlineExclamation className="w-5 h-5" />,
      title: "Double Charged",
      description: "Duplicate transaction detected",
      cause: "Network lag, multiple submissions, or system error.",
      solution:
        "1. Wait 24 hours for auto-refund\n2. Check transaction history\n3. Contact support with receipt\n4. File dispute with bank",
    },
    {
      id: "payment-3",
      icon: <HiOutlineCog className="w-5 h-5" />,
      title: "Account Not Updated",
      description: "Payment not reflecting in account",
      cause: "Processing delay, incorrect account link, or system maintenance.",
      solution:
        "1. Wait 1-2 business days\n2. Verify account number\n3. Check payment confirmation\n4. Submit receipt to support",
    },
  ]

  const contactInfo: ContactInfo[] = [
    {
      icon: <HiPhone className="w-4 h-4" />,
      label: "Call Support",
      value: "+234 800 123 4567",
      action: () => {
        window.location.href = "tel:+2348001234567"
      },
    },
    {
      icon: <HiMail className="w-4 h-4" />,
      label: "Email Support",
      value: "support@sunpay.com",
      action: () => {
        window.location.href = "mailto:support@sunpay.com"
      },
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 1000)
    const hideTimer = setTimeout(() => setShowMessage(false), 7000)
    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  // Close chat box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatBoxRef.current && !chatBoxRef.current.contains(event.target as Node)) {
        setShowChatBox(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Scroll to bottom when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleIssueClick = (issue: Issue) => {
    // Add user selection as a message
    const userMessage: Message = {
      id: messages.length + 1,
      text: `Selected: ${issue.title}`,
      isBot: false,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    // Add bot response with cause and solution
    const botResponse: Message = {
      id: messages.length + 2,
      text: `🔍 **Issue**: ${issue.title}\n\n📋 **Cause**: ${issue.cause}\n\n✅ **Solution**:\n${issue.solution}\n\n💡 Need further assistance? Contact our support team.`,
      isBot: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, userMessage, botResponse])
    setViewingIssue(true)
  }

  const handleReturnToMenu = () => {
    setViewingIssue(false)
  }

  const messageVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      x: 50,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  const chatBoxVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 100,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      x: 100,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  }

  const chatButtonVariants: Variants = {
    rest: {
      scale: 1,
      y: 0,
    },
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const pulseVariants: Variants = {
    pulse1: {
      scale: [1, 1.5, 1],
      opacity: [0.4, 0, 0.4],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
        ease: "easeOut",
      },
    },
    pulse2: {
      scale: [1, 1.8, 1],
      opacity: [0.5, 0, 0.5],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  }

  const floatAnimation: TargetAndTransition = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop" as const,
      ease: "easeInOut",
    },
  }

  return (
    <>
      {/* Chat Box */}
      <AnimatePresence>
        {showChatBox && (
          <motion.div
            ref={chatBoxRef}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            variants={chatBoxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Chat Header */}
            <div className="bg-[#FFCB05] text-neutral-black p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">SunPay Assistant</h3>
                <p className="text-sm opacity-90">Solar & Payment Support</p>
              </div>
              <button
                type="button"
                onClick={() => setShowChatBox(false)}
                className="text-neutral-black hover:opacity-70 transition-opacity"
                aria-label="Close chat"
                title="Close chat"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[90%] rounded-2xl px-4 py-3 ${
                      msg.isBot
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-tl-none"
                        : "bg-[#FFCB05] text-neutral-black rounded-tr-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">{msg.time}</p>
                  </div>
                </div>
              ))}

              {/* Return to Menu Button - Show when viewing issue */}
              {viewingIssue && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleReturnToMenu}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#FFCB05] text-neutral-black hover:opacity-90 transition-opacity font-medium"
                    title="Return to menu"
                    aria-label="Return to menu"
                  >
                    <HiArrowLeft className="w-4 h-4" />
                    <span>Return to Menu</span>
                  </button>
                </div>
              )}

              {/* Solar Issues Section - Show when not viewing issue and no messages beyond initial */}
              {!viewingIssue && messages.length <= 1 && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TbSolarPanel className="w-4 h-4 text-[#FFCB05]" />
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Solar System Issues</h4>
                  </div>
                  <div className="space-y-2">
                    {solarIssues.map((issue) => (
                      <button
                        type="button"
                        key={issue.id}
                        onClick={() => handleIssueClick(issue)}
                        className="w-full text-left p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                        title={`Select ${issue.title}`}
                        aria-label={`Select ${issue.title}: ${issue.description}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-[#FFCB05] text-neutral-black">{issue.icon}</div>
                          <div>
                            <p className="font-medium text-sm text-gray-800 dark:text-gray-200 group-hover:text-[#FFCB05]">
                              {issue.title}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{issue.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Issues Section - Show when not viewing issue and no messages beyond initial */}
              {!viewingIssue && messages.length <= 1 && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <HiOutlineCurrencyDollar className="w-4 h-4 text-[#FFCB05]" />
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Payment Issues</h4>
                  </div>
                  <div className="space-y-2">
                    {paymentIssues.map((issue) => (
                      <button
                        type="button"
                        key={issue.id}
                        onClick={() => handleIssueClick(issue)}
                        className="w-full text-left p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                        title={`Select ${issue.title}`}
                        aria-label={`Select ${issue.title}: ${issue.description}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-[#FFCB05] text-neutral-black">{issue.icon}</div>
                          <div>
                            <p className="font-medium text-sm text-gray-800 dark:text-gray-200 group-hover:text-[#FFCB05]">
                              {issue.title}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{issue.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Show issues again after returning from viewing an issue */}
              {!viewingIssue && messages.length > 1 && (
                <>
                  <div className="mt-6">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select another issue or contact support:
                      </p>
                    </div>
                  </div>

                  {/* Solar Issues Section */}
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <TbSolarPanel className="w-4 h-4 text-[#FFCB05]" />
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Solar System Issues</h4>
                    </div>
                    <div className="space-y-2">
                      {solarIssues.map((issue) => (
                        <button
                          type="button"
                          key={issue.id}
                          onClick={() => handleIssueClick(issue)}
                          className="w-full text-left p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                          title={`Select ${issue.title}`}
                          aria-label={`Select ${issue.title}: ${issue.description}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[#FFCB05] text-neutral-black">{issue.icon}</div>
                            <div>
                              <p className="font-medium text-sm text-gray-800 dark:text-gray-200 group-hover:text-[#FFCB05]">
                                {issue.title}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{issue.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Issues Section */}
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <HiOutlineCurrencyDollar className="w-4 h-4 text-[#FFCB05]" />
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Payment Issues</h4>
                    </div>
                    <div className="space-y-2">
                      {paymentIssues.map((issue) => (
                        <button
                          type="button"
                          key={issue.id}
                          onClick={() => handleIssueClick(issue)}
                          className="w-full text-left p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                          title={`Select ${issue.title}`}
                          aria-label={`Select ${issue.title}: ${issue.description}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[#FFCB05] text-neutral-black">{issue.icon}</div>
                            <div>
                              <p className="font-medium text-sm text-gray-800 dark:text-gray-200 group-hover:text-[#FFCB05]">
                                {issue.title}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{issue.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Contact Info */}
            <div className="border-t border-gray-300 dark:border-gray-600 p-3 bg-gray-100 dark:bg-gray-700">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Need human assistance?</p>
              <div className="flex gap-2">
                {contactInfo.map((contact, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={contact.action}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium bg-[#FFCB05] text-neutral-black hover:opacity-90 transition-opacity rounded-md"
                    title={contact.label}
                    aria-label={contact.label}
                  >
                    {contact.icon}
                    <span className="hidden sm:inline">{contact.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <AnimatePresence>
        {!showChatBox && (
          <motion.div
            className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Message Bubble */}
            <AnimatePresence>
              {showMessage && (
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 px-4 py-2 max-w-xs"
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Need help?</p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={() => setShowChatBox(true)}
              className="relative w-14 h-14 rounded-full bg-[#FFCB05] text-neutral-black shadow-xl hover:shadow-2xl flex items-center justify-center transition-shadow"
              variants={chatButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              title="Open chat"
              aria-label="Open chat"
            >
              <HiChat className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
