"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import AuthenticatedLayout from "@/app/layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  Home,
  Plus,
  Tag,
  Calendar,
  BarChart3,
  BookOpen,
  Sun,
  Moon,
  Menu,
  Settings,
  LogOut,
  HelpCircle,
  Bell,
  Search,
  Smile,
  ArrowRight,
  Loader2,
  MessageSquare,
  Lightbulb,
  Save,
} from "lucide-react";
import { JournalEntry } from "@/components/journal-entry";
import { MoodChart } from "@/components/mood-chart";
import { TagSelector } from "@/components/tag-selector";
import { WeeklyCalendar } from "@/components/weekly-calendar";
import { format, parseISO } from "date-fns";
import {
  getReflections,
  createReflection,
  updateReflection,
  deleteReflection,
  Reflection,
} from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

// Use the Reflection type from our API library
type DailyReflection = Reflection;

// Define a consistent entry type for display
interface EntryDisplay {
  id: string;
  date: string;
  mood: string;
  content: string;
  tags: string[];
}

// Sample data for demonstration
const sampleEntries: EntryDisplay[] = [
  {
    id: "sample-1",
    date: "May 17, 2025",
    mood: "😄",
    content:
      "Today I practiced mindfulness for 10 minutes and noticed how it helped me stay present throughout the day. I felt more connected to my surroundings and less anxious about upcoming deadlines.",
    tags: ["mindfulness", "progress", "self-care"],
  },
  {
    id: "sample-2",
    date: "May 16, 2025",
    mood: "😐",
    content:
      "Had a challenging day with mixed emotions. Struggled with a difficult project but managed to make some progress. Taking it one step at a time.",
    tags: ["challenge", "growth", "self-care"],
  },
  {
    id: "sample-3",
    date: "May 14, 2025",
    mood: "😊",
    content:
      "Great day! Completed a project I've been working on for weeks. The sense of accomplishment is really boosting my mood. Celebrated with a nice walk outside.",
    tags: ["accomplishment", "nature", "celebration"],
  },
];

