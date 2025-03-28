"use client"

import { useEffect, useRef } from "react"

export function AttendanceChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Data for attendance by month (percentage)
    const attendanceData = [85, 78, 90, 82, 88, 75]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

    // Chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const barWidth = chartWidth / attendanceData.length - 10

    // Draw chart background
    ctx.fillStyle = "#f9fafb"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.beginPath()
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
    }
    ctx.stroke()

    // Draw bars
    attendanceData.forEach((value, index) => {
      const x = padding + index * (chartWidth / attendanceData.length) + 5
      const barHeight = (value / 100) * chartHeight
      const y = canvas.height - padding - barHeight

      // Create gradient for bars
      const gradient = ctx.createLinearGradient(0, y, 0, canvas.height - padding)
      gradient.addColorStop(0, "#3b82f6") // Primary blue color
      gradient.addColorStop(1, "rgba(59, 130, 246, 0.7)") // Transparent version

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Add month labels
      ctx.fillStyle = "hsl(var(--foreground))"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(months[index], x + barWidth / 2, canvas.height - padding + 20)

      // Add percentage on top of bars
      ctx.fillStyle = "hsl(var(--foreground))"
      ctx.fillText(`${value}%`, x + barWidth / 2, y - 10)
    })

    // Draw y-axis labels
    ctx.fillStyle = "hsl(var(--muted-foreground))"
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const value = 100 - i * 20
      const y = padding + (chartHeight / 5) * i
      ctx.fillText(`${value}%`, padding - 10, y + 5)
    }

    // Draw title
    ctx.fillStyle = "hsl(var(--foreground))"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Monthly Attendance", canvas.width / 2, 20)
  }, [])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>
          Current Semester Average: <span className="font-bold">82%</span>
        </p>
        <p>
          Minimum Required: <span className="font-bold">75%</span>
        </p>
      </div>
    </div>
  )
}

