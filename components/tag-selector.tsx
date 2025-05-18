"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X, Tag as TagIcon } from "lucide-react"
import { getTagColorClassName } from "@/lib/utils"

type TagSelectorProps = {
  selectedTags: string[]
  onChange: (tags: string[]) => void
}

// Common mental health related tags
const suggestedTags = [
  "self-care",
  "mindfulness",
  "anxiety",
  "progress",
  "gratitude",
  "stress",
  "sleep",
  "exercise",
  "meditation",
  "therapy",
  "work-life-balance",
  "relationships",
  "goals",
  "challenges",
  "achievements",
]

export function TagSelector({ selectedTags, onChange }: TagSelectorProps) {
  const [newTag, setNewTag] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleAddTag = () => {
    if (newTag.trim() !== "" && !selectedTags.includes(newTag.trim())) {
      onChange([...selectedTags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(selectedTags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const filteredSuggestions = suggestedTags.filter(
    (tag) => !selectedTags.includes(tag) && tag.toLowerCase().includes(newTag.toLowerCase()),
  )

  return (
    <div className="space-y-3">
      <div className="mb-2 text-sm font-medium">Tags</div>
      <div className="flex flex-wrap gap-2 mb-3">
        {selectedTags.length > 0 ? (
          selectedTags.map((tag, index) => (
            <div
              key={index}
              className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${getTagColorClassName(tag)}`}
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 rounded-full p-0.5 hover:bg-opacity-80"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {tag}</span>
              </button>
            </div>
          ))
        ) : (
          <div className="text-sm text-muted-foreground italic flex items-center">
            <TagIcon className="h-3 w-3 mr-1 opacity-70" />
            No tags added yet
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Add a tag..."
            value={newTag}
            onChange={(e) => {
              setNewTag(e.target.value)
              setShowSuggestions(true)
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              // Delay hiding suggestions to allow for clicking
              setTimeout(() => setShowSuggestions(false), 200)
            }}
          />
          {showSuggestions && newTag.length > 0 && filteredSuggestions.length > 0 && (
            <div className="absolute z-[100] mt-1 w-full rounded-md border bg-background shadow-lg">
              <ul className="max-h-60 overflow-auto py-1 text-sm">
                {filteredSuggestions.map((suggestion, index) => {
                  const tagColorClass = getTagColorClassName(suggestion);
                  return (
                    <li
                      key={index}
                      className="cursor-pointer px-3 py-2 hover:bg-muted"
                      onClick={() => {
                        onChange([...selectedTags, suggestion])
                        setNewTag("")
                        setShowSuggestions(false)
                      }}
                    >
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 mr-1 text-xs ${tagColorClass}`}>
                        {suggestion}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <Button type="button" size="icon" onClick={handleAddTag}>
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add tag</span>
        </Button>
      </div>
    </div>
  )
}
