import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Hash, Users, Settings, ArrowLeft, MoreVertical, Smile } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { UserAvatar } from "@/components/user-avatar"
import type { Message } from "@/lib/types"

export default function ChatRoomPage({ params }: { params: { id: string } }) {
  // Mock data for demonstration
  const room = {
    id: params.id,
    name: "general",
    members: 234,
    isPrivate: false,
  }

  const messages: Message[] = [
    {
      id: "1",
      content: "Hey everyone! Just pushed the new feature to staging",
      sender: { id: "1", username: "Sarah Chen", email: "", status: "online" },
      roomId: params.id,
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      isRead: true,
      type: "text",
    },
    {
      id: "2",
      content: "Awesome! I'll test it out now",
      sender: { id: "2", username: "Mike Johnson", email: "", status: "online" },
      roomId: params.id,
      timestamp: new Date(Date.now() - 28 * 60000).toISOString(),
      isRead: true,
      type: "text",
    },
    {
      id: "3",
      content: "Great work team! The UI looks fantastic",
      sender: { id: "current", username: "You", email: "", status: "online" },
      roomId: params.id,
      timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
      isRead: true,
      type: "text",
    },
  ]

  const onlineUsers = [
    { id: "1", username: "Sarah Chen", email: "", status: "online" as const },
    { id: "2", username: "Mike Johnson", email: "", status: "online" as const },
    { id: "3", username: "Alex Rivera", email: "", status: "online" as const },
    { id: "4", username: "Emma Davis", email: "", status: "away" as const },
    { id: "5", username: "Chris Lee", email: "", status: "offline" as const },
  ]

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 flex-shrink-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/lobby">
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Hash className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <h1 className="font-semibold">{room.name}</h1>
                <p className="text-xs text-zinc-400">{room.members} members</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
              <Users className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages List */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} isOwn={msg.sender.id === "current"} />
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-zinc-800 p-4 flex-shrink-0">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white flex-shrink-0">
                <Smile className="h-5 w-5" />
              </Button>
              <Input
                placeholder={`Message #${room.name}`}
                className="flex-1 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
              />
              <Button className="bg-blue-500 hover:bg-blue-600 text-white flex-shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar - Online Users */}
        <aside className="w-64 border-l border-zinc-800 hidden lg:block">
          <div className="p-4">
            <h2 className="text-sm font-semibold text-zinc-400 mb-4">MEMBERS — {onlineUsers.length}</h2>
            <div className="space-y-2">
              {onlineUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900 cursor-pointer transition-colors"
                >
                  <UserAvatar user={user} size="sm" />
                  <span className="text-sm text-zinc-300">{user.username}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
