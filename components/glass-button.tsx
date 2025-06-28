import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlassButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "success" | "danger"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
}

export function GlassButton({ 
  children, 
  className, 
  onClick, 
  variant = "primary",
  size = "md",
  disabled = false
}: GlassButtonProps) {
  const variants = {
    primary: "glass-button text-white",
    secondary: "glass-button text-gray-200",
    success: "glass-button text-green-200 border-green-300",
    danger: "glass-button text-red-200 border-red-300"
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  )
}