"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, User, LogOut, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationBadge } from "@/components/notification-badge"
import { LogoIcon } from "@/components/logo"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/lobby", icon: Home, label: "Lobby" },
    { href: "/notifications", icon: Bell, label: "Notifications", badge: true },
    { href: "/profile", icon: User, label: "Profile" },
  ]

  const handleLogout = () => {
    // Clear auth token
    localStorage.removeItem("authToken")
    // Redirect to login
    window.location.href = "/login"
  }

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/lobby" className="flex items-center gap-2">
              <LogoIcon />
              <span className="text-lg font-semibold">ChatFlow</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button variant={isActive ? "secondary" : "ghost"} size="sm" className="gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                      {item.badge && <NotificationBadge count={3} />}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
