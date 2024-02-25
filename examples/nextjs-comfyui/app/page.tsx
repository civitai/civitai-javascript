import Footer from "@/components/footer";
import Nav from "@/components/nav";
import CopyCommand from "@/components/copy-command";
import Playground from "@/components/playground";
import { Gemini } from "@/components/ui/gemini-effect";
import { PinContainer } from "@/components/ui/3d-pin";
import Dropzone from "@/components/dropzone";

export default function Home() {
  return (
    <main className="relative flex flex-col mx-auto items-center py-32">
      <Nav />

      <div className="z-40 mx-auto text-center px-8">
        <p className="text-3xl md:text-6xl py-1 font-normal text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-500 to-gray-900 dark:from-neutral-100 dark:to-neutral-300">
          A ComfyUI App with Civitai
        </p>
        <p className="text-xs md:text-xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto">
          See all supported nodes here <sup>&#8599;</sup>
        </p>
      </div>

      <Gemini />

      <Playground />

      <Footer />
    </main>
  );
}
