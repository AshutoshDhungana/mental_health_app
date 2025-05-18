import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Tag color palette with light mode and dark mode variants
const TAG_COLORS = [
  "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/30",
  "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/30",
  "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800/30",
  "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/30",
  "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/30",
  "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/30",
  "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800/30",
  "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800/30",
  "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800/30",
  "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800/30",
  "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800/30"
];

// Common mental health related tags with predefined colors for consistency
const COMMON_TAGS: Record<string, number> = {
  "mindfulness": 0, // blue
  "self-care": 1, // green
  "meditation": 2, // purple
  "gratitude": 3, // amber
  "exercise": 4, // emerald
  "sleep": 5, // indigo
  "therapy": 6, // pink
  "anxiety": 7, // rose
  "stress": 8, // orange
  "progress": 9, // cyan
  "goals": 10, // teal
  "work-life-balance": 1, // green
  "relationships": 6, // pink
  "challenges": 8, // orange
  "achievements": 3, // amber
};

/**
 * Returns consistent Tailwind CSS classes for a given tag
 * @param tag The tag name
 * @returns Tailwind CSS classes for the tag
 */
export function getTagColorClassName(tag: string): string {
  // If it's a common tag, use its predefined color
  if (tag.toLowerCase() in COMMON_TAGS) {
    return TAG_COLORS[COMMON_TAGS[tag.toLowerCase()]];
  }
  
  // Otherwise, generate a consistent color based on the tag name
  const hashValue = tag.toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = Math.abs(hashValue) % TAG_COLORS.length;
  
  return TAG_COLORS[colorIndex];
}
