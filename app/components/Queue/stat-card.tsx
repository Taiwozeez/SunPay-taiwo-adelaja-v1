import Image from "next/image"
import { cn } from "@/lib/utils"

interface QueueStatCardProps {
  title: string
  value: string | number
  subtitle: string
  subtitleColor?: "green" | "blue"
  icon?: string
  className?: string
}

export function QueueStatCard({
  title,
  value,
  subtitle,
  subtitleColor = "green",
  icon,
  className,
}: QueueStatCardProps) {
  return (
    <div className={cn("bg-white rounded-xl p-6 border border-gray-100", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <p className={cn("text-sm mt-2 font-medium", subtitleColor === "green" ? "text-green-600" : "text-blue-600")}>
            {subtitle}
          </p>
        </div>
        {icon && (
          <div
            className="h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#C9FCFB" }}
          >
            <Image src={icon || "/placeholder.svg"} alt={title} width={24} height={24} />
          </div>
        )}
      </div>
    </div>
  )
}
