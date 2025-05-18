'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { SignInForm } from '@/components/auth/signin-form';

export default function SignInPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to journal if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      router.push('/journal');
    }
  }, [user, isLoading, router]);

  // Show loading state while checking auth status
  if (isLoading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container relative min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background/60 dark:from-background/95 dark:to-background/80 -z-10" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:bg-[url('/grid-dark.svg')] -z-20" />
      
      <div className="w-full max-w-md">
        <SignInForm />
      </div>
    </div>
  );
}
