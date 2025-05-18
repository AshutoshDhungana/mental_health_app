'use client';

import { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, isBefore, isToday, isSameDay, parseISO } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smile, ChevronLeft, ChevronRight, CalendarDays, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

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

const EMOJI_OPTIONS = ['😊', '😀', '🙂', '😐', '😕', '😢', '😡'];

export function WeeklyCalendar({ reflections, onSelectDate, onAddMood }: WeeklyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<Date | null>(null);

  // Get the start of the current week (Sunday)
  const startOfCurrentWeek = startOfWeek(currentDate);
  
  // Create an array of the 7 days of the week
  const weekDays = [...Array(7)].map((_, i) => {
    const date = addDays(startOfCurrentWeek, i);
    const isFutureDate = !isToday(date) && !isBefore(date, new Date());
    const reflection = reflections.find(r => 
      isSameDay(parseISO(r.date), date)
    );

    return {
      date,
      dayName: format(date, 'EEE'),
      dayNumber: format(date, 'd'),
      isFutureDate,
      reflection
    };
  });

  const previousWeek = () => {
    setCurrentDate(prev => addDays(prev, -7));
  };

  const nextWeek = () => {
    // Allow going to next week as long as we're not already looking at a week too far in the future
    const nextWeekStart = addDays(startOfCurrentWeek, 7);
    const today = new Date();
    
    // Don't allow going more than 4 weeks into the future
    if (nextWeekStart.getTime() - today.getTime() < 28 * 24 * 60 * 60 * 1000) {
      setCurrentDate(prev => addDays(prev, 7));
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

  return (
    <Card className="border shadow-md overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-primary" />
            Weekly Reflections
          </h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8" 
              onClick={previousWeek}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              {format(startOfCurrentWeek, 'MMM d')} - {format(addDays(startOfCurrentWeek, 6), 'MMM d, yyyy')}
            </span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={nextWeek}
              disabled={!weekDays.some(day => isToday(day.date) || isBefore(day.date, new Date()))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div key={day.dayNumber + day.dayName} className="text-center">
              <div className="text-xs text-muted-foreground mb-1">{day.dayName}</div>
              <div 
                className={cn(
                  "relative h-14 rounded-md flex flex-col items-center justify-center cursor-pointer border transition-all",
                  isToday(day.date) && "bg-primary/10 border-primary",
                  day.isFutureDate && "opacity-50 cursor-not-allowed border-dashed",
                  day.reflection && "bg-secondary/30",
                  isSameDay(day.date, selectedDate || new Date()) && "ring-2 ring-primary ring-offset-1"
                )}
                onClick={() => handleDateClick(day.date, day.isFutureDate)}
              >
                <span className={cn(
                  "text-sm font-medium",
                  isToday(day.date) && "text-primary"
                )}>
                  {day.dayNumber}
                </span>
                
                {day.reflection ? (
                  <span className="text-lg mt-1" title="Click to change mood">
                    {day.reflection.mood}
                  </span>
                ) : day.isFutureDate ? (
                  <Lock className="h-3 w-3 mt-1 text-muted-foreground" />
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 mt-1 hover:bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEmojiPicker(day.date);
                    }}
                  >
                    <Smile className="h-4 w-4 text-muted-foreground" />
                  </Button>
                )}
                
                {showEmojiPicker && isSameDay(day.date, showEmojiPicker) && (
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-background z-20 shadow-lg rounded-md border p-1 flex gap-1">
                    {EMOJI_OPTIONS.map(emoji => (
                      <button
                        key={emoji}
                        className="text-lg hover:bg-accent rounded p-1"
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
      </CardContent>
    </Card>
  );
}
