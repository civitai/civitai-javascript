import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import { Sparkles } from "./ui/sparkles";

export default async function Nav() {
  return (
    <nav className="absolute top-5 right-10 flex items-center gap-3">
      <ThemeToggle />

      <Link
        href="https://github.com/civitai/civitai-javascript/tree/master/examples/nextjs-txt2img"
        target="_blank"
        className="group inline-flex items-center"
      >
        <button className="inline-flex h-9 px-4 animate-shimmer text-sm items-center justify-center rounded-md border dark:border-slate-800 bg-[linear-gradient(110deg,#f0f1f3,45%,#fefefe,55%,#f0f1f3)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-slate-700 dark:text-slate-400 transition-colors focus:outline-none focus:ring-2 dark:focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-50">
          <span className="translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
            Clone repo
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 h-3 w-3 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </Link>
    </nav>
  );
}
