import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "dark" | "light"
}

export function GlassCard({ children, className, variant = "default" }: GlassCardProps) {
  const variants = {
    default: "glass",
    dark: "glass-dark", 
    light: "glass-card"
  }

  return (
    <div className={cn(
      "rounded-xl p-6 transition-all duration-300 hover:shadow-2xl",
      variants[variant],
      className
    )}>
      {children}
    </div>
  )
}