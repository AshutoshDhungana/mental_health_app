"use client";

import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/app/layouts/AuthenticatedLayout";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  CalendarDays,
  BookOpen,
  Edit3,
  Save,
  ShieldAlert,
  Camera,
  Award,
  Heart,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || user.email?.split("@")[0] || "User");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleSaveChanges = async () => {
    console.log("Saving profile changes:", { displayName });
    if (updateUser) {
      try {
        await updateUser({ ...user, displayName });
        alert("Profile updated successfully! (Mock)");
      } catch (error) {
        console.error("Failed to update profile:", error);
        alert("Failed to update profile. (Mock)");
      }
    } else {
      alert("Profile update functionality not fully implemented. (Mock)");
    }
    setIsEditing(false);
  };

  const userInitial = displayName.charAt(0).toUpperCase();
  const joinDate = new Date(
    user.metadata?.creationTime || Date.now()
  ).toLocaleDateString();
  const totalEntries = 7; // Placeholder

  // Mock data for achievements and stats
  const achievements = [
    {
      title: "First Entry",
      description: "Created your first journal entry",
      date: "2023-06-15",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
    },
    {
      title: "Weekly Streak",
      description: "Journaled for 7 days in a row",
      date: "2023-07-02",
      icon: <Award className="h-5 w-5 text-amber-500" />,
    },
    {
      title: "Mood Tracker",
      description: "Tracked your mood for 30 days",
      date: "2023-08-10",
      icon: <Heart className="h-5 w-5 text-rose-500" />,
    },
  ];

  const stats = [
    {
      label: "Journal Entries",
      value: totalEntries,
      icon: <BookOpen className="h-5 w-5 text-primary/70" />,
    },
    {
      label: "Days Active",
      value: 12,
      icon: <Clock className="h-5 w-5 text-primary/70" />,
    },
    {
      label: "Joined Date",
      value: joinDate,
      icon: <CalendarDays className="h-5 w-5 text-primary/70" />,
    },
  ];

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto max-w-5xl p-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="shadow-xl border-none bg-card/80 backdrop-blur-lg overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-primary/30 to-primary/10 relative"></div>
              <div className="px-6 pb-6">
                <div className="-mt-16 mb-4 flex justify-center">
                  <div className="relative">
                    <Avatar className="h-24 w-24 ring-4 ring-background shadow-lg">
                      <AvatarImage
                        src={user.photoURL || undefined}
                        alt={displayName}
                      />
                      <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md"
                      title="Change profile picture"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  {isEditing ? (
                    <div className="flex items-center justify-center gap-2">
                      <Input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="text-lg font-bold max-w-[200px]"
                        aria-label="Display Name"
                      />
                      <Button
                        size="sm"
                        onClick={handleSaveChanges}
                        className="h-9"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <h2 className="text-2xl font-bold">{displayName}</h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsEditing(true)}
                        className="h-8 w-8"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" /> {user.email}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Quick Stats
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {stats.map((stat, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center p-2 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                      >
                        <div className="mb-1">{stat.icon}</div>
                        <div className="text-lg font-semibold">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Tabs Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-xl border-none bg-card/80 backdrop-blur-lg h-full">
              <CardHeader className="pb-2">
                <Tabs
                  defaultValue="overview"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                {activeTab === "overview" ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" /> About Me
                      </h3>
                      <Card className="bg-muted/30">
                        <CardContent className="p-4">
                          <p className="text-muted-foreground">
                            No bio information yet. Edit your profile to add a
                            personal bio.
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" /> Recent
                        Activity
                      </h3>
                      <Card className="bg-muted/30">
                        <CardContent className="p-4 space-y-4">
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                            <div className="bg-primary/10 p-1.5 rounded-full">
                              <BookOpen className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">
                                Added a new journal entry
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Yesterday at 3:45 PM
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                            <div className="bg-primary/10 p-1.5 rounded-full">
                              <Heart className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Tracked your mood</p>
                              <p className="text-xs text-muted-foreground">
                                3 days ago at 9:30 AM
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" /> Your
                      Achievements
                    </h3>
                    <div className="space-y-3">
                      {achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="p-2 bg-background rounded-full">
                            {achievement.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {achievement.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Earned on{" "}
                              {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
