"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const riderEvents = [
  {
    rider: "Marcus Johnson",
    event: "COMPLETED DELIVERY",
    eventTime: "NOW",
    earningActivity: "+₦12,500",
    status: "COMPLETED",
    actionBtn: "ASSIGN",
    actionColor: "bg-green-200 text-green-700",
  },
  {
    rider: "Stella Chen",
    event: "DELIVERING",
    eventTime: "11 mins ago",
    earningActivity: "₦12,500",
    status: "DISPATCHED",
    actionBtn: "TRACK",
    actionColor: "bg-purple-200 text-purple-700",
  },
  {
    rider: "Abdul Abubakar",
    event: "COMPLETED DELIVERY",
    eventTime: "10 mins ago",
    earningActivity: "+₦12,500",
    status: "COMPLETED",
    actionBtn: "ASSIGN",
    actionColor: "bg-green-200 text-green-700",
  },
  {
    rider: "Philip Njaibe",
    event: "OFFLINE",
    eventTime: "9 mins ago",
    earningActivity: "₦12,500",
    status: "OFFLINE",
    actionBtn: "ASSIGN",
    actionColor: "bg-gray-200 text-gray-700",
  },
  {
    rider: "Lisa Anderson",
    event: "ONLINE",
    eventTime: "8 mins ago",
    earningActivity: "₦12,500",
    status: "ONLINE",
    actionBtn: "ASSIGN",
    actionColor: "bg-green-200 text-green-700",
  },
  {
    rider: "Rachael Thompson",
    event: "WITHDRAWAL",
    eventTime: "7 mins ago",
    earningActivity: "-₦12,500",
    status: "SUCCESSFUL",
    actionBtn: "INVOICE",
    actionColor: "bg-teal-200 text-teal-700",
  },
  {
    rider: "James Wilson",
    event: "OFFLINE",
    eventTime: "6 mins ago",
    earningActivity: "₦12,500",
    status: "DISPATCHED",
    actionBtn: "TRACK",
    actionColor: "bg-purple-200 text-purple-700",
  },
  {
    rider: "David Kim",
    event: "OFFLINE",
    eventTime: "5 mins ago",
    earningActivity: "₦12,500",
    status: "OFFLINE",
    actionBtn: "ASSIGN",
    actionColor: "bg-gray-200 text-gray-700",
  },
  {
    rider: "Abdul Muhammed",
    event: "OFFLINE",
    eventTime: "4 mins ago",
    earningActivity: "₦12,500",
    status: "OFFLINE",
    actionBtn: "ASSIGN",
    actionColor: "bg-gray-200 text-gray-700",
  },
  {
    rider: "Israel Uzumaki",
    event: "OFFLINE",
    eventTime: "3 mins ago",
    earningActivity: "₦12,500",
    status: "OFFLINE",
    actionBtn: "ASSIGN",
    actionColor: "bg-gray-200 text-gray-700",
  },
]

const getStatusColor = (status: string) => {
  const statusMap: Record<string, { bg: string; text: string }> = {
    COMPLETED: { bg: "bg-[#EDF7EE]", text: "text-green-700" },
    DISPATCHED: { bg: "bg-[#FAF6FA]", text: "text-purple-700" },
    OFFLINE: { bg: "bg-gray-100", text: "text-gray-600" },
    ONLINE: { bg: "bg-teal-100", text: "text-teal-700" },
    SUCCESSFUL: { bg: "bg-teal-100", text: "text-teal-700" },
  }
  return statusMap[status] || { bg: "bg-gray-100", text: "text-gray-600" }
}

const getEarningColor = (earning: string) => {
  if (earning.startsWith("+")) return "text-green-600"
  if (earning.startsWith("-")) return "text-red-600"
  return "text-gray-600"
}

export function RiderEventsTable({ onEventTypeChange }: { onEventTypeChange: (type: string) => void }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Rider Event</h3>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search Queue..."
            className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <div className="relative">
            <select
              id="event-type-rider"
              aria-label="Event Type"
              className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none pr-8"
              onChange={(e) => onEventTypeChange(e.target.value.toLowerCase())}
            >
              <option value="rider">Rider</option>
              <option value="queue">Queue</option>
            </select>
          </div>
          <div className="relative">
            <select
              id="status-filter-rider"
              aria-label="Filter by Status"
              className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none pr-8"
            >
              <option>All</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-[#FFF4CC]">
              <TableHead className="bg-[#FFF4CC] text-xs font-semibold text-gray-600 uppercase">Rider</TableHead>
              <TableHead className="bg-[#FFF4CC] text-xs font-semibold text-gray-600 uppercase">Event</TableHead>
              <TableHead className="bg-[#FFF4CC] text-xs font-semibold text-gray-600 uppercase">Event Time</TableHead>
              <TableHead className="bg-[#FFF4CC] text-xs font-semibold text-gray-600 uppercase">
                Earning Activity
              </TableHead>
              <TableHead className="bg-[#FFF4CC] text-xs font-semibold text-gray-600 uppercase">Status</TableHead>
              <TableHead className="bg-[#FFF4CC] text-xs font-semibold text-gray-600 uppercase">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {riderEvents.map((event, index) => {
              const statusColor = getStatusColor(event.status)
              const earningColor = getEarningColor(event.earningActivity)
              return (
                <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="text-sm font-medium text-gray-900">{event.rider}</TableCell>
                  <TableCell className="text-sm font-semibold text-gray-900">{event.event}</TableCell>
                  <TableCell className="text-sm text-gray-600">{event.eventTime}</TableCell>
                  <TableCell className={`text-sm font-semibold ${earningColor}`}>{event.earningActivity}</TableCell>
                  <TableCell>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColor.bg} ${statusColor.text}`}>
                      {event.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button className={`text-xs font-semibold px-3 py-1 rounded-full ${event.actionColor}`}>
                      {event.actionBtn}
                    </button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm text-gray-600">Showing 1-10 of 100</span>
        <div className="flex gap-1">
          <button className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50">←</button>
          <button className="px-2 py-1 text-sm bg-teal-400 text-white rounded">1</button>
          <button className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50">2</button>
          <span className="px-2 py-1 text-sm text-gray-400">...</span>
          <button className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50">100</button>
          <button className="px-2 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50">→</button>
        </div>
      </div>
    </div>
  )
}
