import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageSquare } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <MessageSquare className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-semibold">ChatFlow</span>
        </Link>

        {/* Login Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-zinc-400 mb-6">Sign in to your account to continue</p>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-black border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-sm text-zinc-400 hover:text-white">
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="bg-black border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
              />
            </div>

            <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200">
              Sign in
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-white hover:underline">
              Sign up
            </Link>
          </div>
        </div>

        <p className="text-center text-zinc-600 text-sm mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
