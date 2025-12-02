"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

interface RidersTableRow {
  id: string
  name: string
  avatar: string
  phone: string
  status: "ONLINE" | "ON DELIVERY" | "OFFLINE"
  lastActive: string
  earningsToday: string
  deliveries: number
}

const ridersData: RidersTableRow[] = [
  {
    id: "1",
    name: "Abdul Abubakar Abdul",
    avatar: "/rider-avatar.jpg",
    phone: "+234 801 2345 678",
    status: "ONLINE",
    lastActive: "Now",
    earningsToday: "₦33,333",
    deliveries: 45,
  },
  {
    id: "2",
    name: "Philip Nzube Nwabilii",
    avatar: "/rider-avatar.jpg",
    phone: "+234 801 2345 678",
    status: "ON DELIVERY",
    lastActive: "Now",
    earningsToday: "₦33,333",
    deliveries: 12,
  },
  {
    id: "3",
    name: "Okonicha Michelle Buchi",
    avatar: "/rider-avatar.jpg",
    phone: "+234 801 2345 678",
    status: "OFFLINE",
    lastActive: "1 day ago",
    earningsToday: "₦33,333",
    deliveries: 3,
  },
  {
    id: "4",
    name: "Abraham Anthony",
    avatar: "/rider-avatar.jpg",
    phone: "+234 801 2345 678",
    status: "OFFLINE",
    lastActive: "1 day ago",
    earningsToday: "₦33,333",
    deliveries: 1,
  },
  {
    id: "5",
    name: "Loveth Danjuma Idundu",
    avatar: "/rider-avatar.jpg",
    phone: "+234 801 2345 678",
    status: "OFFLINE",
    lastActive: "1 day ago",
    earningsToday: "33,333",
    deliveries: 0,
  },
  {
    id: "6",
    name: "Loveth Danjuma Idundu",
    avatar: "/rider-avatar.jpg",
    phone: "+234 801 2345 678",
    status: "ON DELIVERY",
    lastActive: "Now",
    earningsToday: "₦33,333",
    deliveries: 0,
  },
  {
    id: "7",
    name: "Loveth Danjuma Idundu",
    avatar: "/rider-avatar.jpg",
    phone: "+234 801 2345 678",
    status: "ON DELIVERY",
    lastActive: "Now",
    earningsToday: "₦33,333",
    deliveries: 0,
  },
  {
    id: "8",
    name: "Loveth Danjuma Idundu",
    avatar: "/rider-avatar.jpg",
    phone: "+234 801 2345 678",
    status: "ON DELIVERY",
    lastActive: "Now",
    earningsToday: "₦33,333",
    deliveries: 0,
  },
  {
    id: "9",
    name: "Loveth Danjuma Idundu",
    avatar: "/rider-avatar.jpg",
    phone: "+234 801 2345 678",
    status: "ONLINE",
    lastActive: "Now",
    earningsToday: "₦33,333",
    deliveries: 0,
  },
  {
    id: "10",
    name: "Loveth Danjuma Idundu",
    avatar: "/rider-avatar.jpg",
    phone: "+234 801 2345 678",
    status: "ONLINE",
    lastActive: "Now",
    earningsToday: "₦33,333",
    deliveries: 0,
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "ONLINE":
      return "bg-green-100 text-green-700"
    case "ON DELIVERY":
      return "bg-orange-100 text-orange-700"
    case "OFFLINE":
      return "bg-gray-100 text-gray-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

function getActionButton(status: string) {
  if (status === "ONLINE") {
    return (
      <button className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 hover:bg-green-200">
        ASSIGN
      </button>
    )
  } else if (status === "ON DELIVERY") {
    return (
      <button className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-200 text-purple-700 hover:bg-purple-300">
        TRACK
      </button>
    )
  } else {
    return (
      <button className="text-gray-400 hover:text-gray-600">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5C7 5 2.73 7.61 2.73 11c0 3.31 4.27 5.9 9.27 5.9.35 0 .69-.03 1.03-.07-.36.48-.84.93-1.33 1.31-.48.39-1.35.87-2.95.87.58-.26 1.78-1.13 2.37-1.95.21-.29.42-.61.62-.96A5.1 5.1 0 0 1 2.73 11c0-3.39 4.27-6 9.27-6 1.64 0 3.2.3 4.67.85" />
        </svg>
      </button>
    )
  }
}

export function RidersTable() {
  const [status, setStatus] = useState("All")

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">All Riders</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search Riders..."
              className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 w-40"
            />
            <div className="flex items-center gap-2">
              <label htmlFor="rider-status-filter" className="text-sm text-gray-600">
                Status:
              </label>
              <select
                id="rider-status-filter"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option>All</option>
                <option>Online</option>
                <option>On Delivery</option>
                <option>Offline</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow style={{ backgroundColor: "#FFF4CC" }}>
            <TableHead className="font-bold text-gray-900">USERS</TableHead>
            <TableHead className="font-bold text-gray-900">PHONE NUMBER</TableHead>
            <TableHead className="font-bold text-gray-900">STATUS</TableHead>
            <TableHead className="font-bold text-gray-900">LAST ACTIVE</TableHead>
            <TableHead className="font-bold text-gray-900">EARNINGS TODAY</TableHead>
            <TableHead className="font-bold text-gray-900">DELIVERIES</TableHead>
            <TableHead className="font-bold text-gray-900">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ridersData.map((row) => (
            <TableRow key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    src={row.avatar || "/placeholder.svg"}
                    alt={row.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-900">{row.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-gray-600">{row.phone}</TableCell>
              <TableCell>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(row.status)}`}
                >
                  {row.status}
                </span>
              </TableCell>
              <TableCell className="text-sm text-gray-600">{row.lastActive}</TableCell>
              <TableCell className="text-sm font-medium text-gray-900">{row.earningsToday}</TableCell>
              <TableCell className="text-sm text-gray-600">{row.deliveries}</TableCell>
              <TableCell>{getActionButton(row.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm text-gray-600">Showing 1-10 of 100</span>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">←</button>
          <button className="p-2 px-3 bg-teal-400 text-white rounded-lg">1</button>
          <button className="p-2 px-3 text-gray-600 hover:bg-gray-100 rounded-lg">2</button>
          <button className="p-2 px-3 text-gray-600 hover:bg-gray-100 rounded-lg">...</button>
          <button className="p-2 px-3 text-gray-600 hover:bg-gray-100 rounded-lg">100</button>
          <button className="p-2 text-gray-400 hover:text-gray-600">→</button>
        </div>
      </div>
    </div>
  )
}
