"use client"

const paymentMethods = [
  {
    id: 1,
    type: "visa",
    name: "Kevin Martin",
    number: "4728",
    expiry: "02/30",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    type: "paylio",
    name: "PAYLIO",
    gradient: "#1a365d",
  },
  {
    id: 3,
    type: "paypal",
    name: "PayPal",
    gradient: "#f8f9fa",
  },
  {
    id: 4,
    type: "blockchain",
    name: "BLOCKCHAIN",
    gradient: "#0d2137",
  },
  {
    id: 5,
    type: "add",
    name: "Add New",
  },
]

export function LinkedPayments() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900 font-semibold">Linked Payment system</h3>
        <button 
          type="button"
          className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded-full p-1"
          aria-label="Payment options menu"
          title="Payment options"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Visa Card */}
        <div
          className="rounded-xl p-4 text-white relative overflow-hidden h-28"
          style={{ background: paymentMethods[0].gradient }}
          role="button"
          tabIndex={0}
          aria-label={`Visa card ending in ${paymentMethods[0].number}, expires ${paymentMethods[0].expiry}, holder ${paymentMethods[0].name}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              // Handle card selection
            }
          }}
        >
          <div className="absolute top-3 right-3">
            <svg 
              width="32" 
              height="20" 
              viewBox="0 0 32 20" 
              fill="none"
              aria-hidden="true"
            >
              <rect width="32" height="20" rx="2" fill="#FFD700" />
              <text x="4" y="14" fill="#1a365d" fontSize="8" fontWeight="bold">
                VISA
              </text>
            </svg>
          </div>
          <p className="text-xs text-white/80 mt-8">{paymentMethods[0].name}</p>
          <p className="text-sm font-medium">${paymentMethods[0].number}</p>
          <p className="text-xs text-white/60">{paymentMethods[0].expiry}</p>
        </div>

        {/* Paylio Card */}
        <div 
          className="rounded-xl p-4 text-white relative overflow-hidden h-28" 
          style={{ background: paymentMethods[1].gradient }}
          role="button"
          tabIndex={0}
          aria-label={`Paylio payment method`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              // Handle card selection
            }
          }}
        >
          <div className="absolute top-3 right-3">
            <svg 
              width="32" 
              height="20" 
              viewBox="0 0 32 20" 
              fill="none"
              aria-hidden="true"
            >
              <rect width="32" height="20" rx="2" fill="#FFD700" />
              <text x="4" y="14" fill="#1a365d" fontSize="8" fontWeight="bold">
                VISA
              </text>
            </svg>
          </div>
          <p className="text-sm font-medium text-white/90 flex items-center gap-1 mt-2">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
            {paymentMethods[1].name}
          </p>
        </div>

        {/* PayPal Card */}
        <div 
          className="rounded-xl p-4 relative overflow-hidden h-28 bg-gray-50 border border-gray-200"
          role="button"
          tabIndex={0}
          aria-label={`PayPal payment method`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              // Handle card selection
            }
          }}
        >
          <div className="flex items-center gap-2 mt-2">
            <span className="text-blue-800 font-bold text-sm">{paymentMethods[2].name}</span>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" fill="#0070ba" />
              <text x="8" y="16" fill="white" fontSize="10" fontWeight="bold">
                P
              </text>
            </svg>
          </div>
          <div className="absolute bottom-3 right-3 flex">
            <div className="w-6 h-6 rounded-full bg-red-500 -mr-2" aria-hidden="true"></div>
            <div className="w-6 h-6 rounded-full bg-orange-400" aria-hidden="true"></div>
          </div>
        </div>

        {/* Blockchain Card */}
        <div 
          className="rounded-xl p-4 text-white relative overflow-hidden h-28" 
          style={{ background: paymentMethods[3].gradient }}
          role="button"
          tabIndex={0}
          aria-label={`Blockchain payment method`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              // Handle card selection
            }
          }}
        >
          <div className="flex items-center gap-2 mt-2">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="#00D395"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium">{paymentMethods[3].name}</span>
          </div>
        </div>

        {/* Add New Card */}
        <div 
          className="rounded-xl p-4 relative overflow-hidden h-28 bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center col-span-2 cursor-pointer hover:border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
          role="button"
          tabIndex={0}
          aria-label="Add new payment method"
          onClick={() => {
            // Handle add new payment method
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              // Handle add new payment method
            }
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#9ca3af" 
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span className="sr-only">Add new payment method</span>
        </div>
      </div>
    </div>
  )
}