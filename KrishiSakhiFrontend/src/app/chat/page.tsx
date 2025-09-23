import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import T from "@/components/T";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl"><T k="chat_title" /></h1>
          <p className="mt-2 text-muted-foreground"><T k="chat_subtitle" /></p>
        </div>
        <Chat />
      </main>
      <Footer />
    </div>
  );
}