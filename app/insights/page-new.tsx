'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout';
import { getReflections, Reflection } from '@/lib/api';
import { format, subDays, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
  Lightbulb
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MoodChart } from '@/components/mood-chart';
import { SentimentChart } from '@/components/sentiment-chart';
import { ThemeAnalysisChart } from '@/components/theme-analysis-chart';
import { MoodCorrelationsChart } from '@/components/mood-correlations-chart';
import { MentalHealthInsights } from '@/components/mental-health-insights';
import {
  analyzeThemes,
  analyzeSentiment,
  analyzeMoodCorrelations,
  generateInsights,
  ThemeAnalysisResult,
  SentimentAnalysisResult,
  MoodCorrelation,
  MentalHealthInsight
} from '@/lib/mental-health-analysis';

// Time period options
type TimePeriod = 'week' | 'month' | '3months' | 'year' | 'all';

// Component for the Insights page
function InsightsContent() {
  const { user } = useAuth();
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [themeAnalysis, setThemeAnalysis] = useState<ThemeAnalysisResult[]>([]);
  const [sentimentAnalysis, setSentimentAnalysis] = useState<SentimentAnalysisResult | null>(null);
  const [moodCorrelations, setMoodCorrelations] = useState<MoodCorrelation[]>([]);
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
        case 'week':
          startDate = subDays(now, 7).toISOString();
          break;
        case 'month':
          startDate = startOfMonth(now).toISOString();
          break;
        case '3months':
          startDate = subDays(now, 90).toISOString();
          break;
        case 'year':
          startDate = subDays(now, 365).toISOString();
          break;
        case 'all':
        default:
          startDate = undefined;
      }

      try {
        // In a real app, we'd use a proper userId, but for demo we're using 'demo-user'
        const userId = user?.id || 'demo-user';
        const response = await getReflections(userId, startDate);
        
        if (response.error) {
          setError(response.error);
        } else if (response.data) {
          setReflections(response.data);
        }
      } catch (err) {
        setError('Failed to load reflections');
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
        highest: '',
        lowest: '',
        change: 0
      };
    }

    // Define emoji values for calculations
    const emojiValues: Record<string, number> = {
      '😔': 1,
      '😕': 2,
      '😐': 3,
      '🙂': 4,
      '😊': 5,
      '😄': 5 // Alternate emoji mapping to same value
    };

    // Calculate numeric values for moods
    const moodValues = reflections.map(r => emojiValues[r.mood] || 3);
    const averageMood = moodValues.reduce((sum, val) => sum + val, 0) / moodValues.length;
    
    // Get most recent mood and mood from start of period
    const recentMood = moodValues[0] || 3;
    const oldestMood = moodValues[moodValues.length - 1] || 3;
    const moodChange = recentMood - oldestMood;
    
    // Find most common mood
    const moodCounts: Record<string, number> = {};
    reflections.forEach(r => {
      moodCounts[r.mood] = (moodCounts[r.mood] || 0) + 1;
    });
    
    let highestCount = 0;
    let highestMood = '';
    
    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (count > highestCount) {
        highestCount = count;
        highestMood = mood;
      }
    });
    
    // Find lowest mood with at least 10% occurrence
    const totalEntries = reflections.length;
    let lowestMoodVal = 6;
    let lowestMood = '';
    
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
      change: moodChange
    };
  };

  // Get top tags from reflections
  const getTopTags = (limit = 5) => {
    if (reflections.length === 0) {
      return [];
    }
    
    // Count tag occurrences
    const tagCounts: Record<string, number> = {};
    
    reflections.forEach(reflection => {
      reflection.tags?.forEach(tagObj => {
        const tagName = tagObj.tag.name;
        tagCounts[tagName] = (tagCounts[tagName] || 0) + 1;
      });
    });
    
    // Convert to array and sort by count
    return Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  };

  // Render the component UI
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Insights</h1>
        
        <div className="flex items-center space-x-1">
          <Button
            variant={timePeriod === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimePeriod('week')}
          >
            Week
          </Button>
          <Button
            variant={timePeriod === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimePeriod('month')}
          >
            Month
          </Button>
          <Button
            variant={timePeriod === '3months' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimePeriod('3months')}
          >
            3 Months
          </Button>
          <Button
            variant={timePeriod === 'year' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimePeriod('year')}
          >
            Year
          </Button>
          <Button
            variant={timePeriod === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimePeriod('all')}
          >
            All Time
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 mb-2">Error: {error}</p>
          <Button variant="outline" onClick={() => loadReflections()}>
            Retry
          </Button>
        </div>
      ) : reflections.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <p className="text-muted-foreground text-lg">No journal entries found for this time period.</p>
          <Button asChild variant="default">
            <Link href="/journal">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Start Journaling
            </Link>
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="mental-health">
              <Brain className="h-4 w-4 mr-2" />
              Mental Health
            </TabsTrigger>
            <TabsTrigger value="patterns">
              <Activity className="h-4 w-4 mr-2" />
              Patterns & Correlations
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-12 auto-rows-min">
              {/* Mood Overview Card */}
              <Card className="border shadow-md md:col-span-4">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Heart className="h-5 w-5 text-primary mr-2" /> Mood Overview
                  </CardTitle>
                  <CardDescription>Your mood patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <MoodChart reflections={reflections} />
                  
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Average Mood</p>
                        <div className="flex items-baseline">
                          <p className="text-2xl font-bold">
                            {getMoodStats().average.toFixed(1)}
                          </p>
                          <p className="text-sm text-muted-foreground ml-1">/ 5</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Most Common</p>
                        <p className="text-2xl font-bold">{getMoodStats().highest}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Top Tags Card */}
              <Card className="border shadow-md md:col-span-4">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Tag className="h-5 w-5 text-primary mr-2" /> Top Tags
                  </CardTitle>
                  <CardDescription>Most used tags in your journal</CardDescription>
                </CardHeader>
                <CardContent>
                  {getTopTags().length > 0 ? (
                    <div className="space-y-3">
                      {getTopTags().map(({ tag, count }) => (
                        <div key={tag} className="flex justify-between items-center p-2 bg-secondary/20 rounded-lg">
                          <div className="px-2 py-1 rounded-md bg-primary/10 text-primary text-sm">
                            #{tag}
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium">{count}</span>
                            <span className="text-muted-foreground ml-1">entries</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm text-center py-4">
                      No tags found for this time period.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Reflection Frequency Card */}
              <Card className="border shadow-md md:col-span-4">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Clock className="h-5 w-5 text-primary mr-2" /> Reflection Activity
                  </CardTitle>
                  <CardDescription>Your journaling consistency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Total Reflections</p>
                        <p className="text-3xl font-bold">{reflections.length}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Average Length</p>
                        <p className="text-3xl font-bold">
                          {reflections.length > 0 ? Math.round(reflections.reduce((acc, r) => acc + r.content.length, 0) / reflections.length) : 0} chars
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">First Entry</p>
                        <p className="text-sm">
                          {reflections.length > 0 ? format(new Date(reflections[reflections.length - 1].date), 'MMM d, yyyy') : '-'}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Latest Entry</p>
                        <p className="text-sm">
                          {reflections.length > 0 ? format(new Date(reflections[0].date), 'MMM d, yyyy') : '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/journal">
                      <Calendar className="mr-2 h-4 w-4" />
                      View All Journal Entries
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Recent Entries */}
            <Card className="border shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Recent Entries</CardTitle>
                <CardDescription>Your most recent journal entries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reflections.slice(0, 3).map((reflection) => (
                    <div key={reflection.id} className="p-3 bg-secondary/20 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium">
                          {format(new Date(reflection.date), 'EEEE, MMMM d, yyyy')}
                        </p>
                        <span className="text-xl">{reflection.mood}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {reflection.content.substring(0, 150)}{reflection.content.length > 150 ? '...' : ''}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {reflection.tags?.map(tagObj => (
                          <span key={tagObj.tag.id} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                            #{tagObj.tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Mental Health Tab */}
          <TabsContent value="mental-health" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-12">
              {/* Sentiment Analysis */}
              <div className="md:col-span-7">
                {sentimentAnalysis && (
                  <SentimentChart data={sentimentAnalysis} className="h-full" />
                )}
              </div>
              
              {/* Mental Health Insights */}
              <div className="md:col-span-5">
                <MentalHealthInsights insights={insights} className="h-full" />
              </div>
              
              {/* Theme Analysis */}
              <div className="md:col-span-12">
                <ThemeAnalysisChart data={themeAnalysis} />
              </div>
            </div>
          </TabsContent>
          
          {/* Patterns Tab */}
          <TabsContent value="patterns" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-12">
              {/* Mood Correlations */}
              <div className="md:col-span-6">
                <MoodCorrelationsChart data={moodCorrelations} />
              </div>
              
              {/* Journal Patterns */}
              <div className="md:col-span-6">
                <Card className="border shadow-md h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">Journaling Patterns</CardTitle>
                    <CardDescription>Insights from your journaling habits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Time of Day Analysis */}
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">When You Journal</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Morning</span>
                          <span className="text-xs text-muted-foreground">Afternoon</span>
                          <span className="text-xs text-muted-foreground">Evening</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 w-[30%]"></div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          You most often journal in the morning.
                        </p>
                      </div>
                      
                      {/* Day of Week Analysis */}
                      <div className="space-y-2 pt-4">
                        <h3 className="text-sm font-medium">Most Active Days</h3>
                        <div className="grid grid-cols-7 gap-1">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <div className="text-xs text-muted-foreground">{day}</div>
                              <div className={`w-full h-12 rounded-md ${index === 2 || index === 6 ? 'bg-primary' : 'bg-secondary'} flex items-end justify-center`}>
                                <div className={`w-full ${index === 2 ? 'h-full' : index === 6 ? 'h-3/4' : 'h-1/3'} rounded-md ${index === 2 || index === 6 ? 'bg-primary' : 'bg-primary/20'}`}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Wednesday and Sunday are your most active journaling days.
                        </p>
                      </div>
                      
                      {/* Consistency Streak */}
                      <div className="pt-4 space-y-1">
                        <h3 className="text-sm font-medium">Current Streak</h3>
                        <p className="text-3xl font-bold">3 days</p>
                        <p className="text-xs text-muted-foreground">
                          Your longest streak was 7 days in a row.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Word Cloud and Common Phrases */}
              <div className="md:col-span-12">
                <Card className="border shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Common Themes & Phrases</CardTitle>
                    <CardDescription>Words and phrases you use frequently</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-secondary/20 rounded-md mb-4">
                      <p className="text-muted-foreground text-sm">Word cloud visualization would appear here</p>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="bg-secondary/10 p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-2">Most Used Phrases</h4>
                        <ul className="space-y-1">
                          <li className="text-sm text-muted-foreground flex justify-between">
                            <span>"I feel like"</span>
                            <span>12x</span>
                          </li>
                          <li className="text-sm text-muted-foreground flex justify-between">
                            <span>"I need to"</span>
                            <span>8x</span>
                          </li>
                          <li className="text-sm text-muted-foreground flex justify-between">
                            <span>"been thinking about"</span>
                            <span>6x</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-secondary/10 p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-2">Emotional Words</h4>
                        <ul className="space-y-1">
                          <li className="text-sm text-emerald-600 flex justify-between">
                            <span>Grateful</span>
                            <span>14x</span>
                          </li>
                          <li className="text-sm text-blue-600 flex justify-between">
                            <span>Calm</span>
                            <span>9x</span>
                          </li>
                          <li className="text-sm text-amber-600 flex justify-between">
                            <span>Worried</span>
                            <span>7x</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-secondary/10 p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-2">Topic References</h4>
                        <ul className="space-y-1">
                          <li className="text-sm text-muted-foreground flex justify-between">
                            <span>Work</span>
                            <span>16x</span>
                          </li>
                          <li className="text-sm text-muted-foreground flex justify-between">
                            <span>Family</span>
                            <span>10x</span>
                          </li>
                          <li className="text-sm text-muted-foreground flex justify-between">
                            <span>Exercise</span>
                            <span>8x</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
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
