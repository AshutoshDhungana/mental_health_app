"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { SentimentAnalysisResult } from '@/lib/mental-health-analysis';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SentimentChartProps = {
  data: SentimentAnalysisResult;
  className?: string;
};

export function SentimentChart({ data, className = '' }: SentimentChartProps) {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const renderSentimentValue = (value: number) => {
    const percentage = Math.round(Math.abs(value) * 100);
    
    if (value > 0.15) {
      return <span className="text-emerald-600 dark:text-emerald-400 font-medium">Positive ({percentage}%)</span>;
    } else if (value < -0.15) {
      return <span className="text-rose-600 dark:text-rose-400 font-medium">Negative ({percentage}%)</span>;
    } else {
      return <span className="text-slate-600 dark:text-slate-400 font-medium">Neutral</span>;
    }
  };
  
  const renderTrendIcon = () => {
    if (data.sentimentTrend === 'improving') {
      return <TrendingUp className="h-5 w-5 text-emerald-500" />;
    } else if (data.sentimentTrend === 'declining') {
      return <TrendingDown className="h-5 w-5 text-rose-500" />;
    } else {
      return <Minus className="h-5 w-5 text-slate-500" />;
    }
  };

  const renderTrendText = () => {
    if (data.sentimentTrend === 'improving') {
      return <span className="text-emerald-600 dark:text-emerald-400 font-medium">Improving</span>;
    } else if (data.sentimentTrend === 'declining') {
      return <span className="text-rose-600 dark:text-rose-400 font-medium">Declining</span>;
    } else {
      return <span className="text-slate-600 dark:text-slate-400 font-medium">Stable</span>;
    }
  };

  // Calculate the range of colors from red to green
  const getSentimentBarColor = (value: number) => {
    if (value > 0) {
      const green = Math.min(150 + Math.round(value * 100), 220);
      return `rgb(46, ${green}, 140)`;
    } else {
      const red = Math.min(150 + Math.round(Math.abs(value) * 100), 220);
      return `rgb(${red}, 46, 79)`;
    }
  };

  // Calculate the width of the sentiment bars (0-100%)
  const getSentimentBarWidth = (value: number) => {
    const absValue = Math.abs(value);
    return `${Math.min(Math.round(absValue * 100), 100)}%`;
  };

  return (
    <Card className={`${className} border shadow-md overflow-hidden`}>
      <CardHeader className="pb-3 px-3 sm:px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg flex items-center">
            Sentiment Analysis
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setShowMoreInfo(!showMoreInfo)}>
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">More info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Sentiment analysis measures the emotional tone of your journal entries based on the words you use.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-xs sm:text-sm">Emotional tone of your journal entries</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-6">
          {/* Overall sentiment gauge */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Overall Sentiment</h4>
              {renderSentimentValue(data.overallSentiment)}
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="relative w-full h-full">
                <div 
                  className="absolute top-0 left-1/2 bottom-0 bg-muted-foreground/10 w-px"
                  style={{ left: '50%' }}></div>
                
                <div 
                  className={`absolute top-0 ${data.overallSentiment < 0 ? 'right-1/2' : 'left-1/2'} bottom-0 transition-all duration-500`}
                  style={{ 
                    width: getSentimentBarWidth(data.overallSentiment),
                    backgroundColor: getSentimentBarColor(data.overallSentiment)
                  }}></div>
              </div>
            </div>
          </div>
          
          {/* Trend indicator */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Sentiment Trend</h4>
              <div className="flex items-center gap-1">
                {renderTrendIcon()}
                {renderTrendText()}
              </div>
            </div>
            <div className="h-24 w-full relative rounded-md bg-secondary/30 overflow-hidden">
              {/* Center line at neutral sentiment */}
              <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center">
                <div className="w-full h-px bg-muted-foreground/20"></div>
              </div>
              
              {/* Sentiment plot points */}
              {data.sentimentByDay.length > 1 && data.sentimentByDay.map((day, index) => {
                const xPosition = (index / (data.sentimentByDay.length - 1)) * 100;
                // Map the sentiment from -1,1 range to 0-100% of height (0 at middle)
                const yPosition = 50 - (day.sentiment * 50);
                return (
                  <div 
                    key={day.date} 
                    className="absolute h-2 w-2 rounded-full bg-primary transition-all duration-300"
                    style={{ 
                      left: `${xPosition}%`, 
                      top: `${yPosition}%`,
                      backgroundColor: getSentimentBarColor(day.sentiment)
                    }}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="absolute inset-0"></span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            {format(new Date(day.date), 'MMM d, yyyy')}<br/>
                            Sentiment: {renderSentimentValue(day.sentiment)}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                );
              })}
              
              {/* Connect points with lines to form a chart */}
              {data.sentimentByDay.length > 1 && (
                <svg className="absolute inset-0 h-full w-full" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="line-gradient" gradientTransform="rotate(90)">
                      <stop offset="0%" stopColor="rgba(46, 200, 140, 0.5)" />
                      <stop offset="50%" stopColor="rgba(100, 116, 139, 0.3)" />
                      <stop offset="100%" stopColor="rgba(220, 46, 79, 0.5)" />
                    </linearGradient>
                  </defs>
                  <polyline 
                    points={data.sentimentByDay.map((day, index) => {
                      const xPosition = (index / (data.sentimentByDay.length - 1)) * 100;
                      const yPosition = 50 - (day.sentiment * 50);
                      return `${xPosition}% ${yPosition}%`;
                    }).join(' ')}
                    fill="none"
                    stroke="url(#line-gradient)"
                    strokeWidth="1.5"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Most common positive/negative words */}
          {showMoreInfo && (
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Positive Words
                </h4>
                <div className="space-y-1">
                  {data.positiveWords.length > 0 ? (
                    data.positiveWords.slice(0, 5).map(({ word, count }) => (
                      <div key={word} className="flex justify-between items-center text-xs">
                        <span>{word}</span>
                        <span className="text-muted-foreground">{count}×</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">No positive words detected</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-rose-600 dark:text-rose-400">
                  Negative Words
                </h4>
                <div className="space-y-1">
                  {data.negativeWords.length > 0 ? (
                    data.negativeWords.slice(0, 5).map(({ word, count }) => (
                      <div key={word} className="flex justify-between items-center text-xs">
                        <span>{word}</span>
                        <span className="text-muted-foreground">{count}×</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">No negative words detected</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Best/worst days callout */}
          {showMoreInfo && data.mostPositiveDay && data.mostNegativeDay && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-md">
                <h4 className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">
                  Most Positive Day
                </h4>
                <p className="text-xs text-muted-foreground mb-1">
                  {format(new Date(data.mostPositiveDay.date), 'MMMM d, yyyy')}
                </p>
                <p className="text-xs">"{data.mostPositiveDay.excerpt}"</p>
              </div>
              <div className="bg-rose-50 dark:bg-rose-950/30 p-3 rounded-md">
                <h4 className="text-sm font-medium text-rose-600 dark:text-rose-400 mb-1">
                  Most Negative Day
                </h4>
                <p className="text-xs text-muted-foreground mb-1">
                  {format(new Date(data.mostNegativeDay.date), 'MMMM d, yyyy')}
                </p>
                <p className="text-xs">"{data.mostNegativeDay.excerpt}"</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {showMoreInfo ? (
          <Button variant="ghost" size="sm" className="w-full" onClick={() => setShowMoreInfo(false)}>
            Show Less
          </Button>
        ) : (
          <Button variant="ghost" size="sm" className="w-full" onClick={() => setShowMoreInfo(true)}>
            Show More Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
