import { Reflection } from './api';

// Sentiment weights for common mental health-related words
const SENTIMENT_WEIGHTS: Record<string, number> = {
  // Negative sentiment words
  'anxiety': -0.8,
  'anxious': -0.8,
  'stress': -0.7,
  'stressed': -0.7,
  'worry': -0.6,
  'worried': -0.6, 
  'depression': -0.9,
  'depressed': -0.9,
  'sad': -0.6,
  'unhappy': -0.7,
  'tired': -0.5,
  'exhausted': -0.8,
  'struggle': -0.7,
  'struggling': -0.7,
  'difficult': -0.6,
  'difficulty': -0.6,
  'problem': -0.5,
  'problems': -0.5,
  'negative': -0.6,
  'overwhelmed': -0.8,
  'pain': -0.7,
  'alone': -0.7,
  'lonely': -0.8,
  'fear': -0.7,
  'afraid': -0.7,
  'angry': -0.7,
  'upset': -0.6,
  'terrible': -0.8,
  'hopeless': -0.9,
  'worthless': -0.9,
  'failure': -0.8,

  // Positive sentiment words
  'happy': 0.8,
  'joy': 0.9,
  'joyful': 0.9,
  'peaceful': 0.8,
  'calm': 0.7,
  'relaxed': 0.7,
  'grateful': 0.8,
  'thankful': 0.8,
  'appreciate': 0.7,
  'appreciated': 0.7,
  'love': 0.9,
  'loved': 0.9,
  'excited': 0.8,
  'proud': 0.8,
  'accomplished': 0.8,
  'achievement': 0.8,
  'success': 0.8,
  'successful': 0.8,
  'hope': 0.7,
  'hopeful': 0.7,
  'optimistic': 0.8,
  'positive': 0.7,
  'confidence': 0.8,
  'confident': 0.8,
  'motivated': 0.8,
  'energetic': 0.7,
  'refreshed': 0.7,
  'satisfied': 0.7,
  'content': 0.6,
  'well': 0.6,
  'better': 0.5,
  'good': 0.6,
  'great': 0.8,
  'wonderful': 0.9,
  'amazing': 0.9,
  'fantastic': 0.9,
  'awesome': 0.9,
  'excellent': 0.9
};

// Mental health related themes that can be identified in journal entries
export const MENTAL_HEALTH_THEMES = {
  ANXIETY: {
    name: 'Anxiety',
    keywords: ['anxiety', 'anxious', 'worry', 'worried', 'nervous', 'panic', 'stress', 'stressed', 'tense', 'fear', 'afraid'],
    description: 'Feelings of worry, nervousness, or unease about something with an uncertain outcome'
  },
  DEPRESSION: {
    name: 'Depression',
    keywords: ['depression', 'depressed', 'sad', 'unhappy', 'hopeless', 'meaningless', 'worthless', 'empty', 'numb'],
    description: 'Feelings of severe despondency and dejection'
  },
  STRESS: {
    name: 'Stress',
    keywords: ['stress', 'stressed', 'pressure', 'overwhelmed', 'burnout', 'overworked', 'exhausted', 'drained'],
    description: 'A state of mental or emotional strain resulting from demanding circumstances'
  },
  SLEEP: {
    name: 'Sleep Issues',
    keywords: ['sleep', 'insomnia', 'tired', 'fatigue', 'exhausted', 'rest', 'rested', 'sleepy', 'drowsy'],
    description: 'Problems related to sleep quality, duration, or patterns'
  },
  RELATIONSHIPS: {
    name: 'Relationships',
    keywords: ['relationship', 'friend', 'partner', 'family', 'colleague', 'social', 'connection', 'lonely', 'alone', 'isolated'],
    description: 'Interactions and connections with other people'
  },
  SELF_CARE: {
    name: 'Self-Care',
    keywords: ['self-care', 'meditation', 'exercise', 'workout', 'relax', 'relaxation', 'mindfulness', 'self-compassion'],
    description: 'Activities to take care of mental, emotional, and physical health'
  },
  GRATITUDE: {
    name: 'Gratitude',
    keywords: ['grateful', 'thankful', 'appreciate', 'appreciation', 'gratitude', 'blessing', 'blessed'],
    description: 'Feeling of appreciation or thanks'
  },
  ACHIEVEMENT: {
    name: 'Achievement',
    keywords: ['achieve', 'achievement', 'accomplish', 'accomplished', 'success', 'successful', 'proud', 'progress', 'goal'],
    description: 'Completing goals or making progress'
  }
};

export type ThemeAnalysisResult = {
  themeName: string;
  count: number;
  percentage: number;
  description: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  entries: {
    id: string;
    date: string;
    excerpt: string;
  }[];
};

