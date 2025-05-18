"use client"

import { Card } from "@/components/ui/card"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, Line, XAxis, YAxis } from "@/components/ui/chart"

type Entry = {
  id: number
  date: string
  mood: number
  content: string
  tags: string[]
}

type MoodChartProps = {
  entries: Entry[]
}

export function MoodChart({ entries }: MoodChartProps) {
  // Sort entries by date (assuming date strings are in a format that sorts correctly)
  const sortedEntries = [...entries].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  // Format data for the chart
  const data = sortedEntries.map((entry) => ({
    date: entry.date,
    mood: entry.mood,
  }))

  // Custom tooltip formatter
  const formatTooltip = (value: number) => {
    const moodLabels = ["Very Low", "Low", "Neutral", "Good", "Excellent"]
    return moodLabels[value - 1]
  }

  return (
    <Card className="p-4">
      <ChartContainer className="h-[300px] w-full">
        <Chart>
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis
            dataKey="mood"
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tickFormatter={(value) => formatTooltip(value)}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="border-none bg-white p-2 shadow-lg"
                labelClassName="font-semibold text-sm"
                valueClassName="text-sm text-muted-foreground"
              />
            }
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#10b981"
            strokeWidth={2}
            activeDot={{ r: 6, fill: "#10b981" }}
            dot={{ r: 4, fill: "#10b981" }}
          />
        </Chart>
      </ChartContainer>
    </Card>
  )
}
