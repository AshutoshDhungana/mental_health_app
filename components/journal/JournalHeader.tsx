'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Bell, Home, LogOut, Settings, User, BookOpen } from 'lucide-react'; // Added BookOpen for MindJournal logo

export function JournalHeader() {
  const router = useRouter();
  const { signOut } = useAuth(); // Assuming useAuth provides signOut

  const handleSignOut = () => {
    signOut();
    router.push('/'); // Redirect to landing page after sign out
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b backdrop-blur-lg bg-background/80 shadow-sm dark:bg-background/30 dark:border-white/5 mb-6">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left side - App Name/Logo/Home Link */}
        <Link href="/journal" className="flex items-center gap-2 text-lg font-semibold text-primary hover:text-primary/90 transition-colors">
          <BookOpen className="h-6 w-6" />
          <span>MindJournal</span>
        </Link>

        {/* Right side - User actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <Link href="/notifications" passHref>
            <Button variant="ghost" size="icon" className="hover:bg-primary/5 rounded-full w-9 h-9 md:w-10 md:h-10">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </Link>
          <Link href="/settings" passHref>
            <Button variant="ghost" size="icon" className="hover:bg-primary/5 rounded-full w-9 h-9 md:w-10 md:h-10">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
          <Link href="/profile" passHref>
            <Button variant="ghost" size="icon" className="hover:bg-primary/5 rounded-full w-9 h-9 md:w-10 md:h-10">
              <User className="h-5 w-5" />
              <span className="sr-only">User Profile</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/5 rounded-full w-9 h-9 md:w-10 md:h-10"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sign Out</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}