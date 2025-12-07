"use client"

import { useState, useEffect } from "react"
import { ReceiptModal } from "./receipt-modal"
import { HiDownload, HiEye, HiChevronLeft, HiChevronRight } from "react-icons/hi"

interface Transaction {
  id: string
  date: string
  amount: number
  lampNo: string
  keycode: string
  status: "Successful" | "Failed"
}

// Function to generate random 15-digit keycode in format XXX-XXX-XXX-XXX-XXX
const generateKeycode = (): string => {
  const digits = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join("")
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 9)}-${digits.slice(9, 12)}-${digits.slice(12, 15)}`
}

const allTransactions: Transaction[] = [
  {
    id: "TXN001",
    date: "1 Nov 2025",
    amount: 2000,
    lampNo: "LX: 4872859",
    keycode: generateKeycode(),
    status: "Successful",
  },
  {
    id: "TXN002",
    date: "2 Nov 2025",
    amount: 3500,
    lampNo: "LX: 80216847",
    keycode: "N/A",
    status: "Failed",
  },
  {
    id: "TXN003",
    date: "3 Nov 2025",
    amount: 1200,
    lampNo: "LX: 61497125",
    keycode: generateKeycode(),
    status: "Successful",
  },
  {
    id: "TXN004",
    date: "4 Nov 2025",
    amount: 5000,
    lampNo: "LX: 21547860",
    keycode: generateKeycode(),
    status: "Successful",
  },
  {
    id: "TXN005",
    date: "5 Nov 2025",
    amount: 1800,
    lampNo: "LX: 78012548",
    keycode: "N/A",
    status: "Failed",
  },
  {
    id: "TXN006",
    date: "6 Nov 2025",
    amount: 7000,
    lampNo: "LX: 34692378",
    keycode: generateKeycode(),
    status: "Successful",
  },
  {
    id: "TXN007",
    date: "7 Nov 2025",
    amount: 2750,
    lampNo: "LX: 56781234",
    keycode: generateKeycode(),
    status: "Successful",
  },
  {
    id: "TXN008",
    date: "8 Nov 2025",
    amount: 3100,
    lampNo: "LX: 91254578",
    keycode: "N/A",
    status: "Failed",
  },
  {
    id: "TXN009",
    date: "15 Nov 2025",
    amount: 4200,
    lampNo: "LX: 12345678",
    keycode: generateKeycode(),
    status: "Successful",
  },
  {
    id: "TXN010",
    date: "20 Nov 2025",
    amount: 6500,
    lampNo: "LX: 87654321",
    keycode: generateKeycode(),
    status: "Successful",
  },
]

export function PaymentHistoryTable() {
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(allTransactions)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const itemsPerPage = isMobile ? 5 : 8
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage)

  const handleApplyFilter = () => {
    if (!fromDate && !toDate) {
      setFilteredTransactions(allTransactions)
      return
    }

    const filtered = allTransactions.filter((txn) => {
      const txnDate = new Date(txn.date)
      const from = fromDate ? new Date(fromDate) : null
      const to = toDate ? new Date(toDate) : null

      if (from && to) {
        return txnDate >= from && txnDate <= to
      } else if (from) {
        return txnDate >= from
      } else if (to) {
        return txnDate <= to
      }
      return true
    })

    setFilteredTransactions(filtered)
    setCurrentPage(1)
  }

  const handleClearFilter = () => {
    setFromDate("")
    setToDate("")
    setFilteredTransactions(allTransactions)
    setCurrentPage(1)
  }

  const handleDownloadStatement = () => {
    const csvContent = [
      ["Date", "Amount", "Lamp No.", "Keycode", "Status"],
      ...filteredTransactions.map((t) => [t.date, `₦${t.amount}`, t.lampNo, t.keycode, t.status]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "payment-statement.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleViewReceipt = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsModalOpen(true)
  }

  return (
    <div className="bg-gradient-to-br from-secondary via-muted to-secondary rounded-2xl p-4 sm:p-5 md:p-6 relative overflow-hidden w-full max-w-none mx-0 border-2 border-border">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(247 216 26 / 0.3) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Payment History</h2>
            <p className="text-sm sm:text-base text-muted-foreground">View and manage your payment records</p>
          </div>

          <button
            onClick={handleDownloadStatement}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground font-medium py-3 px-5 rounded-xl transition-colors w-full sm:w-auto"
            title="Download payment statement as CSV"
            aria-label="Download payment statement"
          >
            <HiDownload className="w-5 h-5" />
            <span className="whitespace-nowrap text-sm sm:text-base">Download Statement</span>
          </button>
        </div>

        {/* Date Filters */}
        <div className="bg-card rounded-xl p-4 sm:p-5 mb-6 shadow-sm w-full border-2 border-border">
          <div className="flex flex-col sm:flex-row gap-4 items-end w-full">
            <div className="flex-1 w-full">
              <label htmlFor="from-date" className="block text-sm sm:text-base font-medium text-foreground mb-2">
                From Date
              </label>
              <input
                id="from-date"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent bg-input text-foreground"
                title="Select start date for filtering"
                aria-label="Filter transactions from date"
              />
            </div>
            <div className="flex-1 w-full">
              <label htmlFor="to-date" className="block text-sm sm:text-base font-medium text-foreground mb-2">
                To Date
              </label>
              <input
                id="to-date"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent bg-input text-foreground"
                title="Select end date for filtering"
                aria-label="Filter transactions to date"
              />
            </div>
            <div className="flex gap-3 w-full sm:w-auto mt-2 sm:mt-0">
              <button
                onClick={handleApplyFilter}
                className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground font-medium py-3 sm:py-3.5 px-5 sm:px-6 rounded-xl transition-colors text-sm sm:text-base"
                title="Apply date filter"
                aria-label="Apply filter"
              >
                Apply
              </button>
              <button
                onClick={handleClearFilter}
                className="flex-1 sm:flex-none bg-muted hover:bg-muted/80 text-foreground font-medium py-3 sm:py-3.5 px-5 sm:px-6 rounded-xl transition-colors text-sm sm:text-base"
                title="Clear date filter"
                aria-label="Clear filter"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Table - Mobile Card View */}
        {isMobile ? (
          <div className="space-y-4 w-full">
            {paginatedTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-card rounded-xl p-4 shadow-sm border-2 border-border w-full">
                <div className="flex justify-between items-start mb-4 w-full">
                  <div className="min-w-0 pr-2">
                    <p className="text-base font-medium text-foreground truncate">{transaction.date}</p>
                    <p className="text-xl font-bold text-foreground truncate">₦{transaction.amount.toLocaleString()}</p>
                  </div>
                  <span
                    className={`text-sm font-medium px-3 py-1.5 rounded-full flex-shrink-0 ${
                      transaction.status === "Successful"
                        ? "bg-success-light text-success"
                        : "bg-error-light text-error"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>

                <div className="space-y-3 text-sm w-full">
                  <div className="flex justify-between w-full">
                    <span className="text-muted-foreground flex-shrink-0 text-sm">Lamp No.</span>
                    <span className="text-primary font-medium truncate ml-2 text-right max-w-[65%] text-sm">
                      {transaction.lampNo}
                    </span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="text-muted-foreground flex-shrink-0 text-sm">Keycode</span>
                    <span className="text-cyan-600 font-mono text-xs break-all ml-2 text-right max-w-[65%]">
                      {transaction.keycode}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleViewReceipt(transaction)}
                  className="w-full mt-5 flex items-center justify-center gap-2 text-sm text-primary hover:text-accent font-medium py-3 border-2 border-border rounded-lg hover:bg-secondary transition-colors"
                  title={`View receipt for transaction ${transaction.id}`}
                  aria-label={`View receipt for transaction ${transaction.id}`}
                >
                  <HiEye className="w-5 h-5" />
                  View Receipt
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Table - Desktop View */
          <div className="bg-card rounded-xl shadow-sm overflow-hidden w-full border-2 border-border">
            <div className="overflow-x-auto w-full">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary border-b-2 border-border">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Date</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Amount</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Lamp No.</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Keycode</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Status</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((transaction, index) => (
                    <tr
                      key={transaction.id}
                      className={`border-b border-border hover:bg-secondary/50 transition-colors ${
                        index % 2 === 0 ? "bg-card" : "bg-muted/30"
                      }`}
                    >
                      <td className="py-4 px-4 text-sm text-foreground">{transaction.date}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-foreground">
                        ₦{transaction.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-sm text-primary font-medium">{transaction.lampNo}</td>
                      <td className="py-4 px-4 text-sm text-cyan-600 font-mono min-w-[180px]">{transaction.keycode}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`text-sm font-medium ${
                            transaction.status === "Successful" ? "text-success" : "text-error"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleViewReceipt(transaction)}
                          className="flex items-center gap-1 text-sm text-primary hover:text-accent font-medium transition-colors"
                          title={`View receipt for transaction ${transaction.id}`}
                          aria-label={`View receipt for transaction ${transaction.id}`}
                        >
                          <HiEye className="w-4 h-4" />
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-4 py-5 mt-6 w-full">
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of{" "}
            {filteredTransactions.length} transactions
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-lg border-2 border-border flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-foreground"
              title="Go to previous page"
              aria-label="Previous page"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-foreground px-3">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center justify-center hover:from-accent hover:to-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Go to next page"
              aria-label="Next page"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      <ReceiptModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} transaction={selectedTransaction} />
    </div>
  )
}
