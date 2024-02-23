import Link from "next/link";

export default async function Footer() {
  return (
    <nav className="hidden md:fixed md:flex bottom-4 right-10 items-center w-full md:px-12 p-4 justify-end gap-6 text-sm">
      <Link
        href={"https://github.com/civitai/civitai-javascript"}
        target="_blank"
        className="opacity-50 hover:opacity-100"
      >
        Github
      </Link>
      <Link
        href={"https://civitai.com"}
        target="_blank"
        className="opacity-50 hover:opacity-100"
      >
        Civitai
      </Link>
    </nav>
  );
}
