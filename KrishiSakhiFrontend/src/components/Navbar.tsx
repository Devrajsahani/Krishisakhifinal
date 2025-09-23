"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, MessageCircle, LayoutDashboard, Newspaper, User } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/40 border-b border-black/5 dark:border-white/10 dark:bg-black/30 dark:supports-[backdrop-filter]:bg-black/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-content-center rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 text-white shadow-lg">
            <Leaf size={18} />
          </div>
          <span className="text-lg font-semibold tracking-tight">Krishi Sakhi</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-emerald-600">{t("nav_home")}</Link>
          <Link href="/dashboard" className="hover:text-emerald-600 flex items-center gap-1"><LayoutDashboard size={16}/>{t("nav_dashboard")}</Link>
          <Link href="/chat" className="hover:text-emerald-600 flex items-center gap-1"><MessageCircle size={16}/>{t("nav_chat")}</Link>
          <Link href="/news" className="hover:text-emerald-600 flex items-center gap-1"><Newspaper size={16}/>{t("nav_news")}</Link>
          <Link href="/profile" className="hover:text-emerald-600 flex items-center gap-1"><User size={16}/>{t("nav_profile")}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <select
            aria-label="Select language"
            className="h-9 rounded-md border bg-transparent px-2 text-sm"
            value={lang}
            onChange={(e) => setLang(e.target.value as any)}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="ml">മലയാളം</option>
          </select>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <a href="/chat">{t("nav_ask_ai")}</a>
          </Button>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 shadow-sm">
            <a href="/onboarding">{t("nav_get_started")}</a>
          </Button>
        </div>
      </div>
    </header>
  );
}