"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function MakePayment() {
  const [paymentMethod, setPaymentMethod] = useState("wallet")
  const [lampNo, setLampNo] = useState("")
  const [amount, setAmount] = useState("")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const customerName =
    lampNo.length === 9 ? "Taiwo Adelaja" : lampNo.length > 0 ? "Invalid Lamp Number" : ""

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
  }, [isDrawerOpen])

  const PaymentCard = (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-gray-800 transition-all duration-500 ease-in-out">
      <h2 className="text-xl font-bold mb-3 text-center">Make Payment</h2>

      {/* Wallet Balance */}
      <div className="mb-6 text-center">
        <p className="text-gray-600 text-sm mb-1">Wallet Balance</p>
        <p className="text-3xl font-extrabold text-gray-900 mb-3">₦12,500.00</p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-md transition text-sm">
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
          onChange={(e) => setLampNo(e.target.value.replace(/\D/g, ""))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-yellow-400 outline-none"
          maxLength={9}
        />
        {lampNo.length > 0 && (
          <p
            className={`mt-2 text-sm font-medium ${
              lampNo.length === 9 ? "text-green-600" : "text-red-500"
            }`}
          >
            {customerName}
          </p>
        )}
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-600 font-semibold mb-2">
          Enter Amount
        </label>
        <input
          id="amount"
          type="number"
          placeholder="₦0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-yellow-400 outline-none"
        />
      </div>

      {/* Payment Options */}
      <div className="mb-4">
        <p className="text-gray-600 font-semibold mb-2">Pay With</p>
        <div className="flex gap-3">
          <button
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

      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition mb-3">
        Continue
      </button>

      {/* Report an Issue linking to /help */}
      <Link href="/help">
        <button className="w-full text-red-600 font-medium text-sm hover:underline">
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
      <div
        className={`relative max-w-[1400px] mx-auto rounded-3xl overflow-hidden bg-cover bg-center flex items-center justify-center transition-all duration-500 ease-in-out
        ${
          paymentMethod === "card"
            ? "min-h-[160vh] sm:min-h-[125vh]"
            : "min-h-[130vh] sm:min-h-[115vh]"
        }`}
        style={{
          backgroundImage: "url('/images/lady-phone.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-10 gap-10">
          {/* Left Text */}
          <div className="text-center md:text-left max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
              A better way to <br /> <span className="text-yellow-400">Make Payment</span>
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Pay your lamp bill instantly with your preferred method — Card or Wallet.
            </p>

            {!isMobile ? (
              <button className="bg-white/10 border border-white px-6 py-3 rounded-lg text-white font-medium hover:bg-white/20 transition">
                ▶ See How it Works
              </button>
            ) : (
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition hover:bg-yellow-500"
              >
                Make Payment
              </button>
            )}
          </div>

          {/* Web Payment Card */}
          {!isMobile && PaymentCard}
        </div>

        {/* Mobile Drawer */}
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
