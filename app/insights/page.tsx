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
  Smile,
  PenLine,
  BookOpen,
  AlertTriangle,
  RefreshCcw,
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

// Time period options
type TimePeriod = "week" | "month" | "3months" | "year" | "all";

// Create a proper fallback for SentimentAnalysisResult
const emptySentimentData: SentimentAnalysisResult = {
  overallSentiment: 0,
  sentimentByDay: [],
  positiveWords: [],
  negativeWords: [],
  sentimentTrend: "stable",
};

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

  // Define a helper interface for tag structures that could be encountered
  interface TagObject {
    tag?: {
      id?: string;
      name?: string;
    };
    id?: string;
    name?: string;
  }

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
    <div className="container px-4 py-6 md:py-8 max-w-6xl mx-auto">
      <div className="flex flex-col space-y-6">
        {/* Page header with improved visual hierarchy */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <Lightbulb className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Mental Health Insights
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track your progress and discover patterns in your mental health
              journey
            </p>
          </div>

          {/* Time period selector with improved styling */}
          <div className="flex items-center gap-2 bg-muted/30 rounded-full p-1 shadow-inner self-end">
            {[
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
              { value: "3months", label: "Quarter" },
              { value: "year", label: "Year" },
              { value: "all", label: "All Time" },
            ].map((period) => (
              <Button
                key={period.value}
                onClick={() => setTimePeriod(period.value as TimePeriod)}
                variant="ghost"
                size="sm"
                className={`px-3 py-1 rounded-full text-xs ${
                  timePeriod === period.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {period.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Main content with improved tabs and cards */}
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto bg-muted/50 p-1 rounded-lg">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="mood"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
            >
              <Activity className="h-4 w-4 mr-2" />
              Mood Analysis
            </TabsTrigger>
            <TabsTrigger
              value="themes"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
            >
              <Brain className="h-4 w-4 mr-2" />
              Themes
            </TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">
                  Loading your insights...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <p className="text-muted-foreground">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="mt-4"
                >
                  <RefreshCcw className="h-4 w-4 mr-2" /> Retry
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6">
                {/* Mood Stats Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {/* Average Mood Card */}
                  <Card className="border-none shadow-lg bg-card/90 backdrop-blur-sm overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg"></div>
                    <CardHeader className="pb-2 relative z-10">
                      <CardTitle className="text-lg font-medium flex items-center gap-1.5">
                        <Activity className="h-4 w-4 text-primary" />
                        Average Mood
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="flex items-center">
                        <div className="text-4xl font-bold mr-2">
                          {getMoodStats().average.toFixed(1)}
                        </div>
                        <div className="text-4xl">
                          {getMoodStats().highest || "😊"}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {getMoodStats().change > 0
                          ? "Improving"
                          : getMoodStats().change < 0
                          ? "Declining"
                          : "Stable"}{" "}
                        trend
                      </p>
                    </CardContent>
                  </Card>

                  {/* Common Moods Card */}
                  <Card className="border-none shadow-lg bg-card/90 backdrop-blur-sm overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-lg"></div>
                    <CardHeader className="pb-2 relative z-10">
                      <CardTitle className="text-lg font-medium flex items-center gap-1.5">
                        <Smile className="h-4 w-4 text-accent" />
                        Most Common
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="text-4xl">
                          {getMoodStats().highest || "😊"}
                        </div>
                        <div className="text-4xl">
                          {getMoodStats().lowest || "😐"}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Most frequent moods in this period
                      </p>
                    </CardContent>
                  </Card>

                  {/* Tags Card */}
                  <Card className="border-none shadow-lg bg-card/90 backdrop-blur-sm overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent rounded-lg"></div>
                    <CardHeader className="pb-2 relative z-10">
                      <CardTitle className="text-lg font-medium flex items-center gap-1.5">
                        <Tag className="h-4 w-4 text-secondary" />
                        Top Tags
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="flex flex-wrap gap-1.5">
                        {getTopTags(5).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-secondary/10 text-secondary-foreground border-secondary/20"
                          >
                            {tag.tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Based on {reflections.length} journal entries
                      </p>
                    </CardContent>
                  </Card>

                  {/* Entries Card */}
                  <Card className="border-none shadow-lg bg-card/90 backdrop-blur-sm overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink/5 to-transparent rounded-lg"></div>
                    <CardHeader className="pb-2 relative z-10">
                      <CardTitle className="text-lg font-medium flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-pink" />
                        Journaling
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="text-4xl font-bold">
                        {reflections.length}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Total entries in this period
                      </p>
                      <div className="mt-2">
                        <Link href="/journal">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <PenLine className="h-3 w-3 mr-1.5" />
                            Write New Entry
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Mood Chart */}
                  <Card className="border-none shadow-lg bg-card/90 backdrop-blur-sm">
                    <CardHeader className="pb-3 border-b">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium flex items-center gap-1.5">
                          <BarChart3 className="h-4 w-4 text-primary" />
                          Mood Over Time
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 h-[300px]">
                      <MoodChart entries={reflections} />
                    </CardContent>
                  </Card>

                  {/* Sentiment Analysis */}
                  <Card className="border-none shadow-lg bg-card/90 backdrop-blur-sm">
                    <CardHeader className="pb-3 border-b">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium flex items-center gap-1.5">
                          <PieChart className="h-4 w-4 text-primary" />
                          Sentiment Analysis
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 h-[300px]">
                      <SentimentChart
                        data={sentimentAnalysis || emptySentimentData}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Mental Health Insights */}
                <Card className="border-none shadow-lg bg-card/90 backdrop-blur-sm mb-6">
                  <CardHeader className="pb-3 border-b">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium flex items-center gap-1.5">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        Personalized Insights
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <MentalHealthInsights insights={insights} />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Mood Analysis Tab */}
              <TabsContent value="mood" className="space-y-6 mt-6">
                <Card className="border-none shadow-lg bg-card/90 backdrop-blur-sm">
                  <CardHeader className="pb-3 border-b">
                    <CardTitle className="text-lg font-medium flex items-center gap-1.5">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      Mood Distribution
                    </CardTitle>
                    <CardDescription>
                      Frequency of different moods in your journal entries
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 h-[350px]">
                    <MoodChart entries={reflections} />
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-card/90 backdrop-blur-sm">
                  <CardHeader className="pb-3 border-b">
                    <CardTitle className="text-lg font-medium flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Mood Correlations
                    </CardTitle>
                    <CardDescription>
                      Relationships between tags and mood states
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <MoodCorrelationsChart data={moodCorrelations} />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Themes Tab */}
              <TabsContent value="themes" className="space-y-6 mt-6">
                <Card className="border-none shadow-lg bg-card/90 backdrop-blur-sm">
                  <CardHeader className="pb-3 border-b">
                    <CardTitle className="text-lg font-medium flex items-center gap-1.5">
                      <Brain className="h-4 w-4 text-primary" />
                      Theme Analysis
                    </CardTitle>
                    <CardDescription>
                      Common themes and topics in your journal entries
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 h-[400px]">
                    <ThemeAnalysisChart data={themeAnalysis} />
                  </CardContent>
                </Card>

                {/* Top Tags Card with more detail */}
                <Card className="border-none shadow-lg bg-card/90 backdrop-blur-sm">
                  <CardHeader className="pb-3 border-b">
                    <CardTitle className="text-lg font-medium flex items-center gap-1.5">
                      <Tag className="h-4 w-4 text-primary" />
                      Tag Frequency
                    </CardTitle>
                    <CardDescription>
                      Tags you use most often in your journal entries
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-2">
                      {getTopTags(20).map((tag, index) => {
                        // Calculate size based on frequency
                        const sizeClass =
                          index < 5
                            ? "text-lg font-medium"
                            : index < 10
                            ? "text-base"
                            : "text-sm";

                        // Calculate color based on position
                        const colors = [
                          "bg-primary/10 text-primary border-primary/20",
                          "bg-secondary/10 text-secondary-foreground border-secondary/20",
                          "bg-accent/10 text-accent-foreground border-accent/20",
                          "bg-pink/10 text-pink-foreground border-pink/20",
                          "bg-yellow/10 text-yellow-foreground border-yellow/20",
                          "bg-muted/30 text-muted-foreground border-muted/30",
                        ];

                        const colorClass = colors[index % colors.length];

                        return (
                          <span
                            key={index}
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 ${sizeClass} ${colorClass}`}
                          >
                            {tag.tag}{" "}
                            <span className="ml-1.5 text-xs opacity-70">
                              ({tag.count})
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
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
