"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from 'lucide-react';
import { MoodCorrelation } from '@/lib/mental-health-analysis';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type MoodCorrelationsChartProps = {
  data: MoodCorrelation[];
  className?: string;
  maxDisplayed?: number;
};

export function MoodCorrelationsChart({ 
  data, 
  className = '',
  maxDisplayed = 5
}: MoodCorrelationsChartProps) {
  
  // Format correlation percentage
  const formatCorrelation = (value: number) => {
    return `${Math.round(value * 100)}%`;
  };

  return (
    <Card className={`${className} border shadow-md overflow-hidden`}>
      <CardHeader className="pb-3 px-3 sm:px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg flex items-center">
            Mood Influencers
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Correlation info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  These are activities or topics that seem to affect your mood based on your journal entries.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-xs sm:text-sm">Activities that may influence your mood</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground text-sm">
              Not enough data to analyze mood correlations.
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Add more journal entries with consistent tags to discover patterns.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {data.slice(0, maxDisplayed).map((correlation) => (
              <div key={correlation.tag} className="space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">#{correlation.tag}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-emerald-600 dark:text-emerald-400">Positive effect</span>
                      <span className={correlation.affectsPositively ? "font-medium text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}>
                        {formatCorrelation(correlation.positiveCorrelation)}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{ width: formatCorrelation(correlation.positiveCorrelation) }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-xs pt-1">
                      <span className="text-rose-600 dark:text-rose-400">Negative effect</span>
                      <span className={correlation.affectsNegatively ? "font-medium text-rose-600 dark:text-rose-400" : "text-muted-foreground"}>
                        {formatCorrelation(correlation.negativeCorrelation)}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-rose-500 transition-all duration-500"
                        style={{ width: formatCorrelation(correlation.negativeCorrelation) }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Analysis summary */}
                <div className="text-xs text-muted-foreground pt-1">
                  {correlation.affectsPositively && correlation.positiveCorrelation > 0.2 ? (
                    <p>Entries mentioning "{correlation.tag}" tend to have a more positive mood.</p>
                  ) : correlation.affectsNegatively && correlation.negativeCorrelation > 0.2 ? (
                    <p>Entries mentioning "{correlation.tag}" tend to have a more negative mood.</p>
                  ) : (
                    <p>This topic has minimal effect on your mood.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
