import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Bell, Lock, Zap, Globe, Sparkles, ArrowRight, MessageSquare } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      {/* Header */}
      <header className="border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Sign up</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
          <Sparkles className="h-3 w-3" />
          <span>Powered by Django Channels & WebSockets</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance">
          Real-time communication,
          <br />
          <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-5 bg-clip-text text-transparent">
            reimagined
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
          Connect instantly with your team through powerful chat rooms, real-time messaging, and seamless notifications.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
              Get started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="border-primary/20 hover:bg-primary/10 hover:border-primary/40 group bg-transparent"
            >
              <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              View demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need for team communication</h2>
          <p className="text-muted-foreground text-lg">Built with modern web technologies for the best experience</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-colors">
                <Zap className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold">Real-time Messaging</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Experience instant message delivery with WebSocket technology. No refresh needed, messages appear in
              real-time.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Instant delivery
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                WebSocket powered
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Zero latency
              </li>
            </ul>
          </div>

          <div className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg group-hover:from-green-500/30 group-hover:to-green-600/30 transition-colors">
                <Users className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold">Chat Rooms</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Create public or private chat rooms for your team. Organize conversations by topic, project, or
              department.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Public & private rooms
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Unlimited participants
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Easy room management
              </li>
            </ul>
          </div>

          <div className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-colors">
                <Bell className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold">Smart Notifications</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Stay updated with real-time notifications for new messages, mentions, and room activity.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                Real-time alerts
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                Mention tracking
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                Customizable settings
              </li>
            </ul>
          </div>

          <div className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg group-hover:from-red-500/30 group-hover:to-red-600/30 transition-colors">
                <Lock className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold">Secure Authentication</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Enterprise-grade security with encrypted connections and secure user authentication.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                Encrypted connections
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                Secure sessions
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                Privacy focused
              </li>
            </ul>
          </div>

          <div className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg group-hover:from-orange-500/30 group-hover:to-orange-600/30 transition-colors">
                <MessageSquare className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold">Message History</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              All messages are stored securely. Access your conversation history anytime, from any device.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Persistent storage
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Search messages
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Cross-device sync
              </li>
            </ul>
          </div>

          <div className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-lg group-hover:from-cyan-500/30 group-hover:to-cyan-600/30 transition-colors">
                <Globe className="h-5 w-5 text-cyan-500" />
              </div>
              <h3 className="text-lg font-semibold">Global Access</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Access your chats from anywhere in the world. Responsive design works on all devices.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                Mobile responsive
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                Cross-platform
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                Always available
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-chart-2 to-chart-5 rounded-2xl blur-xl opacity-20" />
          <div className="relative bg-card border border-border rounded-2xl p-12">
            <h2 className="text-4xl font-bold mb-4 text-balance">Ready to transform your team communication?</h2>
            <p className="text-muted-foreground text-lg mb-8 text-pretty">
              Join thousands of teams already using ChatFlow for seamless real-time collaboration.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                Start chatting now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p className="flex items-center justify-center gap-2">
            &copy; 2025 ChatFlow. Built with Django Channels & WebSockets.
            <span className="inline-flex items-center gap-1 text-primary">
              <Sparkles className="h-3 w-3" />
              Crafted by Abdul Mubin
            </span>
          </p>
        </div>
      </footer>
    </div>
  )
}
