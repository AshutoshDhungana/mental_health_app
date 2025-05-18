"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format, subDays, startOfWeek, isBefore, isAfter } from "date-fns"

// Make sure MoodChart can handle both legacy entries and API reflections
interface Entry {
  id: number | string
  date: string
  mood: number | string
  content: string
  tags: string[]
}

interface ProcessedEntry extends Omit<Entry, 'mood'> {
  mood: number
}

interface MoodChartProps {
  entries: Entry[]
  timeRange?: 'week' | 'month' | '3months' | 'all'
}

export function MoodChart({ entries }: MoodChartProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | '3months' | 'all'>("week")
  
  // Process entries for the chart
  const processEntries = (entriesToProcess: Entry[]): ProcessedEntry[] => {
    const today = new Date();
    let startDate: Date;
    let endDate = today;

    // Set date range based on selected filter
    switch (timeRange) {
      case 'week':
        startDate = startOfWeek(today);
        break;
      case 'month':
        startDate = subDays(today, 30);
        break;
      case '3months':
        startDate = subDays(today, 90);
        break;
      case 'all':
      default:
        startDate = new Date('1970-01-01');
        break;
    }

    // Filter entries by date range and normalize mood values
    const processedEntries = entriesToProcess
      .filter((entry: Entry) => {
        try {
          const entryDate = new Date(entry.date);
          return entryDate >= startDate && entryDate <= endDate;
        } catch (e) {
          console.error('Error processing entry date:', entry.date, e);
          return false;
        }
      })
      .map((entry: Entry) => {
        let moodValue: number;
        
        if (typeof entry.mood === 'string') {
          // Handle emoji strings
          const emojiIndex = ['😢', '😕', '😐', '🙂', '😊'].indexOf(entry.mood);
          moodValue = emojiIndex >= 0 ? emojiIndex + 1 : 3; // Default to 3 if not found
        } else if (typeof entry.mood === 'number') {
          // Ensure numeric mood is within 1-5 range
          moodValue = Math.min(5, Math.max(1, entry.mood));
        } else {
          // Fallback for any other type
          moodValue = 3;
        }
        
        return {
          ...entry,
          mood: moodValue
        } as ProcessedEntry;
      });

    // Sort entries by date (oldest first)
    return [...processedEntries].sort(
      (a: ProcessedEntry, b: ProcessedEntry) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const sortedEntries = processEntries(entries);

  // Group entries by date for the calendar
  const entriesByDate = sortedEntries.reduce<Record<string, number>>((acc: Record<string, number>, entry: ProcessedEntry) => {
    try {
      const date = format(new Date(entry.date), 'yyyy-MM-dd');
      acc[date] = entry.mood;
    } catch (e) {
      console.error('Error processing entry date for calendar:', entry.date, e);
    }
    return acc;
  }, {})

  // Format data for the chart
  const data = sortedEntries.map((entry: ProcessedEntry) => {
    try {
      return {
        date: format(new Date(entry.date), 'MMM d'),
        mood: entry.mood,
        content: entry.content || '',
        fullDate: entry.date
      };
    } catch (e) {
      console.error('Error formatting entry date:', entry.date, e);
      return {
        date: 'Invalid Date',
        mood: entry.mood,
        content: entry.content || '',
        fullDate: new Date().toISOString()
      };
    }
  })

  // Calculate average mood for the selected time range
  const averageMood = data.length > 0 
    ? data.reduce((acc, entry) => acc + entry.mood, 0) / data.length 
    : 0;
  const averageMoodRounded = Math.round(averageMood * 10) / 10

  // Get mood emoji based on average mood
  const moodEmojis = ['😢', '😕', '😐', '🙂', '😊']
  const moodEmoji = moodEmojis[Math.max(0, Math.min(4, Math.round(averageMood) - 1))] || '😐'

  // Format mood values for display
  const formatTooltip = (value: number): string => {
    try {
      // Ensure value is within 1-5 range
      const moodValue = Math.min(5, Math.max(1, Number(value) || 3));
      const moodEmojis = ['😢', '😕', '😐', '🙂', '😊'];
      return moodEmojis[Math.round(moodValue) - 1] || '😐';
    } catch (e) {
      console.error('Error formatting mood value:', value, e);
      return '😐';
    }
  };

  // Get mood description based on average mood
  const getMoodDescription = (mood: number) => {
    if (mood >= 4.5) return 'Excellent!';
    if (mood >= 3.5) return 'Very Good';
    if (mood >= 2.5) return 'Good';
    if (mood >= 1.5) return 'Not Great';
    return 'Poor';
  };

  // Calculate mood averages
  const moodAverages = (() => {
    if (sortedEntries.length === 0) return { average: 0, change: 0 };
    
    try {
      const currentPeriod = sortedEntries.reduce((sum, entry) => sum + entry.mood, 0);
      const currentAvg = currentPeriod / sortedEntries.length;
      
      // Calculate change based on first and last entry
      let change = 0;
      if (sortedEntries.length > 1) {
        const firstMood = sortedEntries[0].mood;
        const lastMood = sortedEntries[sortedEntries.length - 1].mood;
        change = ((lastMood - firstMood) / firstMood) * 100; // Percentage change
      }
      
      return {
        average: parseFloat(currentAvg.toFixed(1)),
        change: parseFloat(change.toFixed(1))
      };
    } catch (e) {
      console.error('Error calculating mood averages:', e);
      return { average: 0, change: 0 };
    }
  })();

  // Define types for tooltip data
  interface TooltipPayloadItem {
    value: number;
    payload: {
      fullDate?: string;
      content?: string;
    };
  }

  interface TooltipProps {
    active?: boolean;
    payload?: TooltipPayloadItem[];
    label?: string;
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (!active || !payload || !payload.length) return null;
    
    try {
      const moodValue = Number(payload[0]?.value) || 3;
      const moodLabel = formatTooltip(moodValue);
      const entry = payload[0]?.payload || {};
      
      return (
        <div className="bg-white p-3 border rounded shadow-lg text-sm">
          <p className="font-semibold">
            {entry.fullDate ? format(new Date(entry.fullDate), 'MMMM d, yyyy') : label || 'Unknown Date'}
          </p>
          <p className="mt-1">
            Mood: {moodLabel} ({moodValue.toFixed(1)}/5)
          </p>
          {entry.content && (
            <p className="mt-1 text-gray-600 max-w-xs">
              {entry.content.length > 80 
                ? `${entry.content.substring(0, 80)}...` 
                : entry.content}
            </p>
          )}
        </div>
      );
    } catch (e) {
      console.error('Error rendering tooltip:', e);
      return null;
    }
  };

  // Handle time range change
  const handleTimeRangeChange = (range: 'week' | 'month' | '3months' | 'all') => {
    setTimeRange(range);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Mood Tracker</h3>
        <div className="flex space-x-2">
          {(['week', 'month', '3months', 'all'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTimeRangeChange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      <Card className="p-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false}
                tickMargin={10}
              />
              <YAxis
                dataKey="mood"
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                tickFormatter={(value: any) => formatTooltip(Number(value)).toString()}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                type="number"
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Average Mood</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{moodEmoji}</span>
            <span className="text-2xl font-semibold">
              {averageMoodRounded}/5
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {getMoodDescription(averageMoodRounded)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Entries</p>
          <p className="text-2xl font-semibold">{sortedEntries.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Trend</p>
          <p className="text-2xl font-semibold">
            {moodAverages.change > 0 ? '↑' : moodAverages.change < 0 ? '↓' : '→'} {Math.abs(moodAverages.change).toFixed(1)} points {moodAverages.change > 0 ? 'higher' : moodAverages.change < 0 ? 'lower' : 'no change'}  
          </p>
        </Card>
      </div>
    </div>
  )
}
