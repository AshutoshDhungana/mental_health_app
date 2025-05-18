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
  Activity,
  Clock,
  Settings,
  Key,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || user.email?.split("@")[0] || "User");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleSaveChanges = async () => {
    if (updateUser) {
      try {
        await updateUser({ ...user, displayName });
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    }
  };

  const userInitial = displayName.charAt(0).toUpperCase();
  const joinDate = new Date(
    user.metadata?.creationTime || Date.now()
  ).toLocaleDateString();
  const totalEntries = 7; // Placeholder

  return (
    <AuthenticatedLayout>
      <div className="container px-4 py-6 md:py-8 max-w-6xl mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Page header with improved visual hierarchy */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                <User className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  My Profile
                </span>
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your account information and preferences
              </p>
            </div>
          </div>

          {/* Main profile content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile card */}
            <div className="md:col-span-1">
              <Card className="border-none shadow-lg bg-card/90 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg"></div>
                <CardHeader className="relative z-10 flex flex-col items-center text-center pb-2">
                  <div className="relative mb-2">
                    <Avatar className="h-24 w-24 ring-4 ring-primary/20 ring-offset-2 ring-offset-background">
                      <AvatarImage
                        src={user.photoURL || undefined}
                        alt={displayName}
                      />
                      <AvatarFallback className="text-3xl bg-gradient-to-br from-primary/20 to-accent/20">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background border-primary/20 hover:bg-primary/10"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit3 className="h-4 w-4 text-primary" />
                    </Button>
                  </div>

                  {isEditing ? (
                    <div className="w-full space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="text-center"
                      />
                      <Button
                        onClick={handleSaveChanges}
                        className="mt-2 w-full"
                      >
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </Button>
                    </div>
                  ) : (
                    <>
                      <CardTitle className="text-2xl mt-2">
                        {displayName}
                      </CardTitle>
                      <CardDescription className="flex items-center justify-center gap-1 mt-1">
                        <Mail className="h-3 w-3" /> {user.email}
                      </CardDescription>
                      <div className="mt-3">
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          Active Member
                        </Badge>
                      </div>
                    </>
                  )}
                </CardHeader>
                <CardContent className="relative z-10 pt-2 pb-4">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-md bg-muted/30">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Joined</span>
                      </div>
                      <span className="text-sm">{joinDate}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-md bg-muted/30">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">
                          Journal Entries
                        </span>
                      </div>
                      <span className="text-sm">{totalEntries}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-md bg-muted/30">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Status</span>
                      </div>
                      <span className="text-sm">Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Account settings tabs */}
            <div className="md:col-span-2">
              <Card className="border-none shadow-lg bg-card/90 backdrop-blur-sm h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Account Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account preferences and settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="general" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="general">General</TabsTrigger>
                      <TabsTrigger value="security">Security</TabsTrigger>
                      <TabsTrigger value="notifications">
                        Notifications
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={user.email}
                            readOnly
                            className="bg-muted/50"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Your email address is used for account notifications
                            and recovery
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="timezone">Time Zone</Label>
                          <Input
                            id="timezone"
                            value="(UTC-05:00) Eastern Time (US & Canada)"
                            readOnly
                            className="bg-muted/50"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Time zone is detected automatically from your
                            browser
                          </p>
                        </div>

                        <div className="pt-4 border-t">
                          <Button className="w-full sm:w-auto">
                            <Save className="mr-2 h-4 w-4" /> Save Changes
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="security" className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-base font-medium">
                            Password
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="password"
                              value="••••••••••••"
                              readOnly
                              className="bg-muted/50 flex-1"
                            />
                            <Button
                              variant="outline"
                              className="whitespace-nowrap"
                            >
                              <Key className="h-4 w-4 mr-2" /> Change Password
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Last changed: 3 months ago
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-base font-medium">
                            Login Sessions
                          </Label>
                          <div className="p-4 rounded-md bg-muted/30">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-sm font-medium">
                                  Current Session
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                              >
                                Active Now
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Device:{" "}
                              {navigator.userAgent.includes("Windows")
                                ? "Windows"
                                : navigator.userAgent.includes("Mac")
                                ? "Mac"
                                : "Unknown"}{" "}
                              • Browser:{" "}
                              {navigator.userAgent.includes("Chrome")
                                ? "Chrome"
                                : navigator.userAgent.includes("Firefox")
                                ? "Firefox"
                                : navigator.userAgent.includes("Safari")
                                ? "Safari"
                                : "Unknown"}{" "}
                              • IP: 192.168.1.xxx
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <Button variant="destructive">
                            Sign Out of All Devices
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="notifications" className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/20">
                          <div>
                            <Label
                              htmlFor="email-notifications"
                              className="font-medium"
                            >
                              Email Notifications
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Receive important updates via email
                            </p>
                          </div>
                          <div className="flex items-center h-5">
                            <input
                              id="email-notifications"
                              type="checkbox"
                              defaultChecked={true}
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/20">
                          <div>
                            <Label
                              htmlFor="reminder-notifications"
                              className="font-medium"
                            >
                              Journal Reminders
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Receive reminders to write in your journal
                            </p>
                          </div>
                          <div className="flex items-center h-5">
                            <input
                              id="reminder-notifications"
                              type="checkbox"
                              defaultChecked={false}
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/20">
                          <div>
                            <Label
                              htmlFor="insight-notifications"
                              className="font-medium"
                            >
                              Weekly Insights
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Receive weekly summaries of your mood and journal
                              patterns
                            </p>
                          </div>
                          <div className="flex items-center h-5">
                            <input
                              id="insight-notifications"
                              type="checkbox"
                              defaultChecked={true}
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <Button className="w-full sm:w-auto">
                            <Save className="mr-2 h-4 w-4" /> Save Notification
                            Preferences
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