export type SentimentAnalysisResult = {
  overallSentiment: number; // -1 to 1 scale
  sentimentByDay: {
    date: string;
    sentiment: number;
  }[];
  mostPositiveDay?: {
    date: string;
    sentiment: number;
    excerpt: string;
  };
  mostNegativeDay?: {
    date: string;
    sentiment: number;
    excerpt: string;
  };
  positiveWords: {
    word: string;
    count: number;
  }[];
  negativeWords: {
    word: string;
    count: number;
  }[];
  sentimentTrend: 'improving' | 'declining' | 'stable';
};

export type MoodCorrelation = {
  tag: string;
  positiveCorrelation: number; // 0 to 1 scale
  negativeCorrelation: number; // 0 to 1 scale
  affectsPositively: boolean;
  affectsNegatively: boolean;
};

export type MentalHealthInsight = {
  type: 'tip' | 'observation' | 'question';
  content: string;
  relatedTheme?: string;
};

// Analyze themes in journal entries
export function analyzeThemes(reflections: Reflection[]): ThemeAnalysisResult[] {
  if (!reflections || reflections.length === 0) {
    return [];
  }

  const results: ThemeAnalysisResult[] = [];
  const totalEntries = reflections.length;
  
  // Sort reflections by date (newest first for trending analysis)
  const sortedReflections = [...reflections].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Analyze each theme
  Object.values(MENTAL_HEALTH_THEMES).forEach(theme => {
    const entries: { id: string; date: string; excerpt: string }[] = [];
    let count = 0;
    
    sortedReflections.forEach(reflection => {
      let mentioned = false;
      
      // Check if any keywords from the theme are present in the reflection content
      theme.keywords.forEach(keyword => {
        if (reflection.content.toLowerCase().includes(keyword.toLowerCase())) {
          mentioned = true;
        }
      });
      
      if (mentioned) {
        count++;
        
        // Find the best excerpt that contains a keyword
        let bestExcerpt = '';
        const content = reflection.content.toLowerCase();
        
        for (const keyword of theme.keywords) {
          const index = content.indexOf(keyword.toLowerCase());
          if (index >= 0) {
            // Extract surrounding context (50 chars before and after)
            const start = Math.max(0, index - 50);
            const end = Math.min(content.length, index + keyword.length + 50);
            const excerpt = reflection.content.substring(start, end);
            bestExcerpt = excerpt + (end < content.length ? '...' : '');
            break;
          }
        }
        
        entries.push({
          id: reflection.id,
          date: reflection.date,
          excerpt: bestExcerpt || reflection.content.substring(0, 100)
        });
      }
    });
    
    // Calculate trend (compare first half vs second half of time period)
    const halfIndex = Math.floor(sortedReflections.length / 2);
    const recentEntries = sortedReflections.slice(0, halfIndex);
    const olderEntries = sortedReflections.slice(halfIndex);
    
    let recentMentions = 0;
    let olderMentions = 0;
    
    recentEntries.forEach(reflection => {
      theme.keywords.forEach(keyword => {
        if (reflection.content.toLowerCase().includes(keyword.toLowerCase())) {
          recentMentions++;
        }
      });
    });
    
    olderEntries.forEach(reflection => {
      theme.keywords.forEach(keyword => {
        if (reflection.content.toLowerCase().includes(keyword.toLowerCase())) {
          olderMentions++;
        }
      });
    });
    
    // Normalize by number of entries in each period
    const recentRate = recentEntries.length > 0 ? recentMentions / recentEntries.length : 0;
    const olderRate = olderEntries.length > 0 ? olderMentions / olderEntries.length : 0;
    
    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (recentRate > olderRate * 1.2) {
      trend = 'increasing';
    } else if (olderRate > recentRate * 1.2) {
      trend = 'decreasing';
    }
    
    // Only include themes that were mentioned at least once
    if (count > 0) {
      results.push({
        themeName: theme.name,
        count,
        percentage: Math.round((count / totalEntries) * 100),
        description: theme.description,
        trend,
        entries: entries.slice(0, 3) // Limit to 3 examples
      });
    }
  });
  
  // Sort by count (most mentioned first)
  return results.sort((a, b) => b.count - a.count);
}

