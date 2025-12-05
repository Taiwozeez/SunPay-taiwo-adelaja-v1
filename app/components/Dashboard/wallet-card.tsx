"use client"

interface WalletCardProps {
  userName: string
  balance: number
  lastReceived: number
}

export function WalletCard({ userName, balance, lastReceived }: WalletCardProps) {
  return (
    <div
      className="rounded-2xl p-6 text-white relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #3b5998 50%, #6b5b95 100%)" }}
    >
      <div className="flex justify-between items-start mb-8">
        <p className="text-white/90 text-sm">Hi, {userName}!</p>
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <rect width="20" height="14" rx="2" fill="#fff" />
            <rect y="0" width="20" height="2" fill="#B22234" />
            <rect y="2" width="20" height="2" fill="#fff" />
            <rect y="4" width="20" height="2" fill="#B22234" />
            <rect y="6" width="20" height="2" fill="#fff" />
            <rect y="8" width="20" height="2" fill="#B22234" />
            <rect y="10" width="20" height="2" fill="#fff" />
            <rect y="12" width="20" height="2" fill="#B22234" />
            <rect width="8" height="7" fill="#3C3B6E" />
          </svg>
          <span className="text-sm">US Dollar</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-5xl font-light tracking-tight">
          ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
      </div>

      <p className="text-sm mb-8">
        Last Received{" "}
        <span className="text-green-400">${lastReceived.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
      </p>

      <div className="flex gap-3">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
          Transfer Money
        </button>
        <button className="bg-transparent border border-white/30 hover:bg-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
          Add Money
        </button>
        <button className="bg-transparent border border-white/30 hover:bg-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
          Withdraw
        </button>
      </div>

      {/* Three dots menu */}
      <button className="absolute bottom-6 right-6 text-white/60 hover:text-white">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>
    </div>
  )
}
