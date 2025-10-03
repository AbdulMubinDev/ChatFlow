import { formatDistanceToNow } from "date-fns"
import { UserAvatar } from "@/components/user-avatar"
import type { Message } from "@/lib/types"

interface ChatMessageProps {
  message: Message
  isOwn?: boolean
}

export function ChatMessage({ message, isOwn = false }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isOwn ? "flex-row-reverse" : ""}`}>
      <UserAvatar user={message.sender} size="sm" />

      <div className={`flex flex-col gap-1 max-w-[70%] ${isOwn ? "items-end" : ""}`}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{message.sender.username}</span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </span>
        </div>

        <div
          className={`rounded-lg px-4 py-2 ${
            isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        {message.isRead && isOwn && <span className="text-xs text-muted-foreground">Read</span>}
      </div>
    </div>
  )
}