// Analyze sentiment in journal entries
export function analyzeSentiment(reflections: Reflection[]): SentimentAnalysisResult {
  if (!reflections || reflections.length === 0) {
    return {
      overallSentiment: 0,
      sentimentByDay: [],
      positiveWords: [],
      negativeWords: [],
      sentimentTrend: 'stable'
    };
  }
  
  // Sort reflections by date (oldest to newest for trend analysis)
  const sortedReflections = [...reflections].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  let totalSentiment = 0;
  const sentimentByDay: { date: string; sentiment: number }[] = [];
  const wordCounts: Record<string, number> = {};
  
  let mostPositiveDay: { date: string; sentiment: number; excerpt: string } | undefined;
  let mostNegativeDay: { date: string; sentiment: number; excerpt: string } | undefined;
  
  sortedReflections.forEach(reflection => {
    const content = reflection.content.toLowerCase();
    const words = content.split(/\W+/).filter(word => word.length > 0);
    
    let entrySentiment = 0;
    let matchedWords = 0;
    
    words.forEach(word => {
      if (SENTIMENT_WEIGHTS[word]) {
        entrySentiment += SENTIMENT_WEIGHTS[word];
        matchedWords++;
        
        // Track word frequency
        if (!wordCounts[word]) {
          wordCounts[word] = 0;
        }
        wordCounts[word]++;
      }
    });
    
    // Normalize sentiment score for the entry (-1 to 1 scale)
    const normalizedSentiment = matchedWords > 0 ? entrySentiment / matchedWords : 0;
    
    // Update most positive/negative days
    if (!mostPositiveDay || normalizedSentiment > mostPositiveDay.sentiment) {
      mostPositiveDay = {
        date: reflection.date,
        sentiment: normalizedSentiment,
        excerpt: reflection.content.substring(0, 100) + (reflection.content.length > 100 ? '...' : '')
      };
    }
    
    if (!mostNegativeDay || normalizedSentiment < mostNegativeDay.sentiment) {
      mostNegativeDay = {
        date: reflection.date,
        sentiment: normalizedSentiment,
        excerpt: reflection.content.substring(0, 100) + (reflection.content.length > 100 ? '...' : '')
      };
    }
    
    totalSentiment += normalizedSentiment;
    sentimentByDay.push({
      date: reflection.date,
      sentiment: normalizedSentiment
    });
  });
  
  // Calculate overall sentiment
  const overallSentiment = sortedReflections.length > 0 ? totalSentiment / sortedReflections.length : 0;
  
  // Extract positive and negative words
  const positiveWords = Object.entries(wordCounts)
    .filter(([word, _]) => SENTIMENT_WEIGHTS[word] > 0)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  const negativeWords = Object.entries(wordCounts)
    .filter(([word, _]) => SENTIMENT_WEIGHTS[word] < 0)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // Calculate sentiment trend
  let sentimentTrend: 'improving' | 'declining' | 'stable' = 'stable';
  
  if (sentimentByDay.length >= 3) {
    // Compare first third vs last third
    const third = Math.floor(sentimentByDay.length / 3);
    const firstThird = sentimentByDay.slice(0, third);
    const lastThird = sentimentByDay.slice(-third);
    
    const firstAvg = firstThird.reduce((sum, day) => sum + day.sentiment, 0) / firstThird.length;
    const lastAvg = lastThird.reduce((sum, day) => sum + day.sentiment, 0) / lastThird.length;
    
    if (lastAvg > firstAvg + 0.1) {
      sentimentTrend = 'improving';
    } else if (firstAvg > lastAvg + 0.1) {
      sentimentTrend = 'declining';
    }
  }
  
  return {
    overallSentiment,
    sentimentByDay,
    mostPositiveDay,
    mostNegativeDay,
    positiveWords,
    negativeWords,
    sentimentTrend
  };
}

// Analyze correlations between tags/activities and mood
export function analyzeMoodCorrelations(reflections: Reflection[]): MoodCorrelation[] {
  if (!reflections || reflections.length === 0) {
    return [];
  }
  
  const allTags = new Set<string>();
  reflections.forEach(reflection => {
    (reflection.tags || []).forEach(tag => allTags.add(tag));
  });
  
  const results: MoodCorrelation[] = [];
  
  // For each tag, analyze its correlation with mood
  allTags.forEach(tag => {
    // Get entries with this tag
    const entriesWithTag = reflections.filter(r => (r.tags || []).includes(tag));
    if (entriesWithTag.length < 2) return; // Need at least 2 entries for correlation
    
    // Get entries without this tag
    const entriesWithoutTag = reflections.filter(r => !(r.tags || []).includes(tag));
    
    // Define emoji to mood score mapping
    const moodScores: Record<string, number> = {
      '😔': 1, // sad
      '😕': 2, // slightly sad
      '😐': 3, // neutral
      '🙂': 4, // slightly happy
      '😊': 5, // happy
      '😄': 5  // alternate happy
    };
    
    // Calculate average mood score for entries with and without the tag
    const avgWithTag = entriesWithTag.reduce((sum, r) => sum + (moodScores[r.mood] || 3), 0) / entriesWithTag.length;
    const avgWithoutTag = entriesWithoutTag.length > 0 ? 
      entriesWithoutTag.reduce((sum, r) => sum + (moodScores[r.mood] || 3), 0) / entriesWithoutTag.length : 3;
    
    // Calculate positive and negative correlation
    // Positive correlation: entries with this tag have higher mood than average
    // Negative correlation: entries with this tag have lower mood than average
    const positiveCorrelation = Math.max(0, (avgWithTag - avgWithoutTag) / 4); // Normalize to 0-1 scale
    const negativeCorrelation = Math.max(0, (avgWithoutTag - avgWithTag) / 4); // Normalize to 0-1 scale
    
    results.push({
      tag,
      positiveCorrelation: Number(positiveCorrelation.toFixed(2)),
      negativeCorrelation: Number(negativeCorrelation.toFixed(2)),
      affectsPositively: positiveCorrelation > 0.1,
      affectsNegatively: negativeCorrelation > 0.1
    });
  });
  
  // Sort by strongest correlation (either positive or negative)
  return results
    .sort((a, b) => Math.max(b.positiveCorrelation, b.negativeCorrelation) - 
                     Math.max(a.positiveCorrelation, a.negativeCorrelation));
}

