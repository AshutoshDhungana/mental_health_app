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
  Edit3,
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
import { Label } from "@/components/ui/label";

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

  // Add handleAddMood function
  const handleAddMood = (date: Date, mood: string) => {
    // Find if there's an existing reflection for this date
    const existingIndex = dailyReflections.findIndex(
      (r) => new Date(r.date).toDateString() === date.toDateString()
    );

    // If found, update it; otherwise create a new one
    if (existingIndex >= 0) {
      const updatedReflections = [...dailyReflections];
      updatedReflections[existingIndex] = {
        ...updatedReflections[existingIndex],
        mood: mood,
      };
      setDailyReflections(updatedReflections);
    } else {
      // Create a new reflection with just the mood
      const newReflection: DailyReflection = {
        id: `temp-${Date.now()}`,
        userId: user?.id || "anonymous",
        date: date.toISOString(),
        mood: mood,
        content: "",
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setDailyReflections([...dailyReflections, newReflection]);
    }

    // Also update the selected date and draft entry
    setSelectedDate(date);
    setDraftEntry((prev) => ({
      ...prev,
      mood: moodEmojis.indexOf(mood) + 1 || 3,
      date: date.toISOString(),
    }));
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

  const handleSaveEntry = async () => {
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
      tags: draftEntry.tags || [],
      mood: draftEntry.mood,
    });

    if (success) {
      toast({
        title: "Reflection Saved",
        description: "Your journal entry has been recorded.",
      });
    }
    setIsSaving(false);
  };

  const handleDeleteReflection = async () => {
    if (!selectedReflection || !selectedReflection.id) return;

    try {
      await deleteReflection(selectedReflection.id);
      toast({
        title: "Entry Deleted",
        description: "Your journal entry has been removed.",
      });
      // Update local state
      const updatedReflections = dailyReflections.filter(
        (r) => r.id !== selectedReflection.id
      );
      setDailyReflections(updatedReflections);
      // Reset draft entry
      setDraftEntry({
        content: "",
        tags: [],
        mood: 3,
        date: selectedDate.toISOString(),
      });
    } catch (error) {
      console.error("Failed to delete reflection:", error);
      toast({
        title: "Error",
        description: "Failed to delete entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container px-4 py-6 md:py-8 max-w-6xl mx-auto">
      <div className="flex flex-col space-y-6">
        {/* Page header with improved visual hierarchy */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                My Journal
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Record your thoughts, feelings, and reflections
            </p>
          </div>
          <Button
            onClick={handleSaveEntry}
            className="sm:self-end group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex items-center">
              <Plus className="h-4 w-4 mr-1" /> New Entry
            </span>
          </Button>
        </div>

        {/* Calendar and journal main content with improved tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Side panel with calendar */}
          <div className="lg:col-span-4">
            <Card className="h-full border-none shadow-lg bg-card/90 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    Calendar
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 px-2">
                <WeeklyCalendar
                  onSelectDate={handleSelectDate}
                  reflections={dailyReflections}
                  onAddMood={handleAddMood}
                />
              </CardContent>
            </Card>
          </div>

          {/* Main content area with tabs and entries */}
          <div className="lg:col-span-8">
            <Card className="h-full border-none shadow-lg bg-card/90 backdrop-blur-sm">
              <Tabs defaultValue="write" className="h-full flex flex-col">
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg font-medium">
                      {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </CardTitle>
                  </div>
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger
                      value="write"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Edit3 className="h-4 w-4 mr-2" /> Write
                    </TabsTrigger>
                    <TabsTrigger
                      value="entries"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <BookOpen className="h-4 w-4 mr-2" /> Entries
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent className="flex-1 pt-6 overflow-y-auto">
                  <TabsContent value="write" className="h-full space-y-6">
                    {/* Mood selector with enhanced visual appearance */}
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Label
                          htmlFor="mood"
                          className="font-medium flex items-center gap-2 text-base"
                        >
                          <Smile className="h-4 w-4 text-primary" /> How are you
                          feeling today?
                        </Label>
                      </div>
                      <div className="flex justify-between items-center space-x-2 max-w-md mx-auto bg-muted/50 rounded-full p-1.5 shadow-inner">
                        {["😔", "😐", "🙂", "😊", "😄"].map((emoji, i) => {
                          const isSelected = draftEntry.mood === i + 1;
                          return (
                            <Button
                              key={emoji}
                              variant="ghost"
                              className={`rounded-full h-12 w-12 flex items-center justify-center transition-all duration-200 hover:bg-muted ${
                                isSelected
                                  ? "bg-primary text-primary-foreground scale-110 shadow-md"
                                  : "text-muted-foreground"
                              }`}
                              onClick={() =>
                                setDraftEntry({ ...draftEntry, mood: i + 1 })
                              }
                            >
                              <span className="text-xl">{emoji}</span>
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Journal content editor with placeholder and improved styling */}
                    <div className="space-y-4">
                      <Label
                        htmlFor="content"
                        className="font-medium flex items-center gap-2 text-base"
                      >
                        <BookOpen className="h-4 w-4 text-primary" /> Journal
                        Entry
                      </Label>
                      <div className="relative">
                        <Textarea
                          id="content"
                          value={draftEntry.content}
                          onChange={(e) =>
                            setDraftEntry({
                              ...draftEntry,
                              content: e.target.value,
                            })
                          }
                          placeholder="Write your thoughts, feelings, or reflections here..."
                          className="min-h-[200px] resize-y border-accent/20 focus:border-primary/40 bg-card/50 placeholder:text-muted-foreground/70"
                        />
                        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground/70">
                          {draftEntry.content.length} characters
                        </div>
                      </div>
                    </div>

                    {/* Tag selector with improved visual design */}
                    <div className="space-y-4">
                      <Label className="font-medium flex items-center gap-2 text-base">
                        <Tag className="h-4 w-4 text-primary" /> Tags
                      </Label>
                      <TagSelector
                        selectedTags={draftEntry.tags}
                        onChange={(tags) =>
                          setDraftEntry({ ...draftEntry, tags })
                        }
                      />
                    </div>

                    {/* Action buttons with improved styling and loading state */}
                    <div className="flex justify-end pt-4 border-t space-x-2">
                      {selectedReflection && selectedReflection.id && (
                        <Button
                          variant="outline"
                          onClick={handleDeleteReflection}
                          className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                        >
                          Delete
                        </Button>
                      )}
                      <Button
                        onClick={() => handleSaveEntry()}
                        disabled={
                          isSaving ||
                          (draftEntry.content.trim().length === 0 &&
                            !selectedReflection?.id)
                        }
                        className="relative overflow-hidden transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-80 hover:opacity-100 transition-opacity"></div>
                        <span className="relative flex items-center">
                          {isSaving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Entry
                            </>
                          )}
                        </span>
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="entries" className="h-full space-y-6">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-40">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : dailyReflections.length > 0 ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          {dailyReflections
                            .slice()
                            .sort(
                              (a, b) =>
                                new Date(b.date).getTime() -
                                new Date(a.date).getTime()
                            )
                            .map((reflection) => (
                              <JournalEntry
                                key={reflection.id}
                                entry={{
                                  id: reflection.id,
                                  date: format(
                                    parseISO(reflection.date),
                                    "MMMM d, yyyy"
                                  ),
                                  mood: reflection.mood,
                                  content: reflection.content,
                                  tags: reflection.tags,
                                }}
                              />
                            ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 text-center">
                        <BookOpen className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          No journal entries yet.
                        </p>
                        <Button
                          variant="link"
                          onClick={() => {
                            const tabTrigger = document.querySelector(
                              '[data-state="inactive"][data-value="write"]'
                            );
                            if (tabTrigger && "click" in tabTrigger) {
                              (tabTrigger as HTMLElement).click();
                            }
                          }}
                          className="mt-2"
                        >
                          Start writing
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>

        {/* Mood trends section with improved visual appeal */}
        <div className="pt-6">
          <Card className="border-none shadow-lg bg-card/90 backdrop-blur-sm">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  Mood Trends
                </CardTitle>
                <Link href="/insights">
                  <Button variant="outline" size="sm" className="text-xs">
                    <ArrowRight className="h-3 w-3 mr-1" /> Full Insights
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4 overflow-x-auto">
              {dailyReflections.length > 0 ? (
                <div className="h-[200px] w-full min-w-[600px]">
                  <MoodChart entries={dailyReflections} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-center">
                  <BarChart3 className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    Add journal entries to see your mood trends over time.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
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
