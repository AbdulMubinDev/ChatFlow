"use client"

import { Badge } from "@/components/ui/badge"

interface NotificationBadgeProps {
  count: number
}

export function NotificationBadge({ count }: NotificationBadgeProps) {
  if (count === 0) return null

  return (
    <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 px-1 bg-blue-500 text-white text-xs border-2 border-black hover:bg-blue-600">
      {count > 99 ? "99+" : count}
    </Badge>
  )
}