// Generate personalized mental health insights based on journal entries
export function generateInsights(reflections: Reflection[]): MentalHealthInsight[] {
  if (!reflections || reflections.length === 0) {
    return [];
  }
  
  const insights: MentalHealthInsight[] = [];
  const themes = analyzeThemes(reflections);
  const sentiment = analyzeSentiment(reflections);
  const correlations = analyzeMoodCorrelations(reflections);
  
  // Add insights based on themes
  themes.forEach(theme => {
    if (theme.trend === 'increasing' && theme.themeName === 'Anxiety') {
      insights.push({
        type: 'observation',
        content: `Your mentions of anxiety have been increasing. Consider practicing mindfulness or deep breathing exercises when feeling anxious.`,
        relatedTheme: 'Anxiety'
      });
    }
    
    if (theme.trend === 'increasing' && theme.themeName === 'Stress') {
      insights.push({
        type: 'tip',
        content: `Your stress levels appear to be rising. Try to identify specific stressors and consider ways to address them or build in more relaxation time.`,
        relatedTheme: 'Stress'
      });
    }
    
    if (theme.percentage > 30 && theme.themeName === 'Sleep Issues') {
      insights.push({
        type: 'tip',
        content: `Sleep issues appear in ${theme.percentage}% of your entries. Consider establishing a regular sleep schedule and avoiding screens before bedtime.`,
        relatedTheme: 'Sleep'
      });
    }
    
    if (theme.trend === 'decreasing' && theme.themeName === 'Gratitude') {
      insights.push({
        type: 'tip',
        content: `Your expressions of gratitude have decreased recently. Try ending each day by noting three things you're grateful for.`,
        relatedTheme: 'Gratitude'
      });
    }
  });
  
  // Add insights based on sentiment analysis
  if (sentiment.sentimentTrend === 'declining') {
    insights.push({
      type: 'observation',
      content: `Your overall mood seems to be trending downward. Is there anything specific that might be contributing to this change?`,
    });
  } else if (sentiment.sentimentTrend === 'improving') {
    insights.push({
      type: 'observation',
      content: `Your overall mood has been improving! Take note of the positive changes you've made recently.`,
    });
  }
  
  // Add insights based on most positive/negative days
  if (sentiment.mostPositiveDay) {
    insights.push({
      type: 'question',
      content: `You felt especially positive on ${new Date(sentiment.mostPositiveDay.date).toLocaleDateString()}. What happened that day that contributed to your good mood?`,
    });
  }
  
  // Add insights based on mood correlations
  correlations.forEach(correlation => {
    if (correlation.affectsPositively && correlation.positiveCorrelation > 0.3) {
      insights.push({
        type: 'observation',
        content: `When you mention "${correlation.tag}" in your journal, your mood tends to be more positive. This activity seems to have a beneficial effect on your wellbeing.`,
      });
    }
    
    if (correlation.affectsNegatively && correlation.negativeCorrelation > 0.3) {
      insights.push({
        type: 'question',
        content: `Your entries that mention "${correlation.tag}" often coincide with lower moods. Is this something that's causing you stress?`,
      });
    }
  });
  
  // Add general mental health tips if we don't have many specific insights
  if (insights.length < 3) {
    insights.push({
      type: 'tip',
      content: `Regular physical activity can help reduce symptoms of depression and anxiety and improve your mood.`,
    });
    
    insights.push({
      type: 'tip',
      content: `Practicing mindfulness for even just a few minutes each day can help reduce stress and improve mental clarity.`,
    });
    
    insights.push({
      type: 'tip',
      content: `Social connections are important for mental health. Consider reaching out to friends or family members regularly.`,
    });
  }
  
  // Only return a reasonable number of insights
  return insights.slice(0, 5);
}
