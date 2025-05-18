"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MentalHealthInsight } from '@/lib/mental-health-analysis';
import { Lightbulb, HelpCircle, Eye } from 'lucide-react';

type MentalHealthInsightsProps = {
  insights: MentalHealthInsight[];
  className?: string;
};

export function MentalHealthInsights({ insights, className = '' }: MentalHealthInsightsProps) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'tip':
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
      case 'question':
        return <HelpCircle className="h-5 w-5 text-blue-500" />;
      case 'observation':
        return <Eye className="h-5 w-5 text-violet-500" />;
      default:
        return <Lightbulb className="h-5 w-5 text-primary" />;
    }
  };

  const getInsightTypeLabel = (type: string) => {
    switch (type) {
      case 'tip':
        return 'Self-Care Tip';
      case 'question':
        return 'Reflection Question';
      case 'observation':
        return 'Observation';
      default:
        return 'Insight';
    }
  };

  const getInsightBgColor = (type: string) => {
    switch (type) {
      case 'tip':
        return 'bg-amber-50 dark:bg-amber-950/30';
      case 'question':
        return 'bg-blue-50 dark:bg-blue-950/30';
      case 'observation':
        return 'bg-violet-50 dark:bg-violet-950/30';
      default:
        return 'bg-primary-50 dark:bg-primary-950/30';
    }
  };

  const getInsightBorderColor = (type: string) => {
    switch (type) {
      case 'tip':
        return 'border-amber-200 dark:border-amber-800/50';
      case 'question':
        return 'border-blue-200 dark:border-blue-800/50';
      case 'observation':
        return 'border-violet-200 dark:border-violet-800/50';
      default:
        return 'border-primary-200 dark:border-primary-800/50';
    }
  };

  return (
    <Card className={`${className} border shadow-md overflow-hidden`}>
      <CardHeader className="pb-3 px-3 sm:px-6">
        <CardTitle className="text-base sm:text-lg flex items-center">
          Personalized Insights
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Tailored guidance based on your journal entries
        </CardDescription>
      </CardHeader>
      <CardContent>
        {insights.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground text-sm">
              Add more journal entries to receive personalized insights.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${getInsightBgColor(insight.type)} ${getInsightBorderColor(insight.type)}`}
              >
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">
                      {getInsightTypeLabel(insight.type)}
                      {insight.relatedTheme && (
                        <span className="text-xs font-normal text-muted-foreground ml-1">
                          Related to {insight.relatedTheme}
                        </span>
                      )}
                    </h4>
                    <p className="text-sm">
                      {insight.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
