"use client";

import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import {
  LayoutDashboard, // Using for Journal/Dashboard
  Lightbulb,     // Using for Insights
  BookText,      // Using for Resources
  Bell,          // Using for Notifications
  Settings,      // Using for Settings
  UserCircle,    // Using for Profile
  LogOut,
  Menu,
  X,
  Sun, // Added for theme toggle placeholder
  Moon // Added for theme toggle placeholder (optional)
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'; // For mobile menu
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/journal', label: 'Journal', icon: LayoutDashboard },
  { href: '/insights', label: 'Insights', icon: Lightbulb },
  { href: '/resources', label: 'Resources', icon: BookText },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  // Correctly destructure isLoading from useAuth context
  const { user, signOut, isLoading } = useAuth(); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSignOut = () => {
    signOut();
    // Use both methods to ensure redirect works in all cases
    router.push('/');
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };

  const userInitial = user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U';

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav className={`flex ${isMobile ? 'flex-col space-y-2 p-4' : 'flex-col space-y-1'}`}>
      {navItems.map((item) => {
        // Adjusted active check: /journal should be active only for /journal, not for sub-paths like /journal/entry/123
        // Other paths like /settings should be active if pathname starts with them (e.g. /settings/account)
        const isActive = item.href === '/journal' ? pathname === item.href : (pathname.startsWith(item.href) && item.href !== '/');
        const LinkWrapper = isMobile ? SheetClose : 'div';

        return (
          <LinkWrapper key={item.label} {...(isMobile ? {asChild: true} : {})}>
            <Link
              href={item.href}
              className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors
                ${isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              onClick={() => isMobile && setMobileMenuOpen(false)}
            >
              <item.icon className={`mr-3 h-5 w-5 ${isActive ? '' : ''}`} />
              {item.label}
            </Link>
          </LinkWrapper>
        );
      })}
    </nav>
  );

  useEffect(() => {
    // If auth check is complete (not loading), and no user is found,
    // and we are on the client side, and not already on the signin page, redirect.
    if (typeof window !== 'undefined' && !isLoading && !user && pathname !== '/signin') {
      router.push('/signin');
    }
  }, [user, isLoading, router, pathname]);

  // Show a loading/redirecting message if auth is still loading,
  // or if there's no user (and we're not on signin page, implying a redirect is imminent or SSR state).
  if ((isLoading || !user) && pathname !== '/signin') {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading or redirecting...</p>
      </div>
    );
  }
  
  // If user is null and we ARE on the signin page, allow signin page to render
  // This check is important if AuthenticatedLayout wraps a global layout that includes /signin
  if (!user && !isLoading && pathname === '/signin') {
      // Allow children to render if it's the signin page itself, 
      // or handle as per your app's structure for unauthenticated routes.
      // For now, assuming signin page is not wrapped by this layout or handles its own auth state.
      // If children is the signin page, it should render. If not, this path might need adjustment.
      return <>{children}</>; 
  }

  // Final check: if still loading or no user after all conditions, show loading (safety net)
  // This might be redundant if the above conditions cover all cases, but acts as a fallback.
  if (isLoading && pathname !== '/signin') {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // If no user and not loading, and not on signin page (should have been redirected by useEffect)
  // but if somehow execution reaches here, this is a fallback state before rendering layout for a user.
  if (!user && !isLoading && pathname !== '/signin') {
      // This state ideally shouldn't be reached due to the useEffect redirect.
      // Showing a generic message or null.
      return <div className="flex h-screen items-center justify-center bg-background"><p className="text-muted-foreground">Redirecting to sign in...</p></div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Header & Menu */}
      <header className="md:hidden sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <Link href="/journal" className="flex items-center gap-2 font-bold text-lg">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span>MindJournal</span>
        </Link>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <SheetClose asChild>
                  <Link href="/profile" className="flex items-center gap-3 mb-4" onClick={() => setMobileMenuOpen(false)}>
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={user?.photoURL || undefined} />
                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm truncate">{user?.displayName || user?.email?.split('@')[0]}</p>
                      <p className="text-xs text-muted-foreground">View Profile</p>
                    </div>
                  </Link>
                </SheetClose>
              </div>
              <div className="flex-grow overflow-y-auto">
                <NavLinks isMobile={true} />
              </div>
              <div className="p-4 border-t">
                <SheetClose asChild>
                  <Button variant="ghost" onClick={toggleTheme} className="w-full justify-start text-muted-foreground hover:text-foreground">
                    {theme === 'dark' ? <Sun className="mr-3 h-5 w-5" /> : <Moon className="mr-3 h-5 w-5" />}
                    Toggle Theme
                  </Button>
                </SheetClose>
              </div>
              <div className="p-4 mt-auto border-t">
                <SheetClose asChild>
                  <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start text-muted-foreground hover:text-foreground">
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar - Navigation Only */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-30 w-64 flex-col border-r bg-card/50 backdrop-blur-lg">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/journal" className="flex items-center gap-2 font-bold text-lg text-primary">
            <LayoutDashboard className="h-6 w-6" />
            <span>MindJournal</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <NavLinks />
        </div>
      </aside>

      {/* Main Content Area (for Desktop) */}
      <div className="md:ml-64 flex flex-col flex-1"> 
        {/* New Desktop Top Bar */}
        <header className="hidden md:flex sticky top-0 z-20 h-16 items-center justify-end gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? 
              <Sun className="h-5 w-5 transition-all" /> : 
              <Moon className="h-5 w-5 transition-all" />
            }
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.photoURL || "/img/avatars/default.png"} alt={user?.displayName || "User"} />
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none truncate">{user?.displayName || user?.email?.split('@')[0]}</p>
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
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
