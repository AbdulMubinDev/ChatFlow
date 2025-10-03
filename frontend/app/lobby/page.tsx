import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Hash, Lock, Users } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function LobbyPage() {
  // Mock data for demonstration
  const publicRooms = [
    { id: 1, name: "general", members: 234, unread: 5, isPrivate: false },
    { id: 2, name: "random", members: 189, unread: 0, isPrivate: false },
    { id: 3, name: "tech-talk", members: 156, unread: 12, isPrivate: false },
    { id: 4, name: "announcements", members: 445, unread: 2, isPrivate: false },
  ]

  const privateRooms = [
    { id: 5, name: "project-alpha", members: 8, unread: 3, isPrivate: true },
    { id: 6, name: "design-team", members: 12, unread: 0, isPrivate: true },
    { id: 7, name: "leadership", members: 5, unread: 1, isPrivate: true },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John</h1>
          <p className="text-zinc-400">Choose a room to start chatting or create a new one</p>
        </div>

        {/* Search and Create */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search rooms..."
              className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
            />
          </div>
          <Button className="bg-white text-black hover:bg-zinc-200">
            <Plus className="h-4 w-4 mr-2" />
            Create Room
          </Button>
        </div>

        {/* Public Rooms */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Hash className="h-5 w-5 text-zinc-400" />
            Public Rooms
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {publicRooms.map((room) => (
              <Link key={room.id} href={`/chat/${room.id}`}>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                        <Hash className="h-4 w-4 text-blue-500" />
                      </div>
                      <h3 className="font-semibold">{room.name}</h3>
                    </div>
                    {room.unread > 0 && (
                      <Badge className="bg-blue-500 text-white hover:bg-blue-600">{room.unread}</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>{room.members}</span>
                    </div>
                    <span>Public</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Private Rooms */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-zinc-400" />
            Private Rooms
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {privateRooms.map((room) => (
              <Link key={room.id} href={`/chat/${room.id}`}>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                        <Lock className="h-4 w-4 text-green-500" />
                      </div>
                      <h3 className="font-semibold">{room.name}</h3>
                    </div>
                    {room.unread > 0 && (
                      <Badge className="bg-green-500 text-white hover:bg-green-600">{room.unread}</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>{room.members}</span>
                    </div>
                    <span>Private</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
