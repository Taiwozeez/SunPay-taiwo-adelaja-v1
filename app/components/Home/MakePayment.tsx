"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

type ScheduleType = "days" | "weeks" | "months" | "years"

export default function MakePayment() {
  const [paymentMethod, setPaymentMethod] = useState("wallet")
  const [lampNo, setLampNo] = useState("")
  const [amount, setAmount] = useState("")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Scheduling states
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [scheduleType, setScheduleType] = useState<ScheduleType>("days")
  const [scheduleCount, setScheduleCount] = useState(1)
  const [scheduledActive, setScheduledActive] = useState(false)
  const [scheduleAmount, setScheduleAmount] = useState("") // New state for schedule amount

  // Address confirmation state
  const [showAddress, setShowAddress] = useState(false)

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Address confirmation logic
  useEffect(() => {
    if (lampNo.length === 9 && /^\d+$/.test(lampNo)) {
      setShowAddress(true)
    } else {
      setShowAddress(false)
    }
  }, [lampNo])

  const customerName =
    lampNo.length === 9 ? "Taiwo Adelaja" : lampNo.length > 0 ? "Invalid Lamp Number" : ""

  // Prevent background scroll when drawer or modal is open
  useEffect(() => {
    if (isDrawerOpen || isScheduleModalOpen || isSuccessModalOpen)
      document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
  }, [isDrawerOpen, isScheduleModalOpen, isSuccessModalOpen])

  // ✅ Confirm schedule
  const handleScheduleConfirm = () => {
    if (!scheduleAmount) {
      alert("Please enter an amount for the scheduled payment")
      return
    }
    setScheduledActive(true)
    setIsScheduleModalOpen(false)
    setIsSuccessModalOpen(true)
  }

  // ✅ Cancel schedule
  const cancelSchedule = () => {
    setScheduledActive(false)
    setScheduleCount(1)
    setScheduleType("days")
    setScheduleAmount("")
  }

  // ✅ Scheduled text display
  const scheduledText = scheduledActive
    ? `₦${scheduleAmount || 0} deducted every ${scheduleCount} ${scheduleCount === 1 ? scheduleType.slice(0, -1) : scheduleType}`
    : ""

  // Format lamp number input
  const formatLampNumber = (text: string) => {
    return text.replace(/[^0-9]/g, "").slice(0, 9)
  }

  // Open schedule modal
  const openScheduleModal = () => {
    setScheduleAmount(amount) // Pre-fill with current amount
    setIsScheduleModalOpen(true)
  }

  // Handle interval selection
  const handleIntervalSelect = (interval: ScheduleType) => {
    setScheduleType(interval)
  }

  // ==========================
  // 💳 Payment Card Component
  // ==========================
  const PaymentCard = (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-gray-800 transition-all duration-500 ease-in-out">
      <h2 className="text-xl font-bold mb-3 text-center">Make Payment</h2>

      {/* Active Schedule Indicator */}
      {scheduledActive && (
        <div className="mb-4 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-green-700 text-sm font-medium">
              Payment scheduled • {scheduledText}
            </span>
          </div>
          <button
            type="button"
            onClick={cancelSchedule}
            className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-1 rounded transition"
          >
            Manage
          </button>
        </div>
      )}

      {/* Wallet Balance */}
      <div className="mb-6 text-center">
        <p className="text-gray-600 text-sm mb-1">Wallet Balance</p>
        <p className="text-3xl font-extrabold text-gray-900 mb-3">₦14,003.98</p>
        <button
          type="button"
          onClick={() => {
            if (isMobile) {
              window.dispatchEvent(new CustomEvent("openAddMoneyDrawer"))
            } else {
              const section = document.getElementById("add-money")
              section?.scrollIntoView({ behavior: "smooth" })
            }
          }}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-md transition text-sm"
        >
          Add Money
        </button>
      </div>

      {/* Lamp Number Input */}
      <div className="mb-4">
        <label htmlFor="lampNo" className="block text-gray-600 font-semibold mb-2">
          Enter Lamp No.
        </label>
        <input
          id="lampNo"
          type="text"
          placeholder="e.g. 003842109"
          value={lampNo}
          onChange={(e) => setLampNo(formatLampNumber(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-yellow-400 outline-none"
          maxLength={9}
        />
        
        {/* Address Confirmation */}
        {showAddress && (
          <div className="mt-2 flex items-start bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <svg className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-700 text-sm font-medium">
              Adelaja Taiwo - 2B, Sunpay Street, Off Mall Avenue, Ojota, Lagos
            </span>
          </div>
        )}
      </div>

      {/* Amount Input + Schedule Button */}
      <div className="mb-4 relative">
        <label htmlFor="amount" className="block text-gray-600 font-semibold mb-2">
          Enter Amount
        </label>
        <div className="flex items-center">
          <input
            id="amount"
            type="number"
            placeholder="₦0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <button
            type="button"
            onClick={openScheduleModal}
            className={`ml-2 font-semibold px-3 py-2 rounded-lg transition text-sm ${
              scheduledActive 
                ? "bg-yellow-500 text-black" 
                : "bg-yellow-400 hover:bg-yellow-500 text-black"
            }`}
          >
            Schedule
          </button>
        </div>

        {/* Schedule Text Display */}
        {scheduledActive && scheduledText && (
          <div className="mt-2">
            <p className="text-yellow-600 text-sm text-center font-medium italic">
              {scheduledText}
            </p>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Schedule Payment</h3>

            {/* Amount Input */}
            <div className="mb-4">
              <label htmlFor="scheduleAmount" className="block text-gray-600 mb-2 font-medium">
                Enter Amount
              </label>
              <input
                id="scheduleAmount"
                type="number"
                placeholder="₦0.00"
                value={scheduleAmount}
                onChange={(e) => setScheduleAmount(e.target.value)}
                className="w-full border-2 border-yellow-400 bg-yellow-50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2 font-medium">
                Select Interval
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["days", "weeks", "months", "years"] as ScheduleType[]).map((interval) => (
                  <button
                    key={interval}
                    type="button"
                    onClick={() => handleIntervalSelect(interval)}
                    className={`px-3 py-2 rounded-lg border transition ${
                      scheduleType === interval
                        ? "bg-yellow-400 border-yellow-400 text-black font-semibold"
                        : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {interval.charAt(0).toUpperCase() + interval.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 mb-2 font-medium">
                Set Count
              </label>
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setScheduleCount(Math.max(1, scheduleCount - 1))}
                  className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-lg hover:bg-yellow-500 transition"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-gray-800 min-w-8 text-center">
                  {scheduleCount}
                </span>
                <button
                  type="button"
                  onClick={() => setScheduleCount(scheduleCount + 1)}
                  className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-lg hover:bg-yellow-500 transition"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleScheduleConfirm}
                className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full text-center mx-4">
            <div className="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Scheduled Successfully</h3>
            <p className="text-green-600 font-semibold mb-2">{scheduledText}</p>
            <p className="text-gray-700 mb-4 text-sm italic">You can cancel anytime from the payment section</p>
            <button
              type="button"
              onClick={() => setIsSuccessModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Payment Method */}
      <div className="mb-4">
        <p className="text-gray-600 font-semibold mb-2">Pay With</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod("wallet")}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium border transition ${
              paymentMethod === "wallet"
                ? "bg-yellow-400 text-black border-yellow-400"
                : "bg-gray-100 hover:bg-gray-200 border-gray-300"
            }`}
          >
            Wallet
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium border transition ${
              paymentMethod === "card"
                ? "bg-yellow-400 text-black border-yellow-400"
                : "bg-gray-100 hover:bg-gray-200 border-gray-300"
            }`}
          >
            Card
          </button>
        </div>
      </div>

      {/* Card Details Section */}
      {paymentMethod === "card" && (
        <div className="mb-4 animate-fadeIn">
          <p className="text-gray-600 font-semibold mb-3">Enter Card Details</p>
          <div className="flex items-center gap-3 mb-3 justify-center">
            <Image src="/images/visaLogo.png" alt="Visa" width={40} height={25} />
            <Image src="/images/mastercardLogo.png" alt="Mastercard" width={40} height={25} />
            <Image src="/images/VerveLogo.png" alt="Verve" width={40} height={25} />
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Card Number"
              maxLength={19}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <div className="flex gap-3 flex-wrap sm:flex-nowrap">
              <input
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                className="w-[45%] sm:flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              <input
                type="text"
                placeholder="CVV"
                maxLength={3}
                className="w-[45%] sm:flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition mb-3"
      >
        Continue
      </button>

      {/* Report Issue */}
      <Link href="/help">
        <button type="button" className="w-full text-red-600 font-medium text-sm hover:underline">
          Report an Issue
        </button>
      </Link>
    </div>
  )

  return (
    <section
      id="make-payment"
      className="py-12 px-4 sm:px-6 md:px-8 lg:px-12 mt-10"
    >
      <style jsx>{`
        @keyframes pulseRadar {
          0% {
            box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.6);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(250, 204, 21, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(250, 204, 21, 0);
          }
        }
        .radar-animate {
          animation: pulseRadar 2s infinite;
        }
      `}</style>

      <div
        className={`relative max-w-[1400px] mx-auto rounded-3xl overflow-hidden bg-cover bg-center flex items-center justify-center transition-all duration-500 ease-in-out ${
          paymentMethod === "card"
            ? "min-h-[160vh] sm:min-h-[125vh]"
            : "min-h-[130vh] sm:min-h-[115vh]"
        }`}
        style={{
          backgroundImage: "url('/images/lady-phone.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-10 gap-10">
          <div className="text-center md:text-left max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
              A better way to <br />{" "}
              <span className="text-yellow-400">Make Payment</span>
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Pay your lamp bill instantly with your preferred method — Card or
              Wallet.
            </p>

            {!isMobile ? (
              <button className="bg-white/10 border border-white px-6 py-3 rounded-lg text-white font-medium hover:bg-white/20 transition">
                ▶ See How it Works
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition hover:bg-yellow-500 radar-animate"
              >
                Pay On Device
              </button>
            )}
          </div>

          {!isMobile && PaymentCard}
        </div>

        {/* Drawer for mobile */}
        {isMobile && (
          <div
            className={`fixed inset-0 z-50 bg-black/60 flex items-end justify-center md:hidden transition-all duration-700 ease-out ${
              isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`bg-white rounded-t-3xl w-full max-w-md p-6 shadow-lg transform transition-transform duration-700 ease-out h-[80vh] overflow-y-auto relative ${
                isDrawerOpen ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="absolute top-4 right-4 text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
              {PaymentCard}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}