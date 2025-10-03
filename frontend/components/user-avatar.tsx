import { User } from "lucide-react"

interface UserAvatarProps {
  user: {
    username: string
    avatar?: string
    status?: "online" | "offline" | "away"
  }
  size?: "sm" | "md" | "lg"
  showStatus?: boolean
}

export function UserAvatar({ user, size = "md", showStatus = true }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  }

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    away: "bg-yellow-500",
  }

  return (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border`}
      >
        {user.avatar ? (
          <img src={user.avatar || "/placeholder.svg"} alt={user.username} className="h-full w-full object-cover" />
        ) : (
          <User className="h-1/2 w-1/2 text-muted-foreground" />
        )}
      </div>

      {showStatus && user.status && (
        <div
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
            statusColors[user.status]
          }`}
        />
      )}
    </div>
  )
}
