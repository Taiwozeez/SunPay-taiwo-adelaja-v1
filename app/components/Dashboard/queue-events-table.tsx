"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

const queueEvents = [
  {
    id: "QORD-436",
    company: "TechCorp",
    action: "QUEUE CLOSED",
    colleagues: 8,
    status: "DISPATCHED",
    fee: "₦333 per person",
    actionBtn: "TRACK",
    actionColor: "bg-purple-200 text-purple-700",
  },
  {
    id: "QORD-437",
    company: "Innovate Labs",
    action: "MEMBER JOINED",
    colleagues: 8,
    status: "PENDING",
    fee: "₦333 per person",
    actionBtn: "ALERT",
    actionColor: "bg-amber-200 text-amber-700",
  },
  {
    id: "QORD-438",
    company: "Digital Solutions",
    action: "DELIVERY COMPLETED",
    colleagues: 8,
    status: "COMPLETED",
    fee: "₦333 per person",
    actionBtn: "INVOICE",
    actionColor: "bg-teal-200 text-teal-700",
  },
  {
    id: "QORD-439",
    company: "Startup Hub",
    action: "QUEUE CREATED",
    colleagues: 8,
    status: "PENDING",
    fee: "₦333 per person",
    actionBtn: "ASSIGN",
    actionColor: "bg-amber-200 text-amber-700",
  },
  {
    id: "QORD-440",
    company: "CreativeWorks",
    action: "RIDER ASSIGNED",
    colleagues: 8,
    status: "DISPATCHED",
    fee: "₦333 per person",
    actionBtn: "TRACK",
    actionColor: "bg-purple-200 text-purple-700",
  },
  {
    id: "QORD-441",
    company: "CreativeWorks",
    action: "QUEUE CLOSED",
    colleagues: 8,
    status: "DISPATCHED",
    fee: "₦333 per person",
    actionBtn: "TRACK",
    actionColor: "bg-purple-200 text-purple-700",
  },
  {
    id: "QORD-442",
    company: "CreativeWorks",
    action: "QUEUE CLOSED",
    colleagues: 8,
    status: "DISPATCHED",
    fee: "₦333 per person",
    actionBtn: "TRACK",
    actionColor: "bg-purple-200 text-purple-700",
  },
  {
    id: "QORD-443",
    company: "CreativeWorks",
    action: "QUEUE CLOSED",
    colleagues: 8,
    status: "DISPATCHED",
    fee: "₦333 per person",
    actionBtn: "TRACK",
    actionColor: "bg-purple-200 text-purple-700",
  },
  {
    id: "QORD-444",
    company: "CreativeWorks",
    action: "QUEUE CLOSED",
    colleagues: 8,
    status: "DISPATCHED",
    fee: "₦333 per person",
    actionBtn: "TRACK",
    actionColor: "bg-purple-200 text-purple-700",
  },
  {
    id: "QORD-445",
    company: "CreativeWorks",
    action: "DELIVERY COMPLETED",
    colleagues: 8,
    status: "DISPATCHED",
    fee: "₦333 per person",
    actionBtn: "TRACK",
    actionColor: "bg-purple-200 text-purple-700",
  },
  {
    id: "QORD-446",
    company: "CreativeWorks",
    action: "QUEUE CLOSED",
    colleagues: 8,
    status: "DISPATCHED",
    fee: "₦333 per person",
    actionBtn: "TRACK",
    actionColor: "bg-purple-200 text-purple-700",
  },
]

const getStatusColor = (status: string) => {
  const statusMap: Record<string, { bg: string; text: string }> = {
    DISPATCHED: { bg: "bg-[#FAF6FA]", text: "text-gray-700" },
    PENDING: { bg: "bg-[#FFF4CC]", text: "text-gray-700" },
    COMPLETED: { bg: "bg-[#EDF7EE]", text: "text-gray-700" },
  }
  return statusMap[status] || { bg: "bg-gray-100", text: "text-gray-600" }
}

export function QueueEventsTable({ onEventTypeChange }: { onEventTypeChange: (type: string) => void }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Queue Events</h3>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search Queue..."
            className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <div className="relative">
            <select
              id="event-type-queue"
              aria-label="Event Type"
              className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none pr-8"
              onChange={(e) => onEventTypeChange(e.target.value.toLowerCase())}
            >
              <option value="queue">Queue</option>
              <option value="rider">Rider</option>
            </select>
          </div>
          <div className="relative">
            <select className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none pr-8">
              <option>All</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-[#FFF4CC]">
              <TableHead className="bg-[#FFF4CC] text-xs font-semibold text-gray-600 uppercase">Queue ID</TableHead>
              <TableHead className="bg-[#FFF4CC] text-xs font-semibold text-gray-600 uppercase">Company</TableHead>
              <TableHead className="bg-[#FFF4CC] text-xs font-semibold text-gray-600 uppercase">Action</TableHead>
              <TableHead className="bg-[#FFF4CC] text-xs font-semibold text-gray-600 uppercase">
                No. of Colleagues
              </TableHead>
              <TableHead className="bg-[#FFF4CC] text-xs font-semibold text-gray-600 uppercase">Status</TableHead>
              <TableHead className="bg-[#FFF4CC] text-xs font-semibold text-gray-600 uppercase">
                Delivery Fee Split
              </TableHead>
              <TableHead className="bg-[#FFF4CC] text-xs font-semibold text-gray-600 uppercase">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queueEvents.map((event, index) => {
              const statusColor = getStatusColor(event.status)
              return (
                <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="text-sm font-medium text-gray-900">{event.id}</TableCell>
                  <TableCell className="text-sm text-gray-600">{event.company}</TableCell>
                  <TableCell className="text-sm font-semibold text-gray-900">{event.action}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Image src="/diverse-group-outdoors.png" alt="colleagues" width={16} height={16} />
                      <span className="text-sm text-gray-600">{event.colleagues} colleagues</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColor.bg} ${statusColor.text}`}>
                      {event.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{event.fee}</TableCell>
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
    </div>
  )
}
