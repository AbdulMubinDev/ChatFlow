"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface UseWebSocketOptions {
  onMessage?: (data: any) => void
  onOpen?: () => void
  onClose?: () => void
  onError?: (error: Event) => void
  reconnect?: boolean
  reconnectInterval?: number
}

export function useWebSocket(url: string | null, options: UseWebSocketOptions = {}) {
  const { onMessage, onOpen, onClose, onError, reconnect = true, reconnectInterval = 3000 } = options

  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<any>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  const connect = useCallback(() => {
    if (!url) return

    try {
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        console.log("[v0] WebSocket connected")
        setIsConnected(true)
        onOpen?.()
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          setLastMessage(data)
          onMessage?.(data)
        } catch (error) {
          console.error("[v0] Failed to parse WebSocket message:", error)
        }
      }

      ws.onclose = () => {
        console.log("[v0] WebSocket disconnected")
        setIsConnected(false)
        wsRef.current = null
        onClose?.()

        // Attempt to reconnect
        if (reconnect) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log("[v0] Attempting to reconnect...")
            connect()
          }, reconnectInterval)
        }
      }

      ws.onerror = (error) => {
        console.error("[v0] WebSocket error:", error)
        onError?.(error)
      }
    } catch (error) {
      console.error("[v0] Failed to create WebSocket connection:", error)
    }
  }, [url, onMessage, onOpen, onClose, onError, reconnect, reconnectInterval])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
  }, [])

  const sendMessage = useCallback((data: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data))
    } else {
      console.warn("[v0] WebSocket is not connected")
    }
  }, [])

  useEffect(() => {
    connect()
    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  return {
    isConnected,
    lastMessage,
    sendMessage,
    disconnect,
    reconnect: connect,
  }
}
