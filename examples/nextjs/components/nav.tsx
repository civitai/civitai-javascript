import Link from "next/link";

export default async function Nav() {
  return (
    <nav className="fixed top-4 right-0 flex items-center w-full md:px-12 p-4 justify-end gap-6">
      <Link
        href={"https://www.entropy.so/legal/terms-of-service"}
        target="_blank"
        className="opacity-50 hover:opacity-100"
      >
        Github
      </Link>
      <Link
        href={"https://www.entropy.so/legal/privacy-policy"}
        target="_blank"
        className="opacity-50 hover:opacity-100"
      >
        Civitai
      </Link>
    </nav>
  );
}
