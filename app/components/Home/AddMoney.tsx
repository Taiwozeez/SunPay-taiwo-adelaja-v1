"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"

interface VirtualAccount {
  accountNumber: string;
  bankName: string;
  accountName: string;
}

export default function AddMoney() {
  const [amount, setAmount] = useState("")
  const [copied, setCopied] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [virtualAccount, setVirtualAccount] = useState<VirtualAccount | null>(null)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  const accountNumber = "123456789"
  const accountName = "SunPay NG"

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
  }, [isDrawerOpen])

  // Listen for MakePayment Add Money button event
  useEffect(() => {
    const openDrawer = () => setIsDrawerOpen(true)
    window.addEventListener("openAddMoneyDrawer", openDrawer)
    return () => window.removeEventListener("openAddMoneyDrawer", openDrawer)
  }, [])

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft === 0) {
      setVirtualAccount(null)
      setTimeLeft(null)
      return
    }

    if (timeLeft && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleCopy = async () => {
    if (virtualAccount) {
      await navigator.clipboard.writeText(virtualAccount.accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const generateVirtualAccount = () => {
    // Generate a random 10-digit account number
    const generatedAccountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString()
    
    const newVirtualAccount: VirtualAccount = {
      accountNumber: generatedAccountNumber,
      bankName: "Sunpay NG",
      accountName: "Go Sunpay"
    }
    
    setVirtualAccount(newVirtualAccount)
    setTimeLeft(3600) // 60 minutes in seconds
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  // AddMoneyCard JSX remains the same
  const AddMoneyCard = (
    <div className="bg-white rounded-2xl p-6 w-full max-w-md text-gray-800 transition-all duration-500 ease-in-out">
      <h2 className="text-xl font-bold mb-3 text-center">Add Money</h2>
      <div className="mb-6 text-center">
        <p className="text-gray-600 text-sm mb-1">Wallet Balance</p>
        <p className="text-3xl font-extrabold text-gray-900 mb-3">₦12,500.00</p>
      </div>
      
      {/* Virtual Account Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-600 font-semibold mb-3 text-center">Virtual Account</p>
        
        {virtualAccount ? (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl font-bold tracking-wider text-gray-900">
                {virtualAccount.accountNumber}
              </span>
              <button 
                type="button" 
                onClick={handleCopy} 
                className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Bank:</span> {virtualAccount.bankName}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Account Name:</span> {virtualAccount.accountName}
            </p>
            {timeLeft !== null && (
              <p className="text-xs text-red-600 font-medium">
                This account will expire in {formatTime(timeLeft)}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              Generate a temporary virtual account to add money
            </p>
            <button 
              type="button"
              onClick={generateVirtualAccount}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Generate Virtual Account
            </button>
          </div>
        )}
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
      <button type="button" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition mb-3">
        Add Money
      </button>
      <Link href="/help">
        <button type="button" className="w-full text-red-600 font-medium text-sm hover:underline">
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
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-10 gap-10">
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
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition hover:bg-yellow-500"
              >
                Add Money
              </button>
            )}
          </div>
          {!isMobile && AddMoneyCard}
        </div>

        {/* Shadcn Drawer for mobile */}
        {isMobile && (
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerContent className="max-h-[90vh] overflow-hidden">
              <div className="overflow-y-auto max-h-full">
                <DrawerHeader className="text-left relative pr-12 pb-0">
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors text-2xl font-bold text-gray-700"
                  >
                    ×
                  </button>
                </DrawerHeader>
                <div className="p-6 pb-8 -mt-4">
                  {AddMoneyCard}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </section>
  )
}