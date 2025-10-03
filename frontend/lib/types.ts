// User types
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  status: "online" | "offline" | "away"
  lastSeen?: string
}

// Chat room types
export interface ChatRoom {
  id: string
  name: string
  description?: string
  type: "public" | "private"
  members: number
  lastMessage?: Message
  createdAt: string
  createdBy: User
  isActive?: boolean
}

// Message types
export interface Message {
  id: string
  content: string
  sender: User
  roomId: string
  timestamp: string
  isRead: boolean
  type: "text" | "system" | "image" | "file"
}

// Notification types
export interface Notification {
  id: string
  type: "message" | "mention" | "room_invite" | "user_joined"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  actionUrl?: string
  sender?: User
  roomId?: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  results: T[]
  count: number
  next: string | null
  previous: string | null
}

// WebSocket message types
export interface WebSocketMessage {
  type: "message" | "user_joined" | "user_left" | "typing" | "read_receipt"
  data: any
  timestamp: string
}

// Form types
export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface ProfileFormData {
  username: string
  email: string
  bio?: string
  avatar?: string
}
