"use client";

import React from 'react';
import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout'; // Adjust if your alias or path is different
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { BookText } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <AuthenticatedLayout>
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <header className="mb-6 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <BookText className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Resources</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">
            Find helpful articles, tools, and links to support your mental well-being and journaling practice.
          </p>
        </header>

        <Card className="shadow-lg border-none bg-card/80 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-xl">Mental Health Resources</CardTitle>
            <CardDescription>Explore these curated resources for support and information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-card-foreground">
              This page is under construction. We're gathering valuable resources for you!
            </p>
            <p className="text-muted-foreground">
              In the future, you'll find links to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4">
              <li>Articles on mindfulness and stress reduction</li>
              <li>Information on mental health conditions</li>
              <li>Links to support organizations</li>
              <li>Tools for self-assessment</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}