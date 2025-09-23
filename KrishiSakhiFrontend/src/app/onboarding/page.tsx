import Footer from "@/components/Footer";
import OnboardingModal from "@/components/OnboardingModal";
import T from "@/components/T";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-emerald-700 shadow-sm backdrop-blur dark:bg-zinc-900/60">
            <T k="onboarding_get_started" />
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            <T k="onboarding_title" />
          </h1>
          <p className="mt-2 text-muted-foreground">
            <T k="onboarding_subtitle" />
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <OnboardingModal />
          </div>
        </div>

        <section className="mt-12 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-white/60 p-5 backdrop-blur-md shadow-lg dark:bg-zinc-900/50">
            <div className="text-sm font-medium text-emerald-700"><T k="onboarding_why_title" /></div>
            <p className="mt-1 text-sm text-muted-foreground">
              <T k="onboarding_why_desc" />
            </p>
          </div>
          <div className="rounded-2xl border bg-white/60 p-5 backdrop-blur-md shadow-lg dark:bg-zinc-900/50">
            <div className="text-sm font-medium text-emerald-700"><T k="onboarding_next_title" /></div>
            <p className="mt-1 text-sm text-muted-foreground">
              <T k="onboarding_next_desc" />
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}