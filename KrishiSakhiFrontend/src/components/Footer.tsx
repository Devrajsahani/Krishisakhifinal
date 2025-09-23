"use client";

export default function Footer(){
  return (
    <footer id="news" className="mt-16 border-t bg-gradient-to-b from-transparent to-emerald-50/60 dark:to-zinc-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Krishi Sakhi. All rights reserved.</p>
        <nav className="flex flex-wrap gap-4">
          <a href="#home" className="hover:text-foreground">Home</a>
          <a href="#dashboard" className="hover:text-foreground">Dashboard</a>
          <a href="#chat" className="hover:text-foreground">Chat</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
        </nav>
      </div>
    </footer>
  );
}