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
} from "@/components/ui/card";
import {
  BellRing,
  CheckCheck,
  Settings,
  Info,
  Award,
  AlertTriangle,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface NotificationItem {
  id: string;
  type: "info" | "success" | "warning" | "achievement";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "info",
    title: "Welcome to MindJournal!",
    description:
      "We are excited to have you on board. Explore features and start your journaling journey.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "achievement",
    title: "First Journal Entry Milestone",
    description:
      "Congratulations! You've written your first journal entry. Keep up the great work!",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: "3",
    type: "warning",
    title: "Subscription Renewal Reminder",
    description:
      "Your premium subscription is due for renewal in 7 days. Update your payment details.",
    timestamp: "3 days ago",
    read: true,
  },
  {
    id: "4",
    type: "success",
    title: "Data Backup Successful",
    description: "Your journal data was successfully backed up to the cloud.",
    timestamp: "5 days ago",
    read: true,
  },
];

const NotificationIcon = ({ type }: { type: NotificationItem["type"] }) => {
  switch (type) {
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />;
    case "success":
      return <CheckCheck className="h-5 w-5 text-green-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "achievement":
      return <Award className="h-5 w-5 text-purple-500" />;
    default:
      return <BellRing className="h-5 w-5 text-gray-500" />;
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const filteredNotifications =
    filter === "all" ? notifications : notifications.filter((n) => !n.read);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <Card className="shadow-xl border-none bg-card/80 backdrop-blur-lg overflow-hidden">
          <CardHeader className="border-b pb-4 px-4 sm:px-6 bg-muted/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BellRing className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl">
                    Notifications
                  </CardTitle>
                  <CardDescription className="mt-1 text-xs sm:text-sm">
                    {unreadCount > 0
                      ? `You have ${unreadCount} unread notifications.`
                      : "No new notifications."}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <div className="flex bg-muted/50 rounded-lg p-0.5">
                  <Button
                    variant={filter === "all" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilter("all")}
                    className="text-xs px-3 h-8"
                  >
                    All
                  </Button>
                  <Button
                    variant={filter === "unread" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilter("unread")}
                    className="text-xs px-3 h-8"
                  >
                    Unread{" "}
                    {unreadCount > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-1 bg-primary text-white"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </div>
                {unreadCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs px-2 sm:px-3 h-8 sm:h-9"
                  >
                    <CheckCheck className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="hidden xs:inline">Mark all as read</span>
                    <span className="xs:hidden">Mark all</span>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  title="Notification Settings"
                  className="hidden sm:inline-flex h-8 sm:h-9 w-8 sm:w-9"
                >
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <BellRing className="mx-auto h-16 w-16 mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">All Clear!</h3>
                  <p>
                    You have no {filter === "unread" ? "unread " : ""}
                    notifications at the moment.
                  </p>
                </motion.div>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {filteredNotifications.map((notification, index) => (
                  <motion.li
                    key={notification.id}
                    className={`p-4 md:p-5 flex items-start gap-4 transition-colors hover:bg-muted/30 relative group ${
                      notification.read
                        ? "opacity-80"
                        : "bg-primary/5 dark:bg-primary/10"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <div
                      className={`mt-1 p-2 rounded-full bg-${
                        notification.type === "info"
                          ? "blue"
                          : notification.type === "success"
                          ? "green"
                          : notification.type === "warning"
                          ? "yellow"
                          : "purple"
                      }-100/30`}
                    >
                      <NotificationIcon type={notification.type} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3
                          className={`font-semibold ${
                            notification.read
                              ? "text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {notification.title}
                          {!notification.read && (
                            <span className="inline-block ml-2 w-2 h-2 bg-primary rounded-full"></span>
                          )}
                        </h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {notification.timestamp}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-primary hover:text-primary/80 h-8 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <CheckCheck className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-muted-foreground hover:text-destructive h-8 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
