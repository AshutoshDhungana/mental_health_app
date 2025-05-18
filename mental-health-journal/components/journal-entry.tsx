import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Entry = {
  id: number
  date: string
  mood: number
  content: string
  tags: string[]
}

type JournalEntryProps = {
  entry: Entry
}

export function JournalEntry({ entry }: JournalEntryProps) {
  const moodEmojis = ["😔", "😐", "🙂", "😊", "😄"]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{entry.date}</CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
            {moodEmojis[entry.mood - 1]}
          </div>
        </div>
        <CardDescription>Weekly reflection</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm">{entry.content}</p>
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag, index) => {
            // Generate a different color for each tag
            const colors = [
              "bg-blue-100 text-blue-800",
              "bg-green-100 text-green-800",
              "bg-purple-100 text-purple-800",
              "bg-yellow-100 text-yellow-800",
              "bg-red-100 text-red-800",
              "bg-indigo-100 text-indigo-800",
              "bg-pink-100 text-pink-800",
            ]
            const colorIndex = index % colors.length

            return (
              <span
                key={index}
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[colorIndex]}`}
              >
                {tag}
              </span>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
