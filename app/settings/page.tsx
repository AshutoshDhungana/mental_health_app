"use client";

import React, { useState } from 'react';
import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, UserCircle, Bell, Palette, ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export default function SettingsPage() {
  const { user } = useAuth();

  // Example state for theme - in a real app, this would connect to your theme context/provider
  const [currentTheme, setCurrentTheme] = useState('system'); 
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  // Placeholder function for saving settings
  const handleSaveChanges = (section: string) => {
    console.log(`Saving ${section} settings...`);
    // Here you would typically call an API or update context/localStorage
    alert(`${section} settings saved (mock)!`);
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <Settings className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Settings</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your account, appearance, and notification preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar Navigation (Optional - for larger settings pages) */}
          {/* For now, we'll keep it simpler and list cards directly */}
          
          {/* Main Settings Sections */}
          <div className="md:col-span-3 space-y-8">
            {/* Appearance Settings */}
            <Card className="shadow-lg border-none bg-card/80 backdrop-blur-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Palette className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the application.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="theme-select" className="text-base font-medium">Theme</Label>
                  <Select value={currentTheme} onValueChange={setCurrentTheme}>
                    <SelectTrigger id="theme-select" className="w-full md:w-1/2 mt-2">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    Select your preferred theme. 'System Default' will match your OS settings.
                  </p>
                </div>
                {/* Add more appearance settings here, e.g., font size, compact mode */}
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-end">
                <Button onClick={() => handleSaveChanges('Appearance')}>Save Appearance</Button>
              </CardFooter>
            </Card>

            {/* Account Settings */}
            <Card className="shadow-lg border-none bg-card/80 backdrop-blur-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <UserCircle className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">Account</CardTitle>
                    <CardDescription>Manage your account details and preferences.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {user && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
                      <Input id="email" type="email" value={user.email} readOnly className="mt-2 bg-muted/50 cursor-not-allowed" />
                    </div>
                    <div>
                      <Label htmlFor="username" className="text-base font-medium">Username (Optional)</Label>
                      <Input id="username" placeholder="Enter your username" className="mt-2" />
                    </div>
                  </div>
                )}
                <div>
                  <Label className="text-base font-medium block mb-2">Password</Label>
                  <Button variant="outline">Change Password</Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    It's a good practice to use a strong, unique password.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-end">
                <Button onClick={() => handleSaveChanges('Account')}>Save Account Changes</Button>
              </CardFooter>
            </Card>

            {/* Notification Settings */}
            <Card className="shadow-lg border-none bg-card/80 backdrop-blur-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bell className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">Notifications</CardTitle>
                    <CardDescription>Choose how you receive notifications.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/20">
                  <div>
                    <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive important updates via email.</p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/20">
                  <div>
                    <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get real-time alerts in the app (if supported).</p>
                  </div>
                  <Switch 
                    id="push-notifications" 
                    checked={pushNotifications} 
                    onCheckedChange={setPushNotifications} 
                  />
                </div>
                {/* Add more specific notification toggles here */}
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-end">
                <Button onClick={() => handleSaveChanges('Notification')}>Save Notification Preferences</Button>
              </CardFooter>
            </Card>
            
            {/* Security & Session */}
            <Card className="shadow-lg border-none bg-card/80 backdrop-blur-lg">
               <CardHeader>
                  <div className="flex items-center gap-3">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                      <div>
                          <CardTitle className="text-xl">Security & Session</CardTitle>
                          <CardDescription>Manage your application security and current session.</CardDescription>
                      </div>
                  </div>
              </CardHeader>
              <CardContent className="space-y-4">
                  {/* Placeholder for 2FA or other security settings */}
                   <div>
                      <Label className="text-base font-medium block mb-2">Two-Factor Authentication (2FA)</Label>
                      <Button variant="outline" disabled>Enable 2FA (Coming Soon)</Button>
                      <p className="text-sm text-muted-foreground mt-2">
                      Add an extra layer of security to your account.
                      </p>
                  </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-end">
                {/* Kept for potential other actions in this card footer if needed in future */}
              </CardFooter>
            </Card>

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}