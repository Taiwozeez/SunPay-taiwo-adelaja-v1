interface PayoutCardProps {
  amount: number
}

export function PayoutCard({ amount }: PayoutCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col items-center justify-center h-full">
      <p className="text-3xl font-semibold text-gray-900 mb-1">
        ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </p>
      <p className="text-indigo-600 text-sm font-medium">Payouts</p>
    </div>
  )
}
