"use client";

import { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  addDays,
  isBefore,
  isToday,
  isSameDay,
  parseISO,
} from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Smile,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Lock,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type DailyReflection = {
  date: string; // ISO string format
  mood: string; // emoji
  content: string;
};

type WeeklyCalendarProps = {
  reflections: DailyReflection[];
  onSelectDate: (date: Date) => void;
  onAddMood: (date: Date, mood: string) => void;
};

const EMOJI_OPTIONS = ["😊", "😀", "🙂", "😐", "😕", "😢", "😡"];

export function WeeklyCalendar({
  reflections,
  onSelectDate,
  onAddMood,
}: WeeklyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<Date | null>(null);

  // Get the start of the current week (Sunday)
  const startOfCurrentWeek = startOfWeek(currentDate);

  // Create an array of the 7 days of the week
  const weekDays = [...Array(7)].map((_, i) => {
    const date = addDays(startOfCurrentWeek, i);
    const isFutureDate = !isToday(date) && !isBefore(date, new Date());
    const reflection = reflections.find((r) =>
      isSameDay(parseISO(r.date), date)
    );

    return {
      date,
      dayName: format(date, "EEE"),
      dayNumber: format(date, "d"),
      isFutureDate,
      reflection,
      isToday: isToday(date),
    };
  });

  const previousWeek = () => {
    setCurrentDate((prev) => addDays(prev, -7));
  };

  const nextWeek = () => {
    // Allow going to next week as long as we're not already looking at a week too far in the future
    const nextWeekStart = addDays(startOfCurrentWeek, 7);
    const today = new Date();

    // Don't allow going more than 4 weeks into the future
    if (nextWeekStart.getTime() - today.getTime() < 28 * 24 * 60 * 60 * 1000) {
      setCurrentDate((prev) => addDays(prev, 7));
    }
  };

  const handleDateClick = (date: Date, isFutureDate: boolean) => {
    if (isFutureDate) return;

    setSelectedDate(date);
    onSelectDate(date);
  };

  const handleEmojiClick = (date: Date, emoji: string) => {
    onAddMood(date, emoji);
    setShowEmojiPicker(null);
  };

  // Function to get color class based on mood emoji
  const getMoodColorClass = (emoji: string) => {
    switch (emoji) {
      case "😊":
      case "😀":
        return "bg-primary/15 text-primary border-primary/30";
      case "🙂":
        return "bg-secondary/15 text-secondary border-secondary/30";
      case "😐":
        return "bg-yellow/15 text-yellow-foreground border-yellow/30";
      case "😕":
      case "😢":
      case "😡":
        return "bg-accent/15 text-accent-foreground border-accent/30";
      default:
        return "bg-primary/15 text-primary border-primary/30";
    }
  };

  return (
    <Card className="border shadow-lg overflow-hidden bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-primary" />
            Weekly Reflections
          </CardTitle>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
                  onClick={previousWeek}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous week</TooltipContent>
            </Tooltip>
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {format(startOfCurrentWeek, "MMM d")} -{" "}
              {format(addDays(startOfCurrentWeek, 6), "MMM d, yyyy")}
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
                  onClick={nextWeek}
                  disabled={
                    !weekDays.some(
                      (day) =>
                        isToday(day.date) || isBefore(day.date, new Date())
                    )
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next week</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-7 gap-3">
          {weekDays.map((day) => (
            <div key={day.dayNumber + day.dayName} className="text-center">
              <div className="text-xs text-muted-foreground mb-1 font-medium">
                {day.dayName}
              </div>
              <div
                className={cn(
                  "relative h-16 rounded-lg flex flex-col items-center justify-center cursor-pointer border transition-all duration-300",
                  day.isToday && "bg-primary/10 border-primary/50 shadow-sm",
                  day.isFutureDate &&
                    "opacity-40 cursor-not-allowed border-dashed",
                  day.reflection &&
                    day.reflection.mood &&
                    "bg-secondary/10 hover:bg-secondary/15",
                  !day.reflection &&
                    !day.isFutureDate &&
                    "hover:bg-background hover:border-primary/30 hover:shadow-sm",
                  isSameDay(day.date, selectedDate || new Date()) &&
                    "ring-2 ring-primary ring-offset-1 shadow-md"
                )}
                onClick={() => handleDateClick(day.date, day.isFutureDate)}
              >
                <span
                  className={cn(
                    "text-sm font-medium",
                    day.isToday && "text-primary"
                  )}
                >
                  {day.dayNumber}
                </span>

                {day.reflection && day.reflection.mood ? (
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full mt-1 border transition-transform duration-300 hover:scale-110",
                      getMoodColorClass(day.reflection.mood)
                    )}
                    title="Click to change mood"
                  >
                    <span className="text-lg">{day.reflection.mood}</span>
                  </div>
                ) : day.isFutureDate ? (
                  <div className="mt-2 opacity-60">
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  </div>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 mt-1 rounded-full hover:bg-primary/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowEmojiPicker(day.date);
                        }}
                      >
                        <Smile className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add mood for this day</TooltipContent>
                  </Tooltip>
                )}

                {/* Indicator for days with journal entries */}
                {day.reflection && day.reflection.content && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"></span>
                )}

                {showEmojiPicker && isSameDay(day.date, showEmojiPicker) && (
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-card z-20 shadow-lg rounded-md border p-1.5 flex gap-1.5 backdrop-blur-lg">
                    {EMOJI_OPTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        className="text-lg hover:bg-accent/10 rounded-full p-1 transition-transform hover:scale-125 active:scale-90"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEmojiClick(day.date, emoji);
                        }}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center text-xs text-muted-foreground mt-4">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Click on a day to view or add journal entries</span>
        </div>
      </CardContent>
    </Card>
  );
}
