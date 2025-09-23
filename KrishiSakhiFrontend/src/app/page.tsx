"use client";

import OnboardingModal from "@/components/OnboardingModal";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Sparkles, ShieldCheck, Mic } from "lucide-react";

export default function Home() {
  return (
    <div id="home" className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-zinc-900 dark:to-zinc-950">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-70 dark:opacity-30"
          aria-hidden />

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-white/60 to-white dark:from-zinc-950/40 dark:via-zinc-950/60 dark:to-zinc-950" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-emerald-700 shadow-sm backdrop-blur dark:bg-zinc-900/60">
              <ShieldCheck className="h-3.5 w-3.5" />
              Trusted assistant for Kerala farmers
            </div>
            <h1 className="text-4xl/tight font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Krishi Sakhi
              <span className="block bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-600 bg-clip-text text-transparent !w-[800px] !h-[74px]">
                Your AI Copilot for Agriculture
              </span>
            </h1>
            <p className="mt-5 text-base text-muted-foreground sm:text-lg">
              Diagnose crop issues, log farm activities, and chat in your language with voice support. Simple, fast, and designed for the fields of Kerala.
            </p>

            <div className="mt-8 flex flex-row items-center justify-center gap-0">
              <OnboardingModal />
              <Button asChild size="lg" variant="outline" className="-ml-px rounded-full px-6 py-3 text-base md:text-lg">
                <a href="/chat" className="inline-flex items-center gap-2">
                  <Mic className="h-5 w-5" /> Try voice chat
                </a>
              </Button>
              <Button asChild size="lg" className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-6 py-3 text-base md:text-lg">
                <a href="/dashboard">Go to Dashboard</a>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <Badge className="bg-emerald-600/90">Malayalam • English • Hindi</Badge>
              <Badge variant="secondary" className="backdrop-blur">Crop Advisory</Badge>
              <Badge variant="secondary" className="backdrop-blur">Disease Hints</Badge>
            </div>
          </div>

          {/* Floating glass cards for hero features */}
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border bg-white/60 p-5 backdrop-blur-md shadow-lg dark:bg-zinc-900/50">
              <div className="flex items-center gap-2 text-emerald-700"><Leaf className="h-4 w-4" /><span className="font-medium">For Farmers</span></div>
              <p className="mt-2 text-sm text-muted-foreground">Designed mobile-first with clear Malayalam support</p>
            </div>
            <div className="rounded-2xl border bg-white/60 p-5 backdrop-blur-md shadow-lg dark:bg-zinc-900/50">
              <div className="flex items-center gap-2 text-emerald-700"><Sparkles className="h-4 w-4" /><span className="font-medium">AI Assistance</span></div>
              <p className="mt-2 text-sm text-muted-foreground">Ask anything about crops, pests, and fertilizers. Get crisp, actionable answers.</p>
            </div>
          </div>

          {/* Quick Sections linking to new pages */}
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
            <a href="/dashboard" className="group rounded-2xl border bg-white/60 p-5 backdrop-blur-md shadow-lg transition hover:shadow-emerald-200/60 dark:bg-zinc-900/50">
              <div className="text-sm font-medium text-emerald-700">Dashboard</div>
              <p className="mt-1 text-sm text-muted-foreground">See Today&apos;s Focus, vitals, and actions.</p>
              <div className="mt-3 h-1 w-0 bg-emerald-600 transition-all group-hover:w-1/2" />
            </a>
            <a href="/chat" className="group rounded-2xl border bg-white/60 p-5 backdrop-blur-md shadow-lg transition hover:shadow-emerald-200/60 dark:bg-zinc-900/50">
              <div className="text-sm font-medium text-emerald-700">Chat</div>
              <p className="mt-1 text-sm text-muted-foreground">Voice-enabled advice in your language.</p>
              <div className="mt-3 h-1 w-0 bg-emerald-600 transition-all group-hover:w-1/2" />
            </a>
            <a href="/news" className="group rounded-2xl border bg-white/60 p-5 backdrop-blur-md shadow-lg transition hover:shadow-emerald-200/60 dark:bg-zinc-900/50">
              <div className="text-sm font-medium text-emerald-700">News</div>
              <p className="mt-1 text-sm text-muted-foreground">Schemes, mandi prices, and alerts.</p>
              <div className="mt-3 h-1 w-0 bg-emerald-600 transition-all group-hover:w-1/2" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

}