export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Monogram design with AM initials */}
        <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-primary via-chart-2 to-chart-5 flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="text-lg font-bold text-white">AM</span>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/0 via-white/10 to-white/0" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold leading-none">ChatFlow</span>
        <span className="text-[10px] text-muted-foreground leading-none">by Abdul Mubin</span>
      </div>
    </div>
  )
}

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary via-chart-2 to-chart-5 flex items-center justify-center shadow-lg shadow-primary/20 ${className}`}
    >
      <span className="text-sm font-bold text-white">AM</span>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/0 via-white/10 to-white/0" />
    </div>
  )
}
