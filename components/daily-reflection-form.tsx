'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Save, Loader2 } from 'lucide-react';
import { TagSelector } from '@/components/tag-selector';

type DailyReflectionFormProps = {
  selectedDate: Date;
  mood: string | null;
  content: string;
  tags: string[];
  onSave: (data: { content: string; tags: string[] }) => void;
  isLoading?: boolean;
};

export function DailyReflectionForm({ 
  selectedDate, 
  mood, 
  content: initialContent = '', 
  tags: initialTags = [],
  onSave,
  isLoading = false
}: DailyReflectionFormProps) {
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState(initialTags);

  // Update form when props change
  useEffect(() => {
    setContent(initialContent);
    setTags(initialTags);
  }, [initialContent, initialTags, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      content,
      tags
    });
  };

  return (
    <Card className="border shadow-md overflow-hidden">
      <CardHeader className="space-y-1 bg-gradient-to-r from-primary/5 to-background pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="h-5 w-5 text-primary mr-2" /> 
            Reflection for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </CardTitle>
          {mood && (
            <div className="text-2xl" title="Your mood for this day">
              {mood}
            </div>
          )}
        </div>
        <CardDescription>
          Write your thoughts and reflections about this day
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <Textarea
              placeholder="How did this day go? What did you learn? What are you grateful for?"
              className="min-h-[150px] resize-none border focus-visible:ring-primary"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <TagSelector 
              selectedTags={tags} 
              onChange={setTags} 
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">
            Clear
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading || !content.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Reflection
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