// Convert sample entries to DailyReflection format
const sampleReflections: DailyReflection[] = sampleEntries.map((entry) => ({
  id: entry.id,
  date: new Date(entry.date).toISOString(),
  mood: entry.mood,
  content: entry.content,
  // Ensure tags are always string[] even if sample has it optional
  tags: entry.tags || [],
  userId: "demo-user",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// Helper array for mood conversion
const moodEmojis = ["😔", "😐", "🙂", "😊", "😄"];

function JournalContent() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // Initialize dailyReflections as empty array, will be populated by API call
  const [dailyReflections, setDailyReflections] = useState<DailyReflection[]>(
    []
  );
  const [isSaving, setIsSaving] = useState(false);
  // isLoading will now primarily reflect API loading state
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState<EntryDisplay[]>([]);
  const [draftEntry, setDraftEntry] = useState({
    content: "",
    tags: [] as string[],
    mood: 3, // Default to neutral (😐) number representation (1-5)
    date: selectedDate.toISOString(),
  });

  const [selectedReflection, setSelectedReflection] =
    useState<DailyReflection | null>(null);

  // Function to fetch reflections from API
  const fetchReflections = async () => {
    if (!user) {
      setIsLoading(false);
      setDailyReflections(sampleReflections); // Fallback to sample if no user for demo
      return;
    }
    setIsLoading(true);
    try {
      // Example: Fetch reflections for the last 30 days or a relevant range
      // Adjust date range as needed for your application's logic
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - 30); // Fetch for the last 30 days
      const reflectionsFromApi = await getReflections(
        user.id,
        fromDate.toISOString()
      );
      // Access .data from ApiResponse and provide a fallback
      setDailyReflections(reflectionsFromApi.data || []);
      console.log(
        "Loaded reflections from API:",
        reflectionsFromApi.data?.length || 0
      );
    } catch (error) {
      console.error("Failed to fetch reflections from API:", error);
      toast({
        title: "Error Loading Reflections",
        description:
          "Could not load your journal entries from the server. Displaying samples or local data if available.",
        variant: "destructive",
      });
      // Fallback to local storage or samples if API fails
      const storedReflections = localStorage.getItem("mindjournal_reflections");
      if (storedReflections) {
        try {
          const parsedReflections = JSON.parse(
            storedReflections
          ) as DailyReflection[];
          setDailyReflections(
            parsedReflections.filter((r) => r && r.id && r.date && r.mood)
          );
        } catch (e) {
          setDailyReflections(sampleReflections);
        }
      } else {
        setDailyReflections(sampleReflections);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load reflections on component mount or when user changes
  useEffect(() => {
    if (user) {
      fetchReflections();
    } else {
      // Handle case where user is not yet available or logs out
      setIsLoading(false);
      setDailyReflections(sampleReflections); // Or an empty array
      setEntries([]);
    }
  }, [user]); // Dependency on user

  useEffect(() => {
    const reflection = dailyReflections.find(
      (r) => new Date(r.date).toDateString() === selectedDate.toDateString()
    );
    setSelectedReflection(reflection || null);

    if (reflection) {
      setDraftEntry({
        content: reflection.content || "",
        tags: reflection.tags || [],
        mood: moodEmojis.indexOf(reflection.mood) + 1 || 3,
        date: reflection.date,
      });
    } else {
      setDraftEntry({
        content: "",
        tags: [],
        mood: 3,
        date: selectedDate.toISOString(),
      });
    }
  }, [selectedDate, dailyReflections]);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  // Updated to save to API
  const handleSaveReflection = async ({
    content,
    tags,
    mood, // this is the numeric mood (1-5)
  }: {
    content: string;
    tags: string[];
    mood: number;
  }): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save a reflection.",
        variant: "destructive",
      });
      return false;
    }

    setIsSaving(true);
    const moodString = moodEmojis[mood - 1] || "😐"; // Convert numeric mood to emoji string

    try {
      let apiResponse;
      if (selectedReflection && selectedReflection.id) {
        // Update existing reflection
        apiResponse = await updateReflection(selectedReflection.id, {
          // date: selectedDate.toISOString(), // Removed: 'date' is not in UpdateReflectionData
          mood: moodString,
          content,
          tags,
          // userId is not typically part of update payload, but check your API
        });
      } else {
        // Create new reflection
        apiResponse = await createReflection({
          userId: user.id,
          date: selectedDate.toISOString(),
          mood: moodString,
          content,
          tags,
        });
      }

      if (apiResponse && apiResponse.data) {
        toast({
          title: "Reflection Saved",
          description: "Your journal entry has been recorded.",
        });
        // Re-fetch reflections to update the list with the latest data from the server
        await fetchReflections();
        return true;
      } else {
        // Handle API error response if apiResponse.error exists
        const errorMessage =
          apiResponse?.error ||
          "API did not return a saved reflection or an error message.";
        console.error("Error saving reflection, API response:", apiResponse);
        toast({
          title: "Error Saving Reflection",
          description: errorMessage,
          variant: "destructive",
        });
        return false; // Indicate failure
      }
    } catch (error) {
      console.error("Error saving reflection via API:", error);
      toast({
        title: "Error Saving Reflection",
        description:
          "Failed to save your reflection to the server. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // handleAddMood might also need API integration if it's intended to work independently.
  // For now, mood changes will be saved as part of the full reflection save.
  const handleAddMood = (date: Date, moodEmoji: string) => {
    // This function now primarily updates the draft for the selected date.
    // The actual save will happen via handleSaveReflection when the user saves the entry.
    if (new Date(date).toDateString() === selectedDate.toDateString()) {
      const numericMood = moodEmojis.indexOf(moodEmoji) + 1;
      if (numericMood > 0) {
        setDraftEntry((prev) => ({ ...prev, mood: numericMood }));
      }
    }
    // To make this persist immediately (even without full save), an API call would be needed here.
    // For example: if (selectedReflection) updateReflection(...) else createReflection(... with only mood ...)
    // For simplicity, we'll rely on the main save button for now.
    toast({
      title: "Mood Selected",
      description: "Your mood for the day is set. Save the entry to record it.",
      variant: "default", // Changed from 'info'
    });
  };

  // This useEffect for localStorage can be removed or kept as a strict fallback if API fails.
  // For now, commenting it out to prioritize API as source of truth.
  /*
  useEffect(() => {
    if (dailyReflections.length > 0 && !isLoading) { // Only save if not loading and there's data
      localStorage.setItem('mindjournal_reflections', JSON.stringify(dailyReflections));
      console.log('Saved reflections to localStorage:', dailyReflections.length);
    }
  }, [dailyReflections, isLoading]);
  */

  useEffect(() => {
    if (dailyReflections.length > 0) {
      const journalEntries = dailyReflections.map((reflection) => ({
        id: reflection.id.toString(),
        date: new Date(reflection.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        mood: reflection.mood.toString(),
        content: reflection.content.toString(),
        // Ensure tags from reflection are used, defaulting to empty array
        tags: reflection.tags || [],
      }));
      setEntries(journalEntries);
    } else if (!isLoading) {
      setEntries([]); // If no reflections and not loading, clear entries
    }
  }, [dailyReflections, isLoading]);

  const handleAddEntry = async () => {
    if (!draftEntry.content.trim() && (draftEntry.tags || []).length === 0) {
      toast({
        title: "Empty Reflection",
        description: "Please write your thoughts or add tags before saving.",
        variant: "destructive",
      });
      return;
    }
    setIsSaving(true);
    const success = await handleSaveReflection({
      content: draftEntry.content,
      tags: draftEntry.tags || [], // Ensure tags is an array
      mood: draftEntry.mood,
    });
    if (success) {
      toast({
        title: "Reflection Saved",
        description: "Your journal entry has been recorded.",
      });
      // Optionally, reset draftEntry if needed, or rely on useEffect to reload from dailyReflections
    }
    setIsSaving(false);
  };

  const handleDeleteReflection = async () => {
    if (!selectedReflection || !user) return;

    try {
      await deleteReflection(selectedReflection.id);
      toast({
        title: "Reflection Deleted",
        description: "Your journal entry has been deleted.",
      });
      await fetchReflections();
    } catch (error) {
      console.error("Error deleting reflection:", error);
      toast({
        title: "Error Deleting Reflection",
        description: "Failed to delete your journal entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header section with illustration */}
      <div className="flex flex-wrap gap-6 items-center justify-between mb-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Your Journal</h1>
          <p className="text-muted-foreground">
            Record your thoughts, feelings, and daily reflections
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => handleSelectDate(new Date())}
            variant="outline"
            size="sm"
            className="gap-1.5"
          >
            <Calendar className="h-4 w-4" />
            Today
          </Button>

          <Button
            onClick={handleAddEntry}
            variant="default"
            className="gap-1.5"
          >
            <Plus className="h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Main content grid with responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Calendar and mood tracking - span 5 columns on larger screens */}
        <div className="md:col-span-5 space-y-6">
          {/* Weekly Calendar for selecting dates */}
          <WeeklyCalendar
            reflections={dailyReflections}
            onSelectDate={handleSelectDate}
            onAddMood={handleAddMood}
          />

          {/* Mood tracking chart */}
          <div>
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-base font-medium flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-secondary" />
                  Mood Over Time
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-36 sm:h-48">
                  <MoodChart
                    entries={dailyReflections.map((reflection) => ({
                      id: reflection.id,
                      date: reflection.date,
                      mood: reflection.mood,
                      content: reflection.content,
                      tags: reflection.tags || [],
                    }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Entry form and list - span 7 columns on larger screens */}
        <div className="md:col-span-7 space-y-6">
          {/* Daily reflection form */}
          <div>
            <Card className="border shadow-lg overflow-hidden">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base font-medium flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-primary" />
                  {selectedReflection
                    ? "Edit Your Reflection"
                    : "Add Daily Reflection"}
                </CardTitle>
                <CardDescription>
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {isLoading ? (
                  <div className="flex justify-center p-6">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <>
                    {/* Mood Selection */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium flex items-center">
                        <Smile className="h-4 w-4 mr-1.5 text-primary/70" />
                        How are you feeling today?
                      </label>
                      <div className="flex justify-center sm:justify-start space-x-2">
                        {[1, 2, 3, 4, 5].map((moodValue) => (
                          <button
                            key={moodValue}
                            type="button"
                            onClick={() =>
                              setDraftEntry({
                                ...draftEntry,
                                mood: moodValue,
                              })
                            }
                            className={`mood-emoji ${
                              draftEntry.mood === moodValue
                                ? "selected ring-2 ring-primary ring-offset-2"
                                : "hover:bg-muted/50 hover:scale-105"
                            } transition-all duration-200`}
                          >
                            {moodEmojis[moodValue - 1]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Journal Entry */}
                    <div className="space-y-3">
                      <label
                        htmlFor="content"
                        className="text-sm font-medium flex items-center"
                      >
                        <MessageSquare className="h-4 w-4 mr-1.5 text-primary/70" />
                        Daily Journal Entry
                      </label>
                      <Textarea
                        id="content"
                        placeholder="Write your thoughts here..."
                        className="min-h-[150px] resize-none focus:ring-primary"
                        value={draftEntry.content}
                        onChange={(e) =>
                          setDraftEntry({
                            ...draftEntry,
                            content: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Tags */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium flex items-center">
                        <Tag className="h-4 w-4 mr-1.5 text-primary/70" />
                        Add Tags
                      </label>
                      <TagSelector
                        selectedTags={draftEntry.tags}
                        onChange={(tags) =>
                          setDraftEntry({
                            ...draftEntry,
                            tags,
                          })
                        }
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end space-x-2 pt-2">
                      {selectedReflection && (
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isSaving}
                          className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={handleDeleteReflection}
                        >
                          Delete
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          // Reset form or cancel edit
                          if (selectedReflection) {
                            setDraftEntry({
                              content: selectedReflection.content || "",
                              tags: selectedReflection.tags || [],
                              mood:
                                moodEmojis.indexOf(selectedReflection.mood) +
                                  1 || 3,
                              date: selectedReflection.date,
                            });
                          } else {
                            setDraftEntry({
                              content: "",
                              tags: [],
                              mood: 3,
                              date: selectedDate.toISOString(),
                            });
                          }
                        }}
                        disabled={isSaving}
                      >
                        Reset
                      </Button>
                      <Button
                        type="submit"
                        onClick={async () => {
                          await handleSaveReflection({
                            content: draftEntry.content,
                            tags: draftEntry.tags,
                            mood: draftEntry.mood,
                          });
                        }}
                        disabled={isSaving}
                        className="gap-1.5"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Entry
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent entries list */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recent Entries</h3>
              {entries.length > 0 && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/insights" className="flex items-center gap-1.5">
                    <Lightbulb className="h-4 w-4" />
                    View Insights
                  </Link>
                </Button>
              )}
            </div>

            {isLoading ? (
              <div className="flex justify-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : entries.length > 0 ? (
              <div className="space-y-5">
                {entries.map((entry) => (
                  <JournalEntry key={entry.id} entry={entry} />
                ))}
                {entries.length >= 5 && (
                  <div className="text-center pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setEntries((prev) => [
                          ...prev,
                          ...sampleEntries.slice(0, 3),
                        ])
                      }
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Card className="border-dashed border-2 p-6 bg-muted/30 flex flex-col items-center justify-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium text-lg">No journal entries yet</h3>
                <p className="text-muted-foreground mt-1 max-w-xs">
                  Start tracking your mood and writing daily reflections to see
                  your entries here.
                </p>
                <Button onClick={handleAddEntry} className="mt-4 gap-1.5">
                  <Plus className="h-4 w-4" />
                  Create Your First Entry
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JournalPage() {
  return (
    <AuthenticatedLayout>
      <JournalContent />
    </AuthenticatedLayout>
  );
}
