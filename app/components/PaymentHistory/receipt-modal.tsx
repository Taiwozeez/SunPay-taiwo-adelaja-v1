"use client"

import { useEffect } from "react"
import { HiX, HiCheck, HiPrinter } from "react-icons/hi"

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
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border-2 border-border">
        {/* Header - using gradient with primary */}
        <div className="bg-gradient-to-r from-primary to-accent px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-primary-foreground">Payment Receipt</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors"
            title="Close receipt"
            aria-label="Close receipt"
          >
            <HiX className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="p-6">
          {/* Status Badge */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                transaction.status === "Successful" ? "bg-success-light" : "bg-error-light"
              }`}
            >
              {transaction.status === "Successful" ? (
                <HiCheck className="w-8 h-8 text-success" />
              ) : (
                <HiX className="w-8 h-8 text-error" />
              )}
            </div>
          </div>

          <p
            className={`text-center text-lg font-semibold mb-6 ${
              transaction.status === "Successful" ? "text-success" : "text-error"
            }`}
          >
            Payment {transaction.status}
          </p>

          {/* Amount */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-1">Amount</p>
            <p className="text-3xl font-bold text-foreground">₦{transaction.amount.toLocaleString()}</p>
          </div>

          {/* Details */}
          <div className="bg-secondary rounded-xl p-4 space-y-3 border border-border">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Transaction ID</span>
              <span className="text-foreground font-medium text-sm">{transaction.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Date</span>
              <span className="text-foreground font-medium text-sm">{transaction.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Lamp No.</span>
              <span className="text-primary font-medium text-sm">{transaction.lampNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Keycode</span>
              <span className="text-cyan-600 font-medium text-sm font-mono">{transaction.keycode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Status</span>
              <span
                className={`font-medium text-sm ${transaction.status === "Successful" ? "text-success" : "text-error"}`}
              >
                {transaction.status}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              title="Print this receipt"
              aria-label="Print receipt"
            >
              <HiPrinter className="w-5 h-5" />
              Print Receipt
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-medium py-3 px-4 rounded-xl transition-colors"
              title="Close receipt"
              aria-label="Close receipt"
            >
              Close
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-muted px-6 py-3 text-center">
          <p className="text-xs text-muted-foreground">Thank you for your payment</p>
        </div>
      </div>
    </div>
  )
}
