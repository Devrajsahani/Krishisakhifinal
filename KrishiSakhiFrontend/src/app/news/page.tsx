import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Megaphone, IndianRupee } from "lucide-react";
import T from "@/components/T";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-emerald-700 shadow-sm backdrop-blur dark:bg-zinc-900/60">
            <Newspaper className="h-3.5 w-3.5" />
            <T k="news_pill" />
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"><T k="news_title" /></h1>
          <p className="mt-2 text-muted-foreground"><T k="news_subtitle" /></p>
        </div>

        {/* Ticker */}
        <div className="mb-8 rounded-xl border bg-emerald-50/80 dark:bg-emerald-900/20">
          <div className="relative overflow-hidden px-4 py-3">
            <div className="marquee-scroll whitespace-nowrap text-sm font-medium text-emerald-800 dark:text-emerald-200">
              <T k="news_ticker_1" />
              <span className="mx-6">•</span>
              <T k="news_ticker_2" />
              <span className="mx-6">•</span>
              <T k="news_ticker_3" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-700">
                <Megaphone className="h-5 w-5" /> <T k="news_card1_title" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="font-medium"><T k="news_card1_item" /></div>
              <p><T k="news_card1_desc" /></p>
              <Badge variant="secondary"><T k="common_open" /></Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-700">
                <IndianRupee className="h-5 w-5" /> <T k="news_card2_title" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="font-medium"><T k="news_card2_item" /></div>
              <p className="text-muted-foreground"><T k="news_card2_desc" /></p>
              <Badge><T k="news_spices" /></Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-700">
                <Megaphone className="h-5 w-5" /> <T k="news_card3_title" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="font-medium"><T k="news_card3_item" /></div>
              <p><T k="news_card3_desc" /></p>
              <Badge variant="outline"><T k="news_advisory" /></Badge>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}