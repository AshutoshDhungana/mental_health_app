"use client";

import React from "react";
import AuthenticatedLayout from "@/app/layouts/AuthenticatedLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  BookText,
  ExternalLink,
  Heart,
  Brain,
  Lightbulb,
  Users,
  Phone,
  BookOpen,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ResourcesPage() {
  const resources = [
    {
      category: "articles",
      items: [
        {
          title: "Understanding Anxiety",
          description:
            "Learn about the causes, symptoms, and management techniques for anxiety.",
          icon: <Brain className="h-10 w-10 text-blue-500" />,
          tags: ["Anxiety", "Mental Health"],
          link: "#",
          isNew: true,
        },
        {
          title: "The Power of Daily Journaling",
          description:
            "Discover how consistent journaling can improve your mental clarity and emotional well-being.",
          icon: <BookOpen className="h-10 w-10 text-emerald-500" />,
          tags: ["Journaling", "Wellness"],
          link: "#",
        },
        {
          title: "Mindfulness Meditation Guide",
          description:
            "A step-by-step guide to practicing mindfulness meditation for stress reduction.",
          icon: <Lightbulb className="h-10 w-10 text-amber-500" />,
          tags: ["Meditation", "Mindfulness"],
          link: "#",
        },
      ],
    },
    {
      category: "support",
      items: [
        {
          title: "National Mental Health Hotline",
          description:
            "24/7 support line for anyone experiencing mental health difficulties.",
          icon: <Phone className="h-10 w-10 text-red-500" />,
          tags: ["Crisis", "Support"],
          link: "#",
          isEmergency: true,
        },
        {
          title: "Online Support Communities",
          description:
            "Join moderated communities where you can share experiences and find support.",
          icon: <Users className="h-10 w-10 text-purple-500" />,
          tags: ["Community", "Support"],
          link: "#",
        },
        {
          title: "Find a Therapist Directory",
          description:
            "Search tool to find mental health professionals in your area.",
          icon: <Heart className="h-10 w-10 text-pink-500" />,
          tags: ["Therapy", "Professional Help"],
          link: "#",
        },
      ],
    },
    {
      category: "tools",
      items: [
        {
          title: "Mood Tracking Templates",
          description:
            "Downloadable templates to track your mood patterns over time.",
          icon: <Calendar className="h-10 w-10 text-indigo-500" />,
          tags: ["Templates", "Tracking"],
          link: "#",
          isPopular: true,
        },
        {
          title: "Guided Meditation Audio",
          description:
            "Collection of guided meditation recordings for different purposes.",
          icon: <Lightbulb className="h-10 w-10 text-teal-500" />,
          tags: ["Audio", "Meditation"],
          link: "#",
        },
      ],
    },
  ];

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary/10 p-2.5 rounded-full">
              <BookText className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Resources</h1>
          </div>
          <p className="text-base text-muted-foreground ml-12">
            Find helpful articles, tools, and links to support your mental
            well-being and journaling practice.
          </p>
        </motion.header>

        <Tabs defaultValue="articles" className="mb-8">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          {resources.map((category) => (
            <TabsContent
              key={category.category}
              value={category.category}
              className="mt-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((resource, index) => (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow border-none bg-card/80 backdrop-blur-lg overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/80 to-primary/20"></div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="p-2 bg-card rounded-lg shadow-sm">
                            {resource.icon}
                          </div>
                          <div className="flex gap-1.5">
                            {resource.isNew && (
                              <Badge className="bg-blue-500">New</Badge>
                            )}
                            {resource.isEmergency && (
                              <Badge className="bg-red-500">Emergency</Badge>
                            )}
                            {resource.isPopular && (
                              <Badge className="bg-amber-500">Popular</Badge>
                            )}
                          </div>
                        </div>
                        <CardTitle className="text-xl mt-3">
                          {resource.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {resource.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-wrap gap-1.5">
                          {resource.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-secondary/20"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button
                          variant="outline"
                          className="w-full group"
                          asChild
                        >
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit Resource
                            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/10 text-center"
        >
          <h2 className="text-xl font-semibold mb-2">
            Can't find what you need?
          </h2>
          <p className="text-muted-foreground mb-4">
            We're constantly adding new resources. If you have suggestions or
            specific needs, let us know.
          </p>
          <Button>Request a Resource</Button>
        </motion.div>
      </div>
    </AuthenticatedLayout>
  );
}
