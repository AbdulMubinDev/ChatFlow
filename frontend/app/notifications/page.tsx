import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, UserPlus, Hash } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "message",
      user: "Sarah Chen",
      avatar: "SC",
      content: "mentioned you in #general",
      message: "Hey @johndoe, can you review the PR?",
      timestamp: "2 minutes ago",
      isRead: false,
      roomId: 1,
    },
    {
      id: 2,
      type: "message",
      user: "Mike Johnson",
      avatar: "MJ",
      content: "sent you a direct message",
      message: "Thanks for the help earlier!",
      timestamp: "15 minutes ago",
      isRead: false,
      roomId: 2,
    },
    {
      id: 3,
      type: "room",
      user: "Alex Rivera",
      avatar: "AR",
      content: "invited you to #project-alpha",
      timestamp: "1 hour ago",
      isRead: false,
      roomId: 5,
    },
    {
      id: 4,
      type: "join",
      user: "Emma Davis",
      avatar: "ED",
      content: "joined #tech-talk",
      timestamp: "2 hours ago",
      isRead: true,
      roomId: 3,
    },
    {
      id: 5,
      type: "message",
      user: "Chris Lee",
      avatar: "CL",
      content: "mentioned you in #design-team",
      message: "What do you think about the new mockups?",
      timestamp: "3 hours ago",
      isRead: true,
      roomId: 6,
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "room":
        return <Hash className="h-4 w-4 text-green-500" />
      case "join":
        return <UserPlus className="h-4 w-4 text-purple-500" />
      default:
        return <MessageCircle className="h-4 w-4 text-zinc-500" />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Component */}
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <Badge variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">
            {notifications.filter((n) => !n.isRead).length} new
          </Badge>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Link key={notification.id} href={`/chat/${notification.roomId}`}>
              <div
                className={`bg-zinc-900 border rounded-xl p-4 hover:border-zinc-700 transition-colors cursor-pointer ${
                  notification.isRead ? "border-zinc-800" : "border-blue-500/50 bg-blue-500/5"
                }`}
              >
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10 flex-shrink-0 border border-zinc-800">
                    <AvatarFallback className="bg-zinc-800 text-white text-sm">{notification.avatar}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-zinc-100">{notification.user}</span>
                        <span className="text-zinc-400 text-sm">{notification.content}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.isRead && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                        <span className="text-xs text-zinc-500">{notification.timestamp}</span>
                      </div>
                    </div>

                    {notification.message && (
                      <div className="bg-black border border-zinc-800 rounded-lg p-3 mt-2">
                        <p className="text-sm text-zinc-300 leading-relaxed">{notification.message}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      <div className="p-1.5 bg-zinc-800 rounded">{getIcon(notification.type)}</div>
                      <span className="text-xs text-zinc-500">
                        {notification.type === "message" && "New message"}
                        {notification.type === "room" && "Room invitation"}
                        {notification.type === "join" && "User joined"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State (hidden when there are notifications) */}
        {notifications.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 mb-4">
              <MessageCircle className="h-8 w-8 text-zinc-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No notifications</h2>
            <p className="text-zinc-400">You're all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  )
}
