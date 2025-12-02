import Image from "next/image"
import { cn } from "@/lib/utils"

interface OrdersStatCardProps {
  title: string
  value: string | number
  icon?: string
  className?: string
}

export function StatCard({ title, value, icon, className }: OrdersStatCardProps) {
  return (
    <div className={cn("bg-white rounded-xl p-6 border border-gray-100", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        {icon && (
          <div
            className="h-12 w-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#C9FCFB" }}
          >
            <Image src={icon || "/placeholder.svg"} alt={title} width={24} height={24} />
          </div>
        )}
      </div>
    </div>
  )
}
