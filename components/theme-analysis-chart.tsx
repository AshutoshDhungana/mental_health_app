"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { ThemeAnalysisResult } from '@/lib/mental-health-analysis';
import { TrendingUp, TrendingDown, Minus, ChevronRight, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ThemeAnalysisChartProps = {
  data: ThemeAnalysisResult[];
  className?: string;
  maxDisplayed?: number;
};

export function ThemeAnalysisChart({ 
  data, 
  className = '',
  maxDisplayed = 4
}: ThemeAnalysisChartProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  
  const toggleTheme = (themeName: string) => {
    setExpanded(prev => ({
      ...prev,
      [themeName]: !prev[themeName]
    }));
  };

  const renderTrendIcon = (trend: 'increasing' | 'decreasing' | 'stable') => {
    if (trend === 'increasing') {
      return <TrendingUp className="h-4 w-4 text-amber-500" />;
    } else if (trend === 'decreasing') {
      return <TrendingDown className="h-4 w-4 text-emerald-500" />;
    } else {
      return <Minus className="h-4 w-4 text-slate-500" />;
    }
  };

  const getTrendLabel = (trend: 'increasing' | 'decreasing' | 'stable', themeName: string) => {
    if (trend === 'increasing') {
      return (
        <span className="text-amber-600 dark:text-amber-400 text-xs font-medium">
          Increasing mentions
        </span>
      );
    } else if (trend === 'decreasing') {
      return (
        <span className="text-emerald-600 dark:text-emerald-400 text-xs font-medium">
          Decreasing mentions
        </span>
      );
    } else {
      return (
        <span className="text-slate-600 dark:text-slate-400 text-xs font-medium">
          Stable mentions
        </span>
      );
    }
  };

  // Get theme color based on the theme name
  const getThemeColor = (themeName: string) => {
    const colorMap: Record<string, string> = {
      'Anxiety': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      'Depression': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Stress': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'Sleep Issues': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      'Relationships': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      'Self-Care': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      'Gratitude': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Achievement': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300'
    };
    
    return colorMap[themeName] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  };

  return (
    <Card className={`${className} border shadow-md overflow-hidden`}>
      <CardHeader className="pb-3 px-3 sm:px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg flex items-center">
            Mental Health Themes
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Theme info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Themes are topics detected in your journal entries based on key words and phrases.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-xs sm:text-sm">Key topics detected in your journal entries</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {data.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground text-sm">
              Not enough journal entries to analyze themes.
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Continue journaling regularly to unlock insights.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.slice(0, maxDisplayed).map((theme) => (
              <div key={theme.themeName} className="space-y-2">
                {/* Theme header with percentage bar */}
                <div 
                  className="cursor-pointer"
                  onClick={() => toggleTheme(theme.themeName)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className={getThemeColor(theme.themeName)}>
                        {theme.themeName}
                      </Badge>
                      {renderTrendIcon(theme.trend)}
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{theme.percentage}%</span>
                      <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${expanded[theme.themeName] ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                  
                  {/* Progress bar for theme percentage */}
                  <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-500 rounded-full"
                      style={{ 
                        width: `${theme.percentage}%`,
                        backgroundColor: theme.themeName === 'Anxiety' || theme.themeName === 'Depression' || theme.themeName === 'Stress' 
                          ? 'rgb(251, 146, 60)' // amber-400
                          : 'rgb(45, 212, 191)' // teal-400
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-muted-foreground">
                      Mentioned in {theme.count} {theme.count === 1 ? 'entry' : 'entries'}
                    </span>
                    {getTrendLabel(theme.trend, theme.themeName)}
                  </div>
                </div>
                
                {/* Expanded theme details */}
                {expanded[theme.themeName] && (
                  <div className="mt-3 space-y-2 pl-2 border-l-2 border-muted">
                    <p className="text-xs text-muted-foreground">{theme.description}</p>
                    
                    {theme.entries.length > 0 && (
                      <div className="space-y-2 mt-2">
                        <h5 className="text-xs font-medium">Sample mentions:</h5>
                        {theme.entries.map((entry) => (
                          <div key={entry.id} className="bg-secondary/30 p-2 rounded text-xs">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-muted-foreground">
                                {format(new Date(entry.date), 'MMM d, yyyy')}
                              </span>
                            </div>
                            <p>"{entry.excerpt}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {data.length > maxDisplayed && (
        <CardFooter className="pt-2">
          <Button variant="ghost" size="sm" className="w-full">
            View All {data.length} Themes
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
