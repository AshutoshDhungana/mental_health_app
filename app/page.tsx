"use client";

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Heart, Tag, BarChart3, Smile, Check, Moon, LogOut, UserCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context";

export default function LandingPage() {
  const { user, isLoading, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    window.location.href = '/'; // Ensure redirect to homepage after signout
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b backdrop-blur-lg bg-background/80 shadow-md dark:bg-background/30 dark:border-white/5">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-[10%] -left-[5%] w-64 h-64 rounded-full bg-primary/10 filter blur-3xl opacity-30"></div>
          <div className="absolute -bottom-[10%] -right-[5%] w-64 h-64 rounded-full bg-accent/10 filter blur-3xl opacity-30"></div>
        </div>
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link className="flex items-center justify-center" href="#">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary-foreground to-accent-foreground animate-gradient">MindJournal</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-sm font-medium relative group" href="#features">
              <span className="group-hover:text-primary transition-colors">Features</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link className="text-sm font-medium relative group" href="#testimonials">
              <span className="group-hover:text-secondary-foreground transition-colors">Testimonials</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary-foreground group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link className="text-sm font-medium relative group" href="#about">
              <span className="group-hover:text-accent-foreground transition-colors">About</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-foreground group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link className="text-sm font-medium relative group" href="#contact">
              <span className="group-hover:text-pink-foreground transition-colors">Contact</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-foreground group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {isLoading ? (
              <Button size="sm" className="hidden md:flex premium-button text-white font-medium px-4 py-2 rounded-md" disabled>
                Loading...
              </Button>
            ) : user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/journal">
                  <Button size="sm" variant="outline" className="premium-button font-medium px-4 py-2 rounded-md">
                    Go to Journal
                  </Button>
                </Link>
                <Button size="sm" variant="ghost" onClick={handleSignOut} className="px-4 py-2">
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/signin">
                  <Button size="sm" className="font-medium px-4 py-2 rounded-md">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signin">
                  <Button size="sm" className="premium-button font-medium px-4 py-2 rounded-md">
                    <ArrowRight className="mr-1 h-4 w-4" /> Start Journaling
                  </Button>
                </Link>
              </div>
            )}
            <Button size="icon" variant="ghost" className="md:hidden hover:bg-primary/5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 hero-gradient wave-pattern relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-pink/30 mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-[15%] w-40 h-40 rounded-full bg-yellow/20 mix-blend-multiply filter blur-xl animate-float-delay"></div>
          <div className="absolute top-1/2 left-[40%] w-24 h-24 rounded-full bg-accent/20 mix-blend-multiply filter blur-xl animate-float-slow"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-5">
                <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm glass-card shadow-lg border-white/20 dark:border-white/5">
                  <div className="flex h-6 w-6 rounded-full bg-gradient-to-br from-accent to-primary items-center justify-center mr-2 shadow-md">
                    <span className="text-white text-xs">✨</span>
                  </div>
                  <span className="font-medium text-foreground">Introducing Premium Features</span>
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient relative dark:from-primary dark:via-pink dark:to-accent">
                    Your Mental Health Journal
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 text-lg md:text-xl leading-relaxed pl-1 border-l-4 border-primary/20 shadow-sm">
                    <span className="text-primary/80 font-medium">Every step</span> you take in understanding your mental health is a step toward growth. You're not alone on
                    this journey, and your feelings are <span className="text-accent-foreground font-medium">valid</span>.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row pt-2">
                  {isLoading ? (
                    <Button size="lg" className="relative bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/20 border-none shadow-md text-white font-semibold transition-all duration-300" disabled>
                      Loading...
                    </Button>
                  ) : user ? (
                    <Link href="/journal" className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent opacity-70 rounded-lg blur-sm group-hover:opacity-100 transition duration-300"></div>
                      <Button size="lg" className="relative bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/20 border-none shadow-md text-white font-semibold transition-all duration-300">
                        Open Your Journal
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/signin" className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent opacity-70 rounded-lg blur-sm group-hover:opacity-100 transition duration-300"></div>
                      <Button size="lg" className="relative bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/20 border-none shadow-md text-white font-semibold transition-all duration-300">
                        Start Journaling
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  )}
                  <Link href="#features" className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary/50 to-accent/50 opacity-30 rounded-lg blur-sm group-hover:opacity-60 transition duration-300"></div>
                    <Button size="lg" variant="outline" className="relative shadow-sm bg-background/80 backdrop-blur-sm border-secondary/20 hover:border-secondary/40 hover:bg-gradient-to-r hover:from-background/90 hover:to-secondary/5 transition-all duration-300">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary-foreground to-accent-foreground group-hover:from-primary">Learn More</span>
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center mt-6 space-x-4">
                  <div className="flex -space-x-2">
                    {[
                      { bg: 'bg-pink/30', text: '😊' },
                      { bg: 'bg-accent/30', text: '🌿' },
                      { bg: 'bg-secondary/30', text: '🧘' }
                    ].map((item, i) => (
                      <div key={i} className={`h-10 w-10 rounded-full border-2 border-background overflow-hidden ${item.bg} flex items-center justify-center`}>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">100K+</span>
                    <span className="text-foreground/70 ml-1">people using MindJournal</span>
                  </div>
                </div>
                
                {/* Floating decorative elements */}
                <div className="absolute left-4 top-20 w-16 h-16 rounded-full bg-pink/20 blur-xl hidden lg:block"></div>
                <div className="absolute left-24 bottom-20 w-24 h-24 rounded-full bg-accent/10 blur-xl hidden lg:block"></div>
              </div>
              
              <div className="flex items-center justify-center relative">
                {/* Background decorative elements */}
                <div className="absolute right-0 -top-10 w-72 h-72 bg-pink/30 rounded-full filter blur-3xl opacity-50 -z-10"></div>
                <div className="absolute left-0 bottom-0 w-64 h-64 bg-secondary/30 rounded-full filter blur-3xl opacity-50 -z-10"></div>
                <div className="absolute right-1/4 top-1/3 w-48 h-48 bg-accent/30 rounded-full filter blur-3xl opacity-30 -z-10"></div>
                
                {/* Journal entry card with pastel accents */}
                <div className="card-hover relative w-full max-w-[450px] rounded-2xl bg-background/80 backdrop-blur-sm p-6 border border-accent/20 shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink/20 rounded-full -mr-14 -mt-14 z-0"></div>
                  <div className="absolute bottom-0 left-0 w-28 h-28 bg-accent/20 rounded-full -ml-14 -mb-14"></div>
                  
                  <div className="space-y-2 border-b border-accent/20 pb-4 relative">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold flex items-center">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                          <Smile className="h-4 w-4 text-primary" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">Weekly Reflection</span>
                      </h3>
                      <span className="text-xs bg-yellow/20 text-yellow-foreground px-2.5 py-1 rounded-full font-medium">Today</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Monday, May 17, 2025</p>
                  </div>
                  
                  <div className="mt-4 space-y-4 relative">
                    <div>
                      <h4 className="text-sm font-medium flex items-center">
                        <div className="h-5 w-5 rounded-full bg-secondary/20 flex items-center justify-center mr-2">
                          <Moon className="h-3 w-3 text-secondary-foreground" />
                        </div> 
                        Today's Mood
                      </h4>
                      <div className="mt-2 flex space-x-2">
                        {[
                          { emoji: "😔", bg: "bg-accent/10 border-accent/30", selected: false },
                          { emoji: "😐", bg: "bg-yellow/10 border-yellow/30", selected: false },
                          { emoji: "🙂", bg: "bg-secondary/10 border-secondary/30", selected: false },
                          { emoji: "😊", bg: "bg-primary/10 border-primary/30", selected: true },
                          { emoji: "😄", bg: "bg-pink/10 border-pink/30", selected: false }
                        ].map((item, i) => (
                          <div
                            key={i}
                            className={`mood-emoji text-lg ${item.bg} ${item.selected ? "selected ring-2 ring-primary/20 scale-110" : ""}`}
                          >
                            {item.emoji}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium flex items-center">
                        <div className="h-5 w-5 rounded-full bg-pink/20 flex items-center justify-center mr-2">
                          <BarChart3 className="h-3 w-3 text-pink-foreground" />
                        </div>
                        Journal Entry
                      </h4>
                      <div className="mt-2 rounded-lg border border-accent/20 bg-accent/5 p-3 text-sm relative">
                        <span className="absolute -top-1 -left-1 h-2.5 w-2.5 rounded-full bg-accent/50"></span>
                        Today I practiced mindfulness for 10 minutes and noticed how it helped me stay present
                        throughout the day...
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="tag-pill bg-accent/20 text-accent-foreground">
                        <Tag className="h-3 w-3 mr-1" /> mindfulness
                      </span>
                      <span className="tag-pill bg-secondary/20 text-secondary-foreground">
                        <Tag className="h-3 w-3 mr-1" /> progress
                      </span>
                      <span className="tag-pill bg-primary/20 text-primary">
                        <Tag className="h-3 w-3 mr-1" /> self-care
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bubble-pattern bg-background">
          <div className="container px-4 md:px-6 relative">
            {/* Decorative elements */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-pink/20 rounded-full filter blur-3xl opacity-30 -z-10"></div>
            <div className="absolute left-1/4 bottom-1/4 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl opacity-30 -z-10"></div>
            
            <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-full border bg-accent/10 text-accent-foreground font-medium shadow-sm border-accent/20">
                <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center mr-2">
                  <Check className="h-4 w-4 text-accent-foreground" />
                </div>
                Designed by mental health experts
              </div>
              <div className="space-y-4 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary-foreground to-accent-foreground">
                  Features That Support Your Journey
                </h2>
                <p className="text-foreground/80 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed mx-auto max-w-2xl">
                  Tools designed with mental health experts to help you track, understand, and improve your wellbeing through consistent reflection and insights.
                </p>
              </div>
            </div>
            
            <div className="mx-auto grid max-w-6xl items-start gap-8 py-8 md:py-12 lg:grid-cols-3 lg:gap-10">
              {/* Weekly Check-ins */}
              <div className="card-hover flex flex-col rounded-2xl p-6 border-2 border-primary/10 card-mint-gradient">
                <div className="feature-icon feature-icon-mint mb-5">
                  <Heart className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-primary">Weekly Check-ins</h3>
                  <p className="text-foreground/80">
                    Regular journaling prompts to help you reflect on your week and track your mental health journey with guided questions.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-primary/10 flex items-center text-sm text-primary font-medium">
                  <Link href="#" className="flex items-center group">
                    Learn more <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              
              {/* Customizable Tags */}
              <div className="card-hover flex flex-col rounded-2xl p-6 border-2 border-secondary/10 card-lavender-gradient">
                <div className="feature-icon feature-icon-lavender mb-5">
                  <Tag className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-secondary-foreground">Customizable Tags</h3>
                  <p className="text-foreground/80">
                    Create and use tags to identify patterns in your thoughts, feelings, and behaviors, making it easier to track recurring themes.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-secondary/10 flex items-center text-sm text-secondary-foreground font-medium">
                  <Link href="#" className="flex items-center group">
                    Learn more <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              
              {/* Mood Visualization */}
              <div className="card-hover flex flex-col rounded-2xl p-6 border-2 border-accent/10 card-blue-gradient">
                <div className="feature-icon feature-icon-blue mb-5">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-accent-foreground">Mood Visualization</h3>
                  <p className="text-foreground/80">
                    Interactive charts that help you visualize your mood patterns over time and identify trends for better self-awareness.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-accent/10 flex items-center text-sm font-medium text-accent-foreground">
                  <Link href="#" className="flex items-center group">
                    Learn more <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Premium feature */}
            <div className="mt-16 md:mt-20 lg:mt-24">
              <div className="rounded-2xl border border-pink/20 bg-gradient-to-br from-background to-pink/10 overflow-hidden shadow-lg">
                <div className="grid lg:grid-cols-2">
                  <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow/20 rounded-full -mr-16 -mt-16 z-0"></div>
                    <div className="space-y-4 relative z-10">
                      <div className="inline-flex items-center rounded-full bg-gradient-to-r from-pink to-pink/50 px-4 py-1.5 text-sm font-medium text-white shadow-sm">
                        Premium Feature
                      </div>
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-pink-foreground to-primary">AI Mood Analysis</h3>
                      <p className="text-foreground/80">
                        Our AI-powered mood analysis helps you understand patterns in your journaling and provides personalized insights based on your entries.
                      </p>
                      <Link href="#">
                        <Button className="mt-4 bg-gradient-to-r from-pink-foreground to-primary text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                          Explore Premium
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="bg-background/50 flex items-center justify-center p-8 relative">
                    {/* Background pattern */}
                    <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                        <defs>
                          <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="2" fill="currentColor" className="text-pink" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dotPattern)" />
                      </svg>
                    </div>
                    
                    {/* Chart container */}
                    <div className="h-full w-full flex items-center justify-center relative z-10">
                      <div className="w-full max-w-md h-[300px] bg-gradient-to-br from-pink/10 to-accent/10 rounded-2xl border border-pink/20 p-6 shadow-inner flex flex-col relative overflow-hidden">
                        {/* Floating decoration */}
                        <div className="absolute -right-8 -top-8 w-16 h-16 rounded-full bg-yellow/20 filter blur-xl opacity-70"></div>
                        <div className="absolute -left-10 bottom-10 w-20 h-20 rounded-full bg-primary/20 filter blur-xl opacity-70"></div>
                        
                        {/* Chart header */}
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-pink to-pink-foreground/70 flex items-center justify-center shadow-sm mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-white"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                            </div>
                            <div className="text-sm font-medium text-pink-foreground">AI Mood Analysis</div>
                          </div>
                          <div className="flex space-x-2 text-xs">
                            <div className="px-2 py-1 rounded-full bg-accent/20 text-accent-foreground">Last 30 days</div>
                            <div className="px-2 py-1 rounded-full bg-background/50 text-muted-foreground">Weekly</div>
                          </div>
                        </div>
                        
                        {/* Legend */}
                        <div className="flex space-x-3 mb-3">
                          <div className="flex items-center text-xs">
                            <div className="h-2 w-2 rounded-full bg-primary mr-1"></div>
                            <span className="text-primary-foreground">Calm</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <div className="h-2 w-2 rounded-full bg-secondary mr-1"></div>
                            <span className="text-secondary-foreground">Focus</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <div className="h-2 w-2 rounded-full bg-pink mr-1"></div>
                            <span className="text-pink-foreground">Stress</span>
                          </div>
                        </div>
                        
                        {/* Line chart */}
                        <div className="flex-grow relative">
                          {/* Grid */}
                          <div className="absolute inset-x-0 inset-y-4 grid grid-cols-7 gap-px">
                            {[0, 1, 2, 3, 4, 5, 6].map(i => (
                              <div key={i} className="border-t border-foreground/5"></div>
                            ))}
                          </div>
                          
                          {/* Y-axis labels */}
                          <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-[10px] text-muted-foreground py-2">
                            <div>High</div>
                            <div>Mid</div>
                            <div>Low</div>
                          </div>
                          
                          {/* Line charts */}
                          <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                            {/* Calm line */}
                            <g className="translate-y-12">
                              <path
                                d="M0,50 C10,45 20,48 30,40 C40,32 50,30 60,32 C70,34 80,25 90,20 L100,25"
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                className="drop-shadow-sm"
                              />
                              <circle cx="30" cy="40" r="2" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" className="drop-shadow-sm" />
                              <circle cx="60" cy="32" r="2" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" className="drop-shadow-sm" />
                              <circle cx="90" cy="20" r="2" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" className="drop-shadow-sm" />
                            </g>
                            
                            {/* Focus line */}
                            <g className="translate-y-10">
                              <path
                                d="M0,70 C10,65 20,60 30,55 C40,50 50,40 60,38 C70,36 80,40 90,35 L100,30"
                                fill="none"
                                stroke="hsl(var(--secondary-foreground))"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeDasharray="1,3"
                                className="drop-shadow-sm"
                              />
                            </g>
                            
                            {/* Stress line */}
                            <g className="translate-y-8">
                              <path
                                d="M0,60 C10,75 20,80 30,70 C40,60 50,65 60,70 C70,75 80,60 90,48 L100,50"
                                fill="none"
                                stroke="hsl(var(--pink))"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                className="drop-shadow-sm"
                              />
                              <circle cx="30" cy="70" r="2" fill="hsl(var(--background))" stroke="hsl(var(--pink))" strokeWidth="1.5" className="drop-shadow-sm" />
                              <circle cx="60" cy="70" r="2" fill="hsl(var(--background))" stroke="hsl(var(--pink))" strokeWidth="1.5" className="drop-shadow-sm" />
                              <circle cx="90" cy="48" r="2" fill="hsl(var(--background))" stroke="hsl(var(--pink))" strokeWidth="1.5" className="drop-shadow-sm" />
                            </g>
                          </svg>
                          
                          {/* X-axis labels */}
                          <div className="absolute bottom-0 inset-x-0 flex justify-between text-[9px] text-muted-foreground">
                            <div>Mon</div>
                            <div>Wed</div>
                            <div>Fri</div>
                            <div>Sun</div>
                          </div>
                        </div>
                        
                        {/* AI insights */}
                        <div className="mt-4 pt-3 border-t border-pink/10 text-xs text-foreground/70 flex items-center">
                          <div className="bg-accent/30 h-4 w-4 rounded-full flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-2 w-2 text-accent-foreground"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                          </div>
                          <span>AI detected a <span className="text-primary">27% improvement</span> in your calm levels this week.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden bubble-pattern">
          <div className="container px-4 md:px-6">
            <div className="relative z-10">
              <div className="text-center space-y-4 mb-12">
                <div className="inline-flex items-center rounded-full border-2 border-accent/20 px-4 py-2 text-sm bg-accent/5 shadow-sm">
                  <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center mr-2">
                    <Smile className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <span className="text-accent-foreground font-medium">What our users say</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-accent">
                  Stories from Our Community
                </h2>
                <p className="mx-auto max-w-[700px] text-foreground/80 md:text-lg">
                  Real experiences from people who have made mental wellness a priority with MindJournal.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-hover flex flex-col rounded-2xl p-6 border-2 shadow-md transform transition-transform hover:scale-[1.02] hover:shadow-lg" style={{ borderColor: i === 1 ? 'rgba(var(--primary), 0.2)' : i === 2 ? 'rgba(var(--secondary), 0.2)' : 'rgba(var(--accent), 0.2)', background: i === 1 ? 'linear-gradient(to bottom right, rgba(var(--primary), 0.05), rgba(var(--background), 1))' : i === 2 ? 'linear-gradient(to bottom right, rgba(var(--secondary), 0.05), rgba(var(--background), 1))' : 'linear-gradient(to bottom right, rgba(var(--accent), 0.05), rgba(var(--background), 1))' }}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-14 w-14 rounded-full border-2 flex items-center justify-center overflow-hidden" style={{ borderColor: i === 1 ? 'rgba(var(--primary), 0.3)' : i === 2 ? 'rgba(var(--secondary), 0.3)' : 'rgba(var(--accent), 0.3)', background: i === 1 ? 'linear-gradient(135deg, rgba(var(--primary), 0.2), rgba(var(--primary), 0.05))' : i === 2 ? 'linear-gradient(135deg, rgba(var(--secondary), 0.2), rgba(var(--secondary), 0.05))' : 'linear-gradient(135deg, rgba(var(--accent), 0.2), rgba(var(--accent), 0.05))' }}>
                      {i === 1 ? <svg viewBox="0 0 24 24" className="h-7 w-7 text-primary" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> : i === 2 ? <svg viewBox="0 0 24 24" className="h-7 w-7 text-secondary" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> : <svg viewBox="0 0 24 24" className="h-7 w-7 text-accent" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                    </div>
                    <div>
                      <h4 className="font-semibold">{i === 1 ? 'Sarah Johnson' : i === 2 ? 'Michael Chen' : 'Olivia Rodriguez'}</h4>
                      <p className="text-sm" style={{color: i === 1 ? 'rgba(var(--primary), 0.8)' : i === 2 ? 'rgba(var(--secondary), 0.8)' : 'rgba(var(--accent), 0.8)'}}>{i === 1 ? 'Therapist' : i === 2 ? 'Software Engineer' : 'College Student'}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <div className="px-2 py-1 rounded-full text-xs font-medium shadow-sm" style={{ background: i === 1 ? 'rgba(var(--primary), 0.1)' : i === 2 ? 'rgba(var(--secondary), 0.1)' : 'rgba(var(--accent), 0.1)', color: i === 1 ? 'rgba(var(--primary), 1)' : i === 2 ? 'rgba(var(--secondary), 1)' : 'rgba(var(--accent), 1)' }}>
                        Verified
                      </div>
                      <div className="flex ml-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" style={{ color: i === 1 ? 'rgba(var(--primary), 0.9)' : i === 2 ? 'rgba(var(--secondary), 0.9)' : 'rgba(var(--accent), 0.9)' }}>
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="relative mb-5">
                    <div className="absolute -left-2 -top-2 opacity-20" style={{ color: i === 1 ? 'rgba(var(--primary), 1)' : i === 2 ? 'rgba(var(--secondary), 1)' : 'rgba(var(--accent), 1)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                    </div>
                    <p className="text-foreground/90 mb-2 italic" style={{color: i === 1 ? 'rgba(var(--primary-foreground), 0.85)' : i === 2 ? 'rgba(var(--secondary-foreground), 0.85)' : 'rgba(var(--accent-foreground), 0.85)'}}>
                      {i === 1 ? "As a therapist, I'm impressed by how MindJournal incorporates evidence-based practices. The structured reflections and mood tracking help my clients maintain consistency between sessions." : 
                       i === 2 ? "Working in tech, my mind is always racing. MindJournal gives me a dedicated space to process thoughts and emotions. The data visualizations speak to my analytical side while helping me connect with my feelings." : 
                       "College is stressful, and MindJournal has been my emotional anchor. The daily prompts help me reflect on my mental health journey, and I love how the interface is so calming and intuitive."}
                    </p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-opacity-20" style={{ borderColor: i === 1 ? 'rgba(var(--primary), 0.2)' : i === 2 ? 'rgba(var(--secondary), 0.2)' : 'rgba(var(--accent), 0.2)' }}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm" style={{color: i === 1 ? 'rgba(var(--primary), 0.8)' : i === 2 ? 'rgba(var(--secondary), 0.8)' : 'rgba(var(--accent), 0.8)'}}>
                        Using since {i === 1 ? 'January' : i === 2 ? 'March' : 'April'} 2025
                      </span>
                      <span className="text-xs rounded-full px-2 py-1" style={{ background: i === 1 ? 'rgba(var(--primary), 0.1)' : i === 2 ? 'rgba(var(--secondary), 0.1)' : 'rgba(var(--accent), 0.1)', color: i === 1 ? 'rgba(var(--primary), 0.8)' : i === 2 ? 'rgba(var(--secondary), 0.8)' : 'rgba(var(--accent), 0.8)' }}>
                        {i === 1 ? '142 entries' : i === 2 ? '87 entries' : '56 entries'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 flex flex-col items-center justify-center space-y-5 text-center">
              <div className="space-y-3 max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Start Your Journey Today
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Taking care of your mental health is an act of self-love. Begin your journey with MindJournal.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Link href="/journal">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg">
                    Create Your First Entry
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer id="contact" className="w-full border-t bg-card/30">
        <div className="container px-4 md:px-6 py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="col-span-2 md:col-span-1 lg:col-span-2">
              <Link className="flex items-center mb-4" href="#">
                <Heart className="h-6 w-6 text-primary" />
                <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">MindJournal</span>
              </Link>
              <p className="max-w-sm text-muted-foreground text-sm">
                MindJournal is a dedicated mental health journaling platform, designed to help you build self-awareness through consistent reflection and guided prompts.
              </p>
              <div className="mt-6 flex items-center space-x-3">
                <Link href="#" className="rounded-full bg-background p-2 text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="rounded-full bg-background p-2 text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="rounded-full bg-background p-2 text-muted-foreground hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Resources</Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Mental Health Tips</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Company</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="container px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground"> 2025 MindJournal. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link className="text-xs text-muted-foreground hover:text-primary transition-colors" href="#">
                Cookie Policy
              </Link>
              <Link className="text-xs text-muted-foreground hover:text-primary transition-colors" href="#">
                Accessibility
              </Link>
              <Link className="text-xs text-muted-foreground hover:text-primary transition-colors" href="#">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
