"use client"

import { useEffect } from "react"

interface Transaction {
  id: string
  date: string
  amount: number
  lampNo: string
  keycode: string
  status: "Successful" | "Failed"
}

interface ReceiptModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
}

export function ReceiptModal({ isOpen, onClose, transaction }: ReceiptModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen || !transaction) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Payment Receipt</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            title="Close receipt"
            aria-label="Close receipt"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Receipt Content */}
        <div className="p-6">
          {/* Status Badge */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                transaction.status === "Successful" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {transaction.status === "Successful" ? (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              )}
            </div>
          </div>

          <p
            className={`text-center text-lg font-semibold mb-6 ${
              transaction.status === "Successful" ? "text-green-600" : "text-red-600"
            }`}
          >
            Payment {transaction.status}
          </p>

          {/* Amount */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">Amount</p>
            <p className="text-3xl font-bold text-gray-900">₦{transaction.amount.toLocaleString()}</p>
          </div>

          {/* Details */}
          <div className="bg-amber-50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Transaction ID</span>
              <span className="text-gray-900 font-medium text-sm">{transaction.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Date</span>
              <span className="text-gray-900 font-medium text-sm">{transaction.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Lamp No.</span>
              <span className="text-amber-600 font-medium text-sm">{transaction.lampNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Keycode</span>
              <span className="text-cyan-600 font-medium text-sm font-mono">{transaction.keycode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Status</span>
              <span
                className={`font-medium text-sm ${
                  transaction.status === "Successful" ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.status}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              title="Print this receipt"
              aria-label="Print receipt"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print Receipt
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors"
              title="Close receipt"
              aria-label="Close receipt"
            >
              Close
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 text-center">
          <p className="text-xs text-gray-400">Thank you for your payment</p>
        </div>
      </div>
    </div>
  )
}