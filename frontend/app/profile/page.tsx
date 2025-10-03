import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Lock, Palette, LogOut } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Component */}
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Profile & Settings</h1>

        {/* Profile Section */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="h-5 w-5 text-zinc-400" />
            <h2 className="text-xl font-semibold">Profile Information</h2>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <Avatar className="h-20 w-20 border-2 border-zinc-800">
              <AvatarFallback className="bg-blue-500 text-white text-2xl">JD</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800 bg-transparent">
                Change Avatar
              </Button>
              <p className="text-xs text-zinc-500 mt-2">JPG, PNG or GIF. Max size 2MB</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-zinc-300">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="johndoe"
                  className="bg-black border-zinc-800 text-white focus:border-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@example.com"
                  className="bg-black border-zinc-800 text-white focus:border-zinc-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-zinc-300">
                Bio
              </Label>
              <Input
                id="bio"
                placeholder="Tell us about yourself..."
                defaultValue="Software developer passionate about real-time applications"
                className="bg-black border-zinc-800 text-white focus:border-zinc-700"
              />
            </div>

            <Button className="bg-white text-black hover:bg-zinc-200">Save Changes</Button>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="h-5 w-5 text-zinc-400" />
            <h2 className="text-xl font-semibold">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">New Messages</p>
                <p className="text-sm text-zinc-400">Get notified when someone sends you a message</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Mentions</p>
                <p className="text-sm text-zinc-400">Get notified when someone mentions you</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Room Activity</p>
                <p className="text-sm text-zinc-400">Get notified about activity in your rooms</p>
              </div>
              <Switch />
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-zinc-400">Receive email summaries of your activity</p>
              </div>
              <Switch />
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-5 w-5 text-zinc-400" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-zinc-300">
                Current Password
              </Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Enter current password"
                className="bg-black border-zinc-800 text-white focus:border-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-zinc-300">
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                className="bg-black border-zinc-800 text-white focus:border-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-new-password" className="text-zinc-300">
                Confirm New Password
              </Label>
              <Input
                id="confirm-new-password"
                type="password"
                placeholder="Confirm new password"
                className="bg-black border-zinc-800 text-white focus:border-zinc-700"
              />
            </div>

            <Button className="bg-white text-black hover:bg-zinc-200">Update Password</Button>
          </div>
        </section>

        {/* Appearance Section */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Palette className="h-5 w-5 text-zinc-400" />
            <h2 className="text-xl font-semibold">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-zinc-400">Use dark theme across the application</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Compact Mode</p>
                <p className="text-sm text-zinc-400">Reduce spacing for a more compact view</p>
              </div>
              <Switch />
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-zinc-900 border border-red-900/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-400">Danger Zone</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Log Out</p>
                <p className="text-sm text-zinc-400">Sign out of your account</p>
              </div>
              <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800 bg-transparent">
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-red-400">Delete Account</p>
                <p className="text-sm text-zinc-400">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
                Delete Account
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
