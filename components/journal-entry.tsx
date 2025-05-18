import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { getTagColorClassName } from "@/lib/utils";
import { Tag as TagIcon, Calendar, MessageSquare } from "lucide-react";

type Entry = {
  id: string | number;
  date: string;
  mood: string | number;
  content: string;
  tags: string[];
};

type JournalEntryProps = {
  entry: Entry;
};

export function JournalEntry({ entry }: JournalEntryProps) {
  // Define all possible mood emojis
  const moodEmojis = ["😢", "😕", "😐", "🙂", "😊"];

  // Function to get the mood emoji
  const getMoodEmoji = (mood: string | number): string => {
    if (typeof mood === "string") {
      // If it's already an emoji, return it
      if (["😢", "😕", "😐", "🙂", "😊"].includes(mood)) {
        return mood;
      }
      // Try to parse as number
      const moodNum = parseInt(mood as string, 10);
      if (!isNaN(moodNum) && moodNum >= 1 && moodNum <= 5) {
        return moodEmojis[moodNum - 1] || "😐";
      }
      return "😐"; // Default emoji
    } else {
      // If it's a number (1-5)
      return moodEmojis[Math.min(4, Math.max(0, mood - 1))] || "😐";
    }
  };

  // Format the date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (e) {
      return dateString; // Return as is if invalid date
    }
  };

  // Get mood emoji and its corresponding color class
  const moodEmoji = getMoodEmoji(entry.mood);
  const getMoodColorClass = (emoji: string) => {
    switch (emoji) {
      case "😊":
        return "bg-primary/15 text-primary ring-primary/30";
      case "🙂":
        return "bg-secondary/15 text-secondary ring-secondary/30";
      case "😐":
        return "bg-yellow/15 text-yellow-foreground ring-yellow/30";
      case "😕":
        return "bg-accent/15 text-accent-foreground ring-accent/30";
      case "😢":
        return "bg-destructive/15 text-destructive ring-destructive/30";
      default:
        return "bg-primary/15 text-primary ring-primary/30";
    }
  };

  // Split content into paragraphs for better readability
  const contentParagraphs = entry.content
    ? entry.content
        .split("\n")
        .filter((paragraph) => paragraph.trim().length > 0)
    : ["No content available."];

  return (
    <Card className="mb-6 hover:shadow-lg transition-shadow duration-300 border-border/30 overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent opacity-70"></div>
      <CardHeader className="pb-2 relative">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary opacity-70" />
              <span>{formatDate(entry.date)}</span>
              <span className="inline-flex items-center rounded-full border border-primary/20 px-2 py-0.5 text-xs ml-2 bg-primary/5">
                {format(new Date(entry.date), "EEEE")}
              </span>
            </CardTitle>
          </div>
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full shadow-sm ring-2 transition-all duration-300 group-hover:scale-110 ${getMoodColorClass(
              moodEmoji
            )}`}
            title={`Mood: ${moodEmoji}`}
          >
            <span className="text-2xl">{moodEmoji}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-1 text-muted-foreground mb-2">
          <MessageSquare className="h-4 w-4 mt-0.5 opacity-70" />
          <span className="text-xs">Journal Entry</span>
        </div>

        <div className="space-y-3">
          {contentParagraphs.map((paragraph, i) => (
            <p key={i} className="text-foreground/90 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {entry.tags && entry.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {entry.tags.map((tag, index) => (
              <span
                key={`${entry.id}-${tag}-${index}`}
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-300 hover:shadow-sm ${getTagColorClassName(
                  tag
                )}`}
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
  );
}
