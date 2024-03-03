import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import { Sparkles } from "./ui/sparkles";

export default async function Nav() {
  return (
    <nav className="absolute top-5 right-10 flex items-center gap-1">
      <ThemeToggle />

      <Link
        href="https://github.com/civitai/civitai-javascript/tree/master/examples/nextjs-txt2img"
        target="_blank"
        className="group inline-flex items-center"
      >
        <Button variant={"ghost"} className="relative">
          <div className="w-full absolute inset-0 h-full">
            <Sparkles
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={40}
              className="w-full h-full"
              particleColor={"#98ABEE"}
            />
          </div>
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
        </Button>
      </Link>
    </nav>
  );
}
