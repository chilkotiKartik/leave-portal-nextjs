import { GraduationCap } from "lucide-react"

export function AKITLogo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "h-6 w-6",
    default: "h-8 w-8",
    large: "h-12 w-12",
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className={`relative ${sizeClasses[size]} flex items-center justify-center rounded-full bg-primary text-primary-foreground`}
      >
        <GraduationCap className="h-4/6 w-4/6" />
      </div>
      <span className={`font-bold ${size === "large" ? "text-xl" : "text-base"}`}>AKIT</span>
    </div>
  )
}

