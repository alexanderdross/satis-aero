import { Plane, Rocket, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Plane className="mb-6 h-12 w-12 text-sky-500" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Satis Aero</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
          Next.js Website hosted on Vercel – bereit für den Start.
        </p>

        <div className="mt-12 grid w-full gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 p-6 text-left dark:border-zinc-800">
            <Rocket className="mb-3 h-6 w-6 text-sky-500" />
            <h2 className="text-lg font-semibold">Fast</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Edge-optimiert via Vercel Global Network.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 p-6 text-left dark:border-zinc-800">
            <ShieldCheck className="mb-3 h-6 w-6 text-sky-500" />
            <h2 className="text-lg font-semibold">Secure</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              HTTPS by default und typsicher dank TypeScript.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
