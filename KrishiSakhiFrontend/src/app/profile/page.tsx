import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import T from "@/components/T";
import LangName from "@/components/LangName";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            <T k="profile_title" />
          </h1>
          <p className="mt-2 text-muted-foreground">
            {/* Simple helper text, optional to translate later */}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-700"><T k="profile_name" /></CardTitle>
            </CardHeader>
            <CardContent className="text-sm">Rajan Pillai</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-700"><T k="profile_primary_crop_label" /></CardTitle>
            </CardHeader>
            <CardContent className="text-sm">Pepper</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-700"><T k="profile_location" /></CardTitle>
            </CardHeader>
            <CardContent className="text-sm">Ernakulam, Kerala</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-700"><T k="profile_phone" /></CardTitle>
            </CardHeader>
            <CardContent className="text-sm">+91 98765 43210</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-700"><T k="profile_language" /></CardTitle>
            </CardHeader>
            <CardContent className="text-sm"><LangName /></CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}