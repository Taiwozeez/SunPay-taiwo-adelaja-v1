"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function AddMoney() {
  const [amount, setAmount] = useState("")
  const [copied, setCopied] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const accountNumber = "123456789"
  const accountName = "SunPay NG"

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
  }, [isDrawerOpen])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const AddMoneyCard = (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-gray-800 transition-all duration-500 ease-in-out">
      <h2 className="text-xl font-bold mb-3 text-center">Add Money</h2>

      {/* Wallet Balance */}
      <div className="mb-6 text-center">
        <p className="text-gray-600 text-sm mb-1">Wallet Balance</p>
        <p className="text-3xl font-extrabold text-gray-900 mb-3">₦12,500.00</p>
      </div>

      {/* Bank Info */}
      <div className="mb-8 text-center">
        <p className="text-gray-600 font-semibold mb-2">SunPay Bank Account</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl font-bold tracking-wider text-gray-900">
            {accountNumber}
          </span>
          <button
            onClick={handleCopy}
            className="text-sm text-yellow-500 hover:text-yellow-600 transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="mt-2 text-lg text-gray-700 font-semibold">
          Account Name: {accountName}
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="mx-3 text-gray-500 text-sm font-medium whitespace-nowrap">
          Or Pay with Card
        </span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Card Payment Fields */}
      <div className="mb-4">
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

      {/* Enter Amount */}
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

      {/* Buttons */}
      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition mb-3">
        Add Money
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
    <section id="add-money" className="py-12 px-4 sm:px-6 md:px-8 lg:px-12 mt-10 font-[Poppins]">
      <div
        className="relative max-w-[1400px] mx-auto rounded-3xl overflow-hidden flex items-center justify-center bg-cover bg-center min-h-[130vh] sm:min-h-[115vh]"
        style={{ backgroundImage: "url('/images/lady-phone2.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-10 gap-10">
          {/* Left Side */}
          <div className="text-center md:text-left max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
              Easily <span className="text-yellow-400">Add Money</span> <br /> to your Wallet
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Fund your wallet using your SunPay account or debit card in seconds.
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
                Add Money
              </button>
            )}
          </div>

          {/* Web Add Money Card */}
          {!isMobile && AddMoneyCard}
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
              {AddMoneyCard}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
