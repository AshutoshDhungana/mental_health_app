import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { getTagColorClassName } from "@/lib/utils"
import { Tag as TagIcon } from "lucide-react"

type Entry = {
  id: string | number
  date: string
  mood: string | number
  content: string
  tags: string[]
}

type JournalEntryProps = {
  entry: Entry
}

export function JournalEntry({ entry }: JournalEntryProps) {
  // Define all possible mood emojis
  const moodEmojis = ["😢", "😕", "😐", "🙂", "😊"]
  
  // Function to get the mood emoji
  const getMoodEmoji = (mood: string | number): string => {
    if (typeof mood === 'string') {
      // If it's already an emoji, return it
      if (['😢', '😕', '😐', '🙂', '😊'].includes(mood)) {
        return mood;
      }
      // Try to parse as number
      const moodNum = parseInt(mood as string, 10);
      if (!isNaN(moodNum) && moodNum >= 1 && moodNum <= 5) {
        return moodEmojis[moodNum - 1] || '😐';
      }
      return '😐'; // Default emoji
    } else {
      // If it's a number (1-5)
      return moodEmojis[Math.min(4, Math.max(0, mood - 1))] || '😐';
    }
  };

  // Format the date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (e) {
      return dateString; // Return as is if invalid date
    }
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow border border-border/40">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <span className="mr-2">{formatDate(entry.date)}</span>
            <div className="inline-flex items-center rounded-full border border-primary/20 px-2 py-0.5 text-xs text-primary border-primary/20 bg-primary/5">
              <span>{format(new Date(entry.date), 'EEEE')}</span>
            </div>
          </CardTitle>
          <div 
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shadow-sm"
            title={`Mood: ${getMoodEmoji(entry.mood)}`}
          >
            <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-foreground/90 leading-relaxed">{entry.content || 'No content available.'}</p>
        {entry.tags && entry.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-3">
            {entry.tags.map((tag, index) => (
              <span
                key={`${entry.id}-${tag}-${index}`}
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getTagColorClassName(tag)}`}
              >
                <TagIcon className="h-3 w-3 mr-1 opacity-80" />
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground italic flex items-center mt-3">
            <TagIcon className="h-3 w-3 mr-1 opacity-70" />
            No tags for this entry
          </div>
        )}
      </CardContent>
    </Card>
  )
}
