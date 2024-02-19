import Nav from "@/components/nav";
import { Playground } from "@/components/playground";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col mx-auto items-center p-24">
      <Nav />
      <div className="flex flex-col items-center gap-10">
        <h1 className="text-4xl font-bold">A Nextjs App with Civitai</h1>
        <code className="thirteen w-fit px-4 py-1.5 text-xs font-light tracking-wide">
          npm install civitai
        </code>
      </div>

      <div className="flex my-16 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />

      <Playground />
    </main>
  );
}
