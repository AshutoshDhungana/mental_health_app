"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import AuthenticatedLayout from "@/app/layouts/AuthenticatedLayout";
import { getReflections, Reflection } from "@/lib/api";
import { format, subDays, startOfMonth, endOfMonth, parseISO } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Heart,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Tag,
  Clock,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Brain,
  Activity,
  Lightbulb,
  AlertTriangle,
  TrendingDown,
  MinusCircle,
  Smile,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoodChart } from "@/components/mood-chart";
import { SentimentChart } from "@/components/sentiment-chart";
import { ThemeAnalysisChart } from "@/components/theme-analysis-chart";
import { MoodCorrelationsChart } from "@/components/mood-correlations-chart";
import { MentalHealthInsights } from "@/components/mental-health-insights";
import {
  analyzeThemes,
  analyzeSentiment,
  analyzeMoodCorrelations,
  generateInsights,
  ThemeAnalysisResult,
  SentimentAnalysisResult,
  MoodCorrelation,
  MentalHealthInsight,
} from "@/lib/mental-health-analysis";
import { Badge } from "@/components/ui/badge";

// Time period options
type TimePeriod = "week" | "month" | "3months" | "year" | "all";

// Component for the Insights page
function InsightsContent() {
  const { user } = useAuth();
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("month");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [themeAnalysis, setThemeAnalysis] = useState<ThemeAnalysisResult[]>([]);
  const [sentimentAnalysis, setSentimentAnalysis] =
    useState<SentimentAnalysisResult | null>(null);
  const [moodCorrelations, setMoodCorrelations] = useState<MoodCorrelation[]>(
    []
  );
  const [insights, setInsights] = useState<MentalHealthInsight[]>([]);

  // Helper function to get insight type label
  const getInsightTypeLabel = (type: string) => {
    switch (type) {
      case "tip":
        return "Self-Care Tip";
      case "question":
        return "Reflection Question";
      case "observation":
        return "Observation";
      default:
        return "Insight";
    }
  };

  // Define a helper interface for tag structures that could be encountered
  interface TagObject {
    tag?: {
      id?: string;
      name?: string;
    };
    id?: string;
    name?: string;
  }

  // Load reflections when component mounts or time period changes
  useEffect(() => {
    if (!user?.id) return;

    const loadReflections = async () => {
      setIsLoading(true);
      setError(null);

      let startDate: string | undefined;
      const now = new Date();

      // Calculate start date based on time period
      switch (timePeriod) {
        case "week":
          startDate = subDays(now, 7).toISOString();
          break;
        case "month":
          startDate = startOfMonth(now).toISOString();
          break;
        case "3months":
          startDate = subDays(now, 90).toISOString();
          break;
        case "year":
          startDate = subDays(now, 365).toISOString();
          break;
        case "all":
        default:
          startDate = undefined;
      }

      try {
        // In a real app, we'd use a proper userId, but for demo we're using 'demo-user'
        const userId = user?.id || "demo-user";
        const response = await getReflections(userId, startDate);

        if (response.error) {
          setError(response.error);
        } else if (response.data) {
          setReflections(response.data);
        }
      } catch (err) {
        setError("Failed to load reflections");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadReflections();
  }, [user, timePeriod]);

  // Process reflections to generate mental health insights when reflections change
  useEffect(() => {
    if (reflections.length > 0) {
      // Generate sentiment analysis
      const sentimentData = analyzeSentiment(reflections);
      setSentimentAnalysis(sentimentData);

      // Generate theme analysis
      const themeData = analyzeThemes(reflections);
      setThemeAnalysis(themeData);

      // Generate mood correlations (how tags correlate with mood)
      const correlationsData = analyzeMoodCorrelations(reflections);
      setMoodCorrelations(correlationsData);

      // Generate personalized insights
      const insightsData = generateInsights(reflections);
      setInsights(insightsData);
    }
  }, [reflections]);

  // Calculate mood statistics
  const getMoodStats = () => {
    if (reflections.length === 0) {
      return {
        average: 0,
        highest: "",
        lowest: "",
        change: 0,
      };
    }

    // Define emoji values for calculations
    const emojiValues: Record<string, number> = {
      "😔": 1,
      "😕": 2,
      "😐": 3,
      "🙂": 4,
      "😊": 5,
      "😄": 5, // Alternate emoji mapping to same value
    };

    // Calculate numeric values for moods
    const moodValues = reflections.map((r) => emojiValues[r.mood] || 3);
    const averageMood =
      moodValues.reduce((sum, val) => sum + val, 0) / moodValues.length;

    // Get most recent mood and mood from start of period
    const recentMood = moodValues[0] || 3;
    const oldestMood = moodValues[moodValues.length - 1] || 3;
    const moodChange = recentMood - oldestMood;

    // Find most common mood
    const moodCounts: Record<string, number> = {};
    reflections.forEach((r) => {
      moodCounts[r.mood] = (moodCounts[r.mood] || 0) + 1;
    });

    let highestCount = 0;
    let highestMood = "";

    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (count > highestCount) {
        highestCount = count;
        highestMood = mood;
      }
    });

    // Find lowest mood with at least 10% occurrence
    const totalEntries = reflections.length;
    let lowestMoodVal = 6;
    let lowestMood = "";

    Object.entries(moodCounts).forEach(([mood, count]) => {
      const percentage = count / totalEntries;
      const value = emojiValues[mood] || 3;

      if (percentage >= 0.1 && value < lowestMoodVal) {
        lowestMoodVal = value;
        lowestMood = mood;
      }
    });

    return {
      average: averageMood,
      highest: highestMood,
      lowest: lowestMood || highestMood,
      change: moodChange,
    };
  };

  // Get top tags from reflections
  const getTopTags = (limit = 5) => {
    if (reflections.length === 0) {
      return [];
    }

    // Count tag occurrences
    const tagCounts: Record<string, number> = {};

    reflections.forEach((reflection) => {
      if (reflection.tags && Array.isArray(reflection.tags)) {
        reflection.tags.forEach((tag: string | TagObject) => {
          // Handle both possible data structures:
          // 1. String array (as defined in API types)
          // 2. Object with tag.name property (from database structure)
          let tagName: string;

          if (typeof tag === "string") {
            // Case 1: tag is directly a string
            tagName = tag;
          } else if (typeof tag === "object" && tag !== null) {
            // Case 2: tag is an object that might have a tag property
            if (tag.tag && typeof tag.tag === "object") {
              tagName = tag.tag.name || "unknown";
            } else if (tag.name) {
              // Alternative structure
              tagName = tag.name;
            } else {
              // Skip invalid tag
              return;
            }
          } else {
            // Skip invalid tag
            return;
          }

          tagCounts[tagName] = (tagCounts[tagName] || 0) + 1;
        });
      }
    });

    // Convert to array and sort by count
    return Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  };

  // Render the component UI
  return (
    <div className="space-y-8">
      {/* Header section with better styling */}
      <div className="flex flex-wrap gap-6 items-center justify-between mb-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Mental Health Insights
          </h1>
          <p className="text-muted-foreground">
            Discover patterns and trends in your mental wellness journey
          </p>
        </div>

        {/* Time period selector */}
        <div className="flex flex-wrap items-center gap-2 pl-4 pr-2 py-1.5 rounded-lg border bg-card/50">
          {[
            { value: "week", label: "Week" },
            { value: "month", label: "Month" },
            { value: "3months", label: "Quarter" },
            { value: "year", label: "Year" },
            { value: "all", label: "All Time" },
          ].map((period) => (
            <Button
              key={period.value}
              variant={timePeriod === period.value ? "default" : "ghost"}
              size="sm"
              className={timePeriod === period.value ? "shadow-sm" : ""}
              onClick={() => setTimePeriod(period.value as TimePeriod)}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid place-items-center py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="text-muted-foreground">
              Analyzing your journal entries...
            </p>
          </div>
        </div>
      ) : error ? (
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Error Loading Insights
            </CardTitle>
            <CardDescription>
              We encountered a problem while analyzing your journal data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button
              className="mt-4"
              onClick={() => {
                setError(null);
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 1000);
              }}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : reflections.length === 0 ? (
        <Card className="border-dashed border-2 p-8 bg-muted/30 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            <Brain className="h-10 w-10 text-primary" />
          </div>
          <h3 className="font-medium text-xl">No journal data to analyze</h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            Start writing daily reflections in your journal to see personalized
            insights and trends. The more you write, the more valuable your
            insights will become!
          </p>
          <Button className="mt-6" asChild>
            <Link href="/journal">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Go to Journal
            </Link>
          </Button>
        </Card>
      ) : (
        <>
          {/* Insights Tabs with improved design */}
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 h-11 mb-6">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary"
              >
                <Activity className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="sentiment"
                className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Sentiment
              </TabsTrigger>
              <TabsTrigger
                value="themes"
                className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary"
              >
                <PieChart className="h-4 w-4 mr-2" />
                Themes
              </TabsTrigger>
              <TabsTrigger
                value="mood"
                className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary"
              >
                <Smile className="h-4 w-4 mr-2" />
                Mood
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Quick Stats Cards */}
                <Card className="shadow-sm border-card/60 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 space-y-0">
                    <CardDescription>Entries Analyzed</CardDescription>
                    <CardTitle className="text-2xl">
                      {reflections.length}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Over{" "}
                      {timePeriod === "week"
                        ? "the past week"
                        : timePeriod === "month"
                        ? "the past month"
                        : timePeriod === "3months"
                        ? "the past quarter"
                        : timePeriod === "year"
                        ? "the past year"
                        : "all time"}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-card/60 hover:shadow-md transition-shadow bg-gradient-to-br from-primary/5 to-transparent">
                  <CardHeader className="pb-2 space-y-0">
                    <CardDescription>Average Mood</CardDescription>
                    <CardTitle className="text-2xl flex items-center gap-1">
                      {getMoodStats().average.toFixed(1)}
                      <span className="text-xl">
                        {getMoodStats().average >= 4
                          ? "😊"
                          : getMoodStats().average >= 3
                          ? "🙂"
                          : getMoodStats().average >= 2
                          ? "😐"
                          : "😕"}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground flex items-center">
                      {getMoodStats().change > 0 ? (
                        <>
                          <TrendingUp className="text-emerald-500 h-4 w-4 mr-1" />
                          <span className="text-emerald-600">Improving</span>
                        </>
                      ) : getMoodStats().change < 0 ? (
                        <>
                          <TrendingDown className="text-rose-500 h-4 w-4 mr-1" />
                          <span className="text-rose-600">Declining</span>
                        </>
                      ) : (
                        <>
                          <MinusCircle className="text-muted-foreground h-4 w-4 mr-1" />
                          <span>Stable</span>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-card/60 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 space-y-0">
                    <CardDescription>Top Tags</CardDescription>
                    <CardTitle className="text-2xl">
                      {getTopTags(1)[0]?.tag || "None"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {getTopTags(5)
                        .slice(1)
                        .map((tag, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-secondary/10"
                          >
                            {tag.tag}
                          </Badge>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Key Insights cards - span full width on small screens */}
                <Card className="md:col-span-2 lg:col-span-3 shadow-sm border-card/60 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-primary" />
                      Key Insights
                    </CardTitle>
                    <CardDescription>
                      Personalized observations based on your reflections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MentalHealthInsights insights={insights} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sentiment" className="mt-0">
              <div className="grid gap-6">
                <Card className="shadow-sm border-card/60 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                      Sentiment Analysis
                    </CardTitle>
                    <CardDescription>
                      Trends in your emotional language over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <SentimentChart
                        data={
                          sentimentAnalysis || {
                            overallSentiment: 0,
                            sentimentByDay: [],
                            positiveWords: [],
                            negativeWords: [],
                            sentimentTrend: "stable",
                          }
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-card/60 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                      Word Analysis
                    </CardTitle>
                    <CardDescription>
                      Common positive and negative words in your journal
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Positive Words</h4>
                        <div className="flex flex-wrap gap-2">
                          {sentimentAnalysis?.positiveWords
                            ?.slice(0, 12)
                            .map((word, i) => (
                              <Badge
                                key={i}
                                className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                              >
                                {word.word}
                              </Badge>
                            )) || (
                            <span className="text-sm text-muted-foreground">
                              No data available
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">Negative Words</h4>
                        <div className="flex flex-wrap gap-2">
                          {sentimentAnalysis?.negativeWords
                            ?.slice(0, 12)
                            .map((word, i) => (
                              <Badge
                                key={i}
                                className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20"
                              >
                                {word.word}
                              </Badge>
                            )) || (
                            <span className="text-sm text-muted-foreground">
                              No data available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="themes" className="mt-0">
              <div className="grid gap-6">
                <Card className="shadow-sm border-card/60 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="h-5 w-5 mr-2 text-primary" />
                      Theme Analysis
                    </CardTitle>
                    <CardDescription>
                      Prevalent themes found in your journal entries
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ThemeAnalysisChart data={themeAnalysis} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-card/60 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Tag className="h-5 w-5 mr-2 text-primary" />
                      Correlation Between Themes and Mood
                    </CardTitle>
                    <CardDescription>
                      How different topics correlate with your mood
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MoodCorrelationsChart data={moodCorrelations} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="mood" className="mt-0">
              <div className="grid gap-6">
                <Card className="shadow-sm border-card/60 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                      Mood Over Time
                    </CardTitle>
                    <CardDescription>
                      Visualize your mood fluctuations throughout{" "}
                      {timePeriod === "week"
                        ? "the past week"
                        : timePeriod === "month"
                        ? "the past month"
                        : timePeriod === "3months"
                        ? "the past quarter"
                        : timePeriod === "year"
                        ? "the past year"
                        : "all time"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-4 h-96">
                    <MoodChart
                      entries={reflections.map((r) => ({
                        id: r.id,
                        date: r.date,
                        mood: r.mood,
                        content: r.content || "",
                        tags: Array.isArray(r.tags) ? r.tags : [],
                      }))}
                    />
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-card/60 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      Mood Patterns
                    </CardTitle>
                    <CardDescription>
                      Potentially useful patterns identified in your mood data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {insights.slice(0, 3).map((insight, i) => (
                      <div key={i} className="flex">
                        <div className="mr-4 mt-1">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Lightbulb className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">
                            {getInsightTypeLabel(insight.type)}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {insight.content}
                          </p>
                        </div>
                      </div>
                    ))}

                    {insights.length === 0 && (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">
                          Continue journaling to reveal patterns in your mood
                          data
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

// Wrap with AuthenticatedLayout
export default function InsightsPage() {
  return (
    <AuthenticatedLayout>
      <InsightsContent />
    </AuthenticatedLayout>
  );
}
