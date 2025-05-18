"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Home, Plus, Tag } from "lucide-react"
import { JournalEntry } from "@/components/journal-entry"
import { MoodChart } from "@/components/mood-chart"
import { TagSelector } from "@/components/tag-selector"

// Sample data for demonstration
const sampleEntries = [
  {
    id: 1,
    date: "May 17, 2025",
    mood: 4,
    content:
      "Today I practiced mindfulness for 10 minutes and noticed how it helped me stay present throughout the day. I felt more connected to my surroundings and less anxious about upcoming deadlines.",
    tags: ["mindfulness", "progress", "self-care"],
  },
  {
    id: 2,
    date: "May 10, 2025",
    mood: 3,
    content:
      "Had a challenging conversation with a colleague today. I used the breathing techniques I've been practicing, which helped me stay calm and communicate more effectively.",
    tags: ["work", "communication", "stress-management"],
  },
  {
    id: 3,
    date: "May 3, 2025",
    mood: 2,
    content:
      "Feeling a bit low today. Didn't sleep well last night and it affected my energy levels. Going to try to get to bed earlier tonight and practice some self-compassion.",
    tags: ["sleep", "self-care", "low-energy"],
  },
  {
    id: 4,
    date: "April 26, 2025",
    mood: 3,
    content:
      "Mixed feelings today. Started well but had some unexpected challenges in the afternoon. Proud that I managed to stay relatively balanced throughout.",
    tags: ["balance", "resilience"],
  },
  {
    id: 5,
    date: "April 19, 2025",
    mood: 4,
    content:
      "Great day! Completed a project I've been working on for weeks. The sense of accomplishment is really boosting my mood. Celebrated with a nice walk outside.",
    tags: ["accomplishment", "nature", "celebration"],
  },
]

export default function JournalPage() {
  const [entries, setEntries] = useState(sampleEntries)
  const [newEntry, setNewEntry] = useState({
    content: "",
    mood: 3,
    tags: [],
  })

  const handleAddEntry = () => {
    if (newEntry.content.trim() === "") return

    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      mood: newEntry.mood,
      content: newEntry.content,
      tags: newEntry.tags,
    }

    setEntries([entry, ...entries])
    setNewEntry({
      content: "",
      mood: 3,
      tags: [],
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Heart className="h-6 w-6 text-green-500" />
          <span className="ml-2 text-xl font-bold">MindJournal</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-[1fr_300px] lg:gap-12">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Your Journal</h1>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  New Entry
                </Button>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>New Weekly Entry</CardTitle>
                  <CardDescription>How are you feeling this week?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-2 text-sm font-medium">Today's Mood</div>
                    <div className="flex space-x-2">
                      {["😔", "😐", "🙂", "😊", "😄"].map((emoji, i) => (
                        <button
                          key={i}
                          onClick={() => setNewEntry({ ...newEntry, mood: i + 1 })}
                          className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                            newEntry.mood === i + 1 ? "bg-green-100 border-green-500" : ""
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-medium">Journal Entry</div>
                    <Textarea
                      placeholder="Write about your week..."
                      className="min-h-[150px]"
                      value={newEntry.content}
                      onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                    />
                  </div>
                  <TagSelector selectedTags={newEntry.tags} onChange={(tags) => setNewEntry({ ...newEntry, tags })} />
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddEntry}>
                    Save Entry
                  </Button>
                </CardFooter>
              </Card>
              <Tabs defaultValue="entries">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="entries">Journal Entries</TabsTrigger>
                  <TabsTrigger value="insights">Insights & Charts</TabsTrigger>
                </TabsList>
                <TabsContent value="entries" className="space-y-4 pt-4">
                  {entries.map((entry) => (
                    <JournalEntry key={entry.id} entry={entry} />
                  ))}
                </TabsContent>
                <TabsContent value="insights" className="pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mood Over Time</CardTitle>
                      <CardDescription>Track how your mood has changed over the past weeks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MoodChart entries={entries} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Reflection</CardTitle>
                  <CardDescription>Prompts to guide your journaling</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">This week, reflect on:</h3>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                      <li>What brought you joy this week?</li>
                      <li>What challenged you, and how did you respond?</li>
                      <li>Did you notice any patterns in your thoughts or feelings?</li>
                      <li>What are you grateful for right now?</li>
                      <li>What's one small step you can take toward your wellbeing?</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Common Tags</CardTitle>
                  <CardDescription>Tags you use frequently</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      <Tag className="mr-1 h-3 w-3" />
                      mindfulness
                    </div>
                    <div className="flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      <Tag className="mr-1 h-3 w-3" />
                      self-care
                    </div>
                    <div className="flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                      <Tag className="mr-1 h-3 w-3" />
                      progress
                    </div>
                    <div className="flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      <Tag className="mr-1 h-3 w-3" />
                      gratitude
                    </div>
                    <div className="flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      <Tag className="mr-1 h-3 w-3" />
                      stress
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Supportive Resources</CardTitle>
                  <CardDescription>Helpful tools for your mental health</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="#" className="block text-sm text-blue-600 hover:underline">
                    5-Minute Breathing Exercise
                  </Link>
                  <Link href="#" className="block text-sm text-blue-600 hover:underline">
                    Guided Meditation for Anxiety
                  </Link>
                  <Link href="#" className="block text-sm text-blue-600 hover:underline">
                    Self-Compassion Practices
                  </Link>
                  <Link href="#" className="block text-sm text-blue-600 hover:underline">
                    Finding Professional Support
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2025 MindJournal. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
