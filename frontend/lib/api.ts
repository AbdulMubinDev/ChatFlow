// API utility functions for backend communication

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }))
    throw new Error(error.message || `HTTP error! status: ${response.status}`)
  }
  return response.json()
}

// Helper function to get auth headers
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("authToken")
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

// Authentication API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    return handleResponse(response)
  },

  signup: async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/signup/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
    return handleResponse(response)
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/api/auth/logout/`, {
      method: "POST",
      headers: getAuthHeaders(),
    })
    return handleResponse(response)
  },
}

// Chat rooms API
export const roomsApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/api/rooms/`, {
      headers: getAuthHeaders(),
    })
    return handleResponse(response)
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/api/rooms/${id}/`, {
      headers: getAuthHeaders(),
    })
    return handleResponse(response)
  },

  create: async (name: string, description: string, type: "public" | "private") => {
    const response = await fetch(`${API_URL}/api/rooms/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ name, description, type }),
    })
    return handleResponse(response)
  },

  getMessages: async (roomId: string, page = 1) => {
    const response = await fetch(`${API_URL}/api/rooms/${roomId}/messages/?page=${page}`, {
      headers: getAuthHeaders(),
    })
    return handleResponse(response)
  },
}

// Notifications API
export const notificationsApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/api/notifications/`, {
      headers: getAuthHeaders(),
    })
    return handleResponse(response)
  },

  markAsRead: async (id: string) => {
    const response = await fetch(`${API_URL}/api/notifications/${id}/read/`, {
      method: "POST",
      headers: getAuthHeaders(),
    })
    return handleResponse(response)
  },

  markAllAsRead: async () => {
    const response = await fetch(`${API_URL}/api/notifications/mark-all-read/`, {
      method: "POST",
      headers: getAuthHeaders(),
    })
    return handleResponse(response)
  },
}

// Profile API
export const profileApi = {
  get: async () => {
    const response = await fetch(`${API_URL}/api/profile/`, {
      headers: getAuthHeaders(),
    })
    return handleResponse(response)
  },

  update: async (data: any) => {
    const response = await fetch(`${API_URL}/api/profile/`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    return handleResponse(response)
  },
}
