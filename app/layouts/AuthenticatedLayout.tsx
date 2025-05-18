"use client";

import React, { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Lightbulb,
  BookText,
  Bell,
  Settings,
  UserCircle,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Heart,
  ChevronRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
}

const navItems: NavItem[] = [
  { href: "/journal", label: "Journal", icon: LayoutDashboard },
  { href: "/insights", label: "Insights", icon: Lightbulb },
  { href: "/resources", label: "Resources", icon: BookText },
  { href: "/notifications", label: "Notifications", icon: Bell, badge: 2 },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSignOut = () => {
    signOut();
    router.push("/");
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  const userInitial =
    user?.displayName?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav
      className={`flex ${
        isMobile ? "flex-col space-y-2 p-4" : "flex-col space-y-1.5"
      }`}
    >
      {navItems.map((item) => {
        const isActive =
          item.href === "/journal"
            ? pathname === item.href
            : pathname.startsWith(item.href) && item.href !== "/";
        const LinkWrapper = isMobile ? SheetClose : "div";

        return (
          <LinkWrapper
            key={item.label}
            {...(isMobile ? { asChild: true } : {})}
          >
            <Link
              href={item.href}
              className={`group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 overflow-hidden relative
                ${
                  isActive
                    ? "bg-primary/15 text-primary shadow-sm dark:bg-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              onClick={() => isMobile && setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive
                      ? "text-primary"
                      : "group-hover:text-primary transition-colors duration-300"
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <Badge
                  variant="secondary"
                  className="ml-auto text-xs px-1.5 py-0.5 bg-secondary/20"
                >
                  {item.badge}
                </Badge>
              )}

              {isActive && (
                <div className="absolute inset-y-0 left-0 w-1 bg-primary rounded-r-full" />
              )}
            </Link>
          </LinkWrapper>
        );
      })}
    </nav>
  );

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !isLoading &&
      !user &&
      pathname !== "/signin"
    ) {
      router.push("/signin");
    }
  }, [user, isLoading, router, pathname]);

  if ((isLoading || !user) && pathname !== "/signin") {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <Heart className="h-12 w-12 text-primary animate-pulse mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user && !isLoading && pathname === "/signin") {
    return <>{children}</>;
  }

  if (isLoading && pathname !== "/signin") {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <Heart className="h-12 w-12 text-primary animate-pulse mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user && !isLoading && pathname !== "/signin") {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <Heart className="h-12 w-12 text-primary mb-4" />
          <p className="text-muted-foreground">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background overflow-hidden">
      {/* Mobile Header & Menu */}
      <header className="md:hidden sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <Link
          href="/journal"
          className="flex items-center gap-2 font-bold text-lg"
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            MindJournal
          </span>
        </Link>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-sm border-border/50"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full max-w-xs p-0 border-l border-border/20 bg-background/95 backdrop-blur"
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                <SheetClose asChild>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 mt-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Avatar className="h-10 w-10 border ring-2 ring-primary/20">
                      <AvatarImage src={user?.photoURL || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm truncate">
                        {user?.displayName || user?.email?.split("@")[0]}
                      </p>
                      <p className="text-xs text-primary">View Profile</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                  </Link>
                </SheetClose>
              </div>
              <div className="flex-grow overflow-y-auto p-2">
                <NavLinks isMobile={true} />
              </div>
              <div className="p-4 border-t border-border/30">
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    onClick={toggleTheme}
                    className="w-full justify-start text-foreground mb-2 rounded-lg"
                  >
                    {theme === "dark" ? (
                      <Sun className="mr-3 h-5 w-5 text-yellow-foreground" />
                    ) : (
                      <Moon className="mr-3 h-5 w-5 text-primary" />
                    )}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="w-full justify-start text-destructive hover:text-destructive rounded-lg"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar with elegant styling */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-30 w-64 flex-col border-r bg-card/30 backdrop-blur-lg dark:bg-card/10">
        <div className="flex h-16 items-center border-b px-6">
          <Link
            href="/journal"
            className="flex items-center gap-2 font-bold text-lg"
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              MindJournal
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <NavLinks />
        </div>
        <div className="p-4 border-t bg-card/20">
          <Link
            href="/profile"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/80 transition-colors mb-4"
          >
            <Avatar className="h-10 w-10 border ring-2 ring-primary/10">
              <AvatarImage src={user?.photoURL || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm truncate">
                {user?.displayName || user?.email?.split("@")[0]}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="justify-start text-xs"
            >
              {theme === "dark" ? (
                <Sun className="mr-2 h-4 w-4 text-yellow-foreground" />
              ) : (
                <Moon className="mr-2 h-4 w-4 text-primary" />
              )}
              {theme === "dark" ? "Light" : "Dark"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="justify-start text-xs text-destructive hover:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area (for Desktop) */}
      <div className="md:ml-64 flex flex-col flex-1">
        {/* New Desktop Top Bar with status information */}
        <header className="hidden md:flex sticky top-0 z-20 h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
          <div className="flex items-center space-x-4">
            <div className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              {pathname === "/journal"
                ? "Your Journal"
                : pathname === "/insights"
                ? "Mental Health Insights"
                : pathname === "/resources"
                ? "Wellness Resources"
                : pathname === "/notifications"
                ? "Notifications"
                : pathname === "/settings"
                ? "Account Settings"
                : pathname === "/profile"
                ? "Your Profile"
                : "MindJournal"}
            </div>
            <div className="hidden lg:flex items-center">
              <Badge
                variant="outline"
                className="text-xs bg-primary/5 text-primary border-primary/20"
              >
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 transition-all text-yellow-foreground" />
              ) : (
                <Moon className="h-5 w-5 transition-all text-primary" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                    <AvatarImage
                      src={user?.photoURL || undefined}
                      alt={user?.displayName || "User"}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none truncate">
                      {user?.displayName || user?.email?.split("@")[0]}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile" passHref>
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="/settings" passHref>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content with improved padding and spacing */}
        <main className="flex-1 overflow-x-hidden p-4 md:p-8 pt-6">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
