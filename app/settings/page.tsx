"use client";

import React, { useState } from "react";
import AuthenticatedLayout from "@/app/layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  UserCircle,
  Bell,
  Palette,
  ShieldCheck,
  LogOut,
  Moon,
  Sun,
  Monitor,
  Check,
  Smartphone,
  KeyRound,
  Mail,
  AlertTriangle,
  Save,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function SettingsPage() {
  const { user } = useAuth();

  // Example state for theme - in a real app, this would connect to your theme context/provider
  const [currentTheme, setCurrentTheme] = useState("system");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("appearance");

  // Placeholder function for saving settings
  const handleSaveChanges = (section: string) => {
    console.log(`Saving ${section} settings...`);
    // Here you would typically call an API or update context/localStorage
    alert(`${section} settings saved (mock)!`);
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: <Sun className="h-4 w-4 mr-2" /> },
    { value: "dark", label: "Dark", icon: <Moon className="h-4 w-4 mr-2" /> },
    {
      value: "system",
      label: "System",
      icon: <Monitor className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <AuthenticatedLayout>
      <TooltipProvider>
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Settings className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Settings
              </h1>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground ml-12">
              Manage your account, appearance, and notification preferences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Settings Navigation Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="md:col-span-1"
            >
              <Card className="shadow-lg border-none bg-card/80 backdrop-blur-lg sticky top-20">
                <CardContent className="p-2">
                  <div className="w-full">
                    <div className="flex flex-col h-auto bg-transparent space-y-1">
                      <button
                        onClick={() => setActiveTab("appearance")}
                        className={`flex w-full justify-start gap-3 p-3 text-sm items-center rounded-md ${
                          activeTab === "appearance"
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <Palette className="h-5 w-5" /> Appearance
                      </button>
                      <button
                        onClick={() => setActiveTab("account")}
                        className={`flex w-full justify-start gap-3 p-3 text-sm items-center rounded-md ${
                          activeTab === "account"
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <UserCircle className="h-5 w-5" /> Account
                      </button>
                      <button
                        onClick={() => setActiveTab("notifications")}
                        className={`flex w-full justify-start gap-3 p-3 text-sm items-center rounded-md ${
                          activeTab === "notifications"
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <Bell className="h-5 w-5" /> Notifications
                      </button>
                      <button
                        onClick={() => setActiveTab("security")}
                        className={`flex w-full justify-start gap-3 p-3 text-sm items-center rounded-md ${
                          activeTab === "security"
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <ShieldCheck className="h-5 w-5" /> Security
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Settings Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="md:col-span-3"
            >
              <Card className="shadow-lg border-none bg-card/80 backdrop-blur-lg">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsContent value="appearance" className="m-0">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Palette className="h-6 w-6 text-primary" />
                        <div>
                          <CardTitle className="text-xl">Appearance</CardTitle>
                          <CardDescription>
                            Customize the look and feel of the application.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label
                          htmlFor="theme-select"
                          className="text-base font-medium block mb-3"
                        >
                          Theme
                        </Label>
                        <div className="grid grid-cols-3 gap-3">
                          {themeOptions.map((option) => (
                            <div
                              key={option.value}
                              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                currentTheme === option.value
                                  ? "border-primary bg-primary/5"
                                  : "border-muted hover:border-primary/30 hover:bg-muted/30"
                              }`}
                              onClick={() => setCurrentTheme(option.value)}
                            >
                              <div
                                className={`p-3 rounded-full mb-2 ${
                                  currentTheme === option.value
                                    ? "bg-primary/20"
                                    : "bg-muted"
                                }`}
                              >
                                {option.icon}
                              </div>
                              <span className="text-sm font-medium">
                                {option.label}
                              </span>
                              {currentTheme === option.value && (
                                <Badge
                                  variant="secondary"
                                  className="mt-2 bg-primary/10 text-primary"
                                >
                                  <Check className="h-3 w-3 mr-1" /> Active
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                          Select your preferred theme. 'System' will match your
                          device settings.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-end">
                      <Button onClick={() => handleSaveChanges("Appearance")}>
                        <Save className="h-4 w-4 mr-2" /> Save Appearance
                      </Button>
                    </CardFooter>
                  </TabsContent>

                  <TabsContent value="account" className="m-0">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <UserCircle className="h-6 w-6 text-primary" />
                        <div>
                          <CardTitle className="text-xl">Account</CardTitle>
                          <CardDescription>
                            Manage your account details and preferences.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {user && (
                        <div className="space-y-5">
                          <div>
                            <Label
                              htmlFor="email"
                              className="text-base font-medium"
                            >
                              Email Address
                            </Label>
                            <div className="flex mt-2 gap-3">
                              <Input
                                id="email"
                                type="email"
                                value={user.email}
                                readOnly
                                className="bg-muted/50 cursor-not-allowed flex-1"
                              />
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded flex items-center">
                                    <Check className="h-3 w-3 mr-1" /> Verified
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Your email address has been verified</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                          <div>
                            <Label
                              htmlFor="username"
                              className="text-base font-medium"
                            >
                              Display Name
                            </Label>
                            <Input
                              id="username"
                              placeholder="Enter your display name"
                              className="mt-2"
                            />
                            <p className="text-xs text-muted-foreground mt-1.5">
                              This is how your name will appear throughout the
                              app.
                            </p>
                          </div>
                          <Separator />
                          <div>
                            <h3 className="text-base font-medium mb-3">
                              Password
                            </h3>
                            <Button
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <KeyRound className="h-4 w-4" /> Change Password
                            </Button>
                            <p className="text-sm text-muted-foreground mt-2">
                              We recommend using a strong, unique password that
                              you don't use elsewhere.
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-end">
                      <Button onClick={() => handleSaveChanges("Account")}>
                        <Save className="h-4 w-4 mr-2" /> Save Account Changes
                      </Button>
                    </CardFooter>
                  </TabsContent>

                  <TabsContent value="notifications" className="m-0">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Bell className="h-6 w-6 text-primary" />
                        <div>
                          <CardTitle className="text-xl">
                            Notifications
                          </CardTitle>
                          <CardDescription>
                            Choose how you receive notifications.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                          <Mail className="h-4 w-4" /> Email Notifications
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/20 transition-colors">
                            <div>
                              <Label
                                htmlFor="email-notifications"
                                className="font-medium"
                              >
                                Daily Reminders
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Receive daily reminders to write in your
                                journal.
                              </p>
                            </div>
                            <Switch
                              id="email-notifications"
                              checked={emailNotifications}
                              onCheckedChange={setEmailNotifications}
                            />
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/20 transition-colors">
                            <div>
                              <Label
                                htmlFor="weekly-summary"
                                className="font-medium"
                              >
                                Weekly Summary
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Receive a weekly summary of your journal entries
                                and mood trends.
                              </p>
                            </div>
                            <Switch
                              id="weekly-summary"
                              checked={true}
                              onCheckedChange={() => {}}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                          <Smartphone className="h-4 w-4" /> Push Notifications
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/20 transition-colors">
                            <div>
                              <Label
                                htmlFor="push-notifications"
                                className="font-medium"
                              >
                                Enable Push Notifications
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Get real-time alerts in the app (if supported).
                              </p>
                            </div>
                            <Switch
                              id="push-notifications"
                              checked={pushNotifications}
                              onCheckedChange={setPushNotifications}
                            />
                          </div>
                        </div>
                        {!pushNotifications && (
                          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-amber-700 dark:text-amber-400">
                              Push notifications are currently disabled. Enable
                              them to receive timely reminders.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-end">
                      <Button onClick={() => handleSaveChanges("Notification")}>
                        <Save className="h-4 w-4 mr-2" /> Save Notification
                        Preferences
                      </Button>
                    </CardFooter>
                  </TabsContent>

                  <TabsContent value="security" className="m-0">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        <div>
                          <CardTitle className="text-xl">
                            Security & Session
                          </CardTitle>
                          <CardDescription>
                            Manage your application security and current
                            session.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-base font-medium mb-3">
                          Two-Factor Authentication
                        </h3>
                        <Card className="bg-muted/30">
                          <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <h4 className="font-medium">
                                Enhance Your Account Security
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Add an extra layer of security by enabling
                                two-factor authentication.
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              className="whitespace-nowrap"
                            >
                              Set Up 2FA
                            </Button>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h3 className="text-base font-medium mb-3">
                          Session Management
                        </h3>
                        <Card className="bg-muted/30">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-medium">Current Session</h4>
                                <p className="text-sm text-muted-foreground">
                                  Windows • Chrome • Active Now
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              >
                                Current
                              </Badge>
                            </div>
                            <Button variant="destructive" size="sm">
                              <LogOut className="h-4 w-4 mr-2" /> Sign Out
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>
          </div>
        </div>
      </TooltipProvider>
    </AuthenticatedLayout>
  );
}
