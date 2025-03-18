import { cn } from "../../lib/utils"

interface LoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function GlobeLoader({ size = "md", className }: LoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "relative rounded-full bg-gradient-to-r from-primary to-secondary animate-spin",
          sizeClasses[size],
          className,
        )}
      >
        <div className="absolute inset-[2px] bg-background rounded-full"></div>
      </div>
    </div>
  )
}

export function LoadingDots() {
  return (
    <div className="flex space-x-1">
      <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "0ms" }}></div>
      <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "150ms" }}></div>
      <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "300ms" }}></div>
    </div>
  )
}