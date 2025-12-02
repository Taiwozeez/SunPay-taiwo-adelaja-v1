import Image from "next/image"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: string
    positive?: boolean
  }
  icon?: string
  className?: string
}

export function StatCard({ title, value, subtitle, trend, icon, className }: StatCardProps) {
  return (
    <div className={cn("bg-white rounded-xl p-4 border border-gray-100", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p
              className={cn("text-xs mt-1 flex items-center gap-1", trend.positive ? "text-teal-600" : "text-red-500")}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
              {trend.value}
            </p>
          )}
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {icon && (
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#C9FCFB" }}
          >
            <Image src={icon || "/placeholder.svg"} alt={title} width={20} height={20} />
          </div>
        )}
      </div>
    </div>
  )
}
