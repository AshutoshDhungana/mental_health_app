'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  displayName?: string; 
  email: string;
  photoURL?: string; 
  metadata?: { 
    creationTime?: string | number; 
  };
  expires_at?: string; 
  created_at?: string; 
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (name: string, email: string, password: string) => Promise<User | null>;
  signOut: () => void;
  updateUser?: (updatedUserData: Partial<User>) => Promise<void>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true); 
    try {
      const storedUser = localStorage.getItem('mindjournal_user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.id && parsedUser.email) {
            setUser(parsedUser);
          } else {
            localStorage.removeItem('mindjournal_user');
          }
        } catch (e) {
          console.error("Failed to parse user from localStorage:", e);
          localStorage.removeItem('mindjournal_user'); 
          setUser(null); 
        }
      }
    } catch (e) {
      console.error("Error accessing localStorage in AuthProvider:", e);
    } finally {
      setIsLoading(false); 
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      const storedUsers = localStorage.getItem('mindjournal_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const foundUser = users.find((u: any) => 
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      
      const userData = {
        ...userWithoutPassword,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };
      
      setUser(userData);
      localStorage.setItem('mindjournal_user', JSON.stringify(userData));
      
      console.log('User authenticated successfully', userData.id);
      return userData; 
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to sign in');
      console.error('Authentication error:', e);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!name || !email || !password) {
        throw new Error('Name, email, and password are required');
      }
      
      const storedUsers = localStorage.getItem('mindjournal_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const existingUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        displayName: name, 
        email: email.toLowerCase(),
        created_at: new Date().toISOString(),
        metadata: { creationTime: new Date().toISOString() } 
      };

      const userForStorageList = { ...newUser, password: password }; 
      users.push(userForStorageList);
      localStorage.setItem('mindjournal_users', JSON.stringify(users));
      
      const { password: _, ...userToSet } = userForStorageList;
      const userDataWithExpiry = {
          ...userToSet,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };

      setUser(userDataWithExpiry);
      localStorage.setItem('mindjournal_user', JSON.stringify(userDataWithExpiry));
      
      return userToSet;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to sign up');
      console.error('Registration error:', e);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setIsLoading(true); 
    setUser(null);
    localStorage.removeItem('mindjournal_user');
    console.log('User signed out');
    setIsLoading(false);
  };
  
  const updateUser = async (updatedUserData: Partial<User>) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!user) {
        throw new Error("User not signed in, cannot update.");
      }
      const newUserState = { ...user, ...updatedUserData };
      setUser(newUserState);
      localStorage.setItem('mindjournal_user', JSON.stringify(newUserState));
      console.log('User updated in context (mock):', newUserState);
    } catch (e) {
      console.error("Failed to update user (mock):", e);
      setError(e instanceof Error ? e.message : String(e));
      throw e; 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.expires_at) {
      const expiryDate = new Date(user.expires_at);
      if (expiryDate < new Date()) {
        console.log('Session expired, signing out');
        signOut();
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, error, signIn, signUp, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
